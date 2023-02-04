/*
 * Created on Wed Feb 01 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import withAuth from "@/hoc/withAuth";
import Layout from "@/components/Layout";
import DashboardLoader from "@/components/Loaders/Dashboard";

const DashboardLandingPage: React.FC = () => {
  return <DashboardLoader />;

  return (
    <Layout>
      {/* <Layout.Header>Dashboard</Layout.Header> */}
      <Layout.Content></Layout.Content>
    </Layout>
  );
};

export default withAuth(DashboardLandingPage);
