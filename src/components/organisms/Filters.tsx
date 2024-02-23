import React from "react";
import { Search } from "@/components/molecules";
import { Select, SortButtons } from "@/components/atoms";

const Filters: React.FC = () => {
  return (
    <div className="sm:flex justify-between mb-4">
      <Search />
      <div className="flex items-center">
        <Select />
        <SortButtons />
      </div>
    </div>
  );
};

export default Filters;
