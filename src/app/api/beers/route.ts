import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/lib/mongoose";
import BeerModel from "@/lib/models/beer.model";
import { BeerData } from "@/types";
import {
  DEFAULT_SORT_ORDER,
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
} from "@/lib/constants";

export async function GET(
  request: NextRequest
): Promise<NextResponse<BeerData | { message: string }>> {
  try {
    await connectToDB();

    const url = new URL(request.url);
    const searchParams = new URLSearchParams(url.search);

    const page = parseInt(searchParams.get("page") || DEFAULT_PAGE);
    const limit = parseInt(searchParams.get("limit") || DEFAULT_PAGE_SIZE);
    const searchTerm = searchParams.get("searchTerm") || "";
    const sortOption = searchParams.get("sortOption") || "name";
    const order = searchParams.get("order") || DEFAULT_SORT_ORDER;

    let query = BeerModel.find({
      $or: [
        { name: new RegExp(searchTerm, "i") },
        { tagline: new RegExp(searchTerm, "i") },
      ],
    });

    query = query.sort({ [sortOption]: order === "desc" ? -1 : 1 });

    const total = await BeerModel.countDocuments(query);
    const beers = await query.limit((page - 1) * limit + limit);

    return NextResponse.json({ total, beers });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(errorMessage, { status: 500 });
  }
}
