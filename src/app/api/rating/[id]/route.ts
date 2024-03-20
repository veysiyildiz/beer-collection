import { NextRequest, NextResponse } from "next/server";
import { Rating, Beer } from "@/types";
import fs from "fs/promises";
import path from "path";

type DBObject = {
  ratings: Rating[];
  beers: Beer[];
};

const calculateAverageRating = (ratings: Rating[]): number => {
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
    const dbPath = path.join(process.cwd(), "db.json");
    const dbContents = await fs.readFile(dbPath, "utf8");

    let dbObject: DBObject = JSON.parse(dbContents);
    const { params } = context;

    const data = await request.json();

    const newRating: Rating = {
      beerId: params.id.toString(),
      id: Date.now().toString(),
      ...data,
    };

    dbObject.ratings.push(newRating);

    let updatedBeer: Beer | undefined;
    const beer = dbObject.beers.find(
      (beer: Beer) => beer.id === newRating.beerId
    );
    if (beer) {
      const relatedRatings = dbObject.ratings.filter(
        (rating: Rating) => rating.beerId === newRating.beerId
      );
      beer.averageRating = calculateAverageRating(relatedRatings);
      updatedBeer = beer;
    }

    await fs.writeFile(dbPath, JSON.stringify(dbObject, null, 2));

    if (updatedBeer) {
      return NextResponse.json({
        beerId: updatedBeer.id,
        rating: newRating.rating,
        beer: updatedBeer,
      });
    } else {
      throw new Error("Beer not found");
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    return new NextResponse(errorMessage, { status: 500 });
  }
}
