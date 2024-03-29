import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import { connectToDB } from "@/lib/mongoose";
import BeerModel from "@/lib/models/beer.model";
import { Beer } from "@/types";

export async function POST(
  request: NextRequest
): Promise<NextResponse<Beer | { message: string }>> {
  try {
    await connectToDB();
    const data = await request.json();
    const newBeer = new BeerModel({
      _id: new mongoose.Types.ObjectId(),
      ...data,
    });

    await newBeer.save();
    revalidatePath("/");
    return NextResponse.json(newBeer);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(errorMessage, { status: 500 });
  }
}
