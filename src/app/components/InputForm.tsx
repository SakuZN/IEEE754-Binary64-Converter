"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
    Form,
} from "@/components/ui/form"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import DecimalField from "@/app/components/Form/DecimalField";

export const formSchema = z.object({
    username: z.string().min(2).max(50),
    decimal: z.string().min(1).max(50),
    base10: z.string().min(1),
    base10Sign: z.enum(["+", "-"]),
    binary: z.string().min(1),
    base2: z.string().min(1),
    base2Sign: z.enum(["+", "-"]),
})

export function InputForm() {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            base10: "0",
            base10Sign: "+",
            base2: "0",
            base2Sign: "+",
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <>
            <Card className="w-fit">
                <CardHeader>
                    <CardTitle>Inputs</CardTitle>
                    <CardDescription>Insert inputs here and see the conversion in real-time.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <DecimalField form={form} />
                        </form>
                    </Form>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button type="submit">Submit</Button>
                </CardFooter>
            </Card>
        </>
    )
}
