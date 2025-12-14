// pages/signup.tsx

import GoogleIcon from "@/component/asset/GoogleIcon";
import Navbar from "@/component/landingpage/LandingPageHeader";
import useCustomToast from "@/hooks/useCustomToast";
import AuthLayout from "@/layout/AuthLayout";
import LoginInForm from "@/template/auth/LoginForm";
import { authLogin } from "@/url/redux/slices/authSlice";
import { getGoogleUser } from "@/url/route/quiz";
import ROUTES from "@/utils/ROUTES";
import { COLORS } from "@/utils/theme";
import {
    Box,
    Button,
    Center,
    Checkbox,
    Heading,
    Input,
    InputGroup,
    Separator,
    Stack,
    Text,
} from "@chakra-ui/react";
import { useGoogleLogin } from "@react-oauth/google";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

export default function LogIn() {

    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const showToast = useCustomToast();
    const dispatch = useDispatch()

    const login = useGoogleLogin({
        onSuccess: tokenResponse => GoogleSuccessful(tokenResponse),
    });

    const GoogleSuccessful = async (tokenResponse: any) => {
        const result = await getGoogleUser(tokenResponse.access_token)
        try {

            setLoading(true);
            const loginData = {
                email: result.email.trim().toLowerCase(),
                password: result.sub + result.given_name,
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
                    setLoading(false);
                });
        } catch (error: any) {

            console.error('Login error:', error);
            showToast(error?.message || 'Login failed', 'error');

            setLoading(false);
        }
    }
    return (
        <AuthLayout title="Login">
            <Navbar />
            <Box
                h="100vh"
                bg={COLORS.bg_gray}
                overflow={"scroll"}
                pos="relative"
                w="full"
                p={4}
                pt="93px"
            >
                <Stack mb={4} w="full">
                    <Text color={COLORS.deep_black} fontWeight="700" fontFamily="Poppins" fontSize={{ base: "20px", md: "28px" }} lineHeight={{ base: "22px", md: "26px" }}>Sign In</Text>
                    <Text fontSize="14px" color={COLORS.light_gray}>
                        You can change your payment credentials here.
                    </Text>
                    <Center mt="32px" w="full">
                        <Button
                            colorScheme="light"
                            bg={COLORS.white}
                            w="full"
                            maxW={"350px"}
                            onClick={() => login()}
                            loading={loading}
                            disabled={loading}
                            color={COLORS.black}
                            fontWeight={"500"}
                            fontFamily={"Poppins"}
                            fontSize={"16px"}
                            h="50px"
                            borderRadius={"13px"}
                        >
                            <GoogleIcon />
                            <Box ml="12px">
                                Continue with Google
                            </Box>
                        </Button>
                    </Center>
                    <Center w="full">
                        <Separator w="full" />
                        <Box fontFamily={"Poppins"} color={COLORS.dim} fontWeight={"600"} mx={["12px", "13px"]}>
                            Or
                        </Box>
                        <Separator w="full" />
                    </Center>
                    <Text textAlign="center" fontSize="16px" color={COLORS.deep_black} fontWeight={"700"}>
                        Log in with Email
                    </Text>
                </Stack>
                <LoginInForm />
            </Box>
        </AuthLayout>
    );
}
