"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import debounce from "lodash/debounce";
import { getSearchParams } from "@/lib/utils";
import { SearchParams } from "@/types";

export const useSearch = (searchParams: SearchParams) => {
  const router = useRouter();
  const pathname = usePathname();
  const { page, searchTerm, sortOption, order } = getSearchParams(searchParams);
  const [query, setQuery] = useState(searchTerm);

  const debouncedSearchChange = useRef(
    debounce((query) => {
      const newSearchParams = new URLSearchParams();
      newSearchParams.set("page", page);
      newSearchParams.set("searchTerm", query);
      newSearchParams.set("sortOption", sortOption);
      newSearchParams.set("order", order);

      router.push(`${pathname}?${newSearchParams.toString()}`);
    }, 300)
  ).current;

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);

    debouncedSearchChange(event.target.value);
  };

  useEffect(() => {
    const newSearchTerm = searchParams.searchTerm || "";
    setQuery(newSearchTerm);
  }, [pathname, searchParams]);

  return {
    query,
    handleSearchChange,
  };
};
