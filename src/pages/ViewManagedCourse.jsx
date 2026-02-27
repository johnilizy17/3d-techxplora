import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ArrowLeft,
    Edit,
    Trash2,
    Users,
    Clock,
    Star,
    Video,
    BookOpen,
    Settings,
    Loader2,
    Eye,
    BarChart2,
    FileText,
    Play
} from 'lucide-react';
import { useGetCourseByIdQuery, useDeleteCourseMutation } from '@/redux/api/teacherApi';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';

export default function ViewManagedCourse() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const { data: courseData, isLoading, error } = useGetCourseByIdQuery(courseId);
    const [deleteCourse, { isLoading: isDeleting }] = useDeleteCourseMutation();

    const course = courseData?.data || courseData;

    const handleDelete = async () => {
        if (window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) {
            try {
                await deleteCourse(courseId).unwrap();
                toast.success("Course deleted successfully");
                navigate('/dashboard/courses');
            } catch (err) {
                toast.error("Failed to delete course");
            }
        }
    };

    if (isLoading) {
        return (
            <DashboardLayout>
                <div className="min-h-screen flex items-center justify-center">
                    <Loader2 className="w-12 h-12 text-[#a6b1ff] animate-spin" />
                </div>
            </DashboardLayout>
        );
    }

    if (error || !course) {
        return (
            <DashboardLayout>
                <div className="min-h-screen p-10 text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Course not found</h2>
                    <Button onClick={() => navigate('/dashboard/courses')} className="bg-[#a6b1ff] text-black">
                        Back to Courses
                    </Button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24 lg:pb-10">
                <div className="px-6 lg:px-10 mt-6 space-y-8">
                    {/* Navigation and Actions */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <button
                            onClick={() => navigate('/dashboard/courses')}
                            className="flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-black text-sm uppercase tracking-wider">Back to Academy</span>
                        </button>

                        <div className="flex items-center gap-3">
                            <Button
                                variant="outline"
                                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                                onClick={() => navigate(`/courses/${courseId}`)}
                            >
                                <Eye size={18} className="mr-2" />
                                Preview as Student
                            </Button>
                            <Button
                                variant="outline"
                                className="bg-white/5 border-white/10 text-white hover:bg-white/10"
                                onClick={() => navigate(`/dashboard/courses/edit/${courseId}`)}
                            >
                                <Edit size={18} className="mr-2" />
                                Edit Course
                            </Button>
                            <Button
                                variant="destructive"
                                className="bg-rose-500/10 border-rose-500/20 text-rose-500 hover:bg-rose-500 hover:text-white"
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                            </Button>
                        </div>
                    </div>

                    {/* Header Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                                <img
                                    src={course.banner_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"}
                                    className="w-full h-full object-cover"
                                    alt={course.title}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                <div className="absolute bottom-6 left-6 right-6">
                                    <Badge className="mb-3 bg-[#a6b1ff] text-black border-none font-black italic">
                                        {course.category}
                                    </Badge>
                                    <h1 className="text-3xl lg:text-4xl font-black text-white uppercase italic tracking-tighter shadow-sm">
                                        {course.title}
                                    </h1>
                                </div>
                            </div>

                            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 lg:p-10 space-y-6">
                                <h3 className="text-xl font-black text-white uppercase italic flex items-center gap-3">
                                    <BookOpen className="text-[#a6b1ff]" />
                                    Course Description
                                </h3>
                                <div className="text-white/70 font-medium leading-relaxed">
                                    {course.description}
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <h4 className="text-sm font-black text-white/40 uppercase tracking-[0.2em] mb-4">Learning Objectives</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {(course.learn || []).map((item, i) => (
                                            <div key={i} className="flex gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                                                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                                                    <span className="text-[10px] text-emerald-400 font-black">{i + 1}</span>
                                                </div>
                                                <span className="text-sm text-white/80 font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {/* Performance Card */}
                            <Card className="bg-gradient-to-br from-[#121431] to-[#1a1f4d] border-white/10 rounded-[2rem] overflow-hidden shadow-2xl">
                                <CardHeader className="pb-2 border-b border-white/5">
                                    <CardTitle className="text-sm font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                                        <BarChart2 size={16} className="text-[#a6b1ff]" />
                                        Performance
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="pt-6">
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-1">
                                            <span className="text-2xl lg:text-3xl font-black text-white">{course.students_count || 0}</span>
                                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest italic">Students</p>
                                        </div>
                                        <div className="space-y-1">
                                            <span className="text-2xl lg:text-3xl font-black text-[#a6b1ff] italic">{course.amount || 'FREE'}</span>
                                            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest italic">Price (XP)</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Syllabus / Videos */}
                            <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 space-y-6">
                                <h3 className="text-sm font-black text-white uppercase italic flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Video size={18} className="text-[#a6b1ff]" />
                                        Curriculum
                                    </div>
                                    <span className="text-[10px] text-white/30 tracking-widest">{(course.other?.length || 0) + 1} Lessons</span>
                                </h3>

                                <div className="space-y-3">
                                    <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-lg bg-[#a6b1ff]/10 flex items-center justify-center text-[#a6b1ff]">
                                            <Play size={14} fill="currentColor" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <span className="text-xs font-bold text-white/80 block truncate">Introduction</span>
                                            <span className="text-[9px] text-white/30 uppercase font-black">Main Video</span>
                                        </div>
                                    </div>
                                    {(course.other || []).map((video, i) => (
                                        <div key={i} className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-4">
                                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/40">
                                                <Play size={14} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <span className="text-xs font-bold text-white/60 block truncate">Lesson Module {i + 1}</span>
                                                <span className="text-[9px] text-white/20 uppercase font-black">Attachment Video</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Stats & Questions */}
                            <div className="space-y-6">
                                <div className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 space-y-4">
                                    <h4 className="text-xs font-black text-white/40 uppercase tracking-widest flex items-center gap-2">
                                        <FileText size={16} className="text-amber-400" />
                                        Embedded Questions
                                    </h4>
                                    <div className="space-y-2">
                                        {(course.question || course.questions || []).length > 0 ? (
                                            (course.question || course.questions || []).map((q, i) => (
                                                <div key={i} className="text-[10px] text-white/60 font-medium py-2 border-b border-white/5 last:border-0 italic">
                                                    Q{i + 1}: {q.question_text?.slice(0, 40)}...
                                                </div>
                                            ))
                                        ) : (
                                            <p className="text-[10px] text-white/20 italic">No questions added</p>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-6 flex gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
                                        <Settings size={20} className="text-[#a6b1ff]" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-xs font-black text-white uppercase tracking-wider">Advanced Settings</h4>
                                        <p className="text-[10px] text-white/40 font-medium">Linked Quiz: {course.quiz_id ? 'Active' : 'Not Linked'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
