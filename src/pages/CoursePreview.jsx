import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '@/redux/slices/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play, Pause, CheckCircle, Lock, MonitorPlay,
    FileText, Download, Share2, Bookmark, Star,
    MessageSquare, Loader2, Captions, ChevronRight,
    Send, BookOpen, Lightbulb, Target, AlertCircle,
    CheckSquare, Circle, Type
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    useGetStudentCourseByIdQuery,
    useGetCourseProgressQuery,
    useUpdateCourseProgressMutation,
    useSubmitCaseStudyAnswersMutation
} from '@/redux/api/studentApi';

// Helper to format time in MM:SS
const formatTime = (seconds) => {
    if (!seconds) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default function CoursePreview() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { toast } = useToast();
    const isAuthenticated = useSelector(selectIsAuthenticated);

    // Fetch Course Details
    const { data: courseData, isLoading: isCourseLoading, error: courseError } = useGetStudentCourseByIdQuery(courseId);
    // Handle potential data wrapping variations
    const course = courseData?.data || courseData;

    // Fetch Course Progress
    const { data: progressData } = useGetCourseProgressQuery(courseId);
    // Assuming progress is returned in data.progress or similar structure
    const currentProgress = progressData?.data?.progress || progressData?.progress || 0;

    // Mutations
    const [updateProgress] = useUpdateCourseProgressMutation();
    const [submitCaseStudyAnswers, { isLoading: isSubmitting }] = useSubmitCaseStudyAnswersMutation();

    const [isPlaying, setIsPlaying] = useState(false);
    const [showSubtitles, setShowSubtitles] = useState(false);
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
    const videoRef = useRef(null);

    const [videoProgress, setVideoProgress] = useState(0);
    const [isQuizDrawerOpen, setIsQuizDrawerOpen] = useState(false);
    const [isCaseStudyDrawerOpen, setIsCaseStudyDrawerOpen] = useState(false);
    const [showRegModal, setShowRegModal] = useState(false);
    const [showEnrollModal, setShowEnrollModal] = useState(false);
    const [reflection, setReflection] = useState('');

    // Case Study State
    const [caseStudies, setCaseStudies] = useState([]);
    const [currentCaseStudyIndex, setCurrentCaseStudyIndex] = useState(0);
    const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState({});
    const [caseStudyCompleted, setCaseStudyCompleted] = useState(false);
    const [caseStudyScore, setCaseStudyScore] = useState(0);
    const [showFeedback, setShowFeedback] = useState(false);
    const [currentFeedback, setCurrentFeedback] = useState('');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false);
const { user } = useSelector((a => a.auth));
    
    // Parse case studies from JSON
    useEffect(() => {
        if (course?.case_study) {
            try {
                const parsed = JSON.parse(course.case_study);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setCaseStudies(parsed);
                }
            } catch (e) {
                console.error('Failed to parse case studies:', e);
                setCaseStudies([]);
            }
        }
    }, [course]);

    // Prepare playlist: Main video + Other videos
    // Map titles from 'learn' array if available
    const playlist = [
        { url: course?.video_url, title: course?.learn?.[0] || 'Introduction' },
        ...(course?.other?.map((url, index) => ({
            url,
            title: course?.learn?.[index + 1] || `Lesson ${index + 2}`
        })) || [])
    ].filter(v => v.url);

    const handlePlayVideo = () => {
        setIsPlaying(true);
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    const handlePauseVideo = () => {
        setIsPlaying(false);
        if (videoRef.current) {
            videoRef.current.pause();
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const duration = videoRef.current.duration;
            if (duration > 0) {
                const percent = (current / duration) * 100;
                setVideoProgress(percent);
            }
        }
    };

    const handleProgressClick = (e) => {
        const progressBar = e.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickPosition = e.clientX - rect.left;
        const totalWidth = rect.width;
        const percentage = clickPosition / totalWidth;

        if (videoRef.current) {
            videoRef.current.currentTime = percentage * videoRef.current.duration;
            setVideoProgress(percentage * 100);
        }
    };

    const toggleSubtitles = () => {
        setShowSubtitles(!showSubtitles);
        if (videoRef.current) {
            const tracks = videoRef.current.textTracks;
            if (tracks && tracks.length > 0) {
                tracks[0].mode = showSubtitles ? 'hidden' : 'showing';
            }
        }
    };

    // Share Feature
    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: course?.title || 'Check out this course!',
                    text: `I'm learning "${course?.title}" on TechXplora!`,
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            // Fallback to clipboard
            try {
                await navigator.clipboard.writeText(window.location.href);
                toast({
                    title: "Link copied!",
                    description: "Course link copied to clipboard.",
                });
            } catch (err) {
                toast({
                    title: "Share failed",
                    description: "Could not copy link to clipboard.",
                    variant: "destructive"
                });
            }
        }
    };

    const handleVideoEnded = () => {
        if (currentVideoIndex < playlist.length - 1) {
            setCurrentVideoIndex(prev => prev + 1);
            setIsPlaying(true);
            toast({
                title: "Next Video Playing",
                description: `Moving to ${playlist[currentVideoIndex + 1].title}`,
            });
        } else {
            setIsPlaying(false);
            toast({
                title: "Lesson Completed! 🎉",
                description: "Great job! You've finished this section.",
                className: "bg-green-500 text-white border-none",
                duration: 3000,
            });

            // Logic for when whole video series finishes
            if (!isAuthenticated) {
                setShowRegModal(true);
            } else if (caseStudies.length > 0) {
                // Trigger case study drawer if case studies exist
                setIsCaseStudyDrawerOpen(true);
                setCurrentCaseStudyIndex(0);
                setCurrentSegmentIndex(0);
                setUserAnswers({});
                setCaseStudyCompleted(false);
            } else if (course?.quiz_id) {
                navigate(`/dashboard/quizzes/details?code=${course.quiz.quiz_code}`);
            } else {
                setIsQuizDrawerOpen(true);
            }
        }
    };

    // Auto-play next video when index changes
    useEffect(() => {
        if (videoRef.current && isPlaying) {
            videoRef.current.play();
        }
    }, [currentVideoIndex, isPlaying]);

    const handleActionButtonClick = () => {
        if (!isAuthenticated) {
            setShowRegModal(true);
            return;
        }

        if (!isPlaying && videoProgress === 0) {
            // Requirement: Ask user if they want to register for this specific course
            setShowEnrollModal(true);
        } else {
            if (course?.quiz_id) {
                navigate(`/dashboard/quizzes/details?code=${course.quiz.quiz_code}`);
            } else {
                setIsQuizDrawerOpen(true);
            }
        }
    };

    const QUESTION_TYPES = {
        SINGLE_CHOICE: 'single_choice',
        MULTIPLE_CHOICE: 'multiple_choice',
        SHORT_ANSWER: 'short_answer'
    };

    const handleCaseStudyAnswer = (answer) => {
        const currentCaseStudy = caseStudies[currentCaseStudyIndex];
        const currentSegment = currentCaseStudy.segments[currentSegmentIndex];

        if (currentSegment.questionType === QUESTION_TYPES.MULTIPLE_CHOICE) {
            const currentAnswers = userAnswers[currentSegment.id] || [];
            if (currentAnswers.includes(answer)) {
                setUserAnswers(prev => ({
                    ...prev,
                    [currentSegment.id]: currentAnswers.filter(a => a !== answer)
                }));
            } else {
                setUserAnswers(prev => ({
                    ...prev,
                    [currentSegment.id]: [...currentAnswers, answer]
                }));
            }
            // Don't show feedback immediately for multiple choice - wait for submission
        } else if (currentSegment.questionType === QUESTION_TYPES.SINGLE_CHOICE) {
            setUserAnswers(prev => ({
                ...prev,
                [currentSegment.id]: answer
            }));
            
            // Show feedback for single choice immediately
            const selectedOption = currentSegment.options.find(o => o.text === answer);
            if (selectedOption) {
                setIsAnswerCorrect(selectedOption.isCorrect);
                setCurrentFeedback(selectedOption.feedback || (selectedOption.isCorrect ? currentSegment.correctFeedback : currentSegment.incorrectFeedback) || '');
                setShowFeedback(true);
            }
        } else {
            // SHORT_ANSWER type
            setUserAnswers(prev => ({
                ...prev,
                [currentSegment.id]: answer
            }));
        }
    };

    const handleCheckAnswer = () => {
        const currentCaseStudy = caseStudies[currentCaseStudyIndex];
        const currentSegment = currentCaseStudy.segments[currentSegmentIndex];
        
        if (currentSegment.questionType === QUESTION_TYPES.MULTIPLE_CHOICE) {
            const correctOptions = currentSegment.options.filter(o => o.isCorrect).map(o => o.text);
            const userSelectedOptions = userAnswers[currentSegment.id] || [];
            const isCorrect = correctOptions.length === userSelectedOptions.length &&
                correctOptions.every(o => userSelectedOptions.includes(o));
            
            setIsAnswerCorrect(isCorrect);
            setCurrentFeedback(isCorrect ? currentSegment.correctFeedback : currentSegment.incorrectFeedback || '');
            setShowFeedback(true);
        } else if (currentSegment.questionType === QUESTION_TYPES.SHORT_ANSWER) {
            const answer = userAnswers[currentSegment.id];
            const isCorrect = answer?.toLowerCase().trim() === currentSegment.correctAnswer?.toLowerCase().trim();
            
            setIsAnswerCorrect(isCorrect);
            setCurrentFeedback(isCorrect ? currentSegment.correctFeedback : currentSegment.incorrectFeedback || '');
            setShowFeedback(true);
        }
    };

    const handleNextSegment = async () => {
        const currentCaseStudy = caseStudies[currentCaseStudyIndex];
        const currentSegment = currentCaseStudy.segments[currentSegmentIndex];
        
        // If feedback hasn't been shown yet, show it first
        if (!showFeedback && (currentSegment.questionType === QUESTION_TYPES.MULTIPLE_CHOICE || currentSegment.questionType === QUESTION_TYPES.SHORT_ANSWER)) {
            handleCheckAnswer();
            return;
        }
        
        // Reset feedback when moving to next segment
        setShowFeedback(false);
        setCurrentFeedback('');
        
        if (currentSegmentIndex < currentCaseStudy.segments.length - 1) {
            setCurrentSegmentIndex(prev => prev + 1);
        } else {
            // Case study finished - calculate score and prepare submission data
            let score = 0;
            const answersArray = [];
            
            currentCaseStudy.segments.forEach(segment => {
                const answer = userAnswers[segment.id];
                let isCorrect = false;
                
                if (segment.questionType === QUESTION_TYPES.SHORT_ANSWER) {
                    isCorrect = answer?.toLowerCase().trim() === segment.correctAnswer?.toLowerCase().trim();
                } else if (segment.questionType === QUESTION_TYPES.MULTIPLE_CHOICE) {
                    const correctOptions = segment.options.filter(o => o.isCorrect).map(o => o.text);
                    const userSelectedOptions = answer || [];
                    isCorrect = correctOptions.length === userSelectedOptions.length &&
                        correctOptions.every(o => userSelectedOptions.includes(o));
                } else {
                    const selectedOption = segment.options.find(o => o.text === answer);
                    isCorrect = selectedOption?.isCorrect || false;
                }
                
                if (isCorrect) score++;
                
                // Build answer object for API
                answersArray.push({
                    segment_id: segment.id,
                    question: segment.question,
                    user_answer: answer,
                    is_correct: isCorrect
                });
            });

            const finalScore = Math.round((score / currentCaseStudy.segments.length) * 100);
            setCaseStudyScore(finalScore);
            setCaseStudyCompleted(true);
            
            // Submit to API if user is authenticated
            if (isAuthenticated) {
                try {
                    await submitCaseStudyAnswers({
                        courseId: courseId,
                        caseStudyData: {
                            student_id:user.id,
                            case_study_id: currentCaseStudy.id,
                            case_study_title: currentCaseStudy.title,
                            answers: answersArray,
                            score: finalScore,
                            total_segments: currentCaseStudy.segments.length,
                            correct_answers: score
                        }
                    }).unwrap();
                    
                    toast({
                        title: "Case Study Submitted! 🎉",
                        description: `Your score of ${finalScore}% has been saved.`,
                    });
                } catch (error) {
                    console.error('Failed to submit case study:', error);
                    toast({
                        title: "Submission Warning",
                        description: "Your answers were saved locally but couldn't be synced to the server.",
                        variant: "destructive",
                    });
                }
            }
        }
    };

    const handleFinishCaseStudy = () => {
        if (currentCaseStudyIndex < caseStudies.length - 1) {
            setCurrentCaseStudyIndex(prev => prev + 1);
            setCurrentSegmentIndex(0);
            setUserAnswers({});
            setCaseStudyCompleted(false);
        } else {
            setIsCaseStudyDrawerOpen(false);
            // If there's a quiz, maybe go to it?
            if (course?.quiz_id) {
                navigate(`/dashboard/quizzes/details?code=${course.quiz.quiz_code}`);
            }
        }
    };

    const handleReflectionSubmit = () => {
        if (!reflection.trim()) {
            toast({
                title: "Empty reflection",
                description: "Please enter what you've learned.",
                variant: "destructive"
            });
            return;
        }

        // Visual feedback for submission
        toast({
            title: "Reflection Submitted! 🎯",
            description: "Your insights have been recorded for this course.",
            className: "bg-green-500 text-white border-none",
        });
        setIsQuizDrawerOpen(false);
        setReflection('');
    };

    if (isCourseLoading) {
        return (
            <div className="min-h-screen pt-24 pb-32 px-6 max-w-7xl mx-auto flex items-center justify-center">
                <Loader2 className="w-12 h-12 animate-spin text-[#a6b1ff]" />
            </div>
        );
    }

    if (courseError || !course) {
        return (
            <div className="min-h-screen pt-24 pb-32 px-6 max-w-7xl mx-auto text-center">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Course not found</h2>
                <p className="text-gray-900 dark:text-gray-400 font-bold">The course you are looking for does not exist or has been removed.</p>
            </div>
        );
    }

    // Default values if missing
    const rating = course.rating || 5.0;
    const studentCount = course.students_count || course.students || 0;
    const lessons = course.questions || [];

    // Choose which progress to display: if playing or video has progress, show that. Otherwise stored progress.
    const displayProgress = isPlaying || videoProgress > 0 ? videoProgress : currentProgress;

    return (
        <div className="min-h-screen pt-24 pb-32 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* LEFT COLUMN: Main Content */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Header */}
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 font-['Bricolage_Grotesque']">
                            {course.title}
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                            <Badge variant="outline" className="text-[#a6b1ff] border-[#a6b1ff]/30">
                                {course.category || 'General'}
                            </Badge>
                            <span>{course.difficulty_level || 'All Levels'}</span>
                            <div className="flex items-center gap-1 text-[#ffb585]">
                                <Star className="w-4 h-4 fill-current" />
                                <span className="font-bold">{rating}</span>
                            </div>
                        </div>
                    </div>

                    {/* Video Player */}
                    <div className="relative aspect-video rounded-3xl overflow-hidden bg-gray-900 dark:bg-gray-900 border border-border shadow-2xl shadow-[#a6b1ff]/10 group">
                        {!isPlaying && (
                            <>
                                <img
                                    src={course?.banner_url || course?.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"}
                                    alt="Course Preview"
                                    className="absolute inset-0 w-full h-full object-cover z-10 opacity-90"
                                />
                                <div className="absolute inset-0 bg-black/20 dark:bg-black/30 group-hover:bg-black/30 dark:group-hover:bg-black/50 transition-all duration-300 z-20" />
                                
                                {/* Play Button */}
                                <div
                                    className="absolute inset-0 flex items-center justify-center z-30 cursor-pointer"
                                    onClick={handlePlayVideo}
                                >
                                    <div className="relative">
                                        {/* Pulsing rings */}
                                        <div className="absolute inset-0 rounded-full bg-[#a6b1ff]/20 animate-ping duration-[3000ms]" />
                                        <div className="absolute inset-0 rounded-full bg-[#a6b1ff]/10 animate-pulse duration-[2000ms]" />
                                        
                                        <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full bg-white/90 dark:bg-card/90 backdrop-blur-xl flex items-center justify-center border border-border group-hover:scale-110 group-hover:border-[#a6b1ff]/50 transition-all duration-500 shadow-[0_0_50px_rgba(166,177,255,0.3)]">
                                            <div className="w-0 h-0 border-t-[14px] md:border-t-[18px] border-t-transparent border-l-[24px] md:border-l-[32px] border-l-[#a6b1ff] border-b-[14px] md:border-b-[18px] border-b-transparent ml-2 drop-shadow-[0_0_15px_rgba(166,177,255,0.5)]" />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        <video
                            ref={videoRef}
                            className={`w-full h-full object-contain bg-black cursor-pointer ${!isPlaying ? 'invisible' : 'visible'}`}
                            src={playlist[currentVideoIndex]?.url}
                            onPause={() => setIsPlaying(false)}
                            onPlay={() => setIsPlaying(true)}
                            onTimeUpdate={handleTimeUpdate}
                            onEnded={handleVideoEnded}
                            onClick={() => {
                                if (isPlaying) handlePauseVideo();
                                else handlePlayVideo();
                            }}
                            controls={isPlaying}
                        >
                            {/* Subtitle track - using instruction_url or a placeholder if available */}
                            {course?.instruction_url && (
                                <track
                                    kind="subtitles"
                                    src={course.instruction_url.endsWith('.vtt') ? course.instruction_url : undefined}
                                    srcLang="en"
                                    label="English"
                                    default={showSubtitles}
                                />
                            )}
                            Your browser does not support the video tag.
                        </video>

                        {/* Custom Interactive Progress Bar */}
                        {isPlaying && (
                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent group-hover:opacity-100 transition-opacity">
                                <div
                                    className="h-1.5 w-full bg-white/20 rounded-full cursor-pointer relative group/progress overflow-hidden"
                                    onClick={handleProgressClick}
                                >
                                    <div
                                        className="absolute h-full bg-[#a6b1ff] transition-all duration-100"
                                        style={{ width: `${videoProgress}%` }}
                                    />
                                    <div
                                        className="absolute h-full bg-white/30 opacity-0 group-hover/progress:opacity-100 transition-opacity"
                                        style={{ width: '100%' }}
                                    />
                                </div>
                                <div className="flex justify-between mt-2 text-[10px] text-gray-400 font-medium">
                                    <span>{videoRef.current ? formatTime(videoRef.current.currentTime) : '0:00'}</span>
                                    <span>{videoRef.current ? formatTime(videoRef.current.duration) : '0:00'}</span>
                                </div>
                            </div>
                        )}

                        {/* Custom Overlay Controls (Only when paused/not playing) */}
                        {!isPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300">
                                <button
                                    onClick={handlePlayVideo}
                                    className="w-20 h-20 rounded-full bg-[#a6b1ff]/90 flex items-center justify-center backdrop-blur-md hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(166,177,255,0.4)]"
                                >
                                    <Play className="w-8 h-8 text-[#0a0a0a] fill-current ml-1" />
                                </button>
                            </div>
                        )}

                        {/* Subtitle Toggle Button (UI for subtitle) */}
                        {isPlaying && (
                            <div className="absolute top-4 right-4 z-10">
                                <Button
                                    size="sm"
                                    variant={showSubtitles ? "default" : "secondary"}
                                    className={`rounded-full h-10 w-10 p-0 ${showSubtitles ? 'bg-[#a6b1ff] text-black' : 'bg-black/50 text-white border border-white/20'}`}
                                    onClick={toggleSubtitles}
                                    title="Toggle Subtitles"
                                >
                                    <Captions className="w-5 h-5" />
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Video Switcher (Visible only when multiple videos exist) */}
                    {playlist.length > 1 && (
                        <div className="space-y-4 animate-in fade-in duration-700">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                                    <MonitorPlay size={16} className="text-[#a6b1ff]" />
                                    Video Library
                                </h3>
                                <Badge variant="secondary" className="bg-white/5 text-white/40 border-none text-[10px]">
                                    {playlist.length} Videos Available
                                </Badge>
                            </div>
                            <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar snap-x">
                                {playlist.map((v, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            setCurrentVideoIndex(index);
                                            setIsPlaying(true);
                                        }}
                                        className={`relative flex-shrink-0 w-48 aspect-video rounded-2xl border-2 transition-all duration-300 overflow-hidden snap-start group ${currentVideoIndex === index
                                            ? 'border-[#a6b1ff] shadow-[0_0_20px_rgba(166,177,255,0.2)]'
                                            : 'border-white/5 hover:border-white/20'
                                            }`}
                                    >
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                                        {/* Activity Indicator */}
                                        {currentVideoIndex === index && (
                                            <div className="absolute top-2 right-2 z-10">
                                                <div className="flex gap-0.5 items-end h-3">
                                                    <div className="w-0.5 bg-[#a6b1ff] animate-[bounce_0.6s_infinite] h-full" />
                                                    <div className="w-0.5 bg-[#a6b1ff] animate-[bounce_0.8s_infinite] h-2/3" />
                                                    <div className="w-0.5 bg-[#a6b1ff] animate-[bounce_0.4s_infinite] h-full" />
                                                </div>
                                            </div>
                                        )}

                                        <div className="absolute inset-0 flex flex-col justify-end p-3 text-left">
                                            <p className={`text-[10px] font-black uppercase tracking-wider mb-0.5 ${currentVideoIndex === index ? 'text-[#a6b1ff]' : 'text-white/40'}`}>
                                                {index === 0 ? 'Introduction' : `Lesson ${index + 1}`}
                                            </p>
                                            <h4 className="text-xs font-bold text-white truncate group-hover:text-[#a6b1ff] transition-colors">
                                                {v.title}
                                            </h4>
                                        </div>

                                        {/* Play Overlay on Hover */}
                                        {currentVideoIndex !== index && (
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                                                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                                    <Play size={14} className="text-white fill-current ml-0.5" />
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Instructor & Metadata */}
                    <div className="flex items-center justify-between border-b border-white/10 pb-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="w-12 h-12 border-2 border-[#a6b1ff]/30">
                                <AvatarImage src={course.teacher_avatar} />
                                <AvatarFallback>
                                    {course.teacher_name ? course.teacher_name.substring(0, 2).toUpperCase() : 'TE'}
                                </AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-lg font-bold text-white">{course.teacher_name || 'Instructor'}</h3>
                                <p className="text-sm text-gray-400">Course Instructor</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-white"
                                onClick={handleShare}
                                title="Share Course"
                            >
                                <Share2 className="w-5 h-5" />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                                <Bookmark className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Tabs: About, Attachments, Case Study */}
                    <Tabs defaultValue="about" className="w-full">
                        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl flex flex-wrap">
                            <TabsTrigger value="about" className="data-[state=active]:bg-[#a6b1ff] data-[state=active]:text-[#0a0a0a] rounded-lg flex-1 min-w-[120px]">
                                About This Course
                            </TabsTrigger>
                            <TabsTrigger value="attachments" className="data-[state=active]:bg-[#a6b1ff] data-[state=active]:text-[#0a0a0a] rounded-lg flex-1 min-w-[120px]">
                                Attachments
                            </TabsTrigger>
                            <TabsTrigger value="casestudy" className="data-[state=active]:bg-[#a6b1ff] data-[state=active]:text-[#0a0a0a] rounded-lg flex-1 min-w-[120px] w-full sm:w-auto">
                                Case Study
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="about" className="mt-6 space-y-4 text-gray-300 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-xl font-bold text-white">Course Overview</h3>
                            <p>
                                {course.description || "No description available for this course."}
                            </p>
                        </TabsContent>

                        <TabsContent value="attachments" className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {course.attachment_url ? (
                                    <div
                                        onClick={() => window.open(course.attachment_url, '_blank')}
                                        className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group"
                                    >
                                        <div className="w-10 h-10 rounded-lg bg-[#a6b1ff]/20 flex items-center justify-center text-[#a6b1ff] group-hover:bg-[#a6b1ff] group-hover:text-[#0a0a0a] transition-colors">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-white">Course Materials</h4>
                                            <p className="text-xs text-gray-500">Download PDF</p>
                                        </div>
                                        <Download className="w-5 h-5 text-gray-500 group-hover:text-white" />
                                    </div>
                                ) : (
                                    <div className="col-span-2 text-center text-gray-500 py-8">
                                        No attachments available for this course.
                                    </div>
                                )}
                            </div>
                        </TabsContent>

                        <TabsContent value="casestudy" className="mt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                            {!isAuthenticated ? (
                                /* Auth Required Message */
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 rounded-full bg-indigo-500/10 flex items-center justify-center mx-auto mb-4">
                                        <Lock size={32} className="text-indigo-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">Authentication Required</h3>
                                    <p className="text-sm text-gray-400 mb-6">
                                        Please sign in to access the case study and track your progress.
                                    </p>
                                    <Button
                                        onClick={() => navigate('/auth/login')}
                                        className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold px-8 py-3 rounded-xl"
                                    >
                                        Sign In to Continue
                                    </Button>
                                </div>
                            ) : caseStudies.length > 0 ? (
                                <div className="space-y-6">
                                    {!caseStudyCompleted ? (
                                        <>
                                            {/* Progress Bar */}
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-sm">
                                                    <span className="text-gray-400">Progress</span>
                                                    <span className="text-white font-semibold">
                                                        {currentSegmentIndex + 1} / {caseStudies[currentCaseStudyIndex]?.segments?.length || 0}
                                                    </span>
                                                </div>
                                                <Progress 
                                                    value={((currentSegmentIndex + 1) / (caseStudies[currentCaseStudyIndex]?.segments?.length || 1)) * 100} 
                                                    className="h-2"
                                                />
                                            </div>

                                            {/* Case Study Title */}
                                            <div className="p-6 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl">
                                                <h3 className="text-2xl font-bold text-white mb-2">
                                                    {caseStudies[currentCaseStudyIndex]?.title}
                                                </h3>
                                                <p className="text-sm text-gray-400">
                                                    Segment {currentSegmentIndex + 1} of {caseStudies[currentCaseStudyIndex]?.segments?.length}
                                                </p>
                                            </div>

                                            {/* Current Segment */}
                                            <AnimatePresence mode="wait">
                                                <motion.div
                                                    key={`${currentCaseStudyIndex}-${currentSegmentIndex}`}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -20 }}
                                                    className="space-y-6"
                                                >
                                                    {/* Scenario */}
                                                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
                                                        <div className="text-xs font-bold text-indigo-400 uppercase tracking-wider mb-3">
                                                            Scenario
                                                        </div>
                                                        <p className="text-gray-300 leading-relaxed">
                                                            {caseStudies[currentCaseStudyIndex]?.segments[currentSegmentIndex]?.scenario}
                                                        </p>
                                                    </div>

                                                    {/* Question */}
                                                    <div className="space-y-4">
                                                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                                                            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
                                                                <Target size={18} className="text-indigo-400" />
                                                            </div>
                                                            {caseStudies[currentCaseStudyIndex]?.segments[currentSegmentIndex]?.question}
                                                        </h3>

                                                        {/* Answers */}
                                                        <div className="grid gap-3">
                                                            {caseStudies[currentCaseStudyIndex]?.segments[currentSegmentIndex]?.questionType === QUESTION_TYPES.SHORT_ANSWER ? (
                                                                <div className="space-y-4">
                                                                    <Textarea
                                                                        value={userAnswers[caseStudies[currentCaseStudyIndex].segments[currentSegmentIndex].id] || ''}
                                                                        onChange={(e) => handleCaseStudyAnswer(e.target.value)}
                                                                        placeholder="Type your answer here..."
                                                                        className="min-h-[120px] bg-white/5 border-white/10 rounded-2xl p-4 text-white focus:border-indigo-400"
                                                                    />
                                                                </div>
                                                            ) : (
                                                                caseStudies[currentCaseStudyIndex]?.segments[currentSegmentIndex]?.options.map((option, idx) => {
                                                                    const isSelected = caseStudies[currentCaseStudyIndex].segments[currentSegmentIndex].questionType === QUESTION_TYPES.MULTIPLE_CHOICE
                                                                        ? (userAnswers[caseStudies[currentCaseStudyIndex].segments[currentSegmentIndex].id] || []).includes(option.text)
                                                                        : userAnswers[caseStudies[currentCaseStudyIndex].segments[currentSegmentIndex].id] === option.text;

                                                                    return (
                                                                        <button
                                                                            key={idx}
                                                                            onClick={() => handleCaseStudyAnswer(option.text)}
                                                                            className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 flex items-center gap-4 group ${isSelected
                                                                                ? 'border-indigo-400 bg-indigo-400/10'
                                                                                : 'border-white/10 hover:border-white/30 bg-white/5'
                                                                            }`}
                                                                        >
                                                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${isSelected ? 'bg-indigo-400 text-black' : 'bg-white/5 text-white/40 group-hover:bg-white/10'}`}>
                                                                                {caseStudies[currentCaseStudyIndex].segments[currentSegmentIndex].questionType === QUESTION_TYPES.MULTIPLE_CHOICE ? (
                                                                                    <CheckSquare size={18} />
                                                                                ) : (
                                                                                    <Circle size={18} />
                                                                                )}
                                                                            </div>
                                                                            <span className={`flex-1 ${isSelected ? 'text-white font-semibold' : 'text-gray-300'}`}>
                                                                                {option.text}
                                                                            </span>
                                                                        </button>
                                                                    );
                                                                })
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Feedback Display */}
                                                    {showFeedback && currentFeedback && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className={`p-4 rounded-xl border-2 ${
                                                                isAnswerCorrect 
                                                                    ? 'bg-green-500/10 border-green-500/30 text-green-300' 
                                                                    : 'bg-red-500/10 border-red-500/30 text-red-300'
                                                            }`}
                                                        >
                                                            <div className="flex items-start gap-3">
                                                                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                                                                    isAnswerCorrect ? 'bg-green-500' : 'bg-red-500'
                                                                }`}>
                                                                    {isAnswerCorrect ? (
                                                                        <CheckCircle size={16} className="text-white" />
                                                                    ) : (
                                                                        <AlertCircle size={16} className="text-white" />
                                                                    )}
                                                                </div>
                                                                <div className="flex-1">
                                                                    <p className="text-sm font-semibold mb-1">
                                                                        {isAnswerCorrect ? 'Correct!' : 'Incorrect'}
                                                                    </p>
                                                                    <p className="text-sm">{currentFeedback}</p>
                                                                </div>
                                                            </div>
                                                        </motion.div>
                                                    )}

                                                    {/* Next Button */}
                                                    <Button
                                                        onClick={handleNextSegment}
                                                        disabled={!userAnswers[caseStudies[currentCaseStudyIndex]?.segments[currentSegmentIndex]?.id] ||
                                                            (caseStudies[currentCaseStudyIndex]?.segments[currentSegmentIndex]?.questionType === QUESTION_TYPES.MULTIPLE_CHOICE &&
                                                                userAnswers[caseStudies[currentCaseStudyIndex].segments[currentSegmentIndex].id]?.length === 0) ||
                                                            isSubmitting}
                                                        className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-6 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                                                    >
                                                        {isSubmitting ? (
                                                            <>
                                                                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                                                                Submitting...
                                                            </>
                                                        ) : showFeedback ? (
                                                            currentSegmentIndex < (caseStudies[currentCaseStudyIndex]?.segments?.length || 0) - 1 ? 'Next Segment' : 'Finish Case Study'
                                                        ) : (
                                                            caseStudies[currentCaseStudyIndex]?.segments[currentSegmentIndex]?.questionType === QUESTION_TYPES.SINGLE_CHOICE 
                                                                ? (currentSegmentIndex < (caseStudies[currentCaseStudyIndex]?.segments?.length || 0) - 1 ? 'Next Segment' : 'Finish Case Study')
                                                                : 'Check Answer'
                                                        )}
                                                    </Button>
                                                </motion.div>
                                            </AnimatePresence>
                                        </>
                                    ) : (
                                        /* Completion Screen */
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="space-y-6 text-center"
                                        >
                                            {/* Score Display */}
                                            <div className="p-8 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-500/30 rounded-3xl">
                                                <div className="text-6xl mb-4">🎉</div>
                                                <h3 className="text-3xl font-bold text-white mb-2">Case Study Complete!</h3>
                                                <div className="text-5xl font-black text-indigo-400 mb-2">{caseStudyScore}%</div>
                                                <p className="text-gray-400">
                                                    You scored {Math.round((caseStudyScore / 100) * (caseStudies[currentCaseStudyIndex]?.segments?.length || 0))} out of {caseStudies[currentCaseStudyIndex]?.segments?.length} correct
                                                </p>
                                            </div>

                                            {/* Outcome - Show success or failure based on score */}
                                            {caseStudies[currentCaseStudyIndex]?.outcomes && (
                                                <div className={`p-6 border rounded-2xl text-left ${
                                                    caseStudyScore >= 70 
                                                        ? 'bg-green-500/10 border-green-500/30' 
                                                        : 'bg-red-500/10 border-red-500/30'
                                                }`}>
                                                    <h4 className={`text-lg font-bold mb-3 ${
                                                        caseStudyScore >= 70 ? 'text-green-300' : 'text-red-300'
                                                    }`}>
                                                        {caseStudyScore >= 70 ? 'Success!' : 'Keep Learning'}
                                                    </h4>
                                                    <p className="text-gray-300 leading-relaxed">
                                                        {caseStudyScore >= 70 
                                                            ? caseStudies[currentCaseStudyIndex].outcomes.success 
                                                            : caseStudies[currentCaseStudyIndex].outcomes.failure}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Learning Takeaway */}
                                            {caseStudies[currentCaseStudyIndex]?.learningTakeaway && (
                                                <div className="p-6 bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl text-left">
                                                    <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                                        <span className="text-2xl">💡</span>
                                                        Key Takeaway
                                                    </h4>
                                                    <p className="text-sm text-gray-300">
                                                        {caseStudies[currentCaseStudyIndex].learningTakeaway}
                                                    </p>
                                                </div>
                                            )}

                                            {/* Action Buttons */}
                                            <div className="flex flex-col sm:flex-row gap-3">
                                                {currentCaseStudyIndex < caseStudies.length - 1 && (
                                                    <Button
                                                        onClick={handleFinishCaseStudy}
                                                        className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white font-bold py-6 rounded-2xl"
                                                    >
                                                        Next Case Study
                                                    </Button>
                                                )}
                                                <Button
                                                    onClick={() => {
                                                        setCurrentSegmentIndex(0);
                                                        setUserAnswers({});
                                                        setCaseStudyCompleted(false);
                                                    }}
                                                    variant="outline"
                                                    className="flex-1 border-white/20 text-white hover:bg-white/10 font-bold py-6 rounded-2xl"
                                                >
                                                    Retry Case Study
                                                </Button>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                                        <BookOpen size={32} className="text-gray-500" />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">No Case Studies Available</h3>
                                    <p className="text-sm text-gray-400">
                                        Case studies will be added to this course soon.
                                    </p>
                                </div>
                            )}
                        </TabsContent>
                    </Tabs>
                </div>

                {/* RIGHT COLUMN: Sidebar */}
                <div className="space-y-6">

                    {/* Progress Card */}
                    <Card className="p-6 bg-white/5 border-white/10 backdrop-blur-xl">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-white">Your Study Progress</h3>
                            <span className="text-blue-500 font-bold">{Math.round(displayProgress)}%</span>
                        </div>
                        <Progress value={displayProgress} className="h-2 bg-white/10" indicatorClassName="bg-blue-500" />
                        <p className="mt-4 text-xs text-gray-400 bg-blue-500/10 p-3 rounded-lg border border-blue-500/20">
                            Start learning today! Track your progress as you complete lessons.
                        </p>
                    </Card>

                    {/* Playlist / Videos */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-white">What you'll learn</h3>
                            <span className="text-sm text-gray-400">{playlist.length} Lessons</span>
                        </div>

                        <div className="space-y-3">
                            {playlist.length > 0 ? (
                                playlist.map((v, index) => (
                                    <div
                                        key={index}
                                        onClick={() => {
                                            setCurrentVideoIndex(index);
                                            setIsPlaying(true);
                                        }}
                                        className={`p-4 rounded-xl border transition-all duration-300 flex items-center gap-4 group cursor-pointer ${currentVideoIndex === index
                                            ? 'bg-[#a6b1ff]/10 border-[#a6b1ff]/30 shadow-[0_0_20px_rgba(166,177,255,0.1)]'
                                            : 'bg-white/5 border-white/10 hover:bg-white/10'
                                            }`}
                                    >
                                        {/* Icon Box */}
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${currentVideoIndex === index
                                            ? 'bg-[#a6b1ff] text-black'
                                            : 'bg-white/10 text-gray-500'
                                            }`}>
                                            {currentVideoIndex === index && isPlaying ? (
                                                <div className="flex gap-0.5 items-end justify-center h-3">
                                                    <div className="w-0.5 bg-black animate-[bounce_0.6s_infinite] h-full" />
                                                    <div className="w-0.5 bg-black animate-[bounce_0.8s_infinite] h-2/3" />
                                                    <div className="w-0.5 bg-black animate-[bounce_0.4s_infinite] h-full" />
                                                </div>
                                            ) : (
                                                <Play className={`w-4 h-4 ml-0.5 ${currentVideoIndex === index ? 'fill-current' : ''}`} />
                                            )}
                                        </div>

                                        {/* Text Info */}
                                        <div className="flex-1">
                                            <h4 className={`font-bold text-sm ${currentVideoIndex === index ? 'text-[#a6b1ff]' : 'text-gray-200'}`}>
                                                {v.title}
                                            </h4>
                                            <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                                                {currentVideoIndex === index ? 'Now Playing' : 'Lesson video'}
                                            </p>
                                        </div>

                                        {currentVideoIndex === index && (
                                            <div className="w-2 h-2 rounded-full bg-[#a6b1ff] animate-pulse" />
                                        )}
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-500 py-4">
                                    No videos available.
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Sticky Bottom Action Bar */}
            <div className="fixed bottom-0 left-0 right-0 p-4 z-50 pointer-events-none">
                <div className="max-w-7xl mx-auto flex justify-end pointer-events-auto">
                    <Button
                        size="lg"
                        className="bg-gradient-to-r from-[#a6b1ff] via-[#c7aff8] to-[#ffb585] text-[#0a0a0a] shadow-[0_6px_0_#8b95cc,0_15px_20px_rgba(166,177,255,0.4)] active:shadow-[0_0_0_#8b95cc] active:translate-y-[6px] font-bold text-lg h-14 px-8 rounded-2xl transition-all duration-150 border-none hover:brightness-110"
                        onClick={handleActionButtonClick}
                    >
                        {isPlaying || videoProgress > 0 ? 'Take Quiz' : 'Enroll Now'}
                        <Play className="w-5 h-5 ml-2 fill-current" />
                    </Button>
                </div>
            </div>

            {/* Case Study Drawer */}
            <Drawer open={isCaseStudyDrawerOpen} onOpenChange={setIsCaseStudyDrawerOpen}>
                <DrawerContent className="bg-[#0a0a0a]/95 backdrop-blur-2xl border-white/10 text-white min-h-[70vh] pb-10">
                    <div className="mx-auto w-full max-w-4xl px-6">
                        <DrawerHeader className="text-center">
                            <div className="mx-auto w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center mb-4 border border-indigo-500/20">
                                <BookOpen className="w-6 h-6 text-indigo-400" />
                            </div>
                            <DrawerTitle className="text-2xl font-black italic tracking-tighter uppercase">
                                Case Study: <span className="text-indigo-400">{caseStudies[currentCaseStudyIndex]?.title}</span>
                            </DrawerTitle>
                            <DrawerDescription className="text-gray-400 font-medium capitalize">
                                Assessment Segment {currentSegmentIndex + 1} of {caseStudies[currentCaseStudyIndex]?.segments?.length}
                            </DrawerDescription>
                        </DrawerHeader>

                        {!caseStudyCompleted ? (
                            <div className="mt-8 space-y-8">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={`${currentCaseStudyIndex}-${currentSegmentIndex}`}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        className="space-y-6"
                                    >
                                        {/* Scenario Text */}
                                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10 leading-relaxed text-gray-300">
                                            <div className="flex items-center gap-2 mb-3 text-indigo-400 font-black uppercase text-xs tracking-widest">
                                                <MonitorPlay size={14} />
                                                Scenario
                                            </div>
                                            {caseStudies[currentCaseStudyIndex]?.segments[currentSegmentIndex]?.scenario}
                                        </div>

                                        {/* Question */}
                                        <div className="space-y-4">
                                            <h3 className="text-xl font-bold text-white flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center shrink-0">
                                                    <Target size={18} className="text-indigo-400" />
                                                </div>
                                                {caseStudies[currentCaseStudyIndex]?.segments[currentSegmentIndex]?.question}
                                            </h3>

                                            {/* Answers */}
                                            <div className="grid gap-3">
                                                {caseStudies[currentCaseStudyIndex]?.segments[currentSegmentIndex]?.questionType === QUESTION_TYPES.SHORT_ANSWER ? (
                                                    <div className="space-y-4">
                                                        <Textarea
                                                            value={userAnswers[caseStudies[currentCaseStudyIndex].segments[currentSegmentIndex].id] || ''}
                                                            onChange={(e) => handleCaseStudyAnswer(e.target.value)}
                                                            placeholder="Type your answer here..."
                                                            className="min-h-[120px] bg-white/5 border-white/10 rounded-2xl p-4 text-white focus:border-indigo-400"
                                                        />
                                                    </div>
                                                ) : (
                                                    caseStudies[currentCaseStudyIndex]?.segments[currentSegmentIndex]?.options.map((option, idx) => {
                                                        const isSelected = caseStudies[currentCaseStudyIndex].segments[currentSegmentIndex].questionType === QUESTION_TYPES.MULTIPLE_CHOICE
                                                            ? (userAnswers[caseStudies[currentCaseStudyIndex].segments[currentSegmentIndex].id] || []).includes(option.text)
                                                            : userAnswers[caseStudies[currentCaseStudyIndex].segments[currentSegmentIndex].id] === option.text;

                                                        return (
                                                            <button
                                                                key={idx}
                                                                onClick={() => handleCaseStudyAnswer(option.text)}
                                                                className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 flex items-center gap-4 group ${isSelected
                                                                    ? 'border-indigo-400 bg-indigo-400/10'
                                                                    : 'border-white/5 bg-white/5 hover:border-white/20'
                                                                    }`}
                                                            >
                                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all ${isSelected ? 'bg-indigo-400 text-black' : 'bg-white/5 text-white/40 group-hover:bg-white/10'}`}>
                                                                    {caseStudies[currentCaseStudyIndex].segments[currentSegmentIndex].questionType === QUESTION_TYPES.MULTIPLE_CHOICE ? (
                                                                        <CheckSquare size={18} />
                                                                    ) : (
                                                                        <Circle size={18} />
                                                                    )}
                                                                </div>
                                                                <span className={`font-bold ${isSelected ? 'text-white' : 'text-gray-400'}`}>
                                                                    {option.text}
                                                                </span>
                                                            </button>
                                                        );
                                                    })
                                                )}
                                            </div>
                                        </div>

                                        <Button
                                            onClick={handleNextSegment}
                                            disabled={!userAnswers[caseStudies[currentCaseStudyIndex]?.segments[currentSegmentIndex]?.id] ||
                                                (caseStudies[currentCaseStudyIndex]?.segments[currentSegmentIndex]?.questionType === QUESTION_TYPES.MULTIPLE_CHOICE &&
                                                    userAnswers[caseStudies[currentCaseStudyIndex]?.segments[currentSegmentIndex]?.id]?.length === 0)}
                                            className="w-full h-16 bg-indigo-400 hover:bg-white text-black font-black uppercase tracking-widest rounded-2xl shadow-xl transition-all"
                                        >
                                            {currentSegmentIndex < caseStudies[currentCaseStudyIndex]?.segments?.length - 1 ? 'Next Segment' : 'Finish Case Study'}
                                            <ChevronRight className="ml-2 w-5 h-5" />
                                        </Button>
                                    </motion.div>
                                </AnimatePresence>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="mt-12 text-center space-y-8"
                            >
                                <div className="space-y-4">
                                    <div className="w-24 h-24 rounded-full bg-emerald-500/20 border-2 border-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-12 h-12 text-emerald-400" />
                                    </div>
                                    <h2 className="text-3xl font-black text-white italic tracking-tighter uppercase">
                                        Case Study <span className="text-emerald-400">Completed!</span>
                                    </h2>
                                    <p className="text-gray-400 font-medium text-lg">
                                        Excellent progress! You've analyzed the scenarios.
                                    </p>
                                </div>

                                <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 max-w-md mx-auto space-y-6">
                                    <div className="flex items-center justify-between text-white/40 uppercase tracking-widest font-black text-xs">
                                        <span>Overall Insight Score</span>
                                        <span className="text-emerald-400">{caseStudyScore}%</span>
                                    </div>
                                    <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10 p-0.5">
                                        <div
                                            className="h-full bg-emerald-400 rounded-full transition-all duration-1000"
                                            style={{ width: `${caseStudyScore}%` }}
                                        />
                                    </div>

                                    <div className="space-y-2 text-left bg-white/5 p-4 rounded-2xl">
                                        <div className="flex items-center gap-2 text-indigo-400 font-black uppercase text-[10px] tracking-widest">
                                            <Lightbulb size={12} />
                                            Key Takeaway
                                        </div>
                                        <p className="text-sm italic text-gray-300">
                                            {caseStudies[currentCaseStudyIndex]?.learningTakeaway}
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-2xl bg-indigo-500/5 border border-indigo-500/10 text-left">
                                        <p className="text-sm text-indigo-300 leading-relaxed">
                                            {caseStudyScore >= 70
                                                ? caseStudies[currentCaseStudyIndex]?.outcomes?.success
                                                : caseStudies[currentCaseStudyIndex]?.outcomes?.failure}
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleFinishCaseStudy}
                                    className="px-12 h-16 bg-white hover:bg-emerald-400 text-black font-black uppercase tracking-widest rounded-2xl shadow-2xl transition-all hover:scale-105 active:scale-95"
                                >
                                    {currentCaseStudyIndex < caseStudies.length - 1 ? 'Next Case Study' : 'Return to Course'}
                                </Button>
                            </motion.div>
                        )}
                    </div>
                </DrawerContent>
            </Drawer>

            {/* Reflection Quiz Drawer */}
            <Drawer open={isQuizDrawerOpen} onOpenChange={setIsQuizDrawerOpen}>
                <DrawerContent className="bg-[#0a0a0a]/95 backdrop-blur-2xl border-white/10 text-white pb-10">
                    <div className="mx-auto w-full max-w-lg px-6">
                        <DrawerHeader className="text-center">
                            <div className="mx-auto w-12 h-12 bg-[#a6b1ff]/20 rounded-2xl flex items-center justify-center mb-4 border border-[#a6b1ff]/20">
                                <FileText className="w-6 h-6 text-[#a6b1ff]" />
                            </div>
                            <DrawerTitle className="text-2xl font-black italic tracking-tighter uppercase">
                                Course <span className="text-[#a6b1ff]">Reflection</span>
                            </DrawerTitle>
                            <DrawerDescription className="text-gray-400 font-medium">
                                Share your insights on "the techxplora course?"
                            </DrawerDescription>
                        </DrawerHeader>

                        <div className="mt-8 space-y-6">
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-[#a6b1ff] uppercase tracking-widest pl-1">
                                    What did you learn from this video?
                                </label>
                                <Textarea
                                    value={reflection}
                                    onChange={(e) => setReflection(e.target.value)}
                                    placeholder="Enter your insights here..."
                                    className="min-h-[150px] bg-white/5 border-white/10 rounded-2xl focus:border-[#a6b1ff] focus:ring-1 focus:ring-[#a6b1ff] text-white placeholder:text-gray-600 p-6 transition-all"
                                />
                            </div>

                            <Button
                                onClick={handleReflectionSubmit}
                                className="w-full h-16 bg-[#a6b1ff] hover:bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 shadow-2xl shadow-[#a6b1ff]/10"
                            >
                                Submit Reflection
                                <Send className="w-5 h-5" />
                            </Button>
                        </div>

                        <DrawerFooter className="mt-4 pt-4 border-t border-white/5">
                            <DrawerClose asChild>
                                <Button variant="ghost" className="text-gray-500 hover:text-white font-bold">
                                    Cancel
                                </Button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>

            {/* Registration Modal */}
            <Dialog open={showRegModal} onOpenChange={setShowRegModal}>
                <DialogContent className="bg-[#0a0a0a] border-white/10 text-white max-w-md rounded-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-[#a6b1ff] to-[#ffb585] bg-clip-text text-transparent italic">
                            Registration Required
                        </DialogTitle>
                        <DialogDescription className="text-gray-400 mt-2">
                            To take the quiz and track your progress, you need to be registered for this course. Do you want to sign in or register now?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-3 mt-6">
                        <Button
                            variant="ghost"
                            onClick={() => setShowRegModal(false)}
                            className="flex-1 text-gray-400 hover:text-white hover:bg-white/5 border border-white/10"
                        >
                            Later
                        </Button>
                        <Button
                            onClick={() => navigate('/auth/login')}
                            className="flex-1 bg-[#a6b1ff] hover:bg-[#a6b1ff]/90 text-black font-bold"
                        >
                            Yes, Sign In
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Enrollment Modal for Registered Users */}
            <Dialog open={showEnrollModal} onOpenChange={setShowEnrollModal}>
                <DialogContent className="bg-[#0a0a0a] border-white/10 text-white max-w-md rounded-2xl">
                    <DialogHeader>
                        <div className="mx-auto w-12 h-12 bg-[#a6b1ff]/20 rounded-2xl flex items-center justify-center mb-4 border border-[#a6b1ff]/20">
                            <MonitorPlay className="w-6 h-6 text-[#a6b1ff]" />
                        </div>
                        <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-[#a6b1ff] to-[#ffb585] bg-clip-text text-transparent italic">
                            Course Registration
                        </DialogTitle>
                        <DialogDescription className="text-gray-400 mt-2 text-center">
                            Would you like to register and start learning "the techxplora course"?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex gap-3 mt-6">
                        <Button
                            variant="ghost"
                            onClick={() => setShowEnrollModal(false)}
                            className="flex-1 text-gray-400 hover:text-white hover:bg-white/5 border border-white/10 h-12 rounded-xl"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                setShowEnrollModal(false);
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                                handlePlayVideo();
                            }}
                            className="flex-1 bg-[#a6b1ff] hover:bg-[#a6b1ff]/90 text-black font-bold h-12 rounded-xl"
                        >
                            Yes, Start Now
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
