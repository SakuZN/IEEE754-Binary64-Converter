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

const OutputCard = () => {
  return (
    <Card className="w-[550px] mq1350:w-[525px] mq600:w-full">
      <CardHeader>
        <CardTitle>Outputs</CardTitle>
        <CardDescription>Values from conversion</CardDescription>
      </CardHeader>
      <CardContent className={"space-y-2"}>
        <Label htmlFor="NBF">Normalized Binary Form</Label>
        <Input id={"NBF"} disabled />

        <Label htmlFor="BR">Binary Representation</Label>
        <Input id={"BR"} disabled />

        <Label htmlFor="Hex">Hexadecimal Representation</Label>
        <Input id={"Hex"} disabled />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button>Download Output</Button>
      </CardFooter>
    </Card>
  );
};
export default OutputCard;
