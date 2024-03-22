"use client";
import React from "react";
import Binary64Grid from "@/app/components/BinaryGrid/Binary64Grid";
import { InputForm } from "@/app/components/InputForm";
import OutputCard from "@/app/components/OutputCard";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOutputFormStore } from "@/app/components/store/conversion_output";
import { convertDecimalToBinary } from "@/lib/conversion_algorithms";

export enum InputType {
  Binary = "binary",
  Decimal = "decimal",
}
export const formSchema = z
  .object({
    decimal: z.string().transform(parseFloat).optional(),
    base10: z
      .number({ invalid_type_error: "Invalid Decimal value" })
      .optional(),
    binary: z
      .string()
      .regex(new RegExp("^-?[01]*(\\.[01]*)?$"))
      .refine((value) => (value.match(/\./g) || []).length <= 1, {
        message: "Input can only contain one '.' character",
      })
      .refine((value) => value.indexOf("-") <= 0, {
        message: "'-' can only be at the beginning of the input",
      })
      .optional(),
    base2: z.coerce
      .number({ invalid_type_error: "Invalid Decimal value" })
      .optional(),
    inputType: z.enum(["decimal", "binary"]),
  })
  .refine(
    (data) => {
      console.log(data.inputType === InputType.Decimal);
      if (data.inputType === InputType.Decimal) {
        return data.decimal !== undefined && data.base10 !== undefined;
      } else if (data.inputType === InputType.Binary) {
        return data.binary !== undefined && data.base2 !== undefined;
      }
      return false; // Should never reach here
    },
    {
      message: "Required fields are missing based on the input type",
    },
  );

const BinaryViz = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      decimal: 0,
      base10: 0,
      binary: "",
      base2: 0,
      inputType: "decimal",
    },
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const setBinary64 = useOutputFormStore((state) => state.setBinary64);
  const setNormalized = useOutputFormStore((state) => state.setNormalized);
  const setHexRepresentation = useOutputFormStore(
    (state) => state.setHexRepresentation,
  );

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    console.log(convertDecimalToBinary(values.decimal!, values.base10!));
  }

  return (
    <div className="flex flex-col-reverse sm:flex-col justify-center items-center w-full gap-4">
      <Binary64Grid />
      <div className="flex flex-row mq1350:flex-col gap-2 justify-center items-center">
        <InputForm form={form} onSubmit={onSubmit} />
        <OutputCard />
      </div>
    </div>
  );
};

export default BinaryViz;
