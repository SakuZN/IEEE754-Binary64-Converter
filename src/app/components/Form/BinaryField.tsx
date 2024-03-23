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

const BinaryField = ({ form }: Props) => {
  return (
    <div className="flex flex-row gap-3">
      <FormField
        control={form.control}
        name="binary"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              Binary Mantissa <span className="text-red-500">*</span>
            </FormLabel>
            <div className="flex flex-row items-end gap-2">
              <FormControl>
                <Input
                  {...field}
                  onChange={(e) => {
                    // Regular expression to check if the input is a valid binary mantissa
                    const regex = /^-?[01]*(\.[01]*)?$/;

                    // Check if the input starts with a ".", and if so, prevent the input
                    if (e.target.value.startsWith(".")) {
                      return;
                    }

                    if (regex.test(e.target.value)) {
                      field.onChange(e.target.value);
                    }
                  }}
                />
              </FormControl>
              <span className="text-lg font-semibold">x2</span>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="base2"
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
export default BinaryField;
