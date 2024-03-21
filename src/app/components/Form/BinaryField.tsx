import React from 'react'
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {UseFormReturn} from "react-hook-form";
import {formSchema} from "@/app/components/InputForm";
import { z } from "zod"
interface Props {
    form: UseFormReturn<z.infer<typeof formSchema>>;
}

const BinaryField = ({form}: Props) => {
    return (
        <div className="flex flex-row gap-3 items-end">
            <FormField
                control={form.control}
                name="binary"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Binary Mantissa</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <span className="text-lg font-semibold">
                x2
            </span>
            <FormField
                control={form.control}
                name="base2"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Exponent</FormLabel>
                        <FormControl>
                            <Input  {...field} className="w-1/2" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}
export default BinaryField
