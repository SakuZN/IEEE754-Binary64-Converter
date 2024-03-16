"use client"
import Image from "next/image";
import { hasFractionalPart, countIntegerPartDigits, countFractionalPartDigits, convertDecimalToBinary } from "@/lib/utils";
import { useEffect } from "react";

export default function Home() {
  const decimalNumber : number = 257.125;
  const base10Exponent : number = 28;


  // for testing
  useEffect(() => {
    console.log("Integer Part Count:");
    console.log(countIntegerPartDigits("123456789.23"))
    console.log("Fractional Part Count:");
    console.log(countFractionalPartDigits("987.0987"))
    console.log("Fractional Part Number:");
    console.log(parseFloat('-0.' + "1234") * 2)


  }, []); // empty dependency array means this effect runs once after the first render

  return (
    <div className="flex flex-col">
      <div>
        Test
      </div>
        
      <div>
        <div>
          Number: {decimalNumber}
        </div>
        {convertDecimalToBinary(decimalNumber.toString())}
      </div>
        
    </div>
  );
}
