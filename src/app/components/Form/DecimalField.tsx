import React from 'react'
import {FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {UseFormReturn} from "react-hook-form";
import {formSchema} from "@/app/components/InputForm";
import { z } from "zod"
import SignField from "@/app/components/Form/SignField";
interface Props {
    form: UseFormReturn<z.infer<typeof formSchema>>;
}

const DecimalField = ({form}: Props) => {
    return (
        <div className="flex flex-row gap-2">
            <FormField
                control={form.control}
                name="decimal"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Decimal</FormLabel>
                        <FormControl>
                            <Input {...field} />
                        </FormControl>
                        <FormDescription>
                            This is your public display name.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <SignField form={form} fieldName="base10Sign" />
            <FormField
                control={form.control}
                name="base10"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Exponent</FormLabel>
                        <FormControl>
                            <Input  {...field} className="w-1/2" />
                        </FormControl>
                        <FormDescription>
                            This is your public display name.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
        </div>
    )
}
export default DecimalField
