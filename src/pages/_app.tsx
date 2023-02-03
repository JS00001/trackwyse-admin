/*
 * Created on Tue Jan 31 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { QueryClientProvider } from "@tanstack/react-query";

import AuthProvider from "@/contexts/Auth";
import queryClient from "@/lib/queryClient";
import FontProvider from "@/contexts/Font";
import { AxiosInterceptor } from "@/contexts/Axios";
import Head from "next/head";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AxiosInterceptor>
          <FontProvider>
            <Head>
              <title>Trackwyse Admin</title>
            </Head>
            <ToastContainer limit={1} />
            <Component {...pageProps} />
          </FontProvider>
        </AxiosInterceptor>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
