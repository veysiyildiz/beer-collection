import React from "react";
import { BeerCard } from "@/components/molecules";
import { Beer } from "@/interfaces";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";

interface BeerListProps {
  beers: Beer[];
}

const BeerList: React.FC<BeerListProps> = ({ beers }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {beers?.map((beer) => (
        <BeerCard key={beer.id} beer={beer} />
      ))}
    </div>
  );
};

export default BeerList;
