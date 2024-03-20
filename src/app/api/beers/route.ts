import { NextRequest, NextResponse } from "next/server";
import { Beer, BeerData } from "@/types";
import fs from "fs/promises";
import path from "path";
import {
  DEFAULT_SORT_ORDER,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "@/lib/constants";

const filterBeers = (beers: Beer[], searchTerm: string): Beer[] => {
  if (!searchTerm) return beers;
  return beers.filter(
    (beer: Beer) =>
      beer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      beer.tagline.toLowerCase().includes(searchTerm.toLowerCase())
  );
};

const sortBeers = (
  beers: Beer[],
  sortOption: string,
  _order: string
): Beer[] => {
  if (!sortOption) return beers;
  return beers.sort((a, b) => {
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
};

const paginateBeers = (beers: Beer[], page: string, limit: string): Beer[] => {
  if (+limit === 0) return beers;
  const startIndex = 0;
  const endIndex = +page * +limit;
  return beers.slice(startIndex, endIndex);
};

export async function GET(
  request: NextRequest
): Promise<NextResponse<BeerData | { message: string }>> {
  try {
    const dbPath = path.join(process.cwd(), "db.json");
    const dbContents = await fs.readFile(dbPath, "utf8");
    let { beers }: { beers: Beer[] } = JSON.parse(dbContents);

    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    const page = searchParams.get("page") || DEFAULT_PAGE;
    const limit = searchParams.get("limit") || DEFAULT_PAGE_SIZE;
    const searchTerm = searchParams.get("searchTerm") || "";
    const sortOption = searchParams.get("sortOption") || "name";
    const _order = searchParams.get("_order") || DEFAULT_SORT_ORDER;

    beers = filterBeers(beers, searchTerm);
    beers = sortBeers(beers, sortOption, _order);
    const total = beers.length;
    const paginatedBeers = paginateBeers(beers, page, limit);

    return NextResponse.json({ total, beers: paginatedBeers });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(errorMessage, { status: 500 });
  }
}
