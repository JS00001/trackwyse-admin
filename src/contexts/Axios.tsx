/*
 * Created on Wed Feb 01 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import { useEffect } from "react";
import { useRouter } from "next/router";
import { toast as Toast } from "react-toastify";
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";

import Config from "@/config";
import { useAuth } from "@/contexts/Auth";

interface AxiosConfig extends InternalAxiosRequestConfig {
  retryCount?: number;
}

interface AxiosErrorConfig extends AxiosError {
  config: AxiosConfig;
}

const baseURL =
  Config.BUILD_ENV === "development" || Config.BUILD_ENV === "staging"
    ? "https://api.dev.trackwyse.com"
    : "https://api.trackwyse.com";

const axiosClient = axios.create({
  baseURL,
});

const AxiosInterceptor: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { accessToken, getAccessToken } = useAuth();

  useEffect(() => {
    const requestInterceptor = (config: AxiosConfig) => {
      if (accessToken && !config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    };

    const requestErrInterceptor = (error: AxiosError) => {
      return Promise.reject(error);
    };

    const reqInterceptor = axiosClient.interceptors.request.use(
      requestInterceptor,
      requestErrInterceptor
    );

    const responseInterceptor = (response: AxiosResponse<any, any>) => {
      return response;
    };

    const responseErrInterceptor = async (error: AxiosErrorConfig) => {
      if (error.response?.status != 401 && error.response?.status != 429) {
        return Promise.reject(error);
      }

      if (error.response?.status == 429) {
        Toast.error("Too many requests. Please try again later.");
        return Promise.reject(error);
      }

      const responseData: any = error.response?.data;

      if (responseData?.message == "EXPIRED_TOKEN") {
        if (!error.config) {
          return Promise.reject(error);
        }

        const config: AxiosConfig = {
          ...error.config,
          retryCount: error.config.retryCount ? error.config.retryCount + 1 : 1,
        };

        if (config.retryCount && config.retryCount > 1) {
          return Promise.reject(error);
        }

        await getAccessToken();

        return await axiosClient.request(config);
      }

      if (responseData?.message == "UNAUTHORIZED_REQUEST") {
        console.log("Redirecting to login page... (UNAUTHORIZED_REQUEST)");
        return router.push("/auth/login");
      }

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
  }, [router.pathname, accessToken]);

  return <>{children}</>;
};

export default axiosClient;

export { AxiosInterceptor };
