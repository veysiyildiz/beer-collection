import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Text, Rating } from "@/components/atoms";
import { Beer } from "@/types";

type BeerCardProps = {
  beer?: Beer | undefined;
};

const BeerCard: React.FC<BeerCardProps> = React.memo(
  ({ beer }: BeerCardProps) => {
    return (
      beer &&
      beer._id && (
        <Link href={`/beer/${beer._id.toString()}`}>
          <div className="overflow-hidden flex flex-col items-center justify-between border p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out h-96">
            <Image
              src={beer.image_url || "/default_beer.png"}
              alt={beer.name || "Beer"}
              width={120}
              height={200}
              priority
              className="rounded-md w-auto h-48 object-scale-down data-[loaded=false]:bg-gray-100/10"
            />
            <Text
              variant="h2"
              className="mt-4 text-xl text-center font-bold line-clamp-2"
            >
              {beer.name}
            </Text>
            <Text
              variant="p"
              className="mt-2 text-sm text-center text-gray-600"
            >
              {beer.tagline}
            </Text>
            <Rating
              key={beer._id}
              className="mt-4"
              rating={beer.averageRating || 0}
              beerId={beer._id}
            />
          </div>
        </Link>
      )
    );
  }
);

BeerCard.displayName = "BeerCard";

export default BeerCard;
