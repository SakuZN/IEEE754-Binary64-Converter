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
            <FormLabel>Binary Mantissa</FormLabel>
            <div className="flex flex-row items-end gap-2">
              <FormControl>
                <Input {...field} />
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
            <FormLabel>Exponent</FormLabel>
            <FormControl>
              <Input
                {...field}
                onChange={(e) =>
                  field.onChange(
                    e.target.value && e.target.value !== "-"
                      ? Number(e.target.value)
                      : e.target.value,
                  )
                }
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
