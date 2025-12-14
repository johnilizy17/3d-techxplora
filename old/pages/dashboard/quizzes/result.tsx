import CancelIcon from '@/component/asset/CancelIcon';
import RightArrowIcon from '@/component/asset/RightArrowIcon';
import { QuizAnswer } from '@/component/quiz/QuizAnswer';
import QuizCount from '@/component/quiz/QuizCount';
import QuizResultID from '@/component/quiz/QuizResultId';
import CloseLayout from '@/layout/CloseLayout';
import DashboardLayout from '@/layout/DashboardLayout';
import QuestionForm from '@/template/Quizzes/QuestionForm';
import { setTemporaryStorage } from '@/url/redux/slices/authSlice';
import { getQuestion } from '@/url/redux/slices/questionSlice';
import { verifyQuizCode } from '@/url/route/verification';
import { CodeExists } from '@/utils/constants';
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
    const { resultStatics } = useSelector((a: { question: any }) => a.question)

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

                {CodeExists(resultStatics, router.query.code ) && router.query.code && temporary.xp ?
                    <Box
                        bg={'white'}
                        h="100vh"
                        px={4}
                        w="full"
                        mt="80px"
                    >
                      {CodeExists(resultStatics, router.query.code )  &&  <QuizResultID result2={CodeExists(resultStatics, router.query.code )} />}
                    </Box>
                    :
                    <Spinner color={COLORS.blue} size="xl" />
                }
            </CloseLayout>
        </DashboardLayout>
    );
}