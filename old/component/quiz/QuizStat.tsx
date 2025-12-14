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
    Flex
} from "@chakra-ui/react"
import {
    LuChevronRight,
    LuCalendar,
    LuChevronDown,
} from "react-icons/lu"
import { MdOutlineDirections } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import CopyIcon from "../asset/CopyIcon"
import { EmptyState } from "@/utils/EmptyState"
import { getQuizStatsResult } from "@/utils/constants"
import { daysUntil } from "@/utils/date"
import EditIcon from "../asset/EditIcon"
import { useRouter } from "next/router"
import { triggerQuizEdit } from "@/url/redux/slices/questionSlice"
import AddIcon from "../asset/AddIcon"

export default function QuizStat() {
    // Sample data for charts
    const { temporary, user } = useSelector((a: { auth: { temporary: any, user: any } }) => a.auth)
    const { quizAnswer } = useSelector((a: { question: any }) => a.question)
    const { questions } = useSelector((a: { question: any }) => a.question)
    const dispatch = useDispatch()
    const router = useRouter()


    const medicationData = [45, 65, 80, 90, 75, 55, 60]

    return (
        <Box p={6} bg="gray.50" pt="100px">
            <Flex gap="10px" mb="20px" justifyContent={"space-between"}>
                <Box>
                    <Box fontSize={"24px"} color={COLORS.blue}>
                        {temporary.title}
                    </Box>
                    <Box lineClamp={1} fontSize={"14px"}>
                        {temporary.description}
                    </Box>
                   <Center justifyContent={"start"} gap="10px">
                    <Button
                    onClick={()=>{
                        dispatch(triggerQuizEdit({...temporary, questions}))
                    router.push("/dashboard/teacher/editquiz")
                    }}
                    mt={4} p={4} bg={COLORS.blue}>
                        Edit Quiz <EditIcon />
                    </Button>
                    <Button
                    onClick={()=>{
                        dispatch(triggerQuizEdit({...temporary, questions}))
                    router.push("/dashboard/teacher/addmanuel")
                    }}
                    mt={4} p={4} bg={COLORS.deep_purple}>
                        Add Question <AddIcon color="#fff" />
                    </Button>
                    </Center>
                </Box>
                <Center fontSize={"12px"} gap="5px" color="gray">
                    {temporary.quiz_code} <CopyIcon code={temporary.quiz_code} />
                </Center>
            </Flex>

            <SimpleGrid columns={{ base: 1, lg: 2 }} gap="10px">
                {/* Top Row */}
                <Card.Root>
                    <Card.Header p="20px">
                        <HStack justify="space-between">
                            <Heading size="lg" fontWeight={"600"} color="gray.700">Student Attemps</Heading>
                        </HStack>
                    </Card.Header>
                    <Card.Body p="20px" pt="0px">
                        <VStack align="stretch">
                            {quizAnswer.length > 0.1 ?
                                quizAnswer.map((item: any, i: number) => (
                                    <Box key={i}>
                                        <HStack justify="space-between" mb={2}>
                                            <Text fontWeight="medium" fontSize="sm">{item.student.last_name}, {item.student.first_name}</Text>
                                            <Text ml="-5px" color="gray.500" fontSize="sm">{item.score}%</Text>
                                        </HStack>
                                        <Progress.Root defaultValue={item.score} colorPalette={item.color} size="sm">
                                            <Progress.Track />
                                        </Progress.Root>
                                        <Text fontSize="xs" color="gray.500">
                                            {item.student.email}
                                        </Text>
                                    </Box>
                                )) :
                                <EmptyState title="No Attempts" />
                            }
                        </VStack>
                    </Card.Body>
                </Card.Root>

                {/* Notes Section */}

                {/* Daily Statistics */}
                <Card.Root>
                    <Card.Header p="20px">
                        <Heading size="lg" fontWeight={"600"} color="gray.700">Quiz Overall Stats</Heading>
                    </Card.Header>
                    <Card.Body p="20px" pt="0px">
                        <SimpleGrid columns={2} spaceX={6}>
                            <VStack>
                                <ProgressCircle.Root value={getQuizStatsResult(quizAnswer).averageScore} size="xl" colorPalette="orange">
                                    <ProgressCircle.Circle>
                                        <ProgressCircle.Track />
                                        <ProgressCircle.Range />
                                    </ProgressCircle.Circle>
                                    <AbsoluteCenter>
                                        <HStack>
                                            <Text fontSize="md" fontWeight="bold">{getQuizStatsResult(quizAnswer).averageScore}</Text>
                                            <Text fontSize="md" ml="-7px" color="gray.500">%</Text>
                                        </HStack>
                                    </AbsoluteCenter>
                                </ProgressCircle.Root>
                            </VStack>

                            <VStack align="start" spaceX={3}>
                                <Box bg={COLORS.red} color="white" borderRadius="full" p={2}>
                                    <Text fontSize="2xl" fontWeight="bold">{questions.length}</Text>
                                </Box>
                            </VStack>
                        </SimpleGrid>

                        <SimpleGrid columns={4} spaceX={4} mt={6}>
                            <HStack>
                                <Text fontSize="lg" fontWeight="bold">{getQuizStatsResult(quizAnswer).passPercentage}</Text>
                                <Text fontSize="xs" color="gray.500">%</Text>
                            </HStack>
                            <HStack>
                                <Text fontSize="lg" fontWeight="bold">{getQuizStatsResult(quizAnswer).passPercentage}</Text>
                                <Text fontSize="xs" color="gray.500">%</Text>
                            </HStack>
                            <HStack>
                                <Text fontSize="lg" fontWeight="bold">{getQuizStatsResult(quizAnswer).totalStudents}</Text>
                            </HStack>
                        </SimpleGrid>
                    </Card.Body>
                </Card.Root>

                {/* Medication Intake Statistics */}
                <Card.Root>
                    <Card.Header p="20px">
                        <HStack justify="space-between">
                            <Heading size="lg" fontWeight={"600"} color="gray.700">Days of Question answered</Heading>
                        </HStack>
                    </Card.Header>
                    <Card.Body p="20px" pt="0px">
                        <VStack align="stretch" spaceX={4}>
                            {/* Weight Display */}
                            <Box bg="purple.900" color="white" p={4} borderRadius="lg" position="relative">
                                <Text fontSize="2xl" fontWeight="bold">{daysUntil(temporary.end_at, temporary.start_at)}</Text>
                                <Text fontSize="sm" opacity={0.8}>⭐</Text>
                            </Box>

                            {/* Bar Chart */}
                            {/* <Box>
                                <HStack align="end" spaceX={2} h="100px">
                                    {medicationData.map((value, i) => (
                                        <Box key={i} flex={1}>
                                            <VStack spaceX={1}>
                                                <Box
                                                    bg={i === 3 ? "orange.400" : "orange.200"}
                                                    h={`${value}%`}
                                                    w="100%"
                                                    borderRadius="sm"
                                                    minH="10px"
                                                />
                                                <Text fontSize="xs" color="gray.500">
                                                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                                                </Text>
                                            </VStack>
                                        </Box>
                                    ))}
                                </HStack>
                            </Box> */}

                            {/* Legend */}
                            <HStack spaceX={4} fontSize="xs" color="gray.500">
                                <HStack spaceX={1}>
                                    <Box w={2} h={2} bg="orange.400" borderRadius="sm" />
                                    <Text>Yes</Text>
                                </HStack>
                                <HStack spaceX={1}>
                                    <Box w={2} h={2} bg="gray.300" borderRadius="sm" />
                                    <Text>No</Text>
                                </HStack>
                            </HStack>
                        </VStack>
                    </Card.Body>
                </Card.Root>
            </SimpleGrid>
        </Box>
    )
}