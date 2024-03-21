import React from 'react'
import {UseFormReturn} from "react-hook-form";
import {z} from "zod";
import {formSchema} from "@/app/components/InputForm";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import BinaryField from "@/app/components/Form/BinaryField";

interface Props {
    form: UseFormReturn<z.infer<typeof formSchema>>;
    onSubmit: (values: z.infer<typeof formSchema>) => void;
}


const BinaryInputForm = ({form, onSubmit} : Props) => {
    return (
        <Card className="w-fit">
            <CardHeader>
                <CardTitle>Binary Mantissa Input</CardTitle>
                <CardDescription>Insert binary mantissa input here and see the conversion in real-time.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <BinaryField form={form} />
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button type="submit">Submit</Button>
            </CardFooter>
        </Card>
    )
}
export default BinaryInputForm
