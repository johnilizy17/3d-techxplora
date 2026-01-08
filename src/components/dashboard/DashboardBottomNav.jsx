import React from 'react';
import { Home, LayoutGrid, BarChart2, User, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import AIChatWidget from './AIChatWidget';

import { useNavigate } from 'react-router-dom';

const NavItem = ({ icon: Icon, label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`flex flex-col items-center gap-1 ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'}`}
    >
        <Icon size={24} className={isActive ? "fill-current" : ""} />
        <span className="text-[10px] font-medium">{label}</span>
    </button>
);

export default function DashboardBottomNav({ currentTab = 'Home' }) {
    const navigate = useNavigate();

    return (
        <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center">
            <div className="w-full max-w-md bg-[#0a0a0a] border-t border-white/10 px-6 py-4 rounded-t-3xl shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.5)] flex items-end justify-between relative">

                <NavItem icon={Home} label="Home" isActive={currentTab === 'Home'} onClick={() => navigate('/dashboard')} />
                <NavItem icon={LayoutGrid} label="Groups" isActive={currentTab === 'groups'} onClick={() => navigate('/dashboard/groups')} />

                {/* Play Button - Floating centered */}
                <div className="relative -top-6">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-16 h-16 rounded-full bg-gradient-to-r from-[#5b21b6] to-[#7c3aed] flex items-center justify-center text-white shadow-[0_0_20px_rgba(124,58,237,0.5)] border-4 border-[#0a0a0a] relative z-20"
                    >
                        <Plus size={32} />
                    </motion.button>
                    <span className="absolute -bottom-6 w-full text-center text-[10px] font-medium text-white left-0">Play</span>
                </div>

                <NavItem icon={BarChart2} label="Leaderboard" isActive={currentTab === 'Leaderboard'} onClick={() => navigate('/dashboard/leaderboard')} />
                <NavItem icon={User} label="Profile" isActive={currentTab === 'Profile'} onClick={() => navigate('/dashboard/profile')} />

                {/* AI Chat Widget */}
                <AIChatWidget />
            </div>
        </div>
    );
}
