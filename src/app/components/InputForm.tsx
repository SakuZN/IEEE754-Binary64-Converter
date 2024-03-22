import { UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import DecimalnputForm from "@/app/components/DecimalnputForm";
import BinaryInputForm from "@/app/components/BinaryInputForm";
import { formSchema, InputType } from "@/app/components/BinaryViz";

interface Props {
  form: UseFormReturn<z.infer<typeof formSchema>>;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}

export function InputForm({ form, onSubmit }: Props) {
  return (
    <Tabs
      defaultValue={form.getValues("inputType")}
      className="w-[525px] mq600:w-fit"
    >
      <TabsList>
        <TabsTrigger
          value="decimal"
          onClick={() => {
            form.setValue("inputType", InputType.Decimal);
          }}
        >
          Decimal
        </TabsTrigger>
        <TabsTrigger
          value="binary"
          onClick={() => {
            form.setValue("inputType", InputType.Binary);
          }}
        >
          Binary Mantissa
        </TabsTrigger>
      </TabsList>
      <TabsContent value="decimal">
        <DecimalnputForm form={form} onSubmit={onSubmit} />
      </TabsContent>
      <TabsContent value="binary">
        <BinaryInputForm form={form} onSubmit={onSubmit} />
      </TabsContent>
    </Tabs>
  );
}
