import React from "react";
import Skeleton from "react-loading-skeleton";
import { Text } from "@/components/atoms";

const BeerDetailSkeleton: React.FC = () => {
  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
      <div className="flex flex-col items-center">
        <div className="object-scale-down h-96 sm:h-[500px] mb-2 w-full">
          <Skeleton containerClassName="flex-1" height={450} />
        </div>
      </div>
      <div className="flex flex-col">
        <Text variant="h1" className="sm:text-left text-center mt-4">
          <Skeleton />
        </Text>
        <Text variant="h3" className="sm:text-left text-center mt-4 mb-4">
          <Skeleton count={5} />
        </Text>
        <Skeleton count={5} />
      </div>
    </div>
  );
};

export default BeerDetailSkeleton;
