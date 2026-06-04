import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useLogActivityMutation } from '@/redux/api/userStreamApi';

/**
 * Custom hook for logging user activities during quizzes
 * @param {string} quizCode - The quiz code to log activities for
 */
export const useActivityLogger = (quizCode) => {
    const [logActivity] = useLogActivityMutation();
    const user = useSelector((state) => state.auth.user);
    const userId = user?.id;

    const logQuizStart = useCallback(async (additionalData = {}) => {
        if (!userId) {
            console.warn('Cannot log activity: User ID not available');
            return;
        }
        
        try {
            await logActivity({
                user_id: userId,
                quiz_code: quizCode,
                activity_type: 'quiz_start',
                activity_data: {
                    device_type: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
                    browser: navigator.userAgent,
                    screen_size: `${window.screen.width}x${window.screen.height}`,
                    ...additionalData,
                },
            }).unwrap();
        } catch (error) {
            // Silently handle connection errors
            if (error?.status !== 'FETCH_ERROR') {
                console.error('Failed to log quiz start:', error);
            }
        }
    }, [quizCode, userId, logActivity]);

    const logQuestionViewed = useCallback(async (questionNumber, questionId, additionalData = {}) => {
        if (!userId) return;
        
        try {
            await logActivity({
                user_id: userId,
                quiz_code: quizCode,
                activity_type: 'question_viewed',
                activity_data: {
                    question_number: questionNumber,
                    question_id: questionId,
                    timestamp: new Date().toISOString(),
                    ...additionalData,
                },
            }).unwrap();
        } catch (error) {
            // Silently handle connection errors to avoid console spam
            if (error?.status !== 'FETCH_ERROR') {
                console.error('Failed to log question viewed:', error);
            }
        }
    }, [quizCode, userId, logActivity]);

    const logQuestionAnswered = useCallback(async (questionNumber, questionId, answer, timeSpent, isCorrect = null, additionalData = {}) => {
        if (!userId) return;
        
        try {
            await logActivity({
                user_id: userId,
                quiz_code: quizCode,
                activity_type: 'question_answered',
                activity_data: {
                    question_number: questionNumber,
                    question_id: questionId,
                    answer: answer,
                    time_spent_seconds: timeSpent,
                    is_correct: isCorrect,
                    timestamp: new Date().toISOString(),
                    ...additionalData,
                },
            }).unwrap();
        } catch (error) {
            // Silently handle connection errors
            if (error?.status !== 'FETCH_ERROR') {
                console.error('Failed to log question answered:', error);
            }
        }
    }, [quizCode, userId, logActivity]);

    const logQuestionSkipped = useCallback(async (questionNumber, questionId, additionalData = {}) => {
        if (!userId) return;
        
        try {
            await logActivity({
                user_id: userId,
                quiz_code: quizCode,
                activity_type: 'question_skipped',
                activity_data: {
                    question_number: questionNumber,
                    question_id: questionId,
                    timestamp: new Date().toISOString(),
                    ...additionalData,
                },
            }).unwrap();
        } catch (error) {
            // Silently handle connection errors
            if (error?.status !== 'FETCH_ERROR') {
                console.error('Failed to log question skipped:', error);
            }
        }
    }, [quizCode, userId, logActivity]);

    const logQuizPaused = useCallback(async (currentQuestion, additionalData = {}) => {
        if (!userId) return;
        
        try {
            await logActivity({
                user_id: userId,
                quiz_code: quizCode,
                activity_type: 'quiz_paused',
                activity_data: {
                    current_question: currentQuestion,
                    timestamp: new Date().toISOString(),
                    ...additionalData,
                },
            }).unwrap();
        } catch (error) {
            // Silently handle connection errors
            if (error?.status !== 'FETCH_ERROR') {
                console.error('Failed to log quiz paused:', error);
            }
        }
    }, [quizCode, userId, logActivity]);

    const logQuizResumed = useCallback(async (currentQuestion, additionalData = {}) => {
        if (!userId) return;
        
        try {
            await logActivity({
                user_id: userId,
                quiz_code: quizCode,
                activity_type: 'quiz_resumed',
                activity_data: {
                    current_question: currentQuestion,
                    timestamp: new Date().toISOString(),
                    ...additionalData,
                },
            }).unwrap();
        } catch (error) {
            // Silently handle connection errors
            if (error?.status !== 'FETCH_ERROR') {
                console.error('Failed to log quiz resumed:', error);
            }
        }
    }, [quizCode, userId, logActivity]);

    const logQuizCompleted = useCallback(async (score, totalQuestions, timeSpent, additionalData = {}) => {
        if (!userId) return;
        
        try {
            await logActivity({
                user_id: userId,
                quiz_code: quizCode,
                activity_type: 'quiz_completed',
                activity_data: {
                    score: score,
                    total_questions: totalQuestions,
                    total_time_spent_seconds: timeSpent,
                    completion_percentage: (score / totalQuestions) * 100,
                    timestamp: new Date().toISOString(),
                    ...additionalData,
                },
            }).unwrap();
        } catch (error) {
            // Silently handle connection errors
            if (error?.status !== 'FETCH_ERROR') {
                console.error('Failed to log quiz completed:', error);
            }
        }
    }, [quizCode, userId, logActivity]);

    const logQuizAbandoned = useCallback(async (currentQuestion, questionsAnswered, additionalData = {}) => {
        if (!userId) return;
        
        try {
            await logActivity({
                user_id: userId,
                quiz_code: quizCode,
                activity_type: 'quiz_abandoned',
                activity_data: {
                    current_question: currentQuestion,
                    questions_answered: questionsAnswered,
                    timestamp: new Date().toISOString(),
                    ...additionalData,
                },
            }).unwrap();
        } catch (error) {
            // Silently handle connection errors
            if (error?.status !== 'FETCH_ERROR') {
                console.error('Failed to log quiz abandoned:', error);
            }
        }
    }, [quizCode, userId, logActivity]);

    const logCustomActivity = useCallback(async (activityType, activityData = {}) => {
        if (!userId) return;
        
        try {
            await logActivity({
                user_id: userId,
                quiz_code: quizCode,
                activity_type: activityType,
                activity_data: {
                    timestamp: new Date().toISOString(),
                    ...activityData,
                },
            }).unwrap();
        } catch (error) {
            // Silently handle connection errors
            if (error?.status !== 'FETCH_ERROR') {
                console.error(`Failed to log ${activityType}:`, error);
            }
        }
    }, [quizCode, userId, logActivity]);

    return {
        logQuizStart,
        logQuestionViewed,
        logQuestionAnswered,
        logQuestionSkipped,
        logQuizPaused,
        logQuizResumed,
        logQuizCompleted,
        logQuizAbandoned,
        logCustomActivity,
    };
};
