import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Sparkles, X, ChevronRight, ChevronLeft, Target, BookOpen, CheckCircle2, AlertCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { model } from '@/utils/firebase';
import { setTemporaryStorage, selectTempStorage } from '@/redux/slices/authSlice';
import { useGetSyllabusQuery } from '@/redux/api/teacherApi';
import { toast } from 'sonner';

const STEPS = [
    { title: "Select Syllabus", icon: BookOpen },
    { title: "Question Settings", icon: Target }
];

export default function AIGenerationDrawer({ isOpen, onClose }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const tempStorage = useSelector(selectTempStorage);
    const { data: syllabusResults, isLoading: isSyllabusLoading } = useGetSyllabusQuery();

    const [currentStep, setCurrentStep] = useState(0);
    const [selectedSyllabus, setSelectedSyllabus] = useState([]);
    const [quizNumber, setQuizNumber] = useState(5);
    const [isGenerating, setIsGenerating] = useState(false);

    const syllabus = syllabusResults?.data || syllabusResults || [];

    useEffect(() => {
        if (!isOpen) {
            setCurrentStep(0);
            setSelectedSyllabus([]);
        }
    }, [isOpen]);

    const handleToggleSyllabus = (id) => {
        setSelectedSyllabus(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleSelectAll = () => {
        if (selectedSyllabus.length === syllabus.length) {
            setSelectedSyllabus([]);
        } else {
            setSelectedSyllabus(syllabus.map(s => s.id));
        }
    };

    const cleanJsonResponse = (rawText) => {
        try {
            // Remove code fences ```json ... ```
            const cleaned = rawText.replace(/```json|```/g, "").trim();
            return JSON.parse(cleaned);
        } catch (err) {
            console.error("Invalid JSON format from AI:", err);
            return null;
        }
    };

    const handleGenerate = async () => {
        if (quizNumber < 1) {
            toast.error("Please enter a valid number of questions");
            return;
        }

        setIsGenerating(true);
        try {
            const filteredSyllabus = syllabus.filter(s => selectedSyllabus.includes(s.id));

            const prompt = `
                Generate a set of quiz questions for a quiz titled "${tempStorage?.title || 'General Quiz'}".
                Syllabus Topics to cover: ${JSON.stringify(filteredSyllabus)}
                Additional Description: ${tempStorage?.description || 'N/A'}
                Number of questions: ${quizNumber}
                Important: Priority should be given to topics found in the syllabus provided.

                REQUIRED JSON FORMAT:
                {
                    "title": string,
                    "description": string,
                    "questions": [
                        {
                            "question": string,
                            "options": [
                                { "option": string, "is_correct": boolean },
                                { "option": string, "is_correct": boolean },
                                { "option": string, "is_correct": boolean },
                                { "option": string, "is_correct": boolean }
                            ]
                        }
                    ]
                }
                Return ONLY the JSON. No preamble or explanation.
            `;

            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();

            const parsedQuiz = cleanJsonResponse(text);

            if (parsedQuiz) {
                dispatch(setTemporaryStorage({
                    ...tempStorage,
                    ...parsedQuiz,
                    generated_prompt: prompt
                }));
                toast.success("Questions generated successfully!");
                navigate('/dashboard/teacher/ai-review'); // Updated to a more standard route name
                onClose();
            } else {
                toast.error("Failed to parse AI response. Please try again.");
            }
        } catch (error) {
            console.error("AI Generation Error:", error);
            toast.error("Failed to generate questions. Check your connection or AI quota.");
        } finally {
            setIsGenerating(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex justify-end">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="relative w-full max-w-xl h-full bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <Bot className="text-white" size={28} />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-white uppercase italic tracking-tight">AI Question <span className="text-blue-400">Generator</span></h2>
                            <p className="text-white/40 text-xs font-medium tracking-wider uppercase">Powered by TechXplora AI</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-3 hover:bg-white/5 rounded-2xl transition-colors text-white/50 hover:text-white">
                        <X size={24} />
                    </button>
                </div>

                {/* Progress Bar */}
                <div className="px-8 py-6 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex items-center justify-between mb-2">
                        {STEPS.map((step, idx) => (
                            <div key={idx} className="flex flex-col items-center gap-2 flex-1 relative">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${currentStep > idx ? 'bg-emerald-500 text-white' :
                                        currentStep === idx ? 'bg-blue-600 text-white scale-110 shadow-lg shadow-blue-600/20' :
                                            'bg-white/5 text-white/30 border border-white/10'
                                    }`}>
                                    <step.icon size={20} />
                                </div>
                                <span className={`text-[10px] font-black uppercase tracking-widest ${currentStep >= idx ? 'text-white' : 'text-white/20'
                                    }`}>{step.title}</span>

                                {idx < STEPS.length - 1 && (
                                    <div className="absolute top-5 left-[calc(50%+25px)] w-[80%] h-[2px] bg-white/10 -z-10">
                                        <div
                                            className="h-full bg-emerald-500 transition-all duration-500"
                                            style={{ width: currentStep > idx ? '100%' : '0%' }}
                                        />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Content Area */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                    <AnimatePresence mode="wait">
                        {currentStep === 0 && (
                            <motion.div
                                key="step0"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                        <BookOpen className="text-blue-400" size={20} />
                                        Syllabus Selection
                                    </h3>
                                    <button
                                        onClick={handleSelectAll}
                                        className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 transition-colors"
                                    >
                                        {selectedSyllabus.length === syllabus.length ? 'Deselect All' : 'Select All'}
                                    </button>
                                </div>

                                {isSyllabusLoading ? (
                                    <div className="flex flex-col items-center justify-center py-20 gap-4">
                                        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                                        <p className="text-white/40 text-sm font-medium animate-pulse">Loading syllabus data...</p>
                                    </div>
                                ) : syllabus.length > 0 ? (
                                    <div className="grid gap-3">
                                        {syllabus.map((item) => (
                                            <button
                                                key={item.id}
                                                onClick={() => handleToggleSyllabus(item.id)}
                                                className={`flex items-start gap-4 p-4 rounded-2xl border transition-all duration-300 text-left group ${selectedSyllabus.includes(item.id)
                                                        ? 'bg-blue-600/10 border-blue-500/50 shadow-lg shadow-blue-500/5'
                                                        : 'bg-white/5 border-white/10 hover:border-white/20'
                                                    }`}
                                            >
                                                <div className={`mt-1 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${selectedSyllabus.includes(item.id)
                                                        ? 'bg-blue-500 border-blue-500'
                                                        : 'border-white/20 group-hover:border-white/40'
                                                    }`}>
                                                    {selectedSyllabus.includes(item.id) && <CheckCircle2 size={12} className="text-white" />}
                                                </div>
                                                <div className="flex-1">
                                                    <p className={`font-bold transition-colors ${selectedSyllabus.includes(item.id) ? 'text-white' : 'text-white/70'
                                                        }`}>{item.title}</p>
                                                    <p className="text-xs text-white/40 line-clamp-2 mt-1 font-medium">{item.description}</p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
                                        <AlertCircle className="mx-auto text-amber-400 mb-4" size={48} />
                                        <h4 className="text-white font-bold mb-2">No Syllabus Found</h4>
                                        <p className="text-white/40 text-sm">You need to add topics to your syllabus first before generating AI questions.</p>
                                    </div>
                                )}
                            </motion.div>
                        )}

                        {currentStep === 1 && (
                            <motion.div
                                key="step1"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-10"
                            >
                                <div className="p-8 rounded-[2rem] bg-gradient-to-br from-blue-600/10 via-purple-600/10 to-transparent border border-white/10 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl -z-10" />

                                    <h3 className="text-lg font-bold text-white mb-8 flex items-center gap-2">
                                        <Target className="text-purple-400" size={20} />
                                        Generation Parameters
                                    </h3>

                                    <div className="space-y-8">
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-between px-1">
                                                <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Questions Count</label>
                                                <span className="text-3xl font-black text-blue-400 italic font-mono">{quizNumber}</span>
                                            </div>
                                            <input
                                                type="range"
                                                min="1"
                                                max="20"
                                                step="1"
                                                value={quizNumber}
                                                onChange={(e) => setQuizNumber(parseInt(e.target.value))}
                                                className="w-full h-2 bg-white/10 rounded-full appearance-none cursor-pointer accent-blue-500"
                                            />
                                            <div className="flex justify-between text-[10px] font-bold text-white/20 uppercase">
                                                <span>Quick Quiz</span>
                                                <span>Deep Assessment</span>
                                            </div>
                                        </div>

                                        <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4">
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0">
                                                    <Sparkles size={20} className="text-orange-400" />
                                                </div>
                                                <div className="space-y-1">
                                                    <h4 className="text-xs font-black text-white uppercase tracking-wider">AI Insight</h4>
                                                    <p className="text-xs text-white/40 font-medium leading-relaxed">
                                                        Targeting {selectedSyllabus.length} topic{selectedSyllabus.length !== 1 ? 's' : ''}.
                                                        Estimated generation time: ~10 seconds.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Footer */}
                <div className="p-8 border-t border-white/10 bg-white/[0.02]">
                    <div className="flex items-center gap-4">
                        {currentStep > 0 && (
                            <button
                                onClick={() => setCurrentStep(prev => prev - 1)}
                                className="px-6 py-4 rounded-2xl border border-white/10 text-white font-black uppercase tracking-widest text-xs flex items-center gap-2 hover:bg-white/5 transition-colors"
                            >
                                <ChevronLeft size={18} />
                                Back
                            </button>
                        )}

                        <button
                            disabled={isGenerating || (currentStep === 0 && selectedSyllabus.length === 0)}
                            onClick={currentStep === 1 ? handleGenerate : () => setCurrentStep(prev => prev + 1)}
                            className={`flex-1 relative h-[64px] rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black uppercase tracking-widest text-sm overflow-hidden shadow-xl group transition-all duration-300 ${isGenerating || (currentStep === 0 && selectedSyllabus.length === 0) ? 'opacity-50 grayscale' : 'hover:scale-[1.02] active:scale-[0.98]'
                                }`}
                        >
                            <span className="relative z-10 flex items-center justify-center gap-3">
                                {isGenerating ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                        Exploring the Knowledge Base...
                                    </>
                                ) : currentStep === 1 ? (
                                    <>
                                        Initiate Generation
                                        <Sparkles size={20} />
                                    </>
                                ) : (
                                    <>
                                        Next Phase
                                        <ChevronRight size={20} />
                                    </>
                                )}
                            </span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
