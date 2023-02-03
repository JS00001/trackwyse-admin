/*
 * Created on Wed Feb 01 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import lodash from "lodash";

import { useAuth } from "@/contexts/Auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

const DashboardLandingPage: React.FC = () => {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (lodash.isEmpty(user) && !loading) {
      console.log(user);
      console.log("Redirecting to login page (user is empty)");
      router.push("/auth/login");
    }
  }, [user, loading]);

  if (loading || lodash.isEmpty(user)) {
    return <div>Loading...</div>;
  }

  return <>{JSON.stringify(user)}</>;
};

export default DashboardLandingPage;
