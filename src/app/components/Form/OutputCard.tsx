import React from "react";
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

const OutputCard = () => {
  const binary64 = useOutputFormStore((state) => state.binary64);
  const normalizedBinaryForm = useOutputFormStore((state) => state.normalized);
  const exponent = useOutputFormStore((state) => state.exponent);
  const hexRepresentation = useOutputFormStore(
    (state) => state.hexRepresentation,
  );
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

        <Label htmlFor="BR">Binary 64 Representation</Label>
        <Input id={"BR"} disabled value={binary64} className="h-full" />

        <Label htmlFor="Hex">Hexadecimal Representation</Label>
        <Input id={"Hex"} disabled value={hexRepresentation} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Download Output</Button>
      </CardFooter>
    </Card>
  );
};
export default OutputCard;
