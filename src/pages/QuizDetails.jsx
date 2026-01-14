import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate, useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    ArrowLeft,
    Clock,
    Trophy,
    Users,
    Calendar,
    Crown,
    Share2,
    Heart,
    Play,
    Timer,
    CheckCircle2,
    Target,
    Zap,
    AlertCircle,
    ChevronRight
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { selectCurrentUser, setTemporaryStorage, selectTempStorage } from '@/redux/slices/authSlice';
import { useGetQuizLeaderboardQuery } from '@/redux/api/leaderboardApi';
import { useVerifyQuizCodeQuery } from '@/redux/api/studentApi';
import { hasDatePassed, startCountdown, formatDate } from '@/utils/date';
import { toast } from 'sonner';

export default function QuizDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const tempStorage = useSelector(selectTempStorage);

    const queryParams = new URLSearchParams(location.search);
    const quizCode = queryParams.get('code');

    // Fetch quiz data if not in tempStorage or if code mismatch
    const { data: verifiedQuizData, isLoading: isVerifying } = useVerifyQuizCodeQuery(quizCode, {
        skip: !quizCode
    });

    const quiz = verifiedQuizData?.data || verifiedQuizData || tempStorage;
    const isOwner = user?.id === quiz?.teacher_id;

    // Fetch Leaderboard if quiz is closed or results available
    const isEnded = quiz ? hasDatePassed(quiz.end_at) : false;
    const { data: leaderboardData, isLoading: isLoadingLeaderboard } = useGetQuizLeaderboardQuery(quizCode, {
        skip: !quizCode || !isEnded
    });

    const leaderboard = Array.isArray(leaderboardData) ? leaderboardData : (leaderboardData?.data || []);

    const [countdown, setCountdown] = useState("00:00:00");
    const isStarted = quiz ? hasDatePassed(quiz.start_at) : false;

    useEffect(() => {
        let interval;
        if (quiz?.start_at && !isStarted) {
            interval = startCountdown(quiz.start_at, setCountdown);
        } else if (quiz?.end_at && isStarted && !isEnded) {
            interval = startCountdown(quiz.end_at, setCountdown);
        }
        return () => interval && clearInterval(interval);
    }, [quiz, isStarted, isEnded]);

    if (isVerifying && !quiz) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="relative w-12 h-12">
                        <div className="absolute inset-0 rounded-full border-4 border-indigo-500/20" />
                        <div className="absolute inset-0 rounded-full border-t-4 border-indigo-500 animate-spin" />
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    if (!quiz) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-6">
                    <div className="w-20 h-20 rounded-[2.5rem] bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-500">
                        <AlertCircle size={40} />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Node Not Found</h2>
                        <p className="text-white/40 text-sm font-medium max-w-xs">The synchronized assessment record could not be located in our database.</p>
                    </div>
                    <button onClick={() => navigate('/dashboard/quizzes')} className="px-8 py-3 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-[#a6b1ff] transition-all">
                        Return to Lab
                    </button>
                </div>
            </DashboardLayout>
        );
    }

    const handleAction = () => {
        dispatch(setTemporaryStorage(quiz));
        if (isEnded) {
            navigate(`/dashboard/quizzes/result?code=${quiz.quiz_code}`);
        } else if (isStarted) {
            navigate(`/dashboard/quizzes/start?code=${quiz.quiz_code}`);
        } else {
            toast.info("The engagement window has not initialized yet.");
        }
    };

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
                    {/* Breadcrumbs */}
                    <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate('/dashboard/quizzes')}
                        className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] hover:text-[#a6b1ff] transition-colors group mb-12"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Assessments
                    </motion.button>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Left: Main Info */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Quiz Title and Description */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${isEnded ? 'from-rose-500 to-red-600' : isStarted ? 'from-emerald-400 to-cyan-500' : 'from-amber-400 to-orange-500'} border border-white/20 shadow-lg`}>
                                        <span className="text-white font-black text-[10px] uppercase tracking-widest italic leading-none">
                                            {isEnded ? 'Closed' : isStarted ? 'Live' : 'Pending'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                                        <Target size={12} className="text-[#a6b1ff]" />
                                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Code: {quiz.quiz_code}</span>
                                    </div>
                                </div>

                                <h1 className="text-5xl lg:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
                                    {quiz.title}
                                </h1>

                                <p className="text-xl font-medium text-white/40 leading-relaxed max-w-2xl">
                                    {quiz.description || "Challenge your intelligence and earn XP in this interactive curriculum-aligned assessment."}
                                </p>
                            </div>

                            {/* Status Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="relative bg-white/[0.03] border border-white/10 rounded-[3rem] p-10 lg:p-14 overflow-hidden">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />

                                    <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
                                        <div className="space-y-8 flex-1 w-full">
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-white/20">
                                                        <Trophy size={14} />
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Rewards</span>
                                                    </div>
                                                    <p className="text-3xl font-black text-[#ffb585] italic">{quiz.xp || 0} XP</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-white/20">
                                                        <Clock size={14} />
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Duration</span>
                                                    </div>
                                                    <p className="text-3xl font-black text-white italic">{quiz.duration || 0}m</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-white/20">
                                                        <Zap size={14} />
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Nodes</span>
                                                    </div>
                                                    <p className="text-3xl font-black text-white italic">{quiz.QuizQuestions || 0}</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4 pt-8 border-t border-white/5">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Synchronization Timeline</span>
                                                    {!isEnded && (
                                                        <span className={`text-[10px] font-black ${isStarted ? 'text-emerald-400' : 'text-amber-400'} uppercase tracking-widest flex items-center gap-2`}>
                                                            <div className={`w-1.5 h-1.5 rounded-full ${isStarted ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                                                            {isStarted ? "Assessment Active" : "Initializing Sequence"}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-baseline gap-4">
                                                    {isEnded ? (
                                                        <p className="text-4xl font-black text-rose-500 italic uppercase">Closed Session</p>
                                                    ) : (
                                                        <>
                                                            <p className="text-5xl lg:text-7xl font-mono font-black text-[#a6b1ff] italic tracking-tighter">
                                                                {countdown}
                                                            </p>
                                                            <span className="text-sm font-black text-white/20 uppercase italic tracking-widest">
                                                                Remaining
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleAction}
                                            className={`shrink-0 w-full md:w-56 h-56 rounded-[3rem] ${isEnded ? 'bg-white hover:bg-[#a6b1ff]' : 'bg-[#a6b1ff] hover:bg-white'} text-black flex flex-col items-center justify-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-2xl relative overflow-hidden group/btn`}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                                            {isEnded ? (
                                                <>
                                                    <Trophy size={48} />
                                                    <span className="font-black uppercase tracking-[0.2em] text-xs">Review Results</span>
                                                </>
                                            ) : isStarted ? (
                                                <>
                                                    <Play size={48} fill="currentColor" />
                                                    <span className="font-black uppercase tracking-[0.2em] text-xs">Join Mission</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Timer size={48} />
                                                    <span className="font-black uppercase tracking-[0.2em] text-xs">Locked</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Timeline Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-white/5 border border-white/5 rounded-3xl p-6 flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                        <Calendar size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Window Open</p>
                                        <p className="text-lg font-black text-white italic">{formatDate(quiz.start_at)}</p>
                                    </div>
                                </div>
                                <div className="bg-white/5 border border-white/5 rounded-3xl p-6 flex items-center gap-5">
                                    <div className="w-14 h-14 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-400">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Window Close</p>
                                        <p className="text-lg font-black text-white italic">{formatDate(quiz.end_at)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar: Leaderboard or Participation */}
                        <div className="space-y-8">
                            <div className="bg-white/[0.03] border border-white/10 rounded-[3rem] p-8 flex flex-col min-h-[500px]">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-black text-white italic uppercase tracking-tighter">
                                        {isEnded ? "Leaderboard" : "Participation"}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <Users size={16} className="text-white/20" />
                                        <span className="text-lg font-black text-white italic">{leaderboard.length || 0}</span>
                                    </div>
                                </div>

                                <div className="flex-1 space-y-6 overflow-y-auto custom-scrollbar pr-2">
                                    {isEnded ? (
                                        leaderboard.length > 0 ? (
                                            leaderboard.map((entry, idx) => (
                                                <motion.div
                                                    key={idx}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    className={`flex items-center justify-between p-4 rounded-2xl border ${idx === 0 ? 'bg-amber-500/10 border-amber-500/30' : 'bg-white/5 border-white/5'}`}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${idx === 0 ? 'bg-amber-500 text-black' : 'text-white/20'}`}>
                                                            {idx + 1}
                                                        </div>
                                                        <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center relative overflow-hidden">
                                                            {entry.student?.photo ? (
                                                                <img src={entry.student.photo} alt="" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <span className="text-[10px] font-black text-white/40 uppercase tracking-tighter">
                                                                    {entry.student?.first_name?.[0]}{entry.student?.last_name?.[0]}
                                                                </span>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black text-white truncate max-w-[100px]">
                                                                {entry.student?.first_name} {entry.student?.last_name}
                                                            </p>
                                                            <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest">{entry.total_score || 0}% Score</p>
                                                        </div>
                                                    </div>
                                                    {idx < 3 && (
                                                        <Crown size={20} className={idx === 0 ? 'text-amber-400' : idx === 1 ? 'text-white/40' : 'text-orange-900/40'} />
                                                    )}
                                                </motion.div>
                                            ))
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-center px-4 gap-4">
                                                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/10">
                                                    <Trophy size={32} />
                                                </div>
                                                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">No results synchronized for this node yet.</p>
                                            </div>
                                        )
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-center px-4 gap-4">
                                            <div className="w-16 h-16 rounded-2xl bg-[#a6b1ff]/10 border border-[#a6b1ff]/20 flex items-center justify-center text-[#a6b1ff]">
                                                <Users size={32} />
                                            </div>
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Synchronization will begin once the session starts.</p>
                                        </div>
                                    )}
                                </div>

                                {/* Quick Tools */}
                                <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
                                    <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 font-black uppercase tracking-widest text-[9px] hover:bg-white/10 transition-all flex items-center justify-center gap-2 group">
                                        <Share2 size={14} className="group-hover:rotate-12 transition-transform" />
                                        Share Node Bridge
                                    </button>
                                    <button className="w-full py-4 rounded-2xl bg-white/5 border border-white/10 text-white/40 font-black uppercase tracking-widest text-[9px] hover:bg-rose-500/10 hover:text-rose-500 transition-all flex items-center justify-center gap-2 group border-none">
                                        <Heart size={14} className="group-hover:scale-125 transition-transform" />
                                        Add to Favorites
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
