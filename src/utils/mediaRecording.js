/**
 * Media Recording Utility for Quiz Proctoring
 * Handles camera, microphone, and screen recording
 */

class MediaRecorder {
    constructor() {
        this.cameraStream = null;
        this.screenStream = null;
        this.mediaRecorder = null;
        this.screenRecorder = null;
        this.recordedChunks = [];
        this.screenChunks = [];
        this.isRecording = false;
    }

    /**
     * Set camera stream from external source
     * Useful when stream is already obtained elsewhere
     */
    setCameraStream(stream) {
        if (this.cameraStream) {
            this.stopCameraStream();
        }
        this.cameraStream = stream;
        console.log('✅ Camera stream set from external source');
        return { success: true, stream };
    }

    /**
     * Request camera and microphone permissions
     */
    async requestCameraAndMicrophone() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1280 },
                    height: { ideal: 720 },
                    facingMode: 'user'
                },
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                }
            });
            
            this.cameraStream = stream;
            console.log('✅ Camera and microphone access granted');
            return { success: true, stream };
        } catch (error) {
            console.error('❌ Camera/Microphone access denied:', error);
            return { 
                success: false, 
                error: error.message,
                type: 'camera'
            };
        }
    }

    /**
     * Request screen sharing permission
     * DISABLED: Screen sharing feature removed
     */
    async requestScreenShare() {
        console.log('📱 Screen sharing feature disabled');
        return { 
            success: true, 
            stream: null,
            disabled: true,
            message: 'Screen sharing feature has been disabled'
        };
    }

    /**
     * Request all permissions (camera and microphone only)
     * Screen sharing has been disabled
     */
    async requestAllPermissions(maxRetries = 3) {
        const results = {
            camera: null,
            screen: null,
            allGranted: false,
            screenRetries: 0
        };

        // Request camera and microphone
        results.camera = await this.requestCameraAndMicrophone();
        
        if (!results.camera.success) {
            return results;
        }

        // Screen sharing disabled - automatically succeed
        results.screen = await this.requestScreenShare();

        results.allGranted = results.camera.success && results.screen.success;
        return results;
    }

    /**
     * Start recording camera and screen
     */
    async startRecording(quizId, studentId) {
        if (this.isRecording) {
            console.warn('⚠️ Recording already in progress');
            return { success: false, error: 'Already recording' };
        }

        try {
            // Start camera recording
            if (this.cameraStream) {
                this.mediaRecorder = new window.MediaRecorder(this.cameraStream, {
                    mimeType: 'video/webm;codecs=vp9',
                    videoBitsPerSecond: 2500000
                });

                this.mediaRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        this.recordedChunks.push(event.data);
                    }
                };

                this.mediaRecorder.start(10000); // Collect data every 10 seconds
                console.log('✅ Camera recording started');
            }

            // Start screen recording
            if (this.screenStream) {
                this.screenRecorder = new window.MediaRecorder(this.screenStream, {
                    mimeType: 'video/webm;codecs=vp9',
                    videoBitsPerSecond: 2500000
                });

                this.screenRecorder.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        this.screenChunks.push(event.data);
                    }
                };

                this.screenRecorder.start(10000); // Collect data every 10 seconds
                console.log('✅ Screen recording started');
            }

            this.isRecording = true;
            this.quizId = quizId;
            this.studentId = studentId;

            return { success: true };
        } catch (error) {
            console.error('❌ Failed to start recording:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Stop all recordings
     */
    async stopRecording() {
        if (!this.isRecording) {
            console.warn('⚠️ No recording in progress');
            return { success: false, error: 'No recording in progress' };
        }

        try {
            // Stop camera recording
            if (this.mediaRecorder && this.mediaRecorder.state !== 'inactive') {
                this.mediaRecorder.stop();
                console.log('✅ Camera recording stopped');
            }

            // Stop screen recording
            if (this.screenRecorder && this.screenRecorder.state !== 'inactive') {
                this.screenRecorder.stop();
                console.log('✅ Screen recording stopped');
            }

            this.isRecording = false;

            // Wait a bit for final data chunks
            await new Promise(resolve => setTimeout(resolve, 1000));

            return {
                success: true,
                cameraBlob: this.recordedChunks.length > 0 
                    ? new Blob(this.recordedChunks, { type: 'video/webm' })
                    : null,
                screenBlob: this.screenChunks.length > 0
                    ? new Blob(this.screenChunks, { type: 'video/webm' })
                    : null
            };
        } catch (error) {
            console.error('❌ Failed to stop recording:', error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Stop camera stream
     */
    stopCameraStream() {
        if (this.cameraStream) {
            this.cameraStream.getTracks().forEach(track => track.stop());
            this.cameraStream = null;
            console.log('✅ Camera stream stopped');
        }
    }

    /**
     * Stop screen stream
     */
    stopScreenStream() {
        if (this.screenStream) {
            this.screenStream.getTracks().forEach(track => track.stop());
            this.screenStream = null;
            console.log('✅ Screen stream stopped');
        }
    }

    /**
     * Stop all streams
     */
    stopAllStreams() {
        this.stopCameraStream();
        this.stopScreenStream();
    }

    /**
     * Handle when user stops screen sharing via browser UI
     */
    handleScreenShareStopped() {
        // This can trigger a warning or terminate the quiz
        console.error('🚨 VIOLATION: Screen sharing was stopped during exam');
        
        // Dispatch custom event that can be listened to
        window.dispatchEvent(new CustomEvent('screenShareStopped', {
            detail: {
                quizId: this.quizId,
                studentId: this.studentId,
                timestamp: new Date().toISOString()
            }
        }));
    }

    /**
     * Get camera preview stream for display
     */
    getCameraPreview() {
        return this.cameraStream;
    }

    /**
     * Check if browser supports required features
     */
    static checkBrowserSupport() {
        const support = {
            getUserMedia: !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia),
            getDisplayMedia: false, // Screen sharing disabled
            mediaRecorder: !!(window.MediaRecorder),
            isSupported: false
        };

        // Only require camera/microphone support
        support.isSupported = support.getUserMedia && support.mediaRecorder;

        return support;
    }

    /**
     * Upload recording to server (implement based on your backend)
     */
    async uploadRecording(blob, type, quizId, studentId) {
        try {
            const formData = new FormData();
            formData.append('recording', blob, `${type}-${quizId}-${studentId}-${Date.now()}.webm`);
            formData.append('quizId', quizId);
            formData.append('studentId', studentId);
            formData.append('type', type);
            formData.append('timestamp', new Date().toISOString());

            // TODO: Replace with your actual upload endpoint
            const response = await fetch('/api/upload-recording', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const result = await response.json();
            console.log(`✅ ${type} recording uploaded successfully`);
            return { success: true, data: result };
        } catch (error) {
            console.error(`❌ Failed to upload ${type} recording:`, error);
            return { success: false, error: error.message };
        }
    }

    /**
     * Clean up all resources
     */
    cleanup() {
        if (this.isRecording) {
            this.stopRecording();
        }
        this.stopAllStreams();
        this.recordedChunks = [];
        this.screenChunks = [];
        this.mediaRecorder = null;
        this.screenRecorder = null;
        console.log('✅ Media recorder cleaned up');
    }
}

// Create singleton instance
const mediaRecorder = new MediaRecorder();

export default mediaRecorder;
export { MediaRecorder };
