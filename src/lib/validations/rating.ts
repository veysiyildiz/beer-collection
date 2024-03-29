import * as z from "zod";

const RatingValidation = z.object({
  _id: z.string().optional(),
  rating: z.number().int().min(1).max(5),
  beerId: z.string().nonempty({ message: "Beer ID is required" }),
});

export default RatingValidation;
