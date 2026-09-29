/**
 * Quiz Creation Form Storage Utility
 * Manages localStorage for quiz creation form data persistence
 */

const STORAGE_KEY = 'quiz_creation_draft';
const STORAGE_EXPIRY_HOURS = 48; // Draft expires after 48 hours

/**
 * Save quiz creation form data to localStorage
 * @param {object} formData - Quiz creation form data
 * @param {number} currentStep - Current step in the form
 */
export const saveQuizDraft = (formData, currentStep = 1) => {
    try {
        const dataToStore = {
            formData,
            currentStep,
            timestamp: Date.now(),
            expiresAt: Date.now() + (STORAGE_EXPIRY_HOURS * 60 * 60 * 1000)
        };
        
        localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
        return true;
    } catch (error) {
        console.error('Failed to save quiz draft:', error);
        return false;
    }
};

/**
 * Load quiz creation draft from localStorage
 * @returns {object|null} - Draft data or null if not found/expired
 */
export const loadQuizDraft = () => {
    try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        
        if (!storedData) {
            return null;
        }
        
        const parsedData = JSON.parse(storedData);
        
        // Check if data has expired
        if (parsedData.expiresAt && Date.now() > parsedData.expiresAt) {
            clearQuizDraft();
            return null;
        }
        
        return parsedData;
    } catch (error) {
        console.error('Failed to load quiz draft:', error);
        return null;
    }
};

/**
 * Clear quiz creation draft from localStorage
 */
export const clearQuizDraft = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('Failed to clear quiz draft:', error);
        return false;
    }
};

/**
 * Check if quiz creation draft exists
 * @returns {boolean} - True if draft exists and is valid
 */
export const hasQuizDraft = () => {
    const draft = loadQuizDraft();
    return draft !== null;
};

/**
 * Get time remaining until draft expires
 * @returns {number|null} - Milliseconds until expiry, or null if not found
 */
export const getDraftTimeRemaining = () => {
    const draft = loadQuizDraft();
    if (!draft || !draft.expiresAt) {
        return null;
    }
    
    const remaining = draft.expiresAt - Date.now();
    return remaining > 0 ? remaining : 0;
};
