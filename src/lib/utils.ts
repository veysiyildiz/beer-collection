import { getBeers } from "@/app/actions";
import { DEFAULT_PAGE, DEFAULT_SORT_ORDER } from "@/lib/constants";
import { SearchParams } from "@/types";
import { SearchParamsValidation } from "@/lib/validations";

export const getSearchParams = (searchParams: SearchParams) => {
  const {
    page = DEFAULT_PAGE,
    searchTerm = "",
    sortOption = "",
    order = DEFAULT_SORT_ORDER,
  } = searchParams;

  return { page, searchTerm, sortOption, order };
};

export async function fetchBeers(searchParams: SearchParams) {
  const { page, searchTerm, sortOption, order } = getSearchParams(searchParams);

  try {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const response = await getBeers({
      page,
      searchTerm,
      sortOption,
      order,
    });

    return { status: "success", data: response?.data };
  } catch (err) {
    const error =
      err instanceof Error ? err.message : "An unknown error occurred";
    return { status: "failed", error };
  }
}

export const correctSearchParams = (searchParams: SearchParams) => {
  const result = SearchParamsValidation.safeParse(searchParams);
  let correctedSearchParams = { ...searchParams };

  if (!result.success) {
    result.error.issues.forEach((issue) => {
      if (issue.path) {
        const key = issue.path[0] as keyof typeof SearchParamsValidation.shape;
        const fieldSchema = SearchParamsValidation.shape[key];
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
  const validKeys = Object.keys(SearchParamsValidation.shape);
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
