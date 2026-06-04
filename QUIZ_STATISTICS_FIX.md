# Quiz Statistics Fix

## Issue Identified
The quiz results statistics were showing incorrect data because the score was being submitted as a raw count of correct answers instead of a percentage.

## Root Cause
In `v2/src/pages/QuizCompletion.jsx`, the quiz submission was sending:
```javascript
score: correctCount  // e.g., 8 (for 8 out of 10 correct)
```

But the backend and statistics display expected:
```javascript
score: scorePercentage  // e.g., 80 (for 80%)
```

## Changes Made

### 1. Fixed Score Submission (QuizCompletion.jsx)
- **Line 527**: Added `scorePercentage` calculation
  ```javascript
  const scorePercentage = Math.round((correctCount / questions.length) * 100);
  ```

- **Line 587**: Changed submission payload to use percentage
  ```javascript
  score: scorePercentage  // Changed from correctCount
  ```

- **Line 591**: Updated navigation state to include both values
  ```javascript
  score: scorePercentage,
  correctCount: correctCount,
  totalQuestions: questions.length,
  ```

### 2. Improved Statistics Labels (QuizResults.jsx)
- **Line 261**: Changed misleading "Student Capacity" label to "Total Attempts"
  ```javascript
  <StatCard 
    icon={Users} 
    label="Total Attempts"     // Changed from "Student Capacity"
    value={stats.totalStudents} 
    sub="Unique Students"      // Changed from "{results.length} Attempted"
    color="blue" 
  />
  ```

### 3. Code Cleanup (Questions.jsx)
- Removed unused imports: `React`, `useState`, `AlertCircle`

### 4. Fixed QuizResult Data Access (QuizResult.jsx)
- **Line 65**: Fixed undefined data access error
  ```javascript
  // Before (caused crash when questionsData was undefined)
  const xpEarned = score * ((quiz?.p_xp / questionsData.data.length) || 0);
  
  // After (uses safe questions variable)
  const xpEarned = score * ((quiz?.p_xp / (questions.length || 1)) || 0);
  ```

## Backend Verification
The backend API (`TechXploraAPI/app/Http/Controllers/QuizInfoController.php`) correctly:
- Stores score as integer (0-100 percentage)
- Returns highest score per student using `ROW_NUMBER() OVER (PARTITION BY student_id)`
- Orders results by score descending

## Statistics Calculation
The `calculateQuizResultsStats` function in `v2/src/utils/excelUtils.js` correctly calculates:
- **totalStudents**: Count of unique students who attempted
- **averageScore**: Average of all scores (as percentages)
- **passPercentage**: Percentage of students with score >= 50%
- **failPercentage**: Percentage of students with score < 50%

## Testing Recommendations
1. Submit a quiz with known results (e.g., 8 out of 10 correct = 80%)
2. Verify the score displays as 80% in the results page
3. Check that statistics calculate correctly:
   - Average score matches actual average
   - Pass/fail percentages are accurate
4. Verify multiple attempts show only the highest score per student

## Impact
✅ Statistics now accurately reflect quiz performance
✅ Score percentages display correctly
✅ Pass/fail rates calculate properly
✅ Labels are clear and meaningful
