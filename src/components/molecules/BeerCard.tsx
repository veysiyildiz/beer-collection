import React from "react";
import Link from "next/link";
import { Text, Rating, ImageWithLoader } from "@/components/atoms";
import { Beer } from "@/interfaces";

interface BeerCardProps {
  beer?: Beer | undefined;
}

const BeerCard: React.FC<BeerCardProps> = React.memo(
  ({ beer }: BeerCardProps) => {
    return (
      <Link href={`/beer/${beer?.id}`}>
        <div className="overflow-hidden flex flex-col items-center justify-between border p-4 rounded-md shadow-md hover:shadow-lg transition-shadow duration-200 ease-in-out h-96">
          <ImageWithLoader
            src={beer?.image_url || "/default_beer.png"}
            alt={beer?.name || "Beer"}
            width={120}
            height={200}
            className="rounded-md h-48 object-scale-down"
          />
          <Text
            variant="h2"
            className="mt-4 text-xl text-center font-bold line-clamp-2"
          >
            {beer?.name}
          </Text>
          <Text variant="p" className="mt-2 text-sm text-center text-gray-600">
            {beer?.tagline}
          </Text>
          <Rating className="mt-4" rating={beer?.averageRating || 0} />
        </div>
      </Link>
    );
  }
);

BeerCard.displayName = "BeerCard";

export default BeerCard;
