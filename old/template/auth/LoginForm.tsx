import React, { useEffect } from "react";
import {
    Box,
    VStack,
    Center,
    Button,
} from "@chakra-ui/react";
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from "../tools/CustomInput";
import EmailIcon from "@/component/asset/EmailIcon";
import { COLORS } from "@/utils/theme";
import RightArrowIcon from "@/component/asset/RightArrowIcon";
import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { authLogin } from "@/url/redux/slices/authSlice";
import useCustomToast from "@/hooks/useCustomToast";
import ROUTES from "@/utils/ROUTES";

const MotionBox = motion(Box);

const LoginInForm = () => {
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email format')
            .required('Email is required')
            .max(255, 'Email is too long'),
        password: Yup.string().required('Password is required'),
    });

    const dispatch = useDispatch();
    const showToast = useCustomToast();
    const router = useRouter();

    // Animation controls
    const controls = useAnimation();

    useEffect(() => {
        controls.start({ x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } });
    }, []);

    const initiateLogin = async (values: any, { setSubmitting }: any) => {
        try {
            setSubmitting(true);

            const loginData = {
                email: values.email.trim().toLowerCase(),
                password: values.password,
            };

            await dispatch(authLogin(loginData) as any).unwrap()
                .then((a: any) => {
                    if (a.data.accountable_type === "App\\Models\\Student") {

                        if (a.data.is_verified == 1) {
                            router.push(ROUTES.option);
                        } else {
                            router.push(ROUTES.verify);
                        }
                    } else {
                        if (a.data.is_verified == 1) {
                            router.push(ROUTES.dashboard);
                        } else {
                            router.push(ROUTES.verify);
                        }
                    }
                    showToast('Login successful', 'success');
                });
        } catch (error: any) {
            showToast(error?.message || 'Login failed', 'error');
            setSubmitting(false);
        }
    };

    return (
        <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={initiateLogin}
            enableReinitialize
            validationSchema={validationSchema}
        >
            {({ isSubmitting }) => (
                <Form>
                    <MotionBox
                        animate={controls} // Use animation controls
                        initial={{ x: 100, opacity: 0 }} // only used once
                    >
                        <Box
                            w="full"
                            maxW="350px"
                            h='300px'
                            mx="auto"
                            p={4}
                            py="30px"
                            borderRadius="34px"
                            pos="relative"
                            boxShadow="md"
                            bg={COLORS.white}
                            border="1px solid #E2E8F0"
                        >
                            <VStack align="stretch">
                                <Box w='full'>
                                    <CustomInput
                                        label='Email Address'
                                        name='email'
                                        placeholder='elementary221b@gmail.com'
                                        fieldProps={{ type: 'text' }}
                                        leftIcon={<EmailIcon />}
                                    />
                                </Box>

                                <Box w='full'>
                                    <CustomInput
                                        label='Password'
                                        name='password'
                                        placeholder='********' type='password'
                                    />
                                    <Center mt="10px" mb="0px" justifyContent={"right"}>
                                        <Button
                                            fontSize="14px"
                                            fontWeight="400"
                                            bg="transparent"
                                            color={COLORS.deep_purple}
                                            onClick={() => router.push(ROUTES.forgotten)}
                                        >
                                            Forgot Password?
                                        </Button>
                                    </Center>
                                </Box>
                            </VStack>
                        </Box>

                        <Center mt="47px" mb="76px">
                            <Button
                                colorScheme="light"
                                bg={COLORS.blue}
                                w="full"
                                maxW="350px"
                                color={COLORS.white}
                                disabled={isSubmitting}
                                loading={isSubmitting}
                                fontWeight="500"
                                fontFamily="Poppins"
                                fontSize="16px"
                                h="48px"
                                type="submit"
                                borderRadius="1234px"
                            >
                                <Box mr="5px">Log In</Box>
                                <RightArrowIcon />
                            </Button>
                        </Center>
                    </MotionBox>
                </Form>
            )}
        </Formik>
    );
};

export default LoginInForm;
