import React, { useState } from "react";
import { Text, chakra } from "@chakra-ui/react";

const COLORS = {
  gray: "#666",
  lighter_blue: "#4559A8",
};

type Props = {
  temporary: { title: string; description: string };
  color?: string;
};

export default function ReadMore({ temporary, color }: Props) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <>
      <Text mt="7px" lineClamp={expanded ? 1 : 24} fontSize={["14px", "16px"]} color={color ? color : COLORS.gray}>
        {temporary.description}
      </Text>
      <chakra.span
        color={color ? color : expanded ? COLORS.gray : COLORS.lighter_blue}
        cursor="pointer"
        fontWeight="bold"
        onClick={toggleExpand}
        _hover={{ textDecoration: "underline" }}
      >
        {expanded ? "Show less" : "Read more"}
      </chakra.span>
    </>
  );
}
