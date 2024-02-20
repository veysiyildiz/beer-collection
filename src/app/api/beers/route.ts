import { NextRequest, NextResponse } from "next/server";
import { Beer, BeerData } from "@/interfaces";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest
): Promise<NextResponse<BeerData | { message: string }>> {
  try {
    const dbPath = path.join(process.cwd(), "db.json");
    const dbContents = fs.readFileSync(dbPath, "utf8");

    let { beers }: { beers: Beer[] } = JSON.parse(dbContents);

    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    const searchTerm = searchParams.get("searchTerm") || "";
    const sortOption = searchParams.get("sortOption") || "";
    const order = searchParams.get("_order") || "desc";

    if (searchTerm) {
      beers = beers.filter((beer: Beer) =>
        beer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption) {
      beers.sort((a, b) => {
        if (order === "desc") {
          return b[sortOption] > a[sortOption] ? 1 : -1;
        } else {
          return a[sortOption] > b[sortOption] ? 1 : -1;
        }
      });
    }

    const total = beers.length;

    if (limit === 0) {
      return NextResponse.json({ total, beers });
    }

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedBeers = beers.slice(startIndex, endIndex);

    return NextResponse.json({ total, beers: paginatedBeers });
  } catch (error) {
    return NextResponse.error({ status: 500, message: error.message });
  }
}
