"use client"
import Image from "next/image";
import { hasFractionalPart,
  countIntegerPartDigits,
  countFractionalPartDigits,
  convertDecimalToBinary,
  getRequiredBaseTwoExponent,
  normalizeBinaryNumber

} from "@/lib/utils";
import { useEffect } from "react";

export default function Home() {
  const decimalNumber : number = 64;
  const base10Exponent : number = 0;
  const negativeZero: number = -0.0;

  let strDecimalNumber: string = "";

  if(Object.is(decimalNumber, -0)){
    strDecimalNumber = "-0.0";
  }else if(Object.is(decimalNumber, -0.0)){
    strDecimalNumber = "-0.0";
  }else{
    strDecimalNumber = decimalNumber.toString();
  }
  

  // for testing
  useEffect(() => {
    console.log("Integer Part Count:");
    console.log(countIntegerPartDigits("123456789.23"))
    console.log("Fractional Part Count:");
    console.log(countFractionalPartDigits("987.0987"))
    console.log("Fractional Part Number:");
    console.log(parseFloat('-0.' + "1234") * 2)
    console.log("Power Test:");
    console.log(Math.pow(10, -4) * parseFloat("-11101.010011"));
    console.log("Get Required Base Two Exponent Test:");
    console.log(getRequiredBaseTwoExponent("-1000000"));
    console.log("NEGATIVE ZERO TEST: ");
    console.log(Object.is(negativeZero, -0) ? console.log("TRUE") : console.log("FALSE"))

  }, []); // empty dependency array means this effect runs once after the first render

  return (
    <div className="flex flex-col">
      <div>
        Test
      </div>
        
      <div>
        <div>
          Number: {decimalNumber} | Base 10 Exponent: { base10Exponent }
        </div>

        <div>
          {"Binary form: " + convertDecimalToBinary(strDecimalNumber, base10Exponent)}
        </div>

        <div>
          {"Normalized Binary form: " + normalizeBinaryNumber(convertDecimalToBinary(strDecimalNumber, base10Exponent), getRequiredBaseTwoExponent(convertDecimalToBinary(decimalNumber.toString(), base10Exponent)))}
        </div>
        
        <div>
          {"Base Two Exponent: " + getRequiredBaseTwoExponent(convertDecimalToBinary(strDecimalNumber, base10Exponent))}
        </div>
        
      </div>
        
    </div>
  );
}
