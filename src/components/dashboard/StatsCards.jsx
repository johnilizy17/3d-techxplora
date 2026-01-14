import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import { useGetGroupsQuery, useGetQuizzesQuery } from '@/redux/api/teacherApi';

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
    const type = user?.accountable_type === "App\\Models\\Student" ? "student" : "teacher";

    const { data: groupsData } = useGetGroupsQuery({ type, id: user?.id }, {
        skip: !user?.id
    });

    const { data: quizzesData } = useGetQuizzesQuery({ type, id: user?.id }, {
        skip: !user?.id
    });

    // Default values if data is missing
    const xp = user?.xp || 0;
    const quizCount = quizzesData?.length || 0;
    const groupCount = groupsData?.length || 0;

    return (
        <div className="px-6 lg:px-0 -mt-8 lg:-mt-10 relative z-10 transition-all duration-500">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.4)] rounded-[2rem] sm:rounded-3xl p-4 lg:p-6 flex items-center divide-x divide-white/10"
            >
                <StatItem label="Quiz" value={quizCount} delay={0.3} onClick={() => navigate('/dashboard/quizzes')} />
                <StatItem label="Group" value={groupCount} delay={0.4} onClick={() => navigate('/dashboard/group')} />
                <StatItem label="Xp" value={xp} delay={0.5} onClick={() => navigate('/dashboard/wallet')} />
            </motion.div>
        </div>
    );
}
