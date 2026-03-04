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
            <div className="min-h-screen pb-24 lg:pb-10 bg-white dark:bg-black">
                {/* Visual Background Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/20 dark:bg-indigo-600/5 rounded-full blur-[120px] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-200/20 dark:bg-purple-600/5 rounded-full blur-[100px] -ml-40 -mb-40" />
                
                {/* Main Content Grid */}
                <div className="w-full relative z-10">
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
                                <section className="bg-transparent lg:bg-white/80 dark:lg:bg-card/50 lg:border-2 lg:border-indigo-200 dark:lg:border-border lg:rounded-[2.5rem] lg:p-8 lg:backdrop-blur-xl lg:shadow-lg dark:lg:shadow-none">
                                    <RecentQuizzes />
                                </section>

                                <JoinRoomBanner />

                                <section className="bg-transparent lg:bg-white/80 dark:lg:bg-card/50 lg:border-2 lg:border-indigo-200 dark:lg:border-border lg:rounded-[2.5rem] lg:p-8 lg:backdrop-blur-xl lg:shadow-lg dark:lg:shadow-none">
                                    <RecentGroups />
                                </section>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </div>

        </DashboardLayout >
    );
}
