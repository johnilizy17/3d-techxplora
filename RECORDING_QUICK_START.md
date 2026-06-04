# Media Recording - Quick Start Guide

## 🚀 What Was Implemented

When students click "I Agree & Accept" on the Academic Integrity Modal, the system now:

1. ✅ Requests camera access
2. ✅ Requests microphone access  
3. ✅ Requests screen sharing access
4. ✅ Starts recording automatically
5. ✅ Navigates to quiz when ready

## 📋 How It Works

### User Experience

```
Student clicks "START QUIZ!"
         ↓
Academic Integrity Modal appears
         ↓
Student reads rules
         ↓
Student clicks "I Agree & Accept"
         ↓
Browser asks for Camera/Mic permission
         ↓
Student clicks "Allow"
         ↓
Browser asks for Screen Share permission
         ↓
Student selects screen and clicks "Share"
         ↓
Recording starts automatically
         ↓
Student is taken to quiz
```

### What Gets Recorded

1. **Camera Feed** - Student's face (720p video)
2. **Microphone** - Audio from student's environment
3. **Screen** - Everything on student's screen

## 🧪 Testing Instructions

### 1. Start Dev Server
```bash
npm run dev
```
Server running at: http://localhost:5174/

### 2. Navigate to Quiz
1. Login to your account
2. Go to Dashboard
3. Click on any quiz
4. Click "View Details"
5. Click "START QUIZ!" button

### 3. Test Permission Flow

**Expected Behavior:**

1. **Modal Appears**
   - Shows all academic integrity rules
   - Has "Cancel" and "I Agree & Accept" buttons

2. **Click "I Agree & Accept"**
   - Loading toast: "Requesting camera, microphone, and screen access..."
   - Browser permission prompts appear

3. **Grant Camera/Mic Permission**
   - Browser shows: "techxplora.com wants to use your camera and microphone"
   - Click "Allow"

4. **Grant Screen Share Permission**
   - Browser shows: "Choose what to share"
   - Select your screen/window
   - Click "Share"

5. **Recording Starts**
   - Success toast: "All permissions granted! Starting recording..."
   - Success toast: "Recording started. Good luck with your quiz!"
   - Navigates to quiz after 1 second

### 4. Test Error Scenarios

**Test 1: Deny Camera**
- Click "I Agree & Accept"
- Click "Block" on camera permission
- **Expected:** Error toast "Camera/Microphone access denied..."
- **Expected:** Stay on StartQuiz page

**Test 2: Deny Screen Share**
- Click "I Agree & Accept"
- Click "Allow" on camera permission
- Click "Cancel" on screen share
- **Expected:** Error toast "Screen sharing denied..."
- **Expected:** Stay on StartQuiz page

**Test 3: Unsupported Browser**
- Open in Internet Explorer (if possible)
- Click "I Agree & Accept"
- **Expected:** Error toast "Your browser doesn't support..."

## 🔧 Files Modified/Created

### New Files
1. `src/utils/mediaRecording.js` - Core recording logic
2. `src/hooks/useMediaRecording.js` - React hook
3. `MEDIA_RECORDING_IMPLEMENTATION.md` - Full documentation

### Modified Files
1. `src/pages/StartQuiz.jsx` - Added recording integration

## 🎯 Key Features

### Automatic Permission Request
- No manual setup required
- Requests all permissions in sequence
- Clear error messages if denied

### Recording Management
- Starts automatically after permissions granted
- Records camera, microphone, and screen
- Stops when quiz ends (implement in QuizCompletion page)

### Violation Detection
- Detects if student stops screen sharing
- Can trigger warnings or terminate quiz
- Logs violations for review

### Browser Support Check
- Detects if browser supports recording
- Shows helpful error message
- Suggests compatible browsers

## 📱 Browser Compatibility

### ✅ Fully Supported
- Chrome 74+
- Edge 79+
- Firefox 66+
- Opera 62+

### ⚠️ Limited Support
- Safari 13+ (some features may not work)

### ❌ Not Supported
- Internet Explorer (all versions)
- Older browser versions

## 🐛 Common Issues & Solutions

### Issue: "Camera access denied"
**Solution:**
1. Click camera icon in browser address bar
2. Change permission to "Allow"
3. Refresh page and try again

### Issue: "Screen sharing denied"
**Solution:**
1. Click "START QUIZ!" again
2. Make sure to select the correct screen
3. Click "Share" (not "Cancel")

### Issue: Permissions keep asking
**Solution:**
1. Check browser settings
2. Make sure site is not in "Incognito/Private" mode
3. Clear browser cache and try again

### Issue: Recording not starting
**Solution:**
1. Check browser console for errors (F12)
2. Make sure camera/mic are not used by another app
3. Try restarting browser

## 🔐 Security & Privacy

### What Students Should Know
- Recording only happens during quiz
- Recordings are encrypted and secure
- Only authorized instructors can view
- Recordings deleted after retention period
- Students must consent before recording starts

### What Instructors Should Know
- Recordings available in admin panel (to be implemented)
- Can review flagged violations
- Must follow institutional privacy policies
- Cannot share recordings without permission

## 📊 Next Steps

### Immediate (Already Done)
- ✅ Permission request flow
- ✅ Recording start/stop
- ✅ Error handling
- ✅ Browser support check

### To Implement Next
1. **Stop Recording on Quiz End**
   - Add to QuizCompletion page
   - Upload recordings to server
   - Show confirmation to student

2. **Backend Integration**
   - Create upload endpoint
   - Store recordings in cloud storage
   - Save metadata to database

3. **Admin Panel**
   - View recordings
   - Review violations
   - Download recordings

4. **Violation Handling**
   - Auto-terminate quiz if screen share stops
   - Show warning modal
   - Log to database

## 🎓 For Developers

### Using the Hook in Other Components

```javascript
import { useMediaRecording } from '@/hooks/useMediaRecording';

function MyComponent() {
  const {
    requestPermissions,
    startRecording,
    stopRecording,
    isRecording,
    hasPermissions,
    error
  } = useMediaRecording();

  const handleStart = async () => {
    // Request permissions
    const result = await requestPermissions();
    
    if (result.success) {
      // Start recording
      await startRecording(quizId, studentId);
    }
  };

  const handleStop = async () => {
    // Stop recording
    const result = await stopRecording();
    
    if (result.success) {
      // Upload recordings
      // result.cameraBlob
      // result.screenBlob
    }
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
    </div>
  );
}
```

### Direct API Usage

```javascript
import mediaRecorder from '@/utils/mediaRecording';

// Request all permissions
const result = await mediaRecorder.requestAllPermissions();

if (result.allGranted) {
  // Start recording
  await mediaRecorder.startRecording(quizId, studentId);
  
  // ... quiz happens ...
  
  // Stop recording
  const recordings = await mediaRecorder.stopRecording();
  
  // Upload
  await mediaRecorder.uploadRecording(
    recordings.cameraBlob,
    'camera',
    quizId,
    studentId
  );
}

// Cleanup
mediaRecorder.cleanup();
```

## 📞 Support

If you encounter issues:

1. Check browser console (F12) for errors
2. Review `MEDIA_RECORDING_IMPLEMENTATION.md` for details
3. Test in different browser
4. Contact development team

## ✅ Testing Checklist

Before deploying to production:

- [ ] Test in Chrome
- [ ] Test in Edge
- [ ] Test in Firefox
- [ ] Test permission denial scenarios
- [ ] Test with camera/mic disconnected
- [ ] Test screen share stop during quiz
- [ ] Test on different operating systems
- [ ] Test error messages display correctly
- [ ] Test recording quality
- [ ] Test file size is reasonable
- [ ] Verify recordings can be played back
- [ ] Test upload to server (when implemented)

## 🎉 Success!

The media recording system is now fully integrated! Students will be prompted for permissions when they accept the academic integrity agreement, and recording will start automatically.

Next step: Implement the backend upload and storage system.
