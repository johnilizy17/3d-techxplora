import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    X,
    CheckCircle2,
    Clock,
    Gamepad2,
    ArrowRight,
    Sparkles,
    Trophy,
    Info,
    Calendar
} from 'lucide-react';
import { useJoinQuizMutation } from '@/redux/api/studentApi';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export default function VerifyQuizModal({ isOpen, onClose, quiz }) {
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const [joinQuiz, { isLoading: isJoining }] = useJoinQuizMutation();

    const handleJoin = async () => {
        try {
            await joinQuiz({
                student_id: user.id,
                quiz_id: quiz.id
            }).unwrap();

            toast.success('Successfully joined the quiz!');
            onClose();
            // Navigate to quizzes list or directly to the quiz detail/game if the design supports it
            navigate('/dashboard/quizzes');
        } catch (error) {
            console.error('Join failed:', error);
            toast.error(error?.data?.message || 'Failed to join quiz');
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/90 backdrop-blur-md"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-xl bg-[#0d0d0d] border border-white/10 rounded-[3rem] shadow-2xl shadow-indigo-500/20 max-h-[90vh] flex flex-col overflow-hidden"
                >
                    {/* Decorative Background */}
                    <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-[100px] -ml-40 -mb-40 pointer-events-none" />

                    {/* Close Button - Fixed relative to frame */}
                    <button
                        onClick={onClose}
                        className="absolute top-8 right-8 p-3 rounded-2xl bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all z-30"
                    >
                        <X size={20} />
                    </button>

                    {/* Scrollable Content Area */}
                    <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar relative z-10 px-8 sm:px-12 py-12">
                        <div className="flex items-center gap-4 mb-10">
                            <div className="w-14 h-14 bg-emerald-500/20 rounded-2xl flex items-center justify-center border border-emerald-500/30">
                                <CheckCircle2 className="text-emerald-400" size={28} />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white italic uppercase tracking-tight leading-none">
                                    Target <span className="text-emerald-400">Locked</span>
                                </h2>
                                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Ready for Engagement</p>
                            </div>
                        </div>

                        {/* Quiz Detail Card */}
                        <div className="bg-white/5 rounded-[2.5rem] p-8 border border-white/10 mb-8 relative group">
                            <div className="absolute top-6 right-8 opacity-20 group-hover:opacity-40 transition-opacity">
                                <Sparkles className="text-emerald-400" size={32} />
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <div className="text-[10px] font-black text-emerald-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                                        <Trophy size={12} /> Mission Profile
                                    </div>
                                    <h3 className="text-3xl font-black text-white uppercase italic leading-tight">{quiz?.title}</h3>
                                </div>

                                <p className="text-white/40 text-sm font-medium leading-relaxed">
                                    {quiz?.description || 'No specific mission brief provided. Proceed with caution and maintain focus.'}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                                    <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/5">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                                            <Clock className="text-indigo-400" size={20} />
                                        </div>
                                        <div>
                                            <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">Duration</div>
                                            <div className="text-sm font-black text-white italic lowercase">
                                                {quiz?.duration} <span className="text-[10px]">mins</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/5">
                                        <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                            <Gamepad2 className="text-purple-400" size={20} />
                                        </div>
                                        <div>
                                            <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">Questions</div>
                                            <div className="text-sm font-black text-white italic truncate max-w-[80px]">
                                                {quiz?.QuizQuestions ?? 0} <span className="text-[10px]">items</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-full flex items-center gap-4 bg-white/5 rounded-2xl p-4 border border-white/5">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center">
                                            <Sparkles className="text-indigo-400" size={20} />
                                        </div>
                                        <div>
                                            <div className="text-[9px] font-black text-white/20 uppercase tracking-widest">Tournament Mode</div>
                                            <div className="text-sm font-black text-white italic truncate uppercase tracking-tighter">
                                                {quiz?.mode || (quiz?.is_ai ? 'AI DRIVEN' : 'MANUAL')}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Terms/Info */}
                        <div className="flex items-start gap-4 p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 mb-10">
                            <Info className="text-emerald-400 shrink-0 mt-0.5" size={18} />
                            <p className="text-[11px] font-bold text-emerald-400/70 uppercase tracking-wide leading-relaxed">
                                By confirming, you enter the arena. Your results will be logged and your XP balance will be affected based on your performance.
                            </p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleJoin}
                            disabled={isJoining}
                            className="w-full h-16 bg-emerald-500 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/30 disabled:opacity-50 transition-all font-black italic"
                        >
                            {isJoining ? 'PREPARING...' : 'CONFIRM ENGAGEMENT'}
                            {!isJoining && <ArrowRight size={20} />}
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
