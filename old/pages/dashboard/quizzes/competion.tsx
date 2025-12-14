import CancelIcon from '@/component/asset/CancelIcon';
import RightArrowIcon from '@/component/asset/RightArrowIcon';
import { QuizAnswer } from '@/component/quiz/QuizAnswer';
import QuizCount from '@/component/quiz/QuizCount';
import QuizResult from '@/component/quiz/QuizResult';
import CloseLayout from '@/layout/CloseLayout';
import DashboardLayout from '@/layout/DashboardLayout';
import QuestionForm from '@/template/Quizzes/QuestionForm';
import { setTemporaryStorage } from '@/url/redux/slices/authSlice';
import { getQuestion } from '@/url/redux/slices/questionSlice';
import { verifyQuizCode } from '@/url/route/verification';
import { COLORS } from '@/utils/theme';
import {
    Box,
    Heading,
    Text,
    VStack,
    Button,
    RadioGroup,
    Stack,
    IconButton,
    Center,
    Spinner,
    Flex
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type Props = {
    temporary: { QuizQuestions: any[] };
    selected: number;
    setSelected: (val: number) => void;
};

export default function QuizCompetion() {


    const router = useRouter();
    const { temporary, user } = useSelector((a: { auth: { temporary: any, user: any } }) => a.auth)
    const { questions } = useSelector((a: { question: any }) => a.question)
    const dispatch = useDispatch()
    const [selected, setSelected] = useState(0)
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

    const handleClick = (index: number) => {
        setSelected(index + 1);
        buttonRefs.current[index]?.scrollIntoView({
            behavior: "smooth",
            inline: "center",
            block: "nearest",
        });
    };

    const handleChange = (index: number, answer: any) => {
        handleClick(index)
    }

    async function QuizDetails() {
        if (router.query && router.query.code) {
            const { data } = await verifyQuizCode(router.query.code)
            dispatch(setTemporaryStorage(data) as any)
            dispatch(getQuestion(data.id) as any)
        }
    }

    useEffect(() => {
        QuizDetails()
    }, [router.query && router.query.code, temporary.xp])

    return (
        <DashboardLayout chat={true} title="Competition">
            <CloseLayout>

                {temporary.xp ?
                    <Box
                        bg={'white'}
                        h="100vh"
                        px={4}
                        w="full"
                        mt="80px"
                    >

                        {selected !== questions.length && <Flex mb="20px" overflow="scroll" gap={4}>
                            {temporary.mode === "Learning Mode" && questions &&
                                questions.map((_: any, b: number) => (
                                    <Button
                                        key={b}
                                        ref={(el: HTMLButtonElement | null) => {
                                            buttonRefs.current[b] = el; // store reference
                                        }}
                                        onClick={() => handleClick(b - 1)}
                                        bg={selected === b ? "#4559A8" : "#f5f5f5"}
                                        color={selected === b ? "#fff" : "#000"}
                                        h="40px"
                                        w="40px"
                                        flexShrink={0}
                                    >
                                        {b + 1}
                                    </Button>
                                ))}
                        </Flex>}
                        {/* {console.log(selected, questions.length)} */}
                        {selected === questions.length ?
                            <QuizResult />
                            :
                            questions.map((a: any, b: number) => (
                                <Box display={b === selected? "block":"none"}>
                                    <QuestionForm key={b} data={a} handleChange={handleChange} b={temporary.QuizQuestions} selected={b} active={selected}/>
                                </Box>
                            )

                            )
                        }
                    </Box>
                    :
                    <Spinner color={COLORS.blue} size="xl" />
                }
            </CloseLayout>
        </DashboardLayout>
    );
}