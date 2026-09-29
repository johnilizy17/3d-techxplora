import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import { useGetGroupsQuery, useGetQuizzesQuery, useGetTeacherStudentsQuery } from '@/redux/api/teacherApi';
import { useGetEnrolledCoursesQuery } from '@/redux/api/studentApi';

const StatItem = ({ label, value, delay, onClick }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay }}
        onClick={onClick}
        className="flex flex-col items-center justify-center flex-1 py-1 cursor-pointer hover:bg-accent transition-colors rounded-xl mx-1"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
    >
        <span className="text-muted-foreground text-xs font-medium uppercase tracking-wider mb-1">{label}</span>
        <span className="text-2xl font-bold text-foreground font-['Bricolage_Grotesque']">{value}</span>
    </motion.div>
);

export default function StatsCards() {
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const type = user?.accountable_type === "App\\Models\\Student" ? "student" : "teacher";

    const isStudent = type === "student";

    const { data: groupsData } = useGetGroupsQuery({ type, id: user?.id }, {
        skip: !user?.id
    });

    const { data: quizzesData } = useGetQuizzesQuery({ type, id: user?.id }, {
        skip: !user?.id
    });

    const { data: teacherStudentsData } = useGetTeacherStudentsQuery(user?.id, {
        skip: !user?.id || isStudent
    });

    const { data: enrolledCoursesData } = useGetEnrolledCoursesQuery({}, {
        skip: !user?.id || !isStudent
    });

    // Helper to extract count from wrapped responses
    const getCount = (response) => {
        if (!response) return 0;
        const data = Array.isArray(response) ? response : (response.data || []);
        // Handle nested data.data if paginated
        const finalData = Array.isArray(data) ? data : (data.data || []);
        return Array.isArray(finalData) ? finalData.length : 0;
    };

    const quizCount = getCount(quizzesData);
    const groupCount = getCount(groupsData);
    const studentCount = getCount(teacherStudentsData);
    const courseCount = getCount(enrolledCoursesData);
    const xp = user?.xp || 0;

    return (
        <div className="px-6 lg:px-0 -mt-8 lg:-mt-10 relative z-10 transition-all duration-500">
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-card/80 backdrop-blur-xl border border-border shadow-[0_20px_40px_rgba(0,0,0,0.4)] rounded-[2rem] sm:rounded-3xl p-4 lg:p-6 flex items-center divide-x divide-border"
            >
                <StatItem label="Quiz" value={quizCount} delay={0.3} onClick={() => navigate('/dashboard/quizzes')} />
                <StatItem label="Group" value={groupCount} delay={0.4} onClick={() => navigate('/dashboard/groups')} />
                {isStudent ? (
                    <>
                        <StatItem label="Courses" value={courseCount} delay={0.5} onClick={() => navigate('/dashboard/courses')} />
                        <StatItem label="Xp" value={xp} delay={0.6} onClick={() => navigate('/dashboard/wallet')} />
                    </>
                ) : (
                    <StatItem label="Students" value={studentCount} delay={0.5} onClick={() => navigate('/dashboard/teachers')} />
                )}
            </motion.div>
        </div>
    );
}
