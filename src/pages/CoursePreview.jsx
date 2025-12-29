import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
    Play, Pause, CheckCircle, Lock, MonitorPlay,
    FileText, Download, Share2, Bookmark, Star,
    MessageSquare, Loader2, Captions
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import {
    useGetStudentCourseByIdQuery,
    useGetCourseProgressQuery,
    useUpdateCourseProgressMutation
} from '@/redux/api/studentApi';

export default function CoursePreview() {
    const { courseId } = useParams();
    const { toast } = useToast();

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

    const [isPlaying, setIsPlaying] = useState(false);
    const [showSubtitles, setShowSubtitles] = useState(false);
    const [courseStarted, setCourseStarted] = useState(false);
    const videoRef = useRef(null);

    const [videoProgress, setVideoProgress] = useState(0);

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
        setIsPlaying(false);
        // Put logic here to mark lesson as complete or update progress
        toast({
            title: "Lesson Completed! 🎉",
            description: "Great job! You've finished this video.",
            className: "bg-green-500 text-white border-none",
            duration: 3000,
        });

        // Example: Update progress (mock implementation since backend logic depends on specifics)
        // In a real app, you might send which lesson ID was completed:
        // updateProgress({ courseId, progressData: { percentage: 100, completedLessonId: ... } });
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
                <h2 className="text-2xl font-bold text-white mb-2">Course not found</h2>
                <p className="text-gray-400">The course you are looking for does not exist or has been removed.</p>
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
                    <div className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl shadow-[#a6b1ff]/10 group">
                        {!isPlaying && (
                            <img
                                src={course.banner_url || course.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"}
                                alt="Course Preview"
                                className="w-full h-full object-cover opacity-80"
                            />
                        )}

                        <video
                            ref={videoRef}
                            className={`w-full h-full object-contain bg-black ${!isPlaying ? 'hidden' : 'block'}`}
                            src={course.video_url}
                            poster={course.banner_url}
                            controls={isPlaying} // Show native controls only when playing to avoid clutter
                            onPause={() => setIsPlaying(false)}
                            onPlay={() => setIsPlaying(true)}
                            onTimeUpdate={handleTimeUpdate}
                            onEnded={handleVideoEnded}
                        >
                            {/* Subtitle track - using instruction_url or a placeholder if available */}
                            {course.instruction_url && (
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

                    {/* Tabs: About, Attachments */}
                    <Tabs defaultValue="about" className="w-full">
                        <TabsList className="bg-white/5 border border-white/10 p-1 rounded-xl">
                            <TabsTrigger value="about" className="data-[state=active]:bg-[#a6b1ff] data-[state=active]:text-[#0a0a0a] rounded-lg">
                                About This Course
                            </TabsTrigger>
                            <TabsTrigger value="attachments" className="data-[state=active]:bg-[#a6b1ff] data-[state=active]:text-[#0a0a0a] rounded-lg">
                                Attachments
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value="about" className="mt-6 space-y-4 text-gray-300 leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <h3 className="text-xl font-bold text-white">Course Overview</h3>
                            <p>
                                {course.description || "No description available for this course."}
                            </p>

                            {/* Static motivational content for now */}
                            <h4 className="text-lg font-bold text-white mt-6 mb-2">What you'll learn</h4>
                            <ul className="list-disc pl-5 space-y-2 text-gray-400">
                                <li>Comprehensive understanding of the subject matter.</li>
                                <li>Practical skills applied through real-world examples.</li>
                                <li>Expert tips and best practices.</li>
                            </ul>
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

                    {/* Syllabus List */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="font-bold text-white">Course Content</h3>
                            <span className="text-sm text-gray-400">{lessons.length} Lessons</span>
                        </div>

                        <div className="space-y-3">
                            {lessons.length > 0 ? (
                                lessons.map((lesson, index) => (
                                    <div
                                        key={lesson.id || index}
                                        className="p-4 rounded-xl border bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 flex items-center gap-4 group cursor-pointer"
                                    >
                                        {/* Icon Box */}
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-white/10 text-gray-500">
                                            <Play className="w-5 h-5 ml-1 fill-current" />
                                        </div>

                                        {/* Text Info */}
                                        <div className="flex-1">
                                            <h4 className="font-bold text-sm text-gray-200">
                                                {lesson.question_text || `Lesson ${index + 1}`}
                                            </h4>
                                            <p className="text-xs text-gray-500">
                                                {lesson.points ? `${lesson.points} points` : '10 mins'}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center text-gray-500 py-4">
                                    No lessons added yet.
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
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                        Enroll Now
                        <Play className="w-5 h-5 ml-2 fill-current" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
