import React from "react";
import { Button, Text } from "@/components/atoms";

interface MenuItemProps {
  href: string;
  icon?: React.ElementType;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, icon: Icon, label }) => (
  <Button href={href} className="flex items-center space-x-2" ariaLabel={label}>
    {Icon && <Icon />}
    <Text variant="span" className="menu-item-label max-sm:hidden">
      {label}
    </Text>
  </Button>
);

export default MenuItem;
