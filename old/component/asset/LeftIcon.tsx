import React from "react";

export default function LeftIcon({ color, width, height }: SVGPropsDto) {

    return (
        <svg width={width ? width : "8"} height={height ? height : "14"} viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.66667 12.3332L1.33333 6.99984L6.66667 1.6665" stroke="#2B638B" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}