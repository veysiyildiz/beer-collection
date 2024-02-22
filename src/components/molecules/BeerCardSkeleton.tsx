import React from "react";
import Skeleton from "react-loading-skeleton";
import { Text } from "@/components/atoms";

const BeerCardSkeleton = () => {
  return (
    <div className="flex flex-col border p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out h-96">
      <Skeleton containerClassName="flex-1" height={200} />
      <Text
        variant="h2"
        className="mt-4 text-xl text-center font-bold line-clamp-2"
      >
        <Skeleton />
      </Text>
      <Text variant="p" className="mt-2 text-sm text-center text-gray-600">
        <Skeleton count={2} />
      </Text>
    </div>
  );
};

BeerCardSkeleton.displayName = "BeerCardSkeleton";

export default BeerCardSkeleton;
