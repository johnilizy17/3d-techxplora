import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/redux/slices/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft, Circle, Trophy, Clock,
    AlertCircle, Loader2, Target, ChevronRight, Send
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { useGetStudentCourseByIdQuery } from '@/redux/api/studentApi';

export default function CourseQuiz() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    // Fetch Course Details
    const { data: courseData, isLoading: isCourseLoading, error: courseError } = useGetStudentCourseByIdQuery(courseId);
    const course = courseData?.data || courseData;

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [score, setScore] = useState(0);
    const [timeRemaining, setTimeRemaining] = useState(50); // 50 seconds per question

    // Parse manual quiz questions
    const manualQuiz = course?.manual_quiz || [];
    const currentQuestion = manualQuiz[currentQuestionIndex];

    // Timer effect - 50 seconds per question
    useEffect(() => {
        if (!quizCompleted && manualQuiz.length > 0) {
            const timer = setInterval(() => {
                setTimeRemaining((prev) => {
                    if (prev <= 1) {
                        // Time's up - auto move to next question
                        handleNextQuestion();
                        return 50; // Reset for next question
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [quizCompleted, currentQuestionIndex, manualQuiz.length]);

    // Reset timer when question changes
    useEffect(() => {
        setTimeRemaining(50);
    }, [currentQuestionIndex]);

    // Redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            toast({
                title: "Authentication Required",
                description: "Please sign in to take this quiz.",
                variant: "destructive"
            });
            navigate(`/courses/${courseId}`);
        }
    }, [isAuthenticated, courseId, navigate, toast]);

    const handleAnswerSelect = (option) => {
        setUserAnswers(prev => ({
            ...prev,
            [currentQuestionIndex]: option
        }));
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < manualQuiz.length - 1) {
            setCurrentQuestionIndex(prev => prev + 1);
        } else {
            // Calculate score
            let correctCount = 0;
            manualQuiz.forEach((question, index) => {
                const userAnswer = userAnswers[index];
                const correctOption = question.options.find(opt => opt.is_correct);
                if (userAnswer === correctOption?.option) {
                    correctCount++;
                }
            });

            const finalScore = Math.round((correctCount / manualQuiz.length) * 100);
            setScore(finalScore);
            setQuizCompleted(true);

            toast({
                title: "Quiz Completed! 🎉",
                description: `You scored ${finalScore}%`,
                className: "bg-green-500 text-white border-none",
            });
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(prev => prev - 1);
        }
    };

    if (isCourseLoading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <div className="text-center space-y-4">
                    <Loader2 className="w-12 h-12 animate-spin text-[#a6b1ff] mx-auto" />
                    <p className="text-white/60 text-sm">Loading quiz...</p>
                </div>
            </div>
        );
    }

    if (courseError || !course) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mx-auto">
                        <AlertCircle className="w-8 h-8 text-red-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">Course Not Found</h2>
                    <p className="text-white/60">The course you're looking for doesn't exist.</p>
                    <Button onClick={() => navigate('/courses')} className="bg-[#a6b1ff] text-black">
                        Back to Courses
                    </Button>
                </div>
            </div>
        );
    }

    if (!manualQuiz || manualQuiz.length === 0) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-6">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mx-auto">
                        <AlertCircle className="w-8 h-8 text-amber-500" />
                    </div>
                    <h2 className="text-2xl font-bold text-white">No Quiz Available</h2>
                    <p className="text-white/60">This course doesn't have any quiz questions yet.</p>
                    <Button onClick={() => navigate(`/courses/${courseId}`)} className="bg-[#a6b1ff] text-black">
                        Back to Course
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            {/* Background Effects */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div 
                    className="absolute top-0 right-0 bg-indigo-200/20 dark:bg-indigo-600/5 rounded-full blur-[120px]"
                    style={{ width: '300px', height: '300px', marginRight: '-150px', marginTop: '-150px' }}
                />
                <div 
                    className="absolute bottom-0 left-0 bg-purple-200/20 dark:bg-purple-600/5 rounded-full blur-[100px]"
                    style={{ width: '250px', height: '250px', marginLeft: '-100px', marginBottom: '-100px' }}
                />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                {!quizCompleted ? (
                    <>
                        {/* Header */}
                        <div className="mb-8">
                            <Button
                                variant="ghost"
                                onClick={() => navigate(`/courses/${courseId}`)}
                                className="text-white/60 hover:text-white mb-4 -ml-2"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Course
                            </Button>

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                                        {course.title}
                                    </h1>
                                    <p className="text-white/60 text-sm">Course Quiz</p>
                                </div>

                                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
                                    <Clock className={`w-4 h-4 ${timeRemaining <= 10 ? 'text-red-500 animate-pulse' : 'text-[#a6b1ff]'}`} />
                                    <span className={`text-sm font-bold ${timeRemaining <= 10 ? 'text-red-500' : ''}`}>
                                        {timeRemaining}s
                                    </span>
                                </div>
                            </div>

                            {/* Progress */}
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-white/60">Progress</span>
                                    <span className="text-white font-semibold">
                                        {currentQuestionIndex + 1} / {manualQuiz.length}
                                    </span>
                                </div>
                                <Progress 
                                    value={((currentQuestionIndex + 1) / manualQuiz.length) * 100} 
                                    className="h-2"
                                />
                            </div>
                        </div>

                        {/* Question Card */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentQuestionIndex}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-6"
                            >
                                {/* Question */}
                                <div className="p-6 sm:p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
                                    <div className="flex items-start gap-4 mb-6">
                                        <div className="w-10 h-10 rounded-xl bg-[#a6b1ff]/20 flex items-center justify-center shrink-0">
                                            <Target className="w-5 h-5 text-[#a6b1ff]" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-xs font-bold text-[#a6b1ff] uppercase tracking-wider mb-2">
                                                Question {currentQuestionIndex + 1}
                                            </div>
                                            <h2 className="text-xl sm:text-2xl font-bold text-white">
                                                {currentQuestion?.question}
                                            </h2>
                                        </div>
                                    </div>

                                    {/* Options */}
                                    <div className="space-y-3">
                                        {currentQuestion?.options?.map((option, idx) => {
                                            const isSelected = userAnswers[currentQuestionIndex] === option.option;

                                            return (
                                                <button
                                                    key={idx}
                                                    onClick={() => handleAnswerSelect(option.option)}
                                                    className={`w-full p-4 sm:p-5 rounded-2xl border-2 text-left transition-all duration-300 flex items-center gap-4 group ${
                                                        isSelected
                                                            ? 'border-[#a6b1ff] bg-[#a6b1ff]/10'
                                                            : 'border-white/10 hover:border-white/30 bg-white/5'
                                                    }`}
                                                >
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                                                        isSelected ? 'bg-[#a6b1ff] text-black' : 'bg-white/5 text-white/40 group-hover:bg-white/10'
                                                    }`}>
                                                        <Circle size={18} />
                                                    </div>
                                                    <span className={`flex-1 text-sm sm:text-base ${
                                                        isSelected ? 'text-white font-semibold' : 'text-gray-300'
                                                    }`}>
                                                        {option.option}
                                                    </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Navigation Buttons */}
                                <div className="flex gap-3">
                                    {currentQuestionIndex > 0 && (
                                        <Button
                                            onClick={handlePreviousQuestion}
                                            variant="outline"
                                            className="flex-1 sm:flex-none border-white/20 text-white hover:bg-white/10 font-bold py-6 rounded-2xl"
                                        >
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            Previous
                                        </Button>
                                    )}
                                    <Button
                                        onClick={handleNextQuestion}
                                        className="flex-1 bg-gradient-to-r from-[#a6b1ff] to-[#c7aff8] hover:from-[#8b95cc] hover:to-[#b399e6] text-black font-bold py-6 rounded-2xl"
                                    >
                                        {currentQuestionIndex < manualQuiz.length - 1 ? (
                                            <>
                                                Next Question
                                                <ChevronRight className="w-4 h-4 ml-2" />
                                            </>
                                        ) : (
                                            <>
                                                Submit Quiz
                                                <Send className="w-4 h-4 ml-2" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </>
                ) : (
                    /* Completion Screen */
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="space-y-8 text-center"
                    >
                        {/* Score Display */}
                        <div className="p-8 sm:p-12 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-3xl backdrop-blur-xl">
                            <div className="text-6xl mb-6">
                                {score >= 70 ? '🎉' : score >= 50 ? '👍' : '📚'}
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Quiz Complete!</h2>
                            <div className="text-6xl sm:text-7xl font-black text-[#a6b1ff] mb-4">{score}%</div>
                            <p className="text-white/60 text-lg">
                                You answered {Math.round((score / 100) * manualQuiz.length)} out of {manualQuiz.length} questions correctly
                            </p>
                        </div>

                        {/* Performance Message */}
                        <div className={`p-6 border rounded-2xl text-left ${
                            score >= 70 
                                ? 'bg-green-500/10 border-green-500/30' 
                                : score >= 50
                                ? 'bg-amber-500/10 border-amber-500/30'
                                : 'bg-red-500/10 border-red-500/30'
                        }`}>
                            <h3 className={`text-lg font-bold mb-2 ${
                                score >= 70 ? 'text-green-300' : score >= 50 ? 'text-amber-300' : 'text-red-300'
                            }`}>
                                {score >= 70 ? 'Excellent Work!' : score >= 50 ? 'Good Effort!' : 'Keep Learning!'}
                            </h3>
                            <p className="text-white/60 text-sm">
                                {score >= 70 
                                    ? 'You have demonstrated a strong understanding of the course material. Great job!'
                                    : score >= 50
                                    ? 'You have a good grasp of the basics. Review the course material to improve further.'
                                    : 'Consider reviewing the course content and trying again to improve your understanding.'}
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            <Button
                                onClick={() => {
                                    setCurrentQuestionIndex(0);
                                    setUserAnswers({});
                                    setQuizCompleted(false);
                                    setScore(0);
                                    setTimeRemaining(50);
                                }}
                                variant="outline"
                                className="flex-1 border-white/20 text-white hover:bg-white/10 font-bold py-6 rounded-2xl"
                            >
                                Retry Quiz
                            </Button>
                            <Button
                                onClick={() => navigate(`/courses/${courseId}`)}
                                className="flex-1 bg-gradient-to-r from-[#a6b1ff] to-[#c7aff8] hover:from-[#8b95cc] hover:to-[#b399e6] text-black font-bold py-6 rounded-2xl"
                            >
                                Back to Course
                            </Button>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
