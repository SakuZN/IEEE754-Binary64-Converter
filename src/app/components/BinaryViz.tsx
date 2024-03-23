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
  binary64ToHexadecimal,
  binaryInputToBinary64,
  ConversionOutput,
  decimalInputToBinary64,
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
        return (
          data.decimal !== "" &&
          data.base10 !== "" &&
          !/^[-.]+$/.test(data.decimal!)
        );
      } else if (data.inputType === InputType.Binary) {
        return (
          data.binary !== "" &&
          data.base2 !== "" &&
          !/^[-.]+$/.test(data.binary!)
        );
      }
      return false;
    },
    {
      message: `Required fields are missing or have invalid inputs `,
    },
  );

const BinaryViz = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      decimal: "",
      base10: "0",
      binary: "",
      base2: "0",
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
  const setExponent = useOutputFormStore((state) => state.setExponent);

  /*TODO: Use this function for debugging and to check valid input*/
  function onSubmit(values: z.infer<typeof formSchema>) {
    if (values.inputType === InputType.Decimal) {
      const decimal = values.decimal!;
      const base10 = parseInt(values.base10!);

      if (decimal === "0" || decimal === "-0") {
        //Zero is sign bit 0, exponent all 0, and the mantissa is all 0
        const zero =
          decimal === "0" ? "0".padEnd(64, "0") : "1".padEnd(64, "0");
        setBinary64(zero);
        setNormalized("0");
        setHexRepresentation("0x0".padEnd(16, "0"));
        setExponent(0);
        return;
      } else if (decimal === "NaN" || decimal === "-NaN") {
        //Nan is sign bit 0, exponent all 1, and the first mantissa bit is 1, rest are 0
        const signBit = decimal === "NaN" ? "0" : "1";
        const NaN = signBit + "1".padEnd(11, "1") + "1".padEnd(52, "0");
        setBinary64(NaN);
        setNormalized("Unknown");
        setHexRepresentation(binary64ToHexadecimal(NaN));
        setExponent(0);
        return;
      } else {
        const output: ConversionOutput = decimalInputToBinary64(
          decimal,
          base10,
        );
        setBinary64(output.binary64.substring(0, 64));
        setNormalized(output.normalized);
        setHexRepresentation(output.hexRepresentation);
        setExponent(output.exponent);
      }
    } else if (values.inputType === InputType.Binary) {
      const binary = values.binary!;
      const base2 = parseInt(values.base2!);

      if (!binary.includes("1")) {
        //Zero is sign bit 0, exponent all 0, and the mantissa is all 0
        const zero = "0".padEnd(64, "0");
        setBinary64(zero);
        setNormalized("0");
        setHexRepresentation("0x0".padEnd(16, "0"));
        setExponent(0);
        return;
      } else {
        const output: ConversionOutput = binaryInputToBinary64(binary, base2);
        setBinary64(output.binary64.substring(0, 64));
        setNormalized(output.normalized);
        setHexRepresentation(output.hexRepresentation);
        setExponent(output.exponent);
      }
    }
  }

  return (
    <div className="flex flex-col-reverse sm:flex-col justify-center items-center w-full gap-4">
      <Binary64Grid />
      <div className="flex flex-row mq1350:flex-col gap-2 justify-center items-center">
        <InputForm form={form} onSubmit={onSubmit} />
        <OutputCard form={form} />
      </div>
    </div>
  );
};

export default BinaryViz;
