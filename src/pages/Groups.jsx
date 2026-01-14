import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Users, Sparkles, ArrowUpRight, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useGetGroupsQuery, useGetQuizzesQuery, useGetQuizDataQuery } from '@/redux/api/teacherApi';
import { selectCurrentUser, setTemporaryStorage } from '@/redux/slices/authSlice';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EmptyState from '@/components/dashboard/EmptyState';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { timeAgo } from '@/utils/date';
import CopyIcon from '@/components/dashboard/CopyIcon';

export default function Groups() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const type = user?.accountable_type === "App\\Models\\Student" ? "student" : "teacher";

    const { data: groupsData, isLoading } = useGetGroupsQuery({ type, id: user?.id }, {
        skip: !user?.id
    });

    const { data: quizzesData } = useGetQuizzesQuery({ type, id: user?.id }, {
        skip: !user?.id
    });

    const { data: quizDataResults } = useGetQuizDataQuery(undefined, {
        skip: !user?.id
    });

    const groups = Array.isArray(groupsData) ? groupsData : (groupsData?.data || []);
    const quizzes = Array.isArray(quizzesData) ? quizzesData : (quizzesData?.data || []);
    const quizData = quizDataResults?.data || quizDataResults || { group: [], class: [], quiz: [] };

    const handleGroupClick = (group) => {
        dispatch(setTemporaryStorage(group));
        navigate(`/dashboard/teacher/groups?code=${group.group_code}`);
    };

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24 lg:pb-10">
                <div className="w-full relative">
                    {/* Promotional Banner */}
                    <PromotionalBanner groups={groups} quizzes={quizzes} quizData={quizData} />

                    {/* Groups Section */}
                    <div className="px-6 lg:px-10 mt-12">
                        <div className="mb-8">
                            <h2 className="text-3xl font-black text-white tracking-tight leading-none mb-2 uppercase italic">
                                All Groups
                            </h2>
                            <div className="h-1 w-16 bg-gradient-to-r from-[#a6b1ff] to-transparent rounded-full" />
                        </div>

                        {isLoading ? (
                            <div className="py-12 flex justify-center">
                                <div className="relative w-10 h-10">
                                    <div className="absolute inset-0 rounded-full border-2 border-[#a6b1ff]/20"></div>
                                    <div className="absolute inset-0 rounded-full border-t-2 border-[#a6b1ff] animate-spin"></div>
                                </div>
                            </div>
                        ) : groups.length === 0 ? (
                            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-12">
                                <EmptyState title="No Groups Found" description="You haven't joined or created any groups yet." />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {groups.map((group, index) => (
                                    <GroupCard
                                        key={group.id || index}
                                        group={group}
                                        index={index}
                                        onClick={() => handleGroupClick(group)}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

// Promotional Banner Component
const PromotionalBanner = ({ groups, quizzes, quizData }) => {
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const isStudent = user?.accountable_type === "App\\Models\\Student";
    const isTeacher = user?.accountable_type === "App\\Models\\Teacher";
    const isAdmin = user?.is_admin || user?.role === 'admin';

    // Calculate statistics
    const totalGroups = groups?.length || 0;
    const totalQuizzes = quizzes?.length || 0;
    const totalPlays = quizData?.quiz?.length || 0;

    // Determine content based on user type
    const getBannerContent = () => {
        if (isStudent) {
            return {
                badge: "STUDENT",
                badgeColor: "from-emerald-400 to-teal-500",
                title: "Join a Group Today!",
                subtitle: "Get instant access to the latest quizzes and compete with your peers.",
                ctaText: "JOIN GROUP NOW",
                ctaAction: () => navigate('/dashboard/groups/join'),
                icon: Users
            };
        } else if (isTeacher || isAdmin) {
            return {
                badge: isAdmin ? "ADMIN" : "TEACHER",
                badgeColor: isAdmin ? "from-rose-500 to-orange-500" : "from-blue-500 to-indigo-600",
                title: "Create Your Group!",
                subtitle: "Build your learning community and share quizzes with students.",
                ctaText: "CREATE GROUP",
                ctaAction: () => navigate('/dashboard/create_group'),
                icon: Sparkles
            };
        }
        return {
            badge: "EXPLORE",
            badgeColor: "from-purple-400 to-pink-500",
            title: "Join the Community!",
            subtitle: "Connect with others and access amazing quizzes.",
            ctaText: "GET STARTED",
            ctaAction: () => navigate('/dashboard'),
            icon: Sparkles
        };
    };

    const content = getBannerContent();
    const IconComponent = content.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 sm:mx-6 lg:mx-10 mt-6 lg:mt-8 relative overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-gradient-to-br from-[#1a1f4d] via-[#2a2f6d] to-[#1a1f4d] border border-[#a6b1ff]/20 shadow-2xl"
        >
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-[80px]" />

            {/* Decorative Elements */}
            <div className="absolute top-4 left-8 hidden lg:block">
                <Sparkles className="text-pink-400 animate-pulse" size={20} />
            </div>
            <div className="absolute top-8 right-32 hidden lg:block">
                <Sparkles className="text-purple-400 animate-pulse" size={16} style={{ animationDelay: '0.5s' }} />
            </div>
            <div className="absolute bottom-8 left-1/4 hidden lg:block">
                <Sparkles className="text-indigo-400 animate-pulse" size={14} style={{ animationDelay: '1s' }} />
            </div>

            <div className="relative z-10 p-6 sm:p-8 lg:p-12">
                {/* Main Content Row */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 mb-6 lg:mb-8">
                    <div className="flex-1 space-y-3 lg:space-y-4 w-full lg:w-auto text-center lg:text-left">
                        {/* Dynamic Badge */}
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${content.badgeColor} border border-white/20 shadow-lg`}>
                            <IconComponent className="text-white" size={16} />
                            <span className="text-white font-black text-sm uppercase tracking-wider italic">{content.badge}</span>
                        </div>

                        {/* Main Heading */}
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight">
                            {content.title}
                        </h2>

                        {/* Subtext */}
                        <p className="text-white/80 text-sm sm:text-base lg:text-lg font-medium max-w-md mx-auto lg:mx-0">
                            {content.subtitle}
                        </p>

                        {/* Benefits List - Hidden on mobile for cleaner look */}
                        <div className="hidden sm:flex flex-col gap-2 pt-2">
                            {isStudent ? (
                                <>
                                    <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                        <span>Access exclusive quizzes from your teachers</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                        <span>Track your progress and compete with peers</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                        <span>Earn XP and climb the leaderboard</span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                        <span>Organize students into learning groups</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                        <span>Share quizzes and track student performance</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
                                        <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                                        <span>Manage multiple groups with ease</span>
                                    </div>
                                </>
                            )}
                        </div>

                        {/* CTA Button */}
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={content.ctaAction}
                            className="mt-4 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-white text-[#1a1f4d] font-black text-sm sm:text-base uppercase tracking-wide shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 group"
                        >
                            {content.ctaText}
                            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
                        </motion.button>
                    </div>

                    {/* Character Illustration - Smaller on mobile */}
                    <div className="relative hidden sm:block">
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10"
                        >
                            <div className={`w-32 h-32 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full bg-gradient-to-br ${content.badgeColor} flex items-center justify-center shadow-2xl`}>
                                <IconComponent className="text-white" size={48} />
                            </div>
                        </motion.div>
                        <div className={`absolute inset-0 bg-gradient-to-br ${content.badgeColor} opacity-20 rounded-full blur-3xl`} />
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="relative z-10 pt-6 border-t border-white/10">
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                        {/* Total Groups */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            onClick={() => navigate('/dashboard/groups')}
                            className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 sm:p-4 lg:p-5 border border-white/10 hover:border-[#a6b1ff]/30 transition-all cursor-pointer group"
                        >
                            <div className="flex flex-col items-center text-center">
                                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white group-hover:text-[#a6b1ff] transition-colors">
                                    {totalGroups}
                                </span>
                                <span className="text-[10px] sm:text-xs lg:text-sm text-white/60 font-bold uppercase tracking-wider mt-1">
                                    Total Groups
                                </span>
                            </div>
                        </motion.div>

                        {/* Total Quizzes */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            onClick={() => navigate('/dashboard/quizzes')}
                            className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 sm:p-4 lg:p-5 border border-white/10 hover:border-[#a6b1ff]/30 transition-all cursor-pointer group"
                        >
                            <div className="flex flex-col items-center text-center">
                                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white group-hover:text-[#a6b1ff] transition-colors">
                                    {totalQuizzes}
                                </span>
                                <span className="text-[10px] sm:text-xs lg:text-sm text-white/60 font-bold uppercase tracking-wider mt-1">
                                    Quizzes
                                </span>
                            </div>
                        </motion.div>

                        {/* Total Plays */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            onClick={() => navigate('/dashboard/result')}
                            className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 sm:p-4 lg:p-5 border border-white/10 hover:border-[#a6b1ff]/30 transition-all cursor-pointer group"
                        >
                            <div className="flex flex-col items-center text-center">
                                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white group-hover:text-[#a6b1ff] transition-colors">
                                    {totalPlays}
                                </span>
                                <span className="text-[10px] sm:text-xs lg:text-sm text-white/60 font-bold uppercase tracking-wider mt-1">
                                    Plays
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Group Card Component
const GroupCard = ({ group, index, onClick }) => {
    const isActive = group.status === "1" || group.status === 1;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
            onClick={onClick}
            className="rounded-[2.5rem] bg-[#1a1a1a]/40 backdrop-blur-xl border border-white/5 hover:border-[#a6b1ff]/30 transition-all duration-500 cursor-pointer p-6 relative group overflow-hidden shadow-2xl flex flex-col min-h-[220px]"
        >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.04] pointer-events-none" />
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/10 rounded-full blur-[60px] group-hover:bg-purple-500/20 transition-all duration-700" />

            <div className="flex items-start gap-5 mb-8 relative z-10">
                <div className="relative">
                    <Avatar className="h-16 w-16 rounded-2xl group-hover:border-[#a6b1ff]/50 transition-all duration-500 shadow-xl group-hover:scale-110">
                        <AvatarImage src={group.image} className="object-cover" />
                        <AvatarFallback className="bg-gradient-to-br from-[#a6b1ff]/20 to-[#c7aff8]/20 text-[#a6b1ff] font-black text-xl italic uppercase">
                            {group.title?.charAt(0) || <Users size={24} />}
                        </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-[#0a0a0a] border border-white/10 shadow-lg">
                        <Users size={12} className="text-[#a6b1ff]" />
                    </div>
                </div>

                <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-2 mb-1.5">
                        <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full ${isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'} text-[9px] font-black uppercase tracking-tighter italic shadow-sm`}>
                            {isActive ? <ShieldCheck size={10} /> : <ShieldAlert size={10} />}
                            {isActive ? 'Active' : 'Disabled'}
                        </div>
                        <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest">{timeAgo(group.created_at)}</span>
                    </div>
                    <h3 className="text-xl font-black text-white italic line-clamp-1 uppercase tracking-tighter group-hover:text-[#a6b1ff] transition-colors leading-tight">{group.title}</h3>
                    <p className="text-xs text-white/40 line-clamp-1 font-medium italic mt-1">{group.description || "No group description available"}</p>
                </div>
            </div>

            <div className="mt-auto flex items-center justify-between relative z-10 pt-6 border-t border-white/5">
                <div className="flex -space-x-2">
                    {[1, 2].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-xl bg-white/5 border border-[#0a0a0a] flex items-center justify-center backdrop-blur-md">
                            <span className="text-[10px] text-white/40 font-black italic">?</span>
                        </div>
                    ))}
                    <div className="w-8 h-8 rounded-xl bg-[#a6b1ff]/10 border border-[#0a0a0a] flex items-center justify-center backdrop-blur-md">
                        <span className="text-[9px] text-[#a6b1ff] font-black italic">10+</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end mr-2">
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.2em] leading-none mb-1">Group Code</span>
                        <span className="text-sm font-black text-[#a6b1ff] uppercase tracking-wider leading-none italic">{group.group_code}</span>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-[#a6b1ff] hover:text-[#0a0a0a] transition-all duration-300 group/link">
                        <ArrowUpRight size={18} className="group-hover/link:scale-110 transition-transform" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
