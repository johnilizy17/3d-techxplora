import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    Play,
    PlusCircle,
    List,
    UserPlus,
    ChevronRight,
    Sparkles,
    Trophy,
    Gamepad2,
    BookOpen,
    Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { selectCurrentUser } from '@/redux/slices/authSlice';
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
import { Button } from "@/components/ui/button";

export default function QuizActionDrawer({ children }) {
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const [open, setOpen] = useState(false);

    const isTeacher = user?.accountable_type === "App\\Models\\Teacher" || user?.role === 'teacher';
    const isAdmin = user?.is_admin || user?.role === 'admin';

    // Role-based content configuration
    const config = (isTeacher || isAdmin) ? {
        title: "Creator Hub",
        description: "Build and manage your learning challenges",
        options: [
            {
                label: "Create New Quiz",
                subtitle: "Design a fresh challenge",
                icon: PlusCircle,
                path: "/dashboard/teacher/quizzes",
                color: "bg-blue-200 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400",
                gradient: "from-blue-100/50 dark:from-blue-500/10 to-transparent",
                borderColor: "border-blue-300 dark:border-blue-500/20"
            },
            {
                label: "Manage Quizzes",
                subtitle: "View and edit existing work",
                icon: List,
                path: "/dashboard/quizzes",
                color: "bg-purple-200 dark:bg-purple-500/20 text-purple-700 dark:text-purple-400",
                gradient: "from-purple-100/50 dark:from-purple-500/10 to-transparent",
                borderColor: "border-purple-300 dark:border-purple-500/20"
            },
            {
                label: "Create New Course",
                subtitle: "Launch a learning path",
                icon: BookOpen,
                path: "/dashboard/courses/create",
                color: "bg-emerald-200 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400",
                gradient: "from-emerald-100/50 dark:from-emerald-500/10 to-transparent",
                borderColor: "border-emerald-300 dark:border-emerald-500/20"
            },
            {
                label: "Manage Courses",
                subtitle: "Manage your academy",
                icon: Trophy,
                path: "/dashboard/courses",
                color: "bg-amber-200 dark:bg-amber-500/20 text-amber-700 dark:text-amber-400",
                gradient: "from-amber-100/50 dark:from-amber-500/10 to-transparent",
                borderColor: "border-amber-300 dark:border-amber-500/20"
            },
        ]
    } : {
        title: "Player Lounge",
        description: "Join a challenge or explore your history",
        options: [
            {
                label: "Join Quiz",
                subtitle: "Enter a quiz code",
                icon: UserPlus,
                path: "/dashboard/quizzes/join",
                color: "bg-emerald-200 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400",
                gradient: "from-emerald-100/50 dark:from-emerald-500/10 to-transparent",
                borderColor: "border-emerald-300 dark:border-emerald-500/20"
            },
            {
                label: "Join Group",
                subtitle: "Enter a group code",
                icon: Users,
                path: "/dashboard/groups/join",
                color: "bg-blue-200 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400",
                gradient: "from-blue-100/50 dark:from-blue-500/10 to-transparent",
                borderColor: "border-blue-300 dark:border-blue-500/20"
            },
            {
                label: "All Quizzes",
                subtitle: "See what's available",
                icon: BookOpen,
                path: "/dashboard/quizzes",
                color: "bg-indigo-200 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400",
                gradient: "from-indigo-100/50 dark:from-indigo-500/10 to-transparent",
                borderColor: "border-indigo-300 dark:border-indigo-500/20"
            },
        ]
    };

    const handleAction = (path) => {
        setOpen(false);
        navigate(path);
    };

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                {children}
            </DrawerTrigger>
            <DrawerContent className="bg-white dark:bg-[#0a0a0a] border-t-2 border-indigo-200 dark:border-white/10 text-gray-900 dark:text-white pb-10 rounded-t-[3rem] outline-none max-h-[90vh] flex flex-col shadow-2xl">
                <div className="mx-auto w-12 h-1.5 bg-gray-300 dark:bg-white/10 rounded-full mt-4 mb-2 shrink-0" />

                <div className="flex-1 overflow-y-auto custom-scrollbar px-6">

                    <DrawerHeader className="relative overflow-hidden">
                        <div className="absolute top-0 right-10 opacity-5 dark:opacity-10 blur-xl">
                            <Sparkles size={100} className="text-purple-500" />
                        </div>
                        <DrawerTitle className="text-3xl font-black italic uppercase tracking-tight text-center bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-white dark:to-white/60 bg-clip-text text-transparent">
                            {config.title}
                        </DrawerTitle>
                        <DrawerDescription className="text-gray-600 dark:text-gray-400 text-center uppercase text-[10px] tracking-[0.25em] font-black mt-1">
                            {config.description}
                        </DrawerDescription>
                    </DrawerHeader>

                    <div className="px-6 space-y-4 mt-8">
                        {config.options.map((option, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                onClick={() => handleAction(option.path)}
                                className={`flex items-center justify-between p-6 rounded-[2.5rem] bg-white dark:bg-white/[0.03] border-2 ${option.borderColor} dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/[0.08] hover:border-indigo-400 dark:hover:border-[#a6b1ff]/30 transition-all cursor-pointer group relative overflow-hidden bg-gradient-to-r ${option.gradient} shadow-sm hover:shadow-md`}
                            >
                                <div className="flex items-center gap-5 relative z-10">
                                    <div className={`p-4 rounded-2xl ${option.color} group-hover:scale-110 transition-transform duration-500 shadow-md border-2 ${option.borderColor}`}>
                                        <option.icon size={28} />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xl font-black italic uppercase tracking-tight leading-none text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-white transition-colors">
                                            {option.label}
                                        </span>
                                        <span className="text-xs font-bold text-gray-600 dark:text-white/40 uppercase tracking-widest mt-1">
                                            {option.subtitle}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-2 rounded-full bg-gray-100 dark:bg-white/5 group-hover:bg-indigo-200 dark:group-hover:bg-[#a6b1ff]/20 transition-colors relative z-10">
                                    <ChevronRight className="text-gray-600 dark:text-gray-500 group-hover:text-indigo-600 dark:group-hover:text-white transition-colors" size={20} />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="px-10 mt-10 grid grid-cols-2 gap-4 opacity-40 dark:opacity-30">
                        <div className="flex items-center gap-2 justify-center py-2 border-2 border-amber-200 dark:border-white/5 rounded-2xl bg-amber-50 dark:bg-transparent">
                            <Trophy size={14} className="text-amber-600 dark:text-amber-400" />
                            <span className="text-[10px] font-black uppercase tracking-tighter italic text-amber-700 dark:text-white">Earn Points</span>
                        </div>
                        <div className="flex items-center gap-2 justify-center py-2 border-2 border-rose-200 dark:border-white/5 rounded-2xl bg-rose-50 dark:bg-transparent">
                            <Gamepad2 size={14} className="text-rose-600 dark:text-rose-400" />
                            <span className="text-[10px] font-black uppercase tracking-tighter italic text-rose-700 dark:text-white">Play Games</span>
                        </div>
                    </div>

                </div>

                <DrawerFooter className="mt-10 flex flex-row gap-4 px-6 shrink-0">
                    <DrawerClose asChild>
                        <Button variant="outline" className="flex-1 h-14 rounded-2xl border-2 border-gray-300 dark:border-white/10 bg-gray-100 dark:bg-white/5 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/10 font-black uppercase tracking-widest text-[10px] italic shadow-sm">
                            Close
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
                <style dangerouslySetInnerHTML={{
                    __html: `
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 4px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: rgba(255, 255, 255, 0.1);
                        border-radius: 20px;
                    }
                `}} />
            </DrawerContent>
        </Drawer>
    );
}
