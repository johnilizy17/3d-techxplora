// pages/signup.tsx

import GoogleIcon from "@/component/asset/GoogleIcon";
import Navbar from "@/component/landingpage/LandingPageHeader";
import AuthLayout from "@/layout/AuthLayout";
import ForgottenForm from "@/template/auth/ForgottenForm";
import ResetForm from "@/template/auth/ResetForm";
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

export default function Forgotten() {
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
                    <Text color={COLORS.deep_black} fontWeight="700" fontFamily="Poppins" fontSize={{ base: "20px", md: "28px" }} lineHeight={{ base: "22px", md: "26px" }}>Reset password?</Text>
                    <Text fontSize="14px" color={COLORS.light_gray}>
                       Kindly enter a new password for your account
                    </Text>
                </Stack>
                <ResetForm />
            </Box>
        </AuthLayout>
    );
}
