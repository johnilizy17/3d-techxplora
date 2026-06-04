import { useState, useEffect, useRef } from 'react';

export const useEnvironmentCheck = (videoStream, faceDetectionData, videoRef) => {
    const [checks, setChecks] = useState({
        network: { status: 'checking', speed: null, latency: null },
        lighting: { status: 'checking', level: null },
        noise: { status: 'checking', level: null },
        faceDetection: { status: 'checking', facesCount: 0 },
        browser: { status: 'checking', compatible: true, warnings: [] }
    });

    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const videoStreamRef = useRef(videoStream); // Store videoStream in a ref

    // Update ref when videoStream changes
    useEffect(() => {
        videoStreamRef.current = videoStream;
    }, [videoStream]);

    // Check lighting conditions from video stream - FIRST PRIORITY
    // Runs continuously on interval, independent of videoStream changes
    useEffect(() => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const checkLighting = () => {
            // Query DOM directly instead of using ref to avoid closure issues
            const video = document.querySelector('video');
            const stream = videoStreamRef.current; // Get current stream from ref
            
            if (!stream || !video) {
                return;
            }

            // Check if video has dimensions and is ready
            if (video.videoWidth > 0 && video.videoHeight > 0 && video.readyState >= 2) {
                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;
                
                try {
                    ctx.drawImage(video, 0, 0);

                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const data = imageData.data;

                    let brightness = 0;
                    for (let i = 0; i < data.length; i += 4) {
                        const r = data[i];
                        const g = data[i + 1];
                        const b = data[i + 2];
                        brightness += (r + g + b) / 3;
                    }
                    brightness = brightness / (data.length / 4);

                    let status = 'good';
                    if (brightness < 50) {
                        status = 'dark';
                    } else if (brightness > 200) {
                        status = 'bright';
                    }

                    setChecks(prev => ({
                        ...prev,
                        lighting: {
                            status,
                            level: Math.round(brightness)
                        }
                    }));
                } catch (error) {
                    // Silent error handling
                }
            }
        };

        // Start checking immediately and then every second
        // This interval runs continuously regardless of videoStream changes
        checkLighting();
        const interval = setInterval(checkLighting, 1000);
        
        return () => {
            clearInterval(interval);
        };
    }, []); // Empty dependency array - runs once on mount, interval continues forever

    // Check network speed and latency
    useEffect(() => {
        const checkNetwork = async () => {
            try {
                // Use the Network Information API if available
                const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
                
                if (connection) {
                    const effectiveType = connection.effectiveType || 'unknown';
                    const downlink = connection.downlink; // Mbps
                    
                    let status = 'good';
                    let estimatedLatency = null;
                    
                    // Determine status based on connection type
                    if (effectiveType === 'slow-2g' || effectiveType === '2g') {
                        status = 'poor';
                        estimatedLatency = 2000;
                    } else if (effectiveType === '3g') {
                        status = 'fair';
                        estimatedLatency = 500;
                    } else if (effectiveType === '4g' || downlink > 5) {
                        status = 'good';
                        estimatedLatency = 100;
                    } else {
                        status = 'fair';
                        estimatedLatency = 300;
                    }

                    setChecks(prev => ({
                        ...prev,
                        network: {
                            status,
                            speed: effectiveType,
                            latency: estimatedLatency
                        }
                    }));
                } else {
                    // Fallback: assume good connection if API not available
                    setChecks(prev => ({
                        ...prev,
                        network: {
                            status: 'good',
                            speed: 'online',
                            latency: null
                        }
                    }));
                }
            } catch (error) {
                console.error('Network check failed:', error);
                setChecks(prev => ({
                    ...prev,
                    network: { 
                        status: 'good', 
                        speed: 'online', 
                        latency: null 
                    }
                }));
            }
        };

        checkNetwork();
        
        // Listen for connection changes
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (connection) {
            connection.addEventListener('change', checkNetwork);
        }
        
        const interval = setInterval(checkNetwork, 10000); // Check every 10 seconds
        
        return () => {
            clearInterval(interval);
            if (connection) {
                connection.removeEventListener('change', checkNetwork);
            }
        };
    }, []);

    // Check audio/noise levels
    useEffect(() => {
        if (!videoStream) return;

        const checkNoise = async () => {
            try {
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

                const checkLevel = () => {
                    analyser.getByteTimeDomainData(dataArray);
                    
                    // Calculate RMS (Root Mean Square) for more accurate volume detection
                    let sum = 0;
                    for (let i = 0; i < bufferLength; i++) {
                        const normalized = (dataArray[i] - 128) / 128;
                        sum += normalized * normalized;
                    }
                    const rms = Math.sqrt(sum / bufferLength);
                    const volume = Math.round(rms * 100);

            
                    let status = 'good';
                    if (volume > 30) {
                        status = 'noisy';
                    } else if (volume < 5) {
                        status = 'silent';
                    }

                    setChecks(prev => ({
                        ...prev,
                        noise: {
                            status,
                            level: volume
                        }
                    }));
                };

                checkLevel();
                const interval = setInterval(checkLevel, 500); // Check every 500ms for more responsive updates
                
                return () => {
                    clearInterval(interval);
                    source.disconnect();
                    audioContext.close();
                };
            } catch (error) {
                console.error('Audio check failed:', error);
                setChecks(prev => ({
                    ...prev,
                    noise: { status: 'unknown', level: null }
                }));
            }
        };

        checkNoise();
    }, [videoStream]);

    // Update face detection from external hook
    useEffect(() => {
        if (faceDetectionData) {
            setChecks(prev => ({
                ...prev,
                faceDetection: {
                    status: faceDetectionData.status,
                    facesCount: faceDetectionData.facesCount,
                    isLoaded: faceDetectionData.isLoaded
                }
            }));
        }
    }, [faceDetectionData]);

    // Check browser compatibility
    useEffect(() => {
        const checkBrowser = () => {
            const warnings = [];
            let compatible = true;

            // Check for required APIs
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                warnings.push('Camera API not supported');
                compatible = false;
            }

            if (!window.MediaRecorder) {
                warnings.push('Recording not supported');
            }

            // Check for fullscreen API
            if (!document.fullscreenEnabled && !document.webkitFullscreenEnabled) {
                warnings.push('Fullscreen not supported');
            }

            // Check for visibility API
            if (typeof document.hidden === 'undefined') {
                warnings.push('Tab visibility detection not supported');
            }

            // Detect browser
            const userAgent = navigator.userAgent;
            let browserName = 'Unknown';
            
            if (userAgent.includes('Firefox')) {
                browserName = 'Firefox';
            } else if (userAgent.includes('Chrome')) {
                browserName = 'Chrome';
            } else if (userAgent.includes('Safari')) {
                browserName = 'Safari';
            } else if (userAgent.includes('Edge')) {
                browserName = 'Edge';
            }

            setChecks(prev => ({
                ...prev,
                browser: {
                    status: compatible ? 'compatible' : 'incompatible',
                    compatible,
                    warnings,
                    name: browserName
                }
            }));
        };

        checkBrowser();
    }, []);

    // Calculate overall readiness (requires face detection)
    const isReady = () => {
        // Core requirements that must pass
        const coreRequirements = 
            checks.browser.compatible &&
            checks.lighting.status !== 'checking';  // Just need lighting to be checked
        
        // Face detection is REQUIRED - must detect exactly 1 face
        // Allow quiz to start only if:
        // 1. Exactly 1 face detected (required for quiz integrity)
        // 2. Still loading/checking (give it time to detect)
        const faceCheckPassed = 
            checks.faceDetection.status === 'loading' ||
            checks.faceDetection.status === 'checking' ||
            (checks.faceDetection.status === 'detected' && checks.faceDetection.facesCount === 1);
        
        return coreRequirements && faceCheckPassed;
    };

    return { checks, isReady: isReady() };
};
