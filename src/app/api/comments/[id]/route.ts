import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDB } from "@/lib/mongoose";
import CommentModel from "@/lib/models/comment.model";
import { Comment } from "@/types";

export async function GET(
  request: NextRequest,
  context: any
): Promise<NextResponse<Comment[] | { message: string }>> {
  try {
    await connectToDB();

    const { params } = context;
    const comments = await CommentModel.find({ beerId: params.id.toString() });

    return NextResponse.json(comments);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(errorMessage, { status: 500 });
  }
}

export async function POST(
  request: NextRequest
): Promise<NextResponse<Comment | { message: string }>> {
  try {
    await connectToDB();

    const data = await request.json();

    const newComment = new CommentModel({
      _id: new mongoose.Types.ObjectId(),
      ...data,
    });
    await newComment.save();

    return NextResponse.json(newComment);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(errorMessage, { status: 500 });
  }
}
