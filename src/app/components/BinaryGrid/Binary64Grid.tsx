import React from 'react'
import {Card, CardContent} from "@/components/ui/card";
import BitBoxes from "@/app/components/BinaryGrid/BitBoxes";
const Binary64Grid = () => {
    const signBit = () => {
        let arr = [];
        for (let i = 0; i < 1; i++) {
            arr.push(<BitBoxes bitPosition={i} bitValue={0} key={i}/>);
        }
        return arr;
    }
    const exponentBits = () => {
        let arr = [];
        for (let i = 1; i < 12; i++) {
            arr.push(<BitBoxes bitPosition={i} bitValue={1} key={i}/>);
        }
        return arr;
    }
    const mantissaBits = () => {
        let arr = [];
        for (let i = 12; i < 64; i++) {
            arr.push(<BitBoxes bitPosition={i} bitValue={0} key={i}/>);
        }
        return arr;
    }
    return (
            <Card className="mt-5 mx-10 border">
                <CardContent className="p-1">
                    <div className="flex flex-row gap-1">
                        <div className="bg-gray-300 flex flex-col items-center justify-center  p-6">
                            <span className="text-sm font-semibold mb-5">Sign Bit</span>
                            <div className="flex flex-wrap">
                                {signBit()}
                            </div>
                        </div>

                        <div className="bg-blue-100 flex flex-col items-center justify-center p-6">
                            <span className="text-sm font-semibold mb-5">Exponent</span>
                            <div className="flex flex-wrap">
                                {exponentBits()}
                            </div>
                        </div>
                        <div className="bg-red-200 flex flex-col items-center justify-center p-6 max-w-xl">
                            <span className="text-sm font-semibold mb-5">Mantissa</span>
                            <div className="flex flex-wrap">
                                {mantissaBits()}
                            </div>
                        </div>
                    </div>
                </CardContent>

            </Card>
    )
}
export default Binary64Grid
