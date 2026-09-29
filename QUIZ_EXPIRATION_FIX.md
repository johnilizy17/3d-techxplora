# Quiz Expiration Fix

## Problem
Quiz showing as expired on the frontend even though it should be active.

## Root Cause
The frontend checks quiz expiration using the `hasDatePassed()` function which compares `quiz.end_at` against the current date/time. If the `end_at` date in the database is in the past, the quiz displays as "Closed" or "Quiz Ended".

## How Frontend Checks Expiration

### Files That Check Expiration:
1. **v2/src/pages/QuizDetails.jsx** - Main quiz details page
2. **v2/src/pages/Quizzes.jsx** - Quiz listing page with filters
3. **v2/src/components/dashboard/QuizCard.jsx** - Individual quiz cards

### Function Used:
```javascript
// v2/src/utils/date.js
export function hasDatePassed(inputDate) {
    if (!inputDate) return false;
    const now = new Date();
    const date = new Date(inputDate);
    return date < now;
}
```

### Quiz Status Logic:
```javascript
const isStarted = hasDatePassed(quiz.start_at);  // Returns true if start date has passed
const isEnded = hasDatePassed(quiz.end_at);      // Returns true if end date has passed

// Status determination:
if (!isStarted) -> Status: "Pending" (Quiz hasn't started yet)
if (isStarted && !isEnded) -> Status: "Live" (Quiz is active)
if (isEnded) -> Status: "Closed" (Quiz has expired)
```

## Solution

### IMPORTANT: This is a Database Issue, Not a Code Issue
The frontend code is working correctly - it's checking the `end_at` date from the database. The quiz shows as expired because the `end_at` value in your database is in the past.

### Option 1: Update Database (Recommended)
Run the SQL script to update the quiz expiration date:

```bash
# Navigate to TechXploraAPI directory
cd TechXploraAPI

# Run the SQL fix script
mysql -u your_username -p your_database < fix-bootcamp-quiz-expiration.sql
```

Or manually update in database:
```sql
-- For bootcamp quiz (QZ3F10F8AD)
UPDATE quizzes_info 
SET 
    end_at = '2026-12-31 23:59:59',
    start_at = '2026-01-01 00:00:00',
    status = 1
WHERE quiz_code = 'QZ3F10F8AD';
```

### Option 2: Check Current Expiration
To see which quiz is expired:

```sql
-- Check all quizzes and their expiration
SELECT 
    quiz_code, 
    title, 
    start_at, 
    end_at, 
    status,
    CASE 
        WHEN end_at < NOW() THEN 'Expired'
        WHEN start_at > NOW() THEN 'Pending'
        ELSE 'Active'
    END as current_status
FROM quizzes_info
ORDER BY end_at DESC;
```

### Option 3: Find Specific Expired Quiz
If you don't know which quiz is showing as expired:

```sql
-- Find expired quizzes
SELECT quiz_code, title, start_at, end_at 
FROM quizzes_info 
WHERE end_at < NOW()
ORDER BY end_at DESC;
```

## Frontend Display Behavior

### QuizDetails.jsx
- Shows "Quiz Ended" in red when `isEnded = true`
- Shows countdown timer when quiz is live
- Changes action button:
  - "Not Yet" (gray) - Before start
  - "Start Quiz!" (gradient) - During live period
  - "See Results!" (gradient) - After end

### Quizzes.jsx
- Filter tabs: All, Live, Pending, Closed
- "Closed" filter shows only expired quizzes
- Color-coded status badges on each quiz card

### QuizCard.jsx
- Status badge colors:
  - Pending: Amber/Orange gradient
  - Live: Emerald/Cyan gradient
  - Closed: Rose/Red gradient
- Shows countdown timer for live quizzes
- Shows date range for other statuses

## Verification Steps

After updating the database:

1. **Clear browser cache** (Ctrl+Shift+R)
2. **Refresh the quiz page**
3. **Check the status badge** - Should show "Live" or "Pending" instead of "Closed"
4. **Verify the countdown** - Should show time remaining if quiz is live
5. **Test the action button** - Should allow starting quiz if active

## Prevention

To avoid future expiration issues:

1. **Set distant expiration dates** when creating quizzes (e.g., 2026-12-31)
2. **Monitor quiz expiration** regularly in the admin dashboard
3. **Use cron jobs** to automatically extend important quiz expiration dates
4. **Add alerts** in admin panel for quizzes expiring soon

## Common Quiz Codes

- Bootcamp Quiz: `QZ3F10F8AD`
- Other quizzes: Check `quizzes_info` table

## Files Modified
- `v2/src/components/dashboard/QuizCard.jsx` - Added safety check for valid dates

## What Was Changed in QuizCard.jsx

Added validation to ensure quiz has valid dates before checking expiration:

```javascript
// Before:
const isStarted = hasDatePassed(quiz.start_at);
const isEnded = hasDatePassed(quiz.end_at);

// After:
const hasValidDates = quiz.start_at && quiz.end_at;
const isStarted = hasValidDates ? hasDatePassed(quiz.start_at) : false;
const isEnded = hasValidDates ? hasDatePassed(quiz.end_at) : false;
```

This prevents errors if dates are missing, but **it doesn't fix expired quizzes** - you still need to update the database.

## Quick Fix Steps

1. **Find the expired quiz:**
```bash
cd TechXploraAPI
mysql -u your_username -p your_database < check-quiz-expiration.sql
```

2. **Update the expiration date:**
```sql
UPDATE quizzes_info 
SET end_at = '2026-12-31 23:59:59'
WHERE quiz_code = 'YOUR_QUIZ_CODE';
```

3. **Verify the fix:**
- Refresh browser (Ctrl+Shift+R)
- Check quiz status should now show "Live" or "Pending" instead of "Closed"

## Files Modified
- None (this is a database issue, not a code issue)

## SQL Script Location
- `TechXploraAPI/fix-bootcamp-quiz-expiration.sql`
