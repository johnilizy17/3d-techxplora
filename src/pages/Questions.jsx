import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import QuestionSelection from '@/components/teacher/QuestionSelection';
import QuizResults from '@/components/teacher/QuizResults';
import ManualQuestion from './ManualQuestion';
import { selectTempStorage } from '@/redux/slices/authSlice';
import { useGetQuestionsByQuizIdQuery } from '@/redux/api/questionApi';
import { Loader2, Sparkles, AlertCircle } from 'lucide-react';

export default function Questions() {
    const location = useLocation();
    const navigate = useNavigate();
    const tempStorage = useSelector(selectTempStorage);

    const queryParams = new URLSearchParams(location.search);
    const isManualMode = queryParams.get('manual') === 'true';

    // Fetch questions for the currently selected quiz in tempStorage
    const { data: questionsResults, isLoading, isError } = useGetQuestionsByQuizIdQuery(tempStorage?.id, {
        skip: !tempStorage?.id
    });

    const questions = questionsResults?.data || questionsResults || [];
    const hasQuestions = questions.length > 0;

    // Logic: 
    // 1. If no tempStorage (no quiz selected), redirect back to quizzes list
    // 2. If it's manual mode, show the selection/creation interface (handled by QuestionSelection)
    // 3. If quiz has questions and it's NOT manual mode, show results/stats
    // 4. Otherwise, show selection interface

    useEffect(() => {
        if (!tempStorage?.id && !isLoading) {
            navigate('/dashboard/quizzes');
        }
    }, [tempStorage, navigate, isLoading]);

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-20">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center h-[60vh] gap-6"
                        >
                            <div className="relative">
                                <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
                                <Sparkles className="absolute -top-2 -right-2 text-purple-500 animate-pulse" size={24} />
                            </div>
                            <div className="text-center space-y-2">
                                <h2 className="text-xl font-black text-white italic uppercase tracking-tighter">Synchronizing Data</h2>
                                <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">Intercepting knowledge streams...</p>
                            </div>
                        </motion.div>
                    ) : (isError || !hasQuestions) && !isManualMode ? (
                        <motion.div
                            key="selection"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.02 }}
                            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10"
                        >
                            <QuestionSelection />
                        </motion.div>
                    ) : isManualMode ? (
                        <motion.div
                            key="manual"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <ManualQuestion />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10"
                        >
                            <QuizResults />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </DashboardLayout>
    );
}
