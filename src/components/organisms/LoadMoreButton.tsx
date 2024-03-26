import React from "react";
import Link from "next/link";
import { Button } from "@/components/atoms";

type LoadMoreButtonProps = {
  isAllLoaded: boolean;
  searchTerm: string;
  sortOption: string;
  order: string;
  page: string;
};

const generateNextPageUrl = ({
  searchTerm,
  sortOption,
  order,
  page,
}: LoadMoreButtonProps) => {
  const nextPage = +page + 1;
  const params = new URLSearchParams({
    searchTerm,
    sortOption,
    order,
    page: nextPage.toString(),
  });
  return `?${params.toString()}`;
};

const LoadMoreButton: React.FC<LoadMoreButtonProps> = (props) =>
  props.isAllLoaded ? null : (
    <div className="w-full mt-4 text-center">
      <Link href={generateNextPageUrl(props)} scroll={false}>
        <Button variant="primary">Load More</Button>
      </Link>
    </div>
  );

export default LoadMoreButton;
