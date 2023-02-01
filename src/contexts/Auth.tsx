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

  signOut: () => void;
  removeAllData: () => void;
  getAccessToken: () => Promise<void>;
  updateUser: (user: User) => void;
  updateAccessToken: (accessToken: string) => void;
  updateRefreshToken: (refreshToken: string) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState<boolean>(true);
  const [accessToken, setAccessToken] = useState<string>("");
  const [refreshToken, setRefreshToken] = useState<string>("");

  const getAccessTokenMutation = useMutation({
    mutationFn: async () => {
      return api.refreshAccessToken(refreshToken);
    },
  });

  const getUserMutation = useMutation({
    mutationFn: async () => {
      return api.getUser();
    },
  });

  const signOutMutation = useMutation({
    mutationFn: async () => {},
  });

  useEffect(() => {
    getRefreshToken();
  }, []);

  useEffect(() => {
    if (!refreshToken) {
      return setLoading(false);
    }

    getAccessToken();
  }, [refreshToken]);

  useEffect(() => {
    if (!accessToken) {
      return setLoading(false);
    }

    getUser();
  }, [accessToken]);

  const getRefreshToken = async () => {
    const refreshToken = await localforage.getItem("refreshToken");

    if (refreshToken) {
      setRefreshToken(refreshToken as string);
    }
  };

  const getAccessToken = async () => {
    if (refreshToken) {
      getAccessTokenMutation.mutate(undefined, {
        onSuccess: ({ data }) => {
          setAccessToken(data.accessToken);
        },
        onError: () => {
          setAccessToken("");
        },
      });
    }
  };

  const getUser = async () => {
    if (accessToken) {
      getUserMutation.mutate(undefined, {
        onSuccess: ({ data }) => {
          setUser(data.user);
        },
        onError: () => {
          setUser({} as User);
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
    await localforage.setItem("refreshToken", refreshToken);

    setRefreshToken(refreshToken);
  };

  const updateAccessToken = (accessToken: string) => {
    setAccessToken(accessToken);
  };

  const signOut = async () => {};

  const removeAllData = async () => {
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

        signOut,
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
