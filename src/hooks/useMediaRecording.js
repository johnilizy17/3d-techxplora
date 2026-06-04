import { useState, useEffect, useCallback } from 'react';
import mediaRecorder from '@/utils/mediaRecording';

/**
 * React Hook for Media Recording
 * Provides easy access to camera and microphone recording
 * Screen sharing has been disabled
 */
export function useMediaRecording() {
    const [isRecording, setIsRecording] = useState(false);
    const [hasPermissions, setHasPermissions] = useState(false);
    const [cameraStream, setCameraStream] = useState(null);
    const [error, setError] = useState(null);
    const [isRequesting, setIsRequesting] = useState(false);

    /**
     * Request media permissions (camera and microphone only)
     */
    const requestPermissions = useCallback(async () => {
        setIsRequesting(true);
        setError(null);

        try {
            const results = await mediaRecorder.requestAllPermissions();

            if (results.allGranted) {
                setHasPermissions(true);
                setCameraStream(results.camera.stream);
                return { success: true };
            } else {
                // Camera/microphone permission failed
                const errorMessage = 'Camera/Microphone access denied. You must allow access to take the quiz.';
                setError(errorMessage);
                return { 
                    success: false, 
                    error: errorMessage,
                    results 
                };
            }
        } catch (err) {
            const errorMessage = 'An unexpected error occurred while requesting permissions.';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        } finally {
            setIsRequesting(false);
        }
    }, []);

    /**
     * Start recording
     */
    const startRecording = useCallback(async (quizId, studentId) => {
        if (!hasPermissions) {
            const errorMessage = 'Permissions not granted. Please request permissions first.';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }

        const result = await mediaRecorder.startRecording(quizId, studentId);
        
        if (result.success) {
            setIsRecording(true);
        } else {
            setError(result.error);
        }

        return result;
    }, [hasPermissions]);

    /**
     * Stop recording
     */
    const stopRecording = useCallback(async () => {
        const result = await mediaRecorder.stopRecording();
        
        if (result.success) {
            setIsRecording(false);
        }

        return result;
    }, []);

    /**
     * Stop all streams and clean up
     */
    const cleanup = useCallback(() => {
        mediaRecorder.cleanup();
        setIsRecording(false);
        setHasPermissions(false);
        setCameraStream(null);
        setError(null);
    }, []);

    /**
     * Cleanup on unmount
     */
    useEffect(() => {
        return () => {
            cleanup();
        };
    }, [cleanup]);

    return {
        // State
        isRecording,
        hasPermissions,
        cameraStream,
        error,
        isRequesting,

        // Actions
        requestPermissions,
        startRecording,
        stopRecording,
        cleanup,

        // Utility
        browserSupport: mediaRecorder.constructor.checkBrowserSupport()
    };
}
