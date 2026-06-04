import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    ShieldAlert,
    AlertTriangle,
    XCircle,
    Eye,
    Monitor,
    Clock,
    FileText,
    Home,
    Mail
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function QuizViolation() {
    const navigate = useNavigate();
    const location = useLocation();
    
    // Get violation details from navigation state
    const violationData = location.state || {};
    const {
        quizTitle = 'Quiz',
        violations = [],
        timestamp = new Date().toISOString(),
        studentName = 'Student'
    } = violationData;

    const violationTypes = {
        'tab-switch': {
            icon: Monitor,
            title: 'Tab Switching Detected',
            description: 'You switched to another tab or window during the exam.',
            color: 'red'
        },
        'window-blur': {
            icon: Eye,
            title: 'Window Focus Lost',
            description: 'The exam window lost focus (you clicked outside the browser).',
            color: 'orange'
        },
        'screen-share-stopped': {
            icon: Monitor,
            title: 'Screen Sharing Stopped',
            description: 'You stopped sharing your screen during the exam.',
            color: 'red'
        },
        'multiple-violations': {
            icon: AlertTriangle,
            title: 'Multiple Violations',
            description: 'Multiple suspicious activities were detected during your exam.',
            color: 'red'
        }
    };

    const primaryViolation = violations[0] || 'multiple-violations';
    const violationInfo = violationTypes[primaryViolation] || violationTypes['multiple-violations'];
    const ViolationIcon = violationInfo.icon;

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24 relative overflow-hidden bg-white dark:bg-black">
                {/* Dramatic Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-orange-500/5" />
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[150px] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] -ml-40 -mb-40" />

                <div className="max-w-4xl mx-auto px-6 lg:px-10 py-12 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white dark:bg-gray-900 border-4 border-red-500 dark:border-red-600 rounded-[3rem] overflow-hidden shadow-2xl"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-red-500 to-rose-600 dark:from-red-600 dark:to-rose-700 p-8 md:p-12 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
                            
                            <div className="relative flex flex-col items-center text-center space-y-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring' }}
                                    className="w-24 h-24 rounded-3xl bg-white/20 backdrop-blur-sm flex items-center justify-center"
                                >
                                    <ShieldAlert className="w-14 h-14 text-white" />
                                </motion.div>
                                
                                <div>
                                    <motion.h1
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-3"
                                    >
                                        Exam Violation Detected
                                    </motion.h1>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-white/90 text-lg font-medium"
                                    >
                                        Your exam has been flagged for suspicious activity
                                    </motion.p>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8 md:p-12 space-y-8">
                            {/* Primary Violation */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                className="bg-red-50 dark:bg-red-500/10 border-2 border-red-200 dark:border-red-500/20 rounded-2xl p-6"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-xl bg-red-500 flex items-center justify-center shrink-0">
                                        <ViolationIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase mb-2">
                                            {violationInfo.title}
                                        </h2>
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                            {violationInfo.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Violation Details */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="bg-gray-50 dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 rounded-2xl p-6 space-y-4"
                            >
                                <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase flex items-center gap-2">
                                    <FileText className="w-5 h-5" />
                                    Violation Details
                                </h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                                            Quiz
                                        </p>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                                            {quizTitle}
                                        </p>
                                    </div>
                                    
                                    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                                            Time
                                        </p>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                                            {new Date(timestamp).toLocaleString()}
                                        </p>
                                    </div>
                                    
                                    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                                            Student
                                        </p>
                                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                                            {studentName}
                                        </p>
                                    </div>
                                    
                                    <div className="bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                                            Violations
                                        </p>
                                        <p className="text-sm font-bold text-red-600 dark:text-red-400">
                                            {violations.length} detected
                                        </p>
                                    </div>
                                </div>

                                {violations.length > 1 && (
                                    <div className="mt-4 bg-white dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
                                        <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">
                                            All Violations
                                        </p>
                                        <ul className="space-y-2">
                                            {violations.map((violation, index) => (
                                                <li key={index} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                                    <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                                                    {violationTypes[violation]?.title || violation}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </motion.div>

                            {/* What Happens Next */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="bg-orange-50 dark:bg-orange-500/10 border-2 border-orange-200 dark:border-orange-500/20 rounded-2xl p-6"
                            >
                                <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase mb-4 flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-orange-600 dark:text-orange-500" />
                                    What Happens Next
                                </h3>
                                
                                <ul className="space-y-3">
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                            1
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            Your exam submission has been <strong>flagged for review</strong> by the instructor.
                                        </p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                            2
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            All <strong>recordings and activity logs</strong> will be reviewed by authorized personnel.
                                        </p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                            3
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            You will be <strong>contacted via email</strong> regarding the outcome of the review.
                                        </p>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                                            4
                                        </div>
                                        <p className="text-sm text-gray-700 dark:text-gray-300">
                                            Depending on the severity, <strong>disciplinary actions</strong> may be taken according to institutional policies.
                                        </p>
                                    </li>
                                </ul>
                            </motion.div>

                            {/* Important Notice */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="bg-blue-50 dark:bg-blue-500/10 border-2 border-blue-200 dark:border-blue-500/20 rounded-2xl p-6"
                            >
                                <div className="flex items-start gap-4">
                                    <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400 shrink-0 mt-1" />
                                    <div>
                                        <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase mb-2">
                                            Important Notice
                                        </h3>
                                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                                            If you believe this was a mistake or have a valid explanation for the detected activity, 
                                            please contact your instructor or the academic integrity office immediately.
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 italic">
                                            All violations are recorded with timestamps and will be part of your academic record pending review.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Actions */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                className="flex flex-col sm:flex-row gap-4 pt-4"
                            >
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    className="flex-1 px-8 py-4 rounded-2xl bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-black uppercase text-sm tracking-wide transition-all hover:scale-[1.02] active:scale-95 shadow-lg flex items-center justify-center gap-2"
                                >
                                    <Home className="w-5 h-5" />
                                    Return to Dashboard
                                </button>
                                
                                <button
                                    onClick={() => window.location.href = 'mailto:support@techxplora.com?subject=Quiz Violation Appeal'}
                                    className="flex-1 px-8 py-4 rounded-2xl bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 font-black uppercase text-sm tracking-wide transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                                >
                                    <Mail className="w-5 h-5" />
                                    Contact Support
                                </button>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Footer Warning */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-8 text-center"
                    >
                        <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                            This incident has been logged and will be reviewed by authorized personnel.
                        </p>
                    </motion.div>
                </div>
            </div>
        </DashboardLayout>
    );
}
