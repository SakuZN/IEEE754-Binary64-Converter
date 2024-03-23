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
import { Button } from "@/components/ui/button";
import BinaryField from "@/app/components/Form/BinaryField";
import CannotBeEmpty from "@/app/components/Form/CannotBeEmpty";

interface Props {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

const BinaryInputForm = ({ form, onSubmit }: Props) => {
  function onError() {
    form.setError("inputType", {
      message: "Required fields are missing",
    });
  }
  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>Binary Mantissa Input</CardTitle>
        <CardDescription>
          Insert binary mantissa input here and see the conversion in real-time.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="space-y-8"
        >
          <CardContent>
            <BinaryField form={form} />
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className={"flex flex-col"}>
              <Button className="w-fit" type="submit">
                Submit
              </Button>
              <CannotBeEmpty form={form} />
            </div>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
export default BinaryInputForm;
