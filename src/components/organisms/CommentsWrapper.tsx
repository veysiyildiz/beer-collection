"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
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
      toast.success("Comment added successfully");
    } catch (error) {
      const errorMessage =
        (error as any).response?.data?.message || "Error adding comment";
      toast.error(errorMessage);
    }
  };

  return (
    <>
      <Comments comments={commentList} status={status} />
      <CommentForm onAddComment={onAddComment} />
    </>
  );
}
