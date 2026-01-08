import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/authSlice';

const StatItem = ({ label, value, delay, onClick }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        onClick={onClick}
        className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer hover:bg-white/5 transition-colors rounded-xl mx-1"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        <span className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">{label}</span>
        <span className="text-2xl font-bold text-white font-['Bricolage_Grotesque']">{value}</span>
    </motion.div>
);

export default function StatsCards() {
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);

    // Default values if data is missing
    const xp = user?.xp || 0;
    const quizCount = user?.quizzes?.length || 0;
    const groupCount = user?.groups?.length || 0;

    return (
        <div className="px-6 -mt-8 relative z-10">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] rounded-3xl p-4 flex items-center divide-x divide-white/10"
            >
                <StatItem label="Quiz" value={quizCount} delay={0.3} onClick={() => navigate('/dashboard/quiz')} />
                <StatItem label="Group" value={groupCount} delay={0.4} onClick={() => navigate('/dashboard/group')} />
                <StatItem label="Xp" value={xp} delay={0.5} onClick={() => navigate('/dashboard/wallet')} />
            </motion.div>
        </div>
    );
}
