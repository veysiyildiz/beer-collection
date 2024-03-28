"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import { getSearchParams } from "@/lib/utils";
import { sortOptions } from "@/lib/constants";
import { SearchParams } from "@/types";

type SelectProps = {
  ariaLabel?: string;
  searchParams: SearchParams;
};

const Select: React.FC<SelectProps> = ({ ariaLabel, searchParams }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { page, searchTerm, sortOption, order } = getSearchParams(searchParams);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sortOption = event.target.value;
    const params = new URLSearchParams({
      page,
      searchTerm,
      sortOption,
      order,
    });
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <select
      aria-label={ariaLabel}
      value={sortOption}
      onChange={handleSelectChange}
      className="block w-full mt-1 border p-2 pr-3 border-gray-300 text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm rounded-md"
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
