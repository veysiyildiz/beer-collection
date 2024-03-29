"use client";

import React from "react";
import { rateBeer } from "@/app/actions";
import Skeleton from "react-loading-skeleton";
import { Text, Rating } from "@/components/atoms";
import { Properties } from "@/components/molecules";
import { Beer, Comment } from "@/types";
import Image from "next/image";

type BeerDetailProps = {
  beer: Beer;
};

const BeerDetail: React.FC<BeerDetailProps> = ({ beer }) => {
  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
      <div className="flex flex-col items-center">
        <Image
          src={beer?.image_url}
          alt={beer?.name}
          width={300}
          height={450}
          priority
          className="object-scale-down w-auto h-96 sm:h-[500px] m-auto"
        />
        <Rating
          className="mt-4"
          rating={beer?.averageRating || 0}
          clickable
          beerId={beer?._id as string}
        />
      </div>
      <div className="flex flex-col">
        <Text variant="h1" className="sm:text-left text-center mt-4">
          {beer?.name}
        </Text>
        <Text variant="h2" className="sm:text-left text-center mt-4 mb-4">
          {beer?.tagline}
        </Text>
        <Text variant="p">{beer?.description}</Text>
        <Properties
          className="mt-4"
          name="Alcohol By Volume"
          value={beer?.abv.toString()}
        />
        <Properties name="First Brewed" value={beer?.first_brewed} />
        <Properties name="Brewer Tips" value={beer?.brewers_tips} />

        <Text variant="h3" className="font-bold mt-4">
          Best Food Pairing
        </Text>
        <ul className="list-disc list-inside">
          {beer?.food_pairing?.map((food: string, index: number) => (
            <li key={index}>
              <Text variant="span">{food}</Text>
            </li>
          ))}
        </ul>
        <Text variant="h5" className="mt-6">
          {beer?.contributed_by}
        </Text>
      </div>
    </div>
  );
};

export default BeerDetail;
