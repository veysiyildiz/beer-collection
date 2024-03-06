"use server";

import { API_URL, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { Beer, Status } from "@/interfaces";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getBeers({
  page = Number(DEFAULT_PAGE),
  limit = Number(DEFAULT_PAGE_SIZE),
  searchTerm = "",
  sortOption = "name",
  _order = "asc",
}: {
  page: number;
  limit: number;
  searchTerm: string;
  sortOption: string;
  _order: string;
}) {
  let data = null;
  try {
    const res = await fetch(
      `${API_URL}api/beers?page=${page}&limit=${limit}&searchTerm=${searchTerm}&sortOption=${sortOption}&_order=${_order}`
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

export async function addBeer(beer: Beer) {
  let data: Beer = beer;

  try {
    const res = await fetch(`${API_URL}api/beers/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(beer),
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    revalidatePath("/");
    data = await res.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
  redirect(`/beer/${beer.id}`);
  return { data };
}
