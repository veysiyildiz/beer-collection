import React from "react";
import Skeleton from "react-loading-skeleton";
import { Text } from "@/components/atoms";

const CommentSkeleton: React.FC = () => {
  return (
    <div className="space-y-4 p-4 border-1 border-gray-300 rounded shadow">
      <Text variant="h2">
        <Skeleton width={100} />
      </Text>
      <div className="p-4 border-b-2 border-gray-200 rounded shadow my-2">
        <Skeleton count={2} />
      </div>
    </div>
  );
};

export default CommentSkeleton;
