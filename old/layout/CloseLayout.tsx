import LeftArrowIcon from '@/component/asset/LeftArrowIcon';
import { COLORS } from '@/utils/theme';
import { Box, Center, Flex, IconButton, Image } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

export default function CloseLayout({ children }: { children: any }) {

    const router = useRouter()

    function rollDice() {
        const numberImage = Math.floor(Math.random() * 6) + 1;
        return `url(${"/quiz/" + numberImage + ".jpg"})`
    }

    return (
        <>
            <Center w='100vw' minH='100vh' flexDir='row'>
                <Center w={{ base: "100vw", md: "calc(100vw - 700px)" }} position='relative'>
                    {children}
                </Center>
            </Center>
        </>
    )
}