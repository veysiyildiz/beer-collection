import React from "react";
import Skeleton from "react-loading-skeleton";
import { Text } from "@/components/atoms";
import { Comment } from "@/interfaces";

interface CommentsProps {
  comments: any[];
  status: string;
}

const Comments: React.FC<CommentsProps> = ({ comments, status }) => {
  const isLoading = status === "loading";

  if (isLoading) {
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
  }
  return (
    <div className="space-y-4 p-4 border-1 border-gray-300 rounded shadow">
      <Text variant="h2">Comments</Text>
      {comments.map((comment) => (
        <div
          key={comment?.id}
          className="p-4 border-b-2 border-gray-200 rounded shadow my-2"
        >
          <Text variant="p" className="text-sm">
            {comment?.text}
          </Text>
        </div>
      ))}
    </div>
  );
};

export default Comments;
