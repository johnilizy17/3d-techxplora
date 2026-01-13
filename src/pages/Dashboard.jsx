import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatsCards from '@/components/dashboard/StatsCards';
import RecentQuizzes from '@/components/dashboard/RecentQuizzes';
import JoinRoomBanner from '@/components/dashboard/JoinRoomBanner';
import RecentGroups from '@/components/dashboard/RecentGroups';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { motion } from 'framer-motion';

export default function Dashboard() {
    const user = useSelector(selectCurrentUser);

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24 lg:pb-10">
                {/* Main Content Grid */}
                <div className="w-full relative">
                    {/* Top Section: Header & Stats */}
                    <div className="space-y-0 lg:space-y-6">
                        <DashboardHeader user={user} />
                        <div className="lg:px-10">
                            <StatsCards />
                        </div>
                    </div>

                    {/* Responsive Grid for Body Content */}
                    <div className="grid grid-cols-1  gap-0 lg:gap-10 lg:px-10 lg:mt-10">
                        {/* Primary Column (Left on Laptop) */}
                        <motion.div
                            className="lg:col-span-8 order-2 lg:order-1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="space-y-4 lg:space-y-8">
                                <section className="bg-white/0 lg:bg-white/[0.02] lg:border lg:border-white/5 lg:rounded-[2.5rem] lg:p-8 lg:backdrop-blur-xl">
                                    <RecentQuizzes />
                                </section>

                                <JoinRoomBanner />

                                <section className="bg-white/0 lg:bg-white/[0.02] lg:border lg:border-white/5 lg:rounded-[2.5rem] lg:p-8 lg:backdrop-blur-xl">
                                    <RecentGroups />
                                </section>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
