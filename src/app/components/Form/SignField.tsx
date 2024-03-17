import React from 'react'
import {UseFormReturn} from "react-hook-form";
import {formSchema} from "@/app/components/InputForm";
import { z } from "zod"
import {FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
interface Props {
    form: UseFormReturn<z.infer<typeof formSchema>>;
    fieldName: "base10Sign" | "base2Sign";
}

const SignField = ({form, fieldName}: Props) => {
    return (
        <FormField
            control={form.control}
            name={fieldName}
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Sign</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger className="text-lg font-bold">
                                <SelectValue placeholder="Sign" defaultValue={field.value} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="min-w-fit" >
                            <SelectItem value="+" className="text-lg cursor-pointer">+</SelectItem>
                            <SelectItem value="-" className="text-lg cursor-pointer">-</SelectItem>
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
export default SignField
