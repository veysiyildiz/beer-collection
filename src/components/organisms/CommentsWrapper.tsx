import React from "react";
import { Comments } from "@/components/molecules";
import { CommentForm } from "@/components/organisms";
import { Comment } from "@/interfaces";

interface Props {
  comments: Comment[];
  beerId: string;
}

export default function CommentsWrapper({ comments, beerId }: Props) {
  return (
    <>
      <Comments comments={comments} />
      <CommentForm beerId={beerId} />
    </>
  );
}
