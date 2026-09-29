import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    Users,
    Trophy,
    Target,
    Zap,
    ArrowLeft,
    Copy,
    ExternalLink,
    Clock,
    ShieldCheck,
    ShieldAlert,
    Brain,
    Search,
    ChevronRight,
    Activity,
    Mail
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { selectCurrentUser, setTemporaryStorage, selectTempStorage } from '@/redux/slices/authSlice';
import {
    useGetQuizzesByGroupIdQuery,
    useGetGroupStudentsQuery
} from '@/redux/api/teacherApi';
import { useVerifyGroupCodeQuery } from '@/redux/api/studentApi';
import { useGetGroupLeaderboardQuery } from '@/redux/api/leaderboardApi';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CopyIcon from '@/components/dashboard/CopyIcon';

export default function TeacherGroupDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const tempStorage = useSelector(selectTempStorage);

    const queryParams = new URLSearchParams(location.search);
    const groupCode = queryParams.get('code');

    // Fetch essential data
    const { data: groupDataResult, isLoading: isLoadingGroup } = useVerifyGroupCodeQuery(groupCode, {
        skip: !groupCode
    });
    const { data: leaderboardDataResult, isLoading: isLoadingLeaderboard } = useGetGroupLeaderboardQuery(groupCode, {
        skip: !groupCode
    });
    const { data: studentDataResult, isLoading: isLoadingStudents } = useGetGroupStudentsQuery(groupCode, {
        skip: !groupCode
    });
    const { data: quizDataResult, isLoading: isLoadingQuizzes } = useGetQuizzesByGroupIdQuery(groupCode, {
        skip: !groupCode
    });

    const groupInfo = groupDataResult?.data || groupDataResult || tempStorage || {};
    const leaderboard = Array.isArray(leaderboardDataResult) ? leaderboardDataResult : (leaderboardDataResult?.data || []);
    const students = Array.isArray(studentDataResult) ? studentDataResult : (studentDataResult?.data || []);
    const quizzes = Array.isArray(quizDataResult) ? quizDataResult : (quizDataResult?.data || []);

    const [activeTab, setActiveTab] = useState('overview');

    if (isLoadingGroup || !groupCode) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="relative w-12 h-12">
                        <div className="absolute inset-0 rounded-full border-4 border-[#a6b1ff]/10"></div>
                        <div className="absolute inset-0 rounded-full border-t-4 border-[#a6b1ff] animate-spin"></div>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    const hasDatePassed = (date) => new Date(date) < new Date();

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px] -ml-40 -mb-40" />

                <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 relative z-10 w-full">
                    {/* Header Controls */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div className="space-y-4">
                            <motion.button
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                onClick={() => navigate('/dashboard/groups')}
                                className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] hover:text-[#a6b1ff] transition-colors group"
                            >
                                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                Sector Navigation
                            </motion.button>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-2xl bg-[#a6b1ff]/10 border border-[#a6b1ff]/20 flex items-center justify-center text-[#a6b1ff] shadow-2xl">
                                    <Users size={32} />
                                </div>
                                <div>
                                    <h1 className="text-4xl lg:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                                        {groupInfo.title || "Elite Squad"}
                                    </h1>
                                    <div className="flex items-center gap-3 mt-2">
                                        <p className="text-white/40 font-bold uppercase tracking-[0.1em] text-xs italic">Sector Code:</p>
                                        <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
                                            <span className="text-[#a6b1ff] font-black tracking-widest text-sm uppercase italic">{groupCode}</span>
                                            <CopyIcon code={groupCode} size={14} className="text-white/20 hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 bg-[#1a1a1a]/40 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 pr-10">
                            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
                                <Activity size={24} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Operational Status</p>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    <p className="text-lg font-black text-white leading-none italic uppercase">Active Sync</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Stats HUD */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        {[
                            { label: "Squad Size", value: students.length, icon: Users, color: "text-blue-400" },
                            { label: "Mission Count", value: quizzes.length, icon: Brain, color: "text-purple-400" },
                            { label: "Avg Efficiency", value: "84%", icon: Target, color: "text-emerald-400" },
                            { label: "Elite Bounty", value: "12k XP", icon: Trophy, color: "text-amber-400" }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * i }}
                                className="bg-[#1a1a1a]/40 backdrop-blur-xl border border-white/5 rounded-3xl p-6 group hover:border-white/10 transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className={cn("p-3 rounded-xl bg-white/5", stat.color)}>
                                        <stat.icon size={20} />
                                    </div>
                                    <div className="h-1 w-8 bg-white/5 rounded-full" />
                                </div>
                                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                                <p className="text-3xl font-black text-white italic">{stat.value}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        {/* Leaderboard Section */}
                        <div className="lg:col-span-8 space-y-8">
                            <div className="bg-[#1a1a1a]/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 lg:p-10 relative overflow-hidden shadow-2xl">
                                <div className="flex items-center justify-between mb-10">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-[#a6b1ff]">
                                            <Trophy size={16} />
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Operational Rankings</span>
                                        </div>
                                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">Squad Leaderboard</h2>
                                    </div>
                                    <div className="px-4 py-2 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-2">
                                        <Search size={14} className="text-white/20" />
                                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest italic leading-none">Filter Quizzes</span>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {isLoadingLeaderboard ? (
                                        <div className="py-12 flex justify-center">
                                            <div className="w-8 h-8 rounded-full border-2 border-[#a6b1ff]/20 border-t-[#a6b1ff] animate-spin" />
                                        </div>
                                    ) : leaderboard.length === 0 ? (
                                        <div className="py-12 text-center bg-white/5 border border-dashed border-white/10 rounded-3xl">
                                            <p className="text-white/20 font-black italic uppercase tracking-widest text-xs">No synchronization data available</p>
                                        </div>
                                    ) : (
                                        leaderboard.map((item, i) => (
                                            <motion.div
                                                key={i}
                                                whileHover={{ x: 10 }}
                                                className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all group"
                                            >
                                                <div className="flex items-center gap-6">
                                                    <div className={cn(
                                                        "w-10 h-10 rounded-xl flex items-center justify-center font-black italic shadow-lg",
                                                        i === 0 ? "bg-amber-400 text-black shadow-amber-400/20" :
                                                            i === 1 ? "bg-slate-300 text-black shadow-slate-300/20" :
                                                                i === 2 ? "bg-orange-400 text-black shadow-orange-400/20" : "bg-white/5 text-white/40"
                                                    )}>
                                                        {i + 1}
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <Avatar className="h-12 w-12 rounded-xl border-2 border-white/5">
                                                            <AvatarImage src={item.student?.image} />
                                                            <AvatarFallback className="bg-white/5 text-white/20 font-black text-sm uppercase italic">
                                                                {item.student?.last_name?.charAt(0) || <Users size={16} />}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-black text-white uppercase italic tracking-tight">{item.student?.last_name}, {item.student?.first_name}</p>
                                                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest leading-none mt-1">{item.student?.email}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-black text-white italic leading-none">{item.student?.xp || 0}<span className="text-[10px] text-white/20 uppercase tracking-widest ml-1">XP</span></p>
                                                    <div className="flex items-center justify-end gap-1 mt-1 text-emerald-400">
                                                        <Zap size={10} fill="currentColor" />
                                                        <span className="text-[8px] font-black uppercase tracking-widest">Active Sync</span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </div>
                            </div>

                            {/* Missions Section */}
                            <div className="bg-[#1a1a1a]/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 lg:p-10">
                                <div className="flex items-center justify-between mb-10">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-[#a6b1ff]">
                                            <Brain size={16} />
                                            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Deployment Status</span>
                                        </div>
                                        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">Active Missions</h2>
                                    </div>
                                    <button
                                        onClick={() => navigate('/dashboard/teacher/quizzes')}
                                        className="h-12 px-6 bg-[#a6b1ff] text-black rounded-xl font-black uppercase tracking-widest text-[10px] hover:bg-white transition-all shadow-2xl shadow-[#a6b1ff]/20 italic"
                                    >
                                        New Deployment
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {isLoadingQuizzes ? (
                                        <div className="col-span-full py-12 flex justify-center">
                                            <div className="w-8 h-8 rounded-full border-2 border-[#a6b1ff]/20 border-t-[#a6b1ff] animate-spin" />
                                        </div>
                                    ) : quizzes.length === 0 ? (
                                        <div className="col-span-full py-12 text-center bg-white/5 border border-dashed border-white/10 rounded-3xl">
                                            <p className="text-white/20 font-black italic uppercase tracking-widest text-xs">No quizzes in this group</p>
                                        </div>
                                    ) : (
                                        quizzes.map((quiz, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.1 * i }}
                                                onClick={() => {
                                                    dispatch(setTemporaryStorage(quiz));
                                                    navigate(`/dashboard/quizzes/details?code=${quiz.quiz_code}`);
                                                }}
                                                className="p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#a6b1ff]/30 transition-all cursor-pointer group relative overflow-hidden"
                                            >
                                                <div className="relative z-10">
                                                    <div className="flex items-center justify-between mb-4">
                                                        {!hasDatePassed(quiz.start_at) ? (
                                                            <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                                                                <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest italic">Pending</span>
                                                            </div>
                                                        ) : hasDatePassed(quiz.end_at) ? (
                                                            <div className="px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full">
                                                                <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest italic">Closed</span>
                                                            </div>
                                                        ) : (
                                                            <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center gap-1.5">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                                <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest italic">Live Node</span>
                                                            </div>
                                                        )}
                                                        <div className="flex items-center gap-2">
                                                            <span className="text-[10px] font-black text-white/20 uppercase tracking-widest leading-none bg-white/5 px-2 py-1 rounded-md">{quiz.quiz_code}</span>
                                                            <ChevronRight size={14} className="text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                                        </div>
                                                    </div>
                                                    <h3 className="text-xl font-black text-white italic uppercase tracking-tighter leading-tight mb-2 group-hover:text-[#a6b1ff] transition-colors">{quiz.title}</h3>
                                                    <div className="flex items-center gap-4 pt-4 border-t border-white/5 mt-4">
                                                        <div className="flex items-center gap-1.5 text-white/40">
                                                            <Target size={12} />
                                                            <span className="text-[10px] font-bold uppercase">{quiz.QuizQuestions || 0} Questions</span>
                                                        </div>
                                                        <div className="flex items-center gap-1.5 text-white/40">
                                                            <Trophy size={12} />
                                                            <span className="text-[10px] font-bold uppercase">{quiz.xp || 0} XP Bounty</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Sidebar: Student Info */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="bg-[#1a1a1a]/40 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-8 space-y-10">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2 text-[#a6b1ff]">
                                        <Users size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Squad Composition</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter leading-none">Personnel</h2>
                                        <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/5">
                                            <span className="text-xs font-black text-white italic tracking-widest">{students.length}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                                    {isLoadingStudents ? (
                                        <div className="py-12 flex justify-center">
                                            <div className="w-8 h-8 rounded-full border-2 border-[#a6b1ff]/20 border-t-[#a6b1ff] animate-spin" />
                                        </div>
                                    ) : students.length === 0 ? (
                                        <div className="py-12 text-center bg-white/5 border border-dashed border-white/10 rounded-3xl">
                                            <p className="text-white/20 font-black italic uppercase tracking-widest text-xs">No personnel detected</p>
                                        </div>
                                    ) : (
                                        students.map((student, i) => (
                                            <motion.div
                                                key={i}
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.05 * i }}
                                                className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all group"
                                            >
                                                <Avatar className="h-10 w-10 rounded-xl">
                                                    <AvatarImage src={student.image} />
                                                    <AvatarFallback className="bg-white/5 text-white/20 font-black text-xs uppercase italic">
                                                        {student.last_name?.charAt(0) || <Users size={14} />}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-black text-white text-sm uppercase italic tracking-tight truncate">{student.last_name}, {student.first_name}</p>
                                                    <p className="text-[8px] font-bold text-white/20 uppercase tracking-[0.15em] leading-none mt-1 truncate">{student.email}</p>
                                                </div>
                                                <button className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/20 hover:text-[#a6b1ff] transition-colors">
                                                    <Mail size={14} />
                                                </button>
                                            </motion.div>
                                        ))
                                    )}
                                </div>

                                <div className="pt-8 border-t border-white/5">
                                    <div className="flex items-start gap-4 p-5 bg-indigo-500/5 rounded-[2rem] border border-indigo-500/10">
                                        <ShieldCheck size={20} className="text-indigo-400 shrink-0 mt-0.5" />
                                        <div>
                                            <p className="text-[10px] font-black text-indigo-400/60 uppercase tracking-widest leading-none mb-1">Encrypted Sector</p>
                                            <p className="text-[9px] font-bold text-indigo-400/40 uppercase tracking-widest leading-loose">
                                                All squad behavioral data and mission results are synchronizing in real-time with the central hub.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="bg-rose-500/5 border border-rose-500/10 rounded-[2.5rem] p-8 space-y-6"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500">
                                        <ShieldAlert size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-rose-500/40 uppercase tracking-[0.2em]">Security Protocol</p>
                                        <p className="text-lg font-black text-rose-500 italic uppercase leading-none">Sector Lockdown</p>
                                    </div>
                                </div>
                                <p className="text-[9px] font-bold text-rose-500/40 uppercase tracking-widest leading-loose">
                                    Closing this group will remove all quizzes and disconnect all members immediately. Proceed with extreme caution.
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
