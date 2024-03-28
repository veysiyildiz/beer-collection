import React from "react";
import Link from "next/link";
import { ArrowDownAZ, ArrowDownZA } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { getSearchParams } from "@/lib/utils";
import { SearchParams } from "@/types";

type SortButtonsProps = {
  searchParams: SearchParams;
};

const SortButtons: React.FC<SortButtonsProps> = ({ searchParams }) => {
  const params = getSearchParams(searchParams);

  const generateSortParams = (newOrder: string) => {
    const newParams = new URLSearchParams({ ...params, order: newOrder });
    return `?${newParams.toString()}`;
  };

  const orders = [
    { order: "asc", Icon: ArrowDownAZ },
    { order: "desc", Icon: ArrowDownZA },
  ];

  return (
    <div className="flex">
      {orders.map(({ order, Icon }) => (
        <Link
          key={order}
          className={twMerge(
            `flex items-center text-gray-500 border-none m-2 ${
              params.order === order ? "text-blue-500" : "text-gray-500"
            }`
          )}
          href={generateSortParams(order)}
        >
          <Icon />
        </Link>
      ))}
    </div>
  );
};

export default SortButtons;
