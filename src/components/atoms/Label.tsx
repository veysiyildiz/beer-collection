import React from "react";
import { twMerge } from "tailwind-merge";

type LabelProps = {
  text?: string;
  htmlFor?: string;
  children?: React.ReactNode;
  className?: string;
};

const Label: React.FC<LabelProps> = ({
  text,
  htmlFor,
  children,
  className,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={twMerge(
        "block text-md font-bold mb-2 text-gray-700",
        className
      )}
    >
      {children}
      {text}
    </label>
  );
};

export default Label;
