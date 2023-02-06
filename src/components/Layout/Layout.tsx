/*
 * Created on Fri Feb 03 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import React from "react";
import cn from "classnames";

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

      <main className={"ml-80 flex min-h-screen flex-grow justify-center " + className}>
        <div className="flex h-full w-full flex-col p-12">
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
  className?: string;
  centerContentVertical?: boolean;
  centerContentHorizontal?: boolean;
}

const Content: React.FC<ContentProps> = ({
  centerContentVertical,
  centerContentHorizontal,
  className,
  children,
}) => {
  const classes = cn(
    "mt-8 flex-grow flex-col",
    centerContentVertical && "flexl justify-center",
    centerContentHorizontal && "flex items-center",
    className
  );

  return <div className={classes}>{children}</div>;
};

Content.displayName = "Content";
Layout.Content = Content;

export default Layout;
