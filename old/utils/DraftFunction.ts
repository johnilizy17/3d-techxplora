// key to store drafts in localStorage
const DRAFTS_KEY = "drafts";

// Save a draft (it will append to existing ones)
export function saveDraft(newDraft: any) {
  // get existing drafts
  const existing = localStorage.getItem(DRAFTS_KEY);
  const drafts = existing ? JSON.parse(existing) : [];

  // add new draft
  drafts.push(newDraft);

  // store back
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
}

// Get all drafts as array
export function getDrafts(): any[] {
  const existing = localStorage.getItem(DRAFTS_KEY);
  return existing ? JSON.parse(existing) : [];
}

// Clear all drafts
export function clearDrafts() {
  localStorage.removeItem(DRAFTS_KEY);
}

// Remove draft by index
export function removeDraft(index: number) {
  const drafts = getDrafts();
  drafts.splice(index, 1);
  localStorage.setItem(DRAFTS_KEY, JSON.stringify(drafts));
  return drafts
}
