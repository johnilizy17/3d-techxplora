import React from 'react';
import { motion } from 'framer-motion';
import {
    Users,
    Trophy,
    Target,
    Clock,
    Calendar,
    Copy,
    Edit3,
    PlusCircle,
    TrendingUp,
    UserCheck,
    AlertCircle,
    ArrowRight
} from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { selectTempStorage } from '@/redux/slices/authSlice';
import { useGetQuizResultsQuery } from '@/redux/api/questionApi';
import { calculateQuizResultsStats } from '@/utils/excelUtils';
import { formatDistanceToNow } from 'date-fns';

export default function QuizResults() {
    const navigate = useNavigate();
    const tempStorage = useSelector(selectTempStorage);
    const quizId = tempStorage?.id;

    const { data: resultsResults, isLoading } = useGetQuizResultsQuery(quizId, {
        skip: !quizId
    });

    const results = resultsResults?.data || resultsResults || [];
    const stats = calculateQuizResultsStats(results);

    const copyCode = () => {
        if (tempStorage?.quiz_code) {
            navigator.clipboard.writeText(tempStorage.quiz_code);
            toast.success("Quiz code copied to clipboard!");
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
                <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                <p className="text-white/40 font-bold uppercase tracking-widest text-xs animate-pulse">Syncing performance data...</p>
            </div>
        );
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 pb-20"
        >
            {/* Header / Banner */}
            <motion.div variants={itemVariants} className="relative p-8 lg:p-12 rounded-[3rem] bg-gradient-to-br from-indigo-600 via-blue-600 to-purple-700 overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="px-4 py-1.5 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-[10px] font-black text-white uppercase tracking-[0.2em]">Live Challenge</span>
                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Active</span>
                            </div>
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-black text-white italic tracking-tighter uppercase leading-none">
                            {tempStorage?.title || "Quiz Performance"}
                        </h1>
                        <p className="text-white/70 font-medium max-w-2xl leading-relaxed">
                            {tempStorage?.description || "Monitor real-time results and adjust your curriculum based on student performance insights."}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 pt-4">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                    <Clock className="text-white" size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Expires In</p>
                                    <p className="text-sm font-bold text-white">{tempStorage?.end_at ? formatDistanceToNow(new Date(tempStorage.end_at)) : "N/A"}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                    <Target className="text-white" size={18} />
                                </div>
                                <div>
                                    <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Total XP Pool</p>
                                    <p className="text-sm font-bold text-white">{tempStorage?.xp || 0} XP</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-4">
                        <div className="p-8 rounded-[2.5rem] bg-black/20 backdrop-blur-xl border border-white/10 shadow-2xl text-center min-w-[200px] group transition-transform hover:scale-105">
                            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mb-2">Quiz Code</p>
                            <h2 className="text-4xl font-black text-white tracking-[0.2em] mb-4 font-mono group-hover:text-blue-400 transition-colors">
                                {tempStorage?.quiz_code || "------"}
                            </h2>
                            <button
                                onClick={copyCode}
                                className="w-full py-3 rounded-xl bg-white/10 hover:bg-white text-white hover:text-indigo-600 font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all"
                            >
                                <Copy size={14} />
                                Copy Code
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={Users} label="Student Capacity" value={stats.totalStudents} sub={`${results.length} Attempted`} color="blue" />
                <StatCard icon={TrendingUp} label="Average Score" value={`${stats.averageScore}%`} sub="Mastery Level" color="purple" />
                <StatCard icon={UserCheck} label="Success Rate" value={`${stats.passPercentage}%`} sub="Passing Students" color="emerald" />
                <StatCard icon={AlertCircle} label="Risk Factor" value={`${stats.failPercentage}%`} sub="Below 50% Score" color="rose" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Recent Attempts Table */}
                <motion.div variants={itemVariants} className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-[2.5rem] overflow-hidden">
                    <div className="p-8 border-b border-white/5 flex items-center justify-between">
                        <h3 className="text-xl font-black text-white italic uppercase tracking-tight flex items-center gap-3">
                            <TrendingUp className="text-blue-400" size={24} />
                            Mission Logs
                        </h3>
                        <span className="text-[10px] font-black text-white/40 uppercase tracking-widest italic">{results.length} students found</span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-white/5 border-b border-white/10">
                                <tr>
                                    <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Student Agent</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Execution Grade</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                                {results.length > 0 ? (
                                    results.map((item, i) => (
                                        <tr key={i} className="group hover:bg-white/[0.02] transition-colors">
                                            <td className="px-8 py-6">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center font-black text-white italic">
                                                        {item.student?.first_name?.[0]}{item.student?.last_name?.[0]}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-white group-hover:text-blue-400 transition-colors">
                                                            {item.student?.first_name} {item.student?.last_name}
                                                        </p>
                                                        <p className="text-[10px] text-white/30 font-bold uppercase tracking-wider">{item.student?.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <span className={`text-sm font-black italic ${item.score >= 50 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                                            {item.score}%
                                                        </span>
                                                    </div>
                                                    <div className="w-32 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${item.score}%` }}
                                                            className={`h-full rounded-full ${item.score >= 50 ? 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.3)]' : 'bg-rose-500'}`}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${item.score >= 50
                                                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                                                        : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                                                    }`}>
                                                    {item.score >= 50 ? 'Promoted' : 'Sub-optimal'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="3" className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-4 opacity-30">
                                                <Users size={48} />
                                                <p className="font-black uppercase tracking-widest text-xs">Waiting for student interaction...</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </motion.div>

                {/* Quick Actions Side Panel */}
                <div className="space-y-6">
                    <motion.div variants={itemVariants} className="p-8 rounded-[2.5rem] bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                        <h3 className="text-lg font-black text-white italic uppercase tracking-tight mb-6 flex items-center gap-2">
                            <Edit3 className="text-emerald-400" size={20} />
                            Quiz Modification
                        </h3>
                        <div className="space-y-4">
                            <QuickActionButton
                                icon={Edit3}
                                label="Modify Quiz Details"
                                color="emerald"
                                onClick={() => navigate('/dashboard/teacher/editquiz')}
                            />
                            <QuickActionButton
                                icon={PlusCircle}
                                label="Incorporate Questions"
                                color="teal"
                                onClick={() => navigate('/dashboard/teacher/question?manual=true')}
                            />
                        </div>
                    </motion.div>

                    <motion.div variants={itemVariants} className="p-8 rounded-[2.5rem] bg-white/[0.03] border border-white/5 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500">
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-20 group-hover:scale-110 transition-all">
                            <Trophy size={60} className="text-blue-400" />
                        </div>
                        <h4 className="text-xs font-black text-white/40 uppercase tracking-widest mb-2 italic">Class Champion</h4>
                        {results.length > 0 ? (
                            <div className="space-y-3">
                                <p className="text-xl font-black text-white italic uppercase tracking-tight">
                                    {results.sort((a, b) => b.score - a.score)[0].student.first_name} {results.sort((a, b) => b.score - a.score)[0].student.last_name}
                                </p>
                                <div className="flex items-center gap-2">
                                    <span className="text-2xl font-black text-blue-400 italic font-mono">{Math.max(...results.map(r => r.score))}%</span>
                                    <Trophy size={16} className="text-amber-400" />
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm font-bold text-white/20 italic">Leaderboard pending...</p>
                        )}
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
}

const StatCard = ({ icon: Icon, label, value, sub, color }) => {
    const colorClasses = {
        blue: "from-blue-500/20 to-indigo-500/5 border-blue-500/20 text-blue-400 icon-bg-blue-500/20",
        purple: "from-purple-500/20 to-fuchsia-500/5 border-purple-500/20 text-purple-400 icon-bg-purple-500/20",
        emerald: "from-emerald-500/20 to-teal-500/5 border-emerald-500/20 text-emerald-400 icon-bg-emerald-500/20",
        rose: "from-rose-500/20 to-orange-500/5 border-rose-500/20 text-rose-400 icon-bg-rose-500/20",
    };

    return (
        <motion.div variants={{ hidden: { scale: 0.9, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
            className={`p-6 rounded-[2rem] bg-gradient-to-br ${colorClasses[color].split(' ')[0]} ${colorClasses[color].split(' ')[1]} border ${colorClasses[color].split(' ')[2]} flex flex-col justify-between group hover:scale-[1.02] transition-transform duration-300`}
        >
            <div className={`w-12 h-12 rounded-2xl ${colorClasses[color].split(' ')[4]} flex items-center justify-center mb-6 shadow-lg shadow-black/20 group-hover:rotate-12 transition-transform`}>
                <Icon size={24} className={colorClasses[color].split(' ')[3]} />
            </div>
            <div>
                <p className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">{label}</p>
                <h3 className="text-3xl font-black text-white italic tracking-tight font-mono">{value}</h3>
                <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest mt-2">{sub}</p>
            </div>
        </motion.div>
    );
};

const QuickActionButton = ({ icon: Icon, label, color, onClick }) => {
    const colors = {
        emerald: "bg-emerald-500 hover:bg-emerald-400 text-black shadow-emerald-500/20",
        teal: "bg-teal-500 hover:bg-teal-400 text-black shadow-teal-500/20",
    }
    return (
        <button
            onClick={onClick}
            className={`w-full h-[56px] px-6 rounded-2xl ${colors[color]} font-black uppercase tracking-widest text-[10px] flex items-center justify-between group transition-all duration-300 shadow-xl`}
        >
            <span className="flex items-center gap-3">
                <Icon size={18} />
                {label}
            </span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
    );
}
