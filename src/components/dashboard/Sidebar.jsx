import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, LayoutGrid, BarChart2, User, Plus, LogOut, Settings } from 'lucide-react';
import { cn } from "@/lib/utils";

const SidebarItem = ({ icon: Icon, label, path, isActive }) => (
    <Link to={path}>
        <motion.div
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                "flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                isActive
                    ? "bg-gradient-to-r from-[#5b21b6]/20 to-transparent text-white border-l-4 border-[#7c3aed]"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
            )}
        >
            <Icon size={24} className={cn(
                "transition-colors duration-300",
                isActive ? "text-[#7c3aed] fill-[#7c3aed]/20" : "group-hover:text-gray-300"
            )} />
            <span className="font-bold tracking-wide uppercase text-xs">{label}</span>

            {isActive && (
                <motion.div
                    layoutId="activeGlow"
                    className="absolute inset-0 bg-[#7c3aed]/5 blur-xl -z-10"
                />
            )}
        </motion.div>
    </Link>
);

export default function Sidebar({ onLogout }) {
    const location = useLocation();
    const currentPath = location.pathname;

    return (
        <aside className="hidden lg:flex flex-col w-72 h-screen fixed left-0 top-0 bg-[#0a0a0a] border-r border-white/5 p-6 z-40 overflow-hidden">
            {/* Logo Section */}
            <div className="flex items-center gap-3 px-4 mb-12">
                <div className="w-10 h-10 bg-gradient-to-tr from-[#5b21b6] to-[#7c3aed] rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/20">
                    <span className="text-white font-black text-xl">T</span>
                </div>
                <div>
                    <h2 className="text-white font-black text-lg">TECHXPLORA</h2>
                    <span className="text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase">Play & Learn</span>
                </div>
            </div>

            {/* Navigation Sections */}
            <nav className="flex-1 space-y-2">
                <div className="px-5 mb-4">
                    <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">Menu</span>
                </div>

                <SidebarItem icon={Home} label="Dashboard" path="/dashboard" isActive={currentPath === '/dashboard'} />
                <SidebarItem icon={LayoutGrid} label="My Groups" path="/dashboard/groups" isActive={currentPath === '/dashboard/groups'} />
                <SidebarItem icon={BarChart2} label="Leaderboard" path="/dashboard/leaderboard" isActive={currentPath === '/dashboard/leaderboard'} />
                <SidebarItem icon={User} label="Profile" path="/dashboard/profile" isActive={currentPath === '/dashboard/profile'} />
                <SidebarItem icon={Settings} label="Settings" path="/dashboard/options" isActive={currentPath === '/dashboard/options'} />
            </nav>

            {/* Footer Actions */}
            <div className="mt-auto space-y-4">
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-14 bg-gradient-to-r from-[#5b21b6] to-[#7c3aed] rounded-2xl flex items-center justify-center gap-3 text-white font-black uppercase tracking-widest text-sm shadow-lg shadow-purple-900/30 group relative overflow-hidden"
                >
                    <Plus size={20} />
                    Create Quiz
                    <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                </motion.button>

                <button
                    onClick={onLogout}
                    className="w-full flex items-center gap-4 px-6 py-4 text-gray-500 hover:text-red-400 transition-colors group"
                >
                    <LogOut size={20} className="group-hover:rotate-12 transition-transform" />
                    <span className="font-bold text-xs uppercase tracking-widest">Logout</span>
                </button>
            </div>

            {/* Background Decorative Element */}
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-900/10 blur-[100px] rounded-full -z-10" />
        </aside>
    );
}
