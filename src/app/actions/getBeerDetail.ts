"use server";

import { API_URL } from "@/lib/constants";
import { Beer, Comment, Status } from "@/types";
import { revalidatePath } from "next/cache";

export async function getAllBeers() {
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

export async function getBeerById(id: string) {
  let data = null;

  try {
    const res = await fetch(`${API_URL}api/beers/${id}`);
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

export async function getCommentsByBeerId(id: string) {
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

export async function rateTheBeer(id: string, rating: number) {
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

export async function addComment(data: Comment) {
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
