/**
 * Quiz Progress Storage Utility
 * Manages localStorage for quiz progress persistence
 */

const STORAGE_KEY_PREFIX = 'quiz_progress_';
const STORAGE_EXPIRY_HOURS = 24; // Quiz progress expires after 24 hours

/**
 * Save quiz progress to localStorage
 * @param {string} quizCode - Unique quiz identifier
 * @param {object} progressData - Quiz progress data
 */
export const saveQuizProgress = (quizCode, progressData) => {
    try {
        const storageKey = `${STORAGE_KEY_PREFIX}${quizCode}`;
        const dataToStore = {
            ...progressData,
            timestamp: Date.now(),
            expiresAt: Date.now() + (STORAGE_EXPIRY_HOURS * 60 * 60 * 1000)
        };
        
        localStorage.setItem(storageKey, JSON.stringify(dataToStore));
        return true;
    } catch (error) {
        console.error('Failed to save quiz progress:', error);
        return false;
    }
};

/**
 * Load quiz progress from localStorage
 * @param {string} quizCode - Unique quiz identifier
 * @returns {object|null} - Quiz progress data or null if not found/expired
 */
export const loadQuizProgress = (quizCode) => {
    try {
        const storageKey = `${STORAGE_KEY_PREFIX}${quizCode}`;
        const storedData = localStorage.getItem(storageKey);
        
        if (!storedData) {
            return null;
        }
        
        const parsedData = JSON.parse(storedData);
        
        // Check if data has expired
        if (parsedData.expiresAt && Date.now() > parsedData.expiresAt) {
            clearQuizProgress(quizCode);
            return null;
        }
        
        return parsedData;
    } catch (error) {
        console.error('Failed to load quiz progress:', error);
        return null;
    }
};

/**
 * Clear quiz progress from localStorage
 * @param {string} quizCode - Unique quiz identifier
 */
export const clearQuizProgress = (quizCode) => {
    try {
        const storageKey = `${STORAGE_KEY_PREFIX}${quizCode}`;
        localStorage.removeItem(storageKey);
        return true;
    } catch (error) {
        console.error('Failed to clear quiz progress:', error);
        return false;
    }
};

/**
 * Check if quiz progress exists
 * @param {string} quizCode - Unique quiz identifier
 * @returns {boolean} - True if progress exists and is valid
 */
export const hasQuizProgress = (quizCode) => {
    const progress = loadQuizProgress(quizCode);
    return progress !== null;
};

/**
 * Clear all expired quiz progress data
 */
export const clearExpiredProgress = () => {
    try {
        const keys = Object.keys(localStorage);
        const quizKeys = keys.filter(key => key.startsWith(STORAGE_KEY_PREFIX));
        
        quizKeys.forEach(key => {
            const data = localStorage.getItem(key);
            if (data) {
                try {
                    const parsed = JSON.parse(data);
                    if (parsed.expiresAt && Date.now() > parsed.expiresAt) {
                        localStorage.removeItem(key);
                    }
                } catch (e) {
                    // Invalid data, remove it
                    localStorage.removeItem(key);
                }
            }
        });
        
        return true;
    } catch (error) {
        console.error('Failed to clear expired progress:', error);
        return false;
    }
};

/**
 * Get time remaining until quiz progress expires
 * @param {string} quizCode - Unique quiz identifier
 * @returns {number|null} - Milliseconds until expiry, or null if not found
 */
export const getProgressTimeRemaining = (quizCode) => {
    const progress = loadQuizProgress(quizCode);
    if (!progress || !progress.expiresAt) {
        return null;
    }
    
    const remaining = progress.expiresAt - Date.now();
    return remaining > 0 ? remaining : 0;
};
