import React, { Suspense } from "react";
import { BeerList, BeerListLoading, Filters } from "@/components/organisms";

type HomePageProps = {
  searchParams: {
    searchTerm?: string;
    sortOption?: string;
    _order?: string;
    page?: string;
    limit?: string;
  };
};

export default async function HomePage({ searchParams }: HomePageProps) {
  return (
    <>
      <Filters />
      <Suspense fallback={<BeerListLoading />}>
        <BeerList searchParams={searchParams} />
      </Suspense>
    </>
  );
}
