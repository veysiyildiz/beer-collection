import React from "react";

interface InputProps {
  placeholder?: string;
  className?: string;
  hidden?: boolean;
  type?: string;
  id?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { placeholder, className, hidden, type = "text", id, onChange, ...props },
    ref
  ) => {
    return (
      <input
        id={id}
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={`border rounded w-full py-2 px-3 mb-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${className}`}
        hidden={hidden}
        aria-label={placeholder}
        onChange={onChange}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
