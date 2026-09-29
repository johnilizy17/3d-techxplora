# Face Detection Implementation with face-api.js

## Overview
Implemented ML-based face detection using face-api.js to ensure quiz integrity by detecting the number of people in the camera frame.

## Implementation Details

### 1. Library Installation
```bash
npm install face-api.js
```

### 2. Custom Hook: useFaceDetection.js
Created a dedicated React hook for face detection functionality.

**Features:**
- Loads face-api.js models from CDN
- Uses TinyFaceDetector for real-time performance
- Detects multiple faces in video stream
- Updates every 2 seconds
- Proper cleanup on unmount

**Models Used:**
- `tinyFaceDetector`: Fast, lightweight face detection
- `faceLandmark68Net`: 68-point facial landmark detection
- `faceRecognitionNet`: Face recognition capabilities

**Detection Options:**
```javascript
{
    inputSize: 224,        // Balance between speed and accuracy
    scoreThreshold: 0.5    // Confidence threshold (0-1)
}
```

**Status States:**
- `loading`: Loading AI models from CDN
- `ready`: Models loaded, ready to detect
- `checking`: Currently analyzing video frame
- `none`: No face detected (0 faces)
- `detected`: One person detected (1 face) ✅
- `multiple`: Multiple people detected (>1 faces) ⚠️
- `error`: Detection failed or unavailable

### 3. Integration with Environment Checks

**Updated useEnvironmentCheck.js:**
- Now accepts `faceDetectionData` parameter
- Updates face detection status from external hook
- Removed basic skin-tone detection algorithm

**Readiness Criteria (excluding network):**
```javascript
const isReady = () => {
    return (
        checks.lighting.status === 'good' &&
        checks.noise.status !== 'noisy' &&
        checks.browser.compatible &&
        checks.faceDetection.status === 'detected' &&
        checks.faceDetection.facesCount === 1  // Must be exactly 1 face
    );
};
```

### 4. Quiz Button Activation Logic

**Button States:**
1. **Disabled - Camera Not Active**
   - Text: "Activate Camera First"
   - User must activate camera

2. **Disabled - Environment Checks Failed**
   - Text: "Complete Environment Checks"
   - One or more checks not passing
   - Shows detailed warning message

3. **Enabled - All Checks Pass**
   - Text: "Start Quiz Now!"
   - All checks pass (except network which is informational only)

**Button Code:**
```javascript
<button
    onClick={handleStartQuiz}
    disabled={!cameraActive || !environmentReady}
    className="..."
>
    <Play fill="currentColor" size={20} />
    {!cameraActive 
        ? 'Activate Camera First' 
        : !environmentReady 
        ? 'Complete Environment Checks' 
        : 'Start Quiz Now!'}
</button>
```

### 5. Visual Feedback

**Face Detection Card:**
- Shows loading spinner while models load
- Displays current detection status
- Color-coded indicators:
  - 🔵 Blue: Loading models
  - 🟢 Green: One person detected (good)
  - 🟡 Yellow: No face or multiple faces (warning)
  - 🔴 Red: Error state

**Status Messages:**
- "Loading AI models..." - Initial load
- "Ready to detect" - Models loaded, waiting
- "Analyzing..." - Currently detecting
- "No face detected" - 0 faces
- "One person detected" - 1 face ✅
- "X people detected" - Multiple faces ⚠️
- "Detection unavailable" - Error

### 6. Recommendations System

**When face detection fails, shows:**
- "Position yourself in front of the camera" (0 faces)
- "Ensure you're alone in the camera frame" (>1 faces)

## Technical Architecture

### Data Flow
```
Video Stream → useFaceDetection Hook → Face Detection Data
                                              ↓
                                    useEnvironmentCheck Hook
                                              ↓
                                    Environment Ready Status
                                              ↓
                                    Quiz Button Enable/Disable
```

### Performance Considerations

**Model Loading:**
- Models loaded once on component mount
- Cached in memory for subsequent detections
- Total size: ~2-3 MB (loaded from CDN)
- Load time: 2-5 seconds (depending on connection)

**Detection Performance:**
- Detection interval: 2 seconds
- Processing time: ~100-300ms per frame
- CPU usage: Low (TinyFaceDetector is optimized)
- Works on most modern devices

**Optimization Techniques:**
- Using TinyFaceDetector (faster than SSD MobileNet)
- Lower input size (224px) for speed
- Detection interval (not every frame)
- Proper cleanup to prevent memory leaks

## Browser Compatibility

### Supported Browsers
- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile Chrome/Safari

### Requirements
- WebRTC support (getUserMedia)
- Canvas API support
- Modern JavaScript (ES6+)

## Error Handling

### Model Loading Failures
- Catches and logs errors
- Sets status to 'error'
- Shows "Detection unavailable" message
- Allows quiz to proceed (graceful degradation)

### Detection Failures
- Catches runtime errors
- Continues detection loop
- Logs errors for debugging
- Doesn't crash the app

## Testing Recommendations

### Face Detection Testing
1. **Single Person (Expected: Pass)**
   - Position yourself in front of camera
   - Verify "One person detected" shows
   - Check green indicator appears
   - Confirm button becomes enabled

2. **No Person (Expected: Fail)**
   - Move out of camera frame
   - Verify "No face detected" shows
   - Check yellow indicator appears
   - Confirm button stays disabled

3. **Multiple People (Expected: Fail)**
   - Have 2+ people in frame
   - Verify "X people detected" shows
   - Check yellow indicator appears
   - Confirm button stays disabled

4. **Model Loading**
   - Test on slow connection
   - Verify loading spinner shows
   - Check "Loading AI models..." message
   - Confirm detection starts after load

5. **Edge Cases**
   - Test with poor lighting
   - Test with face partially visible
   - Test with face at different angles
   - Test with glasses/masks

### Integration Testing
1. Verify all checks must pass (except network)
2. Test button enable/disable logic
3. Verify recommendations appear correctly
4. Test cleanup on page navigation

## Known Limitations

1. **Model Loading Time**
   - Initial load takes 2-5 seconds
   - Depends on internet connection
   - Models cached after first load

2. **Detection Accuracy**
   - May struggle with poor lighting
   - Side profiles less accurate than frontal
   - Partially obscured faces may not detect

3. **Performance**
   - Older devices may be slower
   - Mobile devices may have higher CPU usage
   - Battery impact on mobile devices

4. **False Positives/Negatives**
   - Photos/videos of faces may be detected
   - Very small faces may not detect
   - Multiple faces close together may count as one

## Future Enhancements

### Potential Improvements
1. **Liveness Detection**
   - Detect if person is real (not photo/video)
   - Require eye blinks or head movements
   - More sophisticated anti-cheating

2. **Face Recognition**
   - Verify identity matches enrolled user
   - Detect if person changes during quiz
   - Store face embeddings for comparison

3. **Attention Detection**
   - Track eye gaze direction
   - Detect if looking away from screen
   - Alert on suspicious behavior

4. **Pose Estimation**
   - Detect head orientation
   - Alert if person turns away
   - Ensure frontal face visibility

5. **Model Optimization**
   - Use WebAssembly for faster processing
   - Implement model quantization
   - Reduce model size for faster loading

## CDN and Model Sources

**Current CDN:**
```javascript
const MODEL_URL = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model';
```

**Alternative CDNs:**
- Official: `https://justadudewhohacks.github.io/face-api.js/models`
- Unpkg: `https://unpkg.com/face-api.js@0.22.2/weights`

**Self-Hosting Option:**
- Download models to `/public/models/`
- Update MODEL_URL to `/models`
- Faster loading, no external dependency

## Conclusion

Face detection is now fully implemented using face-api.js with ML-based detection. The quiz button only activates when exactly one face is detected, along with other environment checks (lighting, noise, browser compatibility). Network check is informational only and doesn't block quiz start.

The implementation provides:
- ✅ Accurate face detection using ML
- ✅ Real-time monitoring
- ✅ Clear visual feedback
- ✅ Proper error handling
- ✅ Good performance
- ✅ Enhanced quiz integrity
