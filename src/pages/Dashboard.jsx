import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsCards from '@/components/dashboard/StatsCards';
import RecentPlays from '@/components/dashboard/RecentPlays';
import JoinRoomBanner from '@/components/dashboard/JoinRoomBanner';
import StartPlaying from '@/components/dashboard/StartPlaying';
import DashboardBottomNav from '@/components/dashboard/DashboardBottomNav';
import { motion } from 'framer-motion';

export default function Dashboard() {
    const user = useSelector(selectCurrentUser);


    return (
        <div className="min-h-screen bg-[#0a0a0a] pb-20">
            {/* Main Content Container */}
            <div className="max-w-md mx-auto w-full bg-[#0a0a0a] md:border-x md:border-white/5 min-h-screen relative shadow-2xl">

                <DashboardHeader user={user} />
                <StatsCards />

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    <RecentPlays />
                    <JoinRoomBanner />
                    <StartPlaying />
                </motion.div>

                <DashboardBottomNav />
            </div>
        </div>
    );
}
