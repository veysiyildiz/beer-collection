"use client";

import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { rateTheBeer } from "@/app/actions/getBeerDetail";
import { Star } from "lucide-react";
import { twMerge } from "tailwind-merge";

interface RatingProps {
  rating: number;
  className?: string;
  beerId: string;
  clickable?: boolean;
  children?: React.ReactNode;
}

const Rating: React.FC<RatingProps> = ({
  rating = 5,
  beerId,
  className,
  clickable = false,
  children,
}) => {
  const [hover, setHover] = useState(0);
  const [newRatingValue, setRatingValue] = useState(rating);

  const handleClick = async (event: React.MouseEvent, value: number) => {
    event.stopPropagation();
    if (clickable) {
      try {
        const rating = value;
        const { data } = await rateTheBeer(beerId, rating);
        const beer = data.beer;
        setRatingValue(beer.averageRating);
        toast.success("Rating updated successfully");
      } catch (error) {
        const errorMessage =
          (error as any).response?.data?.message || "Error updating rating";
        toast.error(errorMessage);
      }
    }
  };

  const handleMouseEnter = (value: number) => {
    if (clickable) {
      setHover(value);
    }
  };

  const handleMouseLeave = () => {
    if (clickable) {
      setHover(0);
    }
  };

  return (
    <div className={`flex ${className}`}>
      {children}
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <div
            key={i}
            className={clickable ? "cursor-pointer" : ""}
            onMouseEnter={() => handleMouseEnter(ratingValue)}
            onMouseLeave={handleMouseLeave}
            onClick={(event) => handleClick(event, ratingValue)}
            aria-label={`Rate ${ratingValue} out of 5`}
            tabIndex={0}
            role="radio"
            aria-checked={ratingValue <= (hover || newRatingValue)}
          >
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              className="hidden"
            />
            <Star
              className={twMerge(
                ratingValue <= (hover || newRatingValue)
                  ? "text-yellow-500"
                  : clickable
                  ? "text-gray-500 hover:text-yellow-500"
                  : "text-gray-500"
              )}
              size={16}
              strokeWidth={3}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
