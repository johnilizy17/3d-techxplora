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
import { useSelector } from "react-redux";
import useCustomToast from "@/hooks/useCustomToast";

const GroupCode = () => {

    const [screenHeight, setScreenHeight] = useState<number>(0);
    const { teacherCode } = useSelector((a: { teacher: { teacherCode: string } }) => a.teacher);
    const showToast = useCustomToast()

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
        <DashboardLayout title="Create Group">
            <CloseLayout>
                <MotionBox
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    w="full"
                    h="100vh" pos="relative" bg={COLORS.whitesmoke} pt="100px">
                    <VStack
                        w="full"
                        textAlign="center"
                        justify={"start"}
                    >
                        <Image
                            src="/auth/success.gif" // Replace with actual image URL or import
                            alt="Celebration"
                            w={screenHeight > 800 ? "190.45px" : "140px"}
                            objectFit="contain"
                        />
                        <Center mt="45px">
                            <Heading fontSize="20px" fontWeight={"700"} color={COLORS.deep_gray} mr="5px">Group Created</Heading>
                            <QuestionIcon />
                        </Center>
                        <Text fontSize="14px" color={COLORS.light_gray}>
                            Share this code with your students to invite them
                        </Text>

                        <VStack mb="20px" spaceX={1}>
                            <Text fontSize="10px" mt="30px" color={COLORS.gray_variant}>
                                Group Code
                            </Text>
                            <Heading fontSize="48px" fontFamily="Poppins" fontWeight={"700"} color={COLORS.deep_sky}>
                                {teacherCode}
                            </Heading>
                        </VStack>

                        <Clipboard.Root cursor="pointer"
                        onClick={()=>showToast("Copied Successfully", "success")}
                        value={teacherCode ? teacherCode : "No code"}>
                            <Clipboard.Trigger asChild>
                                <Center bg={COLORS.blue} w="135px" h="40px" color={COLORS.white} borderRadius={"full"} >
                                    <Box fontWeight={"700"} fontSize={"14px"} mr="8px">
                                        Copy Code
                                    </Box>
                                    <CopyIcon />
                                </Center>
                            </Clipboard.Trigger>
                        </Clipboard.Root>

                    </VStack>
                    <Center cursor="pointer" w="full" pos="absolute" bottom="20px" onClick={() => router.push("/dashboard")} fontSize="14px" color={COLORS.black} fontFamily={"Poppins"} textDecor="underline">
                        Go to My Dashboard
                    </Center>
                </MotionBox>
            </CloseLayout>
        </DashboardLayout>
    );
};

export default GroupCode;
