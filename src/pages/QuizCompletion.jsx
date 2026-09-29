import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    Clock,
    Trophy,
    Target,
    Zap,
    AlertCircle,
    ChevronRight,
    ChevronLeft,
    ArrowLeft,
    CheckCircle2,
    RotateCcw,
    Home,
    Brain,
    Sparkles,
    Shield,
    Loader2,
    Eye,
    Radio
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { selectCurrentUser, selectTempStorage } from '@/redux/slices/authSlice';
import { useGetQuestionsByQuizIdQuery, useSubmitQuizMutation, useVerifyQuizQuery } from '@/redux/api/questionApi';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { saveQuizProgress, loadQuizProgress, clearQuizProgress, clearExpiredProgress } from '@/utils/quizStorage';
import { useAntiCheating } from '@/hooks/useAntiCheating';
import { useLiveStreaming } from '@/hooks/useLiveStreaming';
import { useActivityLogger } from '@/hooks/useActivityLogger';
import { useWebRTCStream } from '@/hooks/useWebRTCStream';
import { useExamProctoring } from '@/hooks/useExamProctoring';
import ProctoringStatus from '@/components/proctoring/ProctoringStatus';

export default function QuizCompletion() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector(selectCurrentUser);
    const tempStorage = useSelector(selectTempStorage);

    const queryParams = new URLSearchParams(location.search);
    const quizCode = queryParams.get('code');

    const { data: questionsData, isLoading: isLoadingQuestions } = useGetQuestionsByQuizIdQuery(quizCode, {
        skip: !quizCode
    });

    const { data: quizDataVerify } = useVerifyQuizQuery(quizCode, {
        skip: !quizCode
    });

    const [submitQuiz, { isLoading: isSubmittingQuiz }] = useSubmitQuizMutation();

    const questions = questionsData?.data || questionsData || [];
    const quiz = quizDataVerify?.data || tempStorage || { title: "Mission Engagement", xp: 0 };

    const isGamingMode = Number(quiz?.mode_id) === 2;

    // Get actual quiz code for WebRTC room
    const actualQuizCode = quiz?.quiz_code || quizCode;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [timeLeft, setTimeLeft] = useState(30);
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [progressRestored, setProgressRestored] = useState(false);
    const [questionStartTime, setQuestionStartTime] = useState(Date.now());
    const [localCameraStream, setLocalCameraStream] = useState(null);

    const currentQuestion = questions[currentIndex];

    // Activity logging hook
    const {
        logQuestionViewed,
        logQuestionAnswered,
        logQuestionSkipped,
        logQuizCompleted,
        logQuizAbandoned,
    } = useActivityLogger(quizCode);

    // Exam Proctoring System
    const proctoringSystem = useExamProctoring({
        videoStream: localCameraStream,
        enabled: !isGamingMode && !showResults && questions.length > 0,
        onViolation: (violation) => {
            console.log('🚨 Proctoring Violation:', violation);

            // Show toast notification
            toast.error(
                <div className="space-y-1">
                    <p className="font-bold">⚠️ {violation.severity === 'cheating' ? 'Violation' : 'Warning'}</p>
                    <p className="text-sm">{violation.details}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                        Risk Score: +{violation.riskPoints}
                    </p>
                </div>,
                { duration: 5000 }
            );
        },
        onStatusChange: (status, violation) => {
            if (status === 'cheating') {
                console.error('🚨 EXAM TERMINATED - Cheating detected');

                // Terminate exam
                const event = new CustomEvent('examTerminated', {
                    detail: {
                        reason: 'proctoring_violation',
                        violation: violation,
                        timestamp: new Date().toISOString()
                    }
                });
                window.dispatchEvent(event);
            }
        },
        thresholds: {
            noFaceTimeout: 800,          // 0.8 seconds (very strict)
            multipleFacesTimeout: 500,   // 0.5 seconds (very strict)
            gazeAwayTimeout: 1500,       // 1.5 seconds (strict)
            gazeAwayRepeats: 2,          // 2 times (strict)
            talkingTimeout: 1500,        // 1.5 seconds (strict)
            audioThreshold: 0.05,        // 5% volume (sensitive)
            riskScoreLimit: 60           // Lower limit (very strict)
        }
    });

    // WebRTC streaming hook - continue streaming from camera setup
    const { isStreaming: isWebRTCStreaming, startStreaming: startWebRTCStream, stopStreaming: stopWebRTCStream } = useWebRTCStream(
        user?.id,
        actualQuizCode,
        'student'
    );

    // Check and reactivate camera if needed (only camera, no screen sharing)
    useEffect(() => {
        const checkAndActivateCamera = async () => {
            if (showResults) return; // Don't activate if quiz is finished

            try {
                // Check if camera is already active
                const devices = await navigator.mediaDevices.enumerateDevices();
                const videoDevices = devices.filter(device => device.kind === 'videoinput');

                if (videoDevices.length === 0) {
                    console.log('QuizCompletion: No camera found');
                    return;
                }

                // Try to get existing camera stream
                const existingTracks = await navigator.mediaDevices.getUserMedia({ video: true, audio: false })
                    .then(stream => {
                        const isActive = stream.getVideoTracks().some(track => track.readyState === 'live');

                        if (isActive && !localCameraStream) {
                            console.log('QuizCompletion: Camera already active, using existing stream');
                            setLocalCameraStream(stream);

                            // Start WebRTC streaming with the camera stream
                            startWebRTCStream(stream);
                            return true;
                        }

                        // Stop the test stream
                        stream.getTracks().forEach(track => track.stop());
                        return false;
                    })
                    .catch(() => false);

                if (!existingTracks && !localCameraStream) {
                    console.log('QuizCompletion: Camera not active, requesting access');

                    // Request camera access (no screen sharing)
                    const camera = await navigator.mediaDevices.getUserMedia({
                        video: {
                            width: { ideal: 1280 },
                            height: { ideal: 720 },
                            facingMode: 'user'
                        },
                        audio: true
                    });

                    console.log('QuizCompletion: Camera stream obtained', camera.id);
                    setLocalCameraStream(camera);

                    // Start WebRTC streaming with the camera stream
                    await startWebRTCStream(camera);

                    toast.success('Camera activated', {
                        description: 'Video monitoring active during quiz',
                        duration: 3000
                    });
                }
            } catch (error) {
                console.error('QuizCompletion: Camera check/activation failed', error);

                // Only show error if it's not a "camera already in use" error
                if (error.name !== 'NotReadableError') {
                    toast.error('Camera activation failed', {
                        description: 'Continuing without video monitoring',
                        duration: 3000
                    });
                }
            }
        };

        if (questions.length > 0 && !showResults && !isGamingMode) {
            checkAndActivateCamera();
        }
    }, [questions.length, showResults, isGamingMode, localCameraStream, startWebRTCStream]);

    // Live streaming
    const {
        isStreaming,
        startStreaming,
        stopStreaming: stopLiveStream,
        sendViolation: sendViolationToStream
    } = useLiveStreaming();

    // Handle violations from anti-cheating system
    const handleViolation = useCallback((violation, violationCount) => {
        // Show warning toast
        toast.error(
            <div className="space-y-1">
                <p className="font-bold">⚠️ Violation Detected!</p>
                <p className="text-sm">{violation.details.action}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                    Warning {violationCount}/3 - Your exam will be terminated after 3 violations.
                </p>
            </div>,
            { duration: 5000 }
        );

        // Send violation to live stream
        if (isStreaming) {
            sendViolationToStream(violation);
        }
    }, [isStreaming, sendViolationToStream]);

    // Anti-cheating monitoring (camera only, no screen recording)
    const {
        cameraStream,
        startMonitoring,
        stopMonitoring,
        violations,
        violationCount
    } = useAntiCheating({
        onViolation: handleViolation,
        enabled: !isGamingMode,
        maxViolations: 3
    });

    // Start monitoring and streaming when quiz starts
    useEffect(() => {
        if (questions.length > 0 && !showResults && localCameraStream && !isGamingMode) {
            startMonitoring();
            console.log('🔒 Anti-cheating monitoring activated');

            // Start live streaming with camera only (no screen stream)
            if (!isStreaming && cameraStream) {
                startStreaming(cameraStream, null, user, quiz)
                    .then(result => {
                        if (result.success) {
                            console.log('📡 Live streaming started');
                            toast.success('Live monitoring active', {
                                description: 'Your quiz session is being monitored',
                                duration: 3000
                            });
                        } else {
                            console.error('Failed to start streaming:', result.error);
                        }
                    });
            }
        }

        return () => {
            stopMonitoring();
        };
    }, [questions.length, showResults, localCameraStream, cameraStream, isStreaming, startMonitoring, stopMonitoring, startStreaming, user, quiz, isGamingMode]);

    // Listen for exam termination event
    useEffect(() => {
        const handleExamTerminated = async (event) => {
            console.error('🚨 EXAM TERMINATED:', event.detail);

            // Stop monitoring
            stopMonitoring();

            // Stop WebRTC streaming
            if (isWebRTCStreaming) {
                console.log('Stopping WebRTC stream due to exam termination');
                stopWebRTCStream();
            }

            // Stop streaming
            if (isStreaming) {
                await stopLiveStream();
            }

            // Clear quiz progress
            if (quizCode) {
                clearQuizProgress(quizCode);
            }

            // Show termination message
            toast.error('Exam terminated due to multiple violations!', {
                duration: 10000
            });

            // Navigate to violation page
            navigate('/dashboard/quiz-violation', {
                state: {
                    quizTitle: quiz.title,
                    violations: violations.map(v => v.type),
                    timestamp: new Date().toISOString(),
                    studentName: `${user?.first_name} ${user?.last_name}`
                },
                replace: true
            });
        };

        window.addEventListener('examTerminated', handleExamTerminated);

        return () => {
            window.removeEventListener('examTerminated', handleExamTerminated);
        };
    }, [stopMonitoring, isWebRTCStreaming, stopWebRTCStream, isStreaming, stopLiveStream, quizCode, navigate, quiz.title, violations, user]);

    // Listen for screen share stopped event (removed - no longer using screen sharing)

    // Load saved progress on mount
    useEffect(() => {
        // Clear any expired progress first
        clearExpiredProgress();

        if (quizCode && !progressRestored && questions.length > 0) {
            const savedProgress = loadQuizProgress(quizCode);

            if (savedProgress) {
                // Restore progress
                setCurrentIndex(savedProgress.currentIndex || 0);
                setSelectedAnswers(savedProgress.selectedAnswers || {});
                setTimeLeft(savedProgress.timeLeft || 30);

                toast.success('Progress Restored!', {
                    description: `Continuing from question ${(savedProgress.currentIndex || 0) + 1} of ${questions.length}`,
                    duration: 4000
                });
            }

            setProgressRestored(true);
        }
    }, [quizCode, progressRestored, questions.length]);

    // Log question viewed when currentIndex changes
    useEffect(() => {
        if (currentQuestion && !showResults && progressRestored) {
            setQuestionStartTime(Date.now());
            logQuestionViewed(
                currentIndex + 1,
                currentQuestion.id,
                {
                    question_text: currentQuestion.question,
                    time_remaining: timeLeft,
                }
            );
        }
    }, [currentIndex, currentQuestion, showResults, progressRestored, logQuestionViewed, timeLeft]);

    // Save progress whenever state changes
    useEffect(() => {
        if (quizCode && progressRestored && !showResults && questions.length > 0) {
            const progressData = {
                currentIndex,
                selectedAnswers,
                timeLeft,
                quizCode,
                quizTitle: quiz.title,
                totalQuestions: questions.length
            };

            saveQuizProgress(quizCode, progressData);
        }
    }, [currentIndex, selectedAnswers, timeLeft, quizCode, progressRestored, showResults, questions.length, quiz.title]);

    // Clear progress when quiz is completed
    useEffect(() => {
        if (showResults && quizCode) {
            clearQuizProgress(quizCode);
        }
    }, [showResults, quizCode]);

    // Track quiz abandonment when user navigates away
    useEffect(() => {
        const handleBeforeUnload = () => {
            if (!showResults && questions.length > 0) {
                const questionsAnswered = Object.keys(selectedAnswers).length;
                logQuizAbandoned(
                    currentIndex + 1,
                    questionsAnswered,
                    {
                        quiz_title: quiz.title,
                        total_questions: questions.length,
                        reason: 'page_unload',
                    }
                );
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);

            // Also log abandonment on component unmount if quiz not completed
            if (!showResults && questions.length > 0) {
                const questionsAnswered = Object.keys(selectedAnswers).length;
                logQuizAbandoned(
                    currentIndex + 1,
                    questionsAnswered,
                    {
                        quiz_title: quiz.title,
                        total_questions: questions.length,
                        reason: 'component_unmount',
                    }
                );
            }
        };
    }, [showResults, quizCode, currentIndex, selectedAnswers, questions.length, quiz.title, logQuizAbandoned]);

    // Helper to get duration for current question
    const getQuestionDuration = useCallback(() => {
        if (quiz?.duration && questions.length > 0) {
            const totalSeconds = parseInt(quiz.duration) * 60;
            return Math.floor(totalSeconds / questions.length);
        }
        return 30; // Global fallback
    }, [questions, quiz.duration]);

    const finalizeQuiz = useCallback(async () => {
        // Calculate score locally for immediate feedback, 
        // but normally we'd wait for backend confirmation
        let correctCount = 0;
        const formattedAnswers = [];
        const quizStartTime = Date.now() - (currentIndex + 1) * getQuestionDuration() * 1000;
        const totalTimeSpent = Math.floor((Date.now() - quizStartTime) / 1000);

        questions.forEach((q, idx) => {
            const selectedMatch = selectedAnswers[idx];
            // Handle numeric is_correct (1) or boolean true
            const correctOption = q.options?.find(opt => opt.is_correct === 1 || opt.is_correct === true);

            // Use ID if available, otherwise fallback to the option text for comparison
            const correctIdentifier = correctOption?.id || correctOption?.option;

            if (selectedMatch === correctIdentifier) {
                correctCount++;
            }

            if (selectedMatch) {
                formattedAnswers.push({
                    question_id: q.id,
                    option_id: selectedMatch, // This might need to be the text if ID is missing
                    option_text: typeof selectedMatch === 'string' ? selectedMatch : undefined
                });
            }
        });

        const scorePercentage = Math.round((correctCount / questions.length) * 100);
        const xpEarned = Math.round((correctCount) * ((quiz.p_xp / questionsData.data.length) || 0));
        setScore(correctCount);

        // Log quiz completion
        await logQuizCompleted(
            correctCount,
            questions.length,
            totalTimeSpent,
            {
                xp_earned: xpEarned,
                percentage: scorePercentage,
                quiz_title: quiz.title,
            }
        );

        // Stop all monitoring and streaming
        console.log('Quiz completed - stopping all monitoring and streaming');

        // Stop WebRTC streaming
        if (isWebRTCStreaming) {
            console.log('Stopping WebRTC stream - quiz completed');
            stopWebRTCStream();
        }

        // Stop live streaming
        if (isStreaming) {
            console.log('Stopping live stream - quiz completed');
            await stopLiveStream();
        }

        // Stop camera stream
        if (localCameraStream) {
            console.log('Stopping camera stream - quiz completed');
            localCameraStream.getTracks().forEach(track => {
                track.stop();
                console.log('Camera track stopped:', track.kind);
            });
        }

        // Stop anti-cheating monitoring
        stopMonitoring();
        console.log('Anti-cheating monitoring stopped');

        try {
            const submissionPayload = {
                student_id: user.id,
                quiz_code: quiz.quiz_code,
                admin_code: quiz.admin_code,
                group_code: quiz.group_code,
                xp: xpEarned,
                answers: formattedAnswers,
                score: scorePercentage
            };

            const result = await submitQuiz(submissionPayload).unwrap();

            navigate(`/dashboard/quizzes/result?code=${quiz.id}`, {
                state: {
                    result: {
                        score: scorePercentage,
                        correctCount: correctCount,
                        totalQuestions: questions.length,
                        answers: formattedAnswers,
                        ...result
                    }
                },
                replace: true
            });
        } catch (error) {
            console.error("Submission failed:", error);
            // Even if submission fails, we show local results for UX
            setShowResults(true);
        }
    }, [questions, selectedAnswers, quiz, user, submitQuiz, navigate, currentIndex, getQuestionDuration, logQuizCompleted, isWebRTCStreaming, stopWebRTCStream, isStreaming, stopLiveStream, localCameraStream, stopMonitoring]);

    const handleNext = useCallback(() => {
        // Log question answered or skipped
        const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
        const wasAnswered = selectedAnswers[currentIndex] !== undefined;

        if (wasAnswered) {
            const selectedAnswer = selectedAnswers[currentIndex];
            const correctOption = currentQuestion?.options?.find(opt => opt.is_correct === 1 || opt.is_correct === true);
            const correctIdentifier = correctOption?.id || correctOption?.option;
            const isCorrect = selectedAnswer === correctIdentifier;

            logQuestionAnswered(
                currentIndex + 1,
                currentQuestion?.id,
                selectedAnswer,
                timeSpent,
                isCorrect,
                {
                    question_text: currentQuestion?.question,
                    time_remaining: timeLeft,
                }
            );
        } else {
            logQuestionSkipped(
                currentIndex + 1,
                currentQuestion?.id,
                {
                    question_text: currentQuestion?.question,
                    time_spent_seconds: timeSpent,
                }
            );
        }

        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            finalizeQuiz();
        }
    }, [currentIndex, questions.length, finalizeQuiz, selectedAnswers, currentQuestion, questionStartTime, timeLeft, logQuestionAnswered, logQuestionSkipped]);

    const handleAnswer = (optionId) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [currentIndex]: optionId
        }));
    };

    // Timer Logic
    useEffect(() => {
        if (showResults || isLoadingQuestions || questions.length === 0) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => Math.max(0, prev - 1));
        }, 1000);

        return () => clearInterval(timer);
    }, [showResults, isLoadingQuestions, questions.length]);

    // Handle time out
    useEffect(() => {
        if (timeLeft === 0 && !showResults) {
            handleNext();
        }
    }, [timeLeft, showResults, handleNext]);

    // Reset timer on question change
    useEffect(() => {
        if (!showResults && questions.length > 0) {
            setTimeLeft(getQuestionDuration(currentIndex));
        }
    }, [currentIndex, showResults, questions.length, getQuestionDuration]);

    const isLearningMode = quiz?.quiz_mode?.name?.toLowerCase() === 'learning' || quiz?.mode_name?.toLowerCase() === 'learning' || quiz?.mode?.toLowerCase() === 'learning';

    if (isLoadingQuestions) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="relative w-16 h-16">
                        <div className="absolute inset-0 rounded-full border-4 border-[#a6b1ff]/10"></div>
                        <div className="absolute inset-0 rounded-full border-t-4 border-[#a6b1ff] animate-spin"></div>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    if (!quizCode || questions.length === 0) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
                    <div className="w-20 h-20 rounded-3xl bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/20">
                        <AlertCircle size={40} />
                    </div>
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Quiz Not Found</h2>
                        <p className="text-white/40 text-sm max-w-xs mx-auto font-medium">We couldn't find this quiz. It might have been deleted.</p>
                    </div>
                    <button onClick={() => navigate('/dashboard/quizzes')} className="px-8 py-3 rounded-2xl bg-white text-black font-black uppercase text-xs tracking-widest hover:bg-[#a6b1ff] transition-all">
                        Back to Quizzes
                    </button>
                </div>
            </DashboardLayout>
        );
    }

    if (showResults) {
        const percentage = Math.round((score / questions.length) * 100);
        const xpEarned = score * ((quiz.p_xp / questionsData.data.length) || 0); // Correct answers * XP per question

        return (
            <DashboardLayout>
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#1a1a1a]/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 sm:p-10 lg:p-16 text-center relative overflow-hidden shadow-2xl"
                    >
                        {/* Background Glow */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#a6b1ff]/10 rounded-full blur-[100px] -z-10" />

                        <div className="space-y-12 relative z-10">
                            <div className="space-y-4">
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="w-24 h-24 bg-[#a6b1ff] rounded-3xl mx-auto flex items-center justify-center text-black shadow-2xl shadow-[#a6b1ff]/20 rotate-3"
                                >
                                    <Trophy size={48} />
                                </motion.div>
                                <h2 className="text-3xl md:text-5xl font-black text-white italic tracking-tighter uppercase">Quiz <span className="text-[#a6b1ff]">Complete!</span></h2>
                                <p className="text-red/40 font-medium italic uppercase tracking-widest text-sm">You have already taken this quiz, the result show is just for display</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8 space-y-2 group hover:bg-white/10 transition-colors">
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] group-hover:text-[#a6b1ff]/40 transition-colors">Your Score</p>
                                    <p className="text-4xl font-black text-white italic">{percentage}%</p>
                                </div>
                                <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8 space-y-2 group hover:bg-white/10 transition-colors">
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] group-hover:text-[#a6b1ff]/40 transition-colors">Correct Answers</p>
                                    <p className="text-4xl font-black text-white italic">{score}/{questions.length}</p>
                                </div>
                                <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8 space-y-2 group hover:bg-white/10 transition-colors">
                                    <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] group-hover:text-[#a6b1ff]/40 transition-colors">Points Earned</p>
                                    <p className="text-4xl font-black text-[#a6b1ff] italic">+{xpEarned}</p>
                                </div>
                            </div>

                            <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => navigate('/dashboard/quizzes')}
                                    className="px-10 h-16 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#a6b1ff] transition-all active:scale-95"
                                >
                                    <Home size={18} />
                                    Back to Quizzes
                                </button>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="px-10 h-16 bg-white/5 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-white/10 transition-all active:scale-95"
                                >
                                    <RotateCcw size={18} />
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24 relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:bg-black">
                {/* Decorative BG */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/30 dark:bg-indigo-600/5 rounded-full blur-[120px] -mr-64 -mt-64" />

                <div className="max-w-5xl mx-auto px-6 lg:px-10 py-12 relative z-10 mt-8">
                    {/* Header Controls */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
                        <div className="space-y-4">
                            {isLearningMode && !showResults && (
                                <motion.button
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    onClick={() => navigate(`/dashboard/quizzes/details?code=${quiz.quiz_code}`)}
                                    className="flex items-center gap-2 text-[10px] font-black text-gray-400 dark:text-white/20 uppercase tracking-[0.2em] hover:text-indigo-600 dark:hover:text-[#a6b1ff] transition-colors group"
                                >
                                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                                    Back to Info
                                </motion.button>
                            )}
                            <div className="space-y-2">
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center gap-2 text-[10px] font-black text-indigo-600 dark:text-[#a6b1ff] uppercase tracking-[0.3em] italic"
                                >
                                    <Target size={12} />
                                    Node {currentIndex + 1} of {questions.length} Active
                                </motion.div>
                                <h2 className="text-2xl md:text-4xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">Tactical Engagement</h2>
                                {progressRestored && loadQuizProgress(quizCode) && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 dark:from-emerald-500/10 dark:to-teal-500/10 border-2 border-emerald-300 dark:border-emerald-500/20 rounded-xl shadow-sm"
                                    >
                                        <CheckCircle2 size={14} className="text-emerald-600 dark:text-emerald-400" />
                                        <span className="text-[9px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">
                                            Progress Restored
                                        </span>
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-white/5 dark:to-white/5 backdrop-blur-xl border-2 border-blue-300 dark:border-white/10 rounded-[2rem] p-6 flex items-center gap-6 shadow-lg">
                            <div className="flex flex-col items-end">
                                <p className="text-[10px] font-black text-blue-700 dark:text-white/20 uppercase tracking-[0.2em]">Time Left</p>
                                <div className={cn(
                                    "flex items-center gap-2 font-mono text-3xl font-black italic transition-colors",
                                    timeLeft <= 10 ? "text-rose-600 dark:text-rose-500 animate-pulse" : "text-blue-900 dark:text-white"
                                )}>
                                    <Clock size={24} />
                                    {timeLeft.toString().padStart(2, '0')}s
                                </div>
                            </div>
                            <div className="w-12 h-12 rounded-2xl bg-indigo-200 dark:bg-[#a6b1ff]/10 flex items-center justify-center text-indigo-700 dark:text-[#a6b1ff]">
                                <Zap size={24} fill="currentColor" />
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-gray-200 dark:bg-white/5 rounded-full mb-16 overflow-hidden shadow-inner">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-500 dark:to-[#a6b1ff] shadow-[0_0_20px_rgba(99,102,241,0.4)] dark:shadow-[0_0_20px_rgba(166,177,255,0.4)]"
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                        {/* Question View */}
                        <div className="lg:col-span-8 space-y-10">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentIndex}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -30 }}
                                    className="space-y-8"
                                >
                                    <div className="bg-white dark:bg-[#1a1a1a]/40 backdrop-blur-3xl border-2 border-indigo-200 dark:border-white/10 rounded-[3rem] p-10 lg:p-12 relative overflow-hidden group shadow-2xl">
                                        <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-5">
                                            <Brain size={140} />
                                        </div>

                                        <div className="relative z-10 space-y-6">
                                            <div className="flex items-center gap-3 text-indigo-600 dark:text-[#a6b1ff]">
                                                <Target size={18} />
                                                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Primary Objective</span>
                                            </div>
                                            <h3 className="text-2xl lg:text-3xl font-black text-gray-900 dark:text-white leading-tight uppercase italic tracking-tighter">
                                                {currentQuestion?.question}
                                            </h3>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {currentQuestion?.options?.map((option, idx) => {
                                            const optionIdentifier = option.id || option.option;
                                            const isSelected = selectedAnswers[currentIndex] === optionIdentifier;

                                            return (
                                                <motion.button
                                                    key={idx}
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={() => handleAnswer(optionIdentifier)}
                                                    className={cn(
                                                        "h-20 md:h-24 px-6 md:px-8 rounded-2xl md:rounded-[2rem] flex items-center gap-4 md:gap-6 transition-all border-2 text-left relative overflow-hidden group",
                                                        isSelected
                                                            ? "bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-[#a6b1ff] dark:to-[#a6b1ff] border-indigo-600 dark:border-[#a6b1ff] text-white dark:text-[#0a0a0a] shadow-2xl shadow-indigo-500/30 dark:shadow-[#a6b1ff]/30"
                                                            : "bg-gray-100 dark:bg-white/5 border-gray-300 dark:border-white/5 text-gray-700 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/10 hover:border-gray-400 dark:hover:border-white/10 hover:shadow-lg"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-8 h-8 md:w-10 md:h-10 rounded-lg md:rounded-xl flex items-center justify-center font-black italic shrink-0",
                                                        isSelected
                                                            ? "bg-white/20 dark:bg-black/10 text-white dark:text-black"
                                                            : "bg-gray-200 dark:bg-white/5 text-gray-600 dark:text-white/30"
                                                    )}>
                                                        {String.fromCharCode(65 + idx)}
                                                    </div>
                                                    <span className="font-bold text-sm lg:text-base uppercase italic tracking-tight leading-tight flex-1">
                                                        {option.option}
                                                    </span>
                                                    {isSelected && (
                                                        <motion.div
                                                            layoutId="check"
                                                            className="h-6 w-6 rounded-full bg-white/20 dark:bg-black/10 flex items-center justify-center"
                                                        >
                                                            <CheckCircle2 size={16} />
                                                        </motion.div>
                                                    )}
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex items-center justify-between pt-8 border-t-2 border-gray-200 dark:border-white/5">
                                <div className="flex items-center gap-2 text-gray-500 dark:text-white/20 italic">
                                    <Shield size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Protocol Secured</span>
                                </div>

                                <div className="flex items-center gap-4">
                                    {isLearningMode && currentIndex > 0 && (
                                        <button
                                            onClick={() => setCurrentIndex(prev => prev - 1)}
                                            className="h-16 md:h-20 px-6 md:px-8 bg-gray-200 dark:bg-white/5 border-2 border-gray-300 dark:border-white/10 text-gray-700 dark:text-white rounded-2xl md:rounded-[2.5rem] font-black uppercase tracking-widest text-[10px] sm:text-xs flex items-center gap-3 hover:bg-gray-300 dark:hover:bg-white/10 transition-all active:scale-95 shadow-sm"
                                        >
                                            <ChevronLeft size={20} />
                                            Prev Node
                                        </button>
                                    )}

                                    <button
                                        onClick={handleNext}
                                        disabled={isSubmittingQuiz}
                                        className="h-16 md:h-20 px-8 md:px-12 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-white dark:to-white hover:from-indigo-600 hover:to-purple-700 dark:hover:from-[#a6b1ff] dark:hover:to-[#a6b1ff] text-white dark:text-black rounded-2xl md:rounded-[2.5rem] font-black uppercase tracking-widest text-[10px] sm:text-xs flex items-center gap-3 md:gap-4 transition-all shadow-2xl shadow-indigo-500/20 dark:shadow-indigo-500/10 active:scale-95 group/btn"
                                    >
                                        {isSubmittingQuiz ? (
                                            <Loader2 className="animate-spin" />
                                        ) : (
                                            <>
                                                {currentIndex === questions.length - 1 ? "Finalize Submission" : "Next Node"}
                                                <ChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-4 space-y-8">
                            {/* Proctoring Status */}
                            {!isGamingMode && (
                                <ProctoringStatus
                                    status={proctoringSystem.status}
                                    riskScore={proctoringSystem.riskScore}
                                    facePresent={proctoringSystem.facePresent}
                                    faceCount={proctoringSystem.faceCount}
                                    headPose={proctoringSystem.headPose}
                                    isTalking={proctoringSystem.isTalking}
                                    audioDetected={proctoringSystem.audioDetected}
                                    currentFlags={proctoringSystem.currentFlags}
                                    violations={proctoringSystem.violations}
                                />
                            )}

                            <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-white/5 dark:to-white/5 border-2 border-green-200 dark:border-white/10 rounded-[3rem] p-8 space-y-8 shadow-lg">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">Live Status</h3>
                                    <Sparkles size={20} className="text-emerald-600 dark:text-[#a6b1ff] animate-pulse" />
                                </div>

                                <div className="space-y-6">
                                    <div className="p-6 bg-white dark:bg-white/5 rounded-3xl border-2 border-emerald-200 dark:border-white/5 space-y-2 shadow-sm">
                                        <p className="text-[10px] font-black text-gray-500 dark:text-white/20 uppercase tracking-[0.2em]">Quiz Status</p>
                                        <p className="text-xl font-black text-emerald-600 dark:text-emerald-400 italic uppercase tracking-wider">Active</p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-6 bg-white dark:bg-white/5 rounded-3xl border-2 border-blue-200 dark:border-white/5 space-y-2 shadow-sm">
                                            <p className="text-[10px] font-black text-gray-500 dark:text-white/20 uppercase tracking-[0.2em]">Questions</p>
                                            <p className="text-xl font-black text-gray-900 dark:text-white italic">{questions.length}</p>
                                        </div>
                                        <div className="p-6 bg-white dark:bg-white/5 rounded-3xl border-2 border-purple-200 dark:border-white/5 space-y-2 shadow-sm">
                                            <p className="text-[10px] font-black text-gray-500 dark:text-white/20 uppercase tracking-[0.2em]">Points</p>
                                            <p className="text-xl font-black text-indigo-600 dark:text-[#a6b1ff] italic">{quiz.xp || 0}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-8 border-t-2 border-gray-200 dark:border-white/5">
                                    {/* WebRTC Streaming Status */}
                                    {isWebRTCStreaming && (
                                        <div className="mb-6 p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-500/5 dark:to-pink-500/5 rounded-[2rem] border-2 border-purple-300 dark:border-purple-500/10 shadow-sm">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-xl bg-purple-500 flex items-center justify-center">
                                                    <Radio className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-purple-700 dark:text-purple-400 uppercase tracking-wide">
                                                        Live Video Stream
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                                        <span className="text-[9px] font-bold text-purple-600 dark:text-purple-500 uppercase tracking-wider">
                                                            Broadcasting
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-[9px] text-purple-600 dark:text-purple-500/60 font-medium">
                                                Your camera feed is being streamed live to proctors
                                            </p>
                                        </div>
                                    )}

                                    {/* Anti-Cheating Status */}
                                    {!isGamingMode && (
                                        <div className="mb-6 p-5 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/5 dark:to-indigo-500/5 rounded-[2rem] border-2 border-blue-300 dark:border-blue-500/10 shadow-sm">
                                            <div className="flex items-center gap-3 mb-3">
                                                <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center">
                                                    <Eye className="w-5 h-5 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black text-blue-700 dark:text-blue-400 uppercase tracking-wide">
                                                        Proctoring Active
                                                    </p>
                                                    <div className="flex items-center gap-2 mt-1">
                                                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                        <span className="text-[9px] font-bold text-blue-600 dark:text-blue-500 uppercase tracking-wider">
                                                            Monitoring
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            {violationCount > 0 && (
                                                <div className="mt-3 pt-3 border-t border-blue-200 dark:border-blue-500/20">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-[9px] font-bold text-orange-600 dark:text-orange-500 uppercase tracking-wider">
                                                            Violations
                                                        </span>
                                                        <span className="text-sm font-black text-orange-600 dark:text-orange-500">
                                                            {violationCount}/3
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-500/5 dark:to-orange-500/5 rounded-[2rem] border-2 border-orange-300 dark:border-orange-500/10 shadow-sm">
                                        <AlertCircle size={20} className="text-orange-600 dark:text-orange-500 shrink-0 mt-0.5" />
                                        <p className="text-[9px] font-bold text-orange-700 dark:text-orange-500/60 uppercase tracking-widest leading-loose">
                                            Your answers are final. Make sure you're confident before moving to the next question!
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <motion.div
                                animate={{
                                    boxShadow: timeLeft <= 10 ? ["0 0 0px rgba(244,63,94,0)", "0 0 40px rgba(244,63,94,0.3)", "0 0 0px rgba(244,63,94,0)"] : "none"
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-[#1a1a1a]/60 dark:to-[#1a1a1a]/60 border-2 border-rose-200 dark:border-white/5 rounded-[3rem] p-8 shadow-lg"
                            >
                                <div className="flex items-center gap-6">
                                    <div className={cn(
                                        "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                                        timeLeft <= 10 ? "bg-rose-500 shadow-[0_0_20px_rgba(244,63,94,0.4)] text-white" : "bg-indigo-200 dark:bg-[#a6b1ff]/10 text-indigo-700 dark:text-[#a6b1ff]"
                                    )}>
                                        <Zap size={28} fill="currentColor" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-gray-500 dark:text-white/20 uppercase tracking-widest">Timer Status</p>
                                        <p className="text-lg font-black text-gray-900 dark:text-white italic uppercase tracking-tighter">
                                            {timeLeft <= 10 ? "Hurry Up!" : "Going Well"}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
