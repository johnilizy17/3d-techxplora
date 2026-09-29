import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Clock, Timer, Calendar, ExternalLink, Trash2 } from 'lucide-react';
import { timeAgo, startCountdown, hasDatePassed } from '@/utils/date';
import CopyIcon from './CopyIcon';
import { useDeleteQuizMutation } from '@/redux/api/teacherApi';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const QuizCard = ({ quiz, index, onClick, isTeacher = false }) => {
    const [countdown, setCountdown] = useState("00:00:00");
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);
    const [deleteQuiz, { isLoading: isDeleting }] = useDeleteQuizMutation();
    
    // Check if quiz has valid dates
    const hasValidDates = quiz.start_at && quiz.end_at;
    const isStarted = hasValidDates ? hasDatePassed(quiz.start_at) : false;
    const isEnded = hasValidDates ? hasDatePassed(quiz.end_at) : false;

    // Debug logging (remove after fixing)
    useEffect(() => {
        if (quiz.quiz_code === 'QZ3F10F8AD' || quiz.end_at?.includes('2027')) {
            const parsedDate = new Date(quiz.end_at?.replace(' ', 'T'));
            console.log('🔍 Quiz Debug:', {
                quiz_code: quiz.quiz_code,
                title: quiz.title,
                end_at_raw: quiz.end_at,
                end_at_parsed: parsedDate.toString(),
                parsed_year: parsedDate.getFullYear(),
                now: new Date().toString(),
                isEnded,
                isStarted,
                should_be_future: parsedDate > new Date()
            });
        }
    }, [quiz, isEnded, isStarted]);

    useEffect(() => {
        let interval;
        if (isStarted && !isEnded) {
            console.log(quiz, "quiz")
            interval = startCountdown(quiz.end_at, setCountdown);
        }
        return () => interval && clearInterval(interval);
    }, [quiz.end_at, isStarted, isEnded]);

    const getStatus = () => {
        if (!isStarted) return { label: 'Pending', color: 'from-amber-400 to-orange-500', icon: Clock };
        if (isEnded) return { label: 'Closed', color: 'from-rose-400 to-red-600', icon: Calendar };
        return { label: 'Live', color: 'from-emerald-400 to-cyan-500', icon: Timer };
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        try {
            await deleteQuiz(quiz.id).unwrap();
            toast.success('Quiz deleted successfully!');
            setShowDeleteDialog(false);
        } catch (error) {
            console.error('Failed to delete quiz:', error);
            toast.error(error?.data?.message || 'Failed to delete quiz');
        }
    };

    const status = getStatus();
    const StatusIcon = status.icon;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            onClick={onClick}
            className="w-full min-h-[220px] rounded-[2.5rem] bg-white dark:bg-card backdrop-blur-xl border-2 border-indigo-200 dark:border-border hover:border-indigo-400 dark:hover:border-[#a6b1ff]/30 transition-all duration-500 cursor-pointer overflow-hidden group flex flex-col relative shadow-lg hover:shadow-xl"
        >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-indigo-100/20 dark:via-purple-500/[0.02] to-purple-100/30 dark:to-purple-500/[0.05] pointer-events-none" />

            {/* Animated Bottom Glow */}
            <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-48 h-48 bg-indigo-200/30 dark:bg-[#a6b1ff]/10 rounded-full blur-[80px] group-hover:bg-indigo-300/40 dark:group-hover:bg-[#a6b1ff]/20 transition-all duration-700" />

            {/* Header Section */}
            <div className="p-4 md:p-6 pb-2 flex justify-between items-start relative z-10">
                <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${status.color} shadow-lg shadow-black/20`}>
                            <StatusIcon className="w-3 h-3 text-white" />
                            <span className="text-[10px] font-black text-white uppercase tracking-tighter italic">{status.label}</span>
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 dark:text-muted-foreground uppercase tracking-widest">{timeAgo(quiz.created_at)}</span>
                    </div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-foreground line-clamp-2 leading-[1.1] uppercase italic tracking-tighter group-hover:text-indigo-600 dark:group-hover:text-[#a6b1ff] transition-colors duration-300">
                        {quiz.title}
                    </h3>
                </div>

                <div className="flex items-start gap-2">
                    {isTeacher && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                setShowDeleteDialog(true);
                            }}
                            className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-500/10 border-2 border-rose-300 dark:border-rose-500/20 flex items-center justify-center hover:bg-rose-500 dark:hover:bg-rose-500 hover:border-rose-600 dark:hover:border-rose-600 text-rose-900 dark:text-rose-400 hover:text-white dark:hover:text-white transition-all duration-300 shadow-lg hover:shadow-rose-500/20 group/delete"
                            title="Delete Quiz"
                        >
                            <Trash2 size={16} color="red" className="group-hover/delete:scale-110 transition-transform" />
                        </button>
                    )}
                    
                    <div className="flex flex-col items-center justify-center w-14 h-20 rounded-2xl bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-accent dark:to-transparent border-2 border-amber-300 dark:border-border shadow-xl backdrop-blur-md relative overflow-hidden group-hover:scale-110 transition-transform duration-500">
                        <div className="absolute inset-0 bg-amber-200/20 dark:bg-[#a6b1ff]/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <Trophy size={20} className="text-amber-600 dark:text-[#ffb585] mb-1.5 relative z-10 drop-shadow-[0_0_8px_rgba(217,119,6,0.3)] dark:drop-shadow-[0_0_8px_rgba(255,181,133,0.5)]" />
                        <span className="text-[10px] font-black text-amber-700 dark:text-muted-foreground leading-none relative z-10 uppercase italic">XP</span>
                        <span className="text-lg font-black text-amber-900 dark:text-foreground leading-none mt-1 relative z-10 italic">{quiz.xp || 0}</span>
                    </div>
                </div>
            </div>

            {/* Middle Section - Description */}
            <div className="px-4 md:px-6 relative z-10">
                <p className="text-xs text-gray-600 dark:text-muted-foreground line-clamp-2 font-medium leading-relaxed italic pr-4">
                    {quiz.description || "Test your knowledge in this fun quiz!"}
                </p>
            </div>

            {/* Footer Section */}
            <div className="mt-auto p-4 md:p-6 space-y-4 relative z-10">
                {/* Code and Copy */}
                <div className="flex items-center gap-2">
                    <div className="flex-1 h-12 rounded-2xl bg-indigo-50 dark:bg-accent border-2 border-indigo-200 dark:border-border flex items-center justify-between px-5 group/code hover:border-indigo-400 dark:hover:border-[#a6b1ff]/30 transition-colors shadow-sm">
                        <span className="text-sm font-black text-indigo-600 dark:text-[#a6b1ff] uppercase tracking-wider">{quiz.quiz_code}</span>
                    </div>
                    <CopyIcon code={quiz.quiz_code} className="h-12 w-12 rounded-2xl bg-indigo-100 dark:bg-[#a6b1ff]/10 border-2 border-indigo-300 dark:border-[#a6b1ff]/20 hover:bg-indigo-600 dark:hover:bg-[#a6b1ff] hover:text-white dark:hover:text-[#0a0a0a] transition-all duration-300 shadow-lg" />
                </div>

                {/* Start Date */}
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-blue-50 dark:bg-accent/50 border-2 border-blue-200 dark:border-border shadow-sm">
                    <div className="w-7 h-7 rounded-lg bg-blue-200 dark:bg-indigo-500/20 flex items-center justify-center border-2 border-blue-300 dark:border-indigo-500/30">
                        <Calendar size={12} className="text-blue-700 dark:text-indigo-500" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[8px] font-black text-gray-500 dark:text-muted-foreground uppercase tracking-wider">Starts</span>
                        <span className="text-[11px] font-black text-gray-900 dark:text-foreground uppercase italic tracking-tight">
                            {new Date(quiz.start_at).toLocaleDateString(undefined, { 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </span>
                    </div>
                </div>

                {/* Date / Timer Logic */}
                <div className="flex items-center justify-between pt-2 border-t-2 border-gray-200 dark:border-border">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-accent flex items-center justify-center border-2 border-purple-200 dark:border-border">
                            <Clock size={14} className="text-purple-600 dark:text-[#a6b1ff]" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-gray-500 dark:text-muted-foreground uppercase tracking-wider">Timeline</span>
                            <span className="text-[11px] font-black text-gray-700 dark:text-foreground/80 uppercase italic tracking-tight">
                                {isStarted && !isEnded ? (
                                    <span className="text-indigo-600 dark:text-[#a6b1ff] animate-pulse">Ending in {countdown}</span>
                                ) : (
                                    <span>{new Date(quiz.start_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })} - {new Date(quiz.end_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</span>
                                )}
                            </span>
                        </div>
                    </div>

                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <ExternalLink size={16} className="text-gray-500 dark:text-muted-foreground" />
                    </div>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
                <AlertDialogContent className="bg-white dark:bg-[#0d0d0d] border-2 border-rose-200 dark:border-rose-500/20 rounded-[2rem]">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-xl font-black text-gray-900 dark:text-white flex items-center gap-2 uppercase italic">
                            <Trash2 className="text-rose-500" size={24} />
                            Delete Quiz?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-gray-600 dark:text-white/60 font-medium">
                            Are you sure you want to delete "{quiz.title}"? This action cannot be undone and all quiz data will be permanently removed.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel 
                            onClick={(e) => e.stopPropagation()}
                            className="bg-gray-100 dark:bg-white/5 border-2 border-gray-300 dark:border-white/10 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white rounded-xl font-bold"
                        >
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-gradient-to-r from-rose-500 to-red-600 text-white font-bold rounded-xl hover:from-rose-600 hover:to-red-700 disabled:opacity-50"
                        >
                            {isDeleting ? 'Deleting...' : 'Delete Quiz'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </motion.div>
    );
};

export default QuizCard;
