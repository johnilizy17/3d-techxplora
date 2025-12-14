import DashboardHeader from '@/component/landingpage/DasboardHeader';
import Head from 'next/head';
import React, { useEffect } from 'react';
import { AiChat } from './AiChat';
import { fetechAllResult, leaderboardStats } from '@/url/redux/slices/questionSlice';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile, xpHistory } from '@/url/redux/slices/authSlice';
import { allQuiz } from '@/url/redux/slices/techerSlice';
import { useRouter } from 'next/router';
import { KYCModel } from '@/template/model/KYCModel';

export default function DashboardLayout({ title, children, chat = false }: { title: string, children: any, chat?: boolean }) {

    const dispatch = useDispatch();
    const router = useRouter()
    const { user } = useSelector((a: { auth: { user: any } }) => a.auth);

    useEffect(() => {
        if (user.id) {
            dispatch(fetechAllResult({ id: user.id, admin: user.admin_code }) as any)
            dispatch(xpHistory({ sender_id: user.id, account_id: user.id }) as any)
            const role = user.accountable_type === "App\\Models\\Student" ? "student" : "teacher"
            dispatch(getProfile({ id: user.id, role: role }) as any)
            dispatch(leaderboardStats(user.admin_code) as any)
            dispatch(allQuiz({ type: role, id: user.id }) as any);
        } else {
            router.push("/auth/login")
        }
    }, [user && user.id])


    return (
        <>
            <KYCModel />
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

            <DashboardHeader />

            {!chat && <AiChat />}
            {children}
        </>
    )
}