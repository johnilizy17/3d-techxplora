import React, { useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { allTeacherByCode } from "@/url/redux/slices/techerSlice";
import { EmptyState } from "@/utils/EmptyState";

const users = [
    { id: 4, name: "Marsha Fisher", xp: 36 },
    { id: 5, name: "Liam Johnson", xp: 42 },
    { id: 6, name: "Sofia Chen", xp: 29 },
    { id: 7, name: "Noah Patel", xp: 50 },
    { id: 8, name: "Emma Garcia", xp: 28 },
    { id: 9, name: "Liam Johnson", xp: 32 },
    { id: 10, name: "Sofia Martinez", xp: 25 },
];


const MotionBox = motion(Box);


const LeaderboardCard = ({ id, first_name, last_name, email, number, photo }: { id: number, last_name: string, first_name: string, email: string, number: number, photo: string }) => (
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
            bg="white"
            p={4}
            borderRadius="xl"
            boxShadow="md"
        >
            <Text fontWeight="bold" w="20px">
                {number + 1}
            </Text>
            <AvatarRoot size="sm" >
                <AvatarFallback name={last_name} />
                <AvatarImage src={photo} />
            </AvatarRoot>
            <Box>
                <Text flex={1}>{last_name}, {first_name}</Text>
                <Text fontWeight="bold" color="blue.600">
                    {email}
                </Text>
            </Box>
        </HStack>
    </MotionBox>
);

const TeacherView = () => {

    const { user } = useSelector((a: { auth: { user: any } }) => a.auth)
    const { teacherAll } = useSelector((a: { teacher: { teacherAll: any } }) => a.teacher)
    const dispatch = useDispatch()

    function getAllTearcherByCode() {
        if (user && user.admin_code) {
            dispatch(allTeacherByCode(user.admin_code) as any)
        }
    }

    useEffect(() => {
        getAllTearcherByCode()
    }, [user && user.admin_code])
    return (
        <Box
            h={"full"}
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
                {teacherAll && teacherAll.length > 0.1 ?
                    teacherAll.map((user: any, index: number) => (
                        <LeaderboardCard number={index} key={index} {...user} />
                    )) :
                    <EmptyState title="No Teacher Found" />
                }
            </VStack>
        </Box>
    );
};

export default TeacherView;
