import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import BeerModel from "@/lib/models/beer.model";
import { Beer } from "@/types";

export async function GET(
  request: NextRequest,
  context: any
): Promise<NextResponse<Beer | { message: string }>> {
  try {
    await connectToDB();

    const { params } = context;
    const beer = await BeerModel.findOne({ _id: params.id.toString() });

    return NextResponse.json(beer);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(errorMessage, { status: 500 });
  }
}
