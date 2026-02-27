import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGetQuizzesQuery } from '@/redux/api/teacherApi';
import { selectCurrentUser, setTemporaryStorage } from '@/redux/slices/authSlice';
import EmptyState from './EmptyState';
import QuizCard from './QuizCard';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function RecentQuizzes() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const type = user?.accountable_type === "App\\Models\\Student" ? "student" : "teacher";

    const { data: quizzesData, isLoading } = useGetQuizzesQuery({ type, id: user?.id }, {
        skip: !user?.id
    });

    const quizzes = Array.isArray(quizzesData) ? quizzesData : (quizzesData?.data || []);
    // Only show first 3 for the dashboard
    const displayQuizzes = quizzes.slice(0, 3);

    const handleQuizClick = (quiz) => {
        dispatch(setTemporaryStorage(quiz));
        if (type === "student") {
            navigate(`/dashboard/quizzes/details?code=${quiz.quiz_code}`);
        } else {
            navigate(`/dashboard/teacher/question?code=${quiz.quiz_code}`);
        }
    };

    if (isLoading) {
        return (
            <div className="py-12 flex justify-center">
                <div className="relative w-10 h-10">
                    <div className="absolute inset-0 rounded-full border-2 border-[#a6b1ff]/20"></div>
                    <div className="absolute inset-0 rounded-full border-t-2 border-[#a6b1ff] animate-spin"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="py-8 space-y-6">
            <div className="px-6 lg:px-0 flex justify-between items-end">
                <div>
                    <h2 className="text-2xl font-black text-foreground tracking-tight leading-none mb-2">RECENT QUIZZES</h2>
                    <div className="h-1 w-12 bg-gradient-to-r from-[#a6b1ff] to-transparent rounded-full" />
                </div>
                <button
                    onClick={() => navigate('/dashboard/quizzes')}
                    className="group text-sm font-black text-[#a6b1ff] hover:text-foreground flex items-center gap-2 transition-all duration-300 uppercase tracking-widest"
                >
                    Expand All
                    <div className="p-1 rounded-full bg-accent group-hover:bg-[#a6b1ff]/20 transition-colors">
                        <ChevronRight size={16} />
                    </div>
                </button>
            </div>

            {quizzes.length === 0 ? (
                <div className="bg-card border border-border rounded-[2rem] p-12 mx-6 lg:mx-0">
                    <EmptyState title="No Quizzes Found" description="Launch your first challenge or join one to see it here." />
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-6 lg:px-0 pb-6">
                    {displayQuizzes.map((quiz, index) => (
                        <QuizCard key={quiz.id || index} quiz={quiz} index={index} onClick={() => handleQuizClick(quiz)} />
                    ))}
                </div>
            )}
        </div>
    );
}
