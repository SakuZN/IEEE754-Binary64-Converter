"use client";
import React from "react";
import Binary64Grid from "@/app/components/BinaryGrid/Binary64Grid";
import { InputForm } from "@/app/components/Form/InputForm";
import OutputCard from "@/app/components/Form/OutputCard";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOutputFormStore } from "@/app/components/store/conversion_output";
import {
  normalizeBinaryNumber,
  getRequiredBaseTwoExponent,
  convertDecimalToBinary,
  convertToBinary64FloatingPoint,
} from "@/lib/conversion_algorithms";

export enum InputType {
  Binary = "binary",
  Decimal = "decimal",
}
export const formSchema = z
  .object({
    decimal: z.string().optional(),
    base2: z
      .string()
      .regex(new RegExp(/^-?[0-9]*$/))
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
    base10: z
      .string()
      .regex(new RegExp(/^-?[0-9]*$/))
      .optional(),
    inputType: z.enum(["decimal", "binary"]),
  })
  .refine(
    (data) => {
      if (data.inputType === InputType.Decimal) {
        return data.decimal !== "" && data.base10 !== "";
      } else if (data.inputType === InputType.Binary) {
        return data.decimal !== "" && data.base10 !== "";
      }
      return false; // Should never reach here
    },
    {
      message: `Required fields are missing `,
    },
  );

const BinaryViz = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      decimal: "",
      base10: "",
      binary: "",
      base2: "",
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

  /*TODO: Use this function for debugging and to check valid input*/
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    if (values.inputType === InputType.Decimal) {
      const decimal = parseFloat(values.decimal!);
      const base10 = parseInt(values.base10!);
      //Insert the conversion algorithm from decimal to binary here
      //console.log(convertDecimalToBinary(decimal, base10));
    } else if (values.inputType === InputType.Binary) {
      const binary = values.binary!;
      const base2 = parseInt(values.base2!);
      //Insert the conversion algorithm from binary to decimal here

      const requiredBaseTwoExponent: number =
        getRequiredBaseTwoExponent(binary);
      const normalizedBinaryString = normalizeBinaryNumber(
        binary,
        requiredBaseTwoExponent,
      );

      console.log("Original Base Two Exponent: " + base2);
      console.log("Required Base Two Exponent: " + requiredBaseTwoExponent);
      console.log("Normalized Binary Str: " + normalizedBinaryString);

      let finalBaseTwoExponent: number = base2 + requiredBaseTwoExponent;
      console.log("Final Base Two Exponent: " + finalBaseTwoExponent);

      console.log(
        "Final Binary64 Conversion: " +
          convertToBinary64FloatingPoint(
            normalizedBinaryString,
            finalBaseTwoExponent,
          ),
      );
    }
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
