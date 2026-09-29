# Quiz Completion Redirect Feature

## Overview

Added automatic redirect functionality to prevent students from retaking a quiz they've already completed. When a student tries to access the quiz start page for a quiz they've already finished, they are automatically redirected to their results page.

## Problem Solved

Previously, students could:
- Access the quiz start page even after completing the quiz
- Potentially start the quiz again (depending on backend validation)
- See the "Start Quiz" button when they should be viewing their results

This created confusion and a poor user experience.

## Solution

Added a check on the `StartQuiz` page that:
1. Fetches the student's existing result for the quiz (if any)
2. Automatically redirects to the results page if a result exists
3. Shows a friendly toast notification explaining the redirect

## Implementation

### Frontend Changes

**File:** `v2/src/pages/StartQuiz.jsx`

Added the following:

1. **Import the query hook:**
```javascript
import { useGetQuestionsByQuizIdQuery, useGetStudentQuizResultQuery } from '@/redux/api/questionApi';
```

2. **Check for existing result:**
```javascript
// Check if student has already completed this quiz
const { data: existingResult } = useGetStudentQuizResultQuery(
    { studentId: user?.id, quizCode: quizCode },
    { skip: !user?.id || !quizCode }
);
```

3. **Redirect effect:**
```javascript
// Redirect to results if quiz already completed
useEffect(() => {
    if (existingResult && quizCode) {
        toast.info("You've already completed this quiz. Showing your results.");
        navigate(`/dashboard/quizzes/result?code=${quizCode}`);
    }
}, [existingResult, quizCode, navigate]);
```

## User Flow

### Before (Without Redirect):
1. Student completes quiz → sees results
2. Student navigates back to quiz start page
3. Student sees "Start Quiz" button
4. Confusion: "Can I retake it? Will it overwrite my score?"

### After (With Redirect):
1. Student completes quiz → sees results
2. Student tries to navigate to quiz start page
3. **Automatic redirect** to results page
4. Toast message: "You've already completed this quiz. Showing your results."
5. Student sees their existing results

## Benefits

1. **Clear User Experience**: Students immediately understand they've already completed the quiz
2. **Prevents Confusion**: No ambiguity about whether they can retake the quiz
3. **Data Integrity**: Reduces accidental attempts to retake quizzes
4. **Seamless Navigation**: Automatic redirect feels natural and intuitive
5. **Informative Feedback**: Toast notification explains what happened

## Technical Details

### API Endpoint Used
- `GET /api/v1/answers/student/{studentId}/quiz/{quizCode}`
- Returns the student's highest scoring attempt for the quiz
- Returns 404 if no result exists (student hasn't taken the quiz)

### Query Hook
- `useGetStudentQuizResultQuery({ studentId, quizCode })`
- Automatically skips if user ID or quiz code is missing
- Caches result to avoid redundant API calls

### Redirect Logic
- Only redirects if `existingResult` is truthy (result exists)
- Preserves quiz code in URL for proper result display
- Shows toast notification before redirect

## Edge Cases Handled

1. **No User ID**: Query is skipped if user is not logged in
2. **No Quiz Code**: Query is skipped if quiz code is missing from URL
3. **Loading State**: Redirect only happens after data is fetched
4. **404 Response**: If no result exists, student can proceed to start quiz
5. **Multiple Attempts**: Shows the highest scoring attempt (consistent with leaderboard)

## Testing Scenarios

To verify this feature works correctly:

1. **First Time Taking Quiz**:
   - Navigate to `/dashboard/quizzes/start?code=QZ123`
   - Should see start page normally
   - Should NOT be redirected

2. **After Completing Quiz**:
   - Complete a quiz and view results
   - Navigate back to `/dashboard/quizzes/start?code=QZ123`
   - Should be automatically redirected to results page
   - Should see toast: "You've already completed this quiz. Showing your results."

3. **Direct URL Access**:
   - Copy quiz start URL after completing quiz
   - Paste in new tab
   - Should still redirect to results

4. **Different Quiz**:
   - Complete Quiz A
   - Try to start Quiz B
   - Should NOT be redirected (different quiz code)

## Related Features

This feature works in conjunction with:
- **Quiz Results Page**: Shows student's answers and score
- **Student Quiz Result API**: Fetches existing completion data
- **Quiz Leaderboard**: Shows highest score per student
- **Quiz Reattempt Logic**: Backend determines if reattempts are allowed

## Future Enhancements

Possible improvements:
1. Add a "Retake Quiz" button on results page (if allowed by quiz settings)
2. Show number of attempts remaining (if quiz allows multiple attempts)
3. Compare current attempt with previous attempts
4. Add quiz settings to control reattempt behavior
