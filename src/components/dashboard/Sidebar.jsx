import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, LayoutGrid, BarChart2, User, Play, LogOut, Settings, Plus, MoreHorizontal } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import QuizActionDrawer from './QuizActionDrawer';

const SidebarItem = ({ icon: Icon, label, path, isActive }) => (
    <Link to={path}>
        <motion.div
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                isActive
                    ? "bg-gradient-to-r from-indigo-100 to-purple-50 dark:from-[#5b21b6]/20 dark:to-transparent text-indigo-700 dark:text-foreground border-l-4 border-indigo-600 dark:border-[#7c3aed] shadow-sm"
                    : "text-gray-600 dark:text-muted-foreground hover:text-indigo-700 dark:hover:text-foreground hover:bg-indigo-50 dark:hover:bg-accent"
            )}
        >
            <Icon size={24} className={cn(
                "transition-colors duration-300",
                isActive ? "text-indigo-600 dark:text-[#7c3aed] fill-indigo-100 dark:fill-[#7c3aed]/20" : "group-hover:text-indigo-700 dark:group-hover:text-foreground"
            )} />
            <span className="font-bold tracking-wide uppercase text-xs">{label}</span>

            {isActive && (
                <motion.div
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-indigo-200/20 dark:bg-[#7c3aed]/5 blur-xl -z-10"
                />
            )}
        </motion.div>
    </Link>
);

export default function Sidebar({ onLogout, onMoreToggle }) {
    const location = useLocation();
    const currentPath = location.pathname;
    const user = useSelector(selectCurrentUser);
    const isStudent = user?.accountable_type === "App\\Models\\Student" || user?.role === 'student';

    return (
        <aside className="hidden lg:flex flex-col w-72 h-screen fixed left-0 top-0 bg-white dark:bg-background border-r-2 border-indigo-200 dark:border-border p-6 z-40 overflow-hidden transition-colors duration-300 shadow-lg dark:shadow-none">
            {/* Logo Section */}
            <div className="flex items-center gap-3 px-4 mb-12">
                <img src="/favicon.ico" alt="Logo" className="w-8" />

                <div>
                    <h2 className="text-gray-900 dark:text-foreground font-black text-lg">TECHXPLORA</h2>
                    <span className="text-[10px] text-indigo-600 dark:text-muted-foreground font-bold tracking-[0.2em] uppercase">Play & Learn</span>
                </div>
            </div>

            {/* Navigation Sections */}
            <nav className="flex-1 space-y-2">
                <div className="px-5 mb-4">
                    <span className="text-[10px] font-black text-gray-500 dark:text-muted-foreground uppercase tracking-[0.3em]">Menu</span>
                </div>

                <SidebarItem icon={Home} label="Dashboard" path="/dashboard" isActive={currentPath === '/dashboard'} />
                <SidebarItem icon={LayoutGrid} label="My Groups" path="/dashboard/groups" isActive={currentPath === '/dashboard/groups'} />
                <SidebarItem icon={BarChart2} label="Leaderboard" path="/dashboard/leaderboard" isActive={currentPath === '/dashboard/leaderboard'} />
                <SidebarItem icon={User} label="Profile" path="/dashboard/profile" isActive={currentPath === '/dashboard/profile'} />

                <button
                    onClick={onMoreToggle}
                    className={cn(
                        "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                        "bg-gradient-to-r from-amber-100 to-orange-100 dark:bg-transparent text-amber-900 dark:text-muted-foreground hover:from-amber-200 hover:to-orange-200 dark:hover:text-foreground dark:hover:bg-accent border-2 border-amber-300 dark:border-transparent shadow-sm hover:shadow-md"
                    )}
                >
                    <MoreHorizontal size={24} className="text-amber-700 dark:text-muted-foreground group-hover:text-amber-900 dark:group-hover:text-foreground transition-colors" />
                    <span className="font-bold tracking-wide uppercase text-xs">More</span>
                </button>
            </nav>

            {/* Footer Actions */}
            <div className="mt-auto space-y-4">
                <QuizActionDrawer>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full h-14 bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 dark:from-[#5b21b6] dark:to-[#7c3aed] rounded-2xl flex items-center justify-center gap-3 text-white font-black uppercase tracking-widest text-sm shadow-lg shadow-indigo-500/30 dark:shadow-purple-900/30 group relative overflow-hidden hover:from-indigo-600 hover:via-purple-700 hover:to-pink-600 dark:hover:from-[#6d28d9] dark:hover:to-[#8b5cf6] transition-all duration-300"
                    >
                        <span className="relative z-10 flex items-center gap-3">
                            {isStudent ? <Play size={20} fill="white" /> : <Plus size={20} />}
                            {isStudent ? "Play" : "Create"}
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    </motion.button>
                </QuizActionDrawer>

                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-4 px-6 py-4 text-gray-600 dark:text-muted-foreground hover:text-red-500 dark:hover:text-red-400 transition-colors group"
                >
                    <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
                    <span className="font-bold text-xs uppercase tracking-widest">Logout</span>
                </button>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-indigo-200/20 dark:bg-purple-900/10 blur-[100px] rounded-full -z-10" />
        </aside>
    );
}
