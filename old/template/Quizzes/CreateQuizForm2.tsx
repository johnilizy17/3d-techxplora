import React from 'react';
import {
    Input,
    Textarea,
    Button,
    Box,
    VStack,
    Heading,
    Text,
    Center,
} from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../tools/CustomInput';
import { COLORS } from '@/utils/theme';
import RightArrowIcon from '@/component/asset/RightArrowIcon';
import LeftArrowIcon from '@/component/asset/LeftArrowIcon';
import RatingIcon from '@/component/asset/RatingIcon';
import QuestionIcon from '@/component/asset/QuestionIcon';
import { useDispatch, useSelector } from 'react-redux';
import { createQuiz } from '@/url/route/quiz';
import useCustomToast from '@/hooks/useCustomToast';
import { cashFormat2 } from '@/utils/cashformat';
import { setKYC } from '@/url/redux/slices/authSlice';

const QuizSchema = Yup.object().shape({
    start_at: Yup.string().required('Start date is required'),
    end_at: Yup.string().required('End date is required')
});

export default function CreateQuizForm2({ page, setPage, data, setData }: { page: number, setPage: (title: number) => void, data: any, setData: (a: any) => any }) {

    const { user } = useSelector((a: { auth: { user: any } }) => a.auth)
    const showToast = useCustomToast()
    const dispatch = useDispatch()
    const HandleQuiz = async (values: any, { setSubmitting }: any) => {
        try {
            setSubmitting(true)
            const model_id = data.model_id[0]
            const classes = data.class ? JSON.stringify(data.class[0]) : null
            const group_code = data.group_code ? data.group_code[0] : null
            delete values.model_id
            console.log(values)
            const inputData = {
                ...values, "is_ai": false,
                "status": true,
                "mode_id": model_id,
                "teacher_id": user.id,
                "class": classes,
                "group_code": group_code,
                "admin_code": user.admin_code,
                xp: values.xp ? values.xp : 0,
                p_xp: values.p_xp ? values.p_xp : 0
            }
            const result = await createQuiz(inputData)
            setData({ ...data, quiz_code: result.data.quiz_code })
            showToast("Quiz successfully created", "success");
            setPage(4)
            setSubmitting(false);
        } catch (error: any) {
            showToast(error.response.data.message || 'Failed to create Quiz', 'error');
            setSubmitting(false);
        }

    }

    return (
        <Box pt={"80px"} h="100vh" overflow="hidden" px={4} w="full">
            <Center cursor={"pointer"} onClick={() => setPage(1)} mb="16px" justifyContent={"space-between"}>
                <LeftArrowIcon color={COLORS.black} />
                <Box fontWeight={"600"} fontSize={"14px"} color={COLORS.gray}>2/2</Box>
            </Center>
            <Box h="calc(100vh - 100px)" overflow="scroll">
                <Center justifyContent={"start"} mb={2}>
                    <Heading size="lg" fontFamily={"Poppins"} mr="8px" fontWeight={"700"} fontSize={"20px"}>Quiz Details</Heading>
                    <QuestionIcon />
                </Center>
                <Text mb={6} fontSize={"14px"} fontWeight={"400"} fontFamily={"Plus Jakarta Sans"}>This is the tagline for school code</Text>

                <Formik
                    initialValues={data}
                    validationSchema={QuizSchema}
                    onSubmit={HandleQuiz}
                >
                    {({ errors, touched, isSubmitting, values }) => (
                        <Form>
                            <Box w="full" mt="8px">
                                <CustomInput
                                    label='Start Date'
                                    name='start_at'
                                    placeholder='Select start date'
                                    fieldProps={{ type: 'datetime-local' }}
                                    typeInput=''
                                    value='' />
                            </Box>
                            <Box w="full" mt="8px">
                                <CustomInput
                                    label='End Date'
                                    name='end_at'
                                    placeholder='Select end date'
                                    fieldProps={{ type: 'datetime-local' }}
                                    typeInput=''
                                    value='' />
                            </Box>

                            <Box w="full" mt="8px">
                                <CustomInput
                                    label='Total Experience Point'
                                    name='xp'
                                    placeholder='Enter Total Experience Point'
                                    fieldProps={{ type: 'number' }}
                                    typeInput=''
                                    value='' />
                            </Box>
                            <Box fontSize="11px" fontWeight={"700"} color={user.xp < values.xp ? COLORS.red : COLORS.blue}>xp balance: {values.xp ? cashFormat2(user.xp - values.xp) : cashFormat2(user.xp)} {user.xp < values.xp && "insiffient balance"} </Box>
                            <Box w="full" mt="8px">
                                <CustomInput
                                    label='Experience Point Gain Per Question'
                                    name='p_xp'
                                    placeholder='Enter Experience Point Gain Per Question'
                                    fieldProps={{ type: 'number' }}
                                    typeInput=''
                                    value='' />

                            </Box>
                            <Box fontSize="11px" fontWeight={"700"} color={COLORS.red}>{values.xp < values.p_xp && "insiffient balance"} </Box>

                            <Box w="full" mt="8px">
                                <CustomInput
                                    label='Minimum Age'
                                    name='min_age'
                                    placeholder='Enter Minimum Age'
                                    fieldProps={{ type: 'number' }}
                                    typeInput=''
                                    value='' />
                            </Box>
                            <Box w="full" mt="8px">
                                <CustomInput
                                    label='Maximum Age'
                                    name='max_age'
                                    placeholder='Select Maximum Age'
                                    fieldProps={{ type: 'number' }}
                                    typeInput=''
                                    value='' />
                            </Box>
                            <Center mt="47px" mb="76px">
                                {!user.state ?
                                    <Button
                                        colorScheme="light"
                                        bg={COLORS.blue}
                                        w="full"
                                        maxW={"350px"}
                                        color={COLORS.white}
                                        fontWeight={"500"}
                                        loading={isSubmitting}
                                        disabled={isSubmitting}
                                        fontFamily={"Poppins"}
                                        fontSize={"16px"}
                                        h="48px"
                                        onClick={() => dispatch(setKYC(true))}
                                        borderRadius={"1234px"}
                                    >
                                        <Box mr="5px">
                                            Verify
                                        </Box>
                                        <RightArrowIcon />
                                    </Button> : <Button
                                        colorScheme="light"
                                        bg={COLORS.blue}
                                        w="full"
                                        maxW={"350px"}
                                        color={COLORS.white}
                                        fontWeight={"500"}
                                        loading={isSubmitting}
                                        disabled={isSubmitting}
                                        fontFamily={"Poppins"}
                                        fontSize={"16px"}
                                        h="48px"
                                        type="submit"
                                        borderRadius={"1234px"}
                                    >
                                        <Box mr="5px">
                                            Next
                                        </Box>
                                        <RightArrowIcon />
                                    </Button>}
                            </Center>
                        </Form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
}
