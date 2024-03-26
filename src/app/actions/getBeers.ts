"use server";

import {
  API_URL,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  DEFAULT_SORT_ORDER,
} from "@/lib/constants";
import { SearchParams } from "@/types";

export default async function getBeers({
  page = DEFAULT_PAGE,
  limit = DEFAULT_PAGE_SIZE,
  searchTerm = "",
  sortOption = "",
  order = DEFAULT_SORT_ORDER,
}: SearchParams) {
  let data = null;
  try {
    const res = await fetch(
      `${API_URL}api/beers?page=${page}&limit=${limit}&searchTerm=${searchTerm}&sortOption=${sortOption}&order=${order}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    data = await res.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
  return { data };
}
