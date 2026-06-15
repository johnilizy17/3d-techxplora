import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    ArrowLeft,
    Camera,
    Mic,
    CheckCircle,
    AlertCircle,
    Play,
    Loader2,
    Wifi,
    Sun,
    Volume2,
    Users,
    Monitor,
    AlertTriangle,
    XCircle,
    Info
} from 'lucide-react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useMediaRecording } from '@/hooks/useMediaRecording';
import { useEnvironmentCheck } from '@/hooks/useEnvironmentCheck';
import { useFaceDetection } from '@/hooks/useFaceDetection';
import { useWebRTCStream } from '@/hooks/useWebRTCStream';
import { selectCurrentUser, selectTempStorage } from '@/redux/slices/authSlice';
import { useGetQuestionsByQuizIdQuery } from '@/redux/api/questionApi';
import { useVerifyQuizCodeQuery } from '@/redux/api/studentApi';
import { toast } from 'sonner';
import { useActivityLogger } from '@/hooks/useActivityLogger';

export default function QuizCameraSetup() {
    const navigate = useNavigate();
    const location = useLocation();
    const user = useSelector(selectCurrentUser);
    const tempStorage = useSelector(selectTempStorage);
    const videoRef = useRef(null);

    const queryParams = new URLSearchParams(location.search);
    const quizCode = queryParams.get('code');
    
    // Fetch quiz data if not in tempStorage
    const { data: verifiedQuizData, isLoading: isVerifying } = useVerifyQuizCodeQuery(quizCode, {
        skip: !quizCode || !!tempStorage
    });
    
    const quiz = verifiedQuizData?.data || verifiedQuizData || tempStorage;

    // Use the actual quiz_code from the quiz object for WebRTC room, not the URL parameter
    const actualQuizCode = quiz?.quiz_code || quizCode;

    const [cameraActive, setCameraActive] = useState(false);
    const [micActive, setMicActive] = useState(false);
    const [isActivating, setIsActivating] = useState(false);
    const [streamReady, setStreamReady] = useState(false);
    const [currentStream, setCurrentStream] = useState(null);
    const [permissionError, setPermissionError] = useState(null);
    const isCleaningUpRef = useRef(false); // Prevent double cleanup

    // Face detection hook - pass the ref itself, not ref.current
    const faceDetection = useFaceDetection(currentStream, videoRef);

    // Environment checks (pass face detection data)
    const { checks, isReady: environmentReady } = useEnvironmentCheck(currentStream, faceDetection);

    // Media recording hook
    const {
        startRecording,
        setCameraStreamExternal,
        hasPermissions,
        error: recordingError,
        browserSupport
    } = useMediaRecording();

    // Activity logging hook - use URL parameter for API calls
    const { logQuizStart } = useActivityLogger(quizCode);

    // WebRTC streaming hook - use actual quiz_code for room joining
    const { startStreaming, stopStreaming, isStreaming: isWebRTCStreaming } = useWebRTCStream(
        user?.id,
        actualQuizCode,
        'student'
    );

    // Pre-fetch questions
    const { data: questionsData } = useGetQuestionsByQuizIdQuery(quiz?.id, {
        skip: !quiz?.quiz_code
    });

    useEffect(() => {
        if (!quiz || !quizCode) {
            toast.error("Quiz data not found. Please start again.");
            navigate('/dashboard/quizzes');
        }
    }, [quiz, quizCode, navigate]);

    // Cleanup: Stop camera stream when component unmounts ONLY
    useEffect(() => {
        return () => {
            if (isCleaningUpRef.current) {
                console.log('[Cleanup] Already cleaning up, skipping...');
                return;
            }
            
            isCleaningUpRef.current = true;
            console.log('[Cleanup] Component unmounting - stopping all streams...');
            
            // Stop video element stream (this is the most reliable source of truth)
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach(track => {
                    track.stop();
                    console.log('[Cleanup] Stopped video track:', track.kind);
                });
                videoRef.current.srcObject = null;
            }
            
            // Stop WebRTC streaming (won't stop the camera now)
            stopStreaming();
        };
    }, []); // Empty dependency array - only run on unmount

    // Helper function to stop all existing streams before activation
    // Don't include currentStream in dependencies to avoid infinite loops
    const stopExistingStreams = useCallback(() => {
        console.log('[stopExistingStreams] Called');
        
        // Stop video element stream first (most reliable)
        if (videoRef.current?.srcObject) {
            console.log('[stopExistingStreams] Stopping videoRef stream');
            const stream = videoRef.current.srcObject;
            stream.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
        }
        
        setCameraActive(false);
        setMicActive(false);
        setStreamReady(false);
        setCurrentStream(null);
    }, []); // Empty deps - we access refs and setState which are stable

    // Activate camera and microphone
    const handleActivateCamera = async () => {
        setIsActivating(true);
        setStreamReady(false);
        setPermissionError(null);

        try {
            // First, stop any existing streams to free up the camera
            stopExistingStreams();
            
            // Wait a bit for the camera to be fully released
            await new Promise(resolve => setTimeout(resolve, 300));
            
            // Detect if device is Android for optimized settings
            const isAndroid = /Android/i.test(navigator.userAgent);
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            
            console.log('[Camera] Requesting media access...');
            
            // Get media stream with Android-optimized settings
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: isAndroid ? { ideal: 640, max: 1280 } : { ideal: 1280 },
                    height: isAndroid ? { ideal: 480, max: 720 } : { ideal: 720 },
                    facingMode: 'user',
                    frameRate: isAndroid ? { ideal: 15, max: 24 } : { ideal: 30 },
                    ...(isAndroid && {
                        // Android-specific optimizations
                        aspectRatio: { ideal: 4/3 },
                    })
                },
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                    ...(isMobile && {
                        sampleRate: 16000, // Lower sample rate for mobile
                        channelCount: 1     // Mono for mobile
                    })
                }
            });

            console.log('Stream obtained:', stream);
            console.log('Video tracks:', stream.getVideoTracks());
            console.log('Audio tracks:', stream.getAudioTracks());

            // Store stream for environment checks
            setCurrentStream(stream);

            // Show video preview
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                
                // Android-specific video settings
                if (isAndroid) {
                    videoRef.current.setAttribute('playsinline', 'true');
                    videoRef.current.setAttribute('webkit-playsinline', 'true');
                    videoRef.current.style.transform = 'translateZ(0)'; // Hardware acceleration
                }
                
                // Unified handler for video activation
                let hasActivated = false; // Guard to prevent double activation
                
                const activateVideo = async () => {
                    // Ensure we only activate once
                    if (hasActivated || streamReady) return;
                    hasActivated = true;
                    
                    console.log('Video metadata loaded');
                    console.log('Video dimensions:', videoRef.current.videoWidth, 'x', videoRef.current.videoHeight);
                    
                    try {
                        await videoRef.current.play();
                        console.log('Video playing successfully');
                        setStreamReady(true);
                        setCameraActive(true);
                        setMicActive(true);
                        console.log('Camera activated, stream set:', stream);
                        
                        // Set the stream in the recording hook
                        const permResult = setCameraStreamExternal(stream);
                        if (permResult.success) {
                            console.log('Recording stream set successfully');
                        } else {
                            console.warn('Failed to set recording stream:', permResult.error);
                        }
                        
                        // Defer WebRTC streaming to reduce initial load (especially on Android)
                        setTimeout(async () => {
                            if (videoRef.current?.srcObject === stream) {
                                const streamResult = await startStreaming(stream);
                                if (streamResult.success) {
                                    console.log('WebRTC streaming started');
                                } else {
                                    console.warn('WebRTC streaming failed:', streamResult.error);
                                }
                            }
                        }, isAndroid ? 1500 : 500);
                        
                        // Start activity logging when camera is activated
                        try {
                            await logQuizStart({
                                quiz_title: quiz.title,
                                quiz_id: quiz.id,
                                total_questions: questionsData?.data?.length || 0,
                                recording_started: false,
                            });
                            console.log('Activity logging started');
                        } catch (logError) {
                            console.error('Failed to log activity:', logError);
                        }
                        
                        toast.success("Camera and microphone activated!");
                    } catch (playError) {
                        console.error('Video play failed:', playError);
                        toast.error("Failed to play video. Please try again.");
                    }
                };
                
                // Primary: Wait for metadata to load
                videoRef.current.onloadedmetadata = activateVideo;
                
                // Backup: Use canplaythrough for slower devices/connections
                videoRef.current.oncanplaythrough = () => {
                    // Only activate if metadata handler didn't already succeed
                    if (!streamReady) {
                        console.log('Activating via canplaythrough (metadata was slow)');
                        activateVideo();
                    }
                };
            }
        } catch (error) {
            // Only log unexpected errors to console (not common user errors)
            if (import.meta.env.DEV) {
                console.error('Failed to activate camera:', error);
            } else if (error.name !== 'NotReadableError' && 
                       error.name !== 'NotAllowedError' && 
                       error.name !== 'NotFoundError' &&
                       error.name !== 'SecurityError') {
                // Only log truly unexpected errors in production
                console.error('Camera activation error:', error.name);
            }
            
            let errorMessage = '';
            let errorDetails = '';
            
            // Provide more specific error messages
            if (error.name === 'NotAllowedError') {
                errorMessage = "Camera access denied";
                errorDetails = "Please allow camera and microphone permissions when prompted. If you don't see the permission prompt, check your browser settings.";
                setPermissionError('denied');
            } else if (error.name === 'NotFoundError') {
                errorMessage = "No camera found";
                errorDetails = "Please make sure your device has a camera and it's properly connected.";
                setPermissionError('no-device');
            } else if (error.name === 'NotReadableError') {
                errorMessage = "Camera is already in use";
                errorDetails = "Another application is using your camera. Please close other apps and try again.";
                setPermissionError('in-use');
            } else if (error.name === 'NotSupportedError' || error.name === 'TypeError') {
                errorMessage = "Camera not supported";
                errorDetails = "Your browser or device doesn't support camera access. Try using Chrome or Firefox.";
                setPermissionError('not-supported');
            } else if (error.name === 'SecurityError') {
                errorMessage = "Permission blocked";
                errorDetails = "Close any floating apps, bubbles, or screen overlays (like Facebook Messenger, screen recorders) and try again.";
                setPermissionError('overlay-blocking');
            } else {
                errorMessage = "Failed to activate camera";
                errorDetails = "An unexpected error occurred. Please try again or continue without camera.";
                setPermissionError('unknown');
            }
            
            toast.error(errorMessage);
            setIsActivating(false);
        } finally {
            // Don't set isActivating to false here, let the onloadedmetadata do it
            setTimeout(() => setIsActivating(false), 3000);
        }
    };

    // Start quiz with recording
    const handleStartQuiz = async () => {
        const loadingToast = toast.loading("Starting quiz...");

        try {
            let recordingStarted = false;

            // Try to start recording if camera is active
            if (cameraActive && browserSupport.isSupported) {
                const recordingResult = await startRecording(quiz.id, user?.id);
                recordingStarted = recordingResult.success;

                if (!recordingStarted) {
                    console.warn("Recording failed to start");
                }
            }

            // Log quiz start activity
            await logQuizStart({
                quiz_title: quiz.title,
                quiz_id: quiz.id,
                total_questions: questionsData?.data?.length || 0,
                recording_started: recordingStarted,
            });

            toast.dismiss(loadingToast);
            toast.success("Starting quiz now!");

            // Navigate to quiz using the quiz code
             navigate(`/dashboard/quizzes/completion?code=${quiz.id}`);
        } catch (error) {
            toast.dismiss(loadingToast);
            console.error('Error starting quiz:', error);
            toast.error("Failed to start quiz. Please try again.");
        }
    };

    if (isVerifying || !quiz) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <Loader2 className="w-12 h-12 text-indigo-600 dark:text-[#a6b1ff] animate-spin" />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout hideBottomNav>
            <div className="min-h-screen pb-24 relative overflow-hidden bg-white dark:bg-black">
                {/* Visual Background */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-200/30 dark:bg-indigo-600/5 rounded-full blur-[120px] -mr-64 -mt-64" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-200/30 dark:bg-purple-600/5 rounded-full blur-[100px] -ml-40 -mb-40" />

                <div className="max-w-4xl mx-auto px-6 lg:px-10 py-12 relative z-10">
                    {/* Header */}
                    <div className="mb-12">
                        <motion.button
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            onClick={() => navigate(`/dashboard/quizzes/start?code=${quiz.quiz_code}`)}
                            className="flex items-center gap-2 text-[10px] font-black text-gray-400 dark:text-white/20 uppercase tracking-[0.2em] hover:text-indigo-600 dark:hover:text-[#a6b1ff] transition-colors group mb-6"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Go Back
                        </motion.button>
                        
                        {/* Android Permission Info Banner */}
                        {/Android/i.test(navigator.userAgent) && !cameraActive && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 bg-blue-50 dark:bg-blue-500/5 border-2 border-blue-200 dark:border-blue-500/20 rounded-2xl"
                            >
                                <div className="flex items-start gap-3">
                                    <Info size={18} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                    <div className="space-y-1">
                                        <p className="text-xs font-black text-blue-700 dark:text-blue-400 uppercase">
                                            Before You Start
                                        </p>
                                        <p className="text-[10px] text-blue-600 dark:text-blue-500 font-medium leading-relaxed">
                                            If you see "This site can't ask for permission", close any floating apps or bubbles (like Messenger chat heads) and try again.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white italic tracking-tighter uppercase leading-none">
                            Camera <span className="text-indigo-600 dark:text-[#a6b1ff]">Setup</span>
                        </h1>
                        <p className="text-gray-600 dark:text-white/40 font-medium mt-4 max-w-2xl">
                            Activate your camera and microphone to ensure everything is working properly before starting the quiz.
                        </p>
                    </div>

                    {/* Main Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Camera Preview */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-xl"
                        >
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-xl font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
                                        Camera Preview
                                    </h2>
                                    {cameraActive && (
                                        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-100 dark:bg-emerald-500/10 rounded-full border-2 border-emerald-300 dark:border-emerald-500/20">
                                            <div className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
                                            <span className="text-[9px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">Live</span>
                                        </div>
                                    )}
                                </div>

                                {/* Video Preview */}
                                <div className="relative aspect-video bg-gray-900 rounded-2xl overflow-hidden">
                                    <video
                                        ref={videoRef}
                                        autoPlay
                                        muted
                                        playsInline
                                        webkit-playsinline="true"
                                        width="640"
                                        height="480"
                                        style={{ 
                                            transform: 'translateZ(0)', // Hardware acceleration for Android
                                            backfaceVisibility: 'hidden', // Reduce rendering overhead
                                            WebkitBackfaceVisibility: 'hidden'
                                        }}
                                        className={`w-full h-full object-cover ${!cameraActive ? 'hidden' : ''}`}
                                    />
                                    {!cameraActive && (
                                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                            <div className="w-20 h-20 rounded-2xl bg-gray-800 flex items-center justify-center">
                                                <Camera size={40} className="text-gray-600" />
                                            </div>
                                            <p className="text-gray-500 text-sm font-medium">Camera not activated</p>
                                        </div>
                                    )}
                                </div>

                                {/* Activate Button */}
                                {!cameraActive && (
                                    <>
                                        <button
                                            onClick={handleActivateCamera}
                                            disabled={isActivating}
                                            className="w-full h-14 bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-[#a6b1ff] dark:to-[#a6b1ff] hover:from-indigo-600 hover:to-purple-700 text-white dark:text-black rounded-2xl font-black uppercase tracking-wider text-sm flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 shadow-lg"
                                        >
                                            {isActivating ? (
                                                <>
                                                    <Loader2 size={20} className="animate-spin" />
                                                    Activating...
                                                </>
                                            ) : (
                                                <>
                                                    <Camera size={20} />
                                                    Activate Camera & Mic
                                                </>
                                            )}
                                        </button>
                                        
                                        {/* Permission Error Help */}
                                        {permissionError && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                className="mt-4 p-4 bg-amber-50 dark:bg-amber-500/5 border-2 border-amber-200 dark:border-amber-500/20 rounded-xl"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <AlertCircle size={18} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                                    <div className="space-y-2 flex-1">
                                                        <p className="text-xs font-black text-amber-700 dark:text-amber-400 uppercase">
                                                            {permissionError === 'overlay-blocking' && 'Overlay Detected'}
                                                            {permissionError === 'denied' && 'Permission Needed'}
                                                            {permissionError === 'in-use' && 'Camera Busy'}
                                                            {permissionError === 'no-device' && 'No Camera Found'}
                                                            {permissionError === 'not-supported' && 'Not Supported'}
                                                            {permissionError === 'unknown' && 'Camera Error'}
                                                        </p>
                                                        <div className="text-[10px] text-amber-600 dark:text-amber-500 space-y-1.5 font-medium">
                                                            {permissionError === 'overlay-blocking' && (
                                                                <>
                                                                    <p className="font-bold">Close these apps if open:</p>
                                                                    <ul className="space-y-0.5 ml-3">
                                                                        <li>• Facebook Messenger (chat heads/bubbles)</li>
                                                                        <li>• Screen recording apps</li>
                                                                        <li>• Floating widgets or overlays</li>
                                                                        <li>• Blue light filter apps</li>
                                                                    </ul>
                                                                    <p className="mt-2">Then tap "Try Again" below.</p>
                                                                </>
                                                            )}
                                                            {permissionError === 'denied' && (
                                                                <>
                                                                    <p>1. Tap the lock icon in your browser's address bar</p>
                                                                    <p>2. Allow Camera and Microphone permissions</p>
                                                                    <p>3. Refresh this page and try again</p>
                                                                </>
                                                            )}
                                                            {permissionError === 'in-use' && (
                                                                <>
                                                                    <p>Close any apps using your camera:</p>
                                                                    <ul className="space-y-0.5 ml-3">
                                                                        <li>• Video call apps (Zoom, WhatsApp, etc.)</li>
                                                                        <li>• Camera app</li>
                                                                        <li>• Other browser tabs using camera</li>
                                                                    </ul>
                                                                </>
                                                            )}
                                                            {permissionError === 'no-device' && (
                                                                <p>Make sure your device has a working camera. Try restarting your device if the problem continues.</p>
                                                            )}
                                                            {permissionError === 'not-supported' && (
                                                                <p>Try opening this page in Google Chrome or Firefox browser for better compatibility.</p>
                                                            )}
                                                            {permissionError === 'unknown' && (
                                                                <p>Try refreshing the page or restarting your browser. You can also continue to the quiz without camera.</p>
                                                            )}
                                                        </div>
                                                        <button
                                                            onClick={() => {
                                                                setPermissionError(null);
                                                                handleActivateCamera();
                                                            }}
                                                            className="mt-3 px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-black uppercase rounded-lg transition-colors"
                                                        >
                                                            Try Again
                                                        </button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </>
                                )}

                                {/* Environment Checks - Show after camera is activated */}
                                {cameraActive && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="space-y-3 pt-4 border-t-2 border-gray-200 dark:border-white/10"
                                    >
                                        <div className="flex items-center justify-between">
                                            <h3 className="text-sm font-black text-gray-900 dark:text-white uppercase italic tracking-tighter">
                                                Environment Checks
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                                <span className="text-[9px] font-bold text-gray-600 dark:text-white/40 uppercase">Monitoring</span>
                                            </div>
                                        </div>

                                        {/* Network Status */}
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                                checks.network.status === 'good'
                                                    ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                    : checks.network.status === 'fair'
                                                    ? 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                                    : 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                                            }`}>
                                                <Wifi size={16} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-gray-900 dark:text-white uppercase">Network</p>
                                                <p className="text-[10px] text-gray-600 dark:text-white/40 font-medium truncate">
                                                    {checks.network.latency ? `${checks.network.latency}ms` : 'Checking...'}
                                                </p>
                                            </div>
                                            {checks.network.status === 'good' ? (
                                                <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                                            ) : checks.network.status === 'fair' ? (
                                                <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400 shrink-0" />
                                            ) : (
                                                <XCircle size={16} className="text-rose-600 dark:text-rose-400 shrink-0" />
                                            )}
                                        </div>

                                        {/* Lighting Status */}
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                                checks.lighting.status === 'good'
                                                    ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                    : 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                            }`}>
                                                <Sun size={16} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-gray-900 dark:text-white uppercase">Lighting</p>
                                                <p className="text-[10px] text-gray-600 dark:text-white/40 font-medium truncate">
                                                    {checks.lighting.status === 'dark' && 'Too dark'}
                                                    {checks.lighting.status === 'bright' && 'Too bright'}
                                                    {checks.lighting.status === 'good' && 'Good'}
                                                    {checks.lighting.status === 'checking' && 'Checking...'}
                                                </p>
                                            </div>
                                            {checks.lighting.status === 'good' ? (
                                                <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                                            ) : (
                                                <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400 shrink-0" />
                                            )}
                                        </div>

                                        {/* Noise Level */}
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                                checks.noise.status === 'good'
                                                    ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                    : checks.noise.status === 'noisy'
                                                    ? 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                                                    : 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                            }`}>
                                                <Volume2 size={16} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-gray-900 dark:text-white uppercase">Noise</p>
                                                <p className="text-[10px] text-gray-600 dark:text-white/40 font-medium truncate">
                                                    {checks.noise.status === 'noisy' && 'Too noisy'}
                                                    {checks.noise.status === 'silent' && 'Quiet'}
                                                    {checks.noise.status === 'good' && 'Good'}
                                                    {checks.noise.status === 'checking' && 'Checking...'}
                                                </p>
                                            </div>
                                            {checks.noise.status === 'good' || checks.noise.status === 'silent' ? (
                                                <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                                            ) : (
                                                <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400 shrink-0" />
                                            )}
                                        </div>

                                        {/* Face Detection - Required */}
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                                checks.faceDetection.facesCount === 1
                                                    ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                    : checks.faceDetection.status === 'loading'
                                                    ? 'bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
                                                    : 'bg-amber-100 dark:bg-amber-500/10 text-amber-600 dark:text-amber-400'
                                            }`}>
                                                {checks.faceDetection.status === 'loading' ? (
                                                    <Loader2 size={16} className="animate-spin" />
                                                ) : (
                                                    <Users size={16} />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-gray-900 dark:text-white uppercase">People</p>
                                                <p className="text-[10px] text-gray-600 dark:text-white/40 font-medium truncate">
                                                    {checks.faceDetection.status === 'loading' && 'Loading AI models...'}
                                                    {checks.faceDetection.status === 'ready' && 'Ready to detect'}
                                                    {checks.faceDetection.status === 'checking' && 'Analyzing...'}
                                                    {checks.faceDetection.status === 'none' && 'No face detected'}
                                                    {checks.faceDetection.status === 'detected' && checks.faceDetection.facesCount === 1 && 'One person detected'}
                                                    {checks.faceDetection.status === 'multiple' && `${checks.faceDetection.facesCount} people detected`}
                                                    {checks.faceDetection.status === 'error' && 'Detection unavailable'}
                                                </p>
                                            </div>
                                            {checks.faceDetection.facesCount === 1 ? (
                                                <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                                            ) : checks.faceDetection.status === 'loading' ? (
                                                <Loader2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0 animate-spin" />
                                            ) : (
                                                <AlertTriangle size={16} className="text-amber-600 dark:text-amber-400 shrink-0" />
                                            )}
                                        </div>

                                        {/* Browser Compatibility */}
                                        <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                                                checks.browser.compatible
                                                    ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                                    : 'bg-rose-100 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400'
                                            }`}>
                                                <Monitor size={16} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-xs font-bold text-gray-900 dark:text-white uppercase">Browser</p>
                                                <p className="text-[10px] text-gray-600 dark:text-white/40 font-medium truncate">
                                                    {checks.browser.name}
                                                </p>
                                            </div>
                                            {checks.browser.compatible ? (
                                                <CheckCircle size={16} className="text-emerald-600 dark:text-emerald-400 shrink-0" />
                                            ) : (
                                                <XCircle size={16} className="text-rose-600 dark:text-rose-400 shrink-0" />
                                            )}
                                        </div>

                                        {/* Recommendations - Show when conditions are not optimal */}
                                        {(checks.network.status === 'poor' || 
                                          checks.lighting.status !== 'good' || 
                                          checks.noise.status === 'noisy' ||
                                          (checks.faceDetection.facesCount !== 1 && checks.faceDetection.status !== 'loading' && checks.faceDetection.status !== 'checking')) && (
                                            <motion.div
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                className="mt-4 p-3 bg-amber-50 dark:bg-amber-500/5 border border-amber-200 dark:border-amber-500/20 rounded-xl"
                                            >
                                                <div className="flex items-start gap-2">
                                                    <AlertTriangle size={14} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                                                    <div className="space-y-1">
                                                        <p className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase">Action Required</p>
                                                        <ul className="text-[9px] text-amber-600 dark:text-amber-500 space-y-0.5 font-medium">
                                                            {checks.network.status === 'poor' && (
                                                                <li>• Move closer to your WiFi router or use ethernet</li>
                                                            )}
                                                            {checks.lighting.status === 'dark' && (
                                                                <li>• Turn on more lights or move to a brighter area</li>
                                                            )}
                                                            {checks.lighting.status === 'bright' && (
                                                                <li>• Reduce direct light or move away from windows</li>
                                                            )}
                                                            {checks.noise.status === 'noisy' && (
                                                                <li>• Find a quieter location to take the quiz</li>
                                                            )}
                                                            {checks.faceDetection.facesCount === 0 && checks.faceDetection.status !== 'loading' && (
                                                                <li>• Position yourself in front of the camera (required)</li>
                                                            )}
                                                            {checks.faceDetection.facesCount > 1 && (
                                                                <li>• Ensure you're alone in the camera frame (required)</li>
                                                            )}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>

                        {/* Status & Instructions */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                        >
                            {/* Status Cards */}
                            <div className="bg-white dark:bg-white/5 border-2 border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-xl space-y-4">
                                <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase italic tracking-tighter mb-6">
                                    Device Status
                                </h3>

                                {/* Camera Status */}
                                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border-2 border-gray-200 dark:border-white/5">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                        cameraActive
                                            ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                            : 'bg-gray-200 dark:bg-white/5 text-gray-400 dark:text-white/20'
                                    }`}>
                                        {cameraActive ? <CheckCircle size={24} /> : <Camera size={24} />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-black text-gray-900 dark:text-white uppercase">Camera</p>
                                        <p className="text-xs text-gray-600 dark:text-white/40 font-medium">
                                            {cameraActive ? 'Active and working' : 'Not activated yet'}
                                        </p>
                                    </div>
                                </div>

                                {/* Microphone Status */}
                                <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border-2 border-gray-200 dark:border-white/5">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                        micActive
                                            ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                                            : 'bg-gray-200 dark:bg-white/5 text-gray-400 dark:text-white/20'
                                    }`}>
                                        {micActive ? <CheckCircle size={24} /> : <Mic size={24} />}
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-sm font-black text-gray-900 dark:text-white uppercase">Microphone</p>
                                        <p className="text-xs text-gray-600 dark:text-white/40 font-medium">
                                            {micActive ? 'Active and working' : 'Not activated yet'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Error Alert */}
                            {recordingError && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-red-100 dark:bg-red-500/10 border-2 border-red-300 dark:border-red-500/20 rounded-2xl p-4 flex items-start gap-3"
                                >
                                    <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-500 shrink-0 mt-0.5" />
                                    <div>
                                        <p className="text-sm font-bold text-red-700 dark:text-red-400 mb-1">Recording Error</p>
                                        <p className="text-xs text-red-600 dark:text-red-500">{recordingError}</p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Instructions */}
                            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-500/5 dark:to-indigo-500/5 border-2 border-blue-200 dark:border-blue-500/20 rounded-3xl p-8 shadow-lg">
                                <h3 className="text-lg font-black text-gray-900 dark:text-white uppercase italic tracking-tighter mb-4">
                                    Instructions
                                </h3>
                                <ul className="space-y-3 text-sm text-gray-700 dark:text-white/60 font-medium">
                                    <li className="flex items-start gap-3">
                                        <span className="text-indigo-600 dark:text-indigo-400 font-black">1.</span>
                                        <span>Click "Activate Camera & Mic" to turn on your devices</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-indigo-600 dark:text-indigo-400 font-black">2.</span>
                                        <span>Make sure you can see yourself in the camera preview</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <span className="text-indigo-600 dark:text-indigo-400 font-black">3.</span>
                                        <span>Once everything looks good, click "Start Quiz" to begin</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Start Quiz Button */}
                            <button
                                onClick={handleStartQuiz}
                                disabled={!cameraActive || !environmentReady}
                                className="w-full h-16 bg-gradient-to-r from-emerald-500 to-teal-600 dark:from-emerald-400 dark:to-teal-400 hover:from-emerald-600 hover:to-teal-700 text-white dark:text-black rounded-2xl font-black uppercase tracking-wider text-sm flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed shadow-2xl"
                            >
                                <Play fill="currentColor" size={20} />
                                {!cameraActive 
                                    ? 'Activate Camera First' 
                                    : !environmentReady 
                                    ? 'Waiting for Environment Checks...' 
                                    : 'Start Quiz Now!'}
                            </button>

                            {/* Environment Info */}
                            {cameraActive && !environmentReady && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-start gap-2 p-3 bg-blue-50 dark:bg-blue-500/5 border border-blue-200 dark:border-blue-500/20 rounded-xl"
                                >
                                    <Info size={14} className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-blue-700 dark:text-blue-400 uppercase">Environment Checks Required</p>
                                        <p className="text-[9px] text-blue-600 dark:text-blue-500 font-medium">
                                            Please wait while we verify your environment. The quiz will be available once checks are complete.
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
