# Lighting Detection Fix - Final Solution

## Issue
Lighting detection was staying in "checking" state and never updating to show actual lighting conditions.

## Root Causes

### 1. Variable Scoping Issue
The previous implementation had a scoping problem with the `interval` variable in event handlers, causing the interval to never start properly.

### 2. Too Strict ReadyState Check
Was checking for `video.readyState !== 4` which is too strict.

### 3. Missing Retry Logic
Wasn't retrying enough times if video wasn't ready immediately.

## Final Solution

### Complete Rewrite of Lighting Detection

```javascript
const checkLighting = () => {
    // Check if video is ready
    if (!video.videoWidth || !video.videoHeight) {
        return false;  // Not ready
    }

    if (video.readyState < 2) {
        return false;  // Not ready
    }

    // Analyze brightness...
    return true;  // Success
};

const startChecking = () => {
    if (isStarted) return;  // Prevent multiple intervals
    
    const success = checkLighting();
    if (success) {
        isStarted = true;
        intervalId = setInterval(checkLighting, 2000);
    }
};
```

### Key Improvements

1. **Return Values** - `checkLighting()` returns true/false to indicate success
2. **Single Entry Point** - All paths go through `startChecking()`
3. **Prevent Duplicates** - `isStarted` flag prevents multiple intervals
4. **Multiple Retries** - Tries at 0ms, 500ms, 1000ms, 2000ms
5. **Three Events** - Listens to `loadedmetadata`, `canplay`, and `playing`

### Event Listeners

```javascript
video.addEventListener('loadedmetadata', handleLoadedMetadata);
video.addEventListener('canplay', handleCanPlay);
video.addEventListener('playing', handlePlaying);
```

All three events call `startChecking()` which is safe to call multiple times.

### Retry Strategy

```javascript
// Try immediately
startChecking();

// Retry after delays
setTimeout(startChecking, 500);
setTimeout(startChecking, 1000);
setTimeout(startChecking, 2000);
```

This ensures detection starts even if the video takes time to be ready.

## Testing

### Expected Console Output (Success)

```
💡 Starting lighting detection... {videoWidth: 640, videoHeight: 480, readyState: 4}
💡 Video ready, starting continuous lighting checks
💡 Lighting: good (127)
💡 Lighting: good (128)
💡 Lighting: good (126)
```

### Expected Console Output (Delayed Start)

```
💡 Starting lighting detection... {videoWidth: 0, videoHeight: 0, readyState: 0}
💡 Video not ready yet: {width: 0, height: 0, readyState: 0}
💡 Video metadata loaded event
💡 Video ready, starting continuous lighting checks
💡 Lighting: good (125)
```

### Expected Console Output (Multiple Events)

```
💡 Starting lighting detection... {videoWidth: 0, videoHeight: 0, readyState: 1}
💡 Video not ready yet: {width: 0, height: 0, readyState: 1}
💡 Video can play event
💡 Video ready, starting continuous lighting checks
💡 Lighting: good (130)
💡 Video playing event
(startChecking called but isStarted=true, so no duplicate interval)
```

## Debugging

If lighting still shows "checking", check console for:

1. **Is effect running?**
   ```
   💡 Starting lighting detection...
   ```

2. **What's the video state?**
   ```
   {videoWidth: X, videoHeight: Y, readyState: Z}
   ```

3. **Is video ready?**
   - If width/height are 0, video element not ready
   - If readyState < 2, video not loaded enough

4. **Are events firing?**
   ```
   💡 Video metadata loaded event
   💡 Video can play event
   💡 Video playing event
   ```

5. **Did checking start?**
   ```
   💡 Video ready, starting continuous lighting checks
   ```

6. **Are checks running?**
   ```
   💡 Lighting: good (127)
   ```

## Common Issues

### Issue: No logs at all
**Cause:** Effect not running
**Check:** Is `videoStream` and `videoRef` passed correctly?

### Issue: "Video not ready yet" repeating
**Cause:** Video element not getting stream
**Check:** Is `videoRef.current.srcObject = stream` working?

### Issue: "Video readyState too low"
**Cause:** Video not loading
**Check:** Is stream active? Are tracks enabled?

### Issue: Events firing but no "Video ready"
**Cause:** Video dimensions still 0
**Check:** Wait longer, video might need more time

## Files Modified

- `v2/src/hooks/useEnvironmentCheck.js`
  - Complete rewrite of lighting detection logic
  - Better state management with `isStarted` flag
  - Multiple retry attempts
  - Three event listeners
  - Proper cleanup

## Conclusion

The lighting detection now has:
- ✅ Proper variable scoping
- ✅ Multiple retry attempts
- ✅ Three event listeners
- ✅ Prevention of duplicate intervals
- ✅ Clear success/failure indicators
- ✅ Comprehensive logging

It should start working within 2 seconds of camera activation in all scenarios.
