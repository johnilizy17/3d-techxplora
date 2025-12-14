import CancelIcon from '@/component/asset/CancelIcon';
import RightArrowIcon from '@/component/asset/RightArrowIcon';
import { QuizAnswer } from '@/component/quiz/QuizAnswer';
import QuizCount from '@/component/quiz/QuizCount';
import { COLORS } from '@/utils/theme';
import { Box, Button, Center, Heading, IconButton, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function QuestionForm({ data, b, selected, handleChange, active }: { data: any, b: number, selected: number, handleChange: any, active: number }) {

    const [value, setValue] = useState<string | null>(null)
    const { temporary, user } = useSelector((a: { auth: { temporary: any, user: any } }) => a.auth)
    const { questions } = useSelector((a: { question: any }) => a.question)

    useEffect(() => {
        console.log(data)
    }, [])

    return (
        <Box w="full">
            <Center w="full" justifyContent={"space-between"}>
                <IconButton
                    aria-label="Close"
                    variant="ghost"
                >
                    <CancelIcon />
                </IconButton>
                {temporary.mode === "Gaming Mode" ?
                    <QuizCount handleChange={() => {
                        handleChange(selected, "start")
                    }} time={JSON.parse(temporary.duration)} />
                    : active == selected &&
                    < QuizCount handleChange={() => {
                        handleChange(selected, "start")
                    }} time={(JSON.parse(temporary.duration) / questions.length)} />
                }
                <Text fontSize="sm" color="gray.500" mb={2}>
                    {selected + 1} / {b}
                </Text>
            </Center>
            <Heading textAlign={"center"} fontSize="23px" mt="26px" fontWeight={"600"} mb={4}>
                {data.question}
            </Heading>
            <QuizAnswer options={data.options} value={value} setValue={setValue} />
            <Center mt="47px" mb="20px">
                <Button
                    colorScheme="light"
                    bg={COLORS.blue}
                    w="full"
                    maxW={"350px"}
                    color={COLORS.white}
                    onClick={() => {
                        handleChange(selected, "start")
                    }}
                    fontWeight={"500"}
                    fontFamily={"Poppins"}
                    fontSize={"16px"}
                    h="48px"
                    type="submit"
                    borderRadius={"1234px"}
                >
                    <Box mr="5px">
                        Next Question
                    </Box>
                    <RightArrowIcon />
                </Button>
            </Center>
        </Box>
    )
}