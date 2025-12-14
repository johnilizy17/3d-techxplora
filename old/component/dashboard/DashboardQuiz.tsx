// components/DashboardQuiz.tsx
import { allGroup } from "@/url/redux/slices/techerSlice";
import { EmptyState } from "@/utils/EmptyState";
import { COLORS } from "@/utils/theme";
import {
    Box,
    Flex,
    Avatar,
    Text,
    IconButton,
    VStack,
    HStack,
    AvatarRoot,
    AvatarFallback,
    Heading,
    Center,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CopyIcon from "../asset/CopyIcon";
import { setTemporaryStorage } from "@/url/redux/slices/authSlice";

const DashboardQuiz = () => {
    const { Group } = useSelector((a: { teacher: { Group: any } }) => a.teacher);
    const dispatch = useDispatch()
    const router = useRouter();
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth)
    const type = user.accountable_type === "App\\Models\\Student" ? "student" : "teacher"

    useEffect(() => {
        dispatch(allGroup({ type: type, id: user.id }) as any)
    }, [])

    return (
        <Box px={{ base: 4, md: 16 }} fontFamily={"Poppins"} mt={[4, 8]} p={4}>
            <Flex justify="space-between" align="center" mb={4}>
                <Heading fontSize="16px" color={COLORS.lighter_blue} fontWeight={"500"} lineHeight={"20px"}>
                    Recent Group
                </Heading>
                <Box fontSize="12px" color={COLORS.black} onClick={() => router.push("/dashboard/group")} _hover={{ textDecoration: "underline" }}>
                    View all
                </Box>
            </Flex>
            <Flex flexWrap={"wrap"} gap={2}>
                {Group && Group.length > 0.1 ? Group.map((a: any, b: number) => (
                    <Box
                        bg="white"
                        borderRadius="xl"
                        display={b > 2 ? "none" : "block"}
                        p={4}
                        shadow="sm"
                        cursor={"pointer"}
                        w="full"
                        maxW="sm"
                    >
                        <Flex
                            onClick={() => {
                                dispatch(setTemporaryStorage(a))
                                 router.push(`/dashboard/teacher/groups?code=${a.group_code}`)
                            }}
                            justify="space-between" align="center">
                            <Flex align="center" gap={3}>
                                <AvatarRoot
                                    size="md"
                                // Replace with your image path
                                >
                                    <AvatarFallback name={a.title} />
                                    <Avatar.Image src={a.image} />
                                </AvatarRoot>
                                <VStack align="start">
                                    <Text fontWeight="600" lineClamp={1} fontSize={"16px"} color={COLORS.light_blue}>
                                        {a.title}
                                    </Text>
                                    <Text fontSize="14px"  lineClamp={2} color={COLORS.gray}>
                                        {a.description}
                                    </Text>
                                </VStack>
                            </Flex>
                            <IconButton
                                aria-label="Bookmark"
                                variant="ghost"
                                color="blue.600"
                                fontSize="xl"
                            >
                                <svg width="14" height="18" viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M13.449 4.12811C13.449 1.83571 11.8818 0.916748 9.62531 0.916748H4.32623C2.1391 0.916748 0.5 1.77306 0.5 3.97523V16.2451C0.5 16.8499 1.15079 17.2309 1.67794 16.9351L6.99624 13.9518L12.2686 16.9301C12.7966 17.2275 13.449 16.8466 13.449 16.2409V4.12811Z" stroke="#4559A8" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </IconButton>
                        </Flex>

                        <Flex justify="space-between" mt={4}>
                            <Text fontSize="sm" color={a.status == "1"?"green.500":"purple.500"}>
                               {a.status == "1"? "Active": "Disactivated"}
                            </Text>
                            <Center justifyContent={"end"} gap={4}>
                                <Text fontSize="sm" color={COLORS.dim_gray} fontWeight="bold">
                                    {a.group_code}
                                </Text>
                                <CopyIcon code={a.group_code} />
                            </Center>
                        </Flex>
                    </Box>
                ))
                    :
                    <EmptyState title="No Group Found" />
                }

            </Flex>
        </Box>
    );
};

export default DashboardQuiz;