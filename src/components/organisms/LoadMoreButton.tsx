import React from "react";
import Link from "next/link";
import { Button } from "@/components/atoms";
import { getSearchParams } from "@/lib/utils";
import { SearchParams } from "@/types";

type LoadMoreButtonProps = {
  isAllLoaded: boolean;
  searchParams: SearchParams;
};

const generateNextPageUrl = (searchParams: SearchParams) => {
  const { page, searchTerm, sortOption, order } = getSearchParams(searchParams);
  const nextPage = +searchParams.page + 1;
  const params = new URLSearchParams({
    page: nextPage.toString(),
    searchTerm,
    sortOption,
    order,
  });
  return `?${params.toString()}`;
};

const LoadMoreButton: React.FC<LoadMoreButtonProps> = ({
  isAllLoaded,
  searchParams,
}) =>
  isAllLoaded ? null : (
    <div className="w-full mt-4 text-center">
      <Link href={generateNextPageUrl(searchParams)} scroll={false}>
        <Button variant="primary">Load More</Button>
      </Link>
    </div>
  );

export default LoadMoreButton;
