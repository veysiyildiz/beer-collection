"use server";

import { API_URL } from "@/lib/constants";

export default async function getAllBeers() {
  let data = null;
  try {
    const res = await fetch(
      `${API_URL}api/beers?page=0&limit=0&searchTerm=&sortOption=&order=desc`
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
  if (data === null) {
    throw new Error("Data is null");
  }
  return { data: data.beers };
}
