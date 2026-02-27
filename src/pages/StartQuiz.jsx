import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    ArrowLeft,
    ShieldCheck,
    Zap,
    Target,
    Clock,
    Trophy,
    AlertCircle,
    Play,
    Info,
    ChevronRight,
    Users,
    Activity,
    Lock
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { selectCurrentUser, selectTempStorage, setTemporaryStorage } from '@/redux/slices/authSlice';
import { useGetQuestionsByQuizIdQuery } from '@/redux/api/questionApi';
import { useVerifyQuizCodeQuery } from '@/redux/api/studentApi';
import { toast } from 'sonner';

export default function StartQuiz() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const tempStorage = useSelector(selectTempStorage);

    const queryParams = new URLSearchParams(location.search);
    const quizCode = queryParams.get('code');

    // Fetch quiz data if missing
    const { data: verifiedQuizData, isLoading: isVerifying } = useVerifyQuizCodeQuery(quizCode, {
        skip: !quizCode
    });

    const quiz = verifiedQuizData?.data || verifiedQuizData || tempStorage;

    // Pre-fetch questions to ensure zero-latency start
    const { data: questionsData, isLoading: isLoadingQuestions } = useGetQuestionsByQuizIdQuery(quiz?.id, {
        skip: !quiz?.quiz_code
    });

    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        if (quiz && questionsData) {
            setIsReady(true);
        }
    }, [quiz, questionsData]);

    if (isVerifying && !quiz) {
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

    if (!quiz) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/20">
                        <AlertCircle size={40} />
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Mission Scuttled</h2>
                        <p className="text-white/40 text-sm max-w-xs mx-auto font-medium">The synchronized code could not be verified by the mothership.</p>
                    </div>
                    <button onClick={() => navigate('/dashboard/quizzes')} className="px-8 py-3 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-[#a6b1ff] transition-all">
                        Abort Mission
                    </button>
                </div>
            </DashboardLayout>
        );
    }

    const handleEngage = () => {
        if (!isReady) {
            toast.error("Systems are not fully synchronized yet. Please wait.");
            return;
        }
        dispatch(setTemporaryStorage(quiz));
        navigate(`/dashboard/quizzes/completion?code=${quiz.id}`);
    };

    const getSecondsPerQuestion = () => {
        if (quiz?.duration && questionsData?.data?.length > 0) {
            const totalSeconds = parseInt(quiz.duration) * 60;
            return Math.floor(totalSeconds / questionsData.data.length);
        }
        return 30;
    };

    const timePerQuestion = getSecondsPerQuestion();

    const isLearningMode = quiz?.quiz_mode?.name?.toLowerCase() === 'learning' || quiz?.mode_name?.toLowerCase() === 'learning' || quiz?.mode?.toLowerCase() === 'learning';

    const instructions = [
        { icon: Clock, label: "Time Limit", detail: `You have ${timePerQuestion} seconds for each question.` },
        {
            icon: isLearningMode ? Activity : ShieldCheck,
            label: isLearningMode ? "Go at Your Pace" : "Can't Go Back",
            detail: isLearningMode ? "You can go back to review questions if you need to." : "Once you answer, you can't change it. Think carefully!"
        },
        { icon: Activity, label: "Auto-Save", detail: "Your answers are saved automatically as you go." },
        { icon: Zap, label: "Fast & Smooth", detail: "The quiz loads quickly so you can focus on learning!" }
    ];

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24 relative overflow-hidden">
                {/* Visual Background Elements */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px] -ml-40 -mb-40" />

                <div className="max-w-5xl mx-auto px-6 lg:px-10 py-12 relative z-10">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
                        <div className="space-y-4">
                            <motion.button
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                onClick={() => navigate(`/dashboard/quizzes/details?code=${quiz.quiz_code}`)}
                                className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] hover:text-[#a6b1ff] transition-colors group"
                            >
                                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                Abort Preparation
                            </motion.button>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
                                Get <span className="text-[#a6b1ff]">Ready!</span>
                            </h1>
                            <p className="text-white/40 font-medium max-w-lg italic">
                                Let's make sure everything is set before you start quiz <span className="text-white/60 font-black tracking-widest">{quiz.quiz_code}</span>.
                            </p>
                        </div>

                        <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 pr-10">
                            <div className="w-16 h-16 rounded-2xl bg-[#a6b1ff] flex items-center justify-center text-black shadow-xl shrink-0">
                                <Trophy size={32} />
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Prize</p>
                                <p className="text-3xl font-black text-white leading-none italic">{quiz.xp || 0} Points</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                        {/* Main Interaction Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="lg:col-span-3 bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 lg:p-12 relative overflow-hidden group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            <div className="relative z-10 space-y-10">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-[#a6b1ff]">
                                        <Info size={16} />
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em]">What to Expect</span>
                                    </div>
                                    <h2 className="text-2xl md:text-3xl font-black text-white uppercase italic tracking-tighter">{quiz.title}</h2>
                                    <p className="text-sm text-white/40 font-medium leading-relaxed italic">
                                        You're about to start a quiz! Stay focused and do your best. Read each question carefully!
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    {instructions.map((item, i) => (
                                        <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-5 space-y-3 hover:bg-white/10 transition-colors">
                                            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                                                <item.icon size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-black text-white uppercase italic leading-none mb-1">{item.label}</p>
                                                <p className="text-[10px] text-white/30 font-bold uppercase tracking-tight">{item.detail}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="pt-8 border-t border-white/5">
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="space-y-1">
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Status</p>
                                            <div className="flex items-center gap-2">
                                                {isLoadingQuestions ? (
                                                    <div className="flex items-center gap-2 text-amber-500">
                                                        <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest italic">Loading Questions...</span>
                                                    </div>
                                                ) : isReady ? (
                                                    <div className="flex items-center gap-2 text-emerald-400">
                                                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                                                        <span className="text-[10px] font-black uppercase tracking-widest italic">Ready to Go!</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-white/20">
                                                        <Lock size={12} />
                                                        <span className="text-[10px] font-black uppercase tracking-widest italic">Getting Ready...</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="text-right space-y-1">
                                            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Total Questions</p>
                                            <p className="text-xl font-black text-white italic">{quiz.QuizQuestions || 0} Questions</p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleEngage}
                                        disabled={!isReady}
                                        className="w-full h-16 md:h-20 bg-[#a6b1ff] hover:bg-white text-black rounded-2xl md:rounded-3xl font-black uppercase tracking-[0.2em] text-xs sm:text-sm flex items-center justify-center gap-4 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:grayscale group/btn relative overflow-hidden shadow-2xl shadow-[#a6b1ff]/20"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                                        {isLoadingQuestions ? "LOADING..." : "START QUIZ!"}
                                        <Play fill="currentColor" size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>

                        {/* Sidebar: Participants and Meta */}
                        <div className="lg:col-span-2 space-y-8">
                            {/* Readiness Gauge */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 space-y-8"
                            >
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-black text-white uppercase italic tracking-tighter">Quiz Info</h3>
                                    <div className="px-3 py-1 bg-emerald-500/10 rounded-full border border-emerald-500/20">
                                        <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest italic">Secure</span>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: "0%" }}
                                            animate={{ width: isReady ? "100%" : "30%" }}
                                            className="absolute inset-y-0 bg-gradient-to-r from-indigo-500 to-[#a6b1ff]"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">Speed</p>
                                            <p className="text-xl font-black text-white italic tracking-widest leading-none">Super Fast</p>
                                        </div>
                                        <div>
                                            <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] mb-1">Type</p>
                                            <p className="text-xl font-black text-white italic tracking-widest leading-none">Quiz</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t border-white/5 space-y-4">
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20">
                                            <Users size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Your Rank</p>
                                            <p className="text-xs font-black text-white italic">Checking scores...</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 opacity-50">
                                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/20">
                                            <Zap size={18} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Bonus</p>
                                            <p className="text-xs font-black text-white italic">Normal (1.0x)</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Warning Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="bg-rose-500/5 border border-rose-500/10 rounded-[2.5rem] p-8 flex gap-4"
                            >
                                <div className="shrink-0 w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500">
                                    <Lock size={18} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-rose-500/60 uppercase tracking-widest">{isLearningMode ? "Learning Mode" : "Important!"}</p>
                                    <p className="text-[10px] font-bold text-rose-500/40 uppercase tracking-tight leading-relaxed">
                                        {isLearningMode
                                            ? "This quiz is for learning! You can go back to review questions and make sure you understand everything."
                                            : "Once you start, you can't pause or go back. If you close the quiz or switch tabs, you might lose your progress!"}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
