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

                    // Check if the current input is "Q" or "S", and set the value to "QNaN" or "SNaN"
                    if (value.includes("Q") || value.includes("q")) {
                      // If the input already contains a negative sign, set the value to "-QNaN"
                      if (value.includes("-")) {
                        field.onChange("-QNaN");
                      } else {
                        field.onChange("QNaN");
                      }
                    } else if (value.includes("S") || value.includes("s")) {
                      // If the input already contains a negative sign, set the value to "-SNaN"
                      if (value.includes("-")) {
                        field.onChange("-SNaN");
                      } else {
                        field.onChange("SNaN");
                      }
                    } else if (
                      value.toLowerCase().startsWith("-qnan") ||
                      value.toLowerCase().startsWith("-snan")
                    ) {
                      // If "-" is added when "QNaN" or "SNaN" is already in the field, set the value to "-QNaN" or "-SNaN"
                      field.onChange(value.toUpperCase());
                    } else if (
                      value.toLowerCase().startsWith("qnan") ||
                      value.toLowerCase().startsWith("snan")
                    ) {
                      field.onChange(value.toUpperCase());
                    } else {
                      // Handle regular numeric input
                      const regex = /^-?[0-9]*(\.[0-9]*)?$/;

                      //Extra conditions to prevent 0 from being the first digit of a numeric input
                      if (value.startsWith("0") && value.length > 1) {
                        field.onChange(value.slice(1));
                      } else if (value.startsWith("-0") && value.length > 2) {
                        field.onChange(`-${value.slice(2)}`);
                      } else if (
                        value.startsWith(".") ||
                        value.startsWith("-.")
                      ) {
                        // Check if the input starts with a ".", and if so, prevent the input
                        return;
                      } else if (regex.test(value) || value === "") {
                        field.onChange(value);
                      }
                    }
                  }}
                  onKeyDown={(e) => {
                    //On backspace and val contains NaN, set the value to empty string
                    if (e.key === "Backspace" && field.value!.includes("NaN")) {
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
