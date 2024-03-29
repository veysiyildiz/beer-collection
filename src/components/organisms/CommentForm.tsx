"use client";

import React, { useCallback } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { addComment } from "@/app/actions";
import { Button, Label, TextArea, ErrorMessage } from "@/components/atoms";
import { SubmitButton } from "@/components/molecules";
import { CommentValidation } from "@/lib/validations";
import { Comment } from "@/types";

type CommentFormProps = {
  beerId: string;
};

const CommentForm: React.FC<CommentFormProps> = ({ beerId }) => {
  const {
    register,
    formState: { errors },
    reset,
  } = useForm<Comment>({
    resolver: zodResolver(CommentValidation),
    defaultValues: {
      date: Date.now().toString(),
      text: "",
    },
  });

  async function addCommentClientAction(formData: FormData) {
    const data = Object.fromEntries(formData);

    const comment: Comment = {
      beerId,
      date: data.date.toString(),
      text: data.text.toString(),
    };
    try {
      const res = await addComment(comment);
      toast.success("Comment added successfully");
      reset();
    } catch (error) {
      toast.error(
        (error as any).response?.data?.message || "Error adding comment"
      );
    }
  }

  return (
    <form
      action={addCommentClientAction}
      className="w-full max-w-lg p-4 mx-auto"
    >
      <input
        type="hidden"
        {...register("date")}
        value={Date.now().toString()}
      />

      <Label text="Comment" htmlFor="text" />
      <TextArea
        id="text"
        {...register("text")}
        placeholder="Enter your comment"
      />
      {errors.text?.message && <ErrorMessage message={errors.text?.message} />}

      <SubmitButton>Add Comment</SubmitButton>
    </form>
  );
};

export default CommentForm;
