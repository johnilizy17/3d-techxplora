import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Custom hook to use Web Workers
 * @param {string} workerPath - Path to the worker file
 * @returns {object} - Worker utilities
 */
export function useWebWorker(workerPath) {
  const workerRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      workerRef.current = new Worker(workerPath);
      
      workerRef.current.onmessage = (event) => {
        // Handle messages in the component
      };

      workerRef.current.onerror = (error) => {
        console.error('Worker error:', error);
        setError(error.message);
      };

      setIsReady(true);

      return () => {
        if (workerRef.current) {
          workerRef.current.terminate();
        }
      };
    } catch (err) {
      console.error('Failed to create worker:', err);
      setError(err.message);
    }
  }, [workerPath]);

  const postMessage = useCallback((message) => {
    if (workerRef.current && isReady) {
      workerRef.current.postMessage(message);
    } else {
      console.warn('Worker not ready');
    }
  }, [isReady]);

  const addEventListener = useCallback((callback) => {
    if (workerRef.current) {
      workerRef.current.onmessage = callback;
    }
  }, []);

  return {
    postMessage,
    addEventListener,
    isReady,
    error,
    worker: workerRef.current
  };
}

/**
 * Hook for quiz processing worker
 */
export function useQuizWorker() {
  const { postMessage, addEventListener, isReady, error } = useWebWorker('/workers/quiz-processor.worker.js');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    addEventListener((event) => {
      const { type, result, error } = event.data;
      
      setLoading(false);
      
      if (error) {
        console.error('Quiz worker error:', error);
        return;
      }

      setResult({ type, data: result });
    });
  }, [addEventListener]);

  const calculateScore = useCallback((answers, questions, pointsPerQuestion) => {
    setLoading(true);
    postMessage({
      type: 'CALCULATE_SCORE',
      data: { answers, questions, pointsPerQuestion }
    });
  }, [postMessage]);

  const validateAnswers = useCallback((answers, questions) => {
    setLoading(true);
    postMessage({
      type: 'VALIDATE_ANSWERS',
      data: { answers, questions }
    });
  }, [postMessage]);

  const analyzePerformance = useCallback((results, timeSpent, questions) => {
    setLoading(true);
    postMessage({
      type: 'ANALYZE_PERFORMANCE',
      data: { results, timeSpent, questions }
    });
  }, [postMessage]);

  const processBulkQuestions = useCallback((questions, format) => {
    setLoading(true);
    postMessage({
      type: 'PROCESS_BULK_QUESTIONS',
      data: { questions, format }
    });
  }, [postMessage]);

  const generateStatistics = useCallback((quizzes, students, timeRange) => {
    setLoading(true);
    postMessage({
      type: 'GENERATE_STATISTICS',
      data: { quizzes, students, timeRange }
    });
  }, [postMessage]);

  return {
    calculateScore,
    validateAnswers,
    analyzePerformance,
    processBulkQuestions,
    generateStatistics,
    result,
    loading,
    isReady,
    error
  };
}

/**
 * Hook for data sync worker
 */
export function useSyncWorker() {
  const { postMessage, addEventListener, isReady, error } = useWebWorker('/workers/data-sync.worker.js');
  const [result, setResult] = useState(null);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    addEventListener((event) => {
      const { type, result, progress, error } = event.data;
      
      if (error) {
        console.error('Sync worker error:', error);
        setLoading(false);
        return;
      }

      if (type === 'SYNC_PROGRESS' || type === 'BATCH_PROGRESS') {
        setProgress(progress);
      } else {
        setLoading(false);
        setResult({ type, data: result });
      }
    });
  }, [addEventListener]);

  const syncPendingData = useCallback((items, apiUrl, token) => {
    setLoading(true);
    setProgress(null);
    postMessage({
      type: 'SYNC_PENDING_DATA',
      data: { items, apiUrl, token }
    });
  }, [postMessage]);

  const batchUpload = useCallback((items, apiUrl, token, batchSize) => {
    setLoading(true);
    setProgress(null);
    postMessage({
      type: 'BATCH_UPLOAD',
      data: { items, apiUrl, token, batchSize }
    });
  }, [postMessage]);

  const compressData = useCallback((items) => {
    setLoading(true);
    postMessage({
      type: 'COMPRESS_DATA',
      data: { items }
    });
  }, [postMessage]);

  const validateSyncData = useCallback((items) => {
    setLoading(true);
    postMessage({
      type: 'VALIDATE_SYNC_DATA',
      data: { items }
    });
  }, [postMessage]);

  return {
    syncPendingData,
    batchUpload,
    compressData,
    validateSyncData,
    result,
    progress,
    loading,
    isReady,
    error
  };
}
