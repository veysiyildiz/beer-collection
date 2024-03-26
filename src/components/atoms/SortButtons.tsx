"use client";

import React from "react";
import { ArrowDownAZ, ArrowDownZA } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { DEFAULT_SORT_ORDER } from "@/lib/constants";
import { Button } from "@/components/atoms";
import { useSearchAndSelect } from "@/lib/hooks/useSearchAndSelect";
import { SearchParams } from "@/types";

type SortButtonsProps = {
  searchParams: SearchParams;
};

const SortButtons: React.FC<SortButtonsProps> = ({ searchParams }) => {
  const { handleOrderChange } = useSearchAndSelect();
  const sortOrder = searchParams.order || DEFAULT_SORT_ORDER;

  return (
    <div className="flex">
      <Button
        className={twMerge(
          `flex items-center text-gray-500 border-none mr-2 ${
            sortOrder === "asc" ? "text-blue-500" : "text-gray-500"
          }`
        )}
        onClick={() => handleOrderChange("asc")}
      >
        <ArrowDownAZ />
      </Button>
      <Button
        className={twMerge(
          `flex items-center text-gray-500 border-none mr-2 ${
            sortOrder === "desc" ? "text-blue-500" : "text-gray-500"
          }`
        )}
        onClick={() => handleOrderChange("desc")}
      >
        <ArrowDownZA />
      </Button>
    </div>
  );
};

export default SortButtons;
