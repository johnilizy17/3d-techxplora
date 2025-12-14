
import SettingsBanner from "@/component/setting/SettingBanner";
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
import { motion } from "framer-motion";


export default function Setting() {

    const MotionBox = motion(Box);

    return (
        <DashboardLayout title="Home Dashboard">
            <Box overflow={"scroll"} minH={"100vh"} px={{ base: 4, md: 16 }} bg={COLORS.whitesmoke} flexDir={"column"} mt="60px">
                <MotionBox
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <SettingsBanner />
                </MotionBox>
            </Box>
        </DashboardLayout>
    );
}
