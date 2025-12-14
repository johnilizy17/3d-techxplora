import GoogleIcon from "@/component/asset/GoogleIcon";
import Navbar from "@/component/landingpage/LandingPageHeader";
import AuthLayout from "@/layout/AuthLayout";
import CloseLayout from "@/layout/CloseLayout";
import DashboardLayout from "@/layout/DashboardLayout";
import CreateGroupForm from "@/template/auth/CreateGroupForm";
import { COLORS } from "@/utils/theme";
import {
    Box,
    Button,
    Center,
    Checkbox,
    Flex,
    Heading,
    Input,
    InputGroup,
    Separator,
    Stack,
    Text,
} from "@chakra-ui/react";
import { Formik, Form, Field } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

export default function CreateGroup() {

    return (
        <DashboardLayout title="Welcome to group">
            <CloseLayout>
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
                        <Center justifyContent={"start"}>
                            <Text mr="5px" color={COLORS.deep_black} fontWeight="700" fontFamily="Poppins" fontSize={{ base: "20px", md: "28px" }} lineHeight={{ base: "22px", md: "26px" }}>
                                Welcome, Temitayo.
                            </Text>
                        </Center>
                        <Text fontSize="14px" color={COLORS.light_gray}>
                            This is the tagline for school code
                        </Text>
                    </Stack>
                    <CreateGroupForm />
                </Box>
            </CloseLayout>
        </DashboardLayout>
    );
}
