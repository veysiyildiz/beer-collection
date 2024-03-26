"use server";

import { API_URL } from "@/lib/constants";
import { Beer } from "@/types";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function addBeer(beer: Beer) {
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
