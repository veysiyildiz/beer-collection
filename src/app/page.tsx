import React, { Suspense } from "react";
import { redirect } from "next/navigation";
import { ErrorMessage } from "@/components/atoms";
import { getBeers } from "@/app/actions/getBeers";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, sortOptions } from "@/lib/constants";
import HomePageTemplate from "@/components/templates/HomePageTemplate";

type HomePageProps = {
  searchParams: {
    searchTerm?: string;
    sortOption?: string;
    order?: string;
  };
};

export default async function HomePage({ searchParams }: HomePageProps) {
  let status = "loading";
  let beers = [];
  let total = 0;
  let error = null;

  const page = DEFAULT_PAGE;
  const limit = DEFAULT_PAGE_SIZE;
  const searchTerm = searchParams.searchTerm || "";
  const sortOption = searchParams.sortOption || "";
  const order = searchParams.order || "desc";

  try {
    const response = await getBeers({
      page,
      limit,
      searchTerm,
      sortOption,
      order,
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
        <HomePageTemplate beers={beers} status={status} total={total} />
      </>
    );
  }
}
