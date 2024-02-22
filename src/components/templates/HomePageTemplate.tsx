"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { BeerList, BeerListLoading, Filters } from "@/components/organisms";
import { Button } from "@/components/atoms";
import { getBeers } from "@/app/actions/getBeers";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { Beer } from "@/interfaces";
import { delay } from "lodash";

interface Props {
  beers: Beer[];
  total: number;
  status: string;
}

export default function HomePageTemplate(props: Props) {
  const searchParams = useSearchParams();
  const [beers, setBeers] = useState(props.beers);
  const [total, setTotal] = useState(props.total);
  const [status, setStatus] = useState(props.status);
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const searchTerm = searchParams.get("searchTerm") || "";
  const sortOption = searchParams.get("sortOption") || "";
  const order = searchParams.get("order") || "desc";

  useEffect(() => {
    setBeers(props.beers);
    setTotal(props.total);
    setStatus(props.status);
  }, [props.beers, props.total, props.status]);

  useEffect(() => {
    setPage(DEFAULT_PAGE);
  }, [searchTerm, sortOption, order]);

  useEffect(() => {
    setTotalPages(Math.ceil(total / DEFAULT_PAGE_SIZE));
  }, [total]);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    const nextPage = page + 1;

    try {
      ("use server");
      const response = await getBeers({
        page: nextPage,
        limit: DEFAULT_PAGE_SIZE,
        searchTerm,
        sortOption,
        order,
      });
      setBeers([...beers, ...response.data.beers]);
      setPage(nextPage);
      setStatus(response.status);
      setIsLoadingMore(false);
    } catch (err) {
      setStatus("failed");
      setIsLoadingMore(false);
    }
  };

  return (
    <>
      <Filters />
      <BeerList beers={beers} />
      {isLoadingMore && <BeerListLoading />}
      {!isLoadingMore && page < totalPages && beers.length < total && (
        <div className="w-full mt-4 text-center">
          <Button variant="primary" onClick={handleLoadMore}>
            Load More
          </Button>
        </div>
      )}
    </>
  );
}
