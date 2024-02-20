import React from "react";

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className }) => {
  if (!message) {
    return null;
  }

  return (
    <p role="alert" className={`text-red-500 text-sm ${className}`}>
      {message}
    </p>
  );
};

export default ErrorMessage;
