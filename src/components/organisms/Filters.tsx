import React, { Suspense } from "react";
import { Search } from "@/components/molecules";
import { Select, SortButtons } from "@/components/atoms";

const Filters: React.FC = () => {
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
          <SortButtons />
        </Suspense>
      </div>
    </div>
  );
};

export default Filters;
