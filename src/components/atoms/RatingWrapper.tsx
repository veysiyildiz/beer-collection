import React from "react";
import { Rating } from ".";

interface RatingWrapperProps {
  children?: React.ReactNode;
  rating?: number;
}

const RatingWrapper: React.FC<RatingWrapperProps> = ({
  children,
  rating = 5,
}) => {
  return (
    <div>
      <Rating rating={rating} beerId="wrapper" />
      {children}
    </div>
  );
};

export default RatingWrapper;
