import { COLORS } from '@/utils/theme';
import { AvatarFallback, AvatarImage, AvatarRoot, Button, Center } from '@chakra-ui/react';
import React from 'react';

export default function SettingAvater() {

    return (
        <Center justifyContent={"start"}>
            <AvatarRoot
                w="64px"
                h="64px"
            >
                <AvatarFallback name="Mathletes Club" />
                <AvatarImage src="/leaderboard/p1.png" />
            </AvatarRoot>
            <Button ml="16px" mr="8px" bg={COLORS.black} borderRadius={"full"} h="40px" w="59px" fontWeight={"700"} color={COLORS.white}>
                Edit
            </Button>
            <Button bg={COLORS.red} borderRadius={"full"} h="40px" w="77px" fontWeight={"700"} color={COLORS.white}>
                Delete
            </Button>
        </Center>
    )
}