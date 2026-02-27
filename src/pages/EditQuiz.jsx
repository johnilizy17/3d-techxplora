import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Loader2,
    ArrowLeft,
    Code,
    List,
    CheckCircle,
    Save,
    RotateCcw
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from 'sonner';

import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { selectTempStorage } from '@/redux/slices/authSlice';
import { useGetQuestionsByQuizIdQuery, useUpdateQuestionMutation } from '@/redux/api/questionApi';

// Syntax Highlighted Code Helper (Ported from V1)
const SyntaxHighlightedCode = ({ code = "", language }) => {
    const lines = code.split("\n");

    const getTokenColor = (token, lang) => {
        if (lang === "javascript" || lang === "json") {
            if (["true", "false", "null"].includes(token)) return "text-purple-400";
            if (token.includes('"')) return "text-emerald-400"; // JSON keys & strings
            if (/^[0-9]+$/.test(token)) return "text-blue-400"; // numbers
        }
        if (lang === "html") {
            if (token.startsWith("<") || token.endsWith(">")) return "text-blue-400";
            if (token.includes('=')) return "text-purple-400";
        }
        return "text-white/80";
    };

    const renderLine = (line, lineNumber) => {
        const tokens = line.split(/(\s+|[{}[\],:])/);

        return (
            <div key={lineNumber} className="flex">
                <div className="text-white/30 text-xs min-w-[30px] text-right select-none font-mono mr-4">
                    {lineNumber}
                </div>
                <div className="text-sm font-mono whitespace-pre text-white/80">
                    {tokens.map((token, index) => (
                        <span key={index} className={getTokenColor(token, language)}>
                            {token}
                        </span>
                    ))}
                </div>
            </div>
        );
    };

    return <div className="font-mono bg-[#0f111a] p-4 rounded-xl overflow-x-auto">{lines.map((line, idx) => renderLine(line, idx + 1))}</div>;
};

// Helper to format options as string
const formatOptions = (options) => {
    if (!options || !Array.isArray(options)) return "";
    return options.map((item) => item.option).join("\n");
};

// Helper to get correct answer as string
const getCorrectAnswer = (options) => {
    if (!options || !Array.isArray(options)) return "";
    const correct = options.find((item) => item.is_correct);
    return correct ? "Answer: " + correct.option : "No correct answer set";
};

export default function EditQuiz() {
    const navigate = useNavigate();
    const tempStorage = useSelector(selectTempStorage);
    const quizId = tempStorage?.id;

    // Redirect if no quiz selected
    useEffect(() => {
        if (!quizId) {
            navigate('/dashboard/quizzes');
        }
    }, [quizId, navigate]);

    const { data: questionsResults, isLoading } = useGetQuestionsByQuizIdQuery(quizId, {
        skip: !quizId
    });

    const [updateQuestion, { isLoading: isUpdating }] = useUpdateQuestionMutation();

    // Safety check for questions array
    const questions = Array.isArray(questionsResults) ? questionsResults : (questionsResults?.data || []);

    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);
    const [localQuestion, setLocalQuestion] = useState(null);
    const [activeTab, setActiveTab] = useState("question"); // question, options, answer

    const selectedQuestion = questions[selectedQuestionIndex];

    // Initialize local state when selected question changes
    useEffect(() => {
        if (selectedQuestion) {
            setLocalQuestion(JSON.parse(JSON.stringify(selectedQuestion)));
        }
    }, [selectedQuestionIndex, questions]);

    const handleTabChange = (val) => {
        setActiveTab(val);
    };

    const handleBack = () => navigate('/dashboard/quizzes');

    const [rawOptions, setRawOptions] = useState("");

    useEffect(() => {
        if (localQuestion?.options) {
            setRawOptions(JSON.stringify(localQuestion.options, null, 2));
        }
    }, [localQuestion?.id]); // Reset when question changes

    const handleSave = async () => {
        if (!localQuestion) return;

        try {
            // If editing options via raw text, ensure it's valid
            let payload = { ...localQuestion };
            if (activeTab === 'options') {
                try {
                    payload.options = JSON.parse(rawOptions);
                } catch (e) {
                    toast.error("Invalid JSON in Options");
                    return;
                }
            }

            await updateQuestion({
                id: localQuestion.id,
                question: payload.question,
                options: payload.options
                // answers/is_correct is inside options
            }).unwrap();

            toast.success("Question updated successfully");
            navigate('/dashboard/quizzes');
        } catch (error) {
            console.error(error);
            toast.error("Failed to update question");
        }
    };

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-screen">
                    <Loader2 className="w-10 h-10 text-white animate-spin" />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[#0a0a0a]">

                {/* Sidebar */}
                <div className="w-20 lg:w-72 bg-white/5 border-r border-white/10 flex flex-col">
                    <div className="p-4 lg:p-6 border-b border-white/10">
                        <div onClick={handleBack} className="flex items-center gap-3 cursor-pointer text-white/60 hover:text-white transition-colors group">
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-bold text-sm uppercase tracking-wider hidden lg:block">Back</span>
                        </div>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-2 custom-scrollbar">
                        {questions.map((q, idx) => (
                            <button
                                key={q.id || idx}
                                onClick={() => setSelectedQuestionIndex(idx)}
                                className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${selectedQuestionIndex === idx
                                    ? 'bg-[#a6b1ff] text-[#0a0a0a] shadow-lg shadow-[#a6b1ff]/20'
                                    : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs ${selectedQuestionIndex === idx ? 'bg-black/10' : 'bg-white/10'
                                    }`}>
                                    {idx + 1}
                                </div>
                                <div className="font-bold text-sm hidden lg:block truncate text-left flex-1">
                                    Question {idx + 1}
                                </div>
                            </button>
                        ))}
                        {questions.length === 0 && (
                            <div className="text-white/30 text-center text-xs py-10">
                                No questions found.
                            </div>
                        )}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 flex flex-col bg-[#0a0a0a]">
                    {/* Header */}
                    <div className="h-20 border-b border-white/10 flex items-center justify-between px-8 bg-[#0a0a0a]">
                        <div className="flex items-center gap-4">
                            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-[400px]">
                                <TabsList className="bg-white/5 border border-white/10 p-1 h-12 rounded-xl">
                                    <TabsTrigger value="question" className="data-[state=active]:bg-[#a6b1ff] data-[state=active]:text-black text-white/60 rounded-lg px-6 h-10 text-xs font-bold uppercase tracking-wide">Question</TabsTrigger>
                                    <TabsTrigger value="options" className="data-[state=active]:bg-[#a6b1ff] data-[state=active]:text-black text-white/60 rounded-lg px-6 h-10 text-xs font-bold uppercase tracking-wide">Options</TabsTrigger>
                                    <TabsTrigger value="answer" className="data-[state=active]:bg-[#a6b1ff] data-[state=active]:text-black text-white/60 rounded-lg px-6 h-10 text-xs font-bold uppercase tracking-wide">Answer</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                <CheckCircle size={14} />
                                {questions.length} Questions
                            </div>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 overflow-hidden relative">
                        <div className="absolute inset-0 p-8 overflow-y-auto custom-scrollbar">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={`${selectedQuestionIndex}-${activeTab}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="h-full"
                                >
                                    {localQuestion ? (
                                        <div className="h-full bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                                            <div className="p-4 bg-white/5 border-b border-white/10 flex items-center justify-between">
                                                <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                                                    <Code size={14} />
                                                    {activeTab === 'question' ? 'HTML Editor' : activeTab === 'options' ? 'JSON Editor' : 'Answer View'}
                                                </div>
                                            </div>
                                            <div className="flex-1 bg-[#0f111a] relative">
                                                {activeTab === 'question' && (
                                                    <textarea
                                                        value={localQuestion.question}
                                                        onChange={(e) => setLocalQuestion({ ...localQuestion, question: e.target.value })}
                                                        className="w-full h-full bg-transparent text-white font-mono p-4 resize-none focus:outline-none focus:ring-1 focus:ring-[#a6b1ff]/30"
                                                        placeholder="Enter question HTML..."
                                                    />
                                                )}
                                                {activeTab === 'options' && (
                                                    <textarea
                                                        value={rawOptions}
                                                        onChange={(e) => setRawOptions(e.target.value)}
                                                        className="w-full h-full bg-transparent text-white font-mono p-4 resize-none focus:outline-none focus:ring-1 focus:ring-[#a6b1ff]/30"
                                                        placeholder="Enter options JSON..."
                                                    />
                                                )}
                                                {activeTab === 'answer' && (
                                                    <div className="p-4 h-full bg-transparent">
                                                        <div className="text-white/60 mb-2 text-xs uppercase tracking-widest">Derived from Options (Read Only)</div>
                                                        <SyntaxHighlightedCode code={getCorrectAnswer(localQuestion.options)} language="javascript" />
                                                        {/* Note: Answer is derived from options. To edit answer, user must edit 'is_correct' in Options JSON */}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center h-full text-white/30">
                                            <List size={48} className="mb-4 opacity-50" />
                                            <p className="text-sm font-bold uppercase tracking-widest">Select a question to view details</p>
                                        </div>
                                    )}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    {localQuestion && (
                        <div className="h-16 border-t border-white/10 bg-[#0a0a0a] flex items-center justify-between px-8">
                            <div className="text-xs text-white/40 font-mono">
                                ID: {localQuestion.id}
                            </div>
                            <Button
                                onClick={handleSave}
                                disabled={isUpdating}
                                className="bg-[#a6b1ff] text-black hover:bg-[#95a0f5] font-bold uppercase text-xs tracking-wider"
                            >
                                {isUpdating ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : <Save className="w-4 h-4 mr-2" />}
                                Save Changes
                            </Button>
                        </div>
                    )}

                    <div style={{ height: 100 }} />
                </div>

            </div>
        </DashboardLayout>
    );
}
