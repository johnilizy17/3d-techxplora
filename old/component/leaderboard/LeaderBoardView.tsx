import React from "react";
import {
    Box,
    Avatar,
    Text,
    VStack,
    HStack,
    Stack,
    chakra,
    AvatarRoot,
    AvatarImage,
    AvatarFallback,
} from "@chakra-ui/react";
import { COLORS } from "@/utils/theme";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { EmptyState } from "@/utils/EmptyState";

const MotionBox = motion(Box);


const LeaderboardCard = ({ id, name, xp }: { id: number, name: string, xp: number }) => (
    <MotionBox
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        zIndex={"2"}
        w="full"
        transition={{ duration: 0.8, ease: "easeOut" }}
    >
        <HStack
            spaceX={4}
            w="full"
            display={id > 3?"flex":"none"}
            bg="white"
            p={4}
            borderRadius="xl"
            boxShadow="md"
        >
            <Text fontWeight="bold" w="20px">
                {id}
            </Text>
            <AvatarRoot size="sm" >
                <AvatarFallback name={name} />
                <AvatarImage src="/leaderboard/2.png" />
            </AvatarRoot>
            <Text flex={1}>{name}</Text>
            <Text fontWeight="bold" color="blue.600">
                {xp} XP
            </Text>
        </HStack>
    </MotionBox>
);

const LeaderboardView = () => {

    const { leaderboard } = useSelector((a: { question: any }) => a.question)

    return (
        <Box
            bg={COLORS.whitesmoke}
            h={"calc(100vh - 300px)"}
            borderTopRadius={"32px"}
            mt="24px"
            py={10}
            w="full"
            overflow="scroll"
            px={4}
            display="flex"
            justifyContent="center"
        >
            <VStack spaceX={4} w="full" maxW="md">

                {leaderboard.length < 3 ?
                    <EmptyState title={"No Leaderboard"} />
                    :
                    leaderboard.map((user: any, index: number) => (
                        <LeaderboardCard key={`${index + 1}-${user.student && user.student.last_name}`} id={index + 1} name={user.student &&  user.student.last_name} xp={user.student && user.student.xp} />
                    ))}

                <Box opacity={"0"} >
                    sdsdd
                </Box>
            </VStack>
        </Box>
    );
};

export default LeaderboardView;
