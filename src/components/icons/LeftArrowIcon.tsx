import React from "react";

export default function LeftArrowIcon({ color, width, height }: SVGPropsDto) {

    return (
        <svg width={width ? width : "24"} height={height ? height : "24"} viewBox="0 0 24 24" fill="none" >
            <path d="M19 12H5" stroke={color ? color : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 19L5 12L12 5" stroke={color ? color : "white"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}