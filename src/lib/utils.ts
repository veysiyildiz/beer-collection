import { z } from "zod";
import { getBeers } from "@/app/actions/getBeers";
import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_ORDER,
} from "@/lib/constants";
import { SearchParams } from "@/types";

export async function fetchBeers(searchParams: SearchParams) {
  const {
    page = DEFAULT_PAGE,
    limit = DEFAULT_PAGE_SIZE,
    searchTerm = "",
    sortOption = "name",
    _order = DEFAULT_SORT_ORDER,
  } = searchParams;

  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await getBeers({
      page,
      limit,
      searchTerm,
      sortOption,
      _order,
    });

    return { status: "success", data: response?.data };
  } catch (err) {
    const error =
      err instanceof Error ? err.message : "An unknown error occurred";
    return { status: "failed", error };
  }
}

export const searchParamsSchema = z.object({
  page: z.string().default(DEFAULT_PAGE),
  limit: z.string().default(DEFAULT_PAGE_SIZE),
  searchTerm: z.string().default(""),
  sortOption: z.enum(["", "abv", "first_brewed"]).default(""),
  _order: z.enum(["asc", "desc"]).default(DEFAULT_SORT_ORDER),
});

export const correctSearchParams = (searchParams: SearchParams) => {
  const result = searchParamsSchema.safeParse(searchParams);
  let correctedSearchParams = { ...searchParams };

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      if (issue.path) {
        const key = issue.path[0] as keyof typeof searchParamsSchema.shape;
        const fieldSchema = searchParamsSchema.shape[key];
        if (issue.code === "invalid_enum_value") {
          correctedSearchParams = {
            ...correctedSearchParams,
            [key]: issue.options[0],
          };
        }
      }
    });
  }

  return correctedSearchParams;
};

export const removeInvalidKeys = (searchParams: SearchParams) => {
  const validKeys = Object.keys(searchParamsSchema.shape);
  let hasInvalidKey = false;

  Object.keys(searchParams).forEach((key) => {
    const keyOfSearchParams = key as keyof SearchParams;
    if (!validKeys.includes(key)) {
      delete searchParams[keyOfSearchParams];
      hasInvalidKey = true;
    }
  });

  return { correctedSearchParams: searchParams, hasInvalidKey };
};
