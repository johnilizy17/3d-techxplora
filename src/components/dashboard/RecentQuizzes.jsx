import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Trophy, Clock, Timer, Calendar, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetQuizzesQuery } from '@/redux/api/teacherApi';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import { setTemporaryStorage } from '@/redux/slices/authSlice';
import EmptyState from './EmptyState';
import CopyIcon from './CopyIcon';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { timeAgo, startCountdown, hasDatePassed } from '@/utils/date';

export default function RecentQuizzes() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const type = user?.accountable_type === "App\\Models\\Student" ? "student" : "teacher";

    const { data: quizzesData, isLoading } = useGetQuizzesQuery({ type, id: user?.id }, {
        skip: !user?.id
    });

    const quizzes = quizzesData || [];
    // Only show first 3 for the dashboard
    const displayQuizzes = quizzes.slice(0, 3);

    const handleQuizClick = (quiz) => {
        dispatch(setTemporaryStorage(quiz));
        if (type === "student") {
            navigate(`/dashboard/quizzes/details?code=${quiz.quiz_code}`);
        } else {
            navigate(`/dashboard/teacher/quizzes?code=${quiz.quiz_code}`);
        }
    };

    if (isLoading) {
        return (
            <div className="py-12 flex justify-center">
                <div className="relative w-10 h-10">
                    <div className="absolute inset-0 rounded-full border-2 border-[#a6b1ff]/20"></div>
                    <div className="absolute inset-0 rounded-full border-t-2 border-[#a6b1ff] animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-8 space-y-6">
            <div className="px-6 lg:px-0 flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-black text-white tracking-tight leading-none mb-2">RECENT QUIZZES</h2>
                    <div className="h-1 w-12 bg-gradient-to-r from-[#a6b1ff] to-transparent rounded-full" />
                </div>
                <button
                    onClick={() => navigate('/dashboard/quizzes')}
                    className="group text-sm font-black text-[#a6b1ff] hover:text-white flex items-center gap-2 transition-all duration-300 uppercase tracking-widest"
                >
                    Expand All
                    <div className="p-1 rounded-full bg-white/5 group-hover:bg-[#a6b1ff]/20 transition-colors">
                        <ChevronRight size={16} />
                    </div>
                </button>
            </div>

            {quizzes.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-[2rem] p-12">
                    <EmptyState title="No Quizzes Found" description="Launch your first challenge or join one to see it here." />
                </div>
            ) : (
                <>
                    {/* Grid for desktop, scroll for mobile */}
                    <div className="hidden lg:grid lg:grid-cols-3 gap-8">
                        {displayQuizzes.map((quiz, index) => (
                            <QuizCard key={quiz.id || index} quiz={quiz} index={index} onClick={() => handleQuizClick(quiz)} />
                        ))}
                    </div>

                    <div className="lg:hidden">
                        <ScrollArea className="w-full whitespace-nowrap pb-6">
                            <div className="flex gap-6 px-6">
                                {displayQuizzes.map((quiz, index) => (
                                    <QuizCard key={quiz.id || index} quiz={quiz} index={index} onClick={() => handleQuizClick(quiz)} />
                                ))}
                            </div>
                            <ScrollBar orientation="horizontal" className="h-1.5 bg-white/5" />
                        </ScrollArea>
                    </div>
                </>
            )}
        </div>
    );
}

const QuizCard = ({ quiz, index, onClick }) => {
    const [countdown, setCountdown] = useState("00:00:00");
    const isStarted = hasDatePassed(quiz.start_at);
    const isEnded = hasDatePassed(quiz.end_at);

    useEffect(() => {
        let interval;
        if (isStarted && !isEnded) {
            interval = startCountdown(quiz.end_at, setCountdown);
        }
        return () => interval && clearInterval(interval);
    }, [quiz.end_at, isStarted, isEnded]);

    const getStatus = () => {
        if (!isStarted) return { label: 'Pending', color: 'from-amber-400 to-orange-500', icon: Clock };
        if (isEnded) return { label: 'Closed', color: 'from-rose-400 to-red-600', icon: Calendar };
        return { label: 'Live', color: 'from-emerald-400 to-cyan-500', icon: Timer };
    };

    const status = getStatus();
    const StatusIcon = status.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            onClick={onClick}
            className="w-[300px] lg:w-full min-h-[220px] shrink-0 rounded-[2.5rem] bg-[#1a1a1a]/40 backdrop-blur-xl border border-white/5 hover:border-[#a6b1ff]/30 transition-all duration-500 cursor-pointer overflow-hidden group flex flex-col relative shadow-2xl"
        >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05] pointer-events-none" />

            {/* Animated Bottom Glow */}
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-[#a6b1ff]/10 rounded-full blur-[80px] group-hover:bg-[#a6b1ff]/20 transition-all duration-700" />

            {/* Header Section */}
            <div className="p-6 pb-2 flex justify-between items-start relative z-10">
                <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${status.color} shadow-lg shadow-black/20`}>
                            <StatusIcon className="w-3 h-3 text-white" />
                            <span className="text-[10px] font-black text-white uppercase tracking-tighter italic">{status.label}</span>
                        </div>
                        <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{timeAgo(quiz.created_at)}</span>
                    </div>
                    <h3 className="text-xl font-black text-white line-clamp-2 leading-[1.1] uppercase italic tracking-tighter group-hover:text-[#a6b1ff] transition-colors duration-300">
                        {quiz.title}
                    </h3>
                </div>

                <div className="flex flex-col items-center justify-center w-14 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-transparent border border-white/10 shadow-xl backdrop-blur-md relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-[#a6b1ff]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Trophy size={20} className="text-[#ffb585] mb-1.5 relative z-10 drop-shadow-[0_0_8px_rgba(255,181,133,0.5)]" />
                    <span className="text-[10px] font-black text-white/40 leading-none relative z-10 uppercase italic">XP</span>
                    <span className="text-lg font-black text-white leading-none mt-1 relative z-10 italic">{quiz.xp || 0}</span>
                </div>
            </div>

            {/* Middle Section - Description */}
            <div className="px-6 relative z-10">
                <p className="text-xs text-white/40 line-clamp-2 font-medium leading-relaxed italic pr-4">
                    {quiz.description || "Challenge your knowledge in this interactive collectible hunt."}
                </p>
            </div>

            {/* Footer Section */}
            <div className="mt-auto p-6 space-y-4 relative z-10">
                {/* Code and Copy */}
                <div className="flex items-center gap-2">
                    <div className="flex-1 h-12 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-between px-5 group/code hover:border-[#a6b1ff]/20 transition-colors">
                        <span className="text-sm font-black text-[#a6b1ff] uppercase tracking-wider">{quiz.quiz_code}</span>
                    </div>
                    <CopyIcon code={quiz.quiz_code} className="h-12 w-12 rounded-2xl bg-[#a6b1ff]/10 border border-[#a6b1ff]/10 hover:bg-[#a6b1ff] hover:text-[#0a0a0a] transition-all duration-300 shadow-lg" />
                </div>

                {/* Date / Timer Logic */}
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                            <Clock size={14} className="text-[#a6b1ff]" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-white/20 uppercase tracking-wider">Timeline</span>
                            <span className="text-[11px] font-black text-white/80 uppercase italic tracking-tight">
                                {isStarted && !isEnded ? (
                                    <span className="text-[#a6b1ff] animate-pulse">Ending in {countdown}</span>
                                ) : (
                                    <span>{new Date(quiz.start_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - {new Date(quiz.end_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink size={16} className="text-white/20" />
                    </div>
                </div>
            </div>
        </motion.div>
    );
};
