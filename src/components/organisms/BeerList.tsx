import React from "react";
import Link from "next/link";
import { getBeers } from "@/app/actions/getBeers";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { BeerListLoading } from "@/components/organisms";
import { Button, ErrorMessage } from "@/components/atoms";
import { BeerCard } from "@/components/molecules";
import { Beer } from "@/interfaces";
interface BeerListProps {
  searchParams: {
    searchTerm?: string;
    sortOption?: string;
    _order?: string;
    page?: string;
    limit?: string;
  };
}

const BeerList: React.FC<BeerListProps> = async ({ searchParams }) => {
  let status = "loading";
  let beers = [];
  let total = 0;
  let error = null;

  const page = parseInt(searchParams.page || DEFAULT_PAGE, 10);
  const limit = parseInt(searchParams.limit || DEFAULT_PAGE_SIZE, 10);
  const searchTerm = searchParams.searchTerm || "";
  const sortOption = searchParams.sortOption || "name";
  const _order = searchParams._order || "asc";

  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await getBeers({
      page,
      limit,
      searchTerm,
      sortOption,
      _order,
    });

    status = "success";
    beers = response?.data?.beers;
    total = response?.data?.total;
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
  }
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {beers.length === 0 ? (
          <ErrorMessage message="No beers found" className="text-xl" />
        ) : (
          beers.map((beer: Beer) => <BeerCard key={beer.id} beer={beer} />)
        )}
      </div>
      {beers?.length === total ? null : (
        <div className="w-full mt-4 text-center">
          <Link
            href={`
              ?${new URLSearchParams({
                searchTerm,
                sortOption,
                _order,
                page: (page + 1).toString(),
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
};

export default BeerList;
