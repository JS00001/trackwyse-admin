/*
 * Created on Fri Feb 03 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import lodash from "lodash";
import router from "next/router";
import { useEffect } from "react";

import { useAuth } from "@/contexts/Auth";
import DefaultLoader from "@/components/Loaders/Default";
import { toast as Toast } from "react-toastify";

const withAuth = (WrappedComponent: React.FC, LoadingComponent?: React.FC) => {
  return (props: any) => {
    const { user, loading } = useAuth();

    useEffect(() => {
      if (loading) {
        return;
      }

      if (lodash.isEmpty(user)) {
        router.push("/auth/login");
      }

      if (!lodash.isEmpty(user) && user.role !== "admin") {
        Toast.error("You must be an admin to access this page");
        router.push("/auth/login");
      }
    }, [user, loading]);

    if (loading || lodash.isEmpty(user)) {
      return LoadingComponent ? <LoadingComponent /> : <DefaultLoader />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
