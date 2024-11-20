import ToolTip from "./ToolTip"

import math from "../util/math"
import getRandomInt from "../util/math";

// const randomInt = math.getRandomInt;

const jumblefy = (text) => {
    let time = 1000;
    setInterval(() => {
        let originalLetter = getRandomInt(0, text.length);
        let newPlacement = getRandomInt(0, text.length);
        while(newPlacement === originalLetter) {
            newPlacement = getRandomInt(0, text.length);
        }
    }, time);
    return text;
}

export function Transmute() {
    return (
        <div className="flex justify-center mt-8 rounded-3xl p-12 bg-[#26222e] hover:cursor-pointer hover:bg-[#302b3a] hover:underline">
            {jumblefy("TRANSMUTE")}
        </div>
    )
}