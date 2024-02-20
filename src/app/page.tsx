import React, { Suspense } from "react";
import { BeerList, BeerListLoading } from "@/components/organisms";
import { ErrorMessage } from "@/components/atoms";
import { getBeers } from "@/app/actions/getBeers";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/lib/constants";
import HomePageTemplate from "@/components/templates/HomePageTemplate";

export default async function HomePage() {
  let status = "loading";
  let beers = [];
  let total = 0;
  let error = null;

  try {
    const response = await getBeers({
      page: DEFAULT_PAGE,
      limit: DEFAULT_PAGE_SIZE,
      searchTerm: "",
      sortOption: "",
      order: "desc",
    });
    beers = response.data.beers;
    total = response.data.total;
    status = response.status;
  } catch (err) {
    status = "failed";
    error = err.message;
  }

  if (status === "failed") {
    return <ErrorMessage message={error} className="text-xl" />;
  } else {
    return (
      <>
        <HomePageTemplate beers={beers} status={status} total={total} />
        {/* <Filters
          sortOptions={sortOptions}
          selectedSortOption={sortOption}
          onSearchChange={handleSearchChange}
          onSortChange={handleSortChange}
        /> */}
        {/* <Suspense fallback={<BeerListLoading />}>
          <BeerList beers={beers} status={status} />
        </Suspense> */}
        {/* {!isLoadingMore && page < totalPages && ( */}
        <div className="w-full mt-4 text-center">
          {/* <Button variant="primary" onClick={handleLoadMore}>
              Load More
            </Button> */}
        </div>
        {/* )} */}
      </>
    );
  }
}
