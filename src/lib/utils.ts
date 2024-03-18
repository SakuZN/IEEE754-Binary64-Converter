import { type ClassValue, clsx } from "clsx"
import { start } from "repl";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function hasFractionalPart(num: number): boolean {
  return num !== Math.floor(num);
}

export function getFractionalPart(num: number, decimalPlaces: number = 6): number {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round((num - Math.floor(num)) * factor) / factor;
}

export function countIntegerPartDigits(strNum: string): number{
  const array = strNum.split('.');

  return array[0].length;

}

export function countFractionalPartDigits(strNum: string): number{
  const array = strNum.split('.');

  if(array.length === 2){
    return array[1].length; // If number has a fractional part
  }else{
    return 0; // if number has no fractional part
  }

}


export function convertDecimalToBinary(strNum: string, base10Exponent: number): string
{
  let integerResult: number[] = [];
  let fractionalResult: number[] = [];
  let strResult: string = ""; 
  let multipliedStrNum: string = (parseFloat(strNum) * Math.pow(10, base10Exponent)).toString();

  // If given is negative
  if(strNum.charAt(0) === "-" && parseFloat(strNum) < 0){
    multipliedStrNum = multipliedStrNum.substring(1);
    strResult += "-";
  }else if(parseFloat(multipliedStrNum) === 0){
    if(strNum.charAt(0) === "-"){
      return "-0.0";
    }else{
      return "0.0";
    }
    
  }

 
  // split input to integer and fractional parts
  const numberParts = multipliedStrNum.split('.');

  let integerNumber = parseInt(numberParts[0]);
  let fractionalNumber = 0;

  // if input has fractional part
  if(numberParts.length === 2){  
    fractionalNumber = parseFloat('0.' + numberParts[1]);
  }

  // if given decimal number is zero
  if(parseFloat(multipliedStrNum) === 0 || parseFloat(multipliedStrNum) === 0.0){
    return "0.0";
  }else{
    // Convert integer part to binary

    // if strNum multipled by a given base 10 exponent has a non-zero integer part

    if(parseFloat(numberParts[0]) > 0){
      let quotient: number = Math.abs(integerNumber); // initialize quotient variable

      while(quotient !== 1){
        integerResult.push(quotient % 2);
        quotient = Math.floor(quotient / 2);
      }
  
      integerResult.push(quotient);
  
      let integerResultLength = integerResult.length;
      let poppedElement = "";
  
      for(let i = 0; i < integerResultLength; i++){
        poppedElement = integerResult.pop()?.toString() ?? "";
        console.log(poppedElement);
        strResult = strResult + (poppedElement);
      }
    }else{
      strResult += "0"
    }

    // if strNum multipled by given base 10 exponent has a fractional part
    if(numberParts.length === 2){  

      strResult = strResult + "."
      
      while(fractionalNumber > 0){
        fractionalNumber *= 2;
        
        if(fractionalNumber >= 1){
          strResult = strResult + "1"
          fractionalNumber -= 1;
        }else{
          strResult = strResult + "0"
        }
      }
      console.log("END")
    }
  }

  console.log("STR RESULT: ", strResult)

  // Rounding logic
  //Positive and the length of the entire string is greater than 52 (exclude the dot)
    if (strResult.replace(".", "").length > 52 && strResult.charAt(0) !== "-") {

      //if fraction, get substring from 0 to 53 else get substring from 0 to 52
      let toRound = strResult.includes(".") ? strResult.substring(0, 53) : strResult.substring(0, 52);
        console.log("TO ROUND: ", toRound.length)
        let lastBit = strResult.includes(".") ? strResult.charAt(53) : strResult.charAt(52);
        let secondLastBit = strResult.includes(".") ? strResult.charAt(53) ?? "0" : strResult.charAt(52) ?? "0";

      // If the 53rd bit is 1 and the 54th bit is 1, round up
      if (lastBit === '1' && secondLastBit === '1') {
        //TODO: implement rounding up
      } else {
        //TODO: implement rounding down
      }
      strResult = toRound;
    }
    //Negative
    else if (strResult.replaceAll(/[.-]/g, '').length > 52 && strResult.charAt(0) === "-") {
      let toRound = strResult.includes(".") ? strResult.substring(0, 54) : strResult.substring(0, 53);
      let lastBit = strResult.includes(".") ? strResult.charAt(54) : strResult.charAt(53);
      let secondLastBit = strResult.includes(".") ? strResult.charAt(54) ?? "0" : strResult.charAt(53) ?? "0";

      // If the 53rd bit is 1 and the 54th bit is 1, round up
      if (lastBit === '1' && secondLastBit === '1') {
        //TODO: implement rounding up
      } else {
        //TODO: implement rounding down
      }
        strResult = toRound;
    }
  
  return strResult;
}


export function binaryMantissaToDecimal(binaryString: string, exponent: number) {
  // Split the binary string into integer and fractional parts
  const parts = binaryString.split('.');
  let integerPart = parts[0];
  const isNegative = integerPart[0] === '-';
  if (isNegative) {
    integerPart = integerPart.slice(1);
  }
  let fractionalPart = parts.length > 1 ? parts[1] : '';

  // Convert the integer part to decimal
  let decimal = parseInt(integerPart, 2);

  console.log("DECIMAL: ", decimal)

  // Convert the fractional part to decimal
  let fractionalDecimal = 0;
  for (let i = 0; i < fractionalPart.length; i++) {
    fractionalDecimal += parseInt(fractionalPart[i]) / Math.pow(2, i + 1);
    console.log("FRACTIONAL DECIMAL: ", fractionalDecimal)
  }
  decimal += fractionalDecimal

  // Multiply the result by 2 raised to the power of the exponent
  decimal *= Math.pow(2, exponent);

  if (isNegative) {
    decimal *= -1;
  }
  return decimal;
}

export function getRequiredBaseTwoExponent(strBinaryNum: string): number{

  let index: number = 0;
  let baseTwoExponent: number = 0;
  let isNegative: boolean = false;
  let localStrBinaryNum: string = strBinaryNum;


  // if given strBinaryNum is negative
  if(localStrBinaryNum.charAt(0) === "-"){ 
    isNegative = true;
    console.log("NEGATIVE")
    localStrBinaryNum = localStrBinaryNum.substring(1); // remove sign symbol from given string.
  }

 // split input to integer and fractional parts
  let numberParts: string[] = localStrBinaryNum.split('.');


  // If integer part only has one digit (either 1 or 0)
  if(numberParts[0].length === 1){

    // If only digit in integer part is 1
    if(numberParts[0].charAt(0) === "1"){
      return 0;
    }else{
      // if only digit ininteger part is 0, find the next 1 in the fractional part

      // if there is a given fractional part in strBinaryNum
      if(numberParts.length === 2){
        while(numberParts[1].charAt(index) !== "1" && index < numberParts[1].length){
          baseTwoExponent--; // decrement base two exponent
          index++; // move to next index
          console.log("HERE")
        }

        // if digit 1 has been reached in fractional part
        if(numberParts[1].charAt(index) === "1"){
          baseTwoExponent--; 
        }else{
          // if end of fractional part has been reached (least significant bit is 1 and the rest are 0s)
          baseTwoExponent = 0 - numberParts[1].length; // 
        }

        
      }

      return baseTwoExponent;
    }
  }else{
    // If integer part has more than one digit
    return numberParts[0].length - 1;
  }

}

export function normalizeBinaryNumber(strBinaryNum: string, baseTwoExponent: number): string{

  let localStrBinaryNum: string = strBinaryNum;  
  let signChar: string = ""

  // If negative (alternative is if(parseFloat(strBinaryNum) < 0))
  if(localStrBinaryNum.charAt(0) === "-"){
    // if given is zero
    if(parseFloat(localStrBinaryNum) === 0){
      if(strBinaryNum.charAt(0) === "-"){
        return "-0.0";
      }else{
        return "0.0"
      }
    }else{
      signChar += "-";
      localStrBinaryNum = localStrBinaryNum.substring(1);
    }
    
  }

  let numberParts: string[] = localStrBinaryNum.split('.');

  // If integer part only has one digit (either 1 or 0)
  if(numberParts[0].length === 1){
    
    // if already normalized and has fractional part (e.g. 1.f)
    if(numberParts[0].charAt(0) === "1" && numberParts.length === 2){
      return signChar + numberParts[0] + "." + numberParts[1];
    }else if(numberParts[0].charAt(0) === "1" && numberParts.length === 1){
      // if already normalized and has no fractional part (e.g. 1.0)
      return signChar + numberParts[0] + ".0";
    }else if (numberParts.length === 2){
      // if not yet normalized and fractional part has no value(e.g. 0.0)
      if(numberParts[1].length === 1 && numberParts[1].charAt(0) === "0"){
        return "0.0"
      }else if (numberParts[1].length > 1){
        return signChar + numberParts[1].charAt((-1 * baseTwoExponent) - 1) + "." + numberParts[1].substring(-1 * baseTwoExponent);
      }

    }else if (numberParts.length === 1){
      // if fractional part doesn't have a value
      return "0"
    }else{
      // if both zeroes
      return "0.0";
    }
  }else if(numberParts[0].length > 1){
    // if integer part has more than one digit

    // if fractional part has value
    if(numberParts.length === 2){
      return signChar + numberParts[0].charAt(0) + "." + numberParts[0].substring(1) + numberParts[1];
    }else if(numberParts.length === 1){
      // if fractional part has no value
      return signChar + numberParts[0].charAt(0) + "." + numberParts[0].substring(1)
    }
    
  }
  return ""; // for typescript error prevention

}


export function convertToBinary64FloatingPoint(strNum: string){
  let signBit: string = "";
  let exponentField: string[] = [""];
  let significand: string[] = [""];


  // TODO: Implement final algorithm based on previous functions
  
}

