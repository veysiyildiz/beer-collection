import React from "react";
import Link from "next/link";
import { fetchBeers, getSearchParams } from "@/lib/utils";
import { BeerListLoading, LoadMoreButton } from "@/components/organisms";
import { Button, ErrorMessage } from "@/components/atoms";
import { BeerCard } from "@/components/molecules";
import { Beer, SearchParams } from "@/types";

type BeerListProps = {
  searchParams: SearchParams;
};

const BeerList: React.FC<BeerListProps> = async ({ searchParams }) => {
  const params = getSearchParams(searchParams);
  const { data, status, error } = await fetchBeers(params);
  const beers = data?.beers || [];
  const total = data?.total || 0;

  if (status === "failed") {
    return (
      <ErrorMessage
        message={error || "An unknown error occurred"}
        className="text-xl"
      />
    );
  }

  return (
    <>
      <BeerListComponent beers={beers} />
      <LoadMoreButton
        isAllLoaded={beers?.length === total}
        searchParams={params}
      />
    </>
  );
};

const BeerListComponent: React.FC<{ beers: Beer[] }> = ({ beers }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    {beers.length === 0 ? (
      <ErrorMessage message="No beers found" className="text-xl" />
    ) : (
      beers.map((beer: Beer) => <BeerCard key={beer.id} beer={beer} />)
    )}
  </div>
);

export default BeerList;
