import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Medal, Crown, Timer, Filter, Search, ArrowUp, ArrowDown, User, Sparkles, Calendar, MapPin, X, Clock } from 'lucide-react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import { useGetGlobalLeaderboardQuery, useGetAdminLeaderboardQuery, useGetQuizLeaderboardQuery, useGetGroupLeaderboardQuery } from '@/redux/api/leaderboardApi';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import EmptyState from '@/components/dashboard/EmptyState';
import { nigeriaStates } from '@/data/nigeriaStates';

export default function Leaderboard() {
    const user = useSelector(selectCurrentUser);
    const isAdmin = user?.is_admin || user?.role === 'admin' || user?.accountable_type === "App\\Models\\Teacher";
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('weekly');
    const [selectedQuizCode, setSelectedQuizCode] = useState('');
    const [selectedGroupCode, setSelectedGroupCode] = useState('');
    
    // Filter states
    const [timeFilter, setTimeFilter] = useState('all');
    const [dateRange, setDateRange] = useState({ start: '', end: '' });
    const [locationFilter, setLocationFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);
    const [currentTime, setCurrentTime] = useState(new Date());

    // Update time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Build query parameters for filters
    const filterParams = {
        time_filter: timeFilter !== 'all' ? timeFilter : undefined,
        start_date: dateRange.start || undefined,
        end_date: dateRange.end || undefined,
        state: locationFilter !== 'all' ? locationFilter : undefined,
    };

    const { data: globalData, isLoading: isGlobalLoading } = useGetGlobalLeaderboardQuery(
        {
            period: activeTab === 'weekly' ? 'weekly' : activeTab === 'monthly' ? 'monthly' : activeTab === 'yearly' ? 'yearly' : 'weekly',
            ...filterParams
        },
        {
            skip: !['weekly', 'monthly', 'yearly'].includes(activeTab)
        }
    );

    const { data: adminData, isLoading: isAdminLoading } = useGetAdminLeaderboardQuery(
        { admin_code: user?.admin_code, ...filterParams },
        {
            skip: !isAdmin || !user?.admin_code || activeTab !== 'admin'
        }
    );

    const { data: quizData, isLoading: isQuizLoading } = useGetQuizLeaderboardQuery(
        { quiz_code: selectedQuizCode, ...filterParams },
        {
            skip: activeTab !== 'quiz' || !selectedQuizCode
        }
    );

    const { data: groupData, isLoading: isGroupLoading } = useGetGroupLeaderboardQuery(
        { group_code: selectedGroupCode, ...filterParams },
        {
            skip: activeTab !== 'group' || !selectedGroupCode
        }
    );

    const isLoading = ['weekly', 'monthly', 'yearly'].includes(activeTab)
        ? isGlobalLoading
        : activeTab === 'admin'
        ? isAdminLoading
        : activeTab === 'quiz'
        ? isQuizLoading
        : activeTab === 'group'
        ? isGroupLoading
        : false;

    const rawData = ['weekly', 'monthly', 'yearly'].includes(activeTab)
        ? globalData
        : activeTab === 'admin'
        ? adminData
        : activeTab === 'quiz'
        ? quizData
        : activeTab === 'group'
        ? groupData
        : [];

    // Map API data to our UI structure and sort by XP (highest first)
    const leaderboardData = (rawData || [])
        .map((item, index) => {
            // The API might return the student object nested or fields directly
            const student = item.student || item;
            
            // For quiz leaderboard, prioritize quiz_xp, otherwise use profile XP
            const xpValue = activeTab === 'quiz' 
                ? (item.quiz_xp ?? item.quiz_result?.xp_earned ?? student.xp ?? 0)
                : (student.xp ?? 0);
            
            return {
                id: item.id || student.id || index + 1,
                name: `${student.first_name || ''} ${student.last_name || ''}`.trim() || student.name || "Unknown Xplora",
                xp: xpValue,
                avatar: student.photo || student.avatar || null,
                trend: item.trend || 'same',
                level: Math.floor((xpValue || 0) / 1000) + 1,
                role: student.role || (item.student ? 'student' : 'user'),
                date: item.date || student.created_at || student.updated_at || new Date().toISOString(),
                state: student.state || null,
                location: student.state || student.location || null,
                // Store quiz-specific data if available
                quizScore: item.highest_score || item.quiz_result?.score || null,
                quizXp: item.quiz_xp || item.quiz_result?.xp_earned || null,
                profileXp: student.xp || item.profile_xp || null,
            };
        })
        .sort((a, b) => b.xp - a.xp)
        .map((item, index) => ({
            ...item,
            rank: index + 1
        }));

    const filteredData = leaderboardData.filter(item => {
        // Search filter
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
        
        // Time filter
        let matchesTime = true;
        if (timeFilter !== 'all' && item.date) {
            const itemDate = new Date(item.date);
            const now = new Date();
            
            if (timeFilter === 'today') {
                matchesTime = itemDate.toDateString() === now.toDateString();
            } else if (timeFilter === 'week') {
                const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                matchesTime = itemDate >= weekAgo;
            } else if (timeFilter === 'month') {
                const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                matchesTime = itemDate >= monthAgo;
            }
        }
        
        // Date range filter
        let matchesDateRange = true;
        if ((dateRange.start || dateRange.end) && item.date) {
            const itemDate = new Date(item.date);
            if (dateRange.start) {
                matchesDateRange = itemDate >= new Date(dateRange.start);
            }
            if (dateRange.end && matchesDateRange) {
                const endDate = new Date(dateRange.end);
                endDate.setHours(23, 59, 59, 999);
                matchesDateRange = itemDate <= endDate;
            }
        }
        
        // Location filter (would need location data from API)
        let matchesLocation = true;
        if (locationFilter !== 'all' && item.location) {
            matchesLocation = item.location.toLowerCase().includes(locationFilter.toLowerCase());
        }
        
        return matchesSearch && matchesTime && matchesDateRange && matchesLocation;
    });

    const topThree = filteredData.slice(0, 3);
    const others = filteredData.slice(3);

    return (
        <DashboardLayout>
            <div className="min-h-screen bg-white dark:bg-black">
                {/* Visual Background Elements */}
                
                <div className="w-full relative z-10 px-6 lg:px-10">

                    {/* Modern & User-Friendly Header */}
                    <header className="pt-10 pb-8 relative">
                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-8 border-b border-gray-200 dark:border-white/5">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3 flex-wrap">
                                    <div className="flex -space-x-2">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="w-6 h-6 rounded-full border-2 border-[#0a0a0a] bg-white/10 backdrop-blur-sm overflow-hidden">
                                                <User size={12} className="text-white/40 m-auto mt-1" />
                                            </div>
                                        ))}
                                    </div>
                                    <span className="text-[10px] font-bold text-indigo-600 dark:text-[#a6b1ff] uppercase tracking-widest">Global Rankings</span>
                                    
                                    {/* Live Time Display */}
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-500/10 dark:to-purple-500/10 border border-indigo-200 dark:border-indigo-500/20 rounded-full">
                                        <Clock size={14} className="text-indigo-600 dark:text-[#a6b1ff] animate-pulse" />
                                        <span className="text-[10px] font-bold text-indigo-700 dark:text-[#a6b1ff] uppercase tracking-wide">
                                            {currentTime.toLocaleTimeString('en-US', { 
                                                hour: '2-digit', 
                                                minute: '2-digit',
                                                second: '2-digit',
                                                hour12: true 
                                            })}
                                        </span>
                                    </div>
                                </div>
                                <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white tracking-tight uppercase italic leading-none">
                                    {activeTab === 'weekly' && 'Weekly '}
                                    {activeTab === 'monthly' && 'Monthly '}
                                    {activeTab === 'yearly' && 'Yearly '}
                                    {activeTab === 'quiz' && 'Quiz '}
                                    {activeTab === 'group' && 'Group '}
                                    {activeTab === 'admin' && 'My Students '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-[#a6b1ff] dark:to-white">Leaderboard </span>
                                </h1>
                                <p className="text-sm font-medium text-gray-600 dark:text-white/40 max-w-md">
                                    Check out the top players and their awesome quiz scores! 🏆
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-4">

                                {/* Search Bar - Sleek & Integrated */}
                                <div className="relative w-full sm:w-64 group">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30 group-focus-within:text-[#a6b1ff] transition-colors" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Find a friend..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full h-11 pl-11 pr-4 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-2xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/20 focus:outline-none focus:border-[#a6b1ff]/50 focus:bg-white dark:focus:bg-white/10 transition-all text-sm font-medium"
                                    />
                                </div>
                                
                                {/* Filter Toggle Button */}
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`flex items-center gap-2 px-4 h-11 rounded-2xl font-semibold text-sm transition-all ${
                                        showFilters || timeFilter !== 'all' || dateRange.start || dateRange.end || locationFilter !== 'all'
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-[#a6b1ff] dark:to-[#a6b1ff] text-white shadow-lg'
                                            : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60 border-2 border-gray-200 dark:border-white/10 hover:bg-gray-200 dark:hover:bg-white/10'
                                    }`}
                                >
                                    <Filter size={16} />
                                    Filters
                                    {(timeFilter !== 'all' || dateRange.start || dateRange.end || locationFilter !== 'all') && (
                                        <span className="ml-1 px-2 py-0.5 bg-white/20 rounded-full text-xs">
                                            {[
                                                timeFilter !== 'all' && 1,
                                                (dateRange.start || dateRange.end) && 1,
                                                locationFilter !== 'all' && 1
                                            ].filter(Boolean).reduce((a, b) => a + b, 0)}
                                        </span>
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Filters Panel */}
                        <AnimatePresence>
                            {showFilters && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="overflow-hidden"
                                >
                                    <div className="mt-6 p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            
                                            {/* Time Filter */}
                                            <div>
                                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                    <Timer size={16} />
                                                    Time Period
                                                </label>
                                                <select
                                                    value={timeFilter}
                                                    onChange={(e) => setTimeFilter(e.target.value)}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#a6b1ff]/50 text-sm font-medium"
                                                >
                                                    <option value="all">All Time</option>
                                                    <option value="today">Today</option>
                                                    <option value="week">This Week</option>
                                                    <option value="month">This Month</option>
                                                </select>
                                            </div>

                                            {/* Date Range Filter */}
                                            <div>
                                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                    <Calendar size={16} />
                                                    Custom Date Range
                                                </label>
                                                <div className="flex gap-2">
                                                    <input
                                                        type="date"
                                                        value={dateRange.start}
                                                        onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                                                        className="flex-1 px-3 py-2.5 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#a6b1ff]/50 text-sm"
                                                    />
                                                    <input
                                                        type="date"
                                                        value={dateRange.end}
                                                        onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                                                        className="flex-1 px-3 py-2.5 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#a6b1ff]/50 text-sm"
                                                    />
                                                </div>
                                            </div>

                                            {/* Location Filter - Nigeria States */}
                                            <div>
                                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                                                    <MapPin size={16} />
                                                    State (Nigeria)
                                                </label>
                                                <select
                                                    value={locationFilter}
                                                    onChange={(e) => setLocationFilter(e.target.value)}
                                                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white focus:outline-none focus:border-[#a6b1ff]/50 text-sm font-medium"
                                                >
                                                    <option value="all">All States</option>
                                                    {nigeriaStates.map((state) => (
                                                        <option key={state.name} value={state.name}>
                                                            {state.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                        
                                        {/* Clear Filters Button */}
                                        {(timeFilter !== 'all' || dateRange.start || dateRange.end || locationFilter !== 'all') && (
                                            <button
                                                onClick={() => {
                                                    setTimeFilter('all');
                                                    setDateRange({ start: '', end: '' });
                                                    setLocationFilter('all');
                                                }}
                                                className="mt-4 flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                                            >
                                                <X size={16} />
                                                Clear All Filters
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Tabs Section */}
                        <div className="mt-6 grid grid-cols-2 lg:flex lg:flex-wrap gap-2">
                            {['weekly', 'monthly', 'yearly', 'quiz', 'group', ...(isAdmin ? ['admin'] : [])].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 lg:px-6 py-3 rounded-xl font-black text-xs uppercase tracking-wider transition-all ${
                                        activeTab === tab
                                            ? 'bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-[#a6b1ff] dark:to-[#a6b1ff] text-white shadow-lg scale-105'
                                            : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60 hover:bg-gray-200 dark:hover:bg-white/10 border-2 border-gray-200 dark:border-white/10'
                                    }`}
                                >
                                    {tab === 'weekly' && '📅 Weekly'}
                                    {tab === 'monthly' && '📆 Monthly'}
                                    {tab === 'yearly' && '🗓️ Yearly'}
                                    {tab === 'quiz' && '🎯 Quiz'}
                                    {tab === 'group' && '👥 Group'}
                                    {tab === 'admin' && '👨‍🏫 My Students'}
                                </button>
                            ))}
                        </div>

                        {/* Quiz/Group Code Input */}
                        {(activeTab === 'quiz' || activeTab === 'group') && (
                            <div className="mt-4 flex gap-3">
                                <input
                                    type="text"
                                    placeholder={activeTab === 'quiz' ? 'Enter Quiz Code...' : 'Enter Group Code...'}
                                    value={activeTab === 'quiz' ? selectedQuizCode : selectedGroupCode}
                                    onChange={(e) => activeTab === 'quiz' ? setSelectedQuizCode(e.target.value) : setSelectedGroupCode(e.target.value)}
                                    className="flex-1 h-11 px-4 bg-gray-100 dark:bg-white/5 border border-gray-300 dark:border-white/10 rounded-xl text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-white/20 focus:outline-none focus:border-[#a6b1ff]/50 focus:bg-white dark:focus:bg-white/10 transition-all text-sm font-medium"
                                />
                            </div>
                        )}
                    </header>

                    {isLoading ? (
                            <div className="py-24 flex flex-col items-center justify-center gap-4">
                            <div className="relative w-16 h-16">
                                <div className="absolute inset-0 rounded-full border-4 border-indigo-200 dark:border-[#a6b1ff]/20"></div>
                                <div className="absolute inset-0 rounded-full border-t-4 border-indigo-600 dark:border-[#a6b1ff] animate-spin"></div>
                            </div>
                            <p className="text-indigo-600 dark:text-[#a6b1ff] font-black uppercase tracking-widest animate-pulse">Loading the Stars... ✨</p>
                        </div>
                    ) : (activeTab === 'monthly' || activeTab === 'yearly') && (!globalData || globalData.length === 0) ? (
                        /* Coming Soon State for Monthly/Yearly */
                        <div className="py-24 flex flex-col items-center justify-center gap-6">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-white/5 dark:to-white/10 border-4 border-indigo-300 dark:border-white/10 flex items-center justify-center">
                                <Timer size={64} className="text-indigo-500 dark:text-[#a6b1ff]" />
                            </div>
                            <div className="text-center space-y-3 max-w-md">
                                <h3 className="text-2xl sm:text-3xl font-black text-gray-800 dark:text-white uppercase italic tracking-tight">
                                    Coming Soon! 🚀
                                </h3>
                                <p className="text-sm font-medium text-gray-600 dark:text-white/50 leading-relaxed">
                                    {activeTab === 'monthly' ? 'Monthly' : 'Yearly'} leaderboards are on their way! Keep playing quizzes and check back soon to see how you rank over time! 🌟
                                </p>
                            </div>
                        </div>
                    ) : (activeTab === 'quiz' && !selectedQuizCode) ? (
                        /* Quiz Code Required State */
                        <div className="py-24 flex flex-col items-center justify-center gap-6">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-500/10 dark:to-yellow-500/10 border-4 border-amber-300 dark:border-amber-500/20 flex items-center justify-center">
                                <Search size={64} className="text-amber-600 dark:text-amber-400" />
                            </div>
                            <div className="text-center space-y-3 max-w-md">
                                <h3 className="text-2xl sm:text-3xl font-black text-gray-800 dark:text-white uppercase italic tracking-tight">
                                    Enter a Quiz Code! 🎯
                                </h3>
                                <p className="text-sm font-medium text-gray-600 dark:text-white/50 leading-relaxed">
                                    Type in a quiz code above to see who's winning that specific quiz! Ask your teacher for the code! 📝
                                </p>
                            </div>
                        </div>
                    ) : (activeTab === 'group' && !selectedGroupCode) ? (
                        /* Group Code Required State */
                        <div className="py-24 flex flex-col items-center justify-center gap-6">
                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-100 to-green-100 dark:from-emerald-500/10 dark:to-green-500/10 border-4 border-emerald-300 dark:border-emerald-500/20 flex items-center justify-center">
                                <User size={64} className="text-emerald-600 dark:text-emerald-400" />
                            </div>
                            <div className="text-center space-y-3 max-w-md">
                                <h3 className="text-2xl sm:text-3xl font-black text-gray-800 dark:text-white uppercase italic tracking-tight">
                                    Enter a Group Code! 👥
                                </h3>
                                <p className="text-sm font-medium text-gray-600 dark:text-white/50 leading-relaxed">
                                    Type in a group code above to see how your group is doing! Ask your teacher for the code! 🎓
                                </p>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* 3D Podium Section */}
                            <div className="relative mb-16 lg:mb-24">
                                {topThree.length === 0 ? (
                                    /* Empty Podium State */
                                    <div className="flex flex-col items-center justify-center py-16 px-6">
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.6 }}
                                            className="relative"
                                        >
                                            {/* Empty Trophy Icon */}
                                            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-white/5 dark:to-white/10 border-4 border-gray-300 dark:border-white/10 flex items-center justify-center mb-6 shadow-xl">
                                                <Trophy size={64} className="text-gray-400 dark:text-white/20" />
                                            </div>
                                            
                                            {/* Empty Podium Illustration */}
                                            <div className="flex items-end justify-center gap-4 mb-8">
                                                <div className="w-16 h-20 bg-gradient-to-b from-gray-200/40 to-gray-300/60 dark:from-white/5 dark:to-white/10 border border-gray-300 dark:border-white/10 rounded-t-2xl" />
                                                <div className="w-20 h-28 bg-gradient-to-b from-gray-200/40 to-gray-300/60 dark:from-white/5 dark:to-white/10 border border-gray-300 dark:border-white/10 rounded-t-2xl" />
                                                <div className="w-16 h-16 bg-gradient-to-b from-gray-200/40 to-gray-300/60 dark:from-white/5 dark:to-white/10 border border-gray-300 dark:border-white/10 rounded-t-2xl" />
                                            </div>
                                        </motion.div>

                                        <div className="text-center space-y-3 max-w-md">
                                            <h3 className="text-2xl sm:text-3xl font-black text-gray-800 dark:text-white uppercase italic tracking-tight">
                                                The Stage is Empty! 🎭
                                            </h3>
                                            <p className="text-sm font-medium text-gray-600 dark:text-white/50 leading-relaxed">
                                                Wow! Nobody has played any quizzes this week yet. You could be the FIRST superstar on the leaderboard! How cool is that? 🌟
                                            </p>
                                            <div className="pt-4 flex items-center justify-center gap-2">
                                                <Sparkles size={16} className="text-indigo-500 dark:text-[#a6b1ff]" />
                                                <span className="text-xs font-bold text-indigo-600 dark:text-[#a6b1ff] uppercase tracking-wider">
                                                    Play a quiz and become a star!
                                                </span>
                                                <Sparkles size={16} className="text-indigo-500 dark:text-[#a6b1ff]" />
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex flex-row items-end justify-center gap-2 sm:gap-6 lg:gap-12 pt-12">
                                    {/* Rank 2 (Silver) */}
                                    {topThree[1] && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2, duration: 0.8 }}
                                            className="relative flex flex-col items-center"
                                        >
                                            <AvatarBadge user={topThree[1]} color="#4a5552ff" size="lg" />
                                            <div className="w-24 sm:w-32 lg:w-40 h-32 sm:h-40 lg:h-48 mt-4 relative group">
                                                <div className="absolute inset-x-0 bottom-0 h-full bg-gradient-to-b from-[#718096]/40 to-[#2d3748]/80 backdrop-blur-xl border-t border-x border-white/20 rounded-t-3xl shadow-2xl skew-x-[-10deg] transform origin-bottom transition-transform group-hover:scale-105" />
                                                <div className="absolute inset-0 flex flex-col items-center justify-center -skew-x-[-10deg]">
                                                    <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#a1e3f4] dark:text-[#e2e8f0]/30 italic leading-none">2</span>
                                                    <div className="mt-2 text-center">
                                                        <p className="text-[10px] sm:text-xs font-black text-foreground dark:text-white/90 uppercase tracking-tighter truncate w-20 sm:w-28">{topThree[1].name}</p>
                                                        <p className="text-[8px] sm:text-[10px] font-bold text-[#d97706] dark:text-[#e2e8f0] uppercase italic">{topThree[1].xp || 0} XP</p>
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
                                                        <p className="text-xs sm:text-sm font-black text-foreground dark:text-white uppercase tracking-tighter italic truncate w-24 sm:w-32">{topThree[0].name}</p>
                                                        <p className="text-xs font-black text-[#d97706] dark:text-[#fbbf24] uppercase italic drop-shadow-md">{topThree[0].xp} XP</p>
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
                                                        <p className="text-[10px] sm:text-xs font-black text-foreground dark:text-white/90 uppercase tracking-tighter truncate w-20 sm:w-28">{topThree[2].name}</p>
                                                        <p className="text-[8px] sm:text-[10px] font-bold text-[#92400e] dark:text-[#b45309] uppercase italic">{topThree[2].xp} XP</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                                )}
                                {/* Shadow Floor */}
                                {topThree.length > 0 && (
                                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-8 bg-black/40 blur-2xl rounded-full -z-10" />
                                )}
                            </div>

                            {/* Rankings List Section */}
                            <div className="max-w-4xl mx-auto space-y-3 relative">
                                <div className="flex items-center justify-between mb-8 px-2">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-[#a6b1ff] dark:to-[#a6b1ff] rounded-full" />
                                        <h3 className="text-sm font-black text-gray-800 dark:text-white/80 uppercase tracking-[0.2em]">All Stars</h3>
                                    </div>
                                    {searchQuery && (
                                        <div className="px-4 py-2 bg-indigo-100 dark:bg-indigo-500/10 border-2 border-indigo-300 dark:border-indigo-500/20 rounded-xl">
                                            <p className="text-[10px] font-black text-indigo-700 dark:text-indigo-400 uppercase tracking-widest">
                                                {filteredData.length} Found
                                            </p>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center px-8 py-3 mb-4 bg-gray-100 dark:bg-white/5 rounded-2xl border-2 border-gray-200 dark:border-white/5">
                                    <span className="w-14 text-center text-[10px] font-black text-gray-600 dark:text-white/40 uppercase tracking-wider">Rank</span>
                                    <span className="flex-1 ml-2 text-left text-[10px] font-black text-gray-600 dark:text-white/40 uppercase tracking-wider">Name</span>
                                    <span className="hidden sm:block w-32 text-center text-[10px] font-black text-gray-600 dark:text-white/40 uppercase tracking-wider">Level</span>
                                    <span className="w-28 text-right text-[10px] font-black text-gray-600 dark:text-white/40 uppercase tracking-wider">Score</span>
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
                                                className={`group lg:flex lg:items-center px-4 sm:px-6 lg:px-8 py-5 bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl border-2 ${user?.id === item.id ? 'border-indigo-400 dark:border-[#a6b1ff]/50 bg-indigo-50 dark:bg-[#a6b1ff]/5 shadow-lg shadow-indigo-200/50 dark:shadow-none' : 'border-gray-200 dark:border-white/5 hover:border-indigo-300 dark:hover:border-[#a6b1ff]/30'} hover:bg-gray-50 dark:hover:bg-white/10 hover:shadow-md transition-all cursor-pointer relative overflow-hidden`}
                                            >
                                                {user?.id === item.id && (
                                                    <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-600 dark:from-[#a6b1ff] dark:to-[#a6b1ff] shadow-[0_0_15px_rgba(99,102,241,0.5)] dark:shadow-[0_0_15px_rgba(166,177,255,0.5)]" />
                                                )}

                                                {/* Rank */}
                                                <div className="w-10 sm:w-14 flex justify-center shrink-0">
                                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-base ${item.rank <= 3 ? 'bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-[#a6b1ff] dark:to-[#a6b1ff] text-white shadow-lg' : 'bg-gray-200 dark:bg-white/10 text-gray-600 dark:text-white/60 group-hover:bg-gray-300 dark:group-hover:bg-white/20'}`}>
                                                        {item.rank}
                                                    </div>
                                                </div>

                                                {/* Profile */}
                                                <div className="flex-1 ml-2 flex items-center gap-2 sm:gap-4 min-w-0">
                                                    <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-white/10 dark:to-white/20 border-2 border-indigo-200 dark:border-white/10 flex items-center justify-center relative overflow-hidden shrink-0 shadow-sm">
                                                        <User size={20} className="text-indigo-400 dark:text-white/40 sm:w-6 sm:h-6" />
                                                        {item.avatar && <img src={item.avatar} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />}
                                                    </div>
                                                    <div className="truncate">
                                                        <h4 className="text-sm sm:text-base font-black text-gray-900 dark:text-white uppercase italic tracking-tight group-hover:text-indigo-600 dark:group-hover:text-[#a6b1ff] transition-colors truncate">
                                                            {item.name} {user?.id === item.id && <span className="text-indigo-600 dark:text-[#a6b1ff]">(YOU)</span>}
                                                        </h4>
                                                        <p className="text-[10px] font-bold text-gray-500 dark:text-white/30 uppercase tracking-widest leading-none mt-1">
                                                            {item.role}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Level */}
                                                <div className="hidden sm:flex w-32 justify-center items-center gap-3">
                                                    <div className="flex flex-col items-center gap-1">
                                                        <div className="w-20 h-2 bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden shadow-inner">
                                                            <div
                                                                className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-[#a6b1ff] dark:to-[#a6b1ff] shadow-sm"
                                                                style={{ width: `${(item.level % 10) * 10}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-[9px] font-black text-gray-600 dark:text-white/60 uppercase tracking-wider">Level {item.level}</span>
                                                    </div>
                                                </div>

                                                {/* Points */}
                                                <div className="w-20 sm:w-28 text-right flex flex-col items-end gap-1 shrink-0">
                                                    <div className="px-2 sm:px-3 py-1 sm:py-1.5 bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-500/10 dark:to-yellow-500/10 border-2 border-amber-300 dark:border-amber-500/20 rounded-xl shadow-sm">
                                                        <span className="text-sm sm:text-base font-black text-amber-700 dark:text-amber-400 italic tracking-tight">
                                                            {item.xp.toLocaleString()}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        {item.trend === 'up' && <ArrowUp size={12} className="text-emerald-600 dark:text-emerald-500" />}
                                                        {item.trend === 'down' && <ArrowDown size={12} className="text-rose-600 dark:text-rose-500" />}
                                                        <span className={`text-[9px] font-black uppercase ${item.trend === 'up' ? 'text-emerald-600 dark:text-emerald-500' :
                                                            item.trend === 'down' ? 'text-rose-600 dark:text-rose-500' : 'text-gray-500 dark:text-white/30'
                                                            }`}>
                                                            {item.trend === 'same' ? 'Same' : item.trend}
                                                        </span>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))
                                    ) : (
                                        <div className="py-12">
                                            <EmptyState title="Friend Not Found" description="Try searching for a different name or clear the search. 🔍" />
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Footer / Disclaimer */}
                            <div className="mt-12 text-center space-y-2">
                                <p className="text-gray-500 dark:text-white/20 text-[10px] font-bold uppercase tracking-[0.3em]">
                                    Scores update super fast! Keep playing! 🚀
                                </p>
                            </div>
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
