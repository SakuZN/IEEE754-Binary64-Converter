import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { formSchema } from "@/app/components/BinaryViz";
import { z } from "zod";
interface Props {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const DecimalField = ({ form }: Props) => {
  return (
    <div className="flex flex-row gap-3">
      <FormField
        control={form.control}
        name="decimal"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Decimal <span className="text-red-500">*</span>
            </FormLabel>
            <div className="flex flex-row items-end gap-2">
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => {
                    let { value } = e.target;

                    // Check if the current input is "N" or "n", and set the value to "NaN"
                    if (value.includes("N") || value.includes("n")) {
                      // If the input already contains a negative sign, set the value to "-NaN"
                      if (value.includes("-")) {
                        field.onChange("-NaN");
                      } else {
                        field.onChange("NaN");
                      }
                    } else if (value.toLowerCase().startsWith("-nan")) {
                      // If "-" is added when "NaN" is already in the field, set the value to "-NaN"
                      field.onChange("-NaN");
                    } else if (value.toLowerCase().startsWith("nan")) {
                      field.onChange("NaN");
                    } else {
                      // Handle regular numeric input
                      const regex = /^-?[0-9]*(\.[0-9]*)?$/;
                      if (regex.test(value) || value === "") {
                        field.onChange(value);
                      }
                    }
                  }}
                  onKeyDown={(e) => {
                    //On backspace and val contains NaN, set the value to empty string
                    if (
                      e.key === "Backspace" &&
                      (field.value === "NaN" || field.value === "-NaN")
                    ) {
                      field.onChange("");
                    }
                  }}
                />
              </FormControl>
              <span className="text-lg font-semibold">x10</span>
            </div>
            <FormMessage className="text-sm" />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="base10"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Exponent <span className="text-red-500">*</span>
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                onChange={(e) => {
                  // Regular expression to check if the input is a valid integer
                  const regex = /^-?[0-9]*$/;

                  if (regex.test(e.target.value)) {
                    field.onChange(e.target.value);
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};
export default DecimalField;
