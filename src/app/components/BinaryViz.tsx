"use client";
import React from "react";
import Binary64Grid from "@/app/components/BinaryGrid/Binary64Grid";
import { InputForm } from "@/app/components/InputForm";
import OutputCard from "@/app/components/OutputCard";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const formSchema = z.object({
  decimal: z.coerce
    .number({ invalid_type_error: "Invalid Decimal value" })
    .min(Number.MIN_VALUE)
    .max(Number.MAX_VALUE),
  base10: z.number(),
  binary: z
    .string()
    .regex(new RegExp("^-?[01]*(\\.[01]*)?$"))
    .refine((value) => (value.match(/\./g) || []).length <= 1, {
      message: "Input can only contain one '.' character",
    })
    .refine((value) => value.indexOf("-") <= 0, {
      message: "'-' can only be at the beginning of the input",
    }),
  base2: z.number(),
  inputType: z.enum(["decimal", "binary"]),
});

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
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
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
