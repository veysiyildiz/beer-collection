"use client";

import React, { ReactNode } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/atoms";

type SubmitButtonProps = {
  children: ReactNode;
};

const SubmitButton: React.FC<SubmitButtonProps> = ({ children }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className="w-full"
      variant="primary"
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
