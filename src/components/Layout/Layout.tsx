/*
 * Created on Fri Feb 03 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import React from "react";

import Text from "@/components/Text";
import Sidebar from "@/components/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

interface LayoutComponents {
  Header: React.FC<HeaderProps>;
  Content: React.FC<ContentProps>;
}

const Layout: React.FC<LayoutProps> & LayoutComponents = ({ children, className }) => {
  let subComponentsList = Object.keys(Layout);

  let subComponents = subComponentsList.map((key) => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) {
        return null;
      }

      const componentType = child.type as React.ComponentType;

      if (typeof componentType === "string") {
        return null;
      }

      return componentType.displayName === key ? child : null;
    });
  });

  return (
    <div className="flex">
      <Sidebar />

      <main className={"ml-80 flex flex-grow justify-center " + className}>
        <div className="h-full w-full p-12">
          {subComponents.map((component, index) => {
            return component;
          })}
        </div>
      </main>
    </div>
  );
};

interface HeaderProps {
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return <Text variant="header">{children}</Text>;
};

Header.displayName = "Header";
Layout.Header = Header;

interface ContentProps {
  children?: React.ReactNode;
}

const Content: React.FC<ContentProps> = ({ children }) => {
  return <div className="mt-8">{children}</div>;
};

Content.displayName = "Content";
Layout.Content = Content;

export default Layout;
