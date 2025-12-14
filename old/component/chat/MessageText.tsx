"use client";
import { Box } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

const MotionBox = motion(Box);

export default function TypingText({ text, ScrollUp }: { text: string, ScrollUp: () => void }) {
    const [displayed, setDisplayed] = useState("");
    const [type, setType] = useState(true)

    useEffect(() => {
        setDisplayed(""); // 👈 clear old text
        let i = -1;
        if (type) {
            const interval = setInterval(() => {
                if (i < text.length) {
                    setDisplayed((prev) => prev + text[i]);
                    ScrollUp();
                    i++;
                } else {
                    clearInterval(interval);
                }
            }, 40);

            setType(false)
            return () => clearInterval(interval);
        } else {
            setDisplayed(text)
            setType(true)
        }

    }, [text]);

    return (
        <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            fontFamily="Poppins"
            color="#fff"
            fontSize="16px"
        >
            <ReactMarkdown>{displayed.replace("undefined", "")}</ReactMarkdown>
        </MotionBox>
    );
}
