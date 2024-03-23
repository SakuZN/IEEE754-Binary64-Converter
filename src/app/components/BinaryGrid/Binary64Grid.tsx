import React, { useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import BitBoxes from "@/app/components/BinaryGrid/BitBoxes";
import { useOutputFormStore } from "@/app/components/store/conversion_output";
const Binary64Grid = () => {
  const binary64Val = useOutputFormStore((state) => state.binary64);
  const signBit = () => {
    let arr = [];
    for (let i = 0; i < 1; i++) {
      arr.push(
        <BitBoxes
          bitPosition={i}
          bitValue={
            isNaN(parseInt(binary64Val.charAt(i)))
              ? ""
              : parseInt(binary64Val.charAt(i))
          }
          key={i}
        />,
      );
    }
    return arr;
  };

  const exponentBits = () => {
    let arr = [];
    for (let i = 1; i < 12; i++) {
      arr.push(
        <BitBoxes
          bitPosition={i}
          bitValue={
            isNaN(parseInt(binary64Val.charAt(i)))
              ? ""
              : parseInt(binary64Val.charAt(i))
          }
          key={i}
        />,
      );
    }
    return arr;
  };

  const mantissaBits = () => {
    let arr = [];
    for (let i = 12; i < 64; i++) {
      arr.push(
        <BitBoxes
          bitPosition={i}
          bitValue={
            isNaN(parseInt(binary64Val.charAt(i)))
              ? ""
              : parseInt(binary64Val.charAt(i))
          }
          key={i}
        />,
      );
    }
    return arr;
  };

  return (
    <Card className="mt-5 mx-[200px] border mq1350:w-full">
      <CardContent className="p-1">
        <div className="flex flex-row mq1350:flex-col gap-1 ">
          <div className="bg-gray-300 flex flex-col items-center justify-center  p-6">
            <span className="text-sm font-semibold mb-5">Sign Bit</span>
            <div className="flex flex-wrap">{signBit()}</div>
          </div>

          <div className="bg-blue-100 flex flex-col items-center justify-center p-6">
            <span className="text-sm font-semibold mb-5">Exponent</span>
            <div className="flex flex-wrap">{exponentBits()}</div>
          </div>
          <div className="bg-red-200 flex flex-col items-center justify-center p-6 ">
            <span className="text-sm font-semibold mb-5">Mantissa</span>
            <div className="flex flex-wrap">{mantissaBits()}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
export default Binary64Grid;
