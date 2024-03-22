import React from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/app/components/BinaryViz";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import DecimalField from "@/app/components/Form/DecimalField";
import { Button } from "@/components/ui/button";

interface Props {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

const DecimalnputForm = ({ form, onSubmit }: Props) => {
  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>Decimal Input</CardTitle>
        <CardDescription>
          Insert decimal input here and see the conversion in real-time.
        </CardDescription>
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
  );
};
export default DecimalnputForm;
