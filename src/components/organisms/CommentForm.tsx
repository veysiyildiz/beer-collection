"use client";

import React, { useCallback } from "react";
import { addComment } from "@/app/actions/getBeerDetail";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button, Label, TextArea, ErrorMessage } from "@/components/atoms";
import { Comment } from "@/interfaces";
import SubmitButton from "../molecules/SubmitButton";
import toast from "react-hot-toast";

const schema = z.object({
  text: z.string().nonempty({ message: "Comment is required" }),
  beerId: z.string().nonempty({ message: "Beer ID is required" }),
  id: z.string().nonempty({ message: "ID is required" }),
});

interface CommentProps {
  text: string;
  beerId: string;
  id: string;
}

interface CommentFormProps {
  beerId: string;
}

const CommentForm: React.FC<CommentFormProps> = ({ beerId }) => {
  const {
    register,
    formState: { errors },
    reset,
  } = useForm<CommentProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      beerId,
      id: Date.now().toString(),
      text: "",
    },
  });

  async function addCommentClientAction(formData: FormData) {
    const data = Object.fromEntries(formData);

    const comment: Comment = {
      beerId: data.beerId.toString(),
      id: data.id.toString(),
      text: data.text.toString(),
    };

    const res = await addComment(comment);
    if (res instanceof Error) {
      toast.error(res.message);
    } else {
      reset();
      toast.success("Comment added successfully");
    }
  }

  return (
    <form
      action={addCommentClientAction}
      className="w-full max-w-lg p-4 mx-auto"
    >
      <input type="hidden" {...register("beerId")} value={beerId} />
      <input type="hidden" {...register("id")} value={Date.now().toString()} />

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
