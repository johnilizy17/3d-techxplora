import PlayButton from '@/component/admin/PlayButton';
import Head from 'next/head';
import React from 'react';

export default function NoAuthLayout({ children, title }: { children: any, title: string }) {

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
            {children}
            <PlayButton />
        </>
    )
}