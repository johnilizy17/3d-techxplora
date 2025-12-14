import React, { useEffect, useState } from "react";
import {
    Box,
    Input,
    InputGroup,
    Icon,
    Link,
    VStack,
    Text,
    Button,
    Center,
    SwitchRoot,
    SwitchHiddenInput,
    SwitchControl,
    SwitchLabel,
    Image,
} from "@chakra-ui/react";
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from "../tools/CustomInput";
import EmailIcon from "@/component/asset/EmailIcon";
import { COLORS } from "@/utils/theme";
import RightArrowIcon from "@/component/asset/RightArrowIcon";
import UserIcon from "@/component/asset/UserIcon";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import useCustomToast from "@/hooks/useCustomToast";
import { useDispatch } from "react-redux";
import { setTemporaryStorage, VerifyAdminCode } from "@/url/redux/slices/authSlice";
import { verifyQuizCode } from "@/url/route/verification";

const QuizJoin = () => {

    const router = useRouter()
    const toast = useCustomToast();
    const dispatch = useDispatch();
    const validationSchema = Yup.object({
        code: Yup.string()
            .required('Group Code is required')
    });

    const verifyCodeDetails = async (values: any, { setSubmitting }: any) => {
        try {
            setSubmitting(true);
            const { data } = await verifyQuizCode(values.code)
            dispatch(setTemporaryStorage(data) as any)
            router.push(`/dashboard/quizzes/verify`)
            toast("code successfully verfied", "success")
            setSubmitting(false);
        } catch (error: any) {
            toast(error.response.data.message || error?.message || 'Quiz not found', 'error');
            setSubmitting(false);
        }
    };

    const MotionBox = motion(Box);

    const [screenHeight, setScreenHeight] = useState<number>(0);

    useEffect(() => {
        // Function to update the screen height
        const updateHeight = () => {
            setScreenHeight(window.innerHeight);
        };

        // Set initial height
        updateHeight();

        // Update on resize
        window.addEventListener("resize", updateHeight);

        // Cleanup
        return () => window.removeEventListener("resize", updateHeight);
    }, []);

    return (
        <Formik
            initialValues={{ group: "" }}
            onSubmit={verifyCodeDetails}
            enableReinitialize={true}
            validationSchema={validationSchema}
        >
            {({ isSubmitting, errors, touched, handleChange, values }) => (
                <Form>
                    <MotionBox
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <Center flexDir={"column"}>
                            <Box w="full"
                                mt={screenHeight > 600 ? "100px" : "20px"}
                            >
                                <CustomInput
                                    label='Code'
                                    name='code'
                                    placeholder='Enter your code'
                                    fieldProps={{ type: 'text' }}
                                    leftIcon={<UserIcon />}
                                    typeInput=''
                                    value=''
                                />
                            </Box>
                        </Center>
                        <Center flexDir="column" mt={screenHeight > 600 ? "calc(100vh - 450px)" : "80px"} mb="34px">
                            <Button
                                colorScheme="light"
                                bg={COLORS.blue}
                                w="full"
                                maxW={"350px"}
                                color={COLORS.white}
                                fontWeight={"500"}
                                fontFamily={"Poppins"}
                                fontSize={"16px"}
                                disabled={isSubmitting}
                                loading={isSubmitting}
                                type="submit"
                                h="48px"
                                borderRadius={"1234px"}
                            >
                                <Box mr="5px">
                                    Verify
                                </Box>
                            </Button>
                        </Center>
                    </MotionBox>
                </Form>
            )}
        </Formik>

    );
};

export default QuizJoin;