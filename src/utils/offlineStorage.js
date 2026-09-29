// IndexedDB wrapper for offline data storage

const DB_NAME = 'techxplora-offline';
const DB_VERSION = 1;

// Store names
const STORES = {
  QUIZZES: 'quizzes',
  COURSES: 'courses',
  QUESTIONS: 'questions',
  USER_PROGRESS: 'user_progress',
  PENDING_SYNC: 'pending_sync'
};

// Check if IndexedDB is available
function isIndexedDBAvailable() {
  try {
    return typeof indexedDB !== 'undefined' && indexedDB !== null;
  } catch (e) {
    return false;
  }
}

// Initialize IndexedDB
export function initDB() {
  if (!isIndexedDBAvailable()) {
    return Promise.reject(new Error('IndexedDB not available'));
  }

  return new Promise((resolve, reject) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;

        // Create object stores if they don't exist
        if (!db.objectStoreNames.contains(STORES.QUIZZES)) {
          db.createObjectStore(STORES.QUIZZES, { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains(STORES.COURSES)) {
          db.createObjectStore(STORES.COURSES, { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains(STORES.QUESTIONS)) {
          db.createObjectStore(STORES.QUESTIONS, { keyPath: 'id' });
        }

        if (!db.objectStoreNames.contains(STORES.USER_PROGRESS)) {
          const progressStore = db.createObjectStore(STORES.USER_PROGRESS, { keyPath: 'id', autoIncrement: true });
          progressStore.createIndex('quiz_id', 'quiz_id', { unique: false });
          progressStore.createIndex('timestamp', 'timestamp', { unique: false });
        }

        if (!db.objectStoreNames.contains(STORES.PENDING_SYNC)) {
          const syncStore = db.createObjectStore(STORES.PENDING_SYNC, { keyPath: 'id', autoIncrement: true });
          syncStore.createIndex('timestamp', 'timestamp', { unique: false });
          syncStore.createIndex('type', 'type', { unique: false });
        }
      };
    } catch (error) {
      reject(error);
    }
  });
}

// Generic function to add/update data
export async function saveData(storeName, data) {
  try {
    if (!isIndexedDBAvailable()) {
      console.warn('IndexedDB not available, skipping save');
      return null;
    }

    const db = await initDB();
    return new Promise((resolve, reject) => {
      try {
        const transaction = db.transaction([storeName], 'readwrite');
        const store = transaction.objectStore(storeName);
        const request = store.put(data);

        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      } catch (error) {
        reject(error);
      }
    });
  } catch (error) {
    console.warn('Failed to save data:', error);
    return null;
  }
}

// Generic function to get data by ID
export async function getData(storeName, id) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.get(id);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Generic function to get all data from a store
export async function getAllData(storeName) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Delete data by ID
export async function deleteData(storeName, id) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Clear all data from a store
export async function clearStore(storeName) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([storeName], 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.clear();

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Save quiz for offline access
export async function saveQuizOffline(quiz) {
  return saveData(STORES.QUIZZES, {
    ...quiz,
    cached_at: Date.now()
  });
}

// Get offline quiz
export async function getOfflineQuiz(quizId) {
  return getData(STORES.QUIZZES, quizId);
}

// Get all offline quizzes
export async function getAllOfflineQuizzes() {
  return getAllData(STORES.QUIZZES);
}

// Save course for offline access
export async function saveCourseOffline(course) {
  return saveData(STORES.COURSES, {
    ...course,
    cached_at: Date.now()
  });
}

// Get offline course
export async function getOfflineCourse(courseId) {
  return getData(STORES.COURSES, courseId);
}

// Get all offline courses
export async function getAllOfflineCourses() {
  return getAllData(STORES.COURSES);
}

// Check if content is available offline
export async function isAvailableOffline(type, id) {
  try {
    if (type === 'quiz') {
      const quiz = await getOfflineQuiz(id);
      return !!quiz;
    } else if (type === 'course') {
      const course = await getOfflineCourse(id);
      return !!course;
    }
    return false;
  } catch (error) {
    return false;
  }
}

// Save user progress (for syncing later)
export async function saveUserProgress(progressData) {
  return saveData(STORES.USER_PROGRESS, {
    ...progressData,
    timestamp: Date.now(),
    synced: false
  });
}

// Get user progress
export async function getUserProgress(quizId) {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction([STORES.USER_PROGRESS], 'readonly');
    const store = transaction.objectStore(storeName);
    const index = store.index('quiz_id');
    const request = index.getAll(quizId);

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Queue action for background sync
export async function queueForSync(action) {
  return saveData(STORES.PENDING_SYNC, {
    ...action,
    timestamp: Date.now(),
    synced: false
  });
}

// Get all pending sync items
export async function getPendingSyncItems() {
  const items = await getAllData(STORES.PENDING_SYNC);
  return items.filter(item => !item.synced);
}

// Mark sync item as completed
export async function markSyncComplete(id) {
  const item = await getData(STORES.PENDING_SYNC, id);
  if (item) {
    item.synced = true;
    item.synced_at = Date.now();
    await saveData(STORES.PENDING_SYNC, item);
  }
}

// Clear old cached data (older than 7 days)
export async function clearOldCache() {
  const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
  
  for (const storeName of [STORES.QUIZZES, STORES.COURSES]) {
    const items = await getAllData(storeName);
    
    for (const item of items) {
      if (item.cached_at && item.cached_at < sevenDaysAgo) {
        await deleteData(storeName, item.id);
      }
    }
  }
}

// Get storage usage statistics
export async function getStorageStats() {
  const stats = {
    quizzes: (await getAllData(STORES.QUIZZES)).length,
    courses: (await getAllData(STORES.COURSES)).length,
    questions: (await getAllData(STORES.QUESTIONS)).length,
    progress: (await getAllData(STORES.USER_PROGRESS)).length,
    pendingSync: (await getPendingSyncItems()).length
  };

  return stats;
}

export { STORES };
