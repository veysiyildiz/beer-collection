import React from "react";
import { Search, SortFilter } from "@/components/molecules";

interface FiltersProps {
  sortOptions: { value: string; text: string }[];
  selectedSortOption?: string;
  onSearchChange: (searchTerm: string) => void;
  onSortChange: (sortOption: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  sortOptions,
  selectedSortOption,
  onSearchChange,
  onSortChange,
}) => {
  return (
    <div className="sm:flex justify-between mb-4">
      <Search onSearchChange={onSearchChange} />
      <SortFilter
        options={sortOptions}
        selectedSortOption={selectedSortOption}
        onSortChange={onSortChange}
      />
    </div>
  );
};

export default Filters;
