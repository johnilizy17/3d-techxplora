/**
 * Utility functions for managing quiz drafts in localStorage.
 * Drafts are stored as an array of objects containing quiz metadata and questions.
 */

const DRAFTS_KEY = "xplora_drafts";

/**
 * Save a new draft or update an existing one.
 * @param {Object} draft - The draft object to save.
 */
export const saveDraft = (draft) => {
    try {
        const existing = getDrafts();
        // Check if draft already exists (by quiz_code or id) to update it, otherwise append
        const index = existing.findIndex(d =>
            (d.quiz_code && d.quiz_code === draft.quiz_code) ||
            (d.id && d.id === draft.id)
        );

        const draftWithTimestamp = {
            ...draft,
            last_saved: new Date().toISOString()
        };

        if (index !== -1) {
            existing[index] = draftWithTimestamp;
        } else {
            existing.unshift(draftWithTimestamp); // Add new drafts to the top
        }

        localStorage.setItem(DRAFTS_KEY, JSON.stringify(existing));
        return true;
    } catch (error) {
        console.error("Error saving draft:", error);
        return false;
    }
};

/**
 * Retrieve all saved drafts.
 * @returns {Array} List of draft objects.
 */
export const getDrafts = () => {
    try {
        const existing = localStorage.getItem(DRAFTS_KEY);
        return existing ? JSON.parse(existing) : [];
    } catch (error) {
        console.error("Error retrieving drafts:", error);
        return [];
    }
};

/**
 * Remove a draft by its index or a unique property.
 * @param {string|number} identifier - The index or quiz_code of the draft to remove.
 */
export const removeDraft = (identifier) => {
    try {
        let existing = getDrafts();
        if (typeof identifier === 'number') {
            existing.splice(identifier, 1);
        } else {
            existing = existing.filter(d => d.quiz_code !== identifier && d.id !== identifier);
        }
        localStorage.setItem(DRAFTS_KEY, JSON.stringify(existing));
        return existing;
    } catch (error) {
        console.error("Error removing draft:", error);
        return getDrafts();
    }
};

/**
 * Clear all drafts from storage.
 */
export const clearDrafts = () => {
    try {
        localStorage.removeItem(DRAFTS_KEY);
        return true;
    } catch (error) {
        console.error("Error clearing drafts:", error);
        return false;
    }
};
