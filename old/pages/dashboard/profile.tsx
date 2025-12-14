
import ProfileBanner from "@/component/profile/ProfileBanner";
import DashboardLayout from "@/layout/DashboardLayout";
import ProfileForm from "@/template/profile/ProfileForm";
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
import { motion } from "framer-motion";


export default function Profile() {

    const MotionBox = motion(Box);

    return (
        <DashboardLayout title="Home Dashboard">
            <Box overflow={"scroll"} minH={"100vh"} bg={COLORS.whitesmoke} flexDir={"column"} mt="60px">
                <MotionBox
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    zIndex={"2"}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <ProfileBanner />
                </MotionBox>
                <MotionBox
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    zIndex={"2"}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <ProfileForm />
                </MotionBox>
            </Box>
        </DashboardLayout>
    );
}
