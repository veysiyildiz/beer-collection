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

    return NextResponse.json(
      beers.find((beer: Beer) => beer.id === params.id.toString())
    );
  } catch (error) {
    return NextResponse.error({ status: 500, message: error.message });
  }
}
