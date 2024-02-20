import React, { useCallback } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Label, Input } from "@/components/atoms";
import debounce from "lodash/debounce";

interface SearchProps {
  onSearchChange: (searchTerm: string) => void;
}

const Search: React.FC<SearchProps> = ({ onSearchChange }) => {
  const debouncedSearchChange = debounce(onSearchChange, 300);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSearchChange(event.target.value);
    },
    [debouncedSearchChange]
  );

  return (
    <div role="search" className="block sm:flex items-center w-full">
      <div className="relative">
        <Input
          type="text"
          id="search"
          placeholder="Search Beers by Name"
          className="block w-full pl-10 mt-1 border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm rounded-md"
          onChange={handleSearchChange}
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
};

export default Search;
