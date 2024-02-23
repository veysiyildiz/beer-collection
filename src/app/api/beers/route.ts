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
    const sortOption = searchParams.get("sortOption") || "name";
    const _order = searchParams.get("_order") || "asc";

    if (searchTerm) {
      beers = beers.filter((beer: Beer) =>
        beer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption) {
      beers.sort((a, b) => {
        if (_order === "desc") {
          return (b[sortOption as keyof Beer] as any) >
            (a[sortOption as keyof Beer] as any)
            ? 1
            : -1;
        } else {
          return (a[sortOption as keyof Beer] as any) >
            (b[sortOption as keyof Beer] as any)
            ? 1
            : -1;
        }
      });
    }

    const total = beers.length;

    if (limit === 0) {
      return NextResponse.json({ total, beers });
    }

    const startIndex = 0;
    const endIndex = page * limit;

    const paginatedBeers = beers.slice(startIndex, endIndex);

    return NextResponse.json({ total, beers: paginatedBeers });
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    } else {
      return new NextResponse("An unknown error occurred", { status: 500 });
    }
  }
}
