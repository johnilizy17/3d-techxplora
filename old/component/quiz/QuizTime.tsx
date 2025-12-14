import { Box, Flex, Text, Icon } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CheckIcon from "../asset/CheckIcon";
import { COLORS } from "@/utils/theme";
import { daysUntil, diffTime, formatDate, startCountdown, timeAgo } from "@/utils/date";
import { hasDatePassed } from "@/utils/constants";

export default function QuizTime({ temporary }: { temporary: any }) {

    const [time, setTime] = useState("00:00:00");

    useEffect(() => {
        startCountdown(temporary.end_at, setTime)
    }, [])

    return (
        <Flex
            align="center"
            gap={2}
            p={2}
            bgGradient="linear(to-r, #cfdde2, #f6c4b7)"
            borderRadius="md"
            color="white"
            w="280px"
            mt="140px"
            pos="absolute"
            fontFamily={"Poppins"}
            right={12}
        >
            <Box>
                <CheckIcon />
            </Box>
            <Flex direction="column" borderRightWidth={"1px"} pr="10px" borderRightColor={COLORS.white} align="start" flex="1">

                <Flex align="center" gap={1}>
                    <Text fontWeight="600" fontSize={"16px"} color="white">
                        {timeAgo(temporary.created_at)}
                    </Text>
                </Flex>
                <Flex gap={2} fontSize="12px">
                    <Text color={COLORS.deep_green}>{time}</Text>
                    <Text color={COLORS.brown}>{formatDate(temporary.start_at)}</Text>
                </Flex>
            </Flex>
            {!hasDatePassed(temporary.start_at) ?
            <Text fontSize={["10px", "12px"]} color={COLORS.deep_purple}>
                Pending
            </Text>
            : hasDatePassed(temporary.end_at) ?
            <Text fontSize={["10px", "12px"]} color={COLORS.red}>
                Closed
            </Text>
            :
            <Text fontSize={["10px", "12px"]} color={COLORS.green}>
                Open
            </Text>}
        </Flex>
    );
}
