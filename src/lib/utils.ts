import { type ClassValue, clsx } from "clsx"
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


export function convertDecimalToBinary(strNum: string): string
{
  let integerResult: number[] = [];
  let fractionalResult: number[] = [];
  let strResult: string = ""; 
  let isNegative: boolean = false;

  // If given is negative
  if(parseFloat(strNum) < 0){
    isNegative = true;
    strResult += "-";
  }
 

  // split input to integer and fractional parts
  const numberParts = strNum.split('.');

  let integerNumber = parseInt(numberParts[0]);
  let fractionalNumber = 0;


  // if input has fractional part
  if(numberParts.length === 2){  
    fractionalNumber = parseFloat('0.' + numberParts[1]);
  }


  // if given decimal number is zero
  if(parseFloat(strNum) === 0 || parseFloat(strNum) === 0.0){
    return "";
  }else{
    // Convert integer part to binary

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

    // if strNum has a fractional part
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
  

  return strResult;



}

