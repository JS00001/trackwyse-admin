/*
 * Created on Sat Feb 04 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import React from "react";
import { motion } from "framer-motion";
import * as RadixIcons from "react-icons/rx";

import Text from "@/components/Text";

interface MenuProps {
  open?: boolean;
  children?: React.ReactNode;
}

interface MenuComponents {
  Button: React.FC<ButtonProps>;
  Item: React.FC<ItemProps>;
}

const menuVariants = {
  open: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.5,
      staggerChildren: 0.025,
      staggerDirection: -1,
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 0.5,
      when: "afterChildren",
    },
  },
};

const menuItem = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.25,
      ease: "easeOut",
    },
  },
  closed: {
    opacity: 0,
    transition: {
      duration: 0.1,
      ease: "easeOut",
    },
  },
};

const Menu: React.FC<MenuProps> & MenuComponents = ({ open, children }) => {
  let menuItemComponents = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    const componentType = child.type as React.ComponentType;

    if (typeof componentType === "string") {
      return null;
    }

    return componentType.displayName === "Item" ? child : null;
  });

  let menuButtonComponent = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) {
      return null;
    }

    const componentType = child.type as React.ComponentType;

    if (typeof componentType === "string") {
      return null;
    }

    return componentType.displayName === "Button" ? child : null;
  });

  return (
    <div className="relative">
      <motion.ul
        variants={menuVariants}
        initial="closed"
        animate={open ? "open" : "closed"}
        className="absolute right-0 bottom-[84px] -z-10 w-full rounded-md border border-gray-200 py-2"
      >
        {menuItemComponents}
      </motion.ul>

      {menuButtonComponent}
    </div>
  );
};

interface ButtonProps {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children }) => {
  return <>{children}</>;
};

interface ItemProps {
  title?: string;
  icon?: keyof typeof RadixIcons;
  onClick?: () => void;
}

const Item: React.FC<ItemProps> = ({ title, icon, onClick }) => {
  const Icon = icon ? RadixIcons[icon] : null;

  return (
    <motion.li
      onClick={onClick}
      variants={menuItem}
      className="flex cursor-pointer items-center gap-x-2 py-2 px-3 text-primary-200 hover:bg-primary-200 hover:text-white"
    >
      {Icon && <Icon className="text-base" />}
      <Text className="text-base">{title}</Text>
    </motion.li>
  );
};

Button.displayName = "Button";
Item.displayName = "Item";
Menu.Button = Button;
Menu.Item = Item;

export default Menu;
