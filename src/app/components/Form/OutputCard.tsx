import React, { useRef } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useOutputFormStore } from "@/app/components/store/conversion_output";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formSchema } from "@/app/components/BinaryViz";

interface Props {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const OutputCard = ({ form }: Props) => {
  const binary64 = useOutputFormStore((state) => state.binary64);
  const normalizedBinaryForm = useOutputFormStore((state) => state.normalized);
  const exponent = useOutputFormStore((state) => state.exponent);
  const hexRepresentation = useOutputFormStore(
    (state) => state.hexRepresentation,
  );

  const downloadRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = () => {
    const data = `
    Input ${form.getValues("inputType")}: ${form.getValues("inputType") === "decimal" ? form.getValues("decimal") : form.getValues("binary")}
    Input exponent: ${form.getValues("inputType") === "decimal" ? form.getValues("base10") : form.getValues("base2")}
    
    Normalized Binary Form: ${normalizedBinaryForm} x2^${exponent}
    
    E': ${1023 + exponent}
    
    Binary 64 Representation: ${binary64}
    Sign Bit: ${binary64[0]}
    Exponent Bits: ${binary64.slice(1, 12)}
    Mantissa Bits: ${binary64.slice(12)}
    
    Hexadecimal Representation: ${hexRepresentation}`;

    const blob = new Blob([data], { type: "text/plain" });
    if (downloadRef.current) {
      downloadRef.current.href = URL.createObjectURL(blob);
      downloadRef.current.download = "binary64_output.txt";
      downloadRef.current.click();
    }
  };
  return (
    <Card className="w-[550px] mq1350:w-[525px] mq600:w-full">
      <CardHeader>
        <CardTitle>Outputs</CardTitle>
        <CardDescription>Values from conversion</CardDescription>
      </CardHeader>
      <CardContent className={"space-y-3"}>
        <div className="flex flex-row gap-2 items-end w-full">
          <div className="flex flex-col gap-2">
            <Label htmlFor="NBF">Normalized Binary Form</Label>
            <Input id={"NBF"} disabled value={normalizedBinaryForm} />
          </div>
          <span className="text-lg font-semibold">x2</span>
          <div className="flex flex-col gap-2">
            <Label htmlFor="NBFE">Exponent</Label>
            <Input id={"NBFE"} disabled value={exponent} />
          </div>
        </div>

        <Label htmlFor="EP">E{"'"} (bias 1023)</Label>
        <Input id={"EP"} disabled value={1023 + exponent} className="h-full" />

        <Label htmlFor="BR">Binary 64 Representation</Label>
        <Input id={"BR"} disabled value={binary64} className="h-full" />

        <Label htmlFor="Hex">Hexadecimal Representation</Label>
        <Input id={"Hex"} disabled value={hexRepresentation} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handleDownload}>Download Output</Button>
        <a ref={downloadRef} className="hidden" />
      </CardFooter>
    </Card>
  );
};
export default OutputCard;
