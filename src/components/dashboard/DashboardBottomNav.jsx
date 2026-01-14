import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, LayoutGrid, BarChart2, User, Play, ChevronRight, Settings, Users, FileText, Wallet, LogOut, MoreHorizontal, X, Zap } from 'lucide-react';
import QuizActionDrawer from './QuizActionDrawer';
import { selectCurrentUser, logout } from '@/redux/slices/authSlice';

const NavItem = ({ icon: Icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center gap-1 ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
    >
        <Icon size={24} className={isActive ? "fill-current" : ""} />
        <span className="text-[10px] font-medium">{label}</span>
    </button>
);

export default function DashboardBottomNav({ currentTab = 'Home', onLogout, onMoreToggle }) {
    const navigate = useNavigate();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
            <div className="w-full max-w-md bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/10 px-6 py-4 rounded-t-[2.5rem] shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)] flex items-end justify-between relative translate-y-[-1px]">

                <NavItem icon={Home} label="Home" isActive={currentTab === 'Home'} onClick={() => navigate('/dashboard')} />
                <NavItem icon={LayoutGrid} label="Groups" isActive={currentTab === 'groups'} onClick={() => navigate('/dashboard/groups')} />

                {/* Play Button - Floating centered with Unified Drawer */}
                <QuizActionDrawer>
                    <div className="relative -top-10 group cursor-pointer">
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                boxShadow: [
                                    "0 0 20px rgba(124,58,237,0.3)",
                                    "0 0 40px rgba(124,58,237,0.6)",
                                    "0 0 20px rgba(124,58,237,0.3)"
                                ]
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="w-20 h-20 rounded-full bg-gradient-to-br from-[#6366f1] via-[#8b5cf6] to-[#d946ef] flex items-center justify-center text-white p-1 relative z-20 shadow-[0_0_30px_rgba(139,92,246,0.5)]"
                        >
                            <div className="w-full h-full rounded-full bg-[#0a0a0a]/20 flex items-center justify-center backdrop-blur-sm border-2 border-white/20">
                                <Play size={36} fill="white" className="ml-1" />
                            </div>
                        </motion.div>
                        <span className="absolute -bottom-8 w-full text-center text-[10px] font-black text-[#a6b1ff] left-0 uppercase tracking-widest italic">Play</span>
                    </div>
                </QuizActionDrawer>

                <NavItem icon={BarChart2} label="Leaderboard" isActive={currentTab === 'Leaderboard'} onClick={() => navigate('/dashboard/leaderboard')} />
                <NavItem icon={MoreHorizontal} label="More" isActive={false} onClick={onMoreToggle} />
            </div>
        </div>
    );
}
