
import LeaderboardBanner from "@/component/leaderboard/LeaderboardBanner";
import LeaderboardView from "@/component/leaderboard/LeaderBoardView";
import TeacherView from "@/component/teacher/TeacherView";
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


export default function Teacher() {


    const MotionBox = motion(Box);

    return (
        <DashboardLayout title="Home Dashboard">
            <Box>
                <Box h="80px" />
                <Text px={4} fontWeight="700" color="#000" fontSize="20px" lineHeight={"150%"} letterSpacing={"0.3px"}>
                    All Teachers
                </Text>
                <Center justifyContent={"start"} flexDir={"column"}>
                    <TeacherView />
                </Center>
            </Box>
        </DashboardLayout>
    );
}
