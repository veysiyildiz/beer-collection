import { API_URL, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { Beer, Status } from "@/interfaces";

export async function getBeers({
  page = DEFAULT_PAGE,
  limit = DEFAULT_PAGE_SIZE,
  searchTerm = "",
  sortOption = "",
  order = "desc",
}: {
  page: number;
  limit: number;
  searchTerm: string;
  sortOption: string;
  order: string;
}): Promise<{
  status: Status;
  data: Beer[] | null;
}> {
  let status: Status = "loading";
  let data: Beer[] | null = null;
  try {
    const res = await fetch(
      `${API_URL}/api/beers?page=${page}&limit=${limit}&searchTerm=${searchTerm}&sortOption=${sortOption}&_order=${order}`
    );
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

export async function addBeer(beer: Beer): Promise<{
  status: Status;
  data: Beer | null;
}> {
  let status: Status = "loading";
  let data: Beer | null = null;
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
    throw new Error(error.message);
  }
  return { status, data };
}
