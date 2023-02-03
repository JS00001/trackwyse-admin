/*
 * Created on Wed Feb 01 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import localforage from "localforage";
import { useMutation } from "@tanstack/react-query";
import { createContext, useEffect, useState, useContext } from "react";

import api from "@/api";

interface AuthContextData {
  user: User;
  loading: boolean;
  accessToken: string;
  refreshToken: string;

  removeAllData: () => void;
  getAccessToken: () => Promise<void>;
  updateUser: (user: User) => void;
  updateAccessToken: (accessToken: string) => void;
  updateRefreshToken: (refreshToken: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");

  const getAccessTokenMutation = useMutation({
    mutationFn: async (token: string) => {
      return api.refreshAccessToken(token);
    },
  });

  const getUserMutation = useMutation({
    mutationFn: async () => {
      return api.getUser();
    },
  });

  useEffect(() => {
    getRefreshToken();
  }, []);

  useEffect(() => {
    if (!refreshToken) {
      return;
    }

    getAccessToken();
  }, [refreshToken]);

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    getUser();
  }, [accessToken]);

  const getRefreshToken = async () => {
    setLoading(true);

    const refreshToken = await localforage.getItem("refreshToken");

    if (refreshToken) {
      setRefreshToken(refreshToken as string);
      return;
    }

    setLoading(false);
  };

  const getAccessToken = async () => {
    setLoading(true);

    if (refreshToken) {
      console.log("refreshToken", refreshToken);

      getAccessTokenMutation.mutate(refreshToken, {
        onSuccess: ({ data }) => {
          setAccessToken(data.accessToken);
        },
        onError: (err) => {
          setAccessToken("");
          setLoading(false);
        },
      });
    } else {
      setLoading(false);
    }
  };

  const getUser = async () => {
    setLoading(true);

    if (accessToken) {
      getUserMutation.mutate(undefined, {
        onSuccess: ({ data }) => {
          setUser(data.user);
          setLoading(false);
        },
        onError: () => {
          setUser({} as User);
          setLoading(false);
        },
      });
    } else {
      setLoading(false);
    }
  };

  const updateUser = (user: User) => {
    setUser(user);
  };

  const updateRefreshToken = async (refreshToken: string) => {
    setLoading(true);
    setRefreshToken(refreshToken);
    localforage.setItem("refreshToken", refreshToken);
  };

  const updateAccessToken = (accessToken: string) => {
    setLoading(true);

    setAccessToken(accessToken);
  };

  const removeAllData = async () => {
    setLoading(true);

    await localforage.clear();
    updateAccessToken("");
    updateRefreshToken("");
    updateUser({} as User);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        accessToken,
        refreshToken,

        removeAllData,
        getAccessToken,
        updateUser,
        updateAccessToken,
        updateRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export default AuthProvider;
