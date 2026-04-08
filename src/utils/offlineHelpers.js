// Helper functions to integrate offline support into existing components

import { 
  saveQuizOffline as saveQuizToStorage, 
  saveCourseOffline as saveCourseToStorage,
  getOfflineQuiz,
  getOfflineCourse,
  getAllOfflineQuizzes,
  getAllOfflineCourses,
  queueForSync,
  saveUserProgress,
  isAvailableOffline as checkOfflineAvailability
} from './offlineStorage';
import { toast } from 'sonner';

// Re-export storage functions
export { saveQuizToStorage as saveQuizOffline, saveCourseToStorage as saveCourseOffline, checkOfflineAvailability as isAvailableOffline };

/**
 * Fetch quiz with offline fallback
 * Use this instead of direct API calls
 */
export async function fetchQuizWithOffline(quizId, apiFetchFunction) {
  try {
    // Try to fetch from API
    const quiz = await apiFetchFunction(quizId);
    
    // Save to offline storage for later
    await saveQuizToStorage(quiz);
    
    return quiz;
  } catch (error) {
    console.log('API fetch failed, trying offline cache:', error);
    
    // Try to get from offline storage
    const offlineQuiz = await getOfflineQuiz(quizId);
    
    if (offlineQuiz) {
      toast.info('Loaded from offline cache');
      return offlineQuiz;
    }
    
    throw error;
  }
}

/**
 * Fetch course with offline fallback
 */
export async function fetchCourseWithOffline(courseId, apiFetchFunction) {
  try {
    const course = await apiFetchFunction(courseId);
    await saveCourseToStorage(course);
    return course;
  } catch (error) {
    console.log('API fetch failed, trying offline cache:', error);
    
    const offlineCourse = await getOfflineCourse(courseId);
    
    if (offlineCourse) {
      toast.info('Loaded from offline cache');
      return offlineCourse;
    }
    
    throw error;
  }
}

/**
 * Submit quiz with offline queue
 */
export async function submitQuizWithOffline(quizData, apiSubmitFunction) {
  // Check if online
  if (!navigator.onLine) {
    // Queue for later sync
    await queueForSync({
      type: 'quiz_submission',
      data: quizData,
      timestamp: Date.now()
    });
    
    toast.success('Quiz saved! Will submit when online.', {
      description: 'Your answers are saved locally'
    });
    
    return { queued: true };
  }
  
  try {
    // Try to submit online
    const result = await apiSubmitFunction(quizData);
    return result;
  } catch (error) {
    // If submission fails, queue it
    await queueForSync({
      type: 'quiz_submission',
      data: quizData,
      timestamp: Date.now()
    });
    
    toast.warning('Submission queued', {
      description: 'Will retry when connection is restored'
    });
    
    return { queued: true, error };
  }
}

/**
 * Enroll in course with offline queue
 */
export async function enrollCourseWithOffline(courseId, userId, apiEnrollFunction) {
  if (!navigator.onLine) {
    await queueForSync({
      type: 'course_enrollment',
      data: { courseId, userId },
      timestamp: Date.now()
    });
    
    toast.success('Enrollment saved! Will process when online.');
    return { queued: true };
  }
  
  try {
    const result = await apiEnrollFunction(courseId, userId);
    return result;
  } catch (error) {
    await queueForSync({
      type: 'course_enrollment',
      data: { courseId, userId },
      timestamp: Date.now()
    });
    
    toast.warning('Enrollment queued');
    return { queued: true, error };
  }
}

/**
 * Update progress with offline support
 */
export async function updateProgressWithOffline(progressData, apiUpdateFunction) {
  // Always save locally first
  await saveUserProgress(progressData);
  
  if (!navigator.onLine) {
    await queueForSync({
      type: 'progress_update',
      data: progressData,
      timestamp: Date.now()
    });
    
    return { saved: true, queued: true };
  }
  
  try {
    const result = await apiUpdateFunction(progressData);
    return result;
  } catch (error) {
    await queueForSync({
      type: 'progress_update',
      data: progressData,
      timestamp: Date.now()
    });
    
    return { saved: true, queued: true, error };
  }
}

/**
 * Get all available offline content
 */
export async function getOfflineContent() {
  const [quizzes, courses] = await Promise.all([
    getAllOfflineQuizzes(),
    getAllOfflineCourses()
  ]);
  
  return {
    quizzes,
    courses,
    total: quizzes.length + courses.length
  };
}

/**
 * Prefetch content for offline use
 * Call this when user views content to cache it
 */
export async function prefetchForOffline(type, id, fetchFunction) {
  try {
    const data = await fetchFunction(id);
    
    if (type === 'quiz') {
      await saveQuizOffline(data);
    } else if (type === 'course') {
      await saveCourseOffline(data);
    }
    
    return true;
  } catch (error) {
    console.error('Failed to prefetch for offline:', error);
    return false;
  }
}

/**
 * Batch prefetch multiple items
 */
export async function batchPrefetchForOffline(items, fetchFunction) {
  const results = await Promise.allSettled(
    items.map(item => prefetchForOffline(item.type, item.id, fetchFunction))
  );
  
  const successful = results.filter(r => r.status === 'fulfilled' && r.value).length;
  const failed = results.length - successful;
  
  if (successful > 0) {
    toast.success(`${successful} items cached for offline use`);
  }
  
  if (failed > 0) {
    toast.warning(`${failed} items failed to cache`);
  }
  
  return { successful, failed };
}

/**
 * Smart fetch - automatically handles online/offline
 */
export async function smartFetch(url, options = {}) {
  const cacheKey = `api-${url}`;
  
  // Try network first
  if (navigator.onLine) {
    try {
      const response = await fetch(url, options);
      
      if (response.ok) {
        const data = await response.json();
        
        // Cache the response
        localStorage.setItem(cacheKey, JSON.stringify({
          data,
          timestamp: Date.now()
        }));
        
        return data;
      }
    } catch (error) {
      console.log('Network fetch failed, trying cache:', error);
    }
  }
  
  // Fallback to cache
  const cached = localStorage.getItem(cacheKey);
  
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    const age = Date.now() - timestamp;
    const maxAge = 24 * 60 * 60 * 1000; // 24 hours
    
    if (age < maxAge) {
      toast.info('Loaded from cache');
      return data;
    }
  }
  
  throw new Error('No cached data available');
}

/**
 * Retry failed requests
 */
export async function retryFailedRequests(syncFunction) {
  if (!navigator.onLine) {
    toast.error('Cannot retry - you are offline');
    return;
  }
  
  try {
    await syncFunction();
    toast.success('All pending requests synced!');
  } catch (error) {
    toast.error('Some requests failed to sync');
    console.error('Retry failed:', error);
  }
}

/**
 * Download content for offline use
 * Shows progress and confirmation
 */
export async function downloadForOffline(items, fetchFunction) {
  if (items.length === 0) {
    toast.error('No items to download');
    return;
  }
  
  toast.info(`Downloading ${items.length} items for offline use...`);
  
  let completed = 0;
  const total = items.length;
  
  for (const item of items) {
    try {
      await prefetchForOffline(item.type, item.id, fetchFunction);
      completed++;
      
      // Show progress
      if (completed % 5 === 0 || completed === total) {
        toast.info(`Downloaded ${completed}/${total} items`);
      }
    } catch (error) {
      console.error('Failed to download item:', item, error);
    }
  }
  
  toast.success(`Downloaded ${completed}/${total} items for offline use!`);
  
  return { completed, total };
}

/**
 * Check if app can work offline
 */
export function canWorkOffline() {
  return (
    'serviceWorker' in navigator &&
    'caches' in window &&
    'indexedDB' in window
  );
}

/**
 * Get offline capabilities status
 */
export async function getOfflineStatus() {
  const content = await getOfflineContent();
  
  return {
    supported: canWorkOffline(),
    online: navigator.onLine,
    cachedQuizzes: content.quizzes.length,
    cachedCourses: content.courses.length,
    totalCached: content.total
  };
}
