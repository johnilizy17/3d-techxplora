// pages/signup.tsx
import GoogleIcon from "@/component/asset/GoogleIcon";
import Navbar from "@/component/landingpage/LandingPageHeader";
import AuthLayout from "@/layout/AuthLayout";
import OptionForm from "@/template/auth/OptionForm";
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
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

// Validation schema using Yup
const SignupSchema = Yup.object().shape({
    fullName: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Password is required"),
    isAdmin: Yup.boolean(),
});

export default function Option() {
    return (
        <AuthLayout title="Home">
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
                    <Text color={COLORS.deep_black} fontWeight="700" fontFamily="Poppins" fontSize={{ base: "20px", md: "28px" }} lineHeight={{ base: "22px", md: "26px" }}>Select Account</Text>
                    <Text fontSize="14px" color={COLORS.light_gray}>
                       Select Account to Login to
                    </Text>
                </Stack>
                <OptionForm />
            </Box>
        </AuthLayout>
    );
}
