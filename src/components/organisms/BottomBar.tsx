import React from "react";
import { sidebarLinks } from "@/lib/constants";
import { MenuItem } from "@/components/molecules";

const BottomBar: React.FC = () => (
  <section className="bg-white  border-t border-r fixed bottom-0 z-10 w-full rounded-t-3xl p-4 sm:px-7 md:hidden">
    <nav className="flex items-center justify-center gap-3 sm:gap-5">
      {sidebarLinks.map((link) => {
        return (
          <MenuItem
            key={link.route}
            href={link.route}
            icon={link.icon}
            label={link.label}
          />
        );
      })}
    </nav>
  </section>
);

export default BottomBar;
