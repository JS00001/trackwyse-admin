/*
 * Created on Fri Feb 03 2023
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
  accessToken: string;
  refreshToken: string;

  removeAllData: () => void;
  getAccessToken: () => Promise<void>;
  updateUser: (user: User) => void;
  updateAccessToken: (accessToken: string) => void;
  updateRefreshToken: (refreshToken: string) => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {};
