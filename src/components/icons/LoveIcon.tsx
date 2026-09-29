import React, { useState } from "react";

type SVGPropsDto = {
  color?: string;
  width?: number | string;
  height?: number | string;
};

export default function LoveIcon({ color = "#4559A8", width, height }: SVGPropsDto) {
  const [liked, setLiked] = useState(false);

  return (
    <svg
      onClick={() => setLiked(!liked)}
      width={width ? width : "20"}
      height={height ? height : "20"}
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: "pointer", transition: "0.3s" }}
    >
      <path
        d="M10.5167 17.3416C10.2333 17.4416 9.76666 17.4416 9.48332 17.3416C7.06666 16.5166 1.66666 13.0749 1.66666 7.24159C1.66666 4.66659 3.74166 2.58325 6.29999 2.58325C7.81666 2.58325 9.15832 3.31659 9.99999 4.44992C10.8417 3.31659 12.1917 2.58325 13.7 2.58325C16.2583 2.58325 18.3333 4.66659 18.3333 7.24159C18.3333 13.0749 12.9333 16.5166 10.5167 17.3416Z"
        stroke={liked ? "red" : color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={liked ? "red" : "none"}
      />
    </svg>
  );
}
