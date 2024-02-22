import React from "react";
import { BeerCardSkeleton } from "@/components/molecules";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

const BeerListLoading: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-4 gap-4">
      {Array.from({ length: DEFAULT_PAGE_SIZE }).map((_, index) => (
        <BeerCardSkeleton key={`loading-${index}`} />
      ))}
    </div>
  );
};

export default BeerListLoading;
