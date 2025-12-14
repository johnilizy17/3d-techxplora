
import LeaderboardBanner from "@/component/leaderboard/LeaderboardBanner";
import LeaderboardView from "@/component/leaderboard/LeaderBoardView";
import DashboardLayout from "@/layout/DashboardLayout";
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


export default function Leaderboard() {


    const MotionBox = motion(Box);

    return (
        <DashboardLayout title="Home Dashboard">
            <Center justifyContent={"start"} overflow={"hidden"} h={"calc(100vh - 100px)"} flexDir={"column"} mt="100px">
                <MotionBox
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    zIndex={"2"}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <LeaderboardBanner />
                </MotionBox>
                <LeaderboardView />
            </Center>
        </DashboardLayout>
    );
}
