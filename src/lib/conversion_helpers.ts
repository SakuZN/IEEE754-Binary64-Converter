function hasFractionalPart(num: number): boolean {
  return num !== Math.floor(num);
}

function trimLeadingZeroes(strBinaryNum: string): string {
  let localStrBinaryNum: string = strBinaryNum;

  // While there are leading zeroes and the length of the whole number part is greater than 1
  while (localStrBinaryNum.charAt(0) === "0" && localStrBinaryNum.length > 1) {
    localStrBinaryNum = localStrBinaryNum.substring(1);
    console.log("trimLeadingZeroes test: " + localStrBinaryNum);
  }

  return localStrBinaryNum;
}

function getFractionalPart(num: number, decimalPlaces: number = 6): number {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round((num - Math.floor(num)) * factor) / factor;
}

function countIntegerPartDigits(strNum: string): number {
  const array = strNum.split(".");

  return array[0].length;
}

function countFractionalPartDigits(strNum: string): number {
  const array = strNum.split(".");

  if (array.length === 2) {
    return array[1].length; // If number has a fractional part
  } else {
    return 0; // if number has no fractional part
  }
}
function zeroExtendLeft(strNum: string, numBits: number): string {
  let result: string = strNum;

  for (let i = 0; i < numBits - strNum.length; i++) {
    result = "0" + result;
  }

  return result;
}

function zeroExtendRight(strNum: string, numBits: number): string {
  let result: string = strNum;

  for (let i = 0; i < numBits - strNum.length; i++) {
    result = result + "0";
  }

  return result;
}

export {
  hasFractionalPart,
  trimLeadingZeroes,
  getFractionalPart,
  countIntegerPartDigits,
  countFractionalPartDigits,
  zeroExtendLeft,
  zeroExtendRight,
};
