"use server";

import { revalidatePath } from "next/cache";
import { API_URL } from "@/lib/constants";
import { Comment } from "@/types";

export default async function addComment(data: Comment) {
  try {
    const res = await fetch(`${API_URL}api/comments/${data.beerId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    revalidatePath(`/beer/${data.beerId}`);
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
