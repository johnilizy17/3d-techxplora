import RightArrowIcon from "@/component/asset/RightArrowIcon";
import CloseLayout from "@/layout/CloseLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import { setTemporaryStorage } from "@/url/redux/slices/authSlice";
import { getQuestion } from "@/url/redux/slices/questionSlice";
import { verifyQuizCode } from "@/url/route/verification";
import { COLORS } from "@/utils/theme";
import {
    Box,
    Button,
    Heading,
    Text,
    VStack,
    Link,
    Image,
    Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function start() {


    const [screenHeight, setScreenHeight] = useState<number>(0);
    const router = useRouter();
    const { temporary, user } = useSelector((a: { auth: { temporary: any, user: any } }) => a.auth)
    const dispatch = useDispatch()

    async function QuizDetails() {
        if (router.query && router.query.code) {
            const { data } = await verifyQuizCode(router.query.code)
            dispatch(setTemporaryStorage(data) as any)
            dispatch(getQuestion(data.id) as any)
        }
    }

    useEffect(() => {
        QuizDetails()
    }, [router.query && router.query.code])

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

    return (
        <DashboardLayout chat={true} title="Quiz Start">
            <CloseLayout>
                <Box
                    w="full"
                    bg="white"
                    overflow="hidden"
                    textAlign="center"
                >
                    {/* Top Illustration */}
                    <Box
                        h="350px"
                        bgImage="url('/dashboard/quiz_details.png')" bgPos={"bottom"} bgRepeat={"no-repeat"} bgSize="cover"
                    />

                    {/* Content */}
                    <VStack px={6} py={8}>
                        <Heading fontSize="24px" fontWeight={"600"} color={COLORS.black}>
                            Ready for the Quiz?
                        </Heading>
                        <Text fontSize="sm" color={COLORS.gray} maxW="346px">
                            Gear up for a sprint! You've got just 30 seconds per question. Tap the
                            info icon at the top right to check out the module each question comes
                            from. Let’s see what you’ve got –{" "}
                            <Link color="blue.500" fontWeight="semibold">
                                Goodluck!
                            </Link>
                        </Text>

                        <Center w="full" mt={screenHeight > 600 ? "calc(100vh - 580px)" : "50px"} mb="20px">
                            <Button
                                colorScheme="light"
                                bg={COLORS.blue}
                                w="full"
                                maxW={"350px"}
                                color={COLORS.white}
                                fontWeight={"500"}
                                fontFamily={"Poppins"}
                                fontSize={"16px"}
                                onClick={() => router.push(`/dashboard/quizzes/competion?code=${router.query.code}`)}
                                h="48px"
                                type="submit"
                                borderRadius={"1234px"}
                            >
                                <Box mr="5px">
                                    Start Quiz
                                </Box>
                                <RightArrowIcon />
                            </Button>
                        </Center>
                    </VStack>
                </Box>
            </CloseLayout>
        </DashboardLayout>
    );
}
