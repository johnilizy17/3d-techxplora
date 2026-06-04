import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    ArrowLeft,
    Clock,
    Trophy,
    Users,
    Calendar,
    Crown,
    Share2,
    Play,
    Timer,
    CheckCircle2,
    Target,
    Zap,
    AlertCircle,
    ChevronRight
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { setTemporaryStorage, selectTempStorage } from '@/redux/slices/authSlice';
import { useGetQuizLeaderboardQuery } from '@/redux/api/leaderboardApi';
import { useVerifyQuizCodeQuery } from '@/redux/api/studentApi';
import { hasDatePassed, startCountdown, formatDate } from '@/utils/date';
import { toast } from 'sonner';

export default function QuizDetails() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const tempStorage = useSelector(selectTempStorage);

    const queryParams = new URLSearchParams(location.search);
    const quizCode = queryParams.get('code');

    // Fetch quiz data if not in tempStorage or if code mismatch
    const { data: verifiedQuizData, isLoading: isVerifying } = useVerifyQuizCodeQuery(quizCode, {
        skip: !quizCode
    });

    const quiz = verifiedQuizData?.data || verifiedQuizData || tempStorage;

    // Calculate quiz states
    const isStarted = quiz ? hasDatePassed(quiz.start_at) : false;
    const isEnded = quiz ? hasDatePassed(quiz.end_at) : false;

    // Fetch Leaderboard - show for live and ended quizzes
    const { data: leaderboardData, isLoading: isLoadingLeaderboard } = useGetQuizLeaderboardQuery(quizCode, {
        skip: !quizCode || !isStarted, // Show leaderboard once quiz starts
        pollingInterval: isStarted && !isEnded ? 30000 : 0, // Poll every 30s during live quiz
    });

    const leaderboard = Array.isArray(leaderboardData) ? leaderboardData : (leaderboardData?.data || []);
    const topLeaderboard = leaderboard.slice(0, 5); // Show top 5 in sidebar

    const [countdown, setCountdown] = useState("00:00:00");

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
                <div className="flex items-center justify-center min-h-[60vh] bg-white dark:bg-black">
                    <div className="relative w-12 h-12">
                        <div className="absolute inset-0 rounded-full border-4 border-indigo-200 dark:border-indigo-500/20" />
                        <div className="absolute inset-0 rounded-full border-t-4 border-indigo-600 dark:border-indigo-500 animate-spin" />
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    if (!quiz) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6 text-center px-6 bg-white dark:bg-black">
                    <div className="w-20 h-20 rounded-[2.5rem] bg-rose-100 dark:bg-rose-500/10 border-2 border-rose-300 dark:border-rose-500/20 flex items-center justify-center text-rose-600 dark:text-rose-500">
                        <AlertCircle size={40} />
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">Quiz Not Found</h2>
                        <p className="text-gray-600 dark:text-white/40 text-sm font-medium max-w-xs">Oops! We couldn't find this quiz. It might have been removed.</p>
                    </div>
                    <button onClick={() => navigate('/dashboard/quizzes')} className="px-8 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-white dark:to-white text-white dark:text-black font-black uppercase text-xs tracking-widest hover:from-indigo-600 hover:to-purple-700 dark:hover:from-[#a6b1ff] dark:hover:to-[#a6b1ff] transition-all shadow-lg">
                        Back to Quizzes
                    </button>
                </div>
            </DashboardLayout>
        );
    }

    const handleAction = () => {
        dispatch(setTemporaryStorage(quiz));
        if (isEnded) {
            navigate(`/dashboard/quizzes/result?code=${quiz.id}`);
        } else if (isStarted) {
            navigate(`/dashboard/quizzes/start?code=${quiz.id}`);
        } else {
            toast.info("The engagement window has not initialized yet.");
        }
    };

    const handleShare = async () => {
        const shareData = {
            title: `Quiz: ${quiz.title}`,
            text: `Join this quiz on TechXplora: ${quiz.title}`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                toast.success("Shared successfully");
            } catch (err) {
                if (err.name !== 'AbortError') {
                    toast.error("Could not share");
                }
            }
        } else {
            try {
                await navigator.clipboard.writeText(window.location.href);
                toast.success("Link copied to clipboard");
            } catch (err) {
                toast.error("Failed to copy link");
            }
        }
    };

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24 relative overflow-hidden bg-white dark:bg-black">
                {/* Visual Background Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/30 dark:bg-indigo-600/5 rounded-full blur-[120px] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-200/30 dark:bg-purple-600/5 rounded-full blur-[100px] -ml-40 -mb-40" />

                <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8 relative z-10">
                    {/* Breadcrumbs */}
                    <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => navigate('/dashboard/quizzes')}
                        className="flex items-center gap-2 text-[10px] font-black text-gray-400 dark:text-white/20 uppercase tracking-[0.2em] hover:text-indigo-600 dark:hover:text-[#a6b1ff] transition-colors group mb-12"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Quizzes
                    </motion.button>



                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
                        {/* Left: Main Info */}
                        <div className="xl:col-span-2 space-y-12">
                            {/* Quiz Title and Description */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-4 flex-wrap">
                                    <div className={`px-4 py-1.5 rounded-full bg-gradient-to-r ${isEnded ? 'from-rose-500 to-red-600' : isStarted ? 'from-emerald-400 to-cyan-500' : 'from-amber-400 to-orange-500'} border-2 border-white dark:border-white/20 shadow-lg`}>
                                        <span className="text-white font-black text-[10px] uppercase tracking-widest italic leading-none">
                                            {isEnded ? 'Closed' : isStarted ? 'Live' : 'Coming Soon'}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-100 dark:bg-white/5 border-2 border-indigo-300 dark:border-white/10">
                                        <Target size={12} className="text-indigo-600 dark:text-[#a6b1ff]" />
                                        <span className="text-[10px] font-black text-indigo-700 dark:text-white/40 uppercase tracking-widest">Quiz Code: {quiz.quiz_code}</span>
                                    </div>
                                </div>

                                <h1 className="text-3xl md:text-5xl lg:text-7xl font-black text-gray-900 dark:text-white italic tracking-tighter uppercase leading-none">
                                    {quiz.title}
                                </h1>

                                <p className="text-xl font-medium text-gray-600 dark:text-white/40 leading-relaxed max-w-2xl">
                                    {quiz.description || "Get ready for a fun quiz! Answer questions and earn awesome points!"}
                                </p>
                            </div>

                            {/* Status Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="relative group"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-indigo-300/40 to-purple-300/40 dark:from-indigo-600/20 dark:to-purple-600/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="relative bg-white dark:bg-white/[0.03] border-2 border-indigo-200 dark:border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 lg:p-14 shadow-xl">
                                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-200/30 dark:bg-indigo-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />

                                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative z-10">
                                        <div className="space-y-8 flex-1 w-full">
                                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-amber-600 dark:text-white/20">
                                                        <Trophy size={14} />
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Points</span>
                                                    </div>
                                                    <p className="text-3xl font-black text-amber-600 dark:text-[#ffb585] italic">{quiz.xp || 0}</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-blue-600 dark:text-white/20">
                                                        <Clock size={14} />
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Time</span>
                                                    </div>
                                                    <p className="text-3xl font-black text-blue-700 dark:text-white italic">{quiz.duration || 0}m</p>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2 text-purple-600 dark:text-white/20">
                                                        <Zap size={14} />
                                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Questions</span>
                                                    </div>
                                                    <p className="text-3xl font-black text-purple-700 dark:text-white italic">{quiz.QuizQuestions || 0} ({quiz.p_xp} xp)</p>
                                                </div>
                                            </div>

                                            <div className="space-y-4 pt-8 border-t-2 border-gray-200 dark:border-white/5">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[10px] font-black text-gray-500 dark:text-white/20 uppercase tracking-[0.2em]">Quiz Timer</span>
                                                    {!isEnded && (
                                                        <span className={`text-[10px] font-black ${isStarted ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'} uppercase tracking-widest flex items-center gap-2`}>
                                                            <div className={`w-1.5 h-1.5 rounded-full ${isStarted ? 'bg-emerald-600 dark:bg-emerald-400 animate-pulse' : 'bg-amber-600 dark:bg-amber-400'}`} />
                                                            {isStarted ? "Quiz is Live!" : "Starting Soon!"}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-baseline gap-4">
                                                    {isEnded ? (
                                                        <p className="text-4xl font-black text-rose-600 dark:text-rose-500 italic uppercase">Quiz Ended</p>
                                                    ) : (
                                                        <>
                                                            <p className="text-3xl sm:text-5xl lg:text-7xl font-mono font-black text-indigo-600 dark:text-[#a6b1ff] italic tracking-tighter">
                                                                {countdown}
                                                            </p>
                                                            <span className="text-sm font-black text-gray-500 dark:text-white/20 uppercase italic tracking-widest">
                                                                Left
                                                            </span>
                                                        </>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={handleAction}
                                            className={`shrink-0 w-full lg:w-56 h-32 lg:h-56 rounded-2xl lg:rounded-[3rem] ${isEnded ? 'bg-gradient-to-br from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600' : isStarted ? 'bg-gradient-to-br from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700' : 'bg-gray-300 dark:bg-white/10'} ${isEnded || isStarted ? 'dark:bg-[#a6b1ff] dark:hover:bg-white' : ''} ${isEnded || isStarted ? 'text-black dark:text-black' : 'text-gray-900 dark:text-white/40'} flex flex-col items-center justify-center gap-3 lg:gap-4 transition-all hover:scale-105 active:scale-95 shadow-2xl relative overflow-hidden group/btn`}
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                                            {isEnded ? (
                                                <>
                                                    <Trophy size={32} style={{ color: '#000' }} />
                                                    <span className="font-black uppercase tracking-[0.2em] text-[10px]" style={{ color: '#000' }}>See Results!</span>
                                                </>
                                            ) : isStarted ? (
                                                <>
                                                    <Play size={32} fill="#000" style={{ color: '#000' }} />
                                                    <span className="font-black uppercase tracking-[0.2em] text-[10px]" style={{ color: '#000' }}>Start Quiz!</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Timer size={32} style={{ color: '#6b7280' }} />
                                                    <span className="font-black uppercase tracking-[0.2em] text-[10px]" style={{ color: '#6b7280' }}>Not Yet</span>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Timeline Details */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-white/5 dark:to-white/5 border-2 border-blue-200 dark:border-white/5 rounded-3xl p-6 flex items-center gap-5 shadow-lg">
                                    <div className="w-14 h-14 rounded-2xl bg-indigo-200 dark:bg-indigo-500/10 flex items-center justify-center text-indigo-700 dark:text-indigo-400">
                                        <Calendar size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-indigo-600 dark:text-white/20 uppercase tracking-widest">Starts At</p>
                                        <p className="text-lg font-black text-gray-900 dark:text-white italic">{formatDate(quiz.start_at)}</p>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-white/5 dark:to-white/5 border-2 border-rose-200 dark:border-white/5 rounded-3xl p-6 flex items-center gap-5 shadow-lg">
                                    <div className="w-14 h-14 rounded-2xl bg-rose-200 dark:bg-rose-500/10 flex items-center justify-center text-rose-700 dark:text-rose-400">
                                        <CheckCircle2 size={24} />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-rose-600 dark:text-white/20 uppercase tracking-widest">Ends At</p>
                                        <p className="text-lg font-black text-gray-900 dark:text-white italic">{formatDate(quiz.end_at)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar: Leaderboard or Participation */}
                        <div className="space-y-8">
                            <div className="bg-white dark:bg-white/[0.03] border-2 border-purple-200 dark:border-white/10 rounded-[3rem] p-8 flex flex-col min-h-[500px] shadow-xl">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-xl font-black text-gray-900 dark:text-white italic uppercase tracking-tighter">
                                        {isEnded ? "Final Rankings" : isStarted ? "Live Leaderboard" : "Who's Playing"}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        {isStarted && !isEnded && (
                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                        )}
                                        <Users size={16} className="text-purple-600 dark:text-white/20" />
                                        <span className="text-lg font-black text-purple-700 dark:text-white italic">{leaderboard.length || 0}</span>
                                    </div>
                                </div>

                                <div className="flex-1 space-y-4 overflow-y-auto custom-scrollbar pr-2">
                                    {isLoadingLeaderboard ? (
                                        <div className="flex flex-col items-center justify-center h-full gap-4">
                                            <div className="relative w-12 h-12">
                                                <div className="absolute inset-0 rounded-full border-4 border-purple-200 dark:border-purple-500/20" />
                                                <div className="absolute inset-0 rounded-full border-t-4 border-purple-600 dark:border-purple-500 animate-spin" />
                                            </div>
                                            <p className="text-[10px] font-black text-gray-400 dark:text-white/20 uppercase tracking-[0.2em]">Loading rankings...</p>
                                        </div>
                                    ) : isStarted ? (
                                        topLeaderboard.length > 0 ? (
                                            <>
                                                {topLeaderboard.map((entry, idx) => (
                                                    <motion.div
                                                        key={entry.id || idx}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: idx * 0.1 }}
                                                        className={`flex items-center justify-between p-4 rounded-2xl border-2 shadow-sm transition-all hover:scale-[1.02] ${
                                                            idx === 0 
                                                                ? 'bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-500/10 dark:to-amber-500/10 border-amber-400 dark:border-amber-500/30' 
                                                                : idx === 1
                                                                ? 'bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-500/10 dark:to-slate-500/10 border-gray-400 dark:border-gray-500/30'
                                                                : idx === 2
                                                                ? 'bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-500/10 dark:to-amber-500/10 border-orange-400 dark:border-orange-500/30'
                                                                : 'bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/5'
                                                        }`}
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm ${
                                                                idx === 0 
                                                                    ? 'bg-amber-500 text-white' 
                                                                    : idx === 1
                                                                    ? 'bg-gray-400 text-white'
                                                                    : idx === 2
                                                                    ? 'bg-orange-600 text-white'
                                                                    : 'bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-white/20'
                                                            }`}>
                                                                {idx + 1}
                                                            </div>
                                                            <div className="w-10 h-10 rounded-xl bg-gray-200 dark:bg-white/10 border-2 border-gray-300 dark:border-white/10 flex items-center justify-center relative overflow-hidden">
                                                                {entry.student?.photo ? (
                                                                    <img src={entry.student.photo} alt="" className="w-full h-full object-cover" />
                                                                ) : (
                                                                    <span className="text-[10px] font-black text-gray-600 dark:text-white/40 uppercase tracking-tighter">
                                                                        {entry.student?.first_name?.[0]}{entry.student?.last_name?.[0]}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <div>
                                                                <p className="text-sm font-black text-gray-900 dark:text-white truncate max-w-[100px]">
                                                                    {entry.student?.first_name} {entry.student?.last_name}
                                                                </p>
                                                                <p className="text-[10px] font-bold text-gray-500 dark:text-white/30 uppercase tracking-widest">
                                                                    {entry.highest_score || entry.score || entry.total_score || 0}% Score
                                                                </p>
                                                            </div>
                                                        </div>
                                                        {idx < 3 && (
                                                            <Crown size={20} className={
                                                                idx === 0 
                                                                    ? 'text-amber-500' 
                                                                    : idx === 1 
                                                                    ? 'text-gray-400 dark:text-white/40' 
                                                                    : 'text-orange-700 dark:text-orange-900/40'
                                                            } />
                                                        )}
                                                    </motion.div>
                                                ))}
                                                
                                                {leaderboard.length > 5 && (
                                                    <button
                                                        onClick={() => navigate(`/dashboard/leaderboard?quiz=${quizCode}`)}
                                                        className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-white/5 dark:to-white/5 border-2 border-purple-300 dark:border-white/10 text-purple-700 dark:text-white/60 font-black uppercase tracking-widest text-[9px] hover:from-purple-200 hover:to-indigo-200 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2 group"
                                                    >
                                                        View Full Leaderboard
                                                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                                    </button>
                                                )}
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-center px-4 gap-4">
                                                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-300 dark:text-white/10">
                                                    <Trophy size={32} />
                                                </div>
                                                <p className="text-[10px] font-black text-gray-400 dark:text-white/20 uppercase tracking-[0.2em]">
                                                    {isEnded ? "No scores yet! Be the first to play!" : "No players yet! Start the quiz to see rankings!"}
                                                </p>
                                            </div>
                                        )
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-center px-4 gap-4">
                                            <div className="w-16 h-16 rounded-2xl bg-indigo-100 dark:bg-[#a6b1ff]/10 border-2 border-indigo-300 dark:border-[#a6b1ff]/20 flex items-center justify-center text-indigo-600 dark:text-[#a6b1ff]">
                                                <Users size={32} />
                                            </div>
                                            <p className="text-[10px] font-black text-gray-500 dark:text-white/20 uppercase tracking-[0.2em]">Quiz starts soon! Come back to see who's playing!</p>
                                        </div>
                                    )}
                                </div>

                                {/* Quick Tools */}
                                <div className="mt-8 pt-8 border-t-2 border-gray-200 dark:border-white/5 space-y-4">
                                    <button
                                        onClick={handleShare}
                                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-white/5 dark:to-white/5 border-2 border-blue-300 dark:border-white/10 text-blue-700 dark:text-white/40 font-black uppercase tracking-widest text-[9px] hover:from-blue-200 hover:to-indigo-200 dark:hover:bg-white/10 transition-all flex items-center justify-center gap-2 group shadow-sm"
                                    >
                                        <Share2 size={14} className="group-hover:rotate-12 transition-transform" />
                                        Share Quiz with Friends!
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
