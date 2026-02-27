import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Plus, Search, BookOpen, Clock, Users, ArrowUpRight, Loader2, LayoutGrid, Edit } from 'lucide-react';
import { useGetCoursesByAdminCodeQuery } from '@/redux/api/teacherApi';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EmptyState from '@/components/dashboard/EmptyState';
import TiltCard from "@/components/ui/TiltCard";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cashFormat } from '@/utils/cashFormat';

export default function ManageCourses() {
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const [searchQuery, setSearchQuery] = useState("");

    const { data: coursesData, isLoading, isFetching, refetch } = useGetCoursesByAdminCodeQuery(user?.admin_code, {
        skip: !user?.admin_code
    });

    const courses = coursesData?.data || coursesData || [];

    const isStudent = user?.accountable_type === "App\\Models\\Student" || user?.role === 'student';
    const isTeacher = user?.role === 'teacher' || user?.accountable_type === "App\\Models\\Teacher" || user?.is_admin || user?.role === 'admin';

    const getButtonConfig = () => {
        if (!user) {
            return {
                label: "Register for course",
                icon: Users,
                onClick: () => navigate('/auth/signup')
            };
        }
        if (isStudent) {
            return {
                label: "View All Courses",
                icon: LayoutGrid,
                onClick: () => navigate('/courses')
            };
        }
        return {
            label: "Create New Course",
            icon: Plus,
            onClick: () => navigate('/dashboard/courses/create')
        };
    };

    const btn = getButtonConfig();
    const BtnIcon = btn.icon;

    const getEmptyStateConfig = () => {
        if (searchQuery) return {
            title: "No Courses Found",
            description: "No courses match your search criteria."
        };
        if (!user) return {
            title: "Start Your Journey",
            description: "Register for a student account to explore our premium courses and start learning today!"
        };
        if (isStudent) return {
            title: "Ready to Learn?",
            description: "You haven't joined any courses yet. Head over to our courses page to find your first challenge!"
        };
        return {
            title: "No Courses Created",
            description: "You haven't created any courses yet. Start your journey by creating your first learning material!"
        };
    };

    const emptyState = getEmptyStateConfig();

    const filteredCourses = courses.filter(course =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24 lg:pb-10">
                <div className="w-full relative">
                    {/* Header Banner */}
                    <div className="mx-4 sm:mx-6 lg:mx-10 mt-6 lg:mt-8 relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#121431] via-[#1a1f4d] to-[#121431] border border-white/10 shadow-2xl p-8 lg:p-12">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[100px]" />
                        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                            <div className="flex-1 space-y-4 text-center lg:text-left">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 border border-white/20 shadow-lg">
                                    <BookOpen className="text-white" size={16} />
                                    <span className="text-white font-black text-sm uppercase tracking-wider italic">Academy</span>
                                </div>
                                <h2 className="text-3xl lg:text-4xl font-black text-white leading-tight uppercase italic tracking-tight">
                                    Course <span className="text-[#a6b1ff]">Management</span>
                                </h2>
                                <p className="text-white/70 text-base lg:text-lg font-medium max-w-md mx-auto lg:mx-0">
                                    Create, edit and manage your learning materials to empower your students.
                                </p>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={btn.onClick}
                                className="px-8 py-4 rounded-2xl bg-[#a6b1ff] text-[#0a0a0a] font-black uppercase tracking-wider shadow-xl flex items-center gap-3 group"
                            >
                                <BtnIcon size={24} />
                                {btn.label}
                                <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </motion.button>
                        </div>
                    </div>

                    {/* Controls Section */}
                    <div className="px-6 lg:px-10 mt-12 mb-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="relative w-full md:max-w-md">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search your courses..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-[#a6b1ff]/50 transition-all font-medium"
                                />
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    onClick={() => refetch()}
                                    className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white/60 hover:text-[#a6b1ff] hover:bg-white/10 transition-all"
                                    disabled={isFetching}
                                >
                                    <Loader2 size={20} className={isFetching ? "animate-spin" : ""} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Courses Grid */}
                    <div className="px-6 lg:px-10">
                        {isLoading ? (
                            <div className="py-20 flex justify-center">
                                <Loader2 className="w-12 h-12 text-[#a6b1ff] animate-spin" />
                            </div>
                        ) : filteredCourses.length === 0 ? (
                            <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-12 text-center backdrop-blur-3xl">
                                <EmptyState
                                    title={emptyState.title}
                                    description={emptyState.description}
                                />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredCourses.map((course, index) => (
                                    <motion.div
                                        key={course.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <TiltCard>
                                            <Card
                                                className="h-full group bg-white/5 border-white/10 overflow-hidden backdrop-blur-xl hover:border-[#a6b1ff]/30 cursor-pointer transition-all duration-500"
                                                onClick={() => navigate(`/dashboard/courses/view/${course.id}`)}
                                            >
                                                <div className="relative aspect-video overflow-hidden">
                                                    <img
                                                        src={course.banner_url || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop"}
                                                        alt={course.title}
                                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60" />
                                                    <Badge className="absolute top-4 left-4 bg-[#a6b1ff]/90 text-[#0a0a0a] font-bold border-none">
                                                        {course.category || 'General'}
                                                    </Badge>
                                                    <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md rounded-full px-3 py-1 text-[10px] font-black text-white uppercase border border-white/10">
                                                        {course.difficulty_level}
                                                    </div>
                                                </div>

                                                <CardContent className="p-6 space-y-4">
                                                    <h3 className="text-xl font-bold text-white line-clamp-2 leading-tight group-hover:text-[#a6b1ff] transition-colors">
                                                        {course.title}
                                                    </h3>

                                                    <div className="flex items-center gap-4 text-xs text-white/40 font-bold uppercase tracking-widest">
                                                        <div className="flex items-center gap-1.5">
                                                            <Users size={14} className="text-[#a6b1ff]" />
                                                            {course.students_count || 0} Students
                                                        </div>
                                                        <div className="flex items-center gap-1.5">
                                                            <Clock size={14} className="text-[#a6b1ff]" />
                                                            {Math.round(course.duration || 0)} Hrs
                                                        </div>
                                                    </div>
                                                </CardContent>

                                                <CardFooter className="px-6 pb-6 pt-4 flex items-center justify-between border-t border-white/5">
                                                    <div className="flex flex-col">
                                                        <span className="text-xl font-black text-white">
                                                            {course.amount ? `${course.amount} XP` : 'FREE'}
                                                        </span>
                                                        <span className={`text-[9px] font-black uppercase tracking-widest ${course.status ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                            {course.status ? 'Published' : 'Draft'}
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                navigate(`/dashboard/courses/edit/${course.id}`);
                                                            }}
                                                            className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10 transition-all"
                                                        >
                                                            <Edit size={18} />
                                                        </button>
                                                        <button
                                                            onClick={() => navigate(`/dashboard/courses/view/${course.id}`)}
                                                            className="h-10 px-6 rounded-xl bg-[#a6b1ff] text-[#0a0a0a] font-black uppercase text-[10px] tracking-widest italic hover:scale-105 transition-all"
                                                        >
                                                            Manage
                                                        </button>
                                                    </div>
                                                </CardFooter>
                                            </Card>
                                        </TiltCard>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
