# Debug Quiz Expiration Issue

## Current Status

You reported the quiz date is **"2027-01-22 01:16:00"** (January 22, 2027) but it's showing as expired.

## What I've Done

### 1. Updated Date Parsing Functions
**File:** `v2/src/utils/date.js`

- Fixed `hasDatePassed()` to properly parse MySQL datetime format
- Fixed `diffTime()` to handle timezone consistently
- Added validation and debug warnings

### 2. Added Debug Logging
**File:** `v2/src/components/dashboard/QuizCard.jsx`

- Added console logging for 2027 dates
- Will show in browser console what's happening

### 3. Created Test File
**File:** `v2/test-date-parsing.html`

- Standalone HTML file to test date parsing
- Opens in browser to see results

## How to Debug

### Step 1: Check Browser Console

1. Open browser console (F12)
2. Navigate to `/dashboard/quizzes`
3. Look for logs starting with `🔍 Quiz Debug:`
4. Check the values for:
   - `end_at_raw` - Should be "2027-01-22 01:16:00"
   - `end_at_parsed` - Should show year 2027
   - `now` - Current date
   - `isEnded` - Should be `false`

### Step 2: Test Date Parsing

1. Open `v2/test-date-parsing.html` in your browser
2. Check which parsing method works correctly
3. Look for the "Final Result" section
4. Should show: "PASSED ✅" and "LIVE/PENDING (not expired)"

### Step 3: Check API Response

1. Open browser DevTools (F12)
2. Go to Network tab
3. Refresh quizzes page
4. Find the API call that returns quiz data
5. Look at the response
6. Check the `end_at` field value

**Question:** What does the API return? Possible formats:
- `"2027-01-22 01:16:00"` (MySQL datetime)
- `"2027-01-22T01:16:00Z"` (ISO with UTC)
- `"2027-01-22T01:16:00+00:00"` (ISO with timezone)
- Something else?

## Possible Issues

### Issue 1: API Returns Year as 0027 (not 2027)
If database or API corrupted the year somehow.

**Check:** Look at raw API response in Network tab

### Issue 2: JavaScript Parsing Bug
If `new Date("2027-01-22T01:16:00Z")` doesn't work correctly.

**Check:** Run `test-date-parsing.html` to see which method works

### Issue 3: System Clock Wrong
If your computer's date/time is set incorrectly.

**Check:** 
```javascript
console.log(new Date()); // Should show August 12, 2026 (or correct current date)
```

### Issue 4: Database Has Wrong Year
If database actually has "0027-01-22" instead of "2027-01-22".

**Check SQL:**
```sql
SELECT quiz_code, end_at, YEAR(end_at) as year FROM quizzes_info WHERE quiz_code = 'QZ3F10F8AD';
```

## What to Tell Me

Please run the debug steps above and tell me:

1. **From Browser Console (Step 1):**
   ```
   🔍 Quiz Debug: {
     end_at_raw: "???",      // What does it show?
     end_at_parsed: ???,      // What date?
     now: ???,                // What date?
     isEnded: ???             // true or false?
   }
   ```

2. **From test-date-parsing.html (Step 2):**
   - Does it show "PASSED ✅" or "FAILED ❌"?
   - Which parsing method (#1, #2, #3, or #4) works correctly?

3. **From Network Tab (Step 3):**
   - What exact value does API return for `end_at`?
   - Copy and paste the full date string

4. **From SQL (Step 4):**
   ```sql
   SELECT quiz_code, end_at, YEAR(end_at) as year 
   FROM quizzes_info 
   WHERE quiz_code = 'QZ3F10F8AD';
   ```
   - What does it show?

## Quick Tests You Can Run

### Test 1: Console
Open browser console and run:
```javascript
const testDate = "2027-01-22 01:16:00";
const parsed = new Date(testDate.replace(' ', 'T') + 'Z');
console.log('Parsed:', parsed);
console.log('Year:', parsed.getFullYear());
console.log('Is Future?:', parsed > new Date());
```

Expected output:
- Year: `2027`
- Is Future?: `true`

### Test 2: Check Current Code
```javascript
import { hasDatePassed } from '@/utils/date';
console.log(hasDatePassed("2027-01-22 01:16:00")); // Should be false
console.log(hasDatePassed("2024-01-22 01:16:00")); // Should be true
```

## Current Code

### hasDatePassed() Function
```javascript
export function hasDatePassed(inputDate) {
    if (!inputDate) return false;
    
    const now = new Date();
    let date;
    
    if (typeof inputDate === 'string') {
        if (inputDate.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
            date = new Date(inputDate.replace(' ', 'T') + 'Z');
        } else {
            date = new Date(inputDate);
        }
    } else {
        date = new Date(inputDate);
    }
    
    if (isNaN(date.getTime())) {
        console.warn('Invalid date:', inputDate);
        return false;
    }
    
    return date < now;
}
```

This should:
1. Detect MySQL datetime format: `2027-01-22 01:16:00`
2. Convert to: `2027-01-22T01:16:00Z`
3. Parse as UTC
4. Compare with current time
5. Return `false` (not expired) for year 2027

## Next Steps

Based on what you find, we can:

1. **If API returns wrong format:** Fix backend
2. **If parsing is wrong:** Fix date.js further
3. **If database has wrong year:** Fix database
4. **If system clock is wrong:** Fix system settings

Please run the debug steps and share the results! 🔍
