import * as z from "zod";
import { DEFAULT_PAGE, DEFAULT_SORT_ORDER } from "@/lib/constants";

const SearchParamsValidation = z.object({
  page: z.string().default(DEFAULT_PAGE),
  searchTerm: z.string().default(""),
  sortOption: z.enum(["", "abv", "first_brewed"]).default(""),
  order: z.enum(["asc", "desc"]).default(DEFAULT_SORT_ORDER),
});

export default SearchParamsValidation;
