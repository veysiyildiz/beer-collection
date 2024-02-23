import React, { Suspense } from "react";
import { Button, ErrorMessage } from "@/components/atoms";
import { getBeers } from "@/app/actions/getBeers";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, sortOptions } from "@/lib/constants";
import Link from "next/link";
import { BeerList, BeerListLoading, Filters } from "@/components/organisms";

type HomePageProps = {
  searchParams: {
    searchTerm?: string;
    sortOption?: string;
    _order?: string;
  };
};

export default async function HomePage({ searchParams }: HomePageProps) {
  let status = "loading";
  let beers = [];
  let total = 0;
  let error = null;

  const page = searchParams.page || DEFAULT_PAGE;
  const limit = searchParams.limit || DEFAULT_PAGE_SIZE;
  const searchTerm = searchParams.searchTerm || "";
  const sortOption = searchParams.sortOption || "name";
  const _order = searchParams._order || "asc";

  try {
    const response = await getBeers({
      page,
      limit,
      searchTerm,
      sortOption,
      _order,
    });
    beers = response?.data?.beers;
    total = response?.data?.total;
    status = response?.status;
  } catch (err) {
    status = "failed";
    if (err instanceof Error) {
      error = err.message;
    } else {
      error = "An unknown error occurred";
    }
  }

  if (status === "failed") {
    return (
      <ErrorMessage
        message={error || "An unknown error occurred"}
        className="text-xl"
      />
    );
  } else {
    return (
      <>
        <Filters />
        <Suspense fallback={<BeerListLoading />}>
          <BeerList beers={beers} />
        </Suspense>
        {beers.length === total ? null : (
          <div className="w-full mt-4 text-center">
            <Link
              href={`
                ?${new URLSearchParams({
                  searchTerm,
                  sortOption,
                  _order,
                  page: Number(page) + 1,
                }).toString()}
              `}
              scroll={false}
            >
              <Button variant="primary">Load More</Button>
            </Link>
          </div>
        )}
      </>
    );
  }
}
