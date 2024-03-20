"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import debounce from "lodash/debounce";
import { SearchParams } from "@/types";
import {
  DEFAULT_SORT_ORDER,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "@/lib/constants";

export const useSearchAndSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams.has("searchTerm")
    ? searchParams.get("searchTerm")
    : "";
  const initialSortOption = searchParams.has("sortOption")
    ? searchParams.get("sortOption")
    : "";
  const initialOrder = searchParams.has("_order")
    ? searchParams.get("_order")
    : DEFAULT_SORT_ORDER;

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedSortOption, setSelectedSortOption] =
    useState(initialSortOption);
  const [_order, setOrder] = useState(initialOrder);

  const debouncedSearchChange = useRef(
    debounce((newSearchParams) => {
      router.push(`${pathname}?${newSearchParams.toString()}`);
    }, 300)
  ).current;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("searchTerm", event.target.value);
    debouncedSearchChange(newSearchParams);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setSelectedSortOption(selectedValue);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("sortOption", selectedValue);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  const handleOrderChange = (newOrder: string) => {
    setOrder(newOrder);
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("_order", newOrder);
    router.push(`${pathname}?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    const newSearchTerm = searchParams.get("searchTerm") || "";
    setSearchTerm(newSearchTerm);

    const newSortOption = searchParams.get("sortOption") || "";
    setSelectedSortOption(newSortOption);
  }, [pathname, searchParams]);

  return {
    searchTerm,
    selectedSortOption,
    _order,
    handleSearchChange,
    handleSelectChange,
    handleOrderChange,
  };
};
