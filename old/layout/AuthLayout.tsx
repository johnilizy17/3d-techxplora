import LeftArrowIcon from '@/component/asset/LeftArrowIcon';
import { COLORS } from '@/utils/theme';
import { Box, Center, Flex, IconButton, Image } from '@chakra-ui/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';

export default function AuthLayout({ children, title }: { children: any, title: string }) {

    const router = useRouter()
    return (
        <>
            <Head>
                <title>TechXplore - {title}</title>
                <meta name="description" content="Quest Earn Get Start" />
                <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Center w='100vw' minH='100vh' flexDir='row'>
                <Center w={{ base: "100vw", md: "calc(100vw - 700px)" }} bg={COLORS.whitesmoke} position='relative'>
                    {children}
                </Center>
            </Center>
        </>
    )
}