import ReadMore from "@/utils/ReadMore";
import { COLORS } from "@/utils/theme";
import {
    Box,
    Flex,
    Text,
    Badge,
    VStack,
    HStack,
    Select,
    chakra,
    Avatar,
    Separator,
    IconButton
} from "@chakra-ui/react";
import { FaCrown } from "react-icons/fa";
import { useSelector } from "react-redux";
import LeftArrowIcon from "../asset/LeftArrowIcon";
import { useRouter } from "next/router";
import { EmptyState } from "@/utils/EmptyState";

export default function QuizLeaderboard({ quizBoard }: any) {
    const { temporary, user } = useSelector((a: { auth: { temporary: any, user: any } }) => a.auth)
    const router = useRouter();

    return (
        <Box bg={COLORS.blue} w="full" minH="100vh" p={4} pt="100px" color="white">
            {/* Header */}
            <Flex justify="space-between" align="center" mb={6}>
                <IconButton onClick={() => router.back()}>
                    <LeftArrowIcon />
                </IconButton>

                <Text fontSize="lg" fontWeight="bold">Quiz Leaderboard</Text>

            </Flex>

            {/* Top 3 */}
            <Text fontWeight="700" color={COLORS.white} fontSize={["20px", "24px"]}>
                {temporary.title}
            </Text>
            <ReadMore color="#fff" temporary={temporary} />

            {/* List */}
            <Box bg="white" color="black" mt={8} borderRadius="2xl" p={4}>
                {quizBoard.length > 0.1? quizBoard.map((user: any, idx: number) => (
                    <Box key={idx}>
                        <Flex align="center" justify="space-between" py={3}>
                            <HStack spaceX={4}>
                                <Text fontWeight="bold">{idx + 1}</Text>
                                <Avatar.Root>
                                    <Avatar.Fallback name={user.student.last_name} />
                                    <Avatar.Image src={user.student.photo} />
                                </Avatar.Root>
                                <VStack align="start" spaceX={0}>
                                    <Text fontWeight="semibold">{user.student.last_name + " " + user.student.first_name}</Text>
                                    <HStack spaceX={1}>
                                        <Text fontSize="sm" color="gray.600">{user.total_score} %</Text>
                                    </HStack>
                                </VStack>
                            </HStack>
                            {idx === 0 ?
                                <FaCrown
                                    size={24}
                                    color="#FFD700"
                                /> : idx === 1 ?

                                    <FaCrown
                                        size={24}
                                        color="#9e9d9aff"
                                    /> :
                                    idx === 2 &&
                                    <FaCrown
                                        size={24}
                                        color="#3f2413ff"
                                    />
                            }
                        </Flex>
                        {idx < quizBoard.length - 1 && <Separator />}
                    </Box>
                )):
                <EmptyState title="No Leaderboard" />
                }
            </Box>
        </Box>
    );
}
