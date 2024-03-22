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
            <FormLabel>Decimal</FormLabel>
            <div className="flex flex-row items-end gap-2">
              <FormControl>
                <Input {...field} onChange={(e) => {
                    // Regular expression to check if the input is a valid float number
                    const regex = /^-?[0-9]*(\.[0-9]*)?$/;
                    if (regex.test(e.target.value)) {
                        field.onChange(e.target.value);
                    }
                }} />
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
            <FormLabel>Exponent</FormLabel>
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
