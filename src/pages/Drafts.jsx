import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    Archive,
    Trash2,
    Play,
    Clock,
    Calendar,
    ChevronRight,
    LayoutGrid,
    Search,
    AlertCircle,
    ArrowLeft
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EmptyState from '@/components/dashboard/EmptyState';
import { getDrafts, removeDraft } from '@/utils/draftUtils';
import { setTemporaryStorage } from '@/redux/slices/authSlice';
import { toast } from 'sonner';
import { formatDate } from '@/utils/date';

export default function Drafts() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [drafts, setDrafts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadDrafts = () => {
            const data = getDrafts();
            setDrafts(data);
            setIsLoading(false);
        };
        loadDrafts();
    }, []);

    const handleDeleteDraft = (id) => {
        const updated = removeDraft(id);
        setDrafts(updated);
        toast.success("Draft removed from storage");
    };

    const handleResumeDraft = (draft) => {
        dispatch(setTemporaryStorage(draft));
        toast.success(`Resuming: ${draft.title || 'Untitled Assessment'}`);
        if (draft.is_manual) {
            navigate(`/dashboard/teacher/question?code=${draft.quiz_code || ''}&manual=true`);
        } else {
            navigate('/dashboard/teacher/ai-review');
        }
    };

    const filteredDrafts = drafts.filter(draft =>
        (draft.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (draft.description || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

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
            <div className="min-h-screen pb-24 lg:pb-10">
                <div className="max-w-7xl mx-auto px-6 lg:px-10 py-8">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
                        <div className="space-y-4">
                            <motion.button
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                onClick={() => navigate('/dashboard/quizzes')}
                                className="flex items-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] hover:text-[#a6b1ff] transition-colors group"
                            >
                                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                Return to Lab
                            </motion.button>
                            <div>
                                <h1 className="text-4xl lg:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                                    Draft <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">Archives</span>
                                </h1>
                                <p className="text-white/40 font-medium uppercase tracking-widest text-[11px] mt-4">
                                    Continue constructing your curriculum-aligned assessments.
                                </p>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="relative group max-w-md w-full">
                            <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                                <Search size={18} className="text-white/20 group-focus-within:text-amber-400 transition-colors" />
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search draft archives..."
                                className="w-full bg-white/[0.03] border border-white/10 rounded-2xl py-4 pl-14 pr-6 text-white font-bold placeholder:text-white/10 focus:outline-none focus:border-amber-500/50 focus:bg-white/[0.05] transition-all"
                            />
                        </div>
                    </div>

                    {isLoading ? (
                        <div className="py-24 flex justify-center">
                            <div className="relative w-12 h-12">
                                <div className="absolute inset-0 rounded-full border-4 border-amber-500/20" />
                                <div className="absolute inset-0 rounded-full border-t-4 border-amber-500 animate-spin" />
                            </div>
                        </div>
                    ) : filteredDrafts.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-16 text-center"
                        >
                            <EmptyState
                                title={searchQuery ? "No matches found" : "Archives Empty"}
                                description={searchQuery
                                    ? "Adjust your parameters to locate the intelligence node."
                                    : "You haven't initialized any assessment drafts yet."
                                }
                            />
                            {!searchQuery && (
                                <button
                                    onClick={() => navigate('/dashboard/teacher/quizzes')}
                                    className="mt-8 px-8 py-4 rounded-2xl bg-amber-500 text-black font-black uppercase text-xs tracking-[0.2em] shadow-xl hover:shadow-amber-500/20 hover:scale-105 transition-all"
                                >
                                    Initialize New Challenge
                                </button>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {filteredDrafts.map((draft, idx) => (
                                <motion.div
                                    key={draft.id || idx}
                                    variants={itemVariants}
                                    className="group relative bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8 transition-all duration-500 hover:border-amber-500/30 hover:bg-white/[0.05] hover:shadow-2xl hover:shadow-black/40 overflow-hidden"
                                >
                                    {/* Accent Glow */}
                                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                                    <div className="relative z-10 space-y-6">
                                        <div className="flex justify-between items-start">
                                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                                                <Archive size={28} className="text-white" />
                                            </div>
                                            <div className="flex flex-col items-end gap-2">
                                                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black text-amber-400 uppercase tracking-widest">
                                                    Draft Node
                                                </span>
                                                <span className="text-[10px] font-bold text-white/20 uppercase tracking-tighter">
                                                    {draft.questions?.length || 0} Questions
                                                </span>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-black text-white italic uppercase tracking-tight leading-none line-clamp-1">
                                                {draft.title || 'Untitled Assessment'}
                                            </h3>
                                            <p className="text-sm font-medium text-white/40 line-clamp-2 leading-relaxed">
                                                {draft.description || 'No description provided for this synchronized assessment.'}
                                            </p>
                                        </div>

                                        <div className="flex items-center gap-6 py-4 border-y border-white/5">
                                            <div className="flex items-center gap-2">
                                                <Clock size={14} className="text-white/20" />
                                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">{draft.duration}m</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-white/20" />
                                                <span className="text-[10px] font-bold text-white/40 uppercase tracking-wider">
                                                    {draft.last_saved ? formatDate(draft.last_saved) : 'Unknown'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 pt-2">
                                            <button
                                                onClick={() => handleResumeDraft(draft)}
                                                className="flex-1 h-16 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-[#a6b1ff] transition-all group/btn shadow-xl"
                                            >
                                                <Play size={16} fill="currentColor" />
                                                Resume
                                            </button>
                                            <button
                                                onClick={() => handleDeleteDraft(draft.id || idx)}
                                                className="w-16 h-16 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center hover:bg-rose-500 hover:text-white transition-all shadow-xl"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}
