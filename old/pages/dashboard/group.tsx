import React from "react";
import {
    Box,
    Text,
    Heading,
    Image,
    SimpleGrid,
    VStack,
    HStack,
    Avatar,
    Button,
    Flex,
    Spacer,
    useBreakpointValue,
} from "@chakra-ui/react";
import DashboardLayout from "@/layout/DashboardLayout";
import { motion } from "framer-motion";
import TeacherBanner from "@/component/dashboardTeacher/TeacherBanner";
import TeacherGroup from "@/component/dashboardTeacher/TeacherGroup";

export default function SchoolDashboard() {

    const MotionBox = motion(Box);

    return (
        <DashboardLayout title="Teacher Dashboard">
            <Box mt="100px">
                <MotionBox
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <TeacherBanner />
                </MotionBox>

                <MotionBox
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <TeacherGroup />
                </MotionBox>
            </Box>
        </DashboardLayout>
    );
}
