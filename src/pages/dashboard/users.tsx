/*
 * Created on Fri Feb 03 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import withAuth from "@/hoc/withAuth";
import Layout from "@/components/Layout";
import DashboardLoader from "@/components/Loaders/Dashboard";

const DashboardUsersPage: React.FC = () => {
  return (
    <Layout>
      <Layout.Header>Users</Layout.Header>
      <Layout.Content></Layout.Content>
    </Layout>
  );
};

export default withAuth(DashboardUsersPage);
