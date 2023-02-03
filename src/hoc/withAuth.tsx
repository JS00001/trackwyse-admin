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

const withAuth = (WrappedComponent: React.FC, LoadingComponent?: React.FC) => {
  return (props: any) => {
    const { user, loading } = useAuth();

    useEffect(() => {
      if (lodash.isEmpty(user) && !loading) {
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
