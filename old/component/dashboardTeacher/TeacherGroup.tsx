// components/TeacherGroup.tsx
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
    Center,
    CardBody,
    CardRoot,
} from "@chakra-ui/react";
import AddIcon from "../asset/AddIcon";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allGroup } from "@/url/redux/slices/techerSlice";
import CopyIcon from "../asset/CopyIcon";
import { setTemporaryStorage } from "@/url/redux/slices/authSlice";

const TeacherGroup = () => {

    const router = useRouter();
    const dispatch = useDispatch();
    const { Group } = useSelector((a: { teacher: { Group: any } }) => a.teacher);
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth)
    const type = user.accountable_type === "App\\Models\\Student" ? "student" : "teacher"

    useEffect(() => {
        dispatch(allGroup({ type: type, id: user.id }) as any)
    }, [])

    return (
        <Box px={{ base: 4, md: 16 }} fontFamily={"Poppins"} mt={[4, 8]} p={4}>
            <Text fontWeight="500" color={COLORS.lighter_blue} fontSize={["16px", "20px"]} mb={3}>
                Top Groups
            </Text>
            <Flex flexWrap={"wrap"} gap={4}>
                {Group && Group.length > 0.1 && Group.map((a: any, b: number) => (
                    <Box
                        bg="white"
                        borderRadius="xl"
                        p={4}
                        shadow="sm"
                        w="full"
                        maxW="sm"
                    >
                        <Flex
                            onClick={() => {
                                dispatch(setTemporaryStorage(a))
                                type === "student" ? router.push(`/dashboard/teacher/groups?code=${a.group_code}`) : router.push(`/dashboard/teacher/groups?code=${a.group_code}`)
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
                                    <Text lineClamp={1} fontWeight="600" fontSize={"16px"} color={COLORS.light_blue}>
                                        {a.title}
                                    </Text>
                                    <Text lineClamp={2} fontSize="14px" color={COLORS.gray}>
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
                            <Text fontSize="sm" color="purple.500">
                                0 Member
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
                }

                {user.accountable_type === "App\\Models\\Student" ?
                    <CardRoot
                        borderRadius={"12px"}
                        onClick={() => router.push("/dashboard/join_group")}
                        cursor="pointer" h="135px" w={["full", "400px"]} _hover={{ transform: "scale(1.01)", transition: "0.2s ease" }} pos="relative" bg="#eef0fe">
                        <CardBody p={4}>
                            <Center h="full">

                                <AddIcon /> <Box color={COLORS.blue} fontWeight={"700"} ml="8px" fontFamily={"Plus Jakarta Sans"} fontSize={"14px"}>Join Group</Box>
                            </Center>
                        </CardBody>
                    </CardRoot>
                    :
                    <CardRoot
                        borderRadius={"12px"}
                        onClick={() => router.push("/dashboard/create_group")}
                        cursor="pointer" h="135px" w={["full", "400px"]} _hover={{ transform: "scale(1.01)", transition: "0.2s ease" }} pos="relative" bg="#eef0fe">
                        <CardBody p={4}>
                            <Center h="full">

                                <AddIcon /> <Box color={COLORS.blue} fontWeight={"700"} ml="8px" fontFamily={"Plus Jakarta Sans"} fontSize={"14px"}>Create Group</Box>
                            </Center>
                        </CardBody>
                    </CardRoot>}
            </Flex>
        </Box>
    );
};

export default TeacherGroup;