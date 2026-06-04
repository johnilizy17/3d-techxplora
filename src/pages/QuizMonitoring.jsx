import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useWebRTCStream } from '@/hooks/useWebRTCStream';
import {
    useGetStreamsByQuizCodeQuery,
    useGetLiveStreamSummaryQuery,
} from '@/redux/api/userStreamApi';
import {
    Activity,
    Users,
    Clock,
    CheckCircle,
    XCircle,
    Eye,
    Radio,
    ArrowLeft,
    RefreshCw,
    TrendingUp,
    AlertCircle,
    Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/authSlice';

export default function QuizMonitoring() {
    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const queryParams = new URLSearchParams(location.search);
    const quizCode = queryParams.get('code');

    const [autoRefresh, setAutoRefresh] = useState(true);
    const [selectedUser, setSelectedUser] = useState(null);
    const videoRefs = useRef({});

    // WebRTC streaming hook for teacher
    const { peers } = useWebRTCStream(user?.id, quizCode, 'teacher');

    // Log peers changes
    useEffect(() => {
        console.log('QuizMonitoring: Peers updated', {
            peerCount: Object.keys(peers).length,
            peerIds: Object.keys(peers),
            peers: Object.entries(peers).map(([id, data]) => ({
                id,
                hasConnection: !!data.connection,
                hasStream: !!data.stream,
                streamId: data.stream?.id,
                tracks: data.stream?.getTracks().length
            }))
        });
    }, [peers]);

    // Fetch live stream summary
    const {
        data: summaryData,
        isLoading: isSummaryLoading,
        refetch: refetchSummary,
    } = useGetLiveStreamSummaryQuery(quizCode, {
        skip: !quizCode,
        pollingInterval: autoRefresh ? 5000 : 0, // Auto-refresh every 5 seconds
    });

    // Fetch all streams
    const {
        data: streamsData,
        isLoading: isStreamsLoading,
        refetch: refetchStreams,
    } = useGetStreamsByQuizCodeQuery(
        { quizCode },
        {
            skip: !quizCode,
            pollingInterval: autoRefresh ? 5000 : 0,
        }
    );

    // Extract summary data - API returns { success: true, data: { stats object } }
    const summary = summaryData?.data || null;
    
    // Handle both paginated response (data.data.data) and direct array response (data.data or data)
    const rawStreams = streamsData?.data?.data || streamsData?.data || streamsData || [];
    const streams = Array.isArray(rawStreams) ? rawStreams : [];

    console.log('Summary Data:', summaryData);
    console.log('Extracted Summary:', summary);
    console.log('Streams Data:', streamsData);
    console.log('Extracted Streams:', streams);
    console.log('WebRTC Peers:', peers);

    // Update video elements when peers change
    useEffect(() => {
        console.log('QuizMonitoring: Updating video elements', {
            peerIds: Object.keys(peers),
            videoRefKeys: Object.keys(videoRefs.current)
        });
        
        Object.entries(peers).forEach(([peerId, peerData]) => {
            const videoElement = videoRefs.current[peerId];
            console.log('QuizMonitoring: Setting video for peer', {
                peerId,
                hasVideoElement: !!videoElement,
                hasStream: !!peerData.stream,
                streamId: peerData.stream?.id
            });
            
            if (videoElement && peerData.stream) {
                videoElement.srcObject = peerData.stream;
                console.log('QuizMonitoring: Video srcObject set for peer', peerId);
            }
        });
    }, [peers]);

    // Group streams by user
    const streamsByUser = streams.reduce((acc, stream) => {
        const userId = stream.user_id;
        if (!acc[userId]) {
            acc[userId] = {
                user: stream.user,
                activities: [],
            };
        }
        acc[userId].activities.push(stream);
        return acc;
    }, {});

    const handleRefresh = () => {
        refetchSummary();
        refetchStreams();
    };

    if (!quizCode) {
        return (
            <DashboardLayout>
                <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
                    <AlertCircle size={48} className="text-rose-500" />
                    <div className="text-center">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white">No Quiz Code</h2>
                        <p className="text-gray-600 dark:text-white/60 mt-2">
                            Please provide a quiz code to monitor
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/dashboard/quizzes')}
                        className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors"
                    >
                        Back to Quizzes
                    </button>
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div className="space-y-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="flex items-center gap-2 text-gray-600 dark:text-white/40 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                            >
                                <ArrowLeft size={16} />
                                <span className="text-sm font-bold uppercase tracking-wider">Back</span>
                            </button>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
                                    Live <span className="text-indigo-600 dark:text-indigo-400">Monitoring</span>
                                </h1>
                                <p className="text-gray-600 dark:text-white/60 mt-2 font-medium">
                                    Quiz Code: <span className="font-black text-gray-900 dark:text-white">{quizCode}</span>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setAutoRefresh(!autoRefresh)}
                                className={cn(
                                    'px-6 py-3 rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2',
                                    autoRefresh
                                        ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border-2 border-emerald-300 dark:border-emerald-500/20'
                                        : 'bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white/60 border-2 border-gray-300 dark:border-white/10'
                                )}
                            >
                                <Radio size={16} className={autoRefresh ? 'animate-pulse' : ''} />
                                {autoRefresh ? 'Live' : 'Paused'}
                            </button>
                            <button
                                onClick={handleRefresh}
                                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-sm uppercase tracking-wider transition-all flex items-center gap-2"
                            >
                                <RefreshCw size={16} />
                                Refresh
                            </button>
                        </div>
                    </div>

                    {/* Summary Cards */}
                    {isSummaryLoading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                        </div>
                    ) : summary && summary.total_participants !== undefined ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/5 dark:to-indigo-500/5 border-2 border-blue-200 dark:border-blue-500/20 rounded-2xl p-6 shadow-lg"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-blue-500 flex items-center justify-center">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                </div>
                                <p className="text-3xl font-black text-gray-900 dark:text-white mb-1">
                                    {summary.total_participants || 0}
                                </p>
                                <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                                    Total Participants
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-500/5 dark:to-teal-500/5 border-2 border-emerald-200 dark:border-emerald-500/20 rounded-2xl p-6 shadow-lg"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center">
                                        <Activity className="w-6 h-6 text-white" />
                                    </div>
                                    <Radio className="w-5 h-5 text-emerald-600 dark:text-emerald-400 animate-pulse" />
                                </div>
                                <p className="text-3xl font-black text-gray-900 dark:text-white mb-1">
                                    {summary.active_participants || 0}
                                </p>
                                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                                    Currently Active
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                                className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-500/5 dark:to-pink-500/5 border-2 border-purple-200 dark:border-purple-500/20 rounded-2xl p-6 shadow-lg"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-purple-500 flex items-center justify-center">
                                        <CheckCircle className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <p className="text-3xl font-black text-gray-900 dark:text-white mb-1">
                                    {summary.completed_participants || 0}
                                </p>
                                <p className="text-xs font-bold text-purple-600 dark:text-purple-400 uppercase tracking-wider">
                                    Completed
                                </p>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-500/5 dark:to-orange-500/5 border-2 border-amber-200 dark:border-amber-500/20 rounded-2xl p-6 shadow-lg"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center">
                                        <Clock className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <p className="text-3xl font-black text-gray-900 dark:text-white mb-1">
                                    {summary.avg_time_per_question ? `${summary.avg_time_per_question}s` : 'N/A'}
                                </p>
                                <p className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                                    Avg Time/Question
                                </p>
                            </motion.div>
                        </div>
                    ) : (
                        <div className="bg-amber-50 dark:bg-amber-500/5 border-2 border-amber-200 dark:border-amber-500/20 rounded-2xl p-6 mb-12 flex items-center gap-4">
                            <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
                            <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">
                                No summary data available yet. Statistics will appear once students start taking the quiz.
                            </p>
                        </div>
                    )}

                    {/* User Activity Streams */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
                            Student Activity
                        </h2>

                        {/* Show WebRTC peers even if no activity streams yet */}
                        {Object.keys(peers).length > 0 && (
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                                    Live Video Streams ({Object.keys(peers).length})
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {Object.entries(peers).map(([peerId, peerData]) => (
                                        <div key={peerId} className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
                                            <video
                                                ref={el => videoRefs.current[peerId] = el}
                                                autoPlay
                                                playsInline
                                                muted
                                                className="w-full h-full object-cover"
                                            />
                                            <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 bg-red-500/90 backdrop-blur-sm rounded-full">
                                                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                                <span className="text-white text-xs font-black uppercase tracking-wider">Live</span>
                                            </div>
                                            <div className="absolute bottom-3 left-3 px-3 py-1.5 bg-black/70 backdrop-blur-sm rounded-lg">
                                                <span className="text-white text-xs font-bold">User {peerId}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {isStreamsLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin" />
                            </div>
                        ) : Object.keys(streamsByUser).length === 0 ? (
                            <div className="text-center py-12 bg-gray-50 dark:bg-white/5 rounded-2xl border-2 border-gray-200 dark:border-white/10">
                                <Eye size={48} className="mx-auto text-gray-400 dark:text-white/20 mb-4" />
                                <p className="text-gray-600 dark:text-white/60 font-medium">
                                    No activity recorded yet
                                </p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6">
                                {Object.entries(streamsByUser).map(([userId, userData]) => (
                                    <motion.div
                                        key={userId}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                                    >
                                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                                            {/* Left: User Info & Video Preview */}
                                            <div className="lg:col-span-1 space-y-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-black text-lg shrink-0">
                                                        {userData.user?.first_name?.[0] || 'U'}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="text-lg font-black text-gray-900 dark:text-white truncate">
                                                            {userData.user?.first_name} {userData.user?.last_name}
                                                        </h3>
                                                        <p className="text-sm text-gray-600 dark:text-white/60 truncate">
                                                            {userData.user?.email}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Video Preview */}
                                                <div className="relative aspect-video bg-gray-900 rounded-xl overflow-hidden">
                                                    {peers[userId] && peers[userId].stream ? (
                                                        <video
                                                            ref={el => videoRefs.current[userId] = el}
                                                            autoPlay
                                                            playsInline
                                                            muted
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                                                            <div className="w-16 h-16 rounded-full bg-gray-800 flex items-center justify-center">
                                                                <Eye size={32} className="text-gray-600" />
                                                            </div>
                                                            <p className="text-gray-500 text-xs font-medium text-center px-4">
                                                                {userData.activities.some(a => 
                                                                    new Date(a.activity_timestamp) > new Date(Date.now() - 2 * 60 * 1000)
                                                                ) ? 'Connecting to video stream...' : 'Student not streaming'}
                                                            </p>
                                                        </div>
                                                    )}
                                                    {/* Live indicator if streaming */}
                                                    {peers[userId] && peers[userId].stream && (
                                                        <div className="absolute top-3 right-3 flex items-center gap-2 px-3 py-1.5 bg-red-500/90 backdrop-blur-sm rounded-full">
                                                            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                                            <span className="text-white text-xs font-black uppercase tracking-wider">Live</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Activity Stats */}
                                                <div className="grid grid-cols-2 gap-3">
                                                    <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3 text-center">
                                                        <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                                                            {userData.activities.length}
                                                        </p>
                                                        <p className="text-xs text-gray-600 dark:text-white/40 font-bold uppercase tracking-wider">
                                                            Activities
                                                        </p>
                                                    </div>
                                                    <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-3 text-center">
                                                        <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                                                            {userData.activities.filter(a => a.activity_type === 'question_answered').length}
                                                        </p>
                                                        <p className="text-xs text-gray-600 dark:text-white/40 font-bold uppercase tracking-wider">
                                                            Answered
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Right: Activity Timeline */}
                                            <div className="lg:col-span-2">
                                                <div className="flex items-center justify-between mb-4">
                                                    <h4 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-wider">
                                                        Activity Timeline
                                                    </h4>
                                                    <div className="text-xs text-gray-500 dark:text-white/40 font-medium">
                                                        Last activity: {new Date(userData.activities[0]?.activity_timestamp).toLocaleTimeString()}
                                                    </div>
                                                </div>

                                                {/* Activity Timeline */}
                                                <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                                                    {userData.activities
                                                        .sort((a, b) => new Date(b.activity_timestamp) - new Date(a.activity_timestamp))
                                                        .map((activity, idx) => (
                                                            <div
                                                                key={idx}
                                                                className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5 hover:border-indigo-300 dark:hover:border-indigo-500/30 transition-colors"
                                                            >
                                                                <div className={cn(
                                                                    'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
                                                                    activity.activity_type === 'quiz_start' && 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400',
                                                                    activity.activity_type === 'question_viewed' && 'bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400',
                                                                    activity.activity_type === 'question_answered' && 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
                                                                    activity.activity_type === 'question_skipped' && 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400',
                                                                    activity.activity_type === 'quiz_completed' && 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400',
                                                                    activity.activity_type === 'quiz_abandoned' && 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                                                                )}>
                                                                    {activity.activity_type === 'quiz_start' && <Activity size={18} />}
                                                                    {activity.activity_type === 'question_viewed' && <Eye size={18} />}
                                                                    {activity.activity_type === 'question_answered' && <CheckCircle size={18} />}
                                                                    {activity.activity_type === 'question_skipped' && <Clock size={18} />}
                                                                    {activity.activity_type === 'quiz_completed' && <CheckCircle size={18} />}
                                                                    {activity.activity_type === 'quiz_abandoned' && <XCircle size={18} />}
                                                                </div>
                                                                <div className="flex-1 min-w-0">
                                                                    <div className="flex items-center justify-between gap-2 mb-1">
                                                                        <p className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">
                                                                            {activity.activity_type.replace(/_/g, ' ')}
                                                                        </p>
                                                                        <p className="text-xs text-gray-500 dark:text-white/40 shrink-0">
                                                                            {new Date(activity.activity_timestamp).toLocaleTimeString()}
                                                                        </p>
                                                                    </div>
                                                                    {activity.activity_data && (
                                                                        <div className="text-xs text-gray-600 dark:text-white/60 space-y-1">
                                                                            {activity.activity_data.question_number && (
                                                                                <p>Question #{activity.activity_data.question_number}</p>
                                                                            )}
                                                                            {activity.activity_data.time_spent_seconds && (
                                                                                <p>Time: {activity.activity_data.time_spent_seconds}s</p>
                                                                            )}
                                                                            {activity.activity_data.is_correct !== null && activity.activity_data.is_correct !== undefined && (
                                                                                <p className={activity.activity_data.is_correct ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                                                                                    {activity.activity_data.is_correct ? '✓ Correct' : '✗ Incorrect'}
                                                                                </p>
                                                                            )}
                                                                            {activity.activity_data.score !== undefined && (
                                                                                <p className="font-bold">Score: {activity.activity_data.score}/{activity.activity_data.total_questions}</p>
                                                                            )}
                                                                        </div>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
