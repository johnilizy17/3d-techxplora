// components/GroupStatsCard.tsx
import { COLORS } from "@/utils/theme";
import { Box, Flex, Grid, Image, Separator, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import CopyIcon from "../asset/CopyIcon";
import { getAverageScore } from "@/utils/constants";
import { useRouter } from "next/router";

export default function TeacherBanner() {


    const { user } = useSelector((a: { auth: { user: any } }) => a.auth)
    const { resultStatics } = useSelector((a: { question: any }) => a.question)
    const router = useRouter();
    const { Group } = useSelector((a: { teacher: { Group: any } }) => a.teacher);
    const { quizzes } = useSelector((a: { teacher: { quizzes: any } }) => a.teacher)


    return (
        <Flex flexDir={{ base: "column", md: "row" }} justify="space-between" gap={4} px={{ base: 4, md: 16 }}>
            {/* Top Group Info Card */}
            <Flex
                bg="#4559A8"
                borderRadius="20px"
                _hover={{ transform: "scale(1.01)", transition: "0.2s ease" }}
                w="full"
                maxW={"450px"}
                h="122px"
                color="white"
                overflow="hidden"
                pos="relative"
                align="center"
                justify="space-between"
            >
                <Box p={4}>
                    <Text fontWeight="600" fontSize="16px" lineHeight={"150%"} letterSpacing={"0.3px"}>
                        {user.fullname}
                    </Text>
                    <Text fontWeight="600" fontSize="16px" lineHeight={"150%"} letterSpacing={"0.3px"}> {user.email}</Text>
                    <Text display={"flex"} alignItems={"center"} gap="5px" mt="16px" fontSize="12px" color={COLORS.light_white} fontWeight={"400"} lineHeight={"150%"} letterSpacing={"0.3px"}>
                        {user.is_admin ? "Admin" : user.accountable_type === "App\\Models\\Teacher" ? "Teacher" : "Student"} •{" "}
                        <Text color={COLORS.light_white} display={"flex"} alignItems={"center"} gap={"5px"} as="span" fontWeight="700" lineHeight={"150%"} letterSpacing={"0.3px"}>
                            {user.accountable_type !== "App\\Models\\Teacher" ? user.category : user.is_admin && "Code:" + user.admin_code}{user.is_admin && <CopyIcon color={COLORS.light_white} code={user.admin_code} />}
                        </Text>
                    </Text>
                </Box>
                <Image
                    src="/dashboard/character2.png" // 🔁 Replace with actual illustration path
                    alt="Group illustration"
                    boxSize="250px"
                    pos="absolute"
                    bottom="-70px"
                    right={"-100px"}
                    objectFit="contain"
                />
            </Flex>

            {/* Stats Grid */}
            <Box bg="#FCD9FF" _hover={{ transform: "scale(1.01)", transition: "0.2s ease" }} maxW={"450px"} w="full" h={"99px"} borderRadius="12px" p={4}>
                <Grid templateColumns="repeat(3, 1fr)" mt="10px" gap={4} textAlign="center">
                    <Box borderRightWidth={"1px"} borderRightColor={COLORS.sky}>
                        <Text fontWeight="700" fontSize="14px" lineHeight={"20px"} color={COLORS.deep_black} letterSpacing={"-0.6%"}>
                            {Group? Group.length: 0}
                        </Text>
                        <Text fontSize="12px" color={COLORS.black} lineHeight={"20px"}>
                           Total Group
                        </Text>
                    </Box>
                    <Box 
                   cursor={"pointer"} onClick={()=>router.push("/dashboard/quizzes")}
                    borderRightWidth={"1px"} borderRightColor={COLORS.sky}>
                        <Text fontWeight="700" fontSize="14px" lineHeight={"20px"} color={COLORS.deep_black} letterSpacing={"-0.6%"}>
                            {quizzes ? quizzes.length : 0}
                        </Text>
                        <Text fontSize="12px" color={COLORS.black} lineHeight={"20px"}>
                            Quizzes
                        </Text>
                    </Box>
                    <Box cursor={"pointer"} onClick={()=>router.push("/dashboard/quizzes")}
                   >
                        <Text fontWeight="700" fontSize="14px" lineHeight={"20px"} color={COLORS.deep_black} letterSpacing={"-0.6%"}>
                            {resultStatics ? resultStatics.length : 0}
                        </Text>
                        <Text fontSize="12px" color={COLORS.black} lineHeight={"20px"}>
                            Plays
                        </Text>
                    </Box>
                </Grid>
            </Box>
        </Flex>
    );
}
