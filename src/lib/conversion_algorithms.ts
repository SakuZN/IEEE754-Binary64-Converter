import {
  trimLeadingZeroes,
  zeroExtendLeft,
  zeroExtendRight,
} from "./conversion_helpers";
export type ConversionOutput = {
  normalized: string;
  exponent: number;
  binary64: string;
  hexRepresentation: string;
};

function convertDecimalToBinary(num: number, base10Exponent: number): string {
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

  return strResult;
}

function getRequiredBaseTwoExponent(strBinaryNum: string): number {
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

  if (numberParts[0].length > 1) {
    if (numberParts[0].charAt(0) === "0") {
      numberParts[0] = trimLeadingZeroes(numberParts[0]);
    }
  }

  // If integer part only has one digit (either 1 or 0)
  if (numberParts[0].length === 1) {
    // If only digit in integer part is 1
    if (numberParts[0].charAt(0) === "1") {
      return 0;
    } else {
      // if only digit integer part is 0, find the next 1 in the fractional part

      // if there is a given fractional part in strBinaryNum and at least one 1 binary number in it
      if (numberParts.length === 2 && numberParts[1].includes("1")) {
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

function normalizeBinaryNumber(
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

  if (numberParts[0].length > 1) {
    // if whole number part has leading zeroes
    if (numberParts[0].charAt(0) === "0") {
      console.log("HAS LEADING ZEROES!");
      numberParts[0] = trimLeadingZeroes(numberParts[0]);
    }

    console.log(
      "FINAL TRIMMED BINARY INPUT: " + numberParts[0] + "." + numberParts[1],
    );
  }

  if (!numberParts[0].includes("1") && !numberParts[1].includes("1")) {
    return signChar + "0.0";
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
          (numberParts[1].length === Math.abs(baseTwoExponent)
            ? "0"
            : numberParts[1].substring(-1 * baseTwoExponent))
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

function convertToBinary64FloatingPoint(strNum: string, exponent: number) {
  let signBit: string = "";
  let exponentField: string = "";
  let significand: string = "";
  let ePrime: number = exponent + 1023;
  let isNegative: boolean = false;
  let noSignStrNum: string = "";

  let tempStrNumParts: string[] = strNum.split(".");

  if (strNum.charAt(0) === "-") {
    isNegative = true;
    noSignStrNum = strNum.substring(1);
  } else {
    noSignStrNum = strNum;
  }

  // 0 Special Case
  if (
    strNum === "0" ||
    (noSignStrNum.charAt(0) === "0" && !tempStrNumParts[1].includes("1"))
  ) {
    return (
      (strNum.charAt(0) === "-" ? "1" : "0") +
      "00000000000" +
      zeroExtendLeft("0", 52)
    );
  }
  // Infinity Special Case
  else if (exponent > 1023) {
    return (
      (strNum.charAt(0) === "-" ? "1" : "0") +
      "11111111111" +
      zeroExtendLeft("0", 52)
    );
  }
  // Denormalized Special Case
  else if (exponent < -1022) {
    let denormalizedString: string = "";

    denormalizedString =
      zeroExtendLeft("", Math.abs(exponent + 1022) - 1) +
      (strNum.charAt(0) === "-"
        ? tempStrNumParts[0].charAt(1)
        : tempStrNumParts[0].charAt(0)) +
      tempStrNumParts[1];

    console.log("DENORMALIZED FRACTIONAL PART: " + denormalizedString);

    return (
      (strNum.charAt(0) === "-" ? "1" : "0") +
      "00000000000" +
      denormalizedString +
      zeroExtendRight("", 52 - denormalizedString.length)
    );
  }

  exponentField = convertDecimalToBinary(ePrime, 0);
  significand = strNum.split(".")[1];
  signBit = strNum.includes("-") ? "1" : "0";

  return (
    signBit +
    zeroExtendLeft(exponentField, 11) +
    zeroExtendRight(significand, 52)
  );
}

export function binary64ToHexadecimal(binary64: string): string {
  let hexString: string = "";
  let hexChar: string = "";

  for (let i = 0; i < 64; i += 4) {
    hexChar = parseInt(binary64.substring(i, i + 4), 2)
      .toString(16)
      .toUpperCase();
    hexString += hexChar;
  }

  return `0x${hexString}`;
}

export function decimalInputToBinary64(
  strNum: string,
  base10Exponent: number,
): ConversionOutput {
  //Get the binary form of the given decimal number
  const binaryNum = convertDecimalToBinary(parseFloat(strNum), base10Exponent);

  //Get the required base two exponent
  const baseTwoExponent = getRequiredBaseTwoExponent(binaryNum);

  //Get the normalized binary number
  const normalizedBinary = normalizeBinaryNumber(binaryNum, baseTwoExponent);

  //Get the binary64 representation
  const binary64 = convertToBinary64FloatingPoint(
    normalizedBinary,
    baseTwoExponent,
  );

  //Finally, get the hexadecimal representation
  const hexRepresentation = binary64ToHexadecimal(binary64);

  return {
    normalized: normalizedBinary,
    exponent: baseTwoExponent,
    binary64: binary64,
    hexRepresentation: hexRepresentation,
  };
}

export function binaryInputToBinary64(
  binaryString: string,
  exponent: number,
): ConversionOutput {
  //Get the required base two exponent
  const requiredBaseTwoExponent = getRequiredBaseTwoExponent(binaryString);

  //Get the normalized binary number
  const normalizedBinary = normalizeBinaryNumber(
    binaryString,
    requiredBaseTwoExponent,
  );

  //Get the final base two exponent
  const finalBaseTwoExponent = requiredBaseTwoExponent + exponent;

  //Get the binary64 representation
  const binary64 = convertToBinary64FloatingPoint(
    normalizedBinary,
    finalBaseTwoExponent,
  );

  //Finally, get the hexadecimal representation
  const hexRepresentation = binary64ToHexadecimal(binary64);

  return {
    normalized: normalizedBinary,
    exponent: finalBaseTwoExponent,
    binary64: binary64,
    hexRepresentation: hexRepresentation,
  };
}
