import { useState, useEffect, useCallback } from 'react';
import liveStreamManager from '@/utils/liveStreaming';

/**
 * React Hook for Live Streaming
 * Manages WebRTC streaming for quiz proctoring
 */
export function useLiveStreaming() {
    const [isStreaming, setIsStreaming] = useState(false);
    const [streamId, setStreamId] = useState(null);
    const [error, setError] = useState(null);
    const [connectionState, setConnectionState] = useState('new');

    /**
     * Start live streaming
     */
    const startStreaming = useCallback(async (cameraStream, screenStream, studentInfo, quizInfo) => {
        setError(null);

        try {
            const result = await liveStreamManager.startStreaming(
                cameraStream,
                screenStream,
                studentInfo,
                quizInfo
            );

            if (result.success) {
                setIsStreaming(true);
                setStreamId(result.streamId);
                return { success: true };
            } else {
                setError(result.error);
                return { success: false, error: result.error };
            }
        } catch (err) {
            const errorMessage = 'Failed to start live streaming';
            setError(errorMessage);
            return { success: false, error: errorMessage };
        }
    }, []);

    /**
     * Stop live streaming
     */
    const stopStreaming = useCallback(async () => {
        try {
            const result = await liveStreamManager.stopStreaming();
            
            if (result.success) {
                setIsStreaming(false);
                setStreamId(null);
                setConnectionState('closed');
            }

            return result;
        } catch (err) {
            console.error('Failed to stop streaming:', err);
            return { success: false, error: err.message };
        }
    }, []);

    /**
     * Send violation event
     */
    const sendViolation = useCallback((violation) => {
        if (isStreaming) {
            liveStreamManager.sendViolation(violation);
        }
    }, [isStreaming]);

    /**
     * Send progress update
     */
    const sendProgress = useCallback((progress) => {
        if (isStreaming) {
            liveStreamManager.sendProgress(progress);
        }
    }, [isStreaming]);

    /**
     * Get current status
     */
    const getStatus = useCallback(() => {
        return liveStreamManager.getStatus();
    }, []);

    /**
     * Monitor connection state
     */
    useEffect(() => {
        const interval = setInterval(() => {
            if (isStreaming) {
                const status = liveStreamManager.getStatus();
                setConnectionState(status.connectionState || 'unknown');
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isStreaming]);

    /**
     * Listen for connection failed event
     */
    useEffect(() => {
        const handleConnectionFailed = () => {
            setError('Connection failed. Please check your internet connection.');
            setIsStreaming(false);
        };

        window.addEventListener('connection-failed', handleConnectionFailed);

        return () => {
            window.removeEventListener('connection-failed', handleConnectionFailed);
        };
    }, []);

    /**
     * Cleanup on unmount
     */
    useEffect(() => {
        return () => {
            if (isStreaming) {
                stopStreaming();
            }
        };
    }, [isStreaming, stopStreaming]);

    return {
        // State
        isStreaming,
        streamId,
        error,
        connectionState,

        // Actions
        startStreaming,
        stopStreaming,
        sendViolation,
        sendProgress,
        getStatus
    };
}
