import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Users, GraduationCap, BookOpen, Award, Mail, Calendar, Sparkles, TrendingUp } from 'lucide-react';
import { useGetTeachersQuery } from '@/redux/api/teacherApi';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EmptyState from '@/components/dashboard/EmptyState';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { timeAgo } from '@/utils/date';

export default function Teachers() {
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);

    const { data: teachersData, isLoading } = useGetTeachersQuery(user.admin_code);

    const teachers = Array.isArray(teachersData) ? teachersData : (teachersData?.data || []);

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24 lg:pb-10">
                <div className="w-full relative">
                    {/* Promotional Banner */}
                    <PromotionalBanner teachers={teachers} />

                    {/* Teachers Section */}
                    <div className="px-6 lg:px-10 mt-12">
                        <div className="mb-8">
                            <h2 className="text-3xl font-black text-white tracking-tight leading-none mb-2 uppercase italic">
                                All Teachers
                            </h2>
                            <div className="h-1 w-16 bg-gradient-to-r from-[#a6b1ff] to-transparent rounded-full" />
                        </div>

                        {isLoading ? (
                            <div className="py-12 flex justify-center">
                                <div className="relative w-10 h-10">
                                    <div className="absolute inset-0 rounded-full border-2 border-[#a6b1ff]/20"></div>
                                    <div className="absolute inset-0 rounded-full border-t-2 border-[#a6b1ff] animate-spin"></div>
                                </div>
                            </div>
                        ) : teachers.length === 0 ? (
                            <div className="bg-white/5 border border-white/10 rounded-[2rem] p-12">
                                <EmptyState title="No Teachers Found" description="There are currently no teachers in the system." />
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {teachers.map((teacher, index) => (
                                    <TeacherCard
                                        key={teacher.id || index}
                                        teacher={teacher}
                                        index={index}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

// Promotional Banner Component
const PromotionalBanner = ({ teachers }) => {
    const navigate = useNavigate();

    const totalTeachers = teachers?.length || 0;
    const activeTeachers = teachers?.filter(t => t.status === "1" || t.status === 1 || t.is_active)?.length || 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-4 sm:mx-6 lg:mx-10 mt-6 lg:mt-8 relative overflow-hidden rounded-[2rem] lg:rounded-[2.5rem] bg-gradient-to-br from-[#1a1f4d] via-[#2a2f6d] to-[#1a1f4d] border border-[#a6b1ff]/20 shadow-2xl"
        >
            {/* Background Decorations */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-500/10 rounded-full blur-[80px]" />

            {/* Decorative Elements */}
            <div className="absolute top-4 left-8 hidden lg:block">
                <Sparkles className="text-pink-400 animate-pulse" size={20} />
            </div>
            <div className="absolute top-8 right-32 hidden lg:block">
                <Sparkles className="text-purple-400 animate-pulse" size={16} style={{ animationDelay: '0.5s' }} />
            </div>

            <div className="relative z-10 p-6 sm:p-8 lg:p-12">
                {/* Main Content Row */}
                <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-8 mb-6 lg:mb-8">
                    <div className="flex-1 space-y-3 lg:space-y-4 w-full lg:w-auto text-center lg:text-left">
                        {/* Dynamic Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-rose-500 to-orange-500 border border-white/20 shadow-lg">
                            <GraduationCap className="text-white" size={16} />
                            <span className="text-white font-black text-sm uppercase tracking-wider italic">ADMIN PANEL</span>
                        </div>

                        {/* Main Heading */}
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight uppercase italic tracking-tight">
                            Teacher Directory
                        </h2>

                        {/* Subtext */}
                        <p className="text-white/80 text-sm sm:text-base lg:text-lg font-medium max-w-md mx-auto lg:mx-0">
                            View and manage all teachers in the system. Monitor their activity and performance.
                        </p>

                        {/* Benefits List */}
                        <div className="hidden sm:flex flex-col gap-2 pt-2">
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                                <span>View teacher profiles and statistics</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                                <span>Monitor course creation and student engagement</span>
                            </div>
                            <div className="flex items-center gap-2 text-xs sm:text-sm text-white/70">
                                <div className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                                <span>Track overall platform activity</span>
                            </div>
                        </div>
                    </div>

                    {/* Character Illustration */}
                    <div className="relative hidden sm:block">
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="relative z-10"
                        >
                            <div className="w-32 h-32 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center shadow-2xl">
                                <GraduationCap className="text-white" size={48} />
                            </div>
                        </motion.div>
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-orange-500 opacity-20 rounded-full blur-3xl" />
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="relative z-10 pt-6 border-t border-white/10">
                    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
                        {/* Total Teachers */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 sm:p-4 lg:p-5 border border-white/10 hover:border-[#a6b1ff]/30 transition-all cursor-pointer group"
                        >
                            <div className="flex flex-col items-center text-center">
                                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-white group-hover:text-[#a6b1ff] transition-colors">
                                    {totalTeachers}
                                </span>
                                <span className="text-[10px] sm:text-xs lg:text-sm text-white/60 font-bold uppercase tracking-wider mt-1">
                                    Total Teachers
                                </span>
                            </div>
                        </motion.div>

                        {/* Active Teachers */}
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="bg-white/5 backdrop-blur-sm rounded-2xl p-3 sm:p-4 lg:p-5 border border-white/10 hover:border-emerald-400/30 transition-all cursor-pointer group"
                        >
                            <div className="flex flex-col items-center text-center">
                                <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-emerald-400 group-hover:scale-110 transition-transform">
                                    {activeTeachers}
                                </span>
                                <span className="text-[10px] sm:text-xs lg:text-sm text-white/60 font-bold uppercase tracking-wider mt-1">
                                    Active Now
                                </span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Teacher Card Component
const TeacherCard = ({ teacher, index }) => {
    const isActive = teacher.status === "1" || teacher.status === 1 || teacher.is_active;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index, duration: 0.4 }}
            className="rounded-[2.5rem] bg-[#1a1a1a]/40 backdrop-blur-xl border border-white/5 hover:border-[#a6b1ff]/30 transition-all duration-500 p-6 relative group overflow-hidden shadow-2xl flex flex-col min-h-[280px]"
        >
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.01] to-white/[0.04] pointer-events-none" />

            {/* Background Decorative Glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-purple-500/10 rounded-full blur-[60px] group-hover:bg-purple-500/20 transition-all duration-700" />

            {/* Header Section */}
            <div className="flex items-start gap-5 mb-6 relative z-10">
                <div className="relative">
                    <Avatar className="h-20 w-20 rounded-2xl group-hover:border-[#a6b1ff]/50 transition-all duration-500 shadow-xl group-hover:scale-110 border-2 border-white/10">
                        <AvatarImage src={teacher.image || teacher.profile_image} className="object-cover" />
                        <AvatarFallback className="bg-gradient-to-br from-[#a6b1ff]/20 to-[#c7aff8]/20 text-[#a6b1ff] font-black text-2xl italic uppercase">
                            {teacher.name?.charAt(0) || teacher.first_name?.charAt(0) || <GraduationCap size={28} />}
                        </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-2 -right-2 p-1.5 rounded-lg bg-[#0a0a0a] border border-white/10 shadow-lg">
                        <GraduationCap size={14} className="text-[#a6b1ff]" />
                    </div>
                </div>

                <div className="flex-1 min-w-0 pt-1">
                    <div className="flex items-center gap-2 mb-2">
                        <div className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full ${isActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border border-gray-500/20'} text-[9px] font-black uppercase tracking-tighter italic shadow-sm`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-400' : 'bg-gray-400'} animate-pulse`} />
                            {isActive ? 'Active' : 'Inactive'}
                        </div>
                    </div>
                    <h3 className="text-xl font-black text-white italic line-clamp-1 uppercase tracking-tighter group-hover:text-[#a6b1ff] transition-colors leading-tight">
                        {teacher.name || `${teacher.first_name || ''} ${teacher.last_name || ''}`.trim() || 'Unknown Teacher'}
                    </h3>
                </div>
            </div>

            {/* Info Section */}
            <div className="space-y-3 mb-6 relative z-10">
                {teacher.email && (
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-white/5">
                            <Mail size={14} className="text-[#a6b1ff]" />
                        </div>
                        <span className="text-xs text-white/60 line-clamp-1 font-medium">{teacher.email}</span>
                    </div>
                )}

                {teacher.created_at && (
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-white/5">
                            <Calendar size={14} className="text-[#a6b1ff]" />
                        </div>
                        <span className="text-xs text-white/60 font-medium">Joined {timeAgo(teacher.created_at)}</span>
                    </div>
                )}
            </div>

            {/* Stats Section */}
            <div className="mt-auto flex items-center justify-between relative z-10 pt-6 border-t border-white/5">
                <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 mb-1">
                            <BookOpen size={12} className="text-[#a6b1ff]" />
                            <span className="text-lg font-black text-white italic">{teacher.courses_count || 0}</span>
                        </div>
                        <span className="text-[8px] text-white/40 uppercase tracking-wider font-bold">Courses</span>
                    </div>

                    <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 mb-1">
                            <Users size={12} className="text-[#a6b1ff]" />
                            <span className="text-lg font-black text-white italic">{teacher.students_count || 0}</span>
                        </div>
                        <span className="text-[8px] text-white/40 uppercase tracking-wider font-bold">Students</span>
                    </div>
                </div>

                <div className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:bg-[#a6b1ff] hover:text-[#0a0a0a] transition-all duration-300 group/icon cursor-pointer">
                    <TrendingUp size={18} className="group-hover/icon:scale-110 transition-transform" />
                </div>
            </div>
        </motion.div>
    );
};
