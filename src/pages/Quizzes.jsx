import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Gamepad2, Sparkles, ArrowUpRight, BookOpen, Trophy } from 'lucide-react';
import { useGetQuizzesQuery, useGetQuizDataQuery, useGetGroupsQuery } from '@/redux/api/teacherApi';
import { selectCurrentUser, setTemporaryStorage } from '@/redux/slices/authSlice';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EmptyState from '@/components/dashboard/EmptyState';
import QuizCard from '@/components/dashboard/QuizCard';
import { hasDatePassed } from '@/utils/date';
import { LayoutGrid, Timer, Clock, Calendar } from 'lucide-react';

export default function Quizzes() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const type = user?.accountable_type === "App\\Models\\Student" ? "student" : "teacher";
    const [activeFilter, setActiveFilter] = useState('All');

    const { data: quizzesData, isLoading } = useGetQuizzesQuery({ type, id: user?.id }, {
        skip: !user?.id
    });

    const { data: quizDataResults } = useGetQuizDataQuery(undefined, {
        skip: !user?.id
    });

    const { data: groupsData } = useGetGroupsQuery({ type, id: user?.id }, {
        skip: !user?.id
    });

    const quizzes = quizzesData || [];
    const quizData = quizDataResults?.data || quizDataResults || { group: [], class: [], quiz: [] };
    const groups = groupsData || [];

    const filters = [
        { label: 'All', icon: LayoutGrid, color: 'from-indigo-500 to-purple-600' },
        { label: 'Live', icon: Timer, color: 'from-emerald-400 to-cyan-500' },
        { label: 'Pending', icon: Clock, color: 'from-amber-400 to-orange-500' },
        { label: 'Closed', icon: Calendar, color: 'from-rose-400 to-red-600' },
    ];

    const getFilteredQuizzes = () => {
        if (activeFilter === 'All') return quizzes;

        return quizzes.filter(quiz => {
            const isStarted = hasDatePassed(quiz.start_at);
            const isEnded = hasDatePassed(quiz.end_at);

            if (activeFilter === 'Live') return isStarted && !isEnded;
            if (activeFilter === 'Pending') return !isStarted;
            if (activeFilter === 'Closed') return isEnded;
            return true;
        });
    };

    const filteredQuizzes = getFilteredQuizzes();

    const handleQuizClick = (quiz) => {
        dispatch(setTemporaryStorage(quiz));
        if (type === "student") {
            navigate(`/dashboard/quizzes/details?code=${quiz.quiz_code}`);
        } else {
            navigate(`/dashboard/teacher/quizzes?code=${quiz.quiz_code}`);
        }
    };

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24 lg:pb-10">
                <div className="w-full relative">
                    {/* Promotional Banner */}
                    <PromotionalBanner quizzes={quizzes} quizData={quizData} groups={groups} />

                    {/* Quizzes Section */}
                    <div className="px-6 lg:px-10 mt-12">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
                            <div>
                                <h2 className="text-3xl font-black text-white tracking-tight leading-none mb-2 uppercase italic">
                                    All Quizzes
                                </h2>
                                <div className="h-1 w-16 bg-gradient-to-r from-[#a6b1ff] to-transparent rounded-full" />
                            </div>

                            {/* Filters */}
                            <div className="flex items-center gap-2 p-1.5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl">
                                {filters.map((filter) => {
                                    const Icon = filter.icon;
                                    const isActive = activeFilter === filter.label;
                                    return (
                                        <button
                                            key={filter.label}
                                            onClick={() => setActiveFilter(filter.label)}
                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 ${isActive
                                                    ? `bg-gradient-to-r ${filter.color} text-white shadow-lg shadow-black/20 scale-105`
                                                    : 'text-white/40 hover:text-white/70 hover:bg-white/5'
                                                }`}
                                        >
                                            <Icon size={14} className={isActive ? "animate-pulse" : ""} />
                                            <span className="hidden sm:inline">{filter.label}</span>
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        {isLoading ? (
                            <div className="py-12 flex justify-center">
                                <div className="relative w-10 h-10">
                                    <div className="absolute inset-0 rounded-full border-2 border-[#a6b1ff]/20"></div>
                                    <div className="absolute inset-0 rounded-full border-t-2 border-[#a6b1ff] animate-spin"></div>
                                </div>
                            </div>
                        ) : filteredQuizzes.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white/5 border border-white/10 rounded-[2rem] p-12 text-center"
                            >
                                <EmptyState
                                    title={activeFilter === 'All' ? "No Quizzes Found" : `No ${activeFilter} Quizzes`}
                                    description={activeFilter === 'All'
                                        ? "Launch your first challenge or join one to see it here."
                                        : `There are currently no quizzes in the ${activeFilter} category.`
                                    }
                                />
                                {activeFilter !== 'All' && (
                                    <button
                                        onClick={() => setActiveFilter('All')}
                                        className="mt-6 text-[#a6b1ff] font-black uppercase text-xs tracking-widest hover:underline"
                                    >
                                        Show All Quizzes
                                    </button>
                                )}
                            </motion.div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredQuizzes.map((quiz, index) => (
                                    <QuizCard
                                        key={quiz.id || index}
                                        quiz={quiz}
                                        index={index}
                                        onClick={() => handleQuizClick(quiz)}
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

const PromotionalBanner = ({ quizzes, quizData, groups }) => {
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const isStudent = user?.accountable_type === "App\\Models\\Student";
    const isTeacher = user?.accountable_type === "App\\Models\\Teacher";
    const isAdmin = user?.is_admin || user?.role === 'admin';

    // Calculate statistics
    const totalQuizzes = quizzes?.length || 0;
    const activeQuizzes = quizzes?.filter(q => {
        const now = new Date();
        return new Date(q.start_at) <= now && new Date(q.end_at) >= now;
    }).length || 0;
    const totalPlays = quizData?.quiz?.length || 0;

    const getBannerContent = () => {
        if (isStudent) {
            return {
                badge: "CHALLENGER",
                badgeColor: "from-blue-400 to-indigo-500",
                title: "Ready for a Challenge?",
                subtitle: "Join a quiz with a code or explore available challenges to earn XP.",
                ctaText: "JOIN WITH CODE",
                ctaAction: () => navigate('/dashboard/quizzes?join=true'),
                icon: Gamepad2
            };
        } else if (isTeacher || isAdmin) {
            return {
                badge: isAdmin ? "ADMIN" : "CREATOR",
                badgeColor: isAdmin ? "from-rose-500 to-orange-500" : "from-purple-500 to-indigo-600",
                title: "Build Your Masterpiece!",
                subtitle: "Create interactive quizzes and challenge your students in real-time.",
                ctaText: "CREATE NEW QUIZ",
                ctaAction: () => navigate('/dashboard/teacher/quizzes'),
                icon: Sparkles
            };
        }
        return {
            badge: "EXPLORE",
            badgeColor: "from-purple-400 to-pink-500",
            title: "Expand Your Knowledge!",
            subtitle: "Browse through our collection of interactive learning challenges.",
            ctaText: "GET STARTED",
            ctaAction: () => navigate('/dashboard'),
            icon: BookOpen
        };
    };

    const content = getBannerContent();
    const IconComponent = content.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 sm:mx-6 lg:mx-10 mt-6 lg:mt-8 relative overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-gradient-to-br from-[#121431] via-[#1a1f4d] to-[#121431] border border-white/10 shadow-2xl"
        >
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-[80px]" />

            <div className="relative z-10 p-6 sm:p-8 lg:p-12">
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 mb-6 lg:mb-8">
                    <div className="flex-1 space-y-3 lg:space-y-4 w-full lg:w-auto text-center lg:text-left">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${content.badgeColor} border border-white/20 shadow-lg`}>
                            <IconComponent className="text-white" size={16} />
                            <span className="text-white font-black text-sm uppercase tracking-wider italic">{content.badge}</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight uppercase italic tracking-tight">
                            {content.title}
                        </h2>

                        <p className="text-white/70 text-sm sm:text-base lg:text-lg font-medium max-w-md mx-auto lg:mx-0">
                            {content.subtitle}
                        </p>

                        <div className="hidden sm:flex flex-col gap-2 pt-2">
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-white/50 italic">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#a6b1ff]" />
                                <span>Total Challenges Hosted: {totalQuizzes}</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-white/50 italic">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#a6b1ff]" />
                                <span>Total Participants: {totalPlays}</span>
                            </div>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={content.ctaAction}
                            className="mt-4 w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-[#a6b1ff] text-[#0a0a0a] font-black text-sm sm:text-base uppercase tracking-wide shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 group"
                        >
                            {content.ctaText}
                            <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" size={18} />
                        </motion.button>
                    </div>

                    <div className="relative hidden sm:block">
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10"
                        >
                            <div className={`w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-[2rem] bg-gradient-to-br ${content.badgeColor} flex items-center justify-center shadow-2xl rotate-3 border-2 border-white/20`}>
                                <Trophy className="text-white" size={64} />
                            </div>
                        </motion.div>
                        <div className={`absolute inset-0 bg-gradient-to-br ${content.badgeColor} opacity-20 rounded-full blur-3xl`} />
                    </div>
                </div>

                <div className="relative z-10 pt-6 border-t border-white/5">
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
                        {[
                            { label: "Total Quizzes", value: totalQuizzes, icon: BookOpen },
                            { label: "Active Now", value: activeQuizzes, icon: Sparkles, highlight: true },
                            { label: "Total Plays", value: totalPlays, icon: Gamepad2 }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white/5 backdrop-blur-md rounded-2xl p-3 sm:p-4 lg:p-5 border border-white/5 hover:border-[#a6b1ff]/30 transition-all cursor-pointer group flex flex-col items-center text-center"
                            >
                                <span className={`text-2xl sm:text-3xl lg:text-4xl font-black ${stat.highlight ? 'text-[#a6b1ff]' : 'text-white'} group-hover:scale-110 transition-transform`}>
                                    {stat.value}
                                </span>
                                <span className="text-[9px] sm:text-[10px] lg:text-xs text-white/40 font-bold uppercase tracking-[0.2em] mt-1 italic">
                                    {stat.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
