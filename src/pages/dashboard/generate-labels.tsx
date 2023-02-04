/*
 * Created on Fri Feb 03 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import withAuth from "@/hoc/withAuth";
import { useAuth } from "@/contexts/Auth";
import Sidebar from "@/components/Sidebar";
import DashboardLoader from "@/components/Loaders/Dashboard";
import Layout from "@/components/Layout";

const DashboardGenerateLabelsPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <Layout>
      <p>a</p>
    </Layout>
  );
};

export default withAuth(DashboardGenerateLabelsPage);
