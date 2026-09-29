import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Real-time Exam Proctoring System
 * 
 * Features:
 * 1. Face presence detection
 * 2. Multiple faces detection
 * 3. Head pose/gaze tracking
 * 4. Talking detection (mouth movement)
 * 5. Audio detection
 * 6. Event logging with timestamps
 * 7. Risk scoring system
 * 8. Real-time status updates
 */

export const useExamProctoring = ({ 
    videoStream, 
    onViolation, 
    onStatusChange,
    enabled = true,
    thresholds = {
        noFaceTimeout: 1000,         // 1 second (stricter)
        multipleFacesTimeout: 500,   // 0.5 seconds (stricter)
        gazeAwayTimeout: 2000,       // 2 seconds (stricter)
        gazeAwayRepeats: 2,          // 2 times (stricter)
        talkingTimeout: 1500,        // 1.5 seconds (stricter)
        audioThreshold: 0.05,        // 5% volume (more sensitive)
        riskScoreLimit: 80           // Lower limit (stricter)
    }
}) => {
    const [status, setStatus] = useState('initializing'); // initializing, normal, suspicious, cheating
    const [violations, setViolations] = useState([]);
    const [riskScore, setRiskScore] = useState(0);
    const [currentFlags, setCurrentFlags] = useState([]);
    
    // Detection states
    const [facePresent, setFacePresent] = useState(true);
    const [faceCount, setFaceCount] = useState(0);
    const [headPose, setHeadPose] = useState({ pitch: 0, yaw: 0, roll: 0 });
    const [isTalking, setIsTalking] = useState(false);
    const [audioDetected, setAudioDetected] = useState(false);
    
    // Refs
    const faceDetectorRef = useRef(null);
    const faceMeshRef = useRef(null);
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const videoRef = useRef(null);
    
    // Timing refs
    const noFaceTimerRef = useRef(null);
    const multipleFacesTimerRef = useRef(null);
    const gazeAwayTimerRef = useRef(null);
    const talkingTimerRef = useRef(null);
    const gazeAwayCountRef = useRef(0);
    const lastGazeAwayTimeRef = useRef(0);
    
    // Mouth tracking refs
    const previousMouthOpenRef = useRef(false);
    const mouthMovementCountRef = useRef(0);
    const lastMouthCheckRef = useRef(Date.now());
    
    /**
     * Log a violation - DEFINED FIRST to avoid dependency issues
     */
    const logViolation = useCallback((type, details, severity, riskPoints) => {
        const violation = {
            type,
            details,
            severity, // 'suspicious' or 'cheating'
            riskPoints,
            timestamp: new Date().toISOString(),
            confidence: 0.85
        };
        
        setViolations(prev => [...prev, violation]);
        setRiskScore(prev => {
            const newScore = prev + riskPoints;
            
            // Update status based on risk score
            if (newScore >= thresholds.riskScoreLimit) {
                setStatus('cheating');
                if (onStatusChange) onStatusChange('cheating', violation);
            } else if (newScore >= thresholds.riskScoreLimit * 0.5) {
                setStatus('suspicious');
                if (onStatusChange) onStatusChange('suspicious', violation);
            }
            
            return newScore;
        });
        
        // Add to current flags
        setCurrentFlags(prev => {
            const newFlags = [...prev, details];
            return newFlags.slice(-5); // Keep last 5 flags
        });
        
        // Notify parent component
        if (onViolation) {
            onViolation(violation);
        }
        
        console.log(`🚨 Violation: ${type} - ${details} (${severity}, +${riskPoints} risk)`);
    }, [onViolation, onStatusChange, thresholds]);
    
    /**
     * Initialize MediaPipe Face Detection
     */
    useEffect(() => {
        if (!enabled) return;
        
        const initFaceDetection = async () => {
            try {
                // Dynamically import MediaPipe Face Detection
                const { FaceDetection } = await import('@mediapipe/face_detection');
                
                const faceDetector = new FaceDetection({
                    locateFile: (file) => {
                        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
                    }
                });
                
                faceDetector.setOptions({
                    model: 'short',
                    minDetectionConfidence: 0.3 // Lower threshold for poor cameras
                });
                
                faceDetector.onResults((results) => {
                    const count = results.detections ? results.detections.length : 0;
                    setFaceCount(count);
                    setFacePresent(count > 0);
                    
                    // Log detection status
                    if (count === 0) {
                        console.log('⚠️ No face detected');
                    } else if (count > 1) {
                        console.log(`⚠️ Multiple faces detected: ${count}`);
                    }
                    
                    // Handle face presence violations
                    if (count === 0) {
                        if (!noFaceTimerRef.current) {
                            noFaceTimerRef.current = setTimeout(() => {
                                logViolation('no_face', 'No face detected', 'cheating', 30);
                            }, thresholds.noFaceTimeout);
                        }
                    } else {
                        if (noFaceTimerRef.current) {
                            clearTimeout(noFaceTimerRef.current);
                            noFaceTimerRef.current = null;
                        }
                    }
                    
                    // Handle multiple faces
                    if (count > 1) {
                        if (!multipleFacesTimerRef.current) {
                            multipleFacesTimerRef.current = setTimeout(() => {
                                logViolation('multiple_faces', `${count} faces detected`, 'cheating', 50);
                            }, thresholds.multipleFacesTimeout);
                        }
                    } else {
                        if (multipleFacesTimerRef.current) {
                            clearTimeout(multipleFacesTimerRef.current);
                            multipleFacesTimerRef.current = null;
                        }
                    }
                });
                
                faceDetectorRef.current = faceDetector;
                console.log('✅ Face Detection initialized');
            } catch (error) {
                console.error('❌ Face Detection initialization failed:', error);
            }
        };
        
        initFaceDetection();
        
        return () => {
            if (faceDetectorRef.current) {
                try {
                    faceDetectorRef.current.close();
                    faceDetectorRef.current = null;
                } catch (error) {
                    // Ignore cleanup errors - object may already be closed
                    console.log('Face detector cleanup (safe to ignore):', error.message);
                }
            }
        };
    }, [enabled, thresholds, logViolation]);
    
    /**
     * Initialize MediaPipe Face Mesh for head pose and mouth tracking
     */
    useEffect(() => {
        if (!enabled) return;
        
        const initFaceMesh = async () => {
            try {
                // Dynamically import MediaPipe Face Mesh
                const { FaceMesh } = await import('@mediapipe/face_mesh');
                
                const faceMesh = new FaceMesh({
                    locateFile: (file) => {
                        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
                    }
                });
                
                faceMesh.setOptions({
                    maxNumFaces: 2,
                    refineLandmarks: true,
                    minDetectionConfidence: 0.3,
                    minTrackingConfidence: 0.3
                });
                
                faceMesh.onResults((results) => {
                    if (results.multiFaceLandmarks && results.multiFaceLandmarks.length > 0) {
                        const landmarks = results.multiFaceLandmarks[0];
                        
                        // Calculate head pose
                        const pose = calculateHeadPose(landmarks);
                        setHeadPose(pose);
                        
                        // Check if looking away (stricter thresholds)
                        const isLookingAway = Math.abs(pose.yaw) > 15 || Math.abs(pose.pitch) > 15;
                        
                        if (isLookingAway) {
                            if (!gazeAwayTimerRef.current) {
                                gazeAwayTimerRef.current = setTimeout(() => {
                                    gazeAwayCountRef.current++;
                                    lastGazeAwayTimeRef.current = Date.now();
                                    
                                    if (gazeAwayCountRef.current >= thresholds.gazeAwayRepeats) {
                                        logViolation('gaze_away_repeated', `Looked away ${gazeAwayCountRef.current} times`, 'cheating', 40);
                                        gazeAwayCountRef.current = 0; // Reset after flagging
                                    } else {
                                        logViolation('gaze_away', 'Looking away from screen', 'suspicious', 10);
                                    }
                                }, thresholds.gazeAwayTimeout);
                            }
                        } else {
                            if (gazeAwayTimerRef.current) {
                                clearTimeout(gazeAwayTimerRef.current);
                                gazeAwayTimerRef.current = null;
                            }
                        }
                        
                        // Detect talking (mouth movement)
                        const isMouthOpen = detectMouthOpen(landmarks);
                        const now = Date.now();
                        
                        // Check for mouth movement (opening and closing)
                        if (isMouthOpen !== previousMouthOpenRef.current) {
                            mouthMovementCountRef.current++;
                            previousMouthOpenRef.current = isMouthOpen;
                        }
                        
                        // Check if talking (continuous mouth movement)
                        if (now - lastMouthCheckRef.current >= 500) { // Check every 500ms
                            if (mouthMovementCountRef.current >= 4) { // 4+ movements in 500ms = talking
                                setIsTalking(true);
                                
                                if (!talkingTimerRef.current) {
                                    talkingTimerRef.current = setTimeout(() => {
                                        logViolation('talking', 'Continuous mouth movement detected', 'cheating', 35);
                                    }, thresholds.talkingTimeout);
                                }
                            } else {
                                setIsTalking(false);
                                if (talkingTimerRef.current) {
                                    clearTimeout(talkingTimerRef.current);
                                    talkingTimerRef.current = null;
                                }
                            }
                            
                            mouthMovementCountRef.current = 0;
                            lastMouthCheckRef.current = now;
                        }
                    }
                });
                
                faceMeshRef.current = faceMesh;
                console.log('✅ Face Mesh initialized');
            } catch (error) {
                console.error('❌ Face Mesh initialization failed:', error);
            }
        };
        
        initFaceMesh();
        
        return () => {
            if (faceMeshRef.current) {
                try {
                    faceMeshRef.current.close();
                    faceMeshRef.current = null;
                } catch (error) {
                    // Ignore cleanup errors - object may already be closed
                    console.log('Face mesh cleanup (safe to ignore):', error.message);
                }
            }
        };
    }, [enabled, thresholds, logViolation]);
    
    /**
     * Initialize Audio Detection
     */
    useEffect(() => {
        if (!enabled || !videoStream) return;
        
        const initAudioDetection = async () => {
            try {
                // Check if stream has audio tracks
                const audioTracks = videoStream.getAudioTracks();
                if (audioTracks.length === 0) {
                    console.log('⚠️ No audio tracks in stream, skipping audio detection');
                    return;
                }
                
                // Prevent multiple audio contexts
                if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                    console.log('⚠️ Audio context already exists, skipping initialization');
                    return;
                }
                
                const audioContext = new (window.AudioContext || window.webkitAudioContext)();
                audioContextRef.current = audioContext;
                
                const analyser = audioContext.createAnalyser();
                analyserRef.current = analyser;
                analyser.fftSize = 2048;
                analyser.smoothingTimeConstant = 0.8;
                
                const source = audioContext.createMediaStreamSource(videoStream);
                source.connect(analyser);
                
                const bufferLength = analyser.frequencyBinCount;
                const dataArray = new Uint8Array(bufferLength);
                
                let animationFrameId = null;
                
                const checkAudio = () => {
                    if (!enabled || !audioContextRef.current || audioContextRef.current.state === 'closed') {
                        if (animationFrameId) {
                            cancelAnimationFrame(animationFrameId);
                        }
                        return;
                    }
                    
                    analyser.getByteTimeDomainData(dataArray);
                    
                    // Calculate RMS for volume detection
                    let sum = 0;
                    for (let i = 0; i < bufferLength; i++) {
                        const normalized = (dataArray[i] - 128) / 128;
                        sum += normalized * normalized;
                    }
                    const rms = Math.sqrt(sum / bufferLength);
                    
                    const isAudioDetected = rms > thresholds.audioThreshold;
                    setAudioDetected(isAudioDetected);
                    
                    if (isAudioDetected && isTalking) {
                        logViolation('audio_speech', 'Speech detected during exam', 'cheating', 40);
                    }
                    
                    animationFrameId = requestAnimationFrame(checkAudio);
                };
                
                checkAudio();
                console.log('✅ Audio Detection initialized');
            } catch (error) {
                // Silently handle audio detection errors to avoid console spam
                console.log('⚠️ Audio Detection not available:', error.message);
            }
        };
        
        initAudioDetection();
        
        return () => {
            if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
                audioContextRef.current.close().catch(() => {
                    // Ignore close errors
                });
            }
        };
    }, [enabled, videoStream, isTalking, thresholds, logViolation]);
    
    /**
     * Run detection on video frames
     */
    useEffect(() => {
        if (!enabled || !videoStream) return;
        
        let animationId = null;
        let isRunning = true;
        
        const detectFrame = async () => {
            if (!isRunning || !enabled) return;
            
            // Try multiple ways to find the video element
            let video = document.querySelector('video[autoplay]');
            if (!video) video = document.querySelector('video');
            if (!video) {
                // Create a hidden video element if none exists
                video = document.createElement('video');
                video.srcObject = videoStream;
                video.autoplay = true;
                video.muted = true;
                video.playsInline = true;
                video.style.position = 'fixed';
                video.style.top = '-9999px';
                video.style.left = '-9999px';
                video.width = 640;
                video.height = 480;
                document.body.appendChild(video);
                videoRef.current = video;
                
                await video.play().catch(() => {});
            }
            
            if (!video || video.readyState < 2 || video.videoWidth === 0) {
                animationId = requestAnimationFrame(detectFrame);
                return;
            }
            
            try {
                // Run face detection
                if (faceDetectorRef.current) {
                    try {
                        await faceDetectorRef.current.send({ image: video });
                    } catch (sendError) {
                        // Object may be closed, skip this frame
                    }
                }
                
                // Run face mesh
                if (faceMeshRef.current) {
                    try {
                        await faceMeshRef.current.send({ image: video });
                    } catch (sendError) {
                        // Object may be closed, skip this frame
                    }
                }
            } catch (error) {
                // Silent error handling
                console.log('Detection frame error:', error.message);
            }
            
            if (isRunning && enabled) {
                animationId = requestAnimationFrame(detectFrame);
            }
        };
        
        // Start detection with a small delay to ensure video is ready
        const startTimeout = setTimeout(() => {
            detectFrame();
            console.log('🎥 Video detection loop started');
        }, 1000);
        
        return () => {
            isRunning = false;
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
            clearTimeout(startTimeout);
            
            // Clean up hidden video if we created one
            if (videoRef.current && videoRef.current.style.position === 'fixed') {
                videoRef.current.remove();
                videoRef.current = null;
            }
            console.log('🎥 Video detection loop stopped');
        };
    }, [enabled, videoStream]);
    
    /**
     * Calculate head pose from face landmarks
     */
    const calculateHeadPose = (landmarks) => {
        // Key landmarks for head pose estimation
        const noseTip = landmarks[1];
        const leftEye = landmarks[33];
        const rightEye = landmarks[263];
        const leftMouth = landmarks[61];
        const rightMouth = landmarks[291];
        
        // Calculate yaw (left-right rotation)
        const eyeDistance = Math.abs(rightEye.x - leftEye.x);
        const noseToLeftEye = Math.abs(noseTip.x - leftEye.x);
        const noseToRightEye = Math.abs(noseTip.x - rightEye.x);
        const yaw = ((noseToRightEye - noseToLeftEye) / eyeDistance) * 45; // Approximate degrees
        
        // Calculate pitch (up-down rotation)
        const eyeY = (leftEye.y + rightEye.y) / 2;
        const mouthY = (leftMouth.y + rightMouth.y) / 2;
        const faceHeight = Math.abs(mouthY - eyeY);
        const noseToEyeDistance = Math.abs(noseTip.y - eyeY);
        const pitch = ((noseToEyeDistance / faceHeight) - 0.5) * 60; // Approximate degrees
        
        // Calculate roll (tilt)
        const eyeSlope = (rightEye.y - leftEye.y) / (rightEye.x - leftEye.x);
        const roll = Math.atan(eyeSlope) * (180 / Math.PI);
        
        return { pitch, yaw, roll };
    };
    
    /**
     * Detect if mouth is open
     */
    const detectMouthOpen = (landmarks) => {
        // Upper lip center
        const upperLip = landmarks[13];
        // Lower lip center
        const lowerLip = landmarks[14];
        
        // Calculate vertical distance
        const distance = Math.abs(lowerLip.y - upperLip.y);
        
        // Threshold for "open" (adjust based on testing)
        return distance > 0.02;
    };
    
    /**
     * Update overall status
     */
    useEffect(() => {
        if (!enabled) {
            setStatus('disabled');
            return;
        }
        
        if (faceDetectorRef.current && faceMeshRef.current) {
            setStatus('normal');
        }
    }, [enabled]);
    
    /**
     * Reset gaze away count after timeout
     */
    useEffect(() => {
        const resetInterval = setInterval(() => {
            const now = Date.now();
            if (now - lastGazeAwayTimeRef.current > 30000) { // Reset after 30 seconds
                gazeAwayCountRef.current = 0;
            }
        }, 10000);
        
        return () => clearInterval(resetInterval);
    }, []);
    
    /**
     * Cleanup timers
     */
    useEffect(() => {
        return () => {
            if (noFaceTimerRef.current) clearTimeout(noFaceTimerRef.current);
            if (multipleFacesTimerRef.current) clearTimeout(multipleFacesTimerRef.current);
            if (gazeAwayTimerRef.current) clearTimeout(gazeAwayTimerRef.current);
            if (talkingTimerRef.current) clearTimeout(talkingTimerRef.current);
        };
    }, []);
    
    return {
        // Status
        status,
        riskScore,
        violations,
        currentFlags,
        
        // Detection states
        facePresent,
        faceCount,
        headPose,
        isTalking,
        audioDetected,
        
        // Methods
        resetViolations: () => {
            setViolations([]);
            setRiskScore(0);
            setCurrentFlags([]);
            setStatus('normal');
            gazeAwayCountRef.current = 0;
        }
    };
};
