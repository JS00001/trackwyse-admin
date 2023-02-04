/*
 * Created on Fri Feb 03 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import Text from "@/components/Text";
import withAuth from "@/hoc/withAuth";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/Auth";
import Sidebar from "@/components/Sidebar";

const DashboardStatisticsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <Text variant="header">Statistics</Text>
    </Layout>
  );
};

export default withAuth(DashboardStatisticsPage);
