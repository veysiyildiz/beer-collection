import { NextRequest, NextResponse } from "next/server";
import { Comment } from "@/types";
import fs from "fs/promises";
import path from "path";

type DBObject = {
  comments: Comment[];
};

const dbPath = path.join(process.cwd(), "db.json");

const readDB = async (): Promise<DBObject> => {
  const dbContents = await fs.readFile(dbPath, "utf8");
  return JSON.parse(dbContents);
};

const writeDB = async (dbObject: DBObject): Promise<void> => {
  await fs.writeFile(dbPath, JSON.stringify(dbObject, null, 2));
};

export async function GET(
  request: NextRequest,
  context: any
): Promise<NextResponse<Comment[] | { message: string }>> {
  try {
    const { comments } = await readDB();
    const { params } = context;

    return NextResponse.json(
      comments.filter(
        (comment: Comment) => comment.beerId === params.id.toString()
      )
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(errorMessage, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  context: any
): Promise<NextResponse<Comment | { message: string }>> {
  try {
    const dbObject = await readDB();
    const data = await request.json();

    const newComment: Comment = {
      ...data,
    };

    dbObject.comments.push(newComment);

    await writeDB(dbObject);

    return NextResponse.json(newComment);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(errorMessage, { status: 500 });
  }
}
