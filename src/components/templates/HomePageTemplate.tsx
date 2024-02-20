"use client";

import React, { useState, useEffect } from "react";
import { BeerList, BeerListLoading, Filters } from "@/components/organisms";
import { Button } from "@/components/atoms";
import { getBeers } from "@/app/actions/getBeers";
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE, sortOptions } from "@/lib/constants";

export default function HomePageTemplate(props) {
  const [beers, setBeers] = useState(props.beers);
  const [total, setTotal] = useState(props.total);
  const [status, setStatus] = useState(props.status);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [page, setPage] = useState(DEFAULT_PAGE);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    setBeers(props.beers);
    setTotal(props.total);
    setStatus(props.status);
  }, [props.beers, props.total, props.status]);

  useEffect(() => {
    setTotalPages(Math.ceil(total / DEFAULT_PAGE_SIZE));
  }, [total]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getBeers({
          page: DEFAULT_PAGE,
          limit: DEFAULT_PAGE_SIZE,
          searchTerm,
          sortOption,
          order: "desc",
        });
        setBeers(response.data.beers);
        setTotal(response.data.total);
        setStatus(response.status);
      } catch (err) {
        setStatus("failed");
      }
    })();
  }, [searchTerm, sortOption]);

  const handleSearchChange = (search) => {
    setSearchTerm(search);
  };

  const handleSortChange = (sort) => {
    setSortOption(sort);
  };

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
        order: "desc",
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
      <Filters
        sortOptions={sortOptions}
        selectedSortOption={sortOption}
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
      />
      <BeerList beers={beers} status={status} />
      {!isLoadingMore && page < totalPages && (
        <div className="w-full mt-4 text-center">
          <Button variant="primary" onClick={handleLoadMore}>
            Load More
          </Button>
        </div>
      )}
    </>
  );
}
