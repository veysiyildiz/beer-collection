"use client";

import React from "react";
import { rateTheBeer } from "@/app/actions/getBeerDetail";
import Skeleton from "react-loading-skeleton";
import { Text, Rating, RatingWrapper } from "@/components/atoms";
import { Properties } from "@/components/molecules";
import { Beer, Comment } from "@/interfaces";
import Image from "next/image";

interface BeerDetailProps {
  beer: Beer;
  averageRating?: number;
  status?: string;
}

const BeerDetail: React.FC<BeerDetailProps> = ({
  beer,
  averageRating,
  status,
}) => {
  const isLoading = status === "loading";

  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
        <div className="flex flex-col items-center">
          <div className="object-scale-down h-96 sm:h-[500px] mb-2 w-full">
            <Skeleton height={450} />
          </div>
          <Skeleton
            wrapper={RatingWrapper}
            height="100%"
            baseColor="#ebab34"
            highlightColor="#f2cb07"
            duration={0.9}
          />
        </div>
        <div className="flex flex-col">
          <Text variant="h1" className="sm:text-left text-center mt-4">
            <Skeleton />
          </Text>
          <Text variant="h3" className="sm:text-left text-center mt-4 mb-4">
            <Skeleton count={5} />
          </Text>
          <Skeleton count={5} />
        </div>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 grid-cols-1 gap-4">
      <div className="flex flex-col items-center">
        <Image
          src={beer?.image_url}
          alt={beer?.name}
          width={300}
          height={450}
          data-loaded="false"
          onLoad={(event) => {
            event.currentTarget.setAttribute("data-loaded", "true");
          }}
          className="object-scale-down w-auto h-96 sm:h-[500px] m-auto data-[loaded=false]:bg-gray-100/10"
        />
        <Rating
          className="mt-4"
          rating={averageRating || 0}
          clickable
          beerId={beer?.id}
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
          {beer?.food_pairing?.map((food, index) => (
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
