import useCustomToast from "@/hooks/useCustomToast"
import { setTemporaryStorage } from "@/url/redux/slices/authSlice"
import { getLeaderByGroup, getQuizByID } from "@/url/route/quiz"
import { verifyQroupCode } from "@/url/route/verification"
import { COLORS } from "@/utils/theme"
import {
    Box,
    SimpleGrid,
    Card,
    VStack,
    HStack,
    Text,
    Progress,
    ProgressCircle,
    Heading,
    Button,
    Stack,
    Center,
    AbsoluteCenter,
    Badge,
    Flex,
    Spinner
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import {
    LuChevronRight,
    LuCalendar,
    LuChevronDown,
} from "react-icons/lu"
import { MdOutlineDirections } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import CopyIcon from "../asset/CopyIcon"
import { EmptyState } from "@/utils/EmptyState"
import { CodeExists, hasDatePassed } from "@/utils/constants"
import { QuizEditModel } from "@/template/model/QuizEditModel"
import { QuizModel } from "@/template/model/QuizModel"
import { getAllGroupsStudentInfo } from "@/url/route/student"

export default function GroupStats() {
    // Sample data for charts
    const [quizData, setQuizData] = useState([]);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [studentData, setStudentData] = useState([]);
    const { quizzes } = useSelector((a: { teacher: { quizzes: any } }) => a.teacher)
    const [loading, setLoading] = useState(true)
    const [quizInfo, setQuizInfo] = useState<any>({});
    const toast = useCustomToast();
    const router = useRouter();
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth)
    const type = user.accountable_type === "App\\Models\\Student" ? "student" : "teacher"
    const dispatch = useDispatch();

    async function fetechGroupByStats() {
        setLoading(true); // start loading immediately
        try {
            const { data } = await getQuizByID(router.query.code);
            setQuizData(data);

            const leaderboard = await getLeaderByGroup(router.query.code);
            setLeaderboardData(leaderboard);

            const group = await verifyQroupCode(router.query.code);
            const students = await getAllGroupsStudentInfo(router.query.code ?? "")

            setStudentData(students.data);
            console.log(group.data, "group.data.members")
            setQuizInfo(group.data);
        } catch (err: any) {
            toast(err.response?.data?.message || 'Failed to fetch Quiz', 'error');
        } finally {
            setLoading(false); // stop loading after everything
        }
    }

    useEffect(() => {
        if (router.query && router.query.code) {
            fetechGroupByStats()
        }
    }, [router.query && router.query.code])

    const medicationData = [45, 65, 80, 90, 75, 55, 60]

    return (
        <>
            {loading ?
                <Center w="full" h="100vh">
                    <Spinner size={"xl"} color={COLORS.blue} />
                </Center>
                :
                <Box p={6} bg="gray.50" pt="100px">
                    <Flex gap="10px" justifyContent={"space-between"}>
                        <Box>
                            <Box fontSize={"24px"} color={COLORS.blue}>
                                {quizInfo.title}
                            </Box>
                            <Box lineClamp={1} fontSize={"14px"}>
                                {quizInfo.description}
                            </Box>
                        </Box>
                        <Center fontSize={"12px"} gap="5px" color="gray">
                            {quizInfo.group_code} <CopyIcon code={quizInfo.group_code} />
                        </Center>
                    </Flex>
                    <SimpleGrid columns={{ base: 1, lg: 2 }} gap="10px">
                        {/* Top Row */}
                        <Card.Root>
                            <Card.Header p="20px">
                                <HStack justify="space-between">
                                    <Heading size="lg" fontWeight={"600"} color="gray.700">Student Leader Board</Heading>

                                </HStack>
                            </Card.Header>
                            <Card.Body p="20px" pt="0px">
                                <VStack maxH="500px" overflow={"scroll"} align="stretch">
                                    {leaderboardData.length > 0.1 ? leaderboardData.map((item: any, i: number) => (
                                        <Box key={i}>
                                            <HStack justify="space-between" mb={2}>
                                                <Text fontWeight="medium" fontSize="sm">{i + 1}. {item.student.last_name}</Text>
                                                <Text ml="-5px" color="gray.500" fontSize="sm">{item.student.xp ?? 0} px</Text>
                                            </HStack>
                                            <Text fontSize="xs" color="gray.500" mt={1}>
                                                {item.student.email}
                                            </Text>
                                        </Box>
                                    ))
                                        :
                                        <EmptyState title={"No Leaderboard"} />
                                    }
                                </VStack>
                            </Card.Body>
                        </Card.Root>

                        {/* Notes Section */}
                        <Card.Root>
                            <Card.Header p="20px">
                                <HStack justify="space-between">
                                    <Heading size="lg" fontWeight={"600"} color="gray.700">Student Info({studentData.length}) </Heading>
                                    {/* <HStack>
                                <Text fontSize="sm" color="blue.500">More</Text>
                                <LuChevronRight size={16} color="var(--chakra-colors-blue-500)" />
                            </HStack> */}
                                </HStack>
                            </Card.Header>
                            <Card.Body p="20px" pt="0px">
                                <VStack align="stretch" spaceX={4}>
                                    <Box>
                                        <Text fontSize="sm" fontWeight="medium" mb={2}>Student Name</Text>
                                        <VStack maxH="500px" overflow={"scroll"} align="stretch">
                                            {studentData.length > 0.1 ? studentData.map((item: any, i: number) => (
                                                <HStack key={i} spaceX={2}>
                                                    <Box w={2} h={2} mr="5px" bg="gray.300" borderRadius="full" />
                                                    <Text fontSize="xs" color="gray.600">{item.last_name}, {item.first_name}</Text>
                                                </HStack>
                                            ))
                                                :
                                                <EmptyState title={"No Student Exist"} />
                                            }
                                        </VStack>
                                    </Box>
                                </VStack>
                            </Card.Body>
                        </Card.Root>
                        <Card.Root>
                            <Card.Header p="20px">
                                <HStack justify="space-between">
                                    <Heading size="lg" fontWeight={"600"} color="gray.700">Quiz Info({quizData.length}) </Heading>
                                </HStack>
                            </Card.Header>
                            <Card.Body p="20px" pt="0px">
                                <VStack align="stretch" spaceX={4}>
                                    <Box>
                                        <Text fontSize="sm" fontWeight="medium" mb={2}>Quiz</Text>
                                        <VStack maxH="500px" overflow={"scroll"} align="stretch">
                                            {quizData.length > 0.1 ? quizData.map((item: any, i: number) => (
                                                <HStack mb="10px" justifyContent={"space-between"} key={i} spaceX={2}>
                                                    <Box>
                                                        <Center justifyContent={"start"} w="auto">
                                                            <Box w={2} h={2} mr="5px" bg="black" borderRadius="full" />
                                                            <Text lineClamp={1} fontSize="xs" color="black.600">{item.title}</Text>
                                                        </Center>
                                                        {!hasDatePassed(item.start_at) ?
                                                            <Text fontSize={["10px", "12px"]} color={COLORS.deep_purple}>
                                                                ℹ️   Pending
                                                            </Text>
                                                            : hasDatePassed(item.end_at) ?
                                                                <Text fontSize={["10px", "12px"]} color={COLORS.red}>
                                                                    ℹ️  Closed
                                                                </Text>
                                                                :
                                                                <Text fontSize={["10px", "12px"]} color={COLORS.green}>
                                                                    ℹ️   Open
                                                                </Text>}
                                                        <Center color={COLORS.gray} fontSize={"12px"}>
                                                            ⚡ quiz code {item.quiz_code} <CopyIcon code={item.quiz_code} />
                                                        </Center>
                                                    </Box>
                                                    {type !== "student" ?
                                                        <HStack cursor="pointer" onClick={() => {
                                                            dispatch(setTemporaryStorage(item));
                                                            router.push("/dashboard/teacher/quizzes")
                                                        }}>
                                                            <Text fontSize="sm" color="blue.500">View</Text>
                                                            <LuChevronRight size={16} color="var(--chakra-colors-blue-500)" />

                                                        </HStack>
                                                        : CodeExists(quizzes, item.quiz_code) ?
                                                            <HStack cursor="pointer" onClick={() => {
                                                                dispatch(setTemporaryStorage(item));
                                                                router.push(`/dashboard/quizzes/details?code=${item.quiz_code}`)
                                                            }}>
                                                                <Text fontSize="sm" color="blue.500">More</Text>
                                                                <LuChevronRight size={16} color="var(--chakra-colors-blue-500)" />
                                                            </HStack>
                                                            :
                                                            <QuizModel code={item.quiz_code} />
                                                    }
                                                </HStack>
                                            ))
                                                :
                                                <EmptyState title={"No quiz exist"} />
                                            }
                                            <Box opacity={"0"} h="40px" >
                                                sdjs
                                            </Box>
                                        </VStack>
                                    </Box>
                                </VStack>
                            </Card.Body>
                        </Card.Root>
                    </SimpleGrid>
                    <Box h="100px" />
                </Box>}
        </>
    )
}