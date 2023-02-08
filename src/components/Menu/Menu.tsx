/*
 * Created on Sat Feb 04 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */

import React, { useEffect, useMemo } from "react";
import cn from "classnames";
import { motion } from "framer-motion";
import * as RadixIcons from "react-icons/rx";

import Text from "@/components/Text";

interface MenuProps {
  open?: boolean;
  children?: React.ReactNode;
  position?: "top" | "bottom";
}

interface MenuComponents {
  Button: React.FC<ButtonProps>;
  Item: React.FC<ItemProps>;
}

const Menu: React.FC<MenuProps> & MenuComponents = ({ open, position = "top", children }) => {
  const menuVariants = useMemo(() => {
    return {
      open: {
        opacity: 1,
        height: "auto",
        transition: {
          duration: 0.0625,
          staggerChildren: 0.025,
          staggerDirection: position === "top" ? -1 : 1,
          when: "beforeChildren",
        },
      },
      closed: {
        opacity: 0,
        height: 0,
        transition: {
          duration: 0.25,
          when: "afterChildren",
        },
      },
    };
  }, [position]);

  const buttonRef = React.useRef<HTMLDivElement>(null);
  const [buttonHeight, setButtonHeight] = React.useState(0);

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

  const classNames = cn(
    "absolute  w-full rounded-md border border-gray-200 py-2 bg-gray-100",
    open ? "z-10" : "-z-10"
  );

  const menuStyles = {
    top: position === "bottom" ? `${buttonHeight + 10}px` : undefined,
    bottom: position === "top" ? `${buttonHeight + 10}px` : undefined,
  };

  useEffect(() => {
    if (buttonRef.current) {
      setButtonHeight(buttonRef.current.clientHeight);
    }
  }, [buttonRef]);

  return (
    <div className="relative">
      <motion.ul
        variants={menuVariants}
        initial="closed"
        animate={open ? "open" : "closed"}
        className={classNames}
        style={menuStyles}
      >
        {menuItemComponents}
      </motion.ul>

      <div ref={buttonRef}>{menuButtonComponent}</div>
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
  const menuItem = useMemo(() => {
    return {
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
  }, []);

  const Icon = icon ? RadixIcons[icon] : null;

  const classNames = cn(
    "flex cursor-pointer items-center gap-x-2 py-2 px-3 font-medium text-primary-200 ",
    "hover:bg-primary-200 hover:text-white"
  );

  return (
    <motion.li onClick={onClick} variants={menuItem} className={classNames}>
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
