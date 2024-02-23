"use client";

import { useState, useRef } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import debounce from "lodash/debounce";

export const useSearchAndSelect = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const initialSearchTerm = searchParams.get("searchTerm") || "";
  const initialSortOption = searchParams.get("sortOption") || "";
  const initialOrder = searchParams.get("_order") || "asc";

  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [selectedSortOption, setSelectedSortOption] =
    useState(initialSortOption);
  const [_order, setOrder] = useState(initialOrder);

  const debouncedSearchChange = useRef(
    debounce((newSearchTerm) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.set("searchTerm", newSearchTerm);
      router.push(`${pathname}?${newSearchParams.toString()}`);
    }, 300)
  ).current;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    debouncedSearchChange(event.target.value);
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

  return {
    searchTerm,
    selectedSortOption,
    _order,
    handleSearchChange,
    handleSelectChange,
    handleOrderChange,
  };
};
