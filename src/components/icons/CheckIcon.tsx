import React from "react";

export default function CheckIcon({ color="#22C55E", width, height }: SVGPropsDto) {

    return (
        <svg width={width ? width : "11"} height={height ? height : "8"} viewBox="0 0 11 8" fill="none">
            <path d="M4.05839 5.85505L9.42506 0.488385L10.2417 1.31672L4.05839 7.51172L0.348389 3.79005L1.16506 2.97339L4.05839 5.85505Z" fill={color} />
        </svg>
    )
}