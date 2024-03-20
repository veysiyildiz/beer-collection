import React, { Suspense } from "react";
import { Search } from "@/components/molecules";
import { Select, SortButtons } from "@/components/atoms";
import { SearchParams } from "@/types";

type FiltersProps = {
  searchParams: SearchParams;
};

const Filters: React.FC<FiltersProps> = ({ searchParams }) => {
  return (
    <div className="sm:flex justify-between mb-4">
      <Suspense>
        <Search />
      </Suspense>
      <div className="flex items-center">
        <Suspense>
          <Select />
        </Suspense>
        <Suspense>
          <SortButtons searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
};

export default Filters;
