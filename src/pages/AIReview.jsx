import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Cpu,
    Save,
    Send,
    RefreshCw,
    ArrowLeft,
    Edit3,
    Trash2,
    CheckCircle2,
    AlertCircle,
    ChevronRight,
    MessageSquare,
    Zap,
    Layout
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectTempStorage, setTemporaryStorage } from '@/redux/slices/authSlice';
import { useCreateQuestionMutation } from '@/redux/api/questionApi';
import { model } from '@/utils/firebase';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { toast } from 'sonner';
import { saveDraft } from '@/utils/draftUtils';

export default function AIReview() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tempStorage = useSelector(selectTempStorage);
    const [createQuestion, { isLoading: isSubmitting }] = useCreateQuestionMutation();

    const [questions, setQuestions] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isRegenerating, setIsRegenerating] = useState(false);

    useEffect(() => {
        if (tempStorage?.questions) {
            setQuestions(tempStorage.questions);
        } else {
            navigate('/dashboard/teacher/question');
        }
    }, [tempStorage, navigate]);

    const activeQuestion = questions[activeIndex];

    const handleUpdateQuestion = (updatedFields) => {
        const updatedQuestions = [...questions];
        updatedQuestions[activeIndex] = { ...activeQuestion, ...updatedFields };
        setQuestions(updatedQuestions);
    };

    const handleUpdateOption = (optIndex, text) => {
        const updatedOptions = [...activeQuestion.options];
        updatedOptions[optIndex] = { ...updatedOptions[optIndex], option: text };
        handleUpdateQuestion({ options: updatedOptions });
    };

    const handleToggleCorrect = (optIndex) => {
        const updatedOptions = activeQuestion.options.map((opt, i) => ({
            ...opt,
            is_correct: i === optIndex
        }));
        handleUpdateQuestion({ options: updatedOptions });
    };

    const handleDeleteQuestion = () => {
        if (questions.length <= 1) {
            toast.error("You must have at least one question.");
            return;
        }
        const updatedQuestions = questions.filter((_, i) => i !== activeIndex);
        setQuestions(updatedQuestions);
        setActiveIndex(Math.max(0, activeIndex - 1));
        toast.success("Question removed.");
    };

    const handleRegenerate = async () => {
        if (!tempStorage?.generated_prompt) {
            toast.error("No prompt found to regenerate.");
            return;
        }

        setIsRegenerating(true);
        try {
            const result = await model.generateContent(tempStorage.generated_prompt);
            const response = await result.response;
            const text = response.text();

            // Basic cleanup helper for JSON
            const cleaned = text.replace(/```json|```/g, "").trim();
            const parsed = JSON.parse(cleaned);

            if (parsed && parsed.questions) {
                setQuestions(parsed.questions);
                setActiveIndex(0);
                toast.success("Questions regenerated successfully!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Regeneration failed.");
        } finally {
            setIsRegenerating(false);
        }
    };

    const handleSaveDraft = () => {
        const draftData = {
            ...tempStorage,
            questions,
            last_saved: new Date().toISOString()
        };
        const success = saveDraft(draftData);
        if (success) {
            toast.success("Assessment node backed up to archives.");
        } else {
            toast.error("Failed to synchronize archive.");
        }
    };

    const handleFinalize = async () => {
        if (questions.some(q => !q.question.trim() || q.options.some(o => !o.option.trim()) || !q.options.some(o => o.is_correct))) {
            toast.error("Please ensure all questions and options are filled, and each has a correct answer.");
            return;
        }

        try {
            // We loop and create each question. 
            // Optimal logic: The backend might have a batch endpoint, but we use what's available.
            const total = questions.length;
            let successCount = 0;

            toast.loading("Deploying assessment...", { id: "deploy" });

            for (const q of questions) {
                const payload = {
                    quiz_id: tempStorage.id,
                    quiz_code: tempStorage.quiz_code,
                    question: q.question,
                    options: q.options,
                    status: 1,
                    duration: JSON.stringify(Math.floor(JSON.parse(tempStorage.duration) / total))
                };
                await createQuestion(payload).unwrap();
                successCount++;
            }

            toast.success(`${successCount} questions deployed successfully!`, { id: "deploy" });
            navigate('/dashboard/quizzes');
        } catch (error) {
            console.error(error);
            toast.error("Failed to deploy some questions.", { id: "deploy" });
        }
    };

    if (!activeQuestion) return null;

    return (
        <DashboardLayout>
            <div className="flex flex-col lg:flex-row h-screen -mt-20 lg:mt-0 pt-20 lg:pt-0">
                {/* Sidebar Navigation */}
                <div className="w-full lg:w-80 bg-[#0a0a0a] border-r border-white/10 flex flex-col h-[300px] lg:h-full lg:overflow-hidden">
                    <div className="p-6 border-b border-white/10 bg-gradient-to-br from-blue-500/10 to-transparent">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                                <Cpu size={18} className="text-white" />
                            </div>
                            <h2 className="text-sm font-black text-white uppercase tracking-widest italic">Review <span className="text-blue-400">Lab</span></h2>
                        </div>
                        <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">Iteration {activeIndex + 1} of {questions.length}</p>
                    </div>

                    <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-2">
                        {questions.map((q, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`w-full p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 border ${i === activeIndex
                                    ? 'bg-blue-600/10 border-blue-500/50 text-white shadow-lg shadow-blue-500/10'
                                    : 'bg-white/[0.02] border-white/5 text-white/30 hover:bg-white/[0.04] hover:border-white/10'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black italic text-xs shrink-0 ${i === activeIndex ? 'bg-blue-500' : 'bg-white/10'
                                    }`}>
                                    {i + 1}
                                </div>
                                <div className="flex-1 text-left">
                                    <p className="text-[10px] font-black uppercase tracking-widest mb-0.5">Question {i + 1}</p>
                                    <p className="text-xs font-medium line-clamp-1 italic">{q.question}</p>
                                </div>
                            </button>
                        ))}
                    </div>

                    <div className="p-6 border-t border-white/10 bg-white/[0.02]">
                        <button
                            onClick={() => navigate(-1)}
                            className="w-full flex items-center justify-center gap-2 text-[10px] font-black text-white/20 uppercase tracking-[0.2em] hover:text-white transition-colors"
                        >
                            <ArrowLeft size={14} />
                            Return to method
                        </button>
                    </div>
                </div>

                {/* Main Editor */}
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#050505] p-6 lg:p-12">
                    <div className="max-w-4xl mx-auto space-y-10 pb-32">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="space-y-1">
                                <h1 className="text-3xl font-black text-white italic uppercase tracking-tight">Technical <span className="text-blue-400">Refinement</span></h1>
                                <p className="text-sm text-white/40 font-medium">Calibrate the intelligence parameters for assessment node {activeIndex + 1}.</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleRegenerate}
                                    disabled={isRegenerating}
                                    className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/60 hover:text-white hover:bg-white/10 transition-all flex items-center gap-2 group"
                                >
                                    <RefreshCw size={20} className={isRegenerating ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-700'} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Optimise AI</span>
                                </button>
                                <button
                                    onClick={handleSaveDraft}
                                    className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-500 hover:bg-amber-500 hover:text-black transition-all flex items-center gap-2 group"
                                >
                                    <Save size={20} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Backup Draft</span>
                                </button>
                                <button
                                    onClick={handleDeleteQuestion}
                                    className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-all"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Editor Surface */}
                        <div className="space-y-8">
                            {/* Question Input */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-[0.3em] px-2">
                                    <MessageSquare size={14} />
                                    Assessment Directive
                                </label>
                                <div className="relative group">
                                    <textarea
                                        value={activeQuestion.question}
                                        onChange={(e) => handleUpdateQuestion({ question: e.target.value })}
                                        className="w-full h-32 bg-white/[0.03] border border-white/10 rounded-[2rem] p-8 text-white font-bold placeholder:text-white/10 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.05] transition-all resize-none shadow-2xl"
                                        placeholder="Enter question prompt..."
                                    />
                                    <Edit3 className="absolute top-8 right-8 text-white/10 group-focus-within:text-blue-400 transition-colors" size={24} />
                                </div>
                            </div>

                            {/* Options Grid */}
                            <div className="space-y-4">
                                <label className="flex items-center gap-2 text-[10px] font-black text-white/30 uppercase tracking-[0.3em] px-2">
                                    <Layout size={14} />
                                    Potential Responses
                                </label>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {activeQuestion.options.map((opt, i) => (
                                        <div key={i} className={`relative group transition-all duration-500 rounded-3xl overflow-hidden border ${opt.is_correct ? 'bg-emerald-500/5 border-emerald-500/30 shadow-2xl shadow-emerald-500/5' : 'bg-white/[0.03] border-white/5'
                                            }`}>
                                            <div className="p-6 flex items-center gap-4">
                                                <button
                                                    onClick={() => handleToggleCorrect(i)}
                                                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${opt.is_correct ? 'bg-emerald-500 text-white scale-110' : 'bg-white/5 text-white/20 hover:bg-white/10'
                                                        }`}
                                                >
                                                    {opt.is_correct ? <CheckCircle2 size={20} /> : <div className="w-4 h-4 rounded-full border-2 border-current opacity-20" />}
                                                </button>
                                                <input
                                                    type="text"
                                                    value={opt.option}
                                                    onChange={(e) => handleUpdateOption(i, e.target.value)}
                                                    className="flex-1 bg-transparent border-none text-white font-bold focus:outline-none placeholder:text-white/5"
                                                    placeholder={`Option ${i + 1}...`}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Deployment Controls */}
                        <div className="fixed bottom-0 left-0 lg:left-80 right-0 p-8 bg-[#050505]/80 backdrop-blur-3xl border-t border-white/10 flex items-center justify-center z-50">
                            <div className="max-w-4xl w-full flex items-center gap-6">
                                <div className="hidden md:flex items-center gap-4 px-6 border-r border-white/10">
                                    <div>
                                        <p className="text-[10px] font-black text-white/20 uppercase">Total Nodes</p>
                                        <p className="text-xl font-black text-white italic">{questions.length}</p>
                                    </div>
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                                        <Zap className="text-blue-400" size={20} />
                                    </div>
                                </div>
                                <button
                                    disabled={isSubmitting}
                                    onClick={handleFinalize}
                                    className="flex-1 h-[72px] rounded-[2rem] bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black uppercase tracking-[0.2em] text-sm shadow-2xl flex items-center justify-center gap-4 group hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:grayscale"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <RefreshCw className="animate-spin" size={24} />
                                            Synchronizing Multi-Node Network...
                                        </>
                                    ) : (
                                        <>
                                            Synchronize & Launch Assessment
                                            <Send size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
