import DashboardBanner from "@/component/dashboard/DashboardBanner";
import DashboardQuiz from "@/component/dashboard/DashboardQuiz";
import DashboardRecent from "@/component/dashboard/DashboardRecent";
import DashboardLayout from "@/layout/DashboardLayout";
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
import { motion } from "framer-motion";
import * as Yup from "yup";


export default function LogIn() {

    const MotionBox = motion(Box);

    return (
        <DashboardLayout title="Home Dashboard">
            <Box mt="100px">
                <MotionBox
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    zIndex={"2"}
                    fontFamily={"Poppins"}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <DashboardBanner />
                </MotionBox>

                <MotionBox
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    zIndex={"2"}
                    fontFamily={"Poppins"}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <DashboardRecent />

                </MotionBox>

                <MotionBox
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    zIndex={"2"}
                    fontFamily={"Poppins"}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <DashboardQuiz />
                </MotionBox>
                <Box h="50px" />
            </Box>
        </DashboardLayout>
    );
}
