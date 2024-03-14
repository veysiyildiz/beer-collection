import React from "react";
import { Logo } from "@/components/atoms";

const TopBar: React.FC = () => (
  <header className="bg-white border-b fixed top-0 z-30 w-full px-6 py-3">
    <Logo />
  </header>
);

export default TopBar;
