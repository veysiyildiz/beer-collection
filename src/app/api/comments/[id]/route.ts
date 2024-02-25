import { NextRequest, NextResponse } from "next/server";
import { Comment } from "@/interfaces";
import fs from "fs";
import path from "path";

interface DBObject {
  comments: Comment[];
}

export async function GET(
  request: NextRequest,
  context: any
): Promise<NextResponse<Comment[] | { message: string }>> {
  try {
    const dbPath = path.join(process.cwd(), "db.json");
    const dbContents = fs.readFileSync(dbPath, "utf8");

    const { comments }: DBObject = JSON.parse(dbContents);

    const { params } = context;

    return NextResponse.json(
      comments.filter(
        (comment: Comment) => comment.beerId === params.id.toString()
      )
    );
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    } else {
      return new NextResponse("An unknown error occurred", { status: 500 });
    }
  }
}

export async function POST(
  request: NextRequest,
  context: any
): Promise<NextResponse<Comment | { message: string }>> {
  try {
    const dbPath = path.join(process.cwd(), "db.json");
    const dbContents = fs.readFileSync(dbPath, "utf8");

    let dbObject: DBObject = JSON.parse(dbContents);
    const { params } = context;

    const data = await request.json();

    const newComment: Comment = {
      ...data,
    };

    dbObject.comments.push(newComment);

    fs.writeFileSync(dbPath, JSON.stringify(dbObject, null, 2));

    return NextResponse.json(newComment);
  } catch (error) {
    if (error instanceof Error) {
      return new NextResponse(error.message, { status: 500 });
    } else {
      return new NextResponse("An unknown error occurred", { status: 500 });
    }
  }
}
