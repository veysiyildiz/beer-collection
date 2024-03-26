"use server";

import { API_URL } from "@/lib/constants";
import { revalidatePath } from "next/cache";

export default async function rateBeer(id: string, rating: number) {
  let data = null;

  try {
    const res = await fetch(`${API_URL}api/rating/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rating }),
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    data = await res.json();
    revalidatePath(`/`);
    revalidatePath(`/beer/${id}`);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
  return { data };
}
