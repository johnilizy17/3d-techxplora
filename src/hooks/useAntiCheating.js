import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Anti-Cheating Hook
 * Detects tab switching, window blur, and other suspicious activities
 */
export function useAntiCheating({ onViolation, enabled = true, maxViolations = 3 }) {
    const [violations, setViolations] = useState([]);
    const [isMonitoring, setIsMonitoring] = useState(false);
    const violationCountRef = useRef(0);
    const lastViolationTimeRef = useRef(null);

    /**
     * Log a violation
     */
    const logViolation = useCallback((type, details = {}) => {
        const violation = {
            type,
            timestamp: new Date().toISOString(),
            details
        };

        console.warn('🚨 VIOLATION DETECTED:', violation);

        setViolations(prev => [...prev, violation]);
        violationCountRef.current += 1;
        lastViolationTimeRef.current = Date.now();

        // Call violation callback
        if (onViolation) {
            onViolation(violation, violationCountRef.current);
        }

        // Check if max violations reached
        if (maxViolations && violationCountRef.current >= maxViolations) {
            console.error('🚨 MAX VIOLATIONS REACHED - TERMINATING EXAM');
            return true; // Indicates exam should be terminated
        }

        return false;
    }, [onViolation, maxViolations]);

    /**
     * Handle visibility change (tab switching)
     */
    const handleVisibilityChange = useCallback(() => {
        if (!enabled || !isMonitoring) return;

        if (document.hidden) {
            console.warn('⚠️ Tab switched or minimized');
            const shouldTerminate = logViolation('tab-switch', {
                action: 'Tab switched or window minimized',
                visibilityState: document.visibilityState
            });

            if (shouldTerminate) {
                // Dispatch custom event for termination
                window.dispatchEvent(new CustomEvent('examTerminated', {
                    detail: { reason: 'max-violations', type: 'tab-switch' }
                }));
            }
        }
    }, [enabled, isMonitoring, logViolation]);

    /**
     * Handle window blur (clicking outside browser)
     */
    const handleWindowBlur = useCallback(() => {
        if (!enabled || !isMonitoring) return;

        console.warn('⚠️ Window lost focus');
        const shouldTerminate = logViolation('window-blur', {
            action: 'Window lost focus (clicked outside browser)'
        });

        if (shouldTerminate) {
            window.dispatchEvent(new CustomEvent('examTerminated', {
                detail: { reason: 'max-violations', type: 'window-blur' }
            }));
        }
    }, [enabled, isMonitoring, logViolation]);

    /**
     * Handle context menu (right-click)
     */
    const handleContextMenu = useCallback((e) => {
        if (!enabled || !isMonitoring) return;

        e.preventDefault();
        console.warn('⚠️ Right-click detected');
        logViolation('context-menu', {
            action: 'Right-click attempted'
        });
    }, [enabled, isMonitoring, logViolation]);

    /**
     * Handle keyboard shortcuts (Ctrl+C, Ctrl+V, etc.)
     */
    const handleKeyDown = useCallback((e) => {
        if (!enabled || !isMonitoring) return;

        // Detect common cheating shortcuts
        const isCopy = (e.ctrlKey || e.metaKey) && e.key === 'c';
        const isPaste = (e.ctrlKey || e.metaKey) && e.key === 'v';
        const isPrint = (e.ctrlKey || e.metaKey) && e.key === 'p';
        const isDevTools = e.key === 'F12' || ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'I');

        if (isCopy || isPaste || isPrint || isDevTools) {
            e.preventDefault();
            console.warn('⚠️ Suspicious keyboard shortcut:', e.key);
            logViolation('keyboard-shortcut', {
                action: `Keyboard shortcut attempted: ${e.key}`,
                key: e.key,
                ctrlKey: e.ctrlKey,
                metaKey: e.metaKey,
                shiftKey: e.shiftKey
            });
        }
    }, [enabled, isMonitoring, logViolation]);

    /**
     * Handle beforeunload (trying to close/refresh)
     */
    const handleBeforeUnload = useCallback((e) => {
        if (!enabled || !isMonitoring) return;

        console.warn('⚠️ User attempting to leave page');
        logViolation('page-leave-attempt', {
            action: 'Attempted to close or refresh page'
        });

        // Show browser warning
        e.preventDefault();
        e.returnValue = 'Are you sure you want to leave? Your exam progress may be lost and this will be flagged as a violation.';
        return e.returnValue;
    }, [enabled, isMonitoring, logViolation]);

    /**
     * Start monitoring
     */
    const startMonitoring = useCallback(() => {
        console.log('🔒 Anti-cheating monitoring started');
        setIsMonitoring(true);
    }, []);

    /**
     * Stop monitoring
     */
    const stopMonitoring = useCallback(() => {
        console.log('🔓 Anti-cheating monitoring stopped');
        setIsMonitoring(false);
    }, []);

    /**
     * Reset violations
     */
    const resetViolations = useCallback(() => {
        setViolations([]);
        violationCountRef.current = 0;
        lastViolationTimeRef.current = null;
    }, []);

    /**
     * Setup event listeners
     */
    useEffect(() => {
        if (!enabled || !isMonitoring) return;

        // Add event listeners
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleWindowBlur);
        document.addEventListener('contextmenu', handleContextMenu);
        document.addEventListener('keydown', handleKeyDown);
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleWindowBlur);
            document.removeEventListener('contextmenu', handleContextMenu);
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [enabled, isMonitoring, handleVisibilityChange, handleWindowBlur, handleContextMenu, handleKeyDown, handleBeforeUnload]);

    /**
     * Fullscreen monitoring (optional)
     */
    useEffect(() => {
        if (!enabled || !isMonitoring) return;

        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                console.warn('⚠️ Exited fullscreen mode');
                logViolation('fullscreen-exit', {
                    action: 'Exited fullscreen mode'
                });
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);

        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
        };
    }, [enabled, isMonitoring, logViolation]);

    return {
        // State
        violations,
        violationCount: violationCountRef.current,
        isMonitoring,
        lastViolationTime: lastViolationTimeRef.current,

        // Actions
        startMonitoring,
        stopMonitoring,
        resetViolations,
        logViolation,

        // Utilities
        hasViolations: violations.length > 0,
        isTerminated: violationCountRef.current >= maxViolations
    };
}
