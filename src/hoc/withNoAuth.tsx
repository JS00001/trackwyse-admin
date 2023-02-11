/*
 * Created on Sat Feb 11 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import lodash from "lodash";
import router, { useRouter } from "next/router";
import { useEffect } from "react";

import { useAuth } from "@/contexts/Auth";
import DefaultLoader from "@/components/Loaders/Default";

const withNoAuth = (WrappedComponent: React.FC, LoadingComponent?: React.FC) => {
  return (props: any) => {
    const router = useRouter();
    const { user, loading } = useAuth();

    useEffect(() => {
      if (loading) {
        return;
      }

      if (!lodash.isEmpty(user)) {
        router.push("/dashboard");
      }
    }, [user, loading]);

    if (loading || !lodash.isEmpty(user)) {
      return LoadingComponent ? <LoadingComponent /> : <DefaultLoader />;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withNoAuth;
