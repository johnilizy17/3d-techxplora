import { COLORS } from "@/utils/theme";
import { Badge, Box, CardRoot, Center, Flex, Heading, Link, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Card, CardBody } from "@chakra-ui/react";
import React, { useEffect } from "react";
import DashboardStatus from "./DashboardStatus";
import { useRouter } from "next/router";
import { allQuiz, allQuizData } from "@/url/redux/slices/techerSlice";
import { useDispatch, useSelector } from "react-redux";
import { EmptyState } from "@/utils/EmptyState";
import CopyIcon from "../asset/CopyIcon";
import { setTemporaryStorage } from "@/url/redux/slices/authSlice";


export default function DashboardRecent() {

    const router = useRouter();
    const { quizzes } = useSelector((a: { teacher: { quizzes: any } }) => a.teacher)
    const dispatch = useDispatch();
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth)
    const type = user.accountable_type === "App\\Models\\Student" ? "student" : "teacher"

    useEffect(() => {
        dispatch(allQuiz({ type: type, id: user.id }) as any)
         dispatch(allQuizData("") as any)
    }, [user.id])


    return (
        <Box px={{ base: 4, md: 16 }} mt={[4, 8]} py={4}>
            <Flex justify="space-between" align="center" mb={4}>
                <Heading fontSize="16px" color={COLORS.lighter_blue} fontWeight={"500"} lineHeight={"20px"}>
                    Recent Quizzes
                </Heading>
                <Link href="/dashboard/quizzes" fontSize="12px" color={COLORS.black} _hover={{ textDecoration: "underline" }}>
                    View all
                </Link>
            </Flex>
            {quizzes.length > 0.1 ?
                <SimpleGrid columns={{ base: 2, md: 3 }} gap={4}>
                    {
                        quizzes.map((quiz: any, index: number) => (
                            <CardRoot
                                borderRadius={"12px"}
                                display={index > 2 ? "none" : "block"}
                                cursor="pointer" _hover={{ transform: "scale(1.01)", transition: "0.2s ease" }} pos="relative" key={index} bg="#eef0fe">
                                <CardBody p={4}>
                                    <Flex
                                        onClick={() => {
                                            dispatch(setTemporaryStorage(quiz));
                                            type === "student" ? router.push(`/dashboard/quizzes/details?code=${quiz.quiz_code}`) : router.push(`/dashboard/teacher/quizzes?code=${quiz.quiz_code}`)
                                        }}
                                        justify="space-between" mb={2}>
                                        <Box>
                                            <Text fontWeight="600" fontFamily={"Poppins"} lineClamp={2} fontSize={["12px", "14px"]} color="#4f42c0">
                                                {quiz.title}
                                            </Text>
                                            <Text fontSize={["10px", "12px"]} lineClamp={2} fontFamily={"Poppins"} color="#8300A5">
                                                {quiz.description}
                                            </Text>
                                        </Box>
                                        <Center flexDir={"column"} borderBottomRadius={"12px"} top="0px" position="absolute" right={["10px", "20px"]} h="50px" w="36px" bg={COLORS.dim_gray} color="white" fontSize="xs" >
                                            <svg width="9" height="12" viewBox="0 0 9 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.3125 7.90867V11.7186C7.3125 11.8001 7.28438 11.8667 7.22813 11.9185C7.17188 11.9704 7.10625 11.9963 7.03125 11.9963C6.97875 11.9963 6.93 11.9852 6.885 11.963L4.5 10.5523L2.115 11.963C2.0475 12 1.97625 12.0093 1.90125 11.9907C1.82625 11.9722 1.77 11.9297 1.7325 11.863C1.7025 11.8186 1.6875 11.7704 1.6875 11.7186V7.90867C1.1625 7.49398 0.75375 6.99044 0.46125 6.39803C0.15375 5.7834 0 5.13175 0 4.44307C0 3.63592 0.20625 2.888 0.61875 2.19932C1.01625 1.52546 1.5525 0.992287 2.2275 0.599815C2.925 0.199939 3.6825 0 4.5 0C5.3175 0 6.075 0.199939 6.7725 0.599815C7.4475 0.992287 7.98375 1.52546 8.38125 2.19932C8.79375 2.888 9 3.63592 9 4.44307C9 5.13175 8.84625 5.7834 8.53875 6.39803C8.24625 6.99044 7.8375 7.49398 7.3125 7.90867ZM2.8125 8.55292V10.2524L4.5 9.2527L6.1875 10.2524V8.55292C5.6475 8.77507 5.085 8.88615 4.5 8.88615C3.915 8.88615 3.3525 8.77877 2.8125 8.56402V8.55292ZM4.5 7.77538C5.1075 7.77538 5.67375 7.62357 6.19875 7.31996C6.70875 7.02376 7.11375 6.62388 7.41375 6.12033C7.72125 5.60198 7.875 5.04104 7.875 4.43752C7.875 3.834 7.72125 3.27306 7.41375 2.75471C7.11375 2.25116 6.70875 1.85498 6.19875 1.56618C5.67375 1.26257 5.1075 1.11077 4.5 1.11077C3.8925 1.11077 3.32625 1.26257 2.80125 1.56618C2.29125 1.85498 1.88625 2.25116 1.58625 2.75471C1.27875 3.27306 1.125 3.834 1.125 4.43752C1.125 5.04104 1.27875 5.60198 1.58625 6.12033C1.88625 6.62388 2.29125 7.02376 2.80125 7.31996C3.32625 7.62357 3.8925 7.77538 4.5 7.77538Z" fill="#E4DFFF" />
                                            </svg>
                                            <Box mt="4px" fontSize={"8px"}>
                                                XP {quiz.xp ?? 0}
                                            </Box>
                                        </Center>
                                    </Flex>
                                    <Center mb={4} zIndex={30} gap={4} justifyContent={"start"}>
                                        <Text fontSize={["10px", "14px"]} color={COLORS.gray} lineClamp="2">
                                            {quiz.quiz_code}
                                        </Text>
                                        <CopyIcon color="#000" code={quiz.quiz_code} />
                                    </Center>
                                    <DashboardStatus quiz={quiz} />
                                </CardBody>
                            </CardRoot>
                        ))
                    }
                </SimpleGrid>
                :
                <Center>
                    <EmptyState title="No Quiz Found" />
                </Center>
            }
        </Box>
    );
}