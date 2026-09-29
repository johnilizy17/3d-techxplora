# Proctoring Hook Dependency Fix

## Critical Error Fixed

### Error
```
ReferenceError: Cannot access 'logViolation' before initialization
at useExamProctoring (useExamProctoring.js:324:54)
```

## Root Cause

The `useExamProctoring` hook had a React hooks dependency issue:

1. **Problem**: `logViolation` was defined using `useCallback` AFTER the `useEffect` hooks that used it
2. **Impact**: When the `useEffect` hooks ran, they tried to access `logViolation` before it was initialized
3. **Result**: Component crashed with ReferenceError

## Solution

### Step 1: Move `logViolation` Definition
Moved the `logViolation` function definition to the TOP of the hook, immediately after state and ref declarations, BEFORE any `useEffect` hooks.

```javascript
// ✅ CORRECT ORDER
export const useExamProctoring = ({ ... }) => {
    // 1. State declarations
    const [status, setStatus] = useState('initializing');
    const [violations, setViolations] = useState([]);
    // ... other state
    
    // 2. Refs
    const faceDetectorRef = useRef(null);
    // ... other refs
    
    // 3. Define logViolation BEFORE useEffect hooks
    const logViolation = useCallback((type, details, severity, riskPoints) => {
        // ... implementation
    }, [onViolation, onStatusChange, thresholds]);
    
    // 4. NOW useEffect hooks can safely use logViolation
    useEffect(() => {
        // Can call logViolation here
        logViolation('no_face', 'No face detected', 'cheating', 30);
    }, [enabled, thresholds, logViolation]); // ✅ Added to dependencies
};
```

### Step 2: Add to Dependencies
Added `logViolation` to the dependency arrays of all `useEffect` hooks that use it:

1. **Face Detection useEffect**: `[enabled, thresholds, logViolation]`
2. **Face Mesh useEffect**: `[enabled, thresholds, logViolation]`
3. **Audio Detection useEffect**: Already had `logViolation` in dependencies

### Step 3: Remove Duplicate
Removed the duplicate `logViolation` definition that appeared later in the file.

## Files Modified

- `v2/src/hooks/useExamProctoring.js`

## Changes Made

### Before (Broken)
```javascript
// ❌ WRONG ORDER
useEffect(() => {
    // Tries to use logViolation
    logViolation('no_face', 'No face detected', 'cheating', 30);
}, [enabled, thresholds]); // Missing logViolation dependency

// logViolation defined AFTER useEffect
const logViolation = useCallback((type, details, severity, riskPoints) => {
    // ...
}, [onViolation, onStatusChange, thresholds]);
```

### After (Fixed)
```javascript
// ✅ CORRECT ORDER
// logViolation defined BEFORE useEffect
const logViolation = useCallback((type, details, severity, riskPoints) => {
    // ...
}, [onViolation, onStatusChange, thresholds]);

useEffect(() => {
    // Can safely use logViolation
    logViolation('no_face', 'No face detected', 'cheating', 30);
}, [enabled, thresholds, logViolation]); // ✅ Added to dependencies
```

## React Hooks Rules

This fix follows React's Rules of Hooks:

1. **Declaration Order Matters**: Functions used in hooks must be defined before the hooks that use them
2. **Dependencies Must Be Complete**: All values used inside a hook must be in its dependency array
3. **useCallback for Stable References**: Using `useCallback` ensures `logViolation` has a stable reference

## Testing

After this fix:
- ✅ Component mounts without errors
- ✅ No ReferenceError in console
- ✅ All proctoring features work correctly
- ✅ Face detection initializes successfully
- ✅ Face mesh initializes successfully
- ✅ Audio detection initializes successfully
- ✅ Violations are logged correctly

## Impact

### Before
- Component crashed immediately on mount
- ReferenceError prevented any proctoring functionality
- Quiz page was completely broken

### After
- Component mounts successfully
- All proctoring features work as expected
- Clean console output (except for expected warnings)
- Quiz page functions normally

## Related Fixes

This fix is part of a series of improvements to the proctoring system:

1. **Connection Errors**: Silently handle API connection failures
2. **Audio Detection**: Gracefully handle missing audio tracks
3. **Hook Dependencies**: Fix `logViolation` initialization order (this fix)

All three fixes together ensure a stable, error-free quiz experience.
