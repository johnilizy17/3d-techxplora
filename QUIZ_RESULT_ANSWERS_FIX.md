# Quiz Result Page - Student Answers Display Fix

## Problem

When accessing the quiz result page directly via URL (`/dashboard/quizzes/result?code=QZ112E27E6`), the student's answers were not displayed. The page only showed the score but not the detailed question-by-question breakdown.

### Root Cause

The `QuizResult` page was only getting result data from `location.state?.result`, which is passed during navigation. When accessing the page directly via URL (e.g., refreshing the page or sharing the link), there's no navigation state, so `result.answers` was empty.

```javascript
// OLD CODE - Only worked when navigated from another page
const result = location.state?.result || { score: 0, answers: [] };
```

## Solution

Created a complete flow to fetch student's quiz results from the backend:

### 1. Backend API Endpoint

Added new endpoint to get a specific student's result for a specific quiz:

**Route:** `GET /api/v1/answers/student/{studentId}/quiz/{quizCode}`

**Controller Method:** `getStudentQuizResult()` in `QuizInfoController.php`

```php
public function getStudentQuizResult(string $studentId, string $quizCode)
{
    try {
        // Get the student's highest scoring attempt for this quiz
        $result = Answers::where('student_id', $studentId)
            ->where('quiz_code', $quizCode)
            ->with(['student', 'quiz'])
            ->orderBy('score', 'desc')
            ->orderBy('created_at', 'desc')
            ->first();

        if (!$result) {
            return response()->json(['message' => 'No results found'], 404);
        }

        return response()->json($result, 200);
    } catch (\Exception $e) {
        return response()->json(['message' => 'Error: ' . $e->getMessage()], 500);
    }
}
```

**Features:**
- Returns the student's highest scoring attempt for the quiz
- Falls back to most recent attempt if scores are tied
- Includes student and quiz relationships
- Proper error handling

### 2. Redux API Integration

Added the endpoint to `questionApi.js`:

```javascript
// Get student's specific quiz result
getStudentQuizResult: builder.query({
    query: ({ studentId, quizCode }) => `/answers/student/${studentId}/quiz/${quizCode}`,
    providesTags: (result, error, { studentId, quizCode }) => [
        { type: 'Answer', id: `${studentId}-${quizCode}` }
    ],
}),
```

Exported the hook:
```javascript
export const {
    // ... other hooks
    useGetStudentQuizResultQuery,
} = questionApi;
```

### 3. Frontend Component Update

Updated `QuizResult.jsx` to fetch data from API:

```javascript
// Fetch student's quiz result from API
const { data: studentResultData, isLoading: isLoadingResult } = useGetStudentQuizResultQuery(
    { studentId: user?.id, quizCode },
    { skip: !user?.id || !quizCode }
);

// Use API result if available, otherwise fall back to location state
const apiResult = studentResultData?.data || studentResultData;
const stateResult = location.state?.result;
const result = apiResult || stateResult || { score: 0, answers: [] };
```

**Benefits:**
- Works when accessing page directly via URL
- Works when navigating from another page (uses state for instant display)
- Handles page refresh correctly
- Shows student's best attempt if they retook the quiz

## Data Flow

### Before (Broken):
1. User navigates to `/dashboard/quizzes/result?code=QZ112E27E6`
2. Page tries to get `location.state?.result`
3. No state exists → `result.answers = []`
4. Questions shown but no answers displayed

### After (Fixed):
1. User navigates to `/dashboard/quizzes/result?code=QZ112E27E6`
2. Page extracts `quizCode` from URL
3. API call: `GET /api/v1/answers/student/{userId}/quiz/{quizCode}`
4. Backend returns student's highest scoring attempt with answers
5. Page displays questions with student's answers and correct answers

## Files Modified

### Backend:
- `TechXploraAPI/app/Http/Controllers/QuizInfoController.php`
  - Added `getStudentQuizResult()` method
- `TechXploraAPI/routes/api.php`
  - Added route: `GET /answers/student/{studentId}/quiz/{quizCode}`

### Frontend:
- `v2/src/redux/api/questionApi.js`
  - Added `getStudentQuizResult` endpoint
  - Exported `useGetStudentQuizResultQuery` hook
- `v2/src/pages/QuizResult.jsx`
  - Imported `useGetStudentQuizResultQuery`
  - Added API call to fetch student result
  - Updated result data source to use API data with state fallback
  - Added loading state for result fetching

## Testing

To verify the fix works:

1. **Take a quiz** as a student
2. **Complete the quiz** and view results
3. **Copy the URL** from the result page (e.g., `/dashboard/quizzes/result?code=QZ112E27E6`)
4. **Open in new tab** or refresh the page
5. **Verify** that:
   - Score is displayed correctly
   - All questions are shown
   - Student's answers are displayed for each question
   - Correct answers are shown for wrong answers
   - XP earned is calculated correctly

## Related Features

This fix is consistent with other quiz result features:
- Shows the student's highest scoring attempt (matches leaderboard logic)
- Displays detailed question-by-question breakdown
- Shows which answers were correct/incorrect
- Calculates XP earned based on performance
