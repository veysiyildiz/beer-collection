import React from "react";
import { Select, Label } from "@/components/atoms";

interface SortFilterProps {
  options: { value: string; text: string }[];
  onSortChange: (sortOption: string) => void;
  selectedSortOption?: string;
}

const SortFilter: React.FC<SortFilterProps> = ({
  options,
  selectedSortOption,
  onSortChange,
}) => {
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value);
  };

  return (
    <div className="flex items-center">
      <Select
        options={options}
        selectedOption={selectedSortOption}
        onChange={handleSortChange}
      />
    </div>
  );
};

export default SortFilter;
