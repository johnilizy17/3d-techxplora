import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    User, Settings, Users, FileText, Wallet,
    LogOut, X, Zap, ChevronRight, Play, BookOpen, Home, Wrench, GraduationCap, HelpCircle
} from 'lucide-react';
import { selectCurrentUser, logout, updateUser } from '@/redux/slices/authSlice';
import { useGetStudentProfileQuery } from '@/redux/api/studentApi';
import { useGetTeacherProfileQuery } from '@/redux/api/teacherApi';
import { useGetXpHistoryMutation } from '@/redux/api/authApi';

export default function MoreMenuDrawer({ isOpen, onClose, onLogoutTrigger }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const [getXpHistory] = useGetXpHistoryMutation();

    const isStudent = user?.accountable_type === "App\\Models\\Student" || user?.role === 'student';

    // Fetch fresh profile data and XP history when drawer is open
    const { data: studentProfile } = useGetStudentProfileQuery(undefined, {
        skip: !isOpen || !isStudent
    });

    const { data: teacherProfile } = useGetTeacherProfileQuery(user?.id, {
        skip: !isOpen || isStudent || !user?.id
    });

    useEffect(() => {
        if (isOpen && user?.id) {
            getXpHistory({ sender_id: user.id, account_id: user.id });
        }
    }, [isOpen, user?.id, getXpHistory]);

    const currentProfile = isStudent ? studentProfile : teacherProfile;
    // Handle potential nested data structure (e.g., response.data.xp)
    const fetchedXp = currentProfile?.data?.xp !== undefined ? currentProfile.data.xp : currentProfile?.xp;
    const xpBalance = fetchedXp !== undefined ? fetchedXp : user?.xp;

    // Sync XP with Redux state if it changes from API
    useEffect(() => {
        if (fetchedXp !== undefined && fetchedXp !== user?.xp) {
            dispatch(updateUser({ xp: fetchedXp }));
        }
    }, [fetchedXp, user?.xp, dispatch]);

    const isAdmin = user?.is_admin || user?.role === 'admin';
    const isTeacher = user?.role === 'teacher' || user?.accountable_type === "App\\Models\\Teacher";

    const menuItems = [
        { icon: Home, label: "Home", path: "/", show: true },
        { icon: User, label: "Profile", path: "/dashboard/profile", show: true },
        { icon: Users, label: "All Teacher", path: "/dashboard/teachers", show: isAdmin },
        { icon: Play, label: "Courses", path: isStudent ? "/courses" : "/dashboard/courses", show: true },
        { icon: HelpCircle, label: "Quiz", path: "/dashboard/quizzes", show: true },
        { icon: GraduationCap, label: "Nigeria Curriculum", path: "/dashboard/nigeria-curriculum", show: true },
        { icon: Wrench, label: "Toolkit", path: "/dashboard/toolkit", show: true },
        { icon: BookOpen, label: "Docs", path: "/docs", show: true },
        { icon: FileText, label: "Syllabus", path: "/dashboard/syllabus", show: isTeacher },
        { icon: Wallet, label: "Wallet", path: "/dashboard/wallet", show: true },
    ];

    const handleSignOut = () => {
        onClose();
        if (onLogoutTrigger) {
            onLogoutTrigger();
        } else {
            dispatch(logout());
            navigate('/auth/login');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md z-[100]"
                    />

                    {/* Drawer / Modal Container */}
                    <div className="fixed inset-0 z-[101] flex items-end lg:items-center justify-center pointer-events-none p-0 lg:p-6">
                        <motion.div
                            initial={window.innerWidth >= 1024 ? { scale: 0.95, opacity: 0, y: 20 } : { y: "100%" }}
                            animate={window.innerWidth >= 1024 ? { scale: 1, opacity: 1, y: 0 } : { y: 0 }}
                            exit={window.innerWidth >= 1024 ? { scale: 0.95, opacity: 0, y: 20 } : { y: "100%" }}
                            transition={{ type: "spring", damping: 30, stiffness: 300 }}
                            className="w-full max-w-lg lg:max-w-2xl bg-background/95 backdrop-blur-3xl rounded-t-[2.5rem] lg:rounded-[3rem] border-t lg:border border-border shadow-2xl pointer-events-auto relative overflow-hidden flex flex-col max-h-[90vh] lg:max-h-[85vh]"
                        >
                            {/* Premium Decorative Glows */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#7c3aed]/10 rounded-full blur-[100px] -z-10" />
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#a6b1ff]/10 rounded-full blur-[100px] -z-10" />

                            {/* Sticky Header - Fixed at Top */}
                            <div className="sticky top-0 z-20 p-8 lg:p-10 pb-6 bg-background/80 backdrop-blur-xl border-b border-border">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-2xl lg:rounded-3xl bg-gradient-to-tr from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-xl shadow-indigo-500/20 group">
                                            <Zap size={28} className="text-white fill-current group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                                <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] italic">Current Wallet</p>
                                            </div>
                                            <h3 className="text-3xl lg:text-4xl font-black text-foreground italic tracking-tighter flex items-baseline gap-2">
                                                {xpBalance?.toLocaleString() || "0"}
                                                <span className="text-lg lg:text-xl text-[#a6b1ff] not-italic font-black tracking-normal">XP</span>
                                            </h3>
                                        </div>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-4 rounded-2xl bg-accent hover:bg-accent/80 text-muted-foreground hover:text-foreground transition-all group"
                                    >
                                        <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
                                    </button>
                                </div>
                            </div>

                            {/* Scrollable Content */}
                            <div className="flex-1 overflow-y-auto custom-scrollbar p-8 lg:p-10 pt-4 lg:pt-6 pb-12 lg:pb-10">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                    {menuItems.filter(item => item.show).map((item, index) => (
                                        <motion.button
                                            key={item.label}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            onClick={() => {
                                                navigate(item.path);
                                                onClose();
                                            }}
                                            className="w-full flex items-center justify-between p-5 lg:p-6 rounded-[1.5rem] lg:rounded-[2rem] bg-accent/50 hover:bg-accent border border-border hover:border-[#a6b1ff]/30 group transition-all duration-300 relative overflow-hidden"
                                        >
                                            <div className="flex items-center gap-5">
                                                <div className="p-3 lg:p-3.5 rounded-xl lg:rounded-2xl bg-accent group-hover:bg-[#a6b1ff]/20 text-foreground group-hover:text-[#a6b1ff] transition-all duration-300">
                                                    <item.icon size={22} />
                                                </div>
                                                <span className="font-bold text-lg text-foreground/80 group-hover:text-foreground transition-colors">{item.label}</span>
                                            </div>
                                            <ChevronRight size={20} className="text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />

                                            {/* Subtle hover line */}
                                            <div className="absolute bottom-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#8b5cf6]/40 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                                        </motion.button>
                                    ))}

                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: menuItems.length * 0.05 }}
                                        onClick={handleSignOut}
                                        className="w-full lg:col-span-2 flex items-center justify-between p-5 lg:p-6 rounded-[1.5rem] lg:rounded-[2rem] bg-red-500/5 hover:bg-red-500/10 border border-red-500/5 hover:border-red-500/10 group transition-all mt-4 relative overflow-hidden"
                                    >
                                        <div className="flex items-center gap-5">
                                            <div className="p-3 lg:p-3.5 rounded-xl lg:rounded-2xl bg-red-500/10 text-red-400 group-hover:scale-110 transition-transform">
                                                <LogOut size={22} />
                                            </div>
                                            <div>
                                                <span className="font-bold text-lg text-red-400 block">Sign Out</span>
                                                <span className="text-[10px] text-red-400/50 uppercase font-bold tracking-widest group-hover:text-red-400/80 transition-colors">Terminate Session</span>
                                            </div>
                                        </div>
                                        <div className="w-10 h-10 rounded-full border border-red-500/20 flex items-center justify-center group-hover:bg-red-500/20 transition-all">
                                            <ChevronRight size={20} className="text-red-400" />
                                        </div>
                                    </motion.button>
                                </div>
                            </div>

                            <style dangerouslySetInnerHTML={{
                                __html: `
                                .custom-scrollbar::-webkit-scrollbar {
                                    width: 6px;
                                }
                                .custom-scrollbar::-webkit-scrollbar-track {
                                    background: transparent;
                                }
                                .custom-scrollbar::-webkit-scrollbar-thumb {
                                    background: rgba(0, 0, 0, 0.1);
                                    border-radius: 20px;
                                }
                                .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                                    background: rgba(255, 255, 255, 0.05);
                                }
                                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                    background: rgba(0, 0, 0, 0.2);
                                }
                                .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                                    background: rgba(255, 255, 255, 0.1);
                                }
                            `}} />
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
