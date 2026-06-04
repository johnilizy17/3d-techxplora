# Lighting Detection - Final Implementation

## Current Status

The lighting detection has been reordered to run FIRST in the `useEnvironmentCheck` hook for faster detection.

## Expected Flow

### 1. Page Load
```
💡 No video stream for lighting check
```
This is NORMAL - the camera hasn't been activated yet.

### 2. Click "Activate Camera & Mic"
The camera activation process starts:
```
Stream obtained: MediaStream {...}
Video tracks: [MediaStreamTrack]
Audio tracks: [MediaStreamTrack]
```

### 3. Stream Set
`setCurrentStream(stream)` is called, which triggers the lighting effect to re-run:
```
💡 Lighting check started, setting up interval
💡 Checking lighting... {videoWidth: 1280, videoHeight: 720, readyState: 4, srcObject: true}
💡 Lighting: good (127)
```

### 4. Continuous Monitoring
Every 1 second:
```
💡 Checking lighting... {videoWidth: 1280, videoHeight: 720, readyState: 4, srcObject: true}
💡 Lighting: good (128)
💡 Lighting: good (126)
```

## Troubleshooting

### Issue: Still seeing "No video stream" after activating camera

**Check:**
1. Is `setCurrentStream(stream)` being called in QuizCameraSetup.jsx?
2. Is the stream being passed correctly to `useEnvironmentCheck`?

**Look for this in QuizCameraSetup.jsx around line 111:**
```javascript
setCurrentStream(stream);
```

**And around line 52:**
```javascript
const { checks, isReady: environmentReady } = useEnvironmentCheck(currentStream, faceDetection, videoRef);
```

### Issue: Seeing "No video element for lighting check"

This means `videoRef.current` is null when the effect runs.

**Check:**
1. Is the video element rendered?
2. Is `ref={videoRef}` on the video element?

### Issue: Seeing "Video not ready yet - will retry"

This means the video element exists but doesn't have dimensions or isn't ready.

**Wait:** The check runs every 1 second and will succeed once the video is ready (usually within 1-2 seconds).

## Code Structure

### useEnvironmentCheck Hook Order
1. **Lighting check** (FIRST - line 15)
2. Network check (line 103)
3. Noise check
4. Face detection update
5. Browser check

### Lighting Check Dependencies
```javascript
useEffect(() => {
    // ... lighting check code
}, [videoStream]); // Only depends on videoStream, not videoRef
```

This ensures the effect re-runs when `currentStream` changes from `null` to `MediaStream`.

## Testing Steps

1. **Open page** → Should see "💡 No video stream for lighting check" (NORMAL)
2. **Click "Activate Camera & Mic"** → Wait for camera to activate
3. **Check console** → Should see "💡 Lighting check started, setting up interval"
4. **Wait 1-2 seconds** → Should see "💡 Lighting: good (X)"
5. **Check UI** → Lighting status should change from "Checking..." to "Good"

## If Still Not Working

If after following all steps the lighting is still stuck on "Checking...", please share:

1. Full console output after activating camera
2. Screenshot of the environment checks section
3. Any error messages in console

The most likely issue is that `currentStream` is not being set or passed correctly to the hook.
