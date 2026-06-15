import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  BookOpen,
  Zap,
  BarChart3,
  Smartphone,
  TrendingUp,
  Award,
  RefreshCw,
  LineChart,
  BarChart4
} from 'lucide-react';
import axios from 'axios';
import {
  LineChart as RechartsLineChart,
  BarChart as RechartsBarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import VisualBackground from '@/components/collectors/VisualBackground';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.techxplora.co/api/v1';

// Custom Tooltip Component for light/dark mode support
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-900 border-2 border-blue-500 rounded-lg p-3 shadow-lg">
        <p className="text-gray-900 dark:text-white font-bold text-sm mb-2">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }} className="text-sm font-semibold">
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Stats() {
  const [stats, setStats] = useState(null);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartType, setChartType] = useState('line'); // 'line' or 'bar'
  const [period, setPeriod] = useState('daily'); // 'daily', 'weekly', 'monthly', 'yearly'

  useEffect(() => {
    fetchStats();
    fetchAnalyticsData();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/platform/stats`);
      setStats(response.data.data);
      setError(null);
    } catch (err) {
      setError('Failed to load statistics. Please try again later.');
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalyticsData = async () => {
    try {
      const response = await axios.get(`${API_URL}/platform/analytics`);
      setAnalyticsData(response.data.data);
    } catch (err) {
      console.error('Error fetching analytics data:', err);
    }
  };

  const getChartData = () => {
    if (!stats?.account_creation) return [];
    
    const periodData = stats.account_creation[period];
    if (!periodData || !Array.isArray(periodData)) return [];

    return periodData.map(item => ({
      name: item.label || item.date || item.month || item.year,
      students: item.students,
      teachers: item.teachers,
      admins: item.admins,
      total: item.total
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="relative w-20 h-20"
        >
          <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-white/10"></div>
          <div className="absolute inset-0 rounded-full border-t-4 border-blue-600 dark:border-blue-400"></div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 bg-white dark:bg-black">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <p className="text-red-600 dark:text-red-400 font-black text-xl mb-6">{error}</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={fetchStats}
            className="px-8 py-3 bg-blue-600 dark:bg-blue-500 text-white rounded-xl font-bold hover:bg-blue-700 dark:hover:bg-blue-600 transition-all flex items-center gap-2 mx-auto"
          >
            <RefreshCw size={18} />
            Retry
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const StatCard = ({ icon: Icon, label, value, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-2xl p-6 hover:shadow-lg dark:hover:shadow-lg/20 transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`${color} p-3 rounded-xl text-white`}>
          <Icon size={24} />
        </div>
      </div>
      <p className="text-gray-600 dark:text-white/40 text-sm font-medium uppercase tracking-widest mb-2">
        {label}
      </p>
      <p className="text-4xl font-black text-gray-900 dark:text-white">
        {typeof value === 'number' ? value.toLocaleString() : value}
      </p>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-white dark:bg-black py-12 px-6 relative overflow-hidden">
    {/* Grid Background */}
          <div className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <VisualBackground />
      </div>
       <div style={{height:60, width:"100%"}} />
    
      <div className="max-w-7xl mx-auto relative z-10">
    
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 text-center"
        >
          <h1 className="text-5xl lg:text-6xl font-black text-gray-900 dark:text-white italic tracking-tighter uppercase leading-none mb-4">
            Platform <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 dark:from-blue-400 to-indigo-600 dark:to-indigo-500">Statistics</span>
          </h1>
          <p className="text-gray-600 dark:text-white/40 font-medium uppercase tracking-widest text-[11px]">
            Real-time insights into the TechXplora ecosystem
          </p>
        </motion.div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            icon={Users}
            label="Total Students"
            value={stats?.total_students || 0}
            color="bg-blue-500"
          />
          <StatCard
            icon={BookOpen}
            label="Total Teachers"
            value={stats?.total_teachers-stats?.total_teacher_admins || 0}
            color="bg-green-500"
          />
           <StatCard
            icon={BookOpen}
            label="Total Admin"
            value={2 || 0}
            color="bg-green-500"
          />
        <StatCard
            icon={BookOpen}
            label="Total Admin Teachers"
            value={stats?.total_teacher_admins || 0}
            color="bg-green-500"
          />
          <StatCard
            icon={Zap}
            label="Total Courses"
            value={stats?.total_courses || 0}
            color="bg-orange-500"
          />
        </div>

        {/* Secondary Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard
            icon={BarChart3}
            label="Total Quizzes"
            value={stats?.total_quizzes || 0}
            color="bg-pink-500"
          />
          <StatCard
            icon={Users}
            label="Total Groups"
            value={stats?.total_groups || 0}
            color="bg-cyan-500"
          />
          <StatCard
            icon={TrendingUp}
            label="Highest Quiz performing average  Score"
            value={stats?.highest_performing_quiz?.average_score?.toFixed(1) || 0}
            color="bg-emerald-500"
          />
        </div>

        {/* Device Types Section */}
        {stats?.device_types && stats.device_types.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-2xl p-8 mb-12"
          >
            <div className="flex items-center gap-3 mb-8">
              <Smartphone className="text-blue-600 dark:text-blue-400" size={28} />
              <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                Device Types
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {stats.device_types.map((device, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className="bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/5 rounded-xl p-4 text-center hover:shadow-md dark:hover:shadow-lg/10 transition-all"
                >
                  <p className="text-sm font-black text-gray-600 dark:text-white/60 uppercase tracking-widest mb-2">
                    {device.name}
                  </p>
                  <p className="text-3xl font-black text-gray-900 dark:text-white">
                    {device.count}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Highest Performing Quiz Section */}
        {stats?.highest_performing_quiz && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/5 dark:to-indigo-500/5 border border-blue-200 dark:border-blue-500/20 rounded-2xl p-8 mb-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <Award className="text-blue-600 dark:text-blue-400" size={28} />
              <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                Highest Performing Quiz
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm font-black text-gray-600 dark:text-white/60 uppercase tracking-widest mb-2">
                  Quiz Title
                </p>
                <p className="text-2xl font-black text-gray-900 dark:text-white mb-6">
                  {stats.highest_performing_quiz.quiz_info?.title || 'N/A'}
                </p>
                <p className="text-sm font-black text-gray-600 dark:text-white/60 uppercase tracking-widest mb-2">
                  Description
                </p>
                <p className="text-gray-700 dark:text-white/70 font-medium">
                  {stats.highest_performing_quiz.quiz_info?.description || 'No description available'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-xl p-4">
                  <p className="text-xs font-black text-gray-600 dark:text-white/60 uppercase tracking-widest mb-2">
                    Average Score
                  </p>
                  <p className="text-3xl font-black text-blue-600 dark:text-blue-400">
                    {stats.highest_performing_quiz.average_score?.toFixed(1) || 0}
                  </p>
                </div>
                <div className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-xl p-4">
                  <p className="text-xs font-black text-gray-600 dark:text-white/60 uppercase tracking-widest mb-2">
                    Attempts
                  </p>
                  <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                    {stats.highest_performing_quiz.attempt_count || 0}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Google Analytics Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-500/5 dark:to-pink-500/5 border border-purple-200 dark:border-purple-500/20 rounded-2xl p-8 mb-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <BarChart3 className="text-purple-600 dark:text-purple-400" size={28} />
            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
              Google Analytics 📊
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white dark:bg-white/[0.03] border border-purple-200 dark:border-purple-500/20 rounded-xl p-4">
              <p className="text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-2">
                Today's Visitors
              </p>
              <p className="text-3xl font-black text-gray-900 dark:text-white">
                {analyticsData?.today_visitors || 0}
              </p>
            </div>
            <div className="bg-white dark:bg-white/[0.03] border border-purple-200 dark:border-purple-500/20 rounded-xl p-4">
              <p className="text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-2">
                This Week
              </p>
              <p className="text-3xl font-black text-gray-900 dark:text-white">
                {analyticsData?.week_visitors || 0}
              </p>
            </div>
            <div className="bg-white dark:bg-white/[0.03] border border-purple-200 dark:border-purple-500/20 rounded-xl p-4">
              <p className="text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-2">
                This Month
              </p>
              <p className="text-3xl font-black text-gray-900 dark:text-white">
                {analyticsData?.month_visitors || 0}
              </p>
            </div>
            <div className="bg-white dark:bg-white/[0.03] border border-purple-200 dark:border-purple-500/20 rounded-xl p-4">
              <p className="text-xs font-black text-purple-600 dark:text-purple-400 uppercase tracking-widest mb-2">
                Tracking ID
              </p>
              <p className="text-sm font-black text-gray-900 dark:text-white font-mono">
                G-CVJB4QD1L2
              </p>
            </div>
          </div>

          {/* Top Countries */}
          {analyticsData?.top_countries && analyticsData.top_countries.length > 0 && (
            <div>
              <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight mb-4">
                🌍 Top Countries
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
                {analyticsData.top_countries.map((country, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    className="bg-white dark:bg-white/[0.03] border border-purple-200 dark:border-purple-500/20 rounded-lg p-3 text-center hover:shadow-md dark:hover:shadow-lg/10 transition-all"
                  >
                    <p className="text-sm font-black text-gray-600 dark:text-white/60 uppercase tracking-widest mb-2">
                      {country.country}
                    </p>
                    <p className="text-2xl font-black text-purple-600 dark:text-purple-400">
                      {country.count}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        {/* Account Creation Chart Section */}
        {stats?.account_creation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-2xl p-8 mb-12"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
              <div className="flex items-center gap-3">
                <TrendingUp className="text-blue-600 dark:text-blue-400" size={28} />
                <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">
                  Account Creation Trends
                </h2>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {/* Chart Type Toggle */}
                <div className="flex gap-2 bg-gray-100 dark:bg-white/5 rounded-xl p-1">
                  <button
                    onClick={() => setChartType('line')}
                    className={`px-4 py-2 rounded-lg font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${
                      chartType === 'line'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-600 dark:text-white/40 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <LineChart size={16} />
                    Line
                  </button>
                  <button
                    onClick={() => setChartType('bar')}
                    className={`px-4 py-2 rounded-lg font-black text-xs uppercase tracking-widest transition-all flex items-center gap-2 ${
                      chartType === 'bar'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-600 dark:text-white/40 hover:text-gray-900 dark:hover:text-white'
                    }`}
                  >
                    <BarChart4 size={16} />
                    Bar
                  </button>
                </div>

                {/* Period Toggle */}
                <div className="flex gap-2 bg-gray-100 dark:bg-white/5 rounded-xl p-1">
                  {['daily', 'weekly', 'monthly', 'yearly'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setPeriod(p)}
                      className={`px-3 py-2 rounded-lg font-black text-xs uppercase tracking-widest transition-all ${
                        period === p
                          ? 'bg-emerald-600 text-white shadow-lg'
                          : 'text-gray-600 dark:text-white/40 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="w-full h-80 bg-gray-50 dark:bg-white/[0.02] rounded-xl p-4">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'line' ? (
                  <RechartsLineChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(0,0,0,0.5)" />
                    <YAxis stroke="rgba(0,0,0,0.5)" />
                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#3b82f6', strokeWidth: 3 }} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="students"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', r: 4 }}
                      activeDot={{ r: 6, fill: '#3b82f6' }}
                      name="Students"
                    />
                    <Line
                      type="monotone"
                      dataKey="teachers"
                      stroke="#10b981"
                      strokeWidth={2}
                      dot={{ fill: '#10b981', r: 4 }}
                      activeDot={{ r: 6, fill: '#10b981' }}
                      name="Teachers"
                    />
                    <Line
                      type="monotone"
                      dataKey="admins"
                      stroke="#f59e0b"
                      strokeWidth={2}
                      dot={{ fill: '#f59e0b', r: 4 }}
                      activeDot={{ r: 6, fill: '#f59e0b' }}
                      name="Admins"
                    />
                  </RechartsLineChart>
                ) : (
                  <RechartsBarChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                    <XAxis dataKey="name" stroke="rgba(0,0,0,0.5)" />
                    <YAxis stroke="rgba(0,0,0,0.5)" />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }} />
                    <Legend />
                    <Bar dataKey="students" fill="#3b82f6" radius={[8, 8, 0, 0]} name="Students" />
                    <Bar dataKey="teachers" fill="#10b981" radius={[8, 8, 0, 0]} name="Teachers" />
                    <Bar dataKey="admins" fill="#f59e0b" radius={[8, 8, 0, 0]} name="Admins" />
                  </RechartsBarChart>
                )}
              </ResponsiveContainer>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20 rounded-xl p-4 text-center">
                <p className="text-xs font-black text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2">
                  Total Students
                </p>
                <p className="text-3xl font-black text-blue-600 dark:text-blue-400">
                  {getChartData().reduce((sum, item) => sum + item.students, 0)}
                </p>
              </div>
              <div className="bg-green-50 dark:bg-green-500/5 border border-green-200 dark:border-green-500/20 rounded-xl p-4 text-center">
                <p className="text-xs font-black text-green-600 dark:text-green-400 uppercase tracking-widest mb-2">
                  Total Teachers
                </p>
                <p className="text-3xl font-black text-green-600 dark:text-green-400">
                  {getChartData().reduce((sum, item) => sum + item.teachers, 0)}
                </p>
              </div>
              <div className="bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 rounded-xl p-4 text-center">
                <p className="text-xs font-black text-amber-600 dark:text-amber-400 uppercase tracking-widest mb-2">
                  Total Admins
                </p>
                <p className="text-3xl font-black text-amber-600 dark:text-amber-400">
                  {getChartData().reduce((sum, item) => sum + item.admins, 0)}
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-500 dark:text-gray-400 text-sm font-bold uppercase tracking-[0.2em]">
            Last Updated: {new Date().toLocaleString()}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
