import { Box, Center } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import React from 'react';

export default function MarkPopup({ result }: { result: boolean }) {

    const MotionBox = motion(Box);

    return (
        <Center justifyContent={"end"} fontWeight={"800"} fontSize={"20px"} fontStyle={"italic"} fontFamily={"cursive"} color={!result ? "red" : "green"}  w="full" zIndex={10}>
            <MotionBox
                initial={{ y: 100, opacity: 0, scaleX: 0 }}
                animate={{ y: 0, opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {result ? "Success" : "Failed"}
            </MotionBox>
        </Center>
    )
}