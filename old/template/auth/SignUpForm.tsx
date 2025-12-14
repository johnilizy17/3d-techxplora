import React, { useEffect, useState } from "react";
import {
    Box,
    VStack,
    Button,
    Center,
    Flex,
    SwitchRoot,
    SwitchHiddenInput,
    SwitchControl,
    SwitchLabel
} from "@chakra-ui/react";
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from "../tools/CustomInput";
import EmailIcon from "@/component/asset/EmailIcon";
import { COLORS } from "@/utils/theme";
import RightArrowIcon from "@/component/asset/RightArrowIcon";
import UserIcon from "@/component/asset/UserIcon";
import { useRouter } from "next/router";
import { motion, useAnimation } from "framer-motion";
import { useDispatch } from "react-redux";
import { authRegisterStudent, authRegisterTeacher } from "@/url/redux/slices/authSlice";
import useCustomToast from "@/hooks/useCustomToast";
import ROUTES from "@/utils/ROUTES";

const MotionBox = motion(Box);

const SignUpForm = ({ type, setType }: { type: number, setType: (a: number) => void }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const showToast = useCustomToast();
    const [guidian, setGuidian] = useState(false);

    const controls = useAnimation();

    useEffect(() => {
        // Play animation once on mount
        controls.start({ x: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } });
    }, []);

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format').required('Email is required').max(255, 'Email is too long'),
        password: Yup.string().required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Must contain at least one number'),
        password_confirmation: Yup.string().required('Password is required')
            .min(8, 'Password must be at least 8 characters')
            .matches(/[A-Z]/, 'Must contain at least one uppercase letter')
            .matches(/[a-z]/, 'Must contain at least one lowercase letter')
            .matches(/[0-9]/, 'Must contain at least one number'),
        first_name: Yup.string().required('First Name is required'),
        other_name: Yup.string().required('Other Name is required'),
        last_name: Yup.string().required('Last Name is required')
    });

    const initiateSignUp = async (values: any, { setSubmitting }: any) => {
        try {
            setSubmitting(true);
            const code = router.query.code || null;
            const admin = type == 3;

            if (admin || code) {
                const loginData = { ...values, is_admin: admin, admin_code: code,xp:"0", email: values.email.trim().toLowerCase(), password: values.password };
                await dispatch(authRegisterTeacher(loginData) as any).unwrap();
            } else {
                const loginData = { ...values, is_branch: guidian, xp:0, email: values.email.trim().toLowerCase(), password: values.password };
                await dispatch(authRegisterStudent(loginData) as any).unwrap();
            }

            router.push(ROUTES.login);
            showToast('Account created successfully', 'success');

        } catch (error: any) {
            console.error('Sign up error:', error);
            showToast('Account already exists', 'error');
            setSubmitting(false);
        }
    };

    return (
        <MotionBox
            animate={controls} // use animation controls
            initial={{ x: 100, opacity: 0 }} // only used once
        >
            <Formik
                initialValues={{ email: "", password: "", password_confirmation: "", first_name: "", other_name: "", last_name: "" }}
                onSubmit={initiateSignUp}
                enableReinitialize
                validationSchema={validationSchema}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Box
                            w="full"
                            maxW="350px"
                            h="auto"
                            mx="auto"
                            py="30px"
                            borderRadius="34px"
                            pos="relative"
                            boxShadow="md"
                            bg={COLORS.white}
                            border="1px solid #E2E8F0"
                        >
                            <Box p={4} w="full">
                                <VStack align="stretch">
                                    <CustomInput label='Last Name' name='last_name' placeholder='Nakano' leftIcon={<UserIcon />} />
                                    <CustomInput label='First Name' name='first_name' placeholder='Azusa' leftIcon={<UserIcon />} />
                                    <CustomInput label='Other Name' name='other_name' placeholder='Azusa' leftIcon={<UserIcon />} />
                                    <CustomInput label='Email Address' name='email' placeholder='elementary221b@gmail.com' leftIcon={<EmailIcon />} />
                                    <CustomInput label='Password' name='password' placeholder='********' type='password' />
                                    <CustomInput label='Password Confirmation' name='password_confirmation' placeholder='********' type='password' />

                                    {type !== 1 &&
                                        <SwitchRoot disabled defaultChecked={type !== 2} colorPalette="blue" mt="24px" alignItems="start">
                                            <SwitchHiddenInput type="button" />
                                            <SwitchControl />
                                            <SwitchLabel>
                                                <Box fontWeight="600" lineHeight="20px" fontSize="14px">
                                                    I am a teacher/Group Admin
                                                </Box>
                                            </SwitchLabel>
                                        </SwitchRoot>
                                    }
                                </VStack>
                            </Box>
                        </Box>

                        <Center flexDir="column" mt="47px" mb="34px">
                            <Button
                                colorScheme="light"
                                bg={COLORS.blue}
                                w="full"
                                maxW="350px"
                                color={COLORS.white}
                                fontWeight="500"
                                fontFamily="Poppins"
                                fontSize="16px"
                                disabled={isSubmitting}
                                loading={isSubmitting}
                                type="submit"
                                h="48px"
                                borderRadius="1234px"
                            >
                                <Box mr="5px">Create My Account</Box>
                                <RightArrowIcon />
                            </Button>

                            <Center cursor="pointer" onClick={() => router.push("/terms")} w="270px" mt="34px" flexWrap="wrap" fontWeight="400" fontSize="12px" textAlign="center">
                                <Box>By continuing you are indicating that you agree </Box>
                                <Box display="flex">to the <Box style={{ color: COLORS.blue, margin: "0 1px" }}>Terms</Box></Box>
                                <Box> and </Box>
                                <Box style={{ color: COLORS.blue, margin: "0 1px" }}>Privacy Policy</Box>
                                <Box>.</Box>
                            </Center>
                        </Center>
                    </Form>
                )}
            </Formik>
        </MotionBox>
    );
};

export default SignUpForm;
