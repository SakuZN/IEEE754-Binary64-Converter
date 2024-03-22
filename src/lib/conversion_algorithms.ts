export function hasFractionalPart(num: number): boolean {
  return num !== Math.floor(num);
}


export function trimLeadingZeroes(strBinaryNum: string): string{

  let localStrBinaryNum: string = strBinaryNum;

  // While there are leading zeroes and the length of the whole number part is greater than 1
  while(localStrBinaryNum.charAt(0) === "0" && localStrBinaryNum.length > 1){
    localStrBinaryNum = localStrBinaryNum.substring(1);
    console.log("trimLeadingZeroes test: " + localStrBinaryNum);
  }

  return localStrBinaryNum;

}

export function getFractionalPart(
  num: number,
  decimalPlaces: number = 6,
): number {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round((num - Math.floor(num)) * factor) / factor;
}

export function countIntegerPartDigits(strNum: string): number {
  const array = strNum.split(".");

  return array[0].length;
}

export function countFractionalPartDigits(strNum: string): number {
  const array = strNum.split(".");

  if (array.length === 2) {
    return array[1].length; // If number has a fractional part
  } else {
    return 0; // if number has no fractional part
  }
}

export function convertDecimalToBinary(
  num: number,
  base10Exponent: number,
): string {
  var strResult = "";
  num = num * Math.pow(10, base10Exponent);
  var wholeNum = Math.floor(Math.abs(num));
  var fractionNum = Math.abs(num) - wholeNum;
  var strWhole = "";
  var strFraction = "";
  //Convert whole to binary
  if (wholeNum == 0) {
    strWhole = "0";
  }

  while (wholeNum > 0) {
    strWhole = (wholeNum % 2).toString() + strWhole;
    wholeNum = Math.floor(wholeNum / 2);
  }

  if (fractionNum == 0) {
    strFraction = "0";
  }

  //Convert fraction to binary
  while (fractionNum > 0) {
    fractionNum = fractionNum * 2;
    strFraction = strFraction + Math.floor(fractionNum).toString();
    fractionNum = fractionNum - Math.floor(fractionNum);
  }

  strResult = strWhole + (strFraction !== "0" ? "." + strFraction : "");
  if (Object.is(num, -0.0) || num < 0) {
    strResult = "-" + strResult;
  }

  // Rounding logic
  //Positive and the length of the entire string is greater than 52 (exclude the dot)
  if (strResult.replace(".", "").length > 52 && strResult.charAt(0) !== "-") {
    //if fraction, get substring from 0 to 53 else get substring from 0 to 52
    let toRound = strResult.includes(".")
      ? strResult.substring(0, 53)
      : strResult.substring(0, 52);
    let lastBit = strResult.includes(".")
      ? strResult.charAt(53)
      : strResult.charAt(52);
    let secondLastBit = strResult.includes(".")
      ? strResult.charAt(53) ?? "0"
      : strResult.charAt(52) ?? "0";

    // If the 53rd bit is 1 and the 54th bit is 1, round up
    if (lastBit === "1" && secondLastBit === "1") {
      //TODO: implement rounding up
    } else {
      //TODO: implement rounding down
    }
    //strResult = toRound;
  }
  //Negative
  else if (
    strResult.replaceAll(/[.-]/g, "").length > 52 &&
    strResult.charAt(0) === "-"
  ) {
    let toRound = strResult.includes(".")
      ? strResult.substring(0, 54)
      : strResult.substring(0, 53);
    let lastBit = strResult.includes(".")
      ? strResult.charAt(54)
      : strResult.charAt(53);
    let secondLastBit = strResult.includes(".")
      ? strResult.charAt(54) ?? "0"
      : strResult.charAt(53) ?? "0";

    // If the 53rd bit is 1 and the 54th bit is 1, round up
    if (lastBit === "1" && secondLastBit === "1") {
      //TODO: implement rounding up
    } else {
      //TODO: implement rounding down
    }
    //strResult = toRound;
  }

  return strResult;
}

export function binaryMantissaToDecimal(
  binaryString: string,
  exponent: number,
) {
  // Split the binary string into integer and fractional parts
  const parts = binaryString.split(".");
  let integerPart = parts[0];
  const isNegative = integerPart[0] === "-";
  if (isNegative) {
    integerPart = integerPart.slice(1);
  }
  let fractionalPart = parts.length > 1 ? parts[1] : "";

  // Convert the integer part to decimal
  let decimal = parseInt(integerPart, 2);

  // Convert the fractional part to decimal
  let fractionalDecimal = 0;
  for (let i = 0; i < fractionalPart.length; i++) {
    fractionalDecimal += parseInt(fractionalPart[i]) / Math.pow(2, i + 1);
  }
  decimal += fractionalDecimal;

  // Multiply the result by 2 raised to the power of the exponent
  decimal *= Math.pow(2, exponent);

  if (isNegative) {
    decimal *= -1;
  }
  return decimal;
}

export function getRequiredBaseTwoExponent(strBinaryNum: string): number {
  let index: number = 0;
  let baseTwoExponent: number = 0;
  let isNegative: boolean = false;
  let localStrBinaryNum: string = strBinaryNum;

  // if given strBinaryNum is negative
  if (localStrBinaryNum.charAt(0) === "-") {
    isNegative = true;
    localStrBinaryNum = localStrBinaryNum.substring(1); // remove sign symbol from given string.
  }

  // split input to integer and fractional parts
  let numberParts: string[] = localStrBinaryNum.split(".");

  if(numberParts[0].length > 1){
    if(numberParts[0].charAt(0) === "0"){
      console.log("HAS LEADING ZEROES IN FUNCTION!");
      numberParts[0] = trimLeadingZeroes(numberParts[0]);
      console.log("TEST: " + numberParts[0]);
    }
  }


  // If integer part only has one digit (either 1 or 0)
  if (numberParts[0].length === 1) {
    // If only digit in integer part is 1
    if (numberParts[0].charAt(0) === "1") {
      return 0;
    } else {
      // if only digit integer part is 0, find the next 1 in the fractional part

      // if there is a given fractional part in strBinaryNum
      if (numberParts.length === 2) {
        while (
          numberParts[1].charAt(index) !== "1" &&
          index < numberParts[1].length
        ) {
          baseTwoExponent--; // decrement base two exponent
          index++; // move to next index
        }

        // if digit 1 has been reached in fractional part
        if (numberParts[1].charAt(index) === "1") {
          baseTwoExponent--;
        } else {
          // if end of fractional part has been reached (least significant bit is 1 and the rest are 0s)
          baseTwoExponent = 0 - numberParts[1].length; //
        }
      }

      return baseTwoExponent;
    }
  } else {
    // If integer part has more than one non-zero digit

    // if whole number part has leading zeroes

    return numberParts[0].length - 1;
  }
}

export function normalizeBinaryNumber(
  strBinaryNum: string,
  baseTwoExponent: number,
): string {
  let localStrBinaryNum: string = strBinaryNum;
  let signChar: string = "";

  // If negative (alternative is if(parseFloat(strBinaryNum) < 0))
  if (localStrBinaryNum.charAt(0) === "-") {
    // if given is zero
    if (parseFloat(localStrBinaryNum) === 0) {
      if (strBinaryNum.charAt(0) === "-") {
        return "-0.0";
      } else {
        return "0.0";
      }
    } else {
      signChar += "-";
      localStrBinaryNum = localStrBinaryNum.substring(1);
    }
  }

  let numberParts: string[] = localStrBinaryNum.split(".");

  if(numberParts[0].length > 1){
    // if whole number part has leading zeroes
    if(numberParts[0].charAt(0) === "0"){
      console.log("HAS LEADING ZEROES!");
      numberParts[0] = trimLeadingZeroes(numberParts[0]);
    }

    console.log("FINAL TRIMMED BINARY INPUT: " + numberParts[0] + "." + numberParts[1]);
  }



  // If integer part only has one digit (either 1 or 0)
  if (numberParts[0].length === 1) {
    
    // if already normalized and has fractional part (e.g. 1.f)
    if (numberParts[0].charAt(0) === "1" && numberParts.length === 2) {
      return signChar + numberParts[0] + "." + numberParts[1];
    } else if (numberParts[0].charAt(0) === "1" && numberParts.length === 1) {
      // if already normalized and has no fractional part (e.g. 1.0)
      return signChar + numberParts[0] + ".0";
    } else if (numberParts.length === 2) {
      // if not yet normalized and fractional part has no value(e.g. 0.0)
      if (numberParts[1].length === 1 && numberParts[1].charAt(0) === "0") {
        return "0.0";
      } else if (numberParts[1].length === 1) {
        // if not yet normalized and fractional part has value (e.g. 0.1)
        return signChar + numberParts[1].charAt(0) + ".0";
      } else if (numberParts[1].length >= 1) {
        console.log("should be here again");
        return (
          signChar +
          numberParts[1].charAt(-1 * baseTwoExponent - 1) +
          "." +
          (numberParts[1].length === Math.abs(baseTwoExponent) ? "0" : numberParts[1].substring(-1 * baseTwoExponent))
        );
      }
    } else if (numberParts.length === 1) {
      // if fractional part doesn't have a value
      return "0";
    } else {
      // if both zeroes
      return "0.0";
    }
  } else if (numberParts[0].length > 1) {
    // if integer part has more than one digit



    // if fractional part has value
    if (numberParts.length === 2) {
      console.log("HERE?");
      return (
        signChar +
        numberParts[0].charAt(0) +
        "." +
        numberParts[0].substring(1) +
        numberParts[1]
      );
    } else if (numberParts.length === 1) {
      // if fractional part has no value
      return (
        signChar + numberParts[0].charAt(0) + "." + numberParts[0].substring(1)
      );
    }
  }
  return ""; // for typescript error prevention
}

export function convertToBinary64FloatingPoint(
  strNum: string,
  exponent: number,
) {
  let signBit: string = "";
  let exponentField: string = "";
  let significand: string = "";
  let ePrime: number = exponent + 1023;

  let tempStrNumParts: string[] = strNum.split(".");



  // 0 Special Case
  if (strNum === "0" || strNum === "-0.0") {
    return (
      (strNum === "-0.0" ? "1" : "0") + " " +
      "00000000000" + " " +
      zeroExtendLeft("0", 52)
    );
  }
  // Infinity Special Case
  else if (exponent >= 1023) {
    return (
      (strNum === "-0.0" ? "1" : "0") + " " +
      "11111111111" + " " +
      zeroExtendLeft("0", 52)
    );
  } 
  // Denormalized Special Case
  else if (exponent < -1022) {
    let denormalizedString : string = "";

    denormalizedString = zeroExtendLeft("", Math.abs(exponent + 1022) - 1) + 
    (strNum.charAt(0) === "-" ? tempStrNumParts[0].charAt(1) : tempStrNumParts[0].charAt(0)) +
    tempStrNumParts[1];

    console.log("DENORMALIZED FRACTIONAL PART: " + denormalizedString);

    return (strNum.charAt(0) === "-" ? "1" : "0") + " 00000000000 " + denormalizedString + zeroExtendRight("", 52 - denormalizedString.length);
    
  }

  exponentField = convertDecimalToBinary(ePrime, 0);
  significand = strNum.split(".")[1];
  signBit = strNum.includes("-") ? "1" : "0";

  return (
    signBit + " " +
    zeroExtendLeft(exponentField, 11) + " " +
    zeroExtendRight(significand, 52)
  );
}

export function zeroExtendLeft(strNum: string, numBits: number): string {
  let result: string = strNum;

  for (let i = 0; i < numBits - strNum.length; i++) {
    result = "0" + result;
  }

  return result;
}

export function zeroExtendRight(strNum: string, numBits: number): string {
  let result: string = strNum;

  for (let i = 0; i < numBits - strNum.length; i++) {
    result = result + "0";
  }

  return result;
}
