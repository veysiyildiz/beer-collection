import { API_URL, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { Beer, Status } from "@/interfaces";

export async function getBeers({
  page = DEFAULT_PAGE,
  limit = DEFAULT_PAGE_SIZE,
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
  let status = "loading";
  let data = null;
  try {
    const res = await fetch(
      `${API_URL}/api/beers?page=${page}&limit=${limit}&searchTerm=${searchTerm}&sortOption=${sortOption}&_order=${_order}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    data = await res.json();
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

export async function addBeer(beer: Beer) {
  let status = "loading";
  let data = null;
  try {
    const res = await fetch(`${API_URL}/api/beers/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(beer),
    });
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    data = await res.json();
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
