
import SettingsBanner from "@/component/setting/SettingBanner";
import ContainerSyllabus from "@/component/Syllabus/ContainerSyllabus";
import CloseLayout from "@/layout/CloseLayout";
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


export default function Syllabus() {

    const MotionBox = motion(Box);

    return (
        <DashboardLayout chat={true} title="Syllabus Dashboard">
            <MotionBox
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <CloseLayout>
                    <ContainerSyllabus />
                </CloseLayout>
            </MotionBox>
        </DashboardLayout>
    );
}
