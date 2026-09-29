import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Radio, Users, Clock, Eye, Search, Loader2, AlertCircle } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useGetLiveQuizzesQuery, useLazyVerifyQuizCodeQuery } from '@/redux/api/studentApi';
import { toast } from 'sonner';
import VerifyQuizModal from '@/components/dashboard/VerifyQuizModal';

export default function ViewLiveQuiz() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const codeFromUrl = searchParams.get('code');
    
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [isVerifyModalOpen, setIsVerifyModalOpen] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null);

    // Fetch live quizzes from API
    const { data: liveQuizzesData, isLoading, error } = useGetLiveQuizzesQuery({
        per_page: 20,
        page: currentPage,
    });

    // Lazy query for verifying specific quiz code
    const [verifyCode, { isFetching: isVerifying }] = useLazyVerifyQuizCodeQuery();

    // If code is passed from URL, verify it automatically
    useEffect(() => {
        if (codeFromUrl) {
            handleVerifyQuizCode(codeFromUrl);
        }
    }, [codeFromUrl]);

    const handleVerifyQuizCode = async (code) => {
        try {
            const result = await verifyCode(code).unwrap();
            setSelectedQuiz(result.data || result);
            setIsVerifyModalOpen(true);
            toast.success('Quiz found!');
        } catch (error) {
            console.error('Verification failed:', error);
            toast.error(error?.data?.message || 'Invalid quiz code or quiz not found');
        }
    };

    // Handle error
    if (error) {
        toast.error('Failed to load live quizzes');
    }

    // Extract quizzes from response
    const liveQuizzes = liveQuizzesData?.data?.data || liveQuizzesData?.data || [];

    const filteredQuizzes = liveQuizzes.filter(quiz =>
        quiz.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.quiz_code?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24 relative overflow-hidden bg-white dark:bg-black">
                {/* Purple Background Glows */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-200/30 dark:bg-purple-600/5 rounded-full blur-[120px] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-200/30 dark:bg-violet-600/5 rounded-full blur-[100px] -ml-40 -mb-40" />

                <div className="max-w-7xl mx-auto px-6 lg:px-10 py-12 relative z-10">
                    {/* Header */}
                    <div className="mb-12">
                        <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => navigate('/dashboard')}
                            className="flex items-center gap-2 text-[10px] font-black text-gray-400 dark:text-white/20 uppercase tracking-[0.2em] hover:text-purple-600 dark:hover:text-purple-400 transition-colors group mb-6"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Go Back
                        </motion.button>

                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-violet-600 dark:from-purple-400 dark:to-violet-500 flex items-center justify-center shadow-xl shadow-purple-500/20">
                                <Radio size={32} className="text-white" />
                            </div>
                            <div>
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white italic tracking-tighter uppercase leading-none">
                                    Live <span className="text-purple-600 dark:text-purple-400">Quizzes</span>
                                </h1>
                                <p className="text-gray-600 dark:text-white/40 font-medium mt-2">
                                    Monitor ongoing quizzes in real-time
                                </p>
                            </div>
                        </div>

                        {/* Search Bar */}
                        <div className="relative max-w-2xl">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/40" size={20} />
                            <input
                                type="text"
                                placeholder="Search by quiz name or code..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full h-14 pl-12 pr-4 bg-white dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-2xl text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:border-purple-500 dark:focus:border-purple-400 focus:outline-none transition-colors font-medium"
                            />
                        </div>
                    </div>

                    {/* Live Quizzes Grid */}
                    {isLoading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-12 h-12 text-purple-600 dark:text-purple-400 animate-spin" />
                        </div>
                    ) : filteredQuizzes.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center py-20"
                        >
                            <div className="w-24 h-24 rounded-3xl bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center mx-auto mb-6">
                                <Radio size={40} className="text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-2">
                                No Live Quizzes
                            </h3>
                            <p className="text-gray-600 dark:text-white/40 font-medium">
                                {searchQuery ? 'No quizzes match your search' : 'There are currently no active quizzes'}
                            </p>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredQuizzes.map((quiz, index) => (
                                <motion.div
                                    key={quiz.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="group relative"
                                >
                                    {/* Live Indicator Pulse */}
                                    <div className="absolute -top-2 -right-2 z-10">
                                        <div className="relative">
                                            <div className="w-4 h-4 rounded-full bg-red-500 animate-pulse" />
                                            <div className="absolute inset-0 w-4 h-4 rounded-full bg-red-500 animate-ping opacity-75" />
                                        </div>
                                    </div>

                                    <div className="bg-white dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-3xl p-6 hover:border-purple-500 dark:hover:border-purple-400 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/10 group-hover:-translate-y-1">
                                        {/* Quiz Code Badge */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="px-3 py-1 bg-purple-100 dark:bg-purple-500/10 border-2 border-purple-300 dark:border-purple-500/20 rounded-full">
                                                <span className="text-xs font-black text-purple-700 dark:text-purple-400 uppercase tracking-wider">
                                                    {quiz.quiz_code}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1 text-red-500">
                                                <Radio size={14} className="animate-pulse" />
                                                <span className="text-xs font-bold uppercase">Live</span>
                                            </div>
                                        </div>

                                        {/* Quiz Title */}
                                        <h3 className="text-xl font-black text-gray-900 dark:text-white mb-4 line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                            {quiz.title}
                                        </h3>

                                        {/* Quiz Stats */}
                                        <div className="space-y-3 mb-6">
                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center">
                                                    <Users size={16} className="text-purple-600 dark:text-purple-400" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-600 dark:text-white/40 uppercase">Active Users</p>
                                                    <p className="font-black text-gray-900 dark:text-white">{quiz.active_users || 0}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 text-sm">
                                                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-500/10 flex items-center justify-center">
                                                    <Clock size={16} className="text-purple-600 dark:text-purple-400" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-600 dark:text-white/40 uppercase">Duration</p>
                                                    <p className="font-black text-gray-900 dark:text-white">
                                                        {quiz.duration ? `${quiz.duration} min` : 'Not set'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* View Button */}
                                        <button
                                            onClick={() => navigate(`/dashboard/quizzes/join?code=${quiz.quiz_code}`)}
                                            className="w-full h-12 bg-gradient-to-r from-purple-500 to-violet-600 dark:from-purple-400 dark:to-violet-500 hover:from-purple-600 hover:to-violet-700 text-white dark:text-black rounded-xl font-black uppercase tracking-wider text-sm flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95 shadow-lg shadow-purple-500/20"
                                        >
                                            <Eye size={18} />
                                            Join Quiz
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Verification Modal for quiz code from URL */}
                {selectedQuiz && (
                    <VerifyQuizModal
                        isOpen={isVerifyModalOpen}
                        onClose={() => {
                            setIsVerifyModalOpen(false);
                            setSelectedQuiz(null);
                            // Remove code from URL after closing modal
                            navigate('/dashboard/view-live-quiz', { replace: true });
                        }}
                        quiz={selectedQuiz}
                    />
                )}
            </div>
        </DashboardLayout>
    );
}
