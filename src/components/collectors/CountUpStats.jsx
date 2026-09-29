import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://api.techxplora.co/api/v1';

// Animated counter component
const Counter = ({ end, duration = 2 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

export default function CountUpStats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/platform/stats`);
      setStats(response.data.data);
      setError(false);
    } catch (err) {
      console.error('Error fetching stats:', err);
      setError(true);
      // Set fallback stats so component still renders
      setStats({
        total_students: 0,
        total_teachers: 0,
        total_quizzes: 0
      });
    } finally {
      setLoading(false);
    }
  };

  // Show nothing while loading to prevent layout shift
  if (loading) {
    return null;
  }

  // Still show the section even if API fails with fallback data
  if (error && !stats) {
    return null;
  }

  const statItems = [
    {
      label: 'Year Founded',
      value: 2025,
      icon: '🚀',
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Total Users',
      value: stats?.total_students + stats?.total_teachers +2 || 0,
      icon: '👥',
      color: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Total Quizzes',
      value: stats?.total_quizzes || 0,
      icon: '📝',
      color: 'from-pink-500 to-pink-600',
    },
  ];

  return (
    <div className="w-full bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black py-16 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tight">
            TechXplora by the Numbers 📊
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
            Turning learning into a fun game! Answer quiz questions, earn points, and see how you're doing.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {statItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className={`relative group`}
            >
              {/* Card background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

              {/* Card content */}
              <div className="relative bg-white dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 rounded-2xl p-8 hover:shadow-2xl dark:hover:shadow-2xl/20 transition-all duration-300 transform group-hover:scale-105">
                {/* Icon */}
                <div className="text-5xl mb-6">{item.icon}</div>

                {/* Counter */}
                <div className={`text-5xl lg:text-6xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent mb-4`}>
                  <Counter end={item.value} duration={2.5} />
                </div>

                {/* Label */}
                <p className="text-gray-600 dark:text-gray-300 font-bold uppercase tracking-widest text-sm">
                  {item.label}
                </p>

                {/* Decorative line */}
                <div className={`mt-6 h-1 w-12 bg-gradient-to-r ${item.color} rounded-full`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom tagline and button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-gray-600 dark:text-gray-400 font-semibold text-lg mb-8">
            Join thousands of learners making education fun! 🎮✨
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/stats')}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white rounded-xl font-bold hover:shadow-lg transition-all"
          >
            View More Stats →
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}
