"use client";

import React, { useCallback } from "react";
import { addComment } from "@/app/actions/getBeerDetail";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Label, TextArea, ErrorMessage } from "@/components/atoms";
import { Comment } from "@/interfaces";

const schema = z.object({
  text: z.string().nonempty({ message: "Comment is required" }),
});

interface FormData {
  text: string;
}

interface CommentFormProps {
  onAddComment: (text: string) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = useCallback(
    async (data: { text: string }) => {
      const { text } = data;
      await onAddComment(text);
      reset();
    },
    [onAddComment, reset]
  );

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-lg p-4 mx-auto"
    >
      <Label text="Comment" htmlFor="text" />
      <TextArea
        id="text"
        {...register("text", { required: true })}
        placeholder="Enter your comment"
      />
      <ErrorMessage message={errors.text?.message} />

      <Button
        className="w-full"
        variant="primary"
        onClick={handleSubmit(onSubmit)}
      >
        Add Comment
      </Button>
    </form>
  );
};

export default CommentForm;
