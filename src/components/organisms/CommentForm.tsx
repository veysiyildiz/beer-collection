"use client";

import React, { useCallback } from "react";
import { addComment } from "@/app/actions";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Label, TextArea, ErrorMessage } from "@/components/atoms";
import { Comment } from "@/types";
import SubmitButton from "../molecules/SubmitButton";
import toast from "react-hot-toast";

const schema = z.object({
  text: z.string().nonempty({ message: "Comment is required" }),
  beerId: z.string().nonempty({ message: "Beer ID is required" }),
  date: z.string().nonempty({ message: "Date is required" }),
});

type CommentFormProps = {
  beerId: string;
};

const CommentForm: React.FC<CommentFormProps> = ({ beerId }) => {
  const {
    register,
    formState: { errors },
    reset,
  } = useForm<Comment>({
    resolver: zodResolver(schema),
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
      <ErrorMessage message={errors.text?.message} />

      <SubmitButton>Add Comment</SubmitButton>
    </form>
  );
};

export default CommentForm;
