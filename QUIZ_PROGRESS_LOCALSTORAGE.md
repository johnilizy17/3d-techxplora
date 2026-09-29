# Quiz & Course LocalStorage Implementation

## Overview
Quiz progress, quiz creation forms, and course creation forms are now automatically saved to localStorage, allowing users to resume their work even if they close the tab, refresh the page, or their device turns off.

## Features Summary

### Student Quiz Completion (QuizCompletion.jsx)
- **Expiration**: 24 hours
- **Auto-save**: Answer selections, question navigation, timer
- **Target**: Students taking quizzes
- **Storage**: Multiple instances (one per quiz)

### Teacher Quiz Creation (CreateQuiz.jsx)
- **Expiration**: 48 hours
- **Auto-save**: All form fields, current step
- **Target**: Teachers creating quizzes
- **Storage**: Single draft

### Teacher Course Creation (CreateCourse.jsx)
- **Expiration**: 72 hours (3 days)
- **Auto-save**: All form fields, uploads, rich text, current step
- **Target**: Teachers creating courses
- **Storage**: Single draft

## Quick Comparison

| Feature | Quiz Progress | Quiz Creation | Course Creation |
|---------|--------------|---------------|-----------------|
| Expiration | 24 hours | 48 hours | 72 hours |
| Storage Key | `quiz_progress_{code}` | `quiz_creation_draft` | `course_creation_draft` |
| Multiple Instances | Yes | No | No |
| Auto-Clear | On completion | On creation | On launch |
| Manual Clear | No | Yes | Yes |
| Target User | Students | Teachers | Teachers |
| Complexity | Low | Medium | High |
| Steps | N/A | 2 steps | 4 steps |

## Features

### Student Quiz Completion (QuizCompletion.jsx)

#### 1. Automatic Progress Saving
- Progress is saved automatically after every state change (answer selection, question navigation, timer updates)
- Saves: current question index, selected answers, remaining time, quiz metadata
- No manual save action required from the user

#### 2. Progress Restoration
- When a user returns to a quiz, their progress is automatically restored
- Shows a success toast notification: "Progress Restored! Continuing from question X of Y"
- Visual badge indicator shows "Progress Restored" in the header

#### 3. Data Expiration
- Quiz progress expires after 24 hours
- Expired data is automatically cleaned up on component mount
- Prevents stale data from accumulating in localStorage

#### 4. Progress Clearing
- Progress is automatically cleared when the quiz is completed
- Ensures clean state for retaking the quiz

### Teacher Quiz Creation (CreateQuiz.jsx)

#### 1. Automatic Draft Saving
- Form data is saved automatically after every input change
- Saves: all form fields, current step in the creation process
- No manual save action required from the teacher

#### 2. Draft Restoration
- When a teacher returns to the quiz creation page, their draft is automatically restored
- Shows a success toast notification: "Draft Restored! Your quiz creation progress has been restored"
- Visual badge indicator shows "Draft Auto-Saved" in the header

#### 3. Draft Expiration
- Quiz creation drafts expire after 48 hours
- Expired drafts are automatically cleaned up
- Longer expiration time for creation vs completion (48h vs 24h)

#### 4. Manual Draft Clearing
- Teachers can manually clear the draft using the "Clear Draft" button
- Draft is automatically cleared after successful quiz creation
- "Create Another" button clears the previous draft

## Technical Implementation

### Student Quiz Progress Storage

#### Storage Key Format
```
quiz_progress_{quizCode}
```

#### Stored Data Structure
```javascript
{
  currentIndex: 0,           // Current question index
  selectedAnswers: {},       // Map of question index to selected answer
  timeLeft: 30,              // Remaining time for current question
  quizCode: "ABC123",        // Quiz identifier
  quizTitle: "Math Quiz",    // Quiz title for reference
  totalQuestions: 10,        // Total number of questions
  timestamp: 1234567890,     // When progress was saved
  expiresAt: 1234654290      // When progress expires (24h later)
}
```

### Teacher Quiz Creation Storage

#### Storage Key Format
```
quiz_creation_draft
```

#### Stored Data Structure
```javascript
{
  formData: {
    title: '',
    description: '',
    duration: '',
    model_id: '',
    group_code: '',
    class: '',
    start_at: '',
    end_at: '',
    xp: 0,
    p_xp: 0,
    min_age: '',
    max_age: ''
  },
  currentStep: 1,            // Current step in creation process
  timestamp: 1234567890,     // When draft was saved
  expiresAt: 1234827090      // When draft expires (48h later)
}
```

## Files Modified

### Student Quiz Completion

#### 1. `v2/src/utils/quizStorage.js` (NEW)
Utility functions for quiz progress localStorage management:
- `saveQuizProgress(quizCode, progressData)` - Save progress
- `loadQuizProgress(quizCode)` - Load saved progress
- `clearQuizProgress(quizCode)` - Clear progress
- `hasQuizProgress(quizCode)` - Check if progress exists
- `clearExpiredProgress()` - Clean up expired data
- `getProgressTimeRemaining(quizCode)` - Check expiry time

#### 2. `v2/src/pages/QuizCompletion.jsx` (UPDATED)
Integrated localStorage with quiz completion component:
- Load progress on mount with expired data cleanup
- Save progress on every state change
- Clear progress on quiz completion
- Show toast notification when progress is restored
- Display visual badge indicator for restored progress
- Wrapped `finalizeQuiz` in `useCallback` for proper dependency management

### Teacher Quiz Creation

#### 3. `v2/src/utils/quizCreationStorage.js` (NEW)
Utility functions for quiz creation draft localStorage management:
- `saveQuizDraft(formData, currentStep)` - Save draft
- `loadQuizDraft()` - Load saved draft
- `clearQuizDraft()` - Clear draft
- `hasQuizDraft()` - Check if draft exists
- `getDraftTimeRemaining()` - Check expiry time

#### 4. `v2/src/pages/CreateQuiz.jsx` (UPDATED)
Integrated localStorage with quiz creation form:
- Load draft on mount
- Save draft on every form change and step change
- Clear draft on successful quiz creation
- Show toast notification when draft is restored
- Display visual badge indicator with "Draft Auto-Saved" message
- Manual "Clear Draft" button for teachers
- Clear draft when clicking "Create Another"

### Teacher Course Creation

#### 5. `v2/src/utils/courseCreationStorage.js` (NEW)
Utility functions for course creation draft localStorage management:
- `saveCourseDraft(formData, currentStep)` - Save draft
- `loadCourseDraft()` - Load saved draft
- `clearCourseDraft()` - Clear draft
- `hasCourseDraft()` - Check if draft exists
- `getDraftTimeRemaining()` - Check expiry time

#### 6. `v2/src/pages/CreateCourse.jsx` (UPDATED)
Integrated localStorage with course creation form:
- Load draft on mount
- Save draft on every form change and step change
- Clear draft on successful course launch
- Show toast notification when draft is restored
- Display visual badge indicator with "Draft Auto-Saved" message
- Manual "Clear Draft" button for teachers
- Clear draft when clicking "New Course"
- Preserves rich text editor content
- Preserves uploaded file URLs
- Preserves case studies and attachments

## User Experience

### Student Quiz Completion Scenarios

#### Scenario 1: Tab Closed Accidentally
1. User is on question 5 of 10
2. User accidentally closes the tab
3. User reopens the quiz
4. Progress is restored to question 5 with all previous answers intact
5. Toast notification confirms restoration

#### Scenario 2: Device Battery Dies
1. User is taking a quiz on mobile
2. Device battery dies at question 7
3. User charges device and returns to quiz
4. Progress is restored if within 24 hours
5. User continues from question 7

#### Scenario 3: Quiz Completion
1. User completes the quiz
2. Progress is automatically cleared from localStorage
3. User can retake the quiz with a fresh start

#### Scenario 4: Expired Progress
1. User starts a quiz but doesn't finish
2. 24+ hours pass
3. User returns to the quiz
4. Expired progress is automatically cleared
5. User starts fresh from question 1

### Teacher Quiz Creation Scenarios

#### Scenario 1: Browser Crash During Creation
1. Teacher is filling out quiz details on Step 2
2. Browser crashes unexpectedly
3. Teacher reopens the quiz creation page
4. Draft is restored with all previously entered data
5. Teacher continues from where they left off

#### Scenario 2: Interrupted by Meeting
1. Teacher starts creating a quiz
2. Gets called to an urgent meeting
3. Closes the tab without finishing
4. Returns hours later
5. Draft is restored automatically

#### Scenario 3: Successful Quiz Creation
1. Teacher completes quiz creation
2. Draft is automatically cleared
3. Teacher clicks "Create Another"
4. Form is reset with no old data

#### Scenario 4: Expired Draft
1. Teacher starts creating a quiz
2. 48+ hours pass without completion
3. Teacher returns to create a quiz
4. Expired draft is automatically cleared
5. Teacher starts with a fresh form

#### Scenario 5: Manual Draft Clear
1. Teacher has a saved draft
2. Decides to start over completely
3. Clicks "Clear Draft" button
4. Form resets to empty state
5. Draft is removed from storage

## Testing Checklist

### Student Quiz Completion
- [x] Progress saves on answer selection
- [x] Progress saves on question navigation
- [x] Progress saves on timer updates
- [x] Progress restores on page reload
- [x] Progress restores after tab close
- [x] Toast notification shows on restoration
- [x] Visual badge shows when progress is restored
- [x] Progress clears on quiz completion
- [x] Expired progress is cleaned up
- [x] No console errors or warnings

### Teacher Quiz Creation
- [x] Draft saves on form input changes
- [x] Draft saves on step navigation
- [x] Draft restores on page reload
- [x] Draft restores after tab close
- [x] Toast notification shows on restoration
- [x] Visual badge shows "Draft Auto-Saved"
- [x] Draft clears on successful creation
- [x] Draft clears when clicking "Create Another"
- [x] Manual "Clear Draft" button works
- [x] Expired drafts are cleaned up
- [x] No console errors or warnings

## Browser Compatibility

Works in all modern browsers that support:
- localStorage API
- JSON.parse/stringify
- Date.now()

Supported browsers:
- Chrome 4+
- Firefox 3.5+
- Safari 4+
- Edge (all versions)
- Opera 10.5+

## Storage Limits

- localStorage typically has a 5-10MB limit per domain
- Each quiz progress entry is ~1-2KB
- Each quiz creation draft is ~0.5-1KB
- Can store thousands of entries combined
- Automatic cleanup prevents storage bloat

## Privacy & Security

- Data is stored locally in the user's browser only
- No sensitive information is stored
- Quiz progress expires after 24 hours
- Quiz creation drafts expire after 48 hours
- Users can manually clear browser data to remove all stored data

## Future Enhancements

Potential improvements:
1. Sync progress/drafts across devices (requires backend)
2. Configurable expiration time per quiz/draft
3. Progress/draft history and analytics
4. Offline quiz completion support
5. Progress/draft export/import functionality
6. Multiple draft support for teachers
7. Draft versioning and restore points
8. Cloud backup for important drafts
