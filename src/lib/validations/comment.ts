import * as z from "zod";

const CommentValidation = z.object({
  _id: z.string().optional(),
  text: z.string().nonempty({ message: "Comment is required" }),
  beerId: z.string().nonempty({ message: "Beer ID is required" }),
  date: z.string().nonempty({ message: "Date is required" }),
});

export default CommentValidation;
