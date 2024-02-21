import { API_URL } from "@/lib/constants";
import { Beer, Comment, Status } from "@/interfaces";
import DB from "../../db.json";
import fs from "fs";
import path from "path";

export async function getAllBeers() {
  let data = null;
  try {
    if (process.env.NODE_ENV === "development") {
      const res = await fetch(
        `${API_URL}/api/beers?page=0&limit=0&searchTerm=&sortOption=&_order=desc`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      data = await res.json();
    } else {
      data = DB.beers;
    }
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
  return { data };
}

export async function getBeerById(id: string) {
  let data = null;
  let status = "loading";

  try {
    if (process.env.NODE_ENV === "development") {
      const res = await fetch(`${API_URL}/api/beers/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      data = await res.json();
    } else {
      data = DB.beers.find((beer: Beer) => beer.id === id);
    }
    status = "success";
  } catch (error) {
    status = "failed";
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
  return { status, data };
}

export async function getCommentsByBeerId(id: string) {
  let data = null;

  try {
    if (process.env.NODE_ENV === "development") {
      const res = await fetch(`${API_URL}/api/comments/${id}`);
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      data = await res.json();
    } else {
      data = DB.comments.filter((comment: Comment) => comment.beerId === id);
    }
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
    if (process.env.NODE_ENV === "development") {
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
    } else {
      const beer = DB.beers.find((beer: Beer) => beer.id === id);
      if (beer) {
        beer.rating = rating;
        fs.writeFileSync(
          path.resolve(__dirname, "../../db.json"),
          JSON.stringify(DB)
        );
        data = beer;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
  return { data };
}

export async function addComment(beerId: string, text: string) {
  let data = null;

  try {
    if (process.env.NODE_ENV === "development") {
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
    } else {
      const comment = { beerId, text };
      DB.comments.push(comment);
      fs.writeFileSync(
        path.resolve(__dirname, "../../db.json"),
        JSON.stringify(DB)
      );
      data = comment;
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
  return { data };
}
