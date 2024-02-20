import { API_URL } from "@/lib/constants";
import { Beer, Comment, Status } from "@/interfaces";

export async function getAllBeers(): Promise<{
  data: Beer[] | null;
}> {
  let data: Beer[] | null = null;
  try {
    const res = await fetch(
      `${API_URL}/api/beers?page=0&limit=0&searchTerm=&sortOption=&_order=desc`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    data = await res.json();
  } catch (error) {
    throw new Error(error.message);
  }
  return data.beers;
}

export async function getBeerById(id: string): Promise<{
  data: Beer | null;
}> {
  let data: Beer | null = null;
  let status: Status = "loading";

  try {
    const res = await fetch(`${API_URL}/api/beers/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    data = await res.json();
    status = "success";
  } catch (error) {
    status = "failed";
    throw new Error(error.message);
  }
  return { status, data };
}

export async function getCommentsByBeerId(id: string): Promise<{
  data: Comment[] | null;
}> {
  let data: Comment[] | null = null;

  try {
    const res = await fetch(`${API_URL}/api/comments/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    data = await res.json();
  } catch (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function rateTheBeer(
  id: string,
  rating: number
): Promise<{
  data: Beer | null;
}> {
  let data: Beer | null = null;

  try {
    const res = await fetch(`${API_URL}/api/rating/${id}`, {
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
  } catch (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function addComment(
  beerId: string,
  text: string
): Promise<{
  data: Comment | null;
}> {
  let data: Comment | null = null;

  try {
    const res = await fetch(`${API_URL}/api/comments/${beerId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    data = await res.json();
  } catch (error) {
    throw new Error(error.message);
  }
  return data;
}
