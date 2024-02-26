import React from "react";
import { twMerge } from "tailwind-merge";

interface TextAreaProps {
  placeholder: string;
  className?: string;
  id?: string;
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ placeholder, className, id, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        id={id}
        placeholder={placeholder}
        className={twMerge(
          "border border-gray-300 rounded w-full h-32 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
          className
        )}
        aria-label={placeholder}
        {...props}
      />
    );
  }
);

TextArea.displayName = "TextArea";

export default TextArea;
