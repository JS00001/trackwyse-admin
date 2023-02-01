/*
 * Created on Wed Feb 01 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { useEffect } from "react";
import { useRouter } from "next/router";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

import Config from "@/config";
import { useAuth } from "@/contexts/Auth";

const baseURL =
  Config.BUILD_ENV === "development" || Config.BUILD_ENV === "staging"
    ? "https://api.dev.trackwyse.com"
    : "https://api.trackwyse.com";

const axiosClient = axios.create({
  baseURL,
});

const AxiosInterceptor: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { accessToken } = useAuth();

  useEffect(() => {
    const requestInterceptor = (config: InternalAxiosRequestConfig<any>) => {
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    };

    const requestErrInterceptor = (error: any) => {
      return Promise.reject(error);
    };

    const reqInterceptor = axiosClient.interceptors.request.use(
      requestInterceptor,
      requestErrInterceptor
    );

    const responseInterceptor = (response: AxiosResponse<any, any>) => {
      return response;
    };

    const responseErrInterceptor = (error: any) => {
      return Promise.reject(error);
    };

    const resInterceptor = axiosClient.interceptors.response.use(
      responseInterceptor,
      responseErrInterceptor
    );

    return () => {
      axiosClient.interceptors.response.eject(resInterceptor);
      axiosClient.interceptors.request.eject(reqInterceptor);
    };
  }, [router.pathname]);

  return <>{children}</>;
};

export default axiosClient;

export { AxiosInterceptor };
