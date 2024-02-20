"use client";

import React, { useState } from "react";
import { addComment } from "@/app/actions/getBeerDetail";
import { Comments } from "@/components/molecules";
import { CommentForm } from "@/components/organisms";
import { Comment, Status } from "@/interfaces";

interface Props {
  comments: Comment[];
  status: Status;
  beerId: string;
}

export default function CommentsWrapper({ comments, status, beerId }: Props) {
  const [commentList, setCommentList] = useState(comments);
  const isLoading = status === "loading";

  const onAddComment = async (text: string) => {
    try {
      ("use server");
      const newComment = await addComment(beerId, text);
      setCommentList((prev) => [...prev, newComment]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Comments comments={commentList} status={status} />
      <CommentForm onAddComment={onAddComment} />
    </>
  );
}
