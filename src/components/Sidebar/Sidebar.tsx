/*
 * Created on Fri Feb 03 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import React from "react";
import cn from "classnames";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import * as RadixIcons from "react-icons/rx";

import Config from "@/config";
import Text from "@/components/Text";
import Avatar from "@/components/Avatar";
import { useAuth } from "@/contexts/Auth";
import { createInitials } from "@/lib/util/string";
import Menu from "../Menu";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = () => {
  const { user } = useAuth();

  const [menuOpen, setMenuOpen] = React.useState(false);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  return (
    <div className="fixed flex h-screen w-80 flex-col justify-between border-r-2 border-gray-100 px-8 pt-10 pb-8">
      <div className="flex flex-col gap-y-3">
        <Image src="/logo.svg" alt="Trackwyse Logo" width={181.88} height={48} className="mb-4" />

        {Config.SIDEBAR_ITEMS.map((item) => (
          <SidebarItem item={item} />
        ))}
      </div>

      <Menu open={menuOpen}>
        <Menu.Item title="User Settings" icon="RxGear" />
        <Menu.Item title="Logout" icon="RxExit" />
        <Menu.Button>
          <div
            className=" flex cursor-pointer items-center rounded-md border border-gray-200 p-3 hover:opacity-75"
            onClick={handleMenuToggle}
          >
            <Avatar label={createInitials([user?.firstName, user?.lastName])} />
            <div className="ml-4 min-w-0">
              <Text truncate variant="subtitle1" className="font-medium  !text-primary-200">
                {user?.firstName} {user?.lastName}
              </Text>
              <Text variant="subtitle2" truncate>
                {user?.email}
              </Text>
            </div>
          </div>
        </Menu.Button>
      </Menu>
    </div>
  );
};

interface SidebarItemProps {
  item: {
    title: string;
    icon: keyof typeof RadixIcons;
    link: string;
  };
}

const SidebarItem: React.FC<SidebarItemProps> = ({ item }) => {
  const router = useRouter();

  const isActive = router.pathname === item.link;

  const Icon = item.icon && RadixIcons[item.icon];

  const containerClasses = cn(
    "flex cursor-pointer items-center py-3  rounded-md",
    "hover:bg-gray-100",
    isActive && "bg-gray-100"
  );

  const handleClick = () => {
    router.push(item.link);
  };

  return (
    <div className={containerClasses} onClick={handleClick}>
      <Icon size={26} className="mx-3 text-gray-500" />
      <Text className="text-lg font-medium text-primary-200">{item.title}</Text>
    </div>
  );
};

export default Sidebar;
