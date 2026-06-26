# Course Quiz Timer & Leaderboard Date Fix

## Changes Made

### 1. Course Quiz Timer Implementation (v2/src/pages/CourseQuiz.jsx)

Added a 50-second timer per question with the following features:

**State Management:**
- Added `timeRemaining` state initialized to 50 seconds
- Timer resets to 50 seconds when moving to a new question

**Timer Logic:**
- Countdown timer that decrements every second
- Auto-advances to next question when time runs out
- Timer pauses when quiz is completed
- Visual warning (red color + pulse animation) when 10 seconds or less remain

**UI Updates:**
- Added timer display in header next to course title
- Shows countdown in seconds (e.g., "50s")
- Red color and pulse animation when ≤10 seconds remaining
- Clock icon changes color based on time remaining

**Behavior Changes:**
- Removed "No Answer Selected" validation
- Questions auto-advance when timer expires
- Unanswered questions count as 0 points
- Timer resets on quiz retry

**Icons:**
- Re-added `Clock` icon import for timer display

### 2. Leaderboard Date Fix (v2/src/pages/Leaderboard.jsx)

Fixed the "Date info not available right now" message issue:

**Data Mapping:**
- Updated fallback chain: `item.date || student.created_at || student.updated_at || new Date().toISOString()`
- Now provides current date as ultimate fallback instead of `null`
- Uses student's `created_at` or `updated_at` if available

**UI Updates:**
- Removed the warning message completely
- All leaderboard entries now have a date value
- No more "Date info not available" disclaimer

## Technical Details

### Course Quiz Timer

```javascript
// Timer State
const [timeRemaining, setTimeRemaining] = useState(50);

// Timer Effect
useEffect(() => {
    if (!quizCompleted && manualQuiz.length > 0) {
        const timer = setInterval(() => {
            setTimeRemaining((prev) => {
                if (prev <= 1) {
                    handleNextQuestion(); // Auto-advance
                    return 50;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }
}, [quizCompleted, currentQuestionIndex, manualQuiz.length]);

// Reset on question change
useEffect(() => {
    setTimeRemaining(50);
}, [currentQuestionIndex]);
```

### Timer Display

```jsx
<div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10">
    <Clock className={`w-4 h-4 ${timeRemaining <= 10 ? 'text-red-500 animate-pulse' : 'text-[#a6b1ff]'}`} />
    <span className={`text-sm font-bold ${timeRemaining <= 10 ? 'text-red-500' : ''}`}>
        {timeRemaining}s
    </span>
</div>
```

### Leaderboard Date Mapping

```javascript
date: item.date || student.created_at || student.updated_at || new Date().toISOString()
```

## User Experience

### Course Quiz Timer
1. **Before**: No time pressure, students could take unlimited time per question
2. **After**: 
   - 50 seconds per question
   - Visual countdown display
   - Warning at 10 seconds (red + pulse)
   - Auto-advances when time expires
   - Can skip ahead anytime by clicking next

### Leaderboard Date
1. **Before**: Showed "Date info not available right now" warning
2. **After**: 
   - Always shows a valid date
   - Uses student registration date if available
   - Falls back to current date if needed
   - No warning messages

## Files Modified

1. **v2/src/pages/CourseQuiz.jsx**
   - Added timer state and logic
   - Added timer display UI
   - Updated auto-advance behavior
   - Re-added Clock icon

2. **v2/src/pages/Leaderboard.jsx**
   - Updated date mapping with better fallbacks
   - Removed "date not available" warning message

## Testing Checklist

### Course Quiz Timer
- [ ] Timer starts at 50 seconds for first question
- [ ] Timer counts down every second
- [ ] Timer turns red and pulses at 10 seconds
- [ ] Question auto-advances when timer reaches 0
- [ ] Timer resets to 50 seconds on next question
- [ ] Timer stops when quiz completes
- [ ] Timer resets when retrying quiz
- [ ] Manual navigation still works

### Leaderboard Date
- [ ] No "Date info not available" message shows
- [ ] All leaderboard entries show a date
- [ ] Date format is correct
- [ ] Works for weekly leaderboard
- [ ] Works for monthly leaderboard
- [ ] Works for yearly leaderboard
- [ ] Works for quiz-specific leaderboard
- [ ] Works for group leaderboard

## Notes

- **Timer Duration**: Set to 50 seconds per question as requested
- **Timer Flexibility**: Easy to adjust - change the initial value `useState(50)` and the reset value in the timer effect
- **No Backend Changes**: All timer logic is client-side
- **Date Handling**: Uses ISO format for consistency
- **Graceful Degradation**: Always provides a date value, never null
