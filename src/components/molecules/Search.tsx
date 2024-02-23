"use client";

import React from "react";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/atoms";
import { useSearchAndSelect } from "@/lib/hooks/useSearchAndSelect";

interface SortButtonsProps {
  searchTerm: string;
  sortOption: string;
  _order: string;
  page: number;
}

const Search: React.FC<SearchProps> = ({
  searchTerm: initialSearchTerm,
  sortOption,
  _order,
  page,
}) => {
  const { searchTerm, handleSearchChange } = useSearchAndSelect();

  return (
    <div role="search" className="block sm:flex items-center w-full">
      <div className="relative">
        <Input
          type="text"
          id="search"
          placeholder="Search Beers by Name"
          className="block w-full pl-10 mt-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm rounded-md"
          onChange={handleSearchChange}
          value={searchTerm}
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
};

export default Search;
