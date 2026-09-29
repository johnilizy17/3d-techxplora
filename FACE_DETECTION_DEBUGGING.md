# Face Detection Debugging Guide

## Current Issue
Face detection is showing "Detected 0 face(s)" even when a person is visible in the camera.

## Changes Made to Debug

### 1. Enhanced Logging
Added comprehensive console logging to track:
- Video element readiness (width, height, readyState, paused)
- Detection results with scores
- Video content test (checks if video is actually rendering pixels)

### 2. Improved Detection Settings
- **inputSize**: 416 (higher accuracy)
- **scoreThreshold**: 0.3 (more sensitive)
- **Wait time**: Increased to 2 seconds before starting detection

### 3. Video Element Updates
- Added explicit `width="640"` and `height="480"` attributes
- These help face-api.js properly process the video

### 4. Content Verification Test
Added a test that draws the video to a canvas and checks if there's actual pixel data.

## Debugging Steps

### Step 1: Check Console Logs
After activating the camera, you should see:

```
Loading face detection models...
Face detection models loaded successfully
Video metadata loaded
Video dimensions: 1280 x 720
Video playing successfully
Face detection waiting: {hasStream: true, hasElement: true, modelsLoaded: true}
Starting face detection loop...
Video content test: {hasContent: true, dimensions: "1280x720"}
Running face detection on video: {width: 1280, height: 720, readyState: 4, paused: false}
Detected X face(s) {detections: [...], scores: [...]}
```

### Step 2: Verify Video Content Test
Look for the line:
```
Video content test: {hasContent: true, dimensions: "1280x720"}
```

- If `hasContent: false` → Video is not rendering actual content
- If `hasContent: true` → Video is working, issue is with face detection

### Step 3: Check Detection Scores
Look at the scores in the detection results:
```
Detected 0 face(s) {detections: [], scores: []}
```

- Empty arrays → No faces detected at all
- Arrays with low scores (< 0.3) → Faces detected but below threshold

### Step 4: Check Video Ready State
```
Running face detection on video: {width: 1280, height: 720, readyState: 4, paused: false}
```

- `readyState: 4` → Video is ready (HAVE_ENOUGH_DATA)
- `paused: false` → Video is playing
- If either is wrong, video isn't ready for detection

## Common Issues and Solutions

### Issue 1: Models Not Loading
**Symptoms:**
- Console shows "Failed to load face detection models"
- Status stuck on "Loading AI models..."

**Solutions:**
1. Check internet connection
2. Try different CDN:
   ```javascript
   const MODEL_URL = 'https://justadudewhohacks.github.io/face-api.js/models';
   // OR
   const MODEL_URL = 'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/weights';
   ```
3. Download models locally to `/public/models/` and use `/models`

### Issue 2: Video Not Rendering Content
**Symptoms:**
- `hasContent: false` in video content test
- Video shows black screen

**Solutions:**
1. Check camera permissions
2. Verify video stream is active
3. Check if another app is using the camera
4. Try different browser

### Issue 3: Face Detection Returns 0 Despite Good Video
**Symptoms:**
- `hasContent: true`
- Video shows your face clearly
- Still detects 0 faces

**Possible Causes:**
1. **Poor Lighting** - Face detection needs good lighting
2. **Face Too Small/Large** - Try adjusting distance from camera
3. **Face Angle** - Look directly at camera
4. **Threshold Too High** - Lower scoreThreshold further (try 0.2)
5. **Input Size Too Small** - Increase to 512 or 608

**Solutions:**
```javascript
// Try these settings
new faceapi.TinyFaceDetectorOptions({
    inputSize: 512,  // or 608 for maximum accuracy
    scoreThreshold: 0.2  // very sensitive
})
```

### Issue 4: Detection Works But Inconsistent
**Symptoms:**
- Sometimes detects, sometimes doesn't
- Flickering between 0 and 1 face

**Solutions:**
1. Improve lighting
2. Stay still during detection
3. Increase detection interval to 3-4 seconds
4. Add detection smoothing (require 2-3 consecutive detections)

## Manual Testing

### Test 1: Verify Models Loaded
Open console and run:
```javascript
console.log('TinyFaceDetector loaded:', faceapi.nets.tinyFaceDetector.isLoaded);
```
Should return `true`

### Test 2: Manual Detection Test
```javascript
const video = document.querySelector('video');
const detections = await faceapi.detectAllFaces(video, 
    new faceapi.TinyFaceDetectorOptions({
        inputSize: 416,
        scoreThreshold: 0.3
    })
);
console.log('Manual detection:', detections);
```

### Test 3: Check Video Dimensions
```javascript
const video = document.querySelector('video');
console.log({
    videoWidth: video.videoWidth,
    videoHeight: video.videoHeight,
    readyState: video.readyState,
    paused: video.paused
});
```

## Alternative: Use Different Detection Model

If TinyFaceDetector doesn't work, try SSD MobileNet:

```javascript
// Load different model
await faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL);

// Use in detection
const detections = await faceapi.detectAllFaces(videoElement, 
    new faceapi.SsdMobilenetv1Options({
        minConfidence: 0.3
    })
);
```

## Fallback: Disable Face Detection Requirement

If face detection continues to fail, you can temporarily make it optional:

```javascript
// In useEnvironmentCheck.js
const isReady = () => {
    return (
        checks.lighting.status === 'good' &&
        checks.noise.status !== 'noisy' &&
        checks.browser.compatible
        // Removed face detection requirement
    );
};
```

## Next Steps

1. **Check Console Logs** - Look for the specific logs mentioned above
2. **Verify Video Content** - Ensure `hasContent: true`
3. **Check Detection Scores** - See if any faces are detected with low scores
4. **Adjust Settings** - Try different inputSize and scoreThreshold values
5. **Test Lighting** - Ensure good, even lighting on your face
6. **Try Different Browser** - Chrome usually works best

## Expected Working Output

When everything works correctly, you should see:
```
Loading face detection models...
Face detection models loaded successfully
Video metadata loaded
Video dimensions: 1280 x 720
Video playing successfully
Starting face detection loop...
Video content test: {hasContent: true, dimensions: "1280x720"}
Running face detection on video: {width: 1280, height: 720, readyState: 4, paused: false}
Detected 1 face(s) {
    detections: [{
        score: 0.87,
        box: {x: 320, y: 180, width: 200, height: 250}
    }],
    scores: [0.87]
}
```

The UI should then show "One person detected" with a green checkmark.
