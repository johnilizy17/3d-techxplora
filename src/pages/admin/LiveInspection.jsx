import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
    Video,
    Monitor,
    AlertTriangle,
    Users,
    Eye,
    Maximize2,
    Volume2,
    VolumeX,
    Search,
    Grid3x3,
    Grid2x2
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import { useWebRTCStream } from '@/hooks/useWebRTCStream';
import { cn } from '@/lib/utils';

export default function LiveInspection() {
    const user = useSelector(selectCurrentUser);
    const location = useLocation();
    const [quizCode, setQuizCode] = useState('');
    const [selectedStream, setSelectedStream] = useState(null);
    const [gridSize, setGridSize] = useState(4); // 4, 6, 9, 12
    const [searchQuery, setSearchQuery] = useState('');
    const videoRefs = useRef({});

    // Get quiz code from URL query parameter on mount
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const quizParam = queryParams.get('quiz');
        if (quizParam) {
            setQuizCode(quizParam.toUpperCase());
        }
    }, [location.search]);

    // WebRTC streaming hook - teacher/admin role
    const { isStreaming, peers, error } = useWebRTCStream(
        user?.id,
        quizCode,
        'teacher'
    );

    // Convert peers object to array for rendering
    const peerStreams = Object.entries(peers).map(([peerId, peerData]) => ({
        id: peerId,
        stream: peerData.stream,
        studentInfo: { name: `Student ${peerId}` },
        quizInfo: { code: quizCode, title: 'Quiz Session' },
        progress: { currentQuestion: 0, totalQuestions: 0 },
        violationCount: 0,
        violations: []
    }));

    // Filter streams
    const filteredStreams = peerStreams.filter(stream => {
        const matchesSearch = searchQuery === '' || 
            stream.studentInfo?.name?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesSearch;
    });

    // Set video stream when peer stream is available
    useEffect(() => {
        Object.entries(peers).forEach(([peerId, peerData]) => {
            const videoElement = videoRefs.current[peerId];
            if (videoElement && peerData.stream) {
                console.log('Setting video stream for peer:', peerId);
                videoElement.srcObject = peerData.stream;
            }
        });
    }, [peers]);

    return (
        <DashboardLayout>
            <div className="min-h-screen pb-24 bg-white dark:bg-black">
                {/* Header */}
                <div className="border-b-2 border-gray-200 dark:border-white/10 bg-white dark:bg-black/50 backdrop-blur-xl sticky top-0 z-40">
                    <div className="max-w-[1800px] mx-auto px-6 lg:px-10 py-6">
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                            <div className="space-y-2">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                                        <Eye size={24} />
                                    </div>
                                    <div>
                                        <h1 className="text-3xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
                                            Live Inspection
                                        </h1>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className={cn(
                                                "w-2 h-2 rounded-full",
                                                isStreaming ? "bg-green-500 animate-pulse" : "bg-orange-500"
                                            )} />
                                            <span className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                                                {isStreaming ? 'Connected' : 'Waiting for connection'}
                                            </span>
                                        </div>
                                        {error && (
                                            <p className="text-xs text-red-500 font-medium mt-1">
                                                Error: {error}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex items-center gap-4">
                                <div className="px-6 py-3 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-500/10 dark:to-indigo-500/10 border-2 border-blue-300 dark:border-blue-500/20 rounded-2xl">
                                    <div className="flex items-center gap-3">
                                        <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                                        <div>
                                            <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Active Students</p>
                                            <p className="text-2xl font-black text-blue-900 dark:text-blue-300">{filteredStreams.length}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="mt-6 flex flex-col lg:flex-row gap-4">
                            {/* Quiz Code Input */}
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Enter Quiz Code to monitor..."
                                    value={quizCode}
                                    onChange={(e) => setQuizCode(e.target.value.toUpperCase())}
                                    className="w-full px-4 py-3 bg-gray-100 dark:bg-white/5 border-2 border-gray-300 dark:border-white/10 rounded-2xl text-sm font-bold text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 uppercase tracking-wider"
                                />
                            </div>

                            {/* Search */}
                            <div className="flex-1 relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by student name..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-white/5 border-2 border-gray-300 dark:border-white/10 rounded-2xl text-sm font-medium text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400"
                                />
                            </div>

                            {/* Grid Size */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-gray-100 dark:bg-white/5 border-2 border-gray-300 dark:border-white/10 rounded-2xl">
                                <button
                                    onClick={() => setGridSize(4)}
                                    className={cn(
                                        "p-2 rounded-lg transition-colors",
                                        gridSize === 4 ? "bg-indigo-500 text-white" : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
                                    )}
                                >
                                    <Grid2x2 size={18} />
                                </button>
                                <button
                                    onClick={() => setGridSize(9)}
                                    className={cn(
                                        "p-2 rounded-lg transition-colors",
                                        gridSize === 9 ? "bg-indigo-500 text-white" : "text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
                                    )}
                                >
                                    <Grid3x3 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Streams Grid */}
                <div className="max-w-[1800px] mx-auto px-6 lg:px-10 py-8">
                    {!quizCode ? (
                        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
                            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-500/10 dark:to-purple-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400 border-2 border-indigo-200 dark:border-indigo-500/20">
                                <Eye size={40} />
                            </div>
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
                                    Enter Quiz Code
                                </h2>
                                <p className="text-gray-600 dark:text-white/40 text-sm max-w-xs mx-auto font-medium">
                                    Enter a quiz code above to start monitoring student video streams
                                </p>
                            </div>
                        </div>
                    ) : filteredStreams.length === 0 ? (
                        <div className="flex flex-col items-center justify-center min-h-[60vh] gap-6">
                            <div className="w-20 h-20 rounded-3xl bg-gray-100 dark:bg-white/5 flex items-center justify-center text-gray-400 dark:text-white/20 border-2 border-gray-200 dark:border-white/10">
                                <Video size={40} />
                            </div>
                            <div className="text-center space-y-2">
                                <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
                                    No Active Streams
                                </h2>
                                <p className="text-gray-600 dark:text-white/40 text-sm max-w-xs mx-auto font-medium">
                                    Waiting for students to start quiz {quizCode}...
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className={cn(
                            "grid gap-6",
                            gridSize === 4 && "grid-cols-1 md:grid-cols-2",
                            gridSize === 9 && "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                        )}>
                            {filteredStreams.map((stream) => (
                                <StreamCard
                                    key={stream.id}
                                    stream={stream}
                                    onSelect={() => setSelectedStream(stream)}
                                    videoRef={(el) => videoRefs.current[stream.id] = el}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Full Screen Modal */}
                {selectedStream && (
                    <StreamModal
                        stream={selectedStream}
                        onClose={() => setSelectedStream(null)}
                    />
                )}
            </div>
        </DashboardLayout>
    );
}

// Stream Card Component
function StreamCard({ stream, onSelect, videoRef }) {
    const [isMuted, setIsMuted] = useState(true);
    const [showControls, setShowControls] = useState(false);

    const hasViolations = (stream.violationCount || 0) > 0;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative group"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
            <div className={cn(
                "relative bg-black rounded-3xl overflow-hidden border-4 transition-all",
                hasViolations 
                    ? "border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]" 
                    : "border-gray-300 dark:border-white/10 shadow-xl"
            )}>
                {/* Video Container */}
                <div className="aspect-video bg-gray-900 relative">
                    {/* Camera Feed */}
                    <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted={isMuted}
                        className="w-full h-full object-cover"
                    />

                    {/* Screen Feed (Picture-in-Picture) */}
                    <div className="absolute bottom-4 right-4 w-1/3 aspect-video bg-gray-800 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg">
                        <video
                            autoPlay
                            playsInline
                            muted
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg">
                            <div className="flex items-center gap-1">
                                <Monitor className="w-3 h-3 text-white" />
                                <span className="text-[8px] font-bold text-white uppercase tracking-wider">Screen</span>
                            </div>
                        </div>
                    </div>

                    {/* Violation Badge */}
                    {hasViolations && (
                        <div className="absolute top-4 right-4 px-3 py-2 bg-red-500 rounded-xl shadow-lg animate-pulse">
                            <div className="flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 text-white" />
                                <span className="text-xs font-black text-white uppercase tracking-wider">
                                    {stream.violationCount} Violation{stream.violationCount > 1 ? 's' : ''}
                                </span>
                            </div>
                        </div>
                    )}

                    {/* Recording Indicator */}
                    <div className="absolute top-4 left-4 px-3 py-2 bg-red-500/90 backdrop-blur-sm rounded-xl shadow-lg">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                            <span className="text-xs font-black text-white uppercase tracking-wider">Live</span>
                        </div>
                    </div>

                    {/* Controls Overlay */}
                    {showControls && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center gap-4"
                        >
                            <button
                                onClick={() => setIsMuted(!isMuted)}
                                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                            >
                                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                            </button>
                            <button
                                onClick={onSelect}
                                className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                            >
                                <Maximize2 size={20} />
                            </button>
                        </motion.div>
                    )}
                </div>

                {/* Info Bar */}
                <div className="p-4 bg-white dark:bg-gray-900 border-t-2 border-gray-200 dark:border-white/10">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">
                                {stream.studentInfo?.name || 'Unknown Student'}
                            </h3>
                            <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                                {stream.quizInfo?.title || 'Unknown Quiz'}
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                                Progress
                            </p>
                            <p className="text-lg font-black text-indigo-600 dark:text-indigo-400">
                                {stream.progress?.currentQuestion || 0}/{stream.progress?.totalQuestions || 0}
                            </p>
                        </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="h-1.5 w-full bg-gray-200 dark:bg-white/5 rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-300"
                            style={{ 
                                width: `${((stream.progress?.currentQuestion || 0) / (stream.progress?.totalQuestions || 1)) * 100}%` 
                            }}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Full Screen Stream Modal
function StreamModal({ stream, onClose }) {
    const [isMuted, setIsMuted] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={onClose}
        >
            <div className="w-full max-w-7xl" onClick={(e) => e.stopPropagation()}>
                <div className="bg-black rounded-3xl overflow-hidden border-4 border-white/10 shadow-2xl">
                    {/* Header */}
                    <div className="p-6 bg-gray-900 border-b-2 border-white/10 flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">
                                {stream.studentInfo?.name || 'Unknown Student'}
                            </h2>
                            <p className="text-sm text-gray-400 font-medium mt-1">
                                {stream.quizInfo?.title || 'Unknown Quiz'} • {stream.quizInfo?.code}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                        >
                            ✕
                        </button>
                    </div>

                    {/* Video */}
                    <div className="aspect-video bg-gray-900">
                        <video
                            autoPlay
                            playsInline
                            muted={isMuted}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Controls */}
                    <div className="p-6 bg-gray-900 border-t-2 border-white/10 flex items-center justify-between">
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="px-6 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold uppercase text-sm tracking-wide transition-colors flex items-center gap-2"
                        >
                            {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
                            {isMuted ? 'Unmute' : 'Mute'}
                        </button>

                        {stream.violationCount > 0 && (
                            <div className="px-6 py-3 rounded-2xl bg-red-500/20 border-2 border-red-500/50 flex items-center gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-500" />
                                <span className="text-sm font-black text-red-500 uppercase tracking-wider">
                                    {stream.violationCount} Violation{stream.violationCount > 1 ? 's' : ''}
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
