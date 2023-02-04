/*
 * Created on Fri Feb 03 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import Sidebar from "@/components/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />

      <main className="ml-80 flex flex-grow justify-center">
        <div className="h-full w-full p-12">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
