// components/Leaderboard.tsx
import { Box, Flex, Avatar, Text, VStack, Heading, Icon, Circle, AvatarRoot, AvatarImage, Center, AvatarFallback } from "@chakra-ui/react";
import CrownIcon from "../asset/CrownIcon";
import { COLORS } from "@/utils/theme";
import WeightIcon from "../asset/WeightIcon";
import { useSelector } from "react-redux";
// import { FaCrown } from "react-icons/fa";

const users = [
    {
        name: "Bryan Wolf",
        xp: 434,
        position: 2,
        image: "/leaderboard/1.png", // Save image locally or use a URL
    },
    {
        name: "Meghan Jessica",
        xp: 240,
        position: 1,
        image: "/leaderboard/2.png",
    },
    {
        name: "Alex Turner",
        xp: 120,
        position: 3,
        image: "/leaderboard/3.png",
    },
];

export default function LeaderboardBanner() {

    const { leaderboard } = useSelector((a: { question: any }) => a.question)

    return (
        <Box textAlign="center">
            <Heading fontWeight={"700"} fontSize={["16px", "18px"]}>Leaderboard</Heading>
            <Flex gap={6} mt="43px">
                {leaderboard.map((user: any, index: number) => (
                    <VStack mt={index === 0 ? "0px" : "24px"} display={index < 2.5 ? "flex" : "none"} key={user.name} position="relative">
                        {index === 0 && (
                            <Box position="absolute" zIndex={"2"} top="-5">
                                <CrownIcon />
                            </Box>
                        )}
                        <Center mb="4px" pos="relative">
                            <AvatarRoot size={index === 0 ? "2xl" : "xl"} border={`2px solid ${COLORS.blue}`} >
                                <AvatarFallback name={user.student && user.student.last_name} />
                                <AvatarImage src={user.photo} />
                            </AvatarRoot>
                            <Center w="24px" h="24px" fontFamily={"700"} fontSize={"12px"} borderRadius={"24px"} pos="absolute" bottom="-12px" color={COLORS.white} bg={COLORS.blue}>
                                {index + 1}
                            </Center>
                        </Center>
                        <Text w="100px" lineClamp={1} fontWeight="700" fontSize={"14.4px"}>
                            {user.student &&  user.student.last_name}
                        </Text>
                        <Center>
                            <WeightIcon />
                            <Text fontSize="13px">  {user.student && user.student.xp ? user.student.xp : 0} XP</Text>
                        </Center>
                    </VStack>
                ))}
            </Flex>
        </Box>
    );
}
