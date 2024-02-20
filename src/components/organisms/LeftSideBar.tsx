import React from "react";
import { MenuItem } from "@/components/molecules";
import { sidebarLinks } from "@/lib/constants";

const LeftSideBar: React.FC = () => (
  <section className="sticky left-0 top-0 z-20 flex h-screen w-fit flex-col justify-between overflow-auto border-r pb-5 pt-28 max-md:hidden">
    <div className="flex w-full flex-1 flex-col gap-6 px-6">
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
    </div>
  </section>
);

export default LeftSideBar;
