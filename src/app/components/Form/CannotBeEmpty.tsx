import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/app/components/BinaryViz";

interface Props {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const CannotBeEmpty = ({ form }: Props) => {
  const errors = form.formState.errors;
  if (!errors.inputType) return null;
  return (
    <p className="text-sm font-medium text-destructive">
      {errors.inputType.message}
    </p>
  );
};
export default CannotBeEmpty;
