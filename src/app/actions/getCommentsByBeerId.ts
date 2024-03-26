"use server";

import { API_URL } from "@/lib/constants";

export default async function getCommentsByBeerId(id: string) {
  let data = null;

  try {
    const res = await fetch(`${API_URL}api/comments/${id}`);
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
