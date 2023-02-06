/*
 * Created on Mon Feb 06 2023
 * Created by JS00001
 *
 * Copyright (c) 2023 Trackwyse
 */
import { useState } from "react";

import Menu from "@/components/Menu";
import Button from "@/components/Button";

interface DropdownProps {
  options: string[];
  value: string | null;
  placeholder?: string;
  onChange?: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ options, value, placeholder, onChange }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen((prev) => !prev);
  };

  const onMenuItemClick = (value: string) => {
    setMenuOpen(false);
    onChange?.(value);
  };

  return (
    <Menu open={menuOpen} position="bottom">
      {options.map((option) => (
        <Menu.Item key={option} title={option} onClick={() => onMenuItemClick(option)} />
      ))}
      <Menu.Button>
        <Button onClick={handleMenuToggle} iconRight="IoChevronDown">
          {!value ? placeholder || options[0] : value}
        </Button>
      </Menu.Button>
    </Menu>
  );
};

export default Dropdown;
