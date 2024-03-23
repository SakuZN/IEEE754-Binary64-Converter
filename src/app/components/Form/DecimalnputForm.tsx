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
import CannotBeEmpty from "@/app/components/Form/CannotBeEmpty";
import { useOutputFormStore } from "@/app/components/store/conversion_output";
interface Props {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

const DecimalnputForm = ({ form, onSubmit }: Props) => {
  const outputReset = useOutputFormStore((state) => state.reset);
  function onError() {
    form.setError("inputType", {
      message: "Required fields are missing or have invalid inputs",
    });
  }
  function onReset() {
    form.reset();
    outputReset();
  }
  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle>Decimal Input</CardTitle>
        <CardDescription>
          Insert decimal input here and see the conversion in real-time.
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, onError)}
          className="space-y-8"
        >
          <CardContent>
            <DecimalField form={form} />
          </CardContent>
          <CardFooter className="flex justify-between">
            <div className={"flex flex-col gap-1"}>
              <Button className="w-fit" type="submit">
                Submit
              </Button>
              <CannotBeEmpty form={form} />
            </div>
            <Button variant={"destructive"} onClick={onReset}>
              {" "}
              Reset
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
export default DecimalnputForm;
