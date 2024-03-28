"use server";

import { API_URL, DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { getSearchParams } from "@/lib/utils";
import { SearchParams } from "@/types";

export default async function getBeers(searchParams: SearchParams) {
  const { page, searchTerm, sortOption, order } = getSearchParams(searchParams);
  let data = null;

  try {
    const res = await fetch(
      `${API_URL}api/beers?page=${page}&limit=${DEFAULT_PAGE_SIZE}&searchTerm=${searchTerm}&sortOption=${sortOption}&order=${order}`
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
