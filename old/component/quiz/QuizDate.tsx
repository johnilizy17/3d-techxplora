import {
    Box,
    Flex,
    HStack,
    Icon,
    Text,
    Avatar,
    AvatarGroup,
    Badge,
    VStack,
    AvatarImage,
    AvatarContext,
    Center,
} from "@chakra-ui/react";
import React from "react";
import CalendarIcon from "../asset/CalendarIcon";
import CloudIcon from "../asset/CloudIcon";
import { COLORS } from "@/utils/theme";
import { removeYearFromISO } from "@/utils/date";
import { useSelector } from "react-redux";

export default function QuizMetaInfo({ people }: any) {

    const { temporary, user } = useSelector((a: { auth: { temporary: any, user: any } }) => a.auth)

    return (
        <VStack gap={4} align="start">
            {/* Date Range */}
            <Center gap={2}>
                <CalendarIcon />
                <Text color={COLORS.light_blue} fontSize="13px" fontWeight="medium">
                    {removeYearFromISO(temporary.start_at)} - {removeYearFromISO(temporary.end_at)}
                </Text>
            </Center>

            {/* Questions */}
            <Center gap={2}>
                <CloudIcon />
                <Text color={COLORS.light_blue} fontWeight="medium">{temporary.QuizQuestions} Questions</Text>
            </Center>
            <Center gap={2}>
                <CloudIcon />
                <Box
                    bg="yellow.300"
                    px={3}
                    py={1}
                    borderRadius="full"
                >
                    <Text fontSize="sm" fontWeight="medium">
                        To be completed in {temporary.duration} minutes
                    </Text>
                </Box>
            </Center>

            {/* Duration Pill */}

            {/* Avatar group + status */}
            <HStack spaceX={2}>
                <AvatarGroup gap="0" spaceX="-3" size="lg" stacking="last-on-top">
                    {people.length < 0.1 ?
                        <Text>
                            No Attempts
                        </Text>
                        :
                        people.map((a: any, b: number) => (
                            <Avatar.Root display={b > 3 ? "none" : "flexs"} key={b}>
                                <Avatar.Fallback name={a.student.last_name} />
                                <Avatar.Image src={a.student.photo} />
                            </Avatar.Root>
                        ))}
                    {people.length > 3 &&
                        < Avatar.Root variant="solid">
                            <Avatar.Fallback>{people.length - 3}</Avatar.Fallback>
                        </Avatar.Root>
                    }
                </AvatarGroup>
                {people.length > 0.1 && <Text color={COLORS.light_blue} fontWeight="medium">
                    Already attempted this quiz
                </Text>}
            </HStack>
        </VStack >
    );
}
