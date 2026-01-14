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
    BookOpen
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
                color: "bg-blue-500/20 text-blue-400",
                gradient: "from-blue-500/10 to-transparent"
            },
            {
                label: "Manage Quizzes",
                subtitle: "View and edit existing work",
                icon: List,
                path: "/dashboard/quizzes",
                color: "bg-purple-500/20 text-purple-400",
                gradient: "from-purple-500/10 to-transparent"
            },
        ]
    } : {
        title: "Player Lounge",
        description: "Join a challenge or explore your history",
        options: [
            {
                label: "Join with Code",
                subtitle: "Enter a specific quiz code",
                icon: UserPlus,
                path: "/dashboard/quizzes?join=true",
                color: "bg-emerald-500/20 text-emerald-400",
                gradient: "from-emerald-500/10 to-transparent"
            },
            {
                label: "Explore All Quizzes",
                subtitle: "See what's available for you",
                icon: BookOpen,
                path: "/dashboard/quizzes",
                color: "bg-indigo-500/20 text-indigo-400",
                gradient: "from-indigo-500/10 to-transparent"
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
            <DrawerContent className="bg-[#0a0a0a] border-white/10 text-white pb-10 rounded-t-[3rem] outline-none">
                <div className="mx-auto w-12 h-1.5 bg-white/10 rounded-full mt-4 mb-2" />

                <DrawerHeader className="relative overflow-hidden">
                    <div className="absolute top-0 right-10 opacity-10 blur-xl">
                        <Sparkles size={100} className="text-purple-500" />
                    </div>
                    <DrawerTitle className="text-3xl font-black italic uppercase tracking-tight text-center bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        {config.title}
                    </DrawerTitle>
                    <DrawerDescription className="text-gray-400 text-center uppercase text-[10px] tracking-[0.25em] font-black mt-1">
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
                            className={`flex items-center justify-between p-6 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:bg-white/[0.08] hover:border-[#a6b1ff]/30 transition-all cursor-pointer group relative overflow-hidden bg-gradient-to-r ${option.gradient}`}
                        >
                            <div className="flex items-center gap-5 relative z-10">
                                <div className={`p-4 rounded-2xl ${option.color} group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                                    <option.icon size={28} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xl font-black italic uppercase tracking-tight leading-none group-hover:text-white transition-colors">
                                        {option.label}
                                    </span>
                                    <span className="text-xs font-bold text-white/40 uppercase tracking-widest mt-1">
                                        {option.subtitle}
                                    </span>
                                </div>
                            </div>
                            <div className="p-2 rounded-full bg-white/5 group-hover:bg-[#a6b1ff]/20 transition-colors relative z-10">
                                <ChevronRight className="text-gray-500 group-hover:text-white transition-colors" size={20} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="px-10 mt-10 grid grid-cols-2 gap-4 opacity-30">
                    <div className="flex items-center gap-2 justify-center py-2 border border-white/5 rounded-2xl">
                        <Trophy size={14} className="text-amber-400" />
                        <span className="text-[10px] font-black uppercase tracking-tighter italic">Earn XP</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center py-2 border border-white/5 rounded-2xl">
                        <Gamepad2 size={14} className="text-rose-400" />
                        <span className="text-[10px] font-black uppercase tracking-tighter italic">Hunt Items</span>
                    </div>
                </div>

                <DrawerFooter className="mt-10 flex flex-row gap-4 px-6">
                    <DrawerClose asChild>
                        <Button variant="outline" className="flex-1 h-14 rounded-2xl border-white/10 bg-white/5 text-white hover:bg-white/10 font-black uppercase tracking-widest text-[10px] italic">
                            Close
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
