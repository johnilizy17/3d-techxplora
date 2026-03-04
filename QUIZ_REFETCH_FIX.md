# Quiz Data Refetch After Update - Fixed

## Problem
After updating a quiz in the QuizResults component, the quiz data wasn't being refetched in the dashboard components (RecentQuizzes and Quizzes pages), causing stale data to be displayed.

## Root Cause
1. Cache invalidation was set up correctly in `teacherApi.js`
2. However, navigation to dashboard happened immediately without waiting for refetch
3. Components didn't have `refetchOnMountOrArgChange` enabled to fetch fresh data on mount
4. **CRITICAL BUG**: `useGetQuizzesQuery` was being called inside the `handleUpdate` function, which violates React's Rules of Hooks

## Solution Implemented

### 1. QuizResults.jsx - Fixed Hook Usage and Enhanced Update Handler
**File**: `v2/src/components/teacher/QuizResults.jsx`

**Changes**:
- **FIXED**: Moved `useGetQuizzesQuery` hook to component top level (React hooks must be called at top level, not inside functions)
- Added `refetch: refetchQuizzesList` from the hook to use inside `handleUpdate`
- Added explicit `await refetchQuiz()` call after successful update
- Added explicit `await refetchQuizzesList()` call to refetch the quizzes list
- Updated temp storage with the new form data
- Added 500ms delay before navigation to ensure refetch completes
- Navigation now happens after all data updates are complete

```javascript
// At component top level (CORRECT)
const { refetch: refetchQuizzesList } = useGetQuizzesQuery({ type, id: user?.id }, {
    skip: !user?.id
});

// Inside handleUpdate function
const updatedQuiz = await updateQuiz(updatePayload).unwrap();

// Refetch the quiz data to get the latest information
await refetchQuiz();

// Refetch the quizzes list
await refetchQuizzesList();

// Update temp storage with the updated quiz data
dispatch(setTemporaryStorage({
    ...tempStorage,
    start_at: formData.start_at,
    end_at: formData.end_at,
    xp: formData.xp,
    p_xp: formData.p_xp
}));

// Navigate to dashboard after successful update with a small delay
setTimeout(() => {
    navigate('/dashboard');
}, 500);
```

### 2. RecentQuizzes.jsx - Auto Refetch on Mount
**File**: `v2/src/components/dashboard/RecentQuizzes.jsx`

**Changes**:
- Added `refetchOnMountOrArgChange: true` to `useGetQuizzesQuery`
- Ensures fresh data is fetched whenever the component mounts or arguments change

```javascript
const { data: quizzesData, isLoading } = useGetQuizzesQuery({ type, id: user?.id }, {
    skip: !user?.id,
    refetchOnMountOrArgChange: true
});
```

### 3. Quizzes.jsx - Auto Refetch on Mount
**File**: `v2/src/pages/Quizzes.jsx`

**Changes**:
- Added `refetchOnMountOrArgChange: true` to `useGetQuizzesQuery`
- Ensures fresh data is fetched whenever the page is visited

```javascript
const { data: quizzesData, isLoading } = useGetQuizzesQuery({ type, id: user?.id }, {
    skip: !user?.id,
    refetchOnMountOrArgChange: true
});
```

## How It Works Now

1. **User updates quiz** in QuizResults component
2. **Update mutation** is called and succeeds
3. **Cache invalidation** triggers automatically (from teacherApi.js)
4. **Explicit refetch** is called to get latest quiz data
5. **Explicit refetch** is called to get latest quizzes list
6. **Temp storage** is updated with new values
7. **Toast notification** shows success
8. **Navigation** happens after 500ms delay
9. **Dashboard components** automatically refetch on mount due to `refetchOnMountOrArgChange: true`
10. **Fresh data** is displayed to the user

## Benefits

- Quiz data is always up-to-date after updates
- No stale data displayed in dashboard
- Smooth user experience with proper timing
- Automatic refetch on component mount ensures consistency
- Works with RTK Query cache invalidation system
- **FIXED**: No more React Hook violations - all hooks called at top level

## React Rules of Hooks Compliance

✅ All hooks are now called at the component top level
✅ Hooks are not called inside loops, conditions, or nested functions
✅ `refetch` functions are used inside event handlers (which is correct)

## Testing Checklist

- [x] Update quiz parameters (XP, dates) in QuizResults
- [x] Verify navigation to dashboard after update
- [x] Check that RecentQuizzes shows updated data
- [x] Check that Quizzes page shows updated data
- [x] Verify no console errors
- [x] Verify no React Hook warnings
- [x] Confirm toast notifications appear
- [x] Test with different quiz parameters

## Files Modified

1. `v2/src/components/teacher/QuizResults.jsx` - Fixed hook usage, enhanced update handler with explicit refetch and delayed navigation
2. `v2/src/components/dashboard/RecentQuizzes.jsx` - Added auto-refetch on mount
3. `v2/src/pages/Quizzes.jsx` - Added auto-refetch on mount

## Related Features

- RTK Query cache invalidation (already configured in teacherApi.js)
- Quiz update mutation with proper tag invalidation
- Temporary storage management for quiz data
- Navigation flow after quiz updates
- React Rules of Hooks compliance
