import { useState, useEffect, useRef } from 'react';
import { FaceDetection } from '@mediapipe/face_detection';

export const useFaceDetection = (videoStream, videoRef) => {
    const [faceDetection, setFaceDetection] = useState({
        status: 'loading',
        facesCount: 0,
        isLoaded: false,
        error: null
    });

    const faceDetectorRef = useRef(null);
    const lastLogRef = useRef({ count: -1, time: 0 });

    // Initialize MediaPipe Face Detection
    useEffect(() => {
        const initFaceDetection = async () => {
            try {
                // Create face detection instance
                const faceDetector = new FaceDetection({
                    locateFile: (file) => {
                        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_detection/${file}`;
                    }
                });

                // Configure face detection with lower confidence for poor quality cameras
                faceDetector.setOptions({
                    model: 'short',  // 'short' for faces within 2 meters, 'full' for longer range
                    minDetectionConfidence: 0.3  // Lowered from 0.5 to 0.3 for better detection with poor cameras
                });

                // Set up results callback
                faceDetector.onResults((results) => {
                    const facesCount = results.detections ? results.detections.length : 0;
                    
                    let status = 'none';
                    if (facesCount === 1) {
                        status = 'detected';
                    } else if (facesCount > 1) {
                        status = 'multiple';
                    }

                    setFaceDetection(prev => ({
                        ...prev,
                        facesCount,
                        status,
                        isLoaded: true
                    }));
                });

                faceDetectorRef.current = faceDetector;

                setFaceDetection(prev => ({
                    ...prev,
                    status: 'ready',
                    isLoaded: true
                }));

            } catch (error) {
                setFaceDetection(prev => ({
                    ...prev,
                    status: 'error',
                    error: 'Failed to initialize face detection',
                    isLoaded: false
                }));
            }
        };

        initFaceDetection();

        // Cleanup
        return () => {
            if (faceDetectorRef.current) {
                faceDetectorRef.current.close();
            }
        };
    }, []);

    // Start interval-based face detection when detector is ready
    useEffect(() => {
        if (!faceDetectorRef.current) {
            return;
        }

        // Detect device type for adaptive intervals
        const isAndroid = /Android/i.test(navigator.userAgent);
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        
        // Use longer intervals on Android/mobile for better performance
        const detectionInterval = isAndroid ? 2000 : isMobile ? 1500 : 1000;

        const detectFaces = async () => {
            // Query DOM directly to avoid ref issues
            const video = document.querySelector('video');
            
            if (!video || !videoStream) {
                return;
            }

            // Check if video is ready
            if (video.readyState < 2 || video.videoWidth === 0) {
                return;
            }

            try {
                // Send video frame to MediaPipe for detection
                await faceDetectorRef.current.send({ image: video });
            } catch (error) {
                // Silent error handling
            }
        };

        // Start checking immediately and then on adaptive interval
        detectFaces();
        const interval = setInterval(detectFaces, detectionInterval);

        // Cleanup
        return () => {
            clearInterval(interval);
        };
    }, [videoStream]); // Re-run when videoStream changes

    return faceDetection;
};
