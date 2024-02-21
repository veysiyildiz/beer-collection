"use client";

import React, { useState } from "react";
import { addComment } from "@/app/actions/getBeerDetail";
import { Comments } from "@/components/molecules";
import { CommentForm } from "@/components/organisms";
import { Comment } from "@/interfaces";

interface Props {
  comments: Comment[];
  status: string;
  beerId: string;
}

export default function CommentsWrapper({ comments, status, beerId }: Props) {
  const [commentList, setCommentList] = useState(comments);
  const isLoading = status === "loading";

  const onAddComment = async (text: string) => {
    try {
      ("use server");
      const newCommentResponse = await addComment(beerId, text);
      if ("data" in newCommentResponse && newCommentResponse.data) {
        setCommentList((prev) => [...prev, newCommentResponse.data]);
      }
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
