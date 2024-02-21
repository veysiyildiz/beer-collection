"use server";

import React from "react";
import { BeerCardSkeleton } from "@/components/molecules";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

const BeerListLoading: React.FC = () => {
  return (
    <>
      {Array.from({ length: DEFAULT_PAGE_SIZE }).map((_, index) => (
        <BeerCardSkeleton key={`loading-${index}`} />
      ))}
    </>
  );
};

export default BeerListLoading;
