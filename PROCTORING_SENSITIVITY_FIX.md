# Proctoring Sensitivity Fix

## Issues Fixed

The exam proctoring system was not detecting violations properly:
- Standing up and leaving the PC did not trigger violations
- Picking up phone to cheat was not detected
- Looking away from laptop was not flagged

## Root Causes

### 1. Video Detection Loop Not Running
**Problem**: The detection loop couldn't find the video element in the DOM
**Impact**: No face detection or head pose tracking was happening

### 2. Thresholds Too Lenient
**Problem**: Detection thresholds were too forgiving
- No face timeout: 2 seconds (too long)
- Gaze away angle: 25° yaw, 20° pitch (too wide)
- Risk score limit: 100 points (too high)

### 3. No Logging
**Problem**: No console logs to debug what was being detected

## Solutions Implemented

### 1. Fixed Video Detection Loop

**Before**:
```javascript
const detectFrame = async () => {
    const video = document.querySelector('video');
    
    if (!video || video.readyState < 2 || video.videoWidth === 0) {
        requestAnimationFrame(detectFrame);
        return;
    }
    // ... detection code
};
```

**After**:
```javascript
const detectFrame = async () => {
    // Try multiple ways to find video
    let video = document.querySelector('video[autoplay]');
    if (!video) video = document.querySelector('video');
    
    // Create hidden video if none exists
    if (!video) {
        video = document.createElement('video');
        video.srcObject = videoStream;
        video.autoplay = true;
        video.muted = true;
        video.playsInline = true;
        video.style.position = 'fixed';
        video.style.top = '-9999px';
        video.width = 640;
        video.height = 480;
        document.body.appendChild(video);
        videoRef.current = video;
        await video.play().catch(() => {});
    }
    // ... detection code with proper cleanup
};
```

**Benefits**:
- Always finds or creates a video element
- Ensures video stream is connected
- Proper cleanup on unmount
- Better error handling

### 2. Stricter Detection Thresholds

#### Default Thresholds (Hook Level)
```javascript
thresholds = {
    noFaceTimeout: 1000,         // 1 second (was 2s)
    multipleFacesTimeout: 500,   // 0.5 seconds (was 1s)
    gazeAwayTimeout: 2000,       // 2 seconds (was 3s)
    gazeAwayRepeats: 2,          // 2 times (was 3)
    talkingTimeout: 1500,        // 1.5 seconds (was 2s)
    audioThreshold: 0.05,        // 5% volume (was 10%)
    riskScoreLimit: 80           // 80 points (was 100)
}
```

#### QuizCompletion Thresholds (Even Stricter)
```javascript
thresholds: {
    noFaceTimeout: 800,          // 0.8 seconds (very strict)
    multipleFacesTimeout: 500,   // 0.5 seconds (very strict)
    gazeAwayTimeout: 1500,       // 1.5 seconds (strict)
    gazeAwayRepeats: 2,          // 2 times (strict)
    talkingTimeout: 1500,        // 1.5 seconds (strict)
    audioThreshold: 0.05,        // 5% volume (sensitive)
    riskScoreLimit: 60           // 60 points (very strict)
}
```

### 3. Stricter Head Pose Detection

**Before**:
```javascript
const isLookingAway = Math.abs(pose.yaw) > 25 || Math.abs(pose.pitch) > 20;
```

**After**:
```javascript
const isLookingAway = Math.abs(pose.yaw) > 15 || Math.abs(pose.pitch) > 15;
```

**Impact**:
- Detects smaller head movements
- Catches students looking at phones or other screens
- More sensitive to gaze direction

### 4. Added Detection Logging

```javascript
faceDetector.onResults((results) => {
    const count = results.detections ? results.detections.length : 0;
    
    // Log detection status
    if (count === 0) {
        console.log('⚠️ No face detected');
    } else if (count > 1) {
        console.log(`⚠️ Multiple faces detected: ${count}`);
    }
    // ... rest of detection logic
});
```

**Benefits**:
- See what's being detected in real-time
- Debug issues quickly
- Verify system is working

## Violation Scenarios Now Detected

### 1. Standing Up / Leaving PC
- **Detection**: No face detected
- **Timeout**: 0.8 seconds
- **Risk Points**: +30
- **Result**: Violation logged, toast notification shown

### 2. Picking Up Phone
- **Detection**: Looking down (pitch > 15°)
- **Timeout**: 1.5 seconds
- **Risk Points**: +10 per occurrence
- **Result**: After 2 occurrences, flagged as cheating (+40 points)

### 3. Looking Away from Laptop
- **Detection**: Head turned (yaw > 15°)
- **Timeout**: 1.5 seconds
- **Risk Points**: +10 per occurrence
- **Result**: After 2 occurrences, flagged as cheating (+40 points)

### 4. Multiple People
- **Detection**: Multiple faces detected
- **Timeout**: 0.5 seconds
- **Risk Points**: +50
- **Result**: Immediate cheating flag

### 5. Talking/Speaking
- **Detection**: Mouth movement + audio
- **Timeout**: 1.5 seconds
- **Risk Points**: +35 (mouth) + 40 (audio) = +75
- **Result**: High risk, near exam termination

## Risk Score System

### Point Values
- No face: +30 points
- Multiple faces: +50 points
- Gaze away (single): +10 points
- Gaze away (repeated): +40 points
- Talking: +35 points
- Audio + talking: +40 points

### Thresholds
- **0-30 points**: Normal (green status)
- **30-60 points**: Suspicious (yellow status)
- **60+ points**: Cheating (red status, exam terminated)

### Example Scenarios

**Scenario 1: Quick phone check**
- Look down for 2 seconds: +10 points
- Status: Normal (warning shown)

**Scenario 2: Extended phone use**
- Look down 1st time: +10 points
- Look down 2nd time: +40 points
- Total: 50 points
- Status: Suspicious (multiple warnings)

**Scenario 3: Leave desk**
- No face for 0.8 seconds: +30 points
- No face continues: +30 more = 60 points
- Status: Cheating (exam terminated)

**Scenario 4: Someone helps**
- Multiple faces for 0.5 seconds: +50 points
- Status: Suspicious
- Continues: +50 more = 100 points
- Status: Cheating (exam terminated)

## Testing the System

### Console Logs to Watch For

1. **System Initialization**:
```
✅ Face Detection initialized
✅ Face Mesh initialized
✅ Audio Detection initialized
🎥 Video detection loop started
```

2. **During Quiz**:
```
⚠️ No face detected
⚠️ Multiple faces detected: 2
🚨 Violation: no_face - No face detected (cheating, +30 risk)
🚨 Violation: gaze_away - Looking away from screen (suspicious, +10 risk)
```

3. **Exam Termination**:
```
🚨 EXAM TERMINATED - Cheating detected
🎥 Video detection loop stopped
```

### Manual Testing Steps

1. **Test No Face Detection**:
   - Start quiz
   - Stand up and walk away
   - Should trigger violation within 0.8 seconds
   - Toast notification should appear

2. **Test Looking Away**:
   - Start quiz
   - Look to the side (>15° angle)
   - Hold for 1.5 seconds
   - Should log warning
   - Repeat - should flag as cheating

3. **Test Phone Usage**:
   - Start quiz
   - Look down at phone
   - Hold for 1.5 seconds
   - Should detect gaze away violation

4. **Test Multiple People**:
   - Start quiz
   - Have someone stand next to you
   - Should detect within 0.5 seconds
   - Should flag as cheating

## Files Modified

- `v2/src/hooks/useExamProctoring.js`
  - Fixed video detection loop
  - Made thresholds stricter
  - Added detection logging
  - Improved head pose sensitivity

- `v2/src/pages/QuizCompletion.jsx`
  - Updated thresholds to be very strict
  - Lowered risk score limit to 60

## Performance Impact

- **CPU Usage**: Slightly higher due to continuous detection
- **Memory**: Minimal increase (hidden video element)
- **Network**: No change (detection is local)
- **Battery**: Moderate increase on laptops

## Future Improvements

1. **Object Detection**: Detect phones, books, other devices
2. **Eye Tracking**: More precise gaze detection
3. **Background Analysis**: Detect people in background
4. **Keyboard/Mouse Monitoring**: Detect suspicious patterns
5. **Tab Switching**: Detect when student leaves quiz tab
6. **Screen Recording**: Record entire session for review

## Notes

- System now much more sensitive - may have false positives
- Adjust thresholds based on real-world testing
- Consider adding "grace period" at quiz start
- May need to calibrate for different lighting conditions
- Consider adding manual review for flagged exams
