import React from "react";

interface SelectProps {
  ariaLabel?: string;
  options: { value: string; text: string }[];
  selectedOption?: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({
  ariaLabel,
  options,
  onChange,
  selectedOption,
}) => {
  return (
    <select
      aria-label={ariaLabel}
      className="block w-full mt-1 border p-2 pr-3 border-gray-300 text-gray-400 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm rounded-md"
      onChange={onChange}
      tabIndex={0}
      value={selectedOption}
    >
      {options?.map((option, index) => (
        <option key={index} value={option.value}>
          {option.text}
        </option>
      ))}
    </select>
  );
};

export default Select;
