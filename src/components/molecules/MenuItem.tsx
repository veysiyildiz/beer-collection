import React from "react";
import Link from "next/link";
import { Button, Text } from "@/components/atoms";

interface MenuItemProps {
  href: string;
  icon?: React.ElementType;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ href, icon: Icon, label }) => (
  <Link href={href} className="flex items-center space-x-2" ariaLabel={label}>
    {Icon && <Icon />}
    <Text variant="span" className="menu-item-label max-sm:hidden">
      {label}
    </Text>
  </Link>
);

export default MenuItem;
