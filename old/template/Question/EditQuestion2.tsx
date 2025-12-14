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
import { triggerQuizEdit } from '@/url/redux/slices/questionSlice';

const QuizSchema = Yup.object().shape({
    question: Yup.string().required()
});

export default function EditQuestion2({ number, setNumber }: { number: number, setNumber: any }) {
    const [ai, setAI] = useState(false);
    const dispatch = useDispatch();
    const { query } = useRouter();
    const showToast = useCustomToast();
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [answerData, setAnswerData] = useState([1]);
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
    const { syllabus, editQuiz } = useSelector((a: { question: any }) => a.question)

    const HandleQuiz = async (values: any, { setSubmitting, resetForm }: any) => {
        try {
            
            const answers = answerData.map((a: number) => ({
                question_id: editQuiz.questions[number].id,
                option: values[a],
                is_correct: correct[a] || false,
            }));
            console.log("answers", answers)
            const quiz = [...editQuiz.questions]
            quiz[number] = { question: values.question, question_id: editQuiz.questions[number].id, id: editQuiz.questions[number].id, options: answers }
            setSubmitting(true)
            dispatch(triggerQuizEdit({ ...editQuiz, questions: quiz }) as any);
            showToast('Quiz successfully created', 'success');
            setNumber(false)
            resetForm({
                values: {
                    question: '',
                    ...[1].reduce((acc: any, a: number) => {
                        acc[a] = '';
                        return acc;
                    }, {})
                }
            });

            setSubmitting(false);
        } catch (error: any) {
            showToast(error.response?.data?.message || 'Failed to create Quiz', 'error');
            setSubmitting(false);
        }
    };

    function getSequence(n: number) {
        return Array.from({ length: n }, (_, i) => i + 1);
    }

    function transformOptions(arr: any) {
        let result: any = {};
        arr.forEach((item: any, index: number) => {
            result[`${index + 1}`] = item.option;
        });
        return result;
    }

    function buildFalseObject(n: any) {
        let result: any = {};
        n.forEach((item: any, index: number) => {
            result[`${index + 1}`] = item.is_correct;
        });
        return result;
    }

    useEffect(() => {

        const totalOptions = getSequence(editQuiz.questions[number].options.length)
        setAnswerData(totalOptions);
        const answers = buildFalseObject(editQuiz.questions[number].options)
        setCorrect(answers)
    }, [editQuiz.questions[number].options.length]);

    return (
        <Box overflow="hidden" px={4} w="full">
            <Box h="calc(100vh - 100px)" overflow="scroll">
                <Text mb={6} fontSize={"14px"} fontWeight={"400"} fontFamily={"Plus Jakarta Sans"}>
                    Edit your question with ease.
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
                    Edit Question
                </Button>
                <Formik
                    initialValues={{ question: editQuiz.questions[number].question, ...transformOptions(editQuiz.questions[number].options) }}
                    enableReinitialize={true}
                    validationSchema={QuizSchema}
                    onSubmit={HandleQuiz}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <Box w="full" mt="8px">
                                <CustomInput
                                    label={`Question ${number + 1}`}
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

                            <Center mt="47px" mb="76px" justifyContent={"end"} gap={4}>
                                <Button
                                    colorScheme="light"
                                    bg={"transparent"}
                                    w="full"
                                    maxW={"153px"}
                                    color={COLORS.black}
                                    borderColor={COLORS.black}
                                    fontWeight={"500"}
                                    fontFamily={"Poppins"}
                                    fontSize={"16px"}
                                    h="48px"
                                    borderWidth={"1px"}
                                    loading={isSubmitting}
                                    type="submit"
                                    borderRadius={"1234px"}
                                >
                                    <Box mr="5px">Submit</Box>
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
