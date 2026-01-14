import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Crown, Timer, Filter, Search, ArrowUp, ArrowDown, User, Sparkles } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import { useGetGlobalLeaderboardQuery, useGetAdminLeaderboardQuery } from '@/redux/api/leaderboardApi';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EmptyState from '@/components/dashboard/EmptyState';

export default function Leaderboard() {
    const user = useSelector(selectCurrentUser);
    const isAdmin = user?.is_admin || user?.role === 'admin' || user?.accountable_type === "App\\Models\\Teacher";
    const [searchQuery, setSearchQuery] = useState('');

    const { data: globalData, isLoading: isGlobalLoading } = useGetGlobalLeaderboardQuery(undefined, {
        skip: isAdmin
    });

    const { data: adminData, isLoading: isAdminLoading } = useGetAdminLeaderboardQuery(user?.admin_code, {
        skip: !isAdmin || !user?.admin_code
    });

    const isLoading = isAdmin ? isAdminLoading : isGlobalLoading;
    const rawData = isAdmin ? adminData : globalData;

    // Map API data to our UI structure
    const leaderboardData = (rawData || []).map((item, index) => {
        // The API might return the student object nested or fields directly
        const student = item.student || item;
        return {
            id: item.id || student.id || index + 1,
            name: `${student.first_name || ''} ${student.last_name || ''}`.trim() || student.name || "Unknown Xplora",
            xp: student.xp || 0,
            rank: index + 1,
            avatar: student.photo || student.avatar || null,
            trend: item.trend || 'same',
            level: Math.floor((student.xp || 0) / 1000) + 1, // Simple level calculation if not provided
            role: student.role || (item.student ? 'student' : 'user')
        };
    });

    const filteredData = leaderboardData.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const topThree = filteredData.slice(0, 3);
    const others = filteredData.slice(3);

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24 lg:pb-10">
                <div className="w-full relative px-6 lg:px-10">

                    {/* Modern & User-Friendly Header */}
                    <header className="pt-10 pb-8 relative">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-white/5">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0a0a0a] bg-white/10 backdrop-blur-sm overflow-hidden">
                                                <User size={12} className="text-white/40 m-auto mt-1" />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-bold text-[#a6b1ff] uppercase tracking-widest">Global Rankings</span>
                                </div>
                                <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight uppercase italic leading-none">
                                    The <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a6b1ff] to-white">Top 20</span>
                                </h1>
                                <p className="text-sm font-medium text-white/40 max-w-md">
                                    Track the world's most active Xploras and their journey through the Quiz.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4">

                                {/* Search Bar - Sleek & Integrated */}
                                <div className="relative w-full sm:w-64 group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[#a6b1ff] transition-colors" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Find an Xplora..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full h-11 pl-11 pr-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:border-[#a6b1ff]/30 focus:bg-white/10 transition-all text-sm font-medium"
                                    />
                                </div>
                            </div>
                        </div>
                    </header>

                    {isLoading ? (
                        <div className="py-24 flex flex-col items-center justify-center gap-4">
                            <div className="relative w-16 h-16">
                                <div className="absolute inset-0 rounded-full border-4 border-[#a6b1ff]/20"></div>
                                <div className="absolute inset-0 rounded-full border-t-4 border-[#a6b1ff] animate-spin"></div>
                            </div>
                            <p className="text-[#a6b1ff] font-black uppercase tracking-widest animate-pulse">Gathering Xploras...</p>
                        </div>
                    ) : (
                        <>
                            {/* 3D Podium Section */}
                            <div className="relative mb-16 lg:mb-24">
                                <div className="flex flex-row items-end justify-center gap-2 sm:gap-6 lg:gap-12 pt-12">
                                    {/* Rank 2 (Silver) */}
                                    {topThree[1] && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2, duration: 0.8 }}
                                            className="relative flex flex-col items-center"
                                        >
                                            <AvatarBadge user={topThree[1]} color="#e2e8f0" size="lg" />
                                            <div className="w-24 sm:w-32 lg:w-40 h-32 sm:h-40 lg:h-48 mt-4 relative group">
                                                <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-[#718096]/40 to-[#2d3748]/80 backdrop-blur-xl border-t border-x border-white/20 rounded-t-3xl shadow-2xl skew-x-[-10deg] transform origin-bottom transition-transform group-hover:scale-105" />
                                                <div className="absolute inset-0 flex flex-col items-center justify-center -skew-x-[-10deg]">
                                                    <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#e2e8f0]/30 italic leading-none">2</span>
                                                    <div className="mt-2 text-center">
                                                        <p className="text-[10px] sm:text-xs font-black text-white/90 uppercase tracking-tighter truncate w-20 sm:w-28">{topThree[1].name}</p>
                                                        <p className="text-[8px] sm:text-[10px] font-bold text-[#e2e8f0] uppercase italic">{topThree[1].xp} XP</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Rank 1 (Gold) */}
                                    {topThree[0] && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 70 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.8 }}
                                            className="relative flex flex-col items-center z-20 -mb-4 focus-within:z-30"
                                        >
                                            <div className="absolute -top-12 left-1/2 -translate-x-1/2">
                                                <motion.div
                                                    animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0] }}
                                                    transition={{ duration: 4, repeat: Infinity }}
                                                >
                                                    <Crown className="text-[#fbbf24] w-12 h-12 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" fill="#fbbf24" />
                                                </motion.div>
                                            </div>
                                            <AvatarBadge user={topThree[0]} color="#fbbf24" size="xl" isWinner />
                                            <div className="w-28 sm:w-36 lg:w-48 h-40 sm:h-52 lg:h-64 mt-4 relative group">
                                                <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-[#fbbf24]/40 to-[#d97706]/80 backdrop-blur-2xl border-t border-x border-white/30 rounded-t-3xl shadow-[0_0_50px_rgba(251,191,36,0.2)] transition-transform group-hover:scale-105" />
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span className="text-6xl sm:text-7xl lg:text-8xl font-black text-[#fbbf24]/30 italic leading-none">1</span>
                                                    <div className="mt-2 text-center">
                                                        <p className="text-xs sm:text-sm font-black text-white uppercase tracking-tighter italic truncate w-24 sm:w-32">{topThree[0].name}</p>
                                                        <p className="text-xs font-black text-[#fbbf24] uppercase italic drop-shadow-md">{topThree[0].xp} XP</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Rank 3 (Bronze) */}
                                    {topThree[2] && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 40 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3, duration: 0.8 }}
                                            className="relative flex flex-col items-center"
                                        >
                                            <AvatarBadge user={topThree[2]} color="#b45309" size="lg" />
                                            <div className="w-24 sm:w-32 lg:w-40 h-28 sm:h-36 lg:h-44 mt-4 relative group">
                                                <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-[#b45309]/40 to-[#78350f]/80 backdrop-blur-xl border-t border-x border-white/20 rounded-t-3xl shadow-2xl skew-x-[10deg] transform origin-bottom transition-transform group-hover:scale-105" />
                                                <div className="absolute inset-0 flex flex-col items-center justify-center -skew-x-[10deg]">
                                                    <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#b45309]/30 italic leading-none">3</span>
                                                    <div className="mt-2 text-center">
                                                        <p className="text-[10px] sm:text-xs font-black text-white/90 uppercase tracking-tighter truncate w-20 sm:w-28">{topThree[2].name}</p>
                                                        <p className="text-[8px] sm:text-[10px] font-bold text-[#b45309] uppercase italic">{topThree[2].xp} XP</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                                {/* Shadow Floor */}
                                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-8 bg-black/40 blur-2xl rounded-full -z-10" />
                            </div>

                            {/* Rankings List Section */}
                            <div className="max-w-4xl mx-auto space-y-3 relative">
                                <div className="flex items-center justify-between mb-8 px-2">
                                    <div className="flex items-center gap-4">
                                        <div className="w-8 h-px bg-gradient-to-r from-[#a6b1ff] to-transparent" />
                                        <h3 className="text-xs font-black text-white/60 uppercase tracking-[0.3em] italic">Full Standings</h3>
                                    </div>
                                    {searchQuery && (
                                        <p className="text-[10px] font-bold text-[#a6b1ff] uppercase tracking-widest italic">
                                            Found {filteredData.length} Results
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center px-8 py-2 text-[10px] font-black text-white/30 uppercase tracking-[0.2em] italic">
                                    <span className="w-12 text-center">Rank</span>
                                    <span className="flex-1 ml-4 text-left">Xplora</span>
                                    <span className="hidden sm:block w-32 text-center">Level</span>
                                    <span className="w-24 text-right">XP Total</span>
                                </div>

                                <AnimatePresence mode="popLayout">
                                    {others.length > 0 ? (
                                        others.map((item, index) => (
                                            <motion.div
                                                key={item.id}
                                                layout
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ delay: index * 0.05 }}
                                                className={`group flex items-center px-6 sm:px-8 py-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/5 hover:border-[#a6b1ff]/30 hover:bg-white/10 transition-all cursor-pointer relative overflow-hidden ${user?.id === item.id ? 'ring-2 ring-inset ring-[#a6b1ff]/50 bg-[#a6b1ff]/5' : ''
                                                    }`}
                                            >
                                                {user?.id === item.id && (
                                                    <div className="absolute inset-y-0 left-0 w-1.5 bg-[#a6b1ff] shadow-[0_0_15px_rgba(166,177,255,0.5)]" />
                                                )}

                                                {/* Rank */}
                                                <div className="w-12 flex justify-center">
                                                    <span className={`text-lg font-black italic tracking-tighter ${item.rank <= 3 ? 'text-[#a6b1ff]' : 'text-white/40 group-hover:text-white/80'}`}>
                                                        #{item.rank}
                                                    </span>
                                                </div>

                                                {/* Profile */}
                                                <div className="flex-1 ml-4 flex items-center gap-4 min-w-0">
                                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-white/10 to-white/20 border border-white/10 flex items-center justify-center relative overflow-hidden shrink-0">
                                                        <User size={20} className="text-white/40" />
                                                        {item.avatar && <img src={item.avatar} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />}
                                                    </div>
                                                    <div className="truncate">
                                                        <h4 className="text-sm font-black text-white uppercase italic tracking-tight group-hover:text-[#a6b1ff] transition-colors truncate">
                                                            {item.name} {user?.id === item.id && "(YOU)"}
                                                        </h4>
                                                        <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest leading-none mt-0.5">
                                                            {item.role}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Level */}
                                                <div className="hidden sm:flex w-32 justify-center items-center gap-2">
                                                    <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-[#a6b1ff] to-white/20"
                                                            style={{ width: `${(item.level % 10) * 10}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-[10px] font-black text-white/60 uppercase">Lv.{item.level}</span>
                                                </div>

                                                {/* Points */}
                                                <div className="w-24 text-right flex flex-col items-end">
                                                    <span className="text-sm sm:text-lg font-black text-white italic tracking-tighter">
                                                        {item.xp.toLocaleString()}
                                                    </span>
                                                    <div className="flex items-center gap-1">
                                                        {item.trend === 'up' && <ArrowUp size={10} className="text-emerald-500" />}
                                                        {item.trend === 'down' && <ArrowDown size={10} className="text-rose-500" />}
                                                        <span className={`text-[8px] font-black uppercase italic ${item.trend === 'up' ? 'text-emerald-500' :
                                                            item.trend === 'down' ? 'text-rose-500' : 'text-white/20'
                                                            }`}>
                                                            {item.trend === 'same' ? 'Stable' : item.trend}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="py-12">
                                            <EmptyState title="Xplora Not Found" description="Try searching for a different name or clear the search." />
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Footer / Disclaimer */}
                            <p className="mt-12 text-center text-white/20 text-[10px] font-bold uppercase tracking-[0.3em] pb-10">
                                Rankings are updated in real-time based on XP earnings
                            </p>
                        </>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
}

const AvatarBadge = ({ user, color, size, isWinner }) => {
    const sizeClasses = {
        lg: "w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24",
        xl: "w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32"
    };

    return (
        <div className={`relative ${sizeClasses[size]} group`}>
            {/* Background Glow */}
            <div
                className="absolute inset-0 rounded-full opacity-30 blur-xl transition-opacity group-hover:opacity-50"
                style={{ backgroundColor: color }}
            />

            {/* Avatar Container */}
            <div className={`absolute inset-0 rounded-full border-2 border-white/20 p-1 bg-[#1a1a1a] shadow-inner overflow-hidden ${isWinner ? 'animate-glow-border' : ''}`}>
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-white/5 to-white/10 flex items-center justify-center relative overflow-hidden">
                    <User size={size === 'xl' ? 48 : 32} className="text-white/20" />
                    {user.avatar && (
                        <img src={user.avatar} alt={user.name} className="absolute inset-0 w-full h-full object-cover" />
                    )}
                </div>
            </div>

            {/* Medal Icon Overlay */}
            <div className="absolute -bottom-1 -right-1 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#1a1a1a] border border-white/20 shadow-lg flex items-center justify-center z-10">
                <Medal size={isWinner ? 20 : 16} style={{ color: color }} />
            </div>
        </div>
    );
};
