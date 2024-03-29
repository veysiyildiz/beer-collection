import * as z from "zod";
import {
  SearchParamsValidation,
  BeerValidation,
  CommentValidation,
  RatingValidation,
} from "@/lib/validations";

export type Status = "loading" | "success" | "failed";

export type BeerData = {
  total: number;
  beers: Beer[];
};

export type Beer = z.infer<typeof BeerValidation>;

export type Comment = z.infer<typeof CommentValidation>;

export type Rating = z.infer<typeof RatingValidation>;

export type SearchParams = z.infer<typeof SearchParamsValidation>;
