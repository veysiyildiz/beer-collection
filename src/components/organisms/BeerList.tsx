import React from "react";
import { BeerCard } from "@/components/molecules";
import { BeerWithComments } from "@/interfaces";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

interface BeerListProps {
  beers: BeerWithComments[];
  status: string;
}

const BeerList: React.FC<BeerListProps> = ({ beers, status }) => {
  const isLoading = status === "loading";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {beers?.map((beer) => (
        <BeerCard key={beer.id} beer={beer} />
      ))}
      {isLoading &&
        Array.from({ length: DEFAULT_PAGE_SIZE }).map((_, index) => (
          <BeerCard key={`loading-${index}`} loading />
        ))}
    </div>
  );
};

export default BeerList;
