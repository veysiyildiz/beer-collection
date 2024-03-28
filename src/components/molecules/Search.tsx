"use client";

import React from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/atoms";
import { useSearch } from "@/lib/hooks/useSearch";
import { SearchParams } from "@/types";

type SearchProps = {
  searchParams: SearchParams;
};

const Search: React.FC<SearchProps> = ({ searchParams }) => {
  const { query, handleSearchChange } = useSearch(searchParams);

  return (
    <div role="search" className="block sm:flex items-center w-full">
      <div className="relative">
        <Input
          type="text"
          id="search"
          placeholder="Search Beers by Name"
          className="block w-full pl-10 mt-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm rounded-md"
          onChange={handleSearchChange}
          value={query || ""}
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
};

export default Search;
