# Teacher Question Page Date Fix ✅

## Issue
The `/dashboard/teacher/question` page was showing hardcoded "Live Challenge" and "Active" status regardless of the actual quiz dates.

## Root Cause
In `v2/src/components/teacher/QuizResults.jsx`, the status was hardcoded:
```jsx
// BEFORE (Hardcoded - WRONG):
<span>Live Challenge</span>
<span>Active</span>
```

It wasn't checking `start_at` and `end_at` dates to determine the actual quiz status.

## Fix Applied ✅

### 1. Added Date Utility Import
```javascript
import { hasDatePassed } from '@/utils/date';
```

### 2. Added Status Calculation Logic
```javascript
// Calculate quiz status based on dates
const hasValidDates = tempStorage?.start_at && tempStorage?.end_at;
const isStarted = hasValidDates ? hasDatePassed(tempStorage.start_at) : false;
const isEnded = hasValidDates ? hasDatePassed(tempStorage.end_at) : false;

const quizStatus = !isStarted ? 'pending' : isEnded ? 'closed' : 'live';
```

### 3. Added Dynamic Status Configuration
```javascript
const statusConfig = {
    pending: { 
        label: 'Pending', 
        bgColor: 'bg-amber-500/20', 
        borderColor: 'border-amber-500/30', 
        textColor: 'text-amber-400' 
    },
    live: { 
        label: 'Active', 
        bgColor: 'bg-emerald-500/20', 
        borderColor: 'border-emerald-500/30', 
        textColor: 'text-emerald-400' 
    },
    closed: { 
        label: 'Closed', 
        bgColor: 'bg-rose-500/20', 
        borderColor: 'border-rose-500/30', 
        textColor: 'text-rose-400' 
    }
};
```

### 4. Updated Status Display to Use Dynamic Values
```jsx
// AFTER (Dynamic - CORRECT):
<span>
    {quizStatus === 'live' ? 'Live Challenge' : 
     quizStatus === 'pending' ? 'Upcoming Challenge' : 
     'Ended Challenge'}
</span>
<div className={`${currentStatus.bgColor} border ${currentStatus.borderColor}`}>
    <span className={`${currentStatus.textColor}`}>
        {currentStatus.label}
    </span>
</div>
```

## How It Works Now

### Status Determination Logic:
```
Quiz has start_at and end_at dates
    ↓
Check if quiz has started: hasDatePassed(start_at)
    ↓
Check if quiz has ended: hasDatePassed(end_at)
    ↓
Determine status:
- NOT started yet → "Pending" (Yellow/Amber)
- Started BUT NOT ended → "Active/Live" (Green/Emerald)
- Ended → "Closed" (Red/Rose)
```

### Visual Indicators:

**Pending Quiz (Not started):**
- Badge: "Upcoming Challenge"
- Status: "Pending" (Yellow/Amber)
- No animation

**Live Quiz (Active):**
- Badge: "Live Challenge"
- Status: "Active" (Green/Emerald)
- Pulsing dot animation

**Closed Quiz (Ended):**
- Badge: "Ended Challenge"
- Status: "Closed" (Red/Rose)
- No animation

## Files Modified

1. ✅ `v2/src/components/teacher/QuizResults.jsx`
   - Added `hasDatePassed` import
   - Added date status calculation logic
   - Updated hardcoded status to dynamic status

## Testing

### Step 1: Clear Cache
```
Press: Ctrl + Shift + R
```

### Step 2: Navigate to Teacher Quiz Page
1. Go to `/dashboard/quizzes` (as teacher)
2. Click on any quiz
3. Should navigate to `/dashboard/teacher/question?code=QUIZ_CODE`

### Step 3: Verify Status Display

**For quiz with end_at = "2027-01-22 01:16:00":**
- Should show: "Live Challenge" or "Upcoming Challenge"
- Status badge: "Active" (Green) or "Pending" (Yellow)
- Should NOT show: "Ended Challenge" or "Closed" (Red)

**For quiz with past end date:**
- Should show: "Ended Challenge"
- Status badge: "Closed" (Red)

## Related Fixes

This fix uses the same date parsing logic from:
- `v2/src/utils/date.js` - Fixed in previous commit
- `v2/src/components/dashboard/QuizCard.jsx` - Fixed for student view

Now both teacher and student views correctly handle quiz expiration dates.

## Impact

This fix affects:
- ✅ Teacher quiz results page (`/dashboard/teacher/question`)
- ✅ Quiz status display in teacher view
- ✅ Visual indicators (colors, animations)
- ✅ Consistency with student quiz view

## Before vs After

### Before (Wrong):
```
All quizzes showed:
- "Live Challenge" + "Active" (Green)
Even if quiz ended in 2024!
```

### After (Correct):
```
Quizzes show correct status based on dates:
- Future quiz → "Upcoming Challenge" + "Pending" (Yellow)
- Active quiz → "Live Challenge" + "Active" (Green)
- Ended quiz → "Ended Challenge" + "Closed" (Red)
```

## Summary

**Problem:** Teacher question page showing all quizzes as "Live/Active"
**Cause:** Hardcoded status, not checking dates
**Solution:** Added same date checking logic as QuizCard
**Result:** Status now correctly reflects quiz dates ✅

---

**The teacher's quiz page will now show the correct Live/Pending/Closed status!** 🎉

Just refresh with `Ctrl + Shift + R` to see the changes.
