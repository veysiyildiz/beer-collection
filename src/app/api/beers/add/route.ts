import { NextRequest, NextResponse } from "next/server";
import { Beer } from "@/interfaces";
import fs from "fs";
import path from "path";

interface DBObject {
  beers: Beer[];
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<Beer | { message: string }>> {
  try {
    const dbPath = path.join(process.cwd(), "db.json");
    const dbContents = fs.readFileSync(dbPath, "utf8");

    let dbObject: DBObject = JSON.parse(dbContents);

    const data = await request.json();

    const newBeer: Beer = {
      ...data,
    };

    dbObject.beers.push(newBeer);

    fs.writeFileSync(dbPath, JSON.stringify(dbObject, null, 2));

    return NextResponse.json(newBeer);
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    } else {
      return new NextResponse("An unknown error occurred", { status: 500 });
    }
  }
}
