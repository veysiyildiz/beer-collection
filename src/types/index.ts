import { z } from "zod";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_ORDER,
} from "@/lib/constants";

export type Status = "loading" | "success" | "failed";

export type Beer = {
  id: string;
  abv: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  food_pairing: string[];
  brewers_tips: string;
  contributed_by: string;
  averageRating?: number;
};

export type BeerData = {
  total: number;
  beers: Beer[];
};

export type Comment = {
  id?: string;
  beerId: string;
  text: string;
};

export type Rating = {
  id?: string;
  beerId: string;
  rating: string;
};

export const searchParamsSchema = z.object({
  page: z.string().default(DEFAULT_PAGE),
  limit: z.string().default(DEFAULT_PAGE_SIZE),
  searchTerm: z.string().default(""),
  sortOption: z.enum(["", "abv", "first_brewed"]).default(""),
  _order: z.enum(["asc", "desc"]).default(DEFAULT_SORT_ORDER),
});

export type SearchParams = z.infer<typeof searchParamsSchema>;
