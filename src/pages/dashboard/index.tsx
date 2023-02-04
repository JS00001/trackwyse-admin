/*
 * Created on Wed Feb 01 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import Text from "@/components/Text";
import withAuth from "@/hoc/withAuth";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/Auth";
import DashboardLoader from "@/components/Loaders/Dashboard";

const DashboardLandingPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <Text variant="header">Dashboard</Text>
    </Layout>
  );
};

export default withAuth(DashboardLandingPage);
