import { NextRequest, NextResponse } from "next/server";
import { Rating, Beer } from "@/interfaces";
import fs from "fs";
import path from "path";

interface DBObject {
  ratings: Rating[];
  beers: Beer[];
}

export async function POST(
  request: NextRequest,
  context: any
): Promise<NextResponse<Rating | { message: string }>> {
  try {
    const dbPath = path.join(process.cwd(), "db.json");
    const dbContents = fs.readFileSync(dbPath, "utf8");

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
      const totalRating = relatedRatings.reduce(
        (total: number, rating: Rating) => total + rating.rating,
        0
      );
      beer.averageRating = totalRating / relatedRatings.length;
      updatedBeer = beer;
    }

    fs.writeFileSync(dbPath, JSON.stringify(dbObject, null, 2));

    if (updatedBeer) {
      return NextResponse.json({ rating: newRating, beer: updatedBeer });
    } else {
      throw new Error("Beer not found");
    }
  } catch (error) {
    return NextResponse.error({ status: 500, message: error.message });
  }
}
