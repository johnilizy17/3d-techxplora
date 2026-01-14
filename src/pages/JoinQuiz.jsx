import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
    ArrowLeft,
    Sparkles,
    ShieldCheck,
    ArrowRight,
    Gamepad2,
    Trophy,
    Info
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useLazyVerifyQuizCodeQuery } from '@/redux/api/studentApi';
import { toast } from 'sonner';
import VerifyQuizModal from '@/components/dashboard/VerifyQuizModal';

export default function JoinQuiz() {
    const navigate = useNavigate();
    const [code, setCode] = useState('');
    const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    const [verifyCode, { isFetching: isVerifying }] = useLazyVerifyQuizCodeQuery();

    const handleVerify = async (e) => {
        e.preventDefault();
        if (!code.trim()) return;

        try {
            const result = await verifyCode(code).unwrap();
            setSelectedQuiz(result.data || result);
            setIsVerifyModalOpen(true);
            toast.success('Quiz found!');
        } catch (error) {
            console.error('Verification failed:', error);
            toast.error(error?.data?.message || 'Invalid quiz code or quiz not found');
        }
    };

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24 lg:pb-10 bg-[#0a0a0a]">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-12">
                        <button
                            onClick={() => navigate('/dashboard/quizzes')}
                            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-black text-sm uppercase tracking-wider">Back to Quizzes</span>
                        </button>
                    </div>

                    <div className="flex flex-col items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full max-w-lg"
                        >
                            <div className="relative p-8 sm:p-12 bg-white/5 border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl shadow-indigo-500/5">
                                {/* Decorative Elements */}
                                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px] -ml-32 -mb-32" />

                                <div className="relative z-10 space-y-8 text-center">
                                    <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center mx-auto shadow-inner border border-white/10">
                                        <Sparkles className="text-indigo-400" size={40} />
                                    </div>

                                    <div>
                                        <h1 className="text-3xl sm:text-4xl font-black text-white italic tracking-tight uppercase mb-4">
                                            Join <span className="text-[#a6b1ff]">Challenge</span>
                                        </h1>
                                        <p className="text-white/40 text-sm font-medium leading-relaxed max-w-xs mx-auto">
                                            Enter the special access code provided by your teacher to unlock your next mission.
                                        </p>
                                    </div>

                                    <form onSubmit={handleVerify} className="space-y-6">
                                        <div className="relative group">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-indigo-400 transition-colors">
                                                <ShieldCheck size={24} />
                                            </div>
                                            <input
                                                type="text"
                                                value={code}
                                                onChange={(e) => setCode(e.target.value.toUpperCase())}
                                                placeholder="ENTER CODE (e.g. QZ-123)"
                                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-16 pr-6 text-white placeholder:text-white/20 focus:outline-none focus:border-indigo-400/50 transition-all font-black tracking-widest text-xl italic text-center"
                                                autoFocus
                                            />
                                        </div>

                                        <motion.button
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            disabled={!code.trim() || isVerifying}
                                            className="w-full h-16 bg-[#a6b1ff] text-[#0a0a0a] font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/20 disabled:opacity-50 transition-all"
                                        >
                                            {isVerifying ? 'VERIFYING...' : 'CONTINUE'}
                                            {!isVerifying && <ArrowRight size={20} />}
                                        </motion.button>
                                    </form>

                                    <div className="flex items-center gap-4 py-4 px-6 bg-white/5 rounded-2xl border border-white/5">
                                        <Info className="text-[#a6b1ff] shrink-0" size={20} />
                                        <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest text-left leading-relaxed">
                                            Codes are usually 6-8 characters long. If you don't have one, ask your teacher.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* External Links */}
                            <div className="mt-12 grid grid-cols-2 gap-4">
                                <Link to="/dashboard/quizzes" className="flex flex-col items-center gap-2 p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                                    <Gamepad2 className="text-white/20 group-hover:text-amber-400 transition-colors" size={24} />
                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest italic group-hover:text-white transition-colors">Browse Quizzes</span>
                                </Link>
                                <Link to="/dashboard/leaderboard" className="flex flex-col items-center gap-2 p-6 rounded-[2rem] bg-white/5 border border-white/5 hover:bg-white/10 transition-all group">
                                    <Trophy className="text-white/20 group-hover:text-indigo-400 transition-colors" size={24} />
                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest italic group-hover:text-white transition-colors">Hall of Fame</span>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Verification Modal */}
                {selectedQuiz && (
                    <VerifyQuizModal
                        isOpen={isVerifyModalOpen}
                        onClose={() => setIsVerifyModalOpen(false)}
                        quiz={selectedQuiz}
                    />
                )}
            </div>
        </DashboardLayout>
    );
}
