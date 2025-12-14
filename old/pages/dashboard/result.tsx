import CloseLayout from "@/layout/CloseLayout"
import DashboardLayout from "@/layout/DashboardLayout"
import { EmptyState } from "@/utils/EmptyState"
import { COLORS } from "@/utils/theme"
import { Card, Flex, Text, Progress, Icon, Box } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { FiHelpCircle, FiBook } from "react-icons/fi"
import { useSelector } from "react-redux"

type StatCardProps = {
    value: number
    total: number
    label: string
    color: "blue" | "orange"
    icon: React.ElementType
}

const StatCard = ({ value, total, label, color, icon }: StatCardProps) => {
    const router = useRouter()
    const percentage = (value / total) * 100

    return (
        <Card.Root
            w="160px"
            p="4"
            h="150px"
            rounded="xl"
            shadow="sm"
            bg={color === "blue" ? "green.50" : "orange.50"}
            onClick={() => router.push(`/dashboard/quizzes/details?code=${label}`)}
        >
            <Flex direction="column" align="flex-start" gap="2">
                {/* Icon */}
                <Icon as={icon} boxSize="6" color={`${color}.500`} />

                {/* Value */}
                <Text fontSize="2xl" fontWeight="bold">
                    {value}/{total}
                </Text>

                {/* Label */}
                <Text fontSize="sm" color="gray.600" textTransform="uppercase">
                    {label}
                </Text>

                {/* Progress bar */}
                <Progress.Root w="100%" value={percentage} striped colorPalette={percentage < 20 ? "red" : percentage < 40 ? "blackAlpha" : percentage < 60 ? "blue" : "green"}>
                    <Progress.Track>
                        <Progress.Range />
                    </Progress.Track>
                </Progress.Root>
            </Flex>
        </Card.Root>
    )
}

export default function ResultPage() {

    const { resultStatics } = useSelector((a: { question: any }) => a.question)

    function calculateScore(answers: any) {
        if (!answers || answers.length === 0) return 0;

        const total = answers.length;
        const correct = answers.filter((a: any) => a.is_correct == 1).length;

        return Math.round(correct) // returns string like "50.00"
    }

    return (
        <DashboardLayout title="Result Page">
            <CloseLayout>
                <Box w="full" h="100vh">
                    <Box mt="100px" fontWeight={"800"} fontSize={"20px"}>
                        Result
                    </Box>
                    <Flex w="full" flexWrap={"wrap"} h="calc(100vh - 200px)" mt="20px" overflow={"scroll"} gap="4">
                        {resultStatics.length > 0.1? resultStatics.map((a: any, b: number) => (<StatCard
                            value={calculateScore(a.answers)}
                            total={a.answers.length}
                            label={a.quiz_code}
                            color="blue"
                            icon={FiBook}
                        />
                        )) 
                    :
                    <EmptyState title={"You have not take any quiz"} />
                    }
                    </Flex>
                </Box>
            </CloseLayout>
        </DashboardLayout>
    )
}
