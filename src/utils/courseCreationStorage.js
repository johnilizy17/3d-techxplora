/**
 * Course Creation Form Storage Utility
 * Manages localStorage for course creation form data persistence
 */

const STORAGE_KEY = 'course_creation_draft';
const STORAGE_EXPIRY_HOURS = 72; // Draft expires after 72 hours (longer for courses)

/**
 * Save course creation form data to localStorage
 * @param {object} formData - Course creation form data
 * @param {number} currentStep - Current step in the form
 */
export const saveCourseDraft = (formData, currentStep = 1) => {
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
        console.error('Failed to save course draft:', error);
        return false;
    }
};

/**
 * Load course creation draft from localStorage
 * @returns {object|null} - Draft data or null if not found/expired
 */
export const loadCourseDraft = () => {
    try {
        const storedData = localStorage.getItem(STORAGE_KEY);
        
        if (!storedData) {
            return null;
        }
        
        const parsedData = JSON.parse(storedData);
        
        // Check if data has expired
        if (parsedData.expiresAt && Date.now() > parsedData.expiresAt) {
            clearCourseDraft();
            return null;
        }
        
        return parsedData;
    } catch (error) {
        console.error('Failed to load course draft:', error);
        return null;
    }
};

/**
 * Clear course creation draft from localStorage
 */
export const clearCourseDraft = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('Failed to clear course draft:', error);
        return false;
    }
};

/**
 * Check if course creation draft exists
 * @returns {boolean} - True if draft exists and is valid
 */
export const hasCourseDraft = () => {
    const draft = loadCourseDraft();
    return draft !== null;
};

/**
 * Get time remaining until draft expires
 * @returns {number|null} - Milliseconds until expiry, or null if not found
 */
export const getDraftTimeRemaining = () => {
    const draft = loadCourseDraft();
    if (!draft || !draft.expiresAt) {
        return null;
    }
    
    const remaining = draft.expiresAt - Date.now();
    return remaining > 0 ? remaining : 0;
};
