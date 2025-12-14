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
} from "@chakra-ui/react";
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from "../tools/CustomInput";
import EmailIcon from "@/component/asset/EmailIcon";
import { COLORS } from "@/utils/theme";
import RightArrowIcon from "@/component/asset/RightArrowIcon";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const ResetForm = () => {
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required')
            .max(255, 'Email is too long'),
    });

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

    const router = useRouter()

    const initiateLogin = async (values: any, { setSubmitting }: any) => {
        // try {

        setSubmitting(true);


        // const loginData = {
        //     email: values.email.trim().toLowerCase(),
        //     password: values.password,
        // };
        router.push("/auth/reset")
        //   await dispatch(authLogin(loginData) as any).unwrap()
        //     .then(() => {
        //       showToast('Login successful', 'success');
        //       router.push(ROUTES.dashboard);
        //     });
        // } catch (error: any) {
        //   rateLimiter.incrementAttempts(values.email);

        //   showToast(error?.message || 'Login failed', 'error');

        //   console.error('Login error:', error);
        setSubmitting(false);
        // }
    };


    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={initiateLogin}
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

                        <VStack mt={screenHeight > 600 ? "84px" : "30px"} align="center">
                            <Box w='full' maxW={"350px"}>
                                <CustomInput
                                    label='New Password'
                                    name='password'
                                    placeholder='Enter new password'
                                    fieldProps={{ type: 'password' }}
                                    leftIcon={<EmailIcon />}
                                    type='password'
                                    value=''
                                />
                            </Box>
                            <Box w='full' maxW={"350px"} mt="8px">
                                <CustomInput
                                    label='Confirm Password'
                                    name='confirm_password'
                                    placeholder='Enter confirm password'
                                    fieldProps={{ type: 'password' }}
                                    leftIcon={<EmailIcon />}
                                    type='password'
                                    value=''
                                />
                            </Box>
                        </VStack>
                        <Center mt={screenHeight > 600 ? "calc(100vh - 500px)" : "40px"} mb="76px">
                            <Button
                                colorScheme="light"
                                bg={COLORS.blue}
                                w="full"
                                maxW={"350px"}
                                color={COLORS.white}
                                fontWeight={"500"}
                                fontFamily={"Poppins"}
                                fontSize={"16px"}
                                h="48px"
                                type="submit"
                                borderRadius={"1234px"}
                            >
                                <Box mr="5px">
                                    Continue
                                </Box>
                                <RightArrowIcon />
                            </Button>
                        </Center>
                    </MotionBox>
                </Form>
            )}
        </Formik>

    );
};

export default ResetForm;
