import React from 'react'

interface Props{
    bitPosition: number;
    bitValue: number;
    color?: string;
}

const BitBoxes = ({bitPosition, bitValue, color}: Props) => {
    return (
        <div className="flex flex-col items-center">
            <span className="text-xs font-semibold mb-1">{bitPosition}</span>
            <div
                className={`relative flex items-center justify-center w-8 h-8 rounded-md ${color ? color : "bg-gray-100"} border-2 border-solid mb-2`}>
                <span className="text-xs font-medium">{bitValue}</span>
            </div>
        </div>
    )
}
export default BitBoxes
