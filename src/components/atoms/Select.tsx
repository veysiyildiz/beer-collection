"use client";

import React from "react";
import { useSearchAndSelect } from "@/lib/hooks/useSearchAndSelect";

type SelectProps = {
  ariaLabel?: string;
};

const sortOptions = [
  { value: "", text: "Sort" },
  { value: "abv", text: "Alcohol By Volume" },
  { value: "first_brewed", text: "First Brewed" },
];

const Select: React.FC<SelectProps> = ({ ariaLabel }) => {
  const { selectedSortOption, handleSelectChange } = useSearchAndSelect();

  return (
    <select
      aria-label={ariaLabel}
      className="block w-full mt-1 border p-2 pr-3 border-gray-300 text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm rounded-md"
      onChange={handleSelectChange}
      tabIndex={0}
      value={selectedSortOption || ""}
    >
      {sortOptions?.map((option, index) => (
        <option key={index} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default Select;
