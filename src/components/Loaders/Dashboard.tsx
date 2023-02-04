/*
 * Created on Fri Feb 03 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import { IoAperture } from "react-icons/io5";
import Layout from "../Layout";
import LoadingBlock from "./LoadingBlock";

const DashboardLoader: React.FC = () => {
  return (
    <Layout>
      <Layout.Header>
        <LoadingBlock width="w-72" />
      </Layout.Header>
      <Layout.Content>
        <div className="grid grid-cols-4 gap-x-4">
          <LoadingBlock height="h-64" />
          <LoadingBlock height="h-64" />
          <LoadingBlock height="h-64" />
          <LoadingBlock height="h-64" />
        </div>
        <LoadingBlock height="h-96" className="mt-4" />
        <LoadingBlock height="h-32" className="mt-4" />
      </Layout.Content>
    </Layout>
  );
};

export default DashboardLoader;
