import { COLORS } from '@/utils/theme';
import { Box, Flex } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';

export default function AdminLayout({ title, children }: { title: string, children: any }) {
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
            <Flex h="100vh" overflow="hidden">
                {/* <SideBar /> */}
                <Box w={{ base: "full", md: "calc('100vw - 300px')" }} bg={COLORS.whitesmoke} overflow={"scroll"}>
                    {children}
                </Box>
            </Flex>
        </>
    )
}