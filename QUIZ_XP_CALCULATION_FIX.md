# Quiz XP Calculation Fix

## Issue
The XP calculation and display in quiz pages was incorrect. It was showing or using the total quiz XP pool instead of calculating based on `p_xp` (XP per question).

## Problems Fixed

### 1. QuizCompletion.jsx - Results Display
**Line 715** - Incorrect XP calculation in results:
```javascript
// BEFORE (WRONG)
const xpEarned = Math.round((score / questions.length) * (quiz.xp || 0));

// AFTER (CORRECT)
const xpEarned = score * (quiz.p_xp || 0); // Correct answers * XP per question
```

**Example of incorrect calculation:**
- Quiz has 10 questions
- Total XP pool: 1000 XP
- Student answers 8 correctly
- Old calculation: (8 / 10) * 1000 = 800 XP ❌

**Example of correct calculation:**
- Quiz has 10 questions
- XP per question: 50 XP (Beginner difficulty)
- Student answers 8 correctly
- New calculation: 8 * 50 = 400 XP ✅

### 2. StartQuiz.jsx - Prize Display
**Line 249** - Showing total XP pool instead of maximum possible XP:
```javascript
// BEFORE (WRONG)
<p className="text-[10px] font-black text-amber-700 dark:text-white/20 uppercase tracking-[0.2em]">Prize</p>
<p className="text-3xl font-black text-amber-900 dark:text-white leading-none italic">{quiz.xp || 0} Points</p>

// AFTER (CORRECT)
<p className="text-[10px] font-black text-amber-700 dark:text-white/20 uppercase tracking-[0.2em]">Max Prize</p>
<p className="text-3xl font-black text-amber-900 dark:text-white leading-none italic">{(quiz.QuizQuestions || 0) * (quiz.p_xp || 0)} Points</p>
```

**Why this matters:**
- The total XP pool (`quiz.xp`) is what the teacher allocated for the entire quiz
- Students don't earn the entire pool - they earn based on correct answers
- Maximum possible XP = Total Questions × XP per Question
- This shows students the maximum they can earn if they get all answers correct

**Example:**
- Quiz has 10 questions
- XP per question: 50 XP (Beginner)
- Old display: "Prize: 1000 Points" (confusing - they won't get this)
- New display: "Max Prize: 500 Points" (clear - this is the maximum possible)

## Files Modified

### `v2/src/pages/QuizCompletion.jsx`
- **Line 715**: Fixed XP calculation in results display section
- **Line 528**: Already correct (submission calculation)

### `v2/src/pages/StartQuiz.jsx`
- **Line 249**: Changed from showing `quiz.xp` to calculating `quiz.QuizQuestions * quiz.p_xp`
- **Label**: Changed from "Prize" to "Max Prize" for clarity

## How It Works Now

1. **Quiz Creation**: Teacher sets difficulty (Beginner/Intermediate/Advanced)
   - Beginner → 50 XP per question
   - Intermediate → 100 XP per question
   - Advanced → 150 XP per question

2. **Quiz Start Page**: Shows maximum possible XP
   - Calculates: `Total Questions × XP per Question`
   - Example: 10 questions × 50 XP = 500 XP max

3. **Quiz Submission**: Student completes quiz
   - System counts correct answers
   - Calculates: `Correct Answers × XP per Question`
   - Example: 8 correct × 50 XP = 400 XP earned

4. **Results Display**: Shows earned XP
   - Uses same formula: `Score × p_xp`
   - Displays consistent XP amount

## Verification

The submission logic (QuizCompletion.jsx line 528) was already correct:
```javascript
const xpEarned = Math.round((correctCount) * (quiz.p_xp || 0));
```

This ensures that:
- XP is calculated consistently during submission
- XP is displayed correctly in results
- Students see accurate maximum possible XP before starting
- Students receive the right amount based on difficulty

## Related Files

Other files with correct XP calculation:
- `v2/src/pages/QuizResult.jsx` (line 65): Already using `score * quiz.p_xp`
- `v2/src/pages/QuizDetails.jsx` (line 218): Displays `p_xp` correctly
- `v2/src/pages/StartQuiz.jsx` (line 386): Shows `p_xp` in quiz info

## Status
✅ **FIXED** - All XP calculations and displays now correctly use `p_xp` (XP per question) instead of total XP pool
