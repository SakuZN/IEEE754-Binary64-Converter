"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OutputCard from "@/app/components/OutputCard";
import DecimalnputForm from "@/app/components/DecimalnputForm";
import BinaryInputForm from "@/app/components/BinaryInputForm";

export const formSchema = z.object({
    decimal: z.number().min(Number.MIN_VALUE).max(Number.MAX_VALUE),
    base10: z.number(),
        binary: z.string()
            .regex(new RegExp("^-?[01]*(\\.[01]*)?$"))
            .refine(value => (value.match(/\./g) || []).length <= 1, {
                message: "Input can only contain one '.' character",
            })
            .refine(value => value.indexOf('-') <= 0, {
                message: "'-' can only be at the beginning of the input",
            }),
    base2: z.number(),
})

export function InputForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            decimal: 0,
            base10: 0,
            binary: "",
            base2: 0,
        },
        mode: "onChange"
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <div className="flex flex-row mq1350:flex-col gap-4 justify-center items-center">
            <Tabs defaultValue="decimal" className="w-[525px] mq600:w-fit">
                <TabsList>
                    <TabsTrigger value="decimal">Decimal</TabsTrigger>
                    <TabsTrigger value="binary">Binary Mantissa</TabsTrigger>
                </TabsList>
                <TabsContent value="decimal"><DecimalnputForm form={form} onSubmit={onSubmit} /></TabsContent>
                <TabsContent value="binary"><BinaryInputForm form={form} onSubmit={onSubmit} /></TabsContent>
            </Tabs>
            <OutputCard />
        </div>
    )
}
