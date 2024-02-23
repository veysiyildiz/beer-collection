"use client";

import React from "react";
import { ArrowDownAZ, ArrowDownZA } from "lucide-react";
import { Button } from "@/components/atoms";
import { useSearchAndSelect } from "@/lib/hooks/useSearchAndSelect";

const SortButtons: React.FC = () => {
  const { handleOrderChange } = useSearchAndSelect();

  return (
    <div className="flex">
      <Button
        className="flex items-center text-gray-500 border-none"
        onClick={() => handleOrderChange("asc")}
      >
        <ArrowDownAZ />
      </Button>
      <Button
        className="flex items-center text-gray-500 border-none"
        onClick={() => handleOrderChange("desc")}
      >
        <ArrowDownZA />
      </Button>
    </div>
  );
};

export default SortButtons;
