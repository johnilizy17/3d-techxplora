# Quiz Leaderboard XP Display - Frontend Fix

## Problem
The Leaderboard.jsx component was not properly displaying the quiz-specific XP from the updated API response. It was showing profile XP instead of the XP earned from that specific quiz.

## Solution
Updated the Leaderboard component to properly extract and display `quiz_xp` from the API response for quiz-specific leaderboards.

## Changes Made

### 1. Updated Data Mapping in Leaderboard.jsx
**File**: `v2/src/pages/Leaderboard.jsx`

#### Before
```javascript
xp: item.quiz_xp ?? student.xp || 0,
```

#### After
```javascript
// For quiz leaderboard, prioritize quiz_xp, otherwise use profile XP
const xpValue = activeTab === 'quiz' 
    ? (item.quiz_xp ?? item.quiz_result?.xp_earned ?? student.xp ?? 0)
    : (student.xp ?? 0);

return {
    // ... other fields
    xp: xpValue,
    // Store quiz-specific data if available
    quizScore: item.highest_score || item.quiz_result?.score || null,
    quizXp: item.quiz_xp || item.quiz_result?.xp_earned || null,
    profileXp: student.xp || item.profile_xp || null,
};
```

## How It Works

### API Response Structure (from Backend)
```json
{
  "student_id": 123,
  "highest_score": 85,
  "quiz_xp": 850,
  "profile_xp": 5000,
  "quiz_result": {
    "score": 85,
    "xp_earned": 850,
    "completed_at": "2026-07-31T10:30:00.000000Z"
  },
  "student": {
    "id": 123,
    "first_name": "John",
    "last_name": "Doe",
    "xp": 5000
  }
}
```

### Frontend Data Extraction Priority

**For Quiz Leaderboard** (activeTab === 'quiz'):
1. First tries `item.quiz_xp` (the quiz-specific XP)
2. Falls back to `item.quiz_result?.xp_earned` (nested XP value)
3. Falls back to `student.xp` (profile XP as last resort)
4. Defaults to 0 if nothing is available

**For Other Leaderboards** (weekly, monthly, yearly, group, admin):
- Uses `student.xp` directly (profile XP)

### Additional Data Stored
The component now also stores:
- `quizScore`: The highest score on the quiz
- `quizXp`: The XP earned from the quiz (for reference)
- `profileXp`: The total profile XP (for comparison)

## Testing
1. Navigate to the Leaderboard page
2. Select "Quiz" tab
3. Enter a quiz code (e.g., `QZ3F10F8Ad`)
4. The leaderboard should now show:
   - Quiz-specific XP in the rankings
   - Correct sorting by quiz XP (not profile XP)

## Example Output
For a quiz leaderboard, students will be ranked by their quiz-specific XP:

```
Rank 1: John Doe - 850 XP (from this quiz)
Rank 2: Jane Smith - 750 XP (from this quiz)
Rank 3: Bob Johnson - 650 XP (from this quiz)
```

Not by their total profile XP!

## Notes
- The fix maintains backward compatibility with other leaderboard types (weekly, monthly, yearly, etc.)
- If the backend doesn't return `quiz_xp`, it gracefully falls back to profile XP
- The component is now aware of the difference between quiz-specific XP and profile XP
