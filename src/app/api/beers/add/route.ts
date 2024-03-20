import { NextRequest, NextResponse } from "next/server";
import { Beer } from "@/types";
import fs from "fs/promises";
import path from "path";

type DBObject = {
  beers: Beer[];
};

const dbPath = path.join(process.cwd(), "db.json");

const readDB = async (): Promise<DBObject> => {
  const dbContents = await fs.readFile(dbPath, "utf8");
  return JSON.parse(dbContents);
};

const writeDB = async (dbObject: DBObject): Promise<void> => {
  await fs.writeFile(dbPath, JSON.stringify(dbObject, null, 2));
};

export async function POST(
  request: NextRequest
): Promise<NextResponse<Beer | { message: string }>> {
  try {
    const dbObject = await readDB();

    const data = await request.json();

    const newBeer: Beer = {
      ...data,
    };

    dbObject.beers.push(newBeer);

    await writeDB(dbObject);

    return NextResponse.json(newBeer);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(errorMessage, { status: 500 });
  }
}
