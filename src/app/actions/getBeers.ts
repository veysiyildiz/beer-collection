import { API_URL, DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { Beer, Status } from "@/interfaces";
import DB from "../../db.json";

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
}) {
  let status = "loading";
  let data = null;
  try {
    if (process.env.NODE_ENV === "development") {
      const res = await fetch(
        `${API_URL}/api/beers?page=${page}&limit=${limit}&searchTerm=${searchTerm}&sortOption=${sortOption}&_order=${order}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }
      data = await res.json();
    } else {
      let filteredBeers = DB.beers.filter((beer: Beer) =>
        beer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      filteredBeers.sort((a: Beer, b: Beer) => {
        if (a[sortOption] < b[sortOption]) {
          return order === "desc" ? 1 : -1;
        }
        if (a[sortOption] > b[sortOption]) {
          return order === "desc" ? -1 : 1;
        }
        return 0;
      });

      const start = (page - 1) * limit;
      const end = start + limit;
      data = filteredBeers.slice(start, end);
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

export async function addBeer(beer: Beer) {
  let status = "loading";
  let data = null;
  try {
    if (process.env.NODE_ENV === "development") {
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
    } else {
      DB.beers.push(beer);

      fs.writeFileSync(
        path.resolve(__dirname, "../../db.json"),
        JSON.stringify(DB)
      );

      data = beer;
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
