import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Timer, Calendar, ExternalLink } from 'lucide-react';
import { timeAgo, startCountdown, hasDatePassed } from '@/utils/date';
import CopyIcon from './CopyIcon';

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
            className="w-full min-h-[220px] rounded-[2.5rem] bg-[#1a1a1a]/40 backdrop-blur-xl border border-white/5 hover:border-[#a6b1ff]/30 transition-all duration-500 cursor-pointer overflow-hidden group flex flex-col relative shadow-2xl"
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

export default QuizCard;
