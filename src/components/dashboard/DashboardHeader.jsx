import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, Users, ShieldCheck, GraduationCap, School, Star, Copy, Sparkles } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import DaimondIcon from "@/asset/DaimondIcon";
import CopyIcon from './CopyIcon';

export default function DashboardHeader({ user }) {
    const isTeacher = user?.accountable_type === "App\\Models\\Teacher";
    const isAdmin = user?.is_admin || user?.role === 'admin'; // Adjust based on your actual user object

    const getAccountType = () => {
        if (isAdmin) return { label: 'Admin', icon: ShieldCheck, color: 'from-rose-500 to-orange-500' };
        if (isTeacher) return { label: 'Teacher', icon: School, color: 'from-blue-500 to-indigo-600' };
        return { label: 'Student', icon: GraduationCap, color: 'from-emerald-400 to-teal-600' };
    };

    const accountType = getAccountType();
    const TypeIcon = accountType.icon;

    return (
        <div className="relative pt-8 lg:pt-12 pb-20 px-6 lg:px-10 overflow-hidden bg-[#0d0d0d]">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-indigo-600/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[350px] h-[350px] bg-purple-600/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 lg:max-w-7xl lg:mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="relative group">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="relative z-10 p-1 rounded-[2rem] bg-gradient-to-br from-white/10 to-transparent border border-white/20 shadow-2xl overflow-hidden"
                            >
                                <Avatar className="w-16 h-16 md:w-20 md:h-20 rounded-[1.8rem]">
                                    <AvatarImage src={user?.avatar || "https://github.com/shadcn.png"} className="object-cover" />
                                    <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white font-black text-2xl">
                                        {user?.fullname?.charAt(0) || user?.name?.charAt(0) || "U"}
                                    </AvatarFallback>
                                </Avatar>
                            </motion.div>
                            <div className="absolute inset-0 bg-indigo-500/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>

                        <div className="space-y-1">
                            <div className="flex items-center gap-3 flex-wrap">
                                <motion.h1
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="text-white text-2xl md:text-3xl font-black italic tracking-tighter uppercase"
                                >
                                    {user?.fullname?.split(' ')[0] || "Xplora"}
                                </motion.h1>
                                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r ${accountType.color} border border-white/10 shadow-lg`}>
                                    <TypeIcon className="w-3 h-3 text-white" />
                                    <span className="text-[10px] font-black text-white uppercase tracking-wider italic">{accountType.label}</span>
                                </div>
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.1 }}
                                className="flex flex-col gap-1"
                            >
                                <p className="text-white/40 text-sm font-medium italic tracking-tight">
                                    {user?.email}
                                </p>

                                {isAdmin && user?.admin_code && (
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl group/code hover:bg-white/10 transition-colors">
                                            <span className="text-[9px] font-black text-white/30 tracking-widest uppercase italic">Admin Key</span>
                                            <span className="text-xs font-black text-[#a6b1ff] tracking-widest">{user.admin_code}</span>
                                        </div>
                                        <CopyIcon code={user.admin_code} size={14} className="h-8 w-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-all shadow-lg" />
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Link to="/dashboard/wallet">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 backdrop-blur-xl flex items-center gap-3 shadow-2xl group transition-all"
                            >
                                <div className="p-2 rounded-xl bg-indigo-500/20 text-[#a6b1ff] group-hover:bg-indigo-500 transition-colors group-hover:text-white shadow-inner">
                                    <DaimondIcon size={18} />
                                </div>
                                <div className="flex flex-col items-start pr-2">
                                    <span className="text-[10px] font-black text-white/40 uppercase tracking-widest leading-none mb-1">XP Points</span>
                                    <span className="text-xl font-black text-white leading-none italic">{user?.xp || 0}</span>
                                </div>
                            </motion.button>
                        </Link>
                    </div>
                </div>

                {/* Decorative Bottom Banner Element */}
                <div className="mt-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Visual Flair Chips */}
            <div className="absolute right-[10%] top-[20%] opacity-20 hidden lg:block animate-pulse">
                <Sparkles className="text-[#ffb585]" size={32} />
            </div>
            <div className="absolute left-[5%] bottom-[10%] opacity-10 hidden lg:block rotate-12">
                <Star className="text-[#a6b1ff]" size={48} />
            </div>
        </div>
    );
}
