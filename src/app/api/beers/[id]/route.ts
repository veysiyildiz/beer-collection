import { NextRequest, NextResponse } from "next/server";
import { Beer } from "@/interfaces";
import fs from "fs";
import path from "path";

interface DBObject {
  beers: Beer[];
}

export async function GET(
  request: NextRequest,
  context: any
): Promise<NextResponse<Beer | { message: string }>> {
  try {
    const dbPath = path.join(process.cwd(), "db.json");
    const dbContents = fs.readFileSync(dbPath, "utf8");

    const { beers }: DBObject = JSON.parse(dbContents);

    const { params } = context;

    const beer = beers.find((beer: Beer) => beer.id === params.id.toString());

    if (!beer) {
      return new NextResponse(null, { status: 404 });
    }

    return NextResponse.json(beer);
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    } else {
      return new NextResponse("An unknown error occurred", { status: 500 });
    }
  }
}
