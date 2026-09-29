import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    ShieldX, 
    Lock, 
    ArrowLeft, 
    Home, 
    AlertTriangle,
    BookOpen
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';

export default function CourseAccessDenied() {
    const navigate = useNavigate();
    const location = useLocation();
    const courseTitle = location.state?.courseTitle || 'this course';

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24 relative overflow-hidden bg-gradient-to-br from-rose-50 via-white to-orange-50 dark:bg-black">
                {/* Decorative Background */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-rose-200/30 dark:bg-rose-600/5 rounded-full blur-[120px] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-200/30 dark:bg-orange-600/5 rounded-full blur-[100px] -ml-40 -mb-40" />

                <div className="max-w-4xl mx-auto px-6 lg:px-10 py-20 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-12"
                    >
                        {/* Icon */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="flex justify-center"
                        >
                            <div className="relative">
                                {/* Outer glow ring */}
                                <motion.div
                                    animate={{
                                        scale: [1, 1.1, 1],
                                        opacity: [0.3, 0.5, 0.3]
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="absolute inset-0 bg-rose-500/20 dark:bg-rose-500/10 rounded-full blur-2xl"
                                />
                                
                                {/* Main icon container */}
                                <div className="relative w-32 h-32 bg-gradient-to-br from-rose-500 to-orange-600 dark:from-rose-500/20 dark:to-orange-500/20 rounded-3xl flex items-center justify-center shadow-2xl shadow-rose-500/20 dark:shadow-rose-500/10 border-4 border-white dark:border-rose-500/20 rotate-6">
                                    <ShieldX size={64} className="text-white dark:text-rose-400" strokeWidth={2} />
                                </div>

                                {/* Small lock badge */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.4, type: "spring" }}
                                    className="absolute -bottom-2 -right-2 w-12 h-12 bg-orange-500 dark:bg-orange-500/20 rounded-xl flex items-center justify-center shadow-lg border-2 border-white dark:border-orange-500/30"
                                >
                                    <Lock size={20} className="text-white dark:text-orange-400" />
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Content */}
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="space-y-3"
                            >
                                <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
                                    Access <span className="text-rose-600 dark:text-rose-400">Denied</span>
                                </h1>
                                <p className="text-sm md:text-base text-gray-600 dark:text-white/60 font-medium max-w-2xl mx-auto">
                                    You don't have permission to access this course
                                </p>
                            </motion.div>

                            {/* Info Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="max-w-2xl mx-auto"
                            >
                                <div className="bg-white dark:bg-white/5 border-2 border-rose-200 dark:border-white/10 rounded-3xl p-8 shadow-xl">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-rose-100 dark:bg-rose-500/10 flex items-center justify-center shrink-0">
                                            <AlertTriangle size={24} className="text-rose-600 dark:text-rose-400" />
                                        </div>
                                        <div className="text-left space-y-3">
                                            <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase italic tracking-tight">
                                                Not the Course Creator
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-white/60 font-medium leading-relaxed">
                                                You are trying to access <span className="font-bold text-gray-900 dark:text-white">"{courseTitle}"</span>, but you are not the direct creator of this course. Only the course creator can edit or manage this content.
                                            </p>
                                            
                                            {/* What you can do */}
                                            <div className="pt-4 border-t-2 border-gray-200 dark:border-white/5">
                                                <p className="text-xs font-black text-gray-500 dark:text-white/40 uppercase tracking-wider mb-3">
                                                    What you can do:
                                                </p>
                                                <ul className="space-y-2 text-sm text-gray-600 dark:text-white/60">
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-rose-500 dark:text-rose-400 mt-0.5">•</span>
                                                        <span>View your own courses from the dashboard</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-rose-500 dark:text-rose-400 mt-0.5">•</span>
                                                        <span>Create a new course if you're a teacher</span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <span className="text-rose-500 dark:text-rose-400 mt-0.5">•</span>
                                                        <span>Contact the course creator for collaboration</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Action Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8"
                        >
                            <button
                                onClick={() => navigate(-1)}
                                className="w-full sm:w-auto px-8 h-16 bg-gray-200 dark:bg-white/5 border-2 border-gray-300 dark:border-white/10 text-gray-700 dark:text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-gray-300 dark:hover:bg-white/10 transition-all active:scale-95 shadow-lg"
                            >
                                <ArrowLeft size={18} />
                                Go Back
                            </button>

                            <button
                                onClick={() => navigate('/dashboard')}
                                className="w-full sm:w-auto px-8 h-16 bg-gradient-to-r from-rose-500 to-orange-600 dark:from-rose-500 dark:to-orange-500 hover:from-rose-600 hover:to-orange-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all active:scale-95 shadow-2xl shadow-rose-500/20"
                            >
                                <Home size={18} />
                                Go to Dashboard
                            </button>

                            <button
                                onClick={() => navigate('/dashboard/courses')}
                                className="w-full sm:w-auto px-8 h-16 bg-white dark:bg-white/10 border-2 border-rose-200 dark:border-white/20 text-rose-600 dark:text-rose-400 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-rose-50 dark:hover:bg-white/20 transition-all active:scale-95 shadow-lg"
                            >
                                <BookOpen size={18} />
                                My Courses
                            </button>
                        </motion.div>

                        {/* Help Text */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="pt-8"
                        >
                            <p className="text-xs text-gray-500 dark:text-white/40 font-medium">
                                Need help? Contact support or check our{' '}
                                <button 
                                    onClick={() => navigate('/help')}
                                    className="text-rose-600 dark:text-rose-400 hover:underline font-bold"
                                >
                                    help center
                                </button>
                            </p>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </DashboardLayout>
    );
}
