import React from "react";
import { twMerge } from "tailwind-merge";
import { Input, Label, TextArea, ErrorMessage } from "@/components/atoms";

type FormFieldProps = {
  id: string;
  register: any;
  errors: any;
  label: string;
  placeholder: string;
  type?: string;
  isTextArea?: boolean;
  required?: boolean;
};

const FormField: React.FC<FormFieldProps> = ({
  id,
  register,
  errors,
  label,
  placeholder,
  type = "text",
  isTextArea = false,
  required = true,
}) => (
  <>
    <Label text={label} htmlFor={id} />
    {isTextArea ? (
      <TextArea
        id={id}
        {...register(id, { required })}
        placeholder={placeholder}
      />
    ) : (
      <Input
        id={id}
        type={type}
        {...register(id, { required })}
        placeholder={placeholder}
      />
    )}
    <ErrorMessage message={errors[id]?.message} />
  </>
);

export default FormField;
