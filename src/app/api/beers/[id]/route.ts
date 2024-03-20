import { NextRequest, NextResponse } from "next/server";
import { Beer } from "@/types";
import fs from "fs/promises";
import path from "path";

type DBObject = {
  beers: Beer[];
};

const findBeer = (beers: Beer[], id: string): Beer | undefined => {
  return beers.find((beer: Beer) => beer.id === id);
};

export async function GET(
  request: NextRequest,
  context: any
): Promise<NextResponse<Beer | { message: string }>> {
  try {
    const dbPath = path.join(process.cwd(), "db.json");
    const dbContents = await fs.readFile(dbPath, "utf8");

    const { beers }: DBObject = JSON.parse(dbContents);

    const { params } = context;

    const beer = findBeer(beers, params.id.toString());

    if (!beer) {
      return new NextResponse(null, { status: 404 });
    }

    return NextResponse.json(beer);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(errorMessage, { status: 500 });
  }
}
