import GoogleIcon from "@/component/asset/GoogleIcon";
import Navbar from "@/component/landingpage/LandingPageHeader";
import AuthLayout from "@/layout/AuthLayout";
import SignUpForm from "@/template/auth/SignUpForm";
import { COLORS } from "@/utils/theme";
import {
    Box,
    Button,
    Center,
    Checkbox,
    Dialog,
    Flex,
    Heading,
    Icon,
    Input,
    InputGroup,
    Portal,
    Separator,
    Stack,
    Text,
    useDisclosure,
    VStack,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { MdAdminPanelSettings, MdFacebook, MdOutlineMenuBook, MdSchool } from "react-icons/md";
import { useRouter } from "next/router";
import { useGoogleLogin } from "@react-oauth/google";
import { getGoogleUser } from "@/url/route/quiz";
import ROUTES from "@/utils/ROUTES";
import useCustomToast from "@/hooks/useCustomToast";
import { authRegisterStudent, authRegisterTeacher } from "@/url/redux/slices/authSlice";
import { useDispatch } from "react-redux";

// Validation schema using Yup
const SignupSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    isAdmin: Yup.boolean(),
});

export default function SignUp() {
    const { open, onOpen, onClose } = useDisclosure()
    const [type, setType] = useState<any>(1)
    const router = useRouter()
    const [loading, setLoading] = useState(false);
    const showToast = useCustomToast();
    const [refresh, setRefresh]= useState(false)
    const dispatch = useDispatch()
    const login = useGoogleLogin({
        onSuccess: tokenResponse => GoogleSuccessful(tokenResponse),
    });

    const GoogleSuccessful = async (tokenResponse: any) => {
        const result = await getGoogleUser(tokenResponse.access_token)
        try {

            setLoading(true);
            const code = router.query.code ? router.query.code : null
            const admin = type == 3 ? true : false



            if (type == 3 || code) {
                const loginData = {
                    ...result,
                    "is_admin": admin,
                    "admin_code": code,
                    first_name: result.family_name ?? result.name,
                    last_name: result.given_name,
                    other_name: result.given_name,
                    email: result.email.trim().toLowerCase(),
                    password: result.sub + result.given_name,
                    password_confirmation: result.sub + result.given_name,
                    xp:"0"
                };

                await dispatch(authRegisterTeacher(loginData) as any).unwrap()
                    .then(() => {
                        router.push(ROUTES.login);
                        showToast('Registration successful', 'success');
                    });
            } else {
                const loginData = {
                    ...result,
                    "is_branch": false,
                    first_name: result.family_name ?? result.name,
                    last_name: result.given_name,
                    other_name: result.given_name,
                    email: result.email.trim().toLowerCase(),
                    password: result.sub + result.given_name,
                    password_confirmation: result.sub + result.given_name,
                    xp:0
                };

                await dispatch(authRegisterStudent(loginData) as any).unwrap()
                    .then(() => {
                        router.push(ROUTES.login);
                        showToast('Registration successful', 'success');
                    });
            }
        } catch (error: any) {

            console.error('Login error:', error);
            showToast(error?.message || 'Login failed', 'error');

            setLoading(false);
        }
    }

    useEffect(() => {
        if (router.query && router.query.code) {
            setType(2)
        } else if (router.query && router.query.page) {
            setType(router.query.page)
        }
        setTimeout(() => {
           setRefresh(true)
        }, 5000)
    }, [router.query && router.query.code, refresh])

    useEffect(()=>{})

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
                    <Text color={COLORS.deep_black} fontWeight="700" fontFamily="Poppins" fontSize={{ base: "20px", md: "28px" }} lineHeight={{ base: "22px", md: "26px" }}>Create Account</Text>
                    <Text fontSize="14px" color={COLORS.light_gray}>
                        You can change  your payment credentials here.
                    </Text>
                    <Center mt="32px" w="full">
                        <Button
                            colorScheme="light"
                            bg={COLORS.white}
                            w="full"
                            maxW={"350px"}
                            color={COLORS.black}
                            fontWeight={"500"}
                            fontFamily={"Poppins"}
                            onClick={() => login()}
                            loading={loading}
                            disabled={loading}
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
                        Sign Up with Email
                    </Text>
                </Stack>
                <SignUpForm type={type} setType={setType} />
            </Box>
        </AuthLayout>
    );
}
