import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Trash2,
    ChevronRight,
    ChevronLeft,
    CheckCircle2,
    AlertCircle,
    Save,
    Layout,
    PlusCircle,
    X,
    Sparkles,
    Target
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setTemporaryStorage, selectTempStorage } from '@/redux/slices/authSlice';
import { useCreateQuestionMutation } from '@/redux/api/questionApi';
import { toast } from 'sonner';
import { saveDraft } from '@/utils/draftUtils';

const STEPS = [
    { title: "Initialize node", icon: Target },
    { title: "Construction", icon: Layout }
];

export default function ManualQuestion() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tempStorage = useSelector(selectTempStorage);
    const [createQuestion, { isLoading: isSubmitting }] = useCreateQuestionMutation();

    const [currentStep, setCurrentStep] = useState(0); // 0: Init, 1: Construction
    const [questionCount, setQuestionCount] = useState(5);
    const [questions, setQuestions] = useState([]);
    const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);

    // Load from tempStorage if it's a resumed manual draft
    useEffect(() => {
        if (tempStorage?.is_manual && tempStorage?.questions?.length > 0) {
            setQuestions(tempStorage.questions);
            setQuestionCount(tempStorage.questions.length);
            setCurrentStep(1);
        }
    }, []); // Only on mount to avoid loops during editing

    // Initialize questions when moving to step 1
    const handleInitialize = () => {
        const initialQuestions = Array.from({ length: questionCount }, () => ({
            question: '',
            options: [
                { option: '', is_correct: true },
                { option: '', is_correct: false },
                { option: '', is_correct: false },
                { option: '', is_correct: false }
            ]
        }));
        setQuestions(initialQuestions);
        setCurrentStep(1);
    };

    const handleUpdateQuestion = (field, value) => {
        const updated = [...questions];
        updated[activeQuestionIdx][field] = value;
        setQuestions(updated);
    };

    const handleUpdateOption = (optIdx, field, value) => {
        const updated = [...questions];
        updated[activeQuestionIdx].options[optIdx][field] = value;

        // If setting as correct, unset others
        if (field === 'is_correct' && value === true) {
            updated[activeQuestionIdx].options = updated[activeQuestionIdx].options.map((opt, i) => ({
                ...opt,
                is_correct: i === optIdx
            }));
        }

        setQuestions(updated);
    };

    const handleAddOption = () => {
        const updated = [...questions];
        if (updated[activeQuestionIdx].options.length < 6) {
            updated[activeQuestionIdx].options.push({ option: '', is_correct: false });
            setQuestions(updated);
        } else {
            toast.error("Maximum 6 options allowed node.");
        }
    };

    const handleRemoveOption = (optIdx) => {
        const updated = [...questions];
        if (updated[activeQuestionIdx].options.length > 2) {
            const wasCorrect = updated[activeQuestionIdx].options[optIdx].is_correct;
            updated[activeQuestionIdx].options.splice(optIdx, 1);
            if (wasCorrect) {
                updated[activeQuestionIdx].options[0].is_correct = true;
            }
            setQuestions(updated);
        } else {
            toast.error("Minimum 2 options required for stability.");
        }
    };

    const handleSaveDraft = () => {
        const draftData = {
            ...tempStorage,
            questions,
            last_saved: new Date().toISOString(),
            is_manual: true
        };
        const success = saveDraft(draftData);
        if (success) toast.success("Draft synchronized to archives.");
    };

    const handleFinalize = async () => {
        // Validation
        const invalidIdx = questions.findIndex(q =>
            !q.question.trim() ||
            q.options.some(o => !o.option.trim()) ||
            !q.options.some(o => o.is_correct)
        );

        if (invalidIdx !== -1) {
            setActiveQuestionIdx(invalidIdx);
            toast.error(`Question ${invalidIdx + 1} is incomplete or unstable.`);
            return;
        }

        try {
            toast.loading("Deploying assessment nodes...", { id: 'deploy' });

            for (const q of questions) {
                await createQuestion({
                    quiz_id: tempStorage.id,
                    quiz_code: tempStorage.quiz_code,
                    question: q.question,
                    options: q.options,
                    duration: (tempStorage.duration || 60) / questions.length,
                    status: 1
                }).unwrap();
            }

            toast.success("Assessment synchronized successfully!", { id: 'deploy' });
            navigate('/dashboard/quizzes');
        } catch (error) {
            toast.error("Deployment failed. Check connection stats.", { id: 'deploy' });
        }
    };

    return (
        <div className="max-w-5xl mx-auto px-6 py-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                <div>
                    <h1 className="text-4xl lg:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                        Manual <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Construction</span>
                    </h1>
                    <p className="text-white/40 font-medium uppercase tracking-widest text-[11px] mt-4 flex items-center gap-2">
                        {currentStep === 0 ? "Step 1: Define assessment scale" : `Step 2: Constructing Node ${activeQuestionIdx + 1} of ${questions.length}`}
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={handleSaveDraft}
                        disabled={currentStep === 0}
                        className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase text-[10px] tracking-widest hover:bg-white/10 transition-all flex items-center gap-2 disabled:opacity-30"
                    >
                        <Save size={16} />
                        Backup State
                    </button>
                    {currentStep === 1 && (
                        <button
                            onClick={handleFinalize}
                            className="px-8 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl shadow-blue-500/20"
                        >
                            Finalize Sync
                        </button>
                    )}
                </div>
            </div>

            <AnimatePresence mode="wait">
                {currentStep === 0 ? (
                    <motion.div
                        key="init"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -z-10 group-hover:bg-blue-500/20 transition-colors duration-700" />

                        <div className="max-w-md mx-auto space-y-12">
                            <div className="w-24 h-24 rounded-[2.5rem] bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mx-auto shadow-2xl shadow-blue-500/20 rotate-3">
                                <Target size={48} className="text-white" />
                            </div>

                            <div className="space-y-4">
                                <h2 className="text-3xl font-black text-white italic uppercase tracking-tight">Assessment Scale</h2>
                                <p className="text-white/40 text-sm font-medium">Define the number of intelligence nodes to be constructed within this assessment framework.</p>
                            </div>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between px-2">
                                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em]">Scale Units</span>
                                    <span className="text-4xl font-black text-blue-400 italic font-mono">{questionCount}</span>
                                </div>
                                <input
                                    type="range"
                                    min="1"
                                    max="50"
                                    value={questionCount}
                                    onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                                    className="w-full h-3 bg-white/5 rounded-full appearance-none cursor-pointer accent-blue-500"
                                />
                                <div className="flex justify-between text-[9px] font-black text-white/20 uppercase tracking-widest">
                                    <span>Single Node</span>
                                    <span>Mass Assessment</span>
                                </div>
                            </div>

                            <button
                                onClick={handleInitialize}
                                className="w-full py-5 rounded-[2rem] bg-white text-black font-black uppercase tracking-[0.2em] text-xs hover:bg-[#a6b1ff] hover:scale-[1.02] transition-all shadow-2xl"
                            >
                                Initiate Construction
                            </button>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div
                        key="construction"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-8"
                    >
                        {/* Progress Tracker */}
                        <div className="flex gap-2 overflow-x-auto pb-4 custom-scrollbar">
                            {questions.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setActiveQuestionIdx(idx)}
                                    className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-black transition-all ${activeQuestionIdx === idx
                                        ? 'bg-blue-600 text-white scale-110 shadow-lg shadow-blue-600/20'
                                        : 'bg-white/5 text-white/30 hover:bg-white/10 border border-white/5'
                                        }`}
                                >
                                    {idx + 1}
                                </button>
                            ))}
                        </div>

                        {/* Editor Card */}
                        <div className="bg-white/[0.03] border border-white/5 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-[80px]" />

                            <div className="relative z-10 space-y-10">
                                {/* Question Input */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Primary Prompt</label>
                                        <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[9px] font-black text-blue-400 uppercase tracking-widest">
                                            Node {activeQuestionIdx + 1}
                                        </div>
                                    </div>
                                    <textarea
                                        value={questions[activeQuestionIdx].question}
                                        onChange={(e) => handleUpdateQuestion('question', e.target.value)}
                                        placeholder="Formulate your inquiry here..."
                                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl p-6 text-xl font-bold text-white placeholder:text-white/10 focus:outline-none focus:border-blue-500/50 min-h-[150px] transition-all"
                                    />
                                </div>

                                {/* Options */}
                                <div className="space-y-6">
                                    <div className="flex items-center justify-between">
                                        <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Option Manifest</label>
                                        <button
                                            onClick={handleAddOption}
                                            className="text-[10px] font-black text-blue-400 hover:text-blue-300 uppercase tracking-widest flex items-center gap-2 transition-colors"
                                        >
                                            <Plus size={14} />
                                            Append Option
                                        </button>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {questions[activeQuestionIdx].options.map((opt, optIdx) => (
                                            <div
                                                key={optIdx}
                                                className={`group relative p-4 rounded-2xl border transition-all duration-300 ${opt.is_correct
                                                    ? 'bg-emerald-500/10 border-emerald-500/50 shadow-lg shadow-emerald-500/5'
                                                    : 'bg-white/[0.02] border-white/10 hover:border-white/20'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-4">
                                                    <button
                                                        onClick={() => handleUpdateOption(optIdx, 'is_correct', true)}
                                                        className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${opt.is_correct
                                                            ? 'bg-emerald-500 border-emerald-500 rotate-0'
                                                            : 'border-white/20 hover:border-white/40 rotate-45'
                                                            }`}
                                                    >
                                                        {opt.is_correct && <CheckCircle2 size={14} className="text-white" />}
                                                    </button>
                                                    <input
                                                        value={opt.option}
                                                        onChange={(e) => handleUpdateOption(optIdx, 'option', e.target.value)}
                                                        placeholder={`Inflow option ${optIdx + 1}`}
                                                        className="flex-1 bg-transparent border-none p-0 text-white font-bold placeholder:text-white/10 focus:ring-0 text-sm"
                                                    />
                                                    <button
                                                        onClick={() => handleRemoveOption(optIdx)}
                                                        className="opacity-0 group-hover:opacity-100 p-2 hover:bg-rose-500/10 text-rose-500/40 hover:text-rose-500 rounded-lg transition-all"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Navigation */}
                                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                                    <button
                                        onClick={() => setActiveQuestionIdx(Math.max(0, activeQuestionIdx - 1))}
                                        disabled={activeQuestionIdx === 0}
                                        className="p-4 rounded-xl border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all disabled:opacity-0"
                                    >
                                        <ChevronLeft size={24} />
                                    </button>

                                    <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em]">
                                        Node Navigation
                                    </div>

                                    <button
                                        onClick={() => setActiveQuestionIdx(Math.min(questions.length - 1, activeQuestionIdx + 1))}
                                        disabled={activeQuestionIdx === questions.length - 1}
                                        className="p-4 rounded-xl border border-white/10 text-white/40 hover:text-white hover:bg-white/5 transition-all disabled:opacity-0"
                                    >
                                        <ChevronRight size={24} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
