import * as z from "zod";

const BeerValidation = z.object({
  _id: z.string().optional(),
  name: z.string().nonempty({ message: "Name is required" }),
  tagline: z.string().nonempty({ message: "Tagline is required" }),
  first_brewed: z.string().nonempty({ message: "First brewed is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  image_url: z.string().nonempty({ message: "Image URL is required" }),
  abv: z
    .string()
    .transform((val) => parseFloat(val))
    .refine((value) => value >= 0, {
      message: "ABV must be a non-negative number",
    }),
  food_pairing: z
    .array(z.string())
    .nonempty({ message: "Food pairing is required" }),
  brewers_tips: z.string().nonempty({ message: "Brewers tips is required" }),
  contributed_by: z
    .string()
    .nonempty({ message: "Contributed by is required" }),
  averageRating: z.number().optional(),
});

export default BeerValidation;
