import React, { useEffect, useState } from "react";
import {
    Box,
    Button,
    Center,
    Heading,
    Image,
    Text,
    VStack,
    useClipboard,
    Link,
    Clipboard,
    IconButton,
} from "@chakra-ui/react";
import CopyIcon from "@/component/asset/CopyIcon";
import DashboardLayout from "@/layout/DashboardLayout";
import CloseLayout from "@/layout/CloseLayout";
import { COLORS } from "@/utils/theme";
import QuestionIcon from "@/component/asset/QuestionIcon";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import useCustomToast from "@/hooks/useCustomToast";

const SuccessQuizForm = ({ data }: { data: any }) => {
    const groupCode = data.quiz_code;

    const [screenHeight, setScreenHeight] = useState<number>(0);
    const showMessage = useCustomToast()
    const router = useRouter()

    useEffect(() => {
        // Function to update the screen height
        const updateHeight = () => {
            setScreenHeight(window.innerHeight);
        };

        // Set initial height
        updateHeight();

        // Update on resize
        window.addEventListener("resize", updateHeight);

        // Cleanup
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    const MotionBox = motion(Box);

    return (
        <MotionBox
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}

            h="100vh" pos="relative" w="full" bg={COLORS.whitesmoke} pt="100px">
            <VStack
                w="full"
                textAlign="center"
                justify={"start"}
            >
                <Image
                    src="/auth/success.gif" // Replace with actual image URL or import
                    alt="Celebration"
                    w={screenHeight > 800 ? "220.45px" : "190px"}
                    objectFit="contain"
                />
                <Center mt="45px">
                    <Heading fontSize="20px" fontWeight={"700"} color={COLORS.deep_gray} mr="5px">Quiz Created Successfully</Heading>
                    <QuestionIcon />
                </Center>
                <Text fontSize="11px" color={COLORS.light_gray}>
                    Your Quiz code has been successfully created
                </Text>
                <Heading fontSize="28px" fontFamily="Poppins" fontWeight={"700"} color={COLORS.deep_sky}>
                    {groupCode}
                </Heading>

                <Clipboard.Root onClick={() => showMessage("Successfully copied", "success")} value={groupCode}>
                    <Clipboard.Trigger asChild>
                        <Center bg={COLORS.blue} w="135px" h="40px" color={COLORS.white} borderRadius={"full"} >
                            <Box fontWeight={"700"} fontSize={"14px"} mr="8px">
                                Copy Code
                            </Box>
                            <CopyIcon copy={false} />
                        </Center>
                    </Clipboard.Trigger>
                </Clipboard.Root>

            </VStack>
            <Center cursor="pointer" w="full" pos="absolute" bottom="20px" onClick={() => router.push("/dashboard")} fontSize="14px" color={COLORS.black} fontFamily={"Poppins"} textDecor="underline">
                Go to My Dashboard
            </Center>
        </MotionBox>
    );
};

export default SuccessQuizForm;
