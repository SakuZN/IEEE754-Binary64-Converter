import React from "react";

interface Props {
  bitPosition: number;
  bitValue: number | string;
}

const BitBoxes = ({ bitPosition, bitValue }: Props) => {
  const color =
    bitValue === 1 ? "bg-green-100" : bitValue === 0 ? "bg-background" : "";
  return (
    <div className="flex flex-col items-center">
      <span className="text-xs font-semibold mb-1">{bitPosition}</span>
      <div
        className={`relative flex items-center justify-center w-8 h-8 rounded-md ${color ? color : "bg-background"} border-2 border-solid mb-2 hover:bg-accent`}
      >
        <span className="text-xs font-medium">{bitValue}</span>
      </div>
    </div>
  );
};
export default BitBoxes;
