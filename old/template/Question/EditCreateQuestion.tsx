import React, { useEffect, useState } from 'react';
import {
    Input,
    Textarea,
    Button,
    Box,
    VStack,
    Heading,
    Text,
    Center,
    Switch,
} from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../tools/CustomInput';
import { COLORS } from '@/utils/theme';
import RightArrowIcon from '@/component/asset/RightArrowIcon';
import CancelIcon from '@/component/asset/CancelIcon';
import { useDispatch, useSelector } from 'react-redux';
import { createQuiz } from '@/url/route/quiz';
import useCustomToast from '@/hooks/useCustomToast';
import { useRouter } from 'next/router';
import { createQuestion, verifyQuizCode } from '@/url/route/verification';
import { setTemporaryStorage } from '@/url/redux/slices/authSlice';

const QuizSchema = Yup.object().shape({
    question: Yup.string().required()
});

export default function EditCreateQuestion({ number, setNumber }: { number: number, setNumber: any }) {
    const [ai, setAI] = useState(false);
    const dispatch = useDispatch();
    const { query } = useRouter();
    const showToast = useCustomToast();
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [answerData, setAnswerData] = useState([1]);
    const { editQuiz } = useSelector((a: { question: any }) => a.question)
    const [correct, setCorrect] = useState<{ [key: number]: boolean }>({
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
        6: false,
        7: false,
        8: false,
        9: false,
    });
    const { temporary } = useSelector((a: { auth: { temporary: any, user: any } }) => a.auth);

    const HandleQuiz = async (values: any, { setSubmitting, resetForm }: any) => {
        try {
            const pageNumber = editQuiz + editQuiz.questions && editQuiz.questions.length + page
            const answers = answerData.map((a: number) => ({
                question_id: pageNumber,
                option: values[a],
                is_correct: correct[a] || false,
            }));

            setSubmitting(true);

            const quiz = {
                quiz_code: temporary.quiz_code,
                quiz_id: temporary.id,
                question: values.question,
                image_url: null,
                duration: JSON.stringify(JSON.parse(temporary.duration) / number),
                status: 1,
                options: answers
            };

            await createQuestion(quiz);

            setPage(page + 1);
            setCorrect({
                1: false, 2: false, 3: false, 4: false, 5: false,
                6: false, 7: false, 8: false, 9: false
            });

            showToast('Quiz successfully created', 'success');

            resetForm({
                values: {
                    question: '',
                    ...[1].reduce((acc: any, a: number) => {
                        acc[a] = '';
                        return acc;
                    }, {})
                }
            });

            if (page === number) {
                router.push("/dashboard/quizzes");
            } else {
                setAnswerData([1]);
            }

            setSubmitting(false);
        } catch (error: any) {
            showToast(error.response?.data?.message || 'Failed to create Quiz', 'error');
            setSubmitting(false);
        }
    };

    async function dropAllTeacher() {
        if (query && query.code) {
            const quiz = await verifyQuizCode(query.code);
            dispatch(setTemporaryStorage(quiz.data));
        }
    }

    useEffect(() => {
        dropAllTeacher();
    }, [query && query.code]);

    return (
        <Box pt={"80px"} h="100vh" overflow="hidden" px={4} w="full">
            <Box h="calc(100vh - 100px)" overflow="scroll">
                <Heading size="lg" fontFamily={"Poppins"} fontWeight={"700"} fontSize={"20px"} mb={2}>
                    Question {editQuiz + editQuiz.questions && editQuiz.questions.length + page} of {editQuiz + editQuiz.questions && editQuiz.questions.length +number}
                </Heading>
                <Text mb={6} fontSize={"14px"} fontWeight={"400"} fontFamily={"Plus Jakarta Sans"}>
                    This is the tagline for school code
                </Text>
                <Button
                    px="20px"
                    h="38px"
                    bg={"#DEE2FF"}
                    fontFamily={"Poppins"}
                    fontWeight={"600"}
                    fontSize={"17px"}
                    color={ai ? COLORS.white : COLORS.gray_variant}
                    borderRadius={"20px"}
                >
                    Manuel Upload
                </Button>
                <Formik
                    initialValues={{}}
                    enableReinitialize={true}
                    validationSchema={QuizSchema}
                    onSubmit={HandleQuiz}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Box w="full" mt="8px">
                                <CustomInput
                                    label={`Question ${editQuiz + editQuiz.questions && editQuiz.questions.length + page}`}
                                    name='question'
                                    placeholder='Enter your questions'
                                    fieldProps={{ type: 'textarea' }}
                                    type='textarea'
                                    value='' />
                            </Box>

                            {answerData.map((a: number, b: number) => (
                                <Box w="full" mt="8px" key={b}>
                                    <Center mb="10px" alignItems={"center"} gap={4}>
                                        <CustomInput
                                            label={`Option ${a}`}
                                            name={a}
                                            placeholder='Enter answer here'
                                            fieldProps={{ type: 'text' }}
                                            typeInput=''
                                        />
                                        {b > 0 && (
                                            <Box mt="30px" onClick={() => setAnswerData(answerData.slice(0, -1))}>
                                                <CancelIcon />
                                            </Box>
                                        )}
                                    </Center>
                                    <Switch.Root
                                        checked={correct[a]}
                                        onCheckedChange={({ checked }) =>
                                            setCorrect((prev) => ({ ...prev, [a]: checked }))
                                        }
                                        colorPalette="blue"
                                    >
                                        <Switch.HiddenInput />
                                        <Switch.Control />
                                        <Switch.Label>Correct Answer</Switch.Label>
                                    </Switch.Root>
                                </Box>
                            ))}

                            <Center justifyContent={"end"}>
                                <Button
                                    onClick={() => setAnswerData([...answerData, answerData.length + 1])}
                                    p="20px"
                                    mt="20px"
                                    bg={COLORS.blue}
                                >
                                    + Add
                                </Button>
                            </Center>

                            <Center mt="47px" mb="76px" justifyContent={"space-between"} gap={4}>
                                <Button
                                    colorScheme="light"
                                    bg={COLORS.blue}
                                    w="full"
                                    maxW={"153px"}
                                    disabled={page === number}
                                    color={COLORS.white}
                                    loading={isSubmitting}
                                    fontWeight={"500"}
                                    fontFamily={"Poppins"}
                                    fontSize={"16px"}
                                    h="48px"
                                    type="submit"
                                    borderRadius={"1234px"}
                                >
                                    <Box mr="5px">Next</Box>
                                    <RightArrowIcon />
                                </Button>
                                <Button
                                    colorScheme="light"
                                    bg={"transparent"}
                                    w="full"
                                    maxW={"153px"}
                                    color={page === number ? COLORS.black : COLORS.gray}
                                    borderColor={page === number ? COLORS.black : COLORS.gray}
                                    fontWeight={"500"}
                                    fontFamily={"Poppins"}
                                    fontSize={"16px"}
                                    h="48px"
                                    borderWidth={"1px"}
                                    loading={isSubmitting}
                                    disabled={page === number ? false : true}
                                    type="submit"
                                    borderRadius={"1234px"}
                                >
                                    <Box mr="5px">Finish</Box>
                                    <RightArrowIcon color={COLORS.gray} />
                                </Button>
                            </Center>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
}
