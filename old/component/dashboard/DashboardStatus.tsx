// components/DashboardStatus.tsx
import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import CheckIcon from "../asset/CheckIcon";
import { COLORS } from "@/utils/theme";
import { useEffect, useState } from "react";
import { daysUntil, diffTime, startCountdown, timeAgo } from "@/utils/date";
import { hasDatePassed } from "@/utils/constants";

const DashboardStatus = ({ quiz }: { quiz: any }) => {

    const [time, setTime] = useState("00:00:00");

    useEffect(() => {
        startCountdown(quiz.end_at, setTime)
    }, [])

    return (
        <Flex
            align="center"
            justify="space-between"
            w="full"
            fontFamily={"Poppins"}
        >
            <Flex align="center" gap={2}>
                <CheckIcon />
                <Box>
                    <Text fontSize={["10px", "12px"]} color={COLORS.black}>
                        {timeAgo(quiz.start_at)}
                    </Text>
                    <Text as="span" fontSize={["8px", "10px"]} color={COLORS.brown}>
                        {time}
                    </Text>
                </Box>
            </Flex>
            {!hasDatePassed(quiz.start_at) ?
                <Text fontSize={["10px", "12px"]} color={COLORS.deep_purple}>
                    Pending
                </Text>
                : hasDatePassed(quiz.end_at) ?
                    <Text fontSize={["10px", "12px"]} color={COLORS.red}>
                        Closed
                    </Text>
                    :
                    <Text fontSize={["10px", "12px"]} color={COLORS.green}>
                        Open
                    </Text>}
        </Flex>
    );
};

export default DashboardStatus;