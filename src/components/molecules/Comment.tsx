import React from "react";
import Skeleton from "react-loading-skeleton";
import { Text } from "@/components/atoms";
import { Comment } from "@/interfaces";

interface CommentsProps {
  comments: any[];
}

const Comments: React.FC<CommentsProps> = ({ comments }) => {
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
