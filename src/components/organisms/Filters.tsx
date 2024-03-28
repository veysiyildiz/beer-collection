import React from "react";
import { Search } from "@/components/molecules";
import { Select, SortButtons } from "@/components/atoms";
import { SearchParams } from "@/types";

type FiltersProps = {
  searchParams: SearchParams;
};

const Filters: React.FC<FiltersProps> = ({ searchParams }) => {
  return (
    <div className="sm:flex justify-between mb-4">
      <Search searchParams={searchParams} />
      <div className="flex items-center">
        <Select searchParams={searchParams} />
        <SortButtons searchParams={searchParams} />
      </div>
    </div>
  );
};

export default Filters;
