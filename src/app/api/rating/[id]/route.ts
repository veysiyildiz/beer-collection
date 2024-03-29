import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { connectToDB } from "@/lib/mongoose";
import RatingModel from "@/lib/models/rating.model";
import BeerModel from "@/lib/models/beer.model";
import { Rating, Beer } from "@/types";

const calculateAverageRating = (ratings: Rating[]): number => {
  if (ratings.length === 0) return 0;
  const totalRating = ratings.reduce(
    (total: number, rating: Rating) => total + Number(rating.rating),
    0
  );
  return totalRating / ratings.length;
};

export async function POST(
  request: NextRequest,
  context: any
): Promise<NextResponse<Rating | { message: string }>> {
  try {
    await connectToDB();
    const { params } = context;
    const data = await request.json();

    const newRating = new RatingModel({
      beerId: params.id.toString(),
      _id: new mongoose.Types.ObjectId(),
      ...data,
    });

    await newRating.save();

    const beer = await BeerModel.findOne({ _id: newRating.beerId.toString() });
    if (!beer) {
      throw new Error("Beer not found");
    }

    const relatedRatings = await RatingModel.find({
      beerId: newRating.beerId.toString(),
    });

    beer.averageRating = calculateAverageRating(relatedRatings);
    await beer.save();

    revalidatePath(`/`);
    revalidatePath(`/beer/${newRating.beerId}`);

    const { beerId, rating } = newRating;
    return NextResponse.json({
      beerId,
      rating,
      beer,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(errorMessage, { status: 500 });
  }
}
