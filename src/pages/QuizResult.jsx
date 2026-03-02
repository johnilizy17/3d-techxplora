import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    Trophy,
    Target,
    Zap,
    CheckCircle2,
    XCircle,
    RotateCcw,
    Home,
    Brain,
    Sparkles,
    ChevronRight,
    ArrowLeft,
    Clock,
    Share2,
    BarChart3
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { selectCurrentUser, selectTempStorage, setTemporaryStorage } from '@/redux/slices/authSlice';
import { useGetQuestionsByQuizIdQuery } from '@/redux/api/questionApi';
import { useVerifyQuizCodeQuery } from '@/redux/api/studentApi';
import { cn } from '@/lib/utils';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner';

export default function QuizResult() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const tempStorage = useSelector(selectTempStorage);

    const queryParams = new URLSearchParams(location.search);
    const quizCode = queryParams.get('code');

    // Verify quiz code to get numeric ID and metadata
    const { data: verifiedQuizData, isLoading: isVerifying } = useVerifyQuizCodeQuery(quizCode, {
        skip: !quizCode || !!tempStorage
    });

    const quiz = verifiedQuizData?.data || verifiedQuizData || tempStorage;

    const { data: questionsData, isLoading: isLoadingQuestions } = useGetQuestionsByQuizIdQuery(quiz?.id, {
        skip: !quiz?.id
    });

    const questions = questionsData?.data || questionsData || [];
    const result = location.state?.result || { score: 0, answers: [] };
    const score = result.score || 0;
    const percentage = Math.round((score / (questions.length || 1)) * 100);
    const xpEarned = score * (quiz.p_xp || 0); // Correct answers * XP per question

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: `My TechXplora Quiz Performance: ${quiz.title}`,
                text: `I just achieved ${percentage}% efficiency and claimed ${xpEarned} XP in the ${quiz.title} challenge!`,
                url: window.location.href,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(`I scored ${percentage}% on ${quiz.title}! Check out TechXplora.`);
            toast.success("Result summary copied to clipboard.");
        }
    };

    if (isLoadingQuestions || isVerifying) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 rounded-full border-4 border-indigo-500/10"></div>
                        <div className="absolute inset-0 rounded-full border-t-4 border-indigo-500 animate-spin"></div>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

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
                                onClick={() => navigate('/dashboard/quizzes')}
                                className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] hover:text-[#a6b1ff] transition-colors group"
                            >
                                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                Back to Assessments
                            </motion.button>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white italic tracking-tighter uppercase leading-none">
                                Your <span className="text-[#a6b1ff]">Results</span>
                            </h1>
                            <p className="text-white/40 font-medium max-w-lg italic">
                                Here's how you did on quiz <span className="text-white/60 font-black tracking-widest">{quiz.quiz_code || quizCode}</span>.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={handleShare}
                                className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all group"
                            >
                                <Share2 size={24} className="group-hover:scale-110 transition-transform" />
                            </button>
                            <div className="flex items-center gap-4 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 pr-10">
                                <div className="w-16 h-16 rounded-2xl bg-[#a6b1ff] flex items-center justify-center text-black shadow-xl shrink-0">
                                    <Trophy size={32} />
                                </div>
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Claimed</p>
                                    <p className="text-3xl font-black text-white leading-none italic">{xpEarned} XP</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8"
                    >
                        {/* Highlights Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <HighlightCard
                                icon={BarChart3}
                                label="Execution Efficiency"
                                value={`${percentage}%`}
                                sub="Total Mastery"
                                color="blue"
                            />
                            <HighlightCard
                                icon={Target}
                                label="Nodes Synchronized"
                                value={`${score}/${questions.length}`}
                                sub="Success Ratio"
                                color="purple"
                            />
                            <HighlightCard
                                icon={Zap}
                                label="Synaptic Multiplier"
                                value="1.2x"
                                sub="Active Bonus"
                                color="emerald"
                            />
                        </div>

                        {/* Detailed Breakdown */}
                        <div className="bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden">
                            <div className="p-8 border-b border-white/5 bg-white/[0.02]">
                                <h3 className="text-xl font-black text-white uppercase italic tracking-tight flex items-center gap-3">
                                    <Brain className="text-[#a6b1ff]" size={24} />
                                    Question by Question
                                </h3>
                            </div>

                            <div className="divide-y divide-white/5">
                                {questions.map((q, idx) => {
                                    const studentAnswerId = result.answers?.find(a => a.question_id === q.id)?.option_id;
                                    const correctOption = q.options?.find(o => o.is_correct === 1 || o.is_correct === true);
                                    const isCorrect = studentAnswerId === (correctOption?.id || correctOption?.option);

                                    return (
                                        <div key={idx} className="p-8 hover:bg-white/[0.01] transition-colors group">
                                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                                                <div className="space-y-3 flex-1">
                                                    <div className="flex items-center gap-3">
                                                        <span className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[10px] font-black text-white/20">
                                                            {idx + 1}
                                                        </span>
                                                        <span className={cn(
                                                            "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
                                                            isCorrect ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
                                                        )}>
                                                            {isCorrect ? "CORRECT" : "WRONG"}
                                                        </span>
                                                    </div>
                                                    <h4 className="text-lg font-bold text-white leading-relaxed italic uppercase tracking-tight">
                                                        {q.question}
                                                    </h4>
                                                </div>

                                                <div className="flex flex-wrap gap-3">
                                                    <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/5">
                                                        <p className="text-[9px] font-black text-white/20 uppercase tracking-widest mb-1">Your Input</p>
                                                        <p className={cn(
                                                            "text-xs font-bold",
                                                            isCorrect ? "text-emerald-400" : "text-rose-400"
                                                        )}>
                                                            {q.options?.find(o => (o.id || o.option) === studentAnswerId)?.option || "NO INPUT"}
                                                        </p>
                                                    </div>
                                                    {!isCorrect && (
                                                        <div className="px-5 py-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                                                            <p className="text-[9px] font-black text-emerald-500/40 uppercase tracking-widest mb-1">Correct Answer</p>
                                                            <p className="text-xs font-bold text-emerald-400">
                                                                {correctOption?.option}
                                                            </p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-8 justify-center">
                            <button
                                onClick={() => navigate('/dashboard/quizzes')}
                                className="px-10 h-16 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#a6b1ff] transition-all active:scale-95 shadow-xl shadow-white/5"
                            >
                                <Home size={18} />
                                Back to Quizzes
                            </button>
                            <button
                                onClick={() => navigate(`/dashboard/quizzes/start?code=${quiz.quiz_code}`)}
                                className="px-10 h-16 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-95"
                            >
                                <RotateCcw size={18} />
                                Try Again
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </DashboardLayout>
    );
}

const HighlightCard = ({ icon: Icon, label, value, sub, color }) => {
    const colors = {
        blue: "from-blue-500/20 to-indigo-500/5 border-blue-500/20 text-[#a6b1ff]",
        purple: "from-purple-500/20 to-pink-500/5 border-purple-500/20 text-purple-400",
        emerald: "from-emerald-500/20 to-teal-500/5 border-emerald-500/20 text-emerald-400"
    };

    return (
        <motion.div
            variants={{ hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
            className={cn(
                "p-8 rounded-[2.5rem] bg-gradient-to-br border flex flex-col justify-between group hover:scale-[1.02] transition-all duration-300",
                colors[color]
            )}
        >
            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:rotate-12 transition-transform">
                <Icon size={24} />
            </div>
            <div>
                <p className="text-[10px] font-black opacity-40 uppercase tracking-[0.2em] mb-1">{label}</p>
                <h3 className="text-4xl font-black text-white italic tracking-tighter leading-none">{value}</h3>
                <p className="text-[10px] font-bold opacity-30 mt-2 uppercase tracking-widest">{sub}</p>
            </div>
        </motion.div>
    );
};
