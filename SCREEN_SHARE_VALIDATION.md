# Screen Share Validation - Entire Screen Enforcement

## Overview
Enhanced the screen sharing functionality to ensure students MUST select "Entire Screen" (not Window or Tab). The system automatically validates the selection and retries if the wrong option is chosen.

## How It Works

### User Flow

```
Student clicks "I Agree & Accept"
         ↓
Camera/Mic permission granted ✅
         ↓
Screen share prompt appears
         ↓
┌─────────────────────────────────────────┐
│ Choose what to share                    │
│                                         │
│ ● Entire Screen  ← MUST SELECT THIS    │
│ ○ Window         ← NOT ALLOWED         │
│ ○ Chrome Tab     ← NOT ALLOWED         │
│                                         │
│  [Cancel]  [Share]                      │
└─────────────────────────────────────────┘
         ↓
System validates selection
         ↓
    ┌────────┴────────┐
    │                 │
 Correct          Wrong
 (Screen)      (Window/Tab)
    │                 │
    ↓                 ↓
Continue         Show notification
                      ↓
                 Retry prompt
                 (up to 3 times)
```

### Validation Logic

1. **User selects screen share option**
2. **System checks `displaySurface` property:**
   - `'monitor'` = Entire Screen ✅ (Allowed)
   - `'window'` = Window ❌ (Not allowed)
   - `'browser'` = Browser Tab ❌ (Not allowed)
   - `'application'` = Application ❌ (Not allowed)

3. **If wrong selection:**
   - Stop the stream immediately
   - Show notification with clear instructions
   - Automatically re-prompt (up to 3 times)

4. **If correct selection:**
   - Continue with recording
   - Start the quiz

## Features Implemented

### 1. Automatic Validation (`src/utils/mediaRecording.js`)

```javascript
// Check what user selected
const settings = videoTrack.getSettings();
const isEntireScreen = settings.displaySurface === 'monitor';

if (!isEntireScreen) {
  // Wrong selection - stop stream and return error
  stream.getTracks().forEach(track => track.stop());
  return {
    success: false,
    wrongSelection: true,
    selectedType: settings.displaySurface
  };
}
```

### 2. Automatic Retry Logic (`src/utils/mediaRecording.js`)

```javascript
async requestAllPermissions(maxRetries = 3) {
  // ... camera/mic request ...
  
  // Retry screen share up to 3 times
  let screenAttempts = 0;
  while (screenAttempts < maxRetries) {
    const result = await this.requestScreenShare();
    
    if (result.success) {
      break; // Correct selection
    } else if (result.wrongSelection) {
      screenAttempts++;
      continue; // Retry
    } else {
      return; // User cancelled
    }
  }
}
```

### 3. User-Friendly Notifications (`src/pages/StartQuiz.jsx`)

**Special notification for wrong selection:**
```javascript
toast.error(
  <div className="space-y-2">
    <p className="font-bold">⚠️ Entire Screen Required</p>
    <p className="text-sm">{result.error}</p>
    <p className="text-xs">
      Please select "Entire Screen" (not Window or Tab) when prompted.
    </p>
  </div>,
  { 
    duration: 8000,
    style: {
      background: '#FEF3C7',
      color: '#92400E',
      border: '2px solid #F59E0B'
    }
  }
);
```

### 4. Visual Instructions in Modal (`src/components/AcademicIntegrityModal.jsx`)

Added prominent notice in the Academic Integrity Modal:

```
┌─────────────────────────────────────────────────────────┐
│ ⚠️ Important: Entire Screen Required                    │
│                                                          │
│ When prompted to share your screen, you MUST select:    │
│                                                          │
│ ┌────────────────────────────────────────────────────┐  │
│ │ ✓ "Entire Screen" or "Your Entire Screen"         │  │
│ │ ✗ NOT "Window" or "Chrome Tab"                    │  │
│ └────────────────────────────────────────────────────┘  │
│                                                          │
│ Selecting anything other than the entire screen will    │
│ prevent you from starting the exam.                     │
└─────────────────────────────────────────────────────────┘
```

## Scenarios

### Scenario 1: Correct Selection (First Try) ✅

```
1. User clicks "I Agree & Accept"
2. Camera/Mic granted
3. Screen share prompt appears
4. User selects "Entire Screen"
5. User clicks "Share"
6. ✅ Validation passes
7. Recording starts
8. Navigate to quiz
```

### Scenario 2: Wrong Selection (Window) - Retry ⚠️

```
1. User clicks "I Agree & Accept"
2. Camera/Mic granted
3. Screen share prompt appears
4. User selects "Window"
5. User clicks "Share"
6. ❌ Validation fails
7. Stream stopped immediately
8. 🔔 Notification: "You selected a window instead of entire screen..."
9. Screen share prompt appears again (Retry 1/3)
10. User selects "Entire Screen"
11. User clicks "Share"
12. ✅ Validation passes
13. Recording starts
14. Navigate to quiz
```

### Scenario 3: Wrong Selection (3 Times) - Max Retries ❌

```
1. User clicks "I Agree & Accept"
2. Camera/Mic granted
3. Screen share prompt appears
4. User selects "Chrome Tab" (Attempt 1)
5. ❌ Validation fails - Retry
6. User selects "Window" (Attempt 2)
7. ❌ Validation fails - Retry
8. User selects "Chrome Tab" (Attempt 3)
9. ❌ Validation fails - Max retries reached
10. Camera stream stopped (cleanup)
11. 🔔 Error notification shown
12. Stay on StartQuiz page
13. User must click "START QUIZ!" again to retry
```

### Scenario 4: User Cancels ❌

```
1. User clicks "I Agree & Accept"
2. Camera/Mic granted
3. Screen share prompt appears
4. User clicks "Cancel"
5. ❌ Permission denied
6. Camera stream stopped (cleanup)
7. 🔔 Error: "Screen sharing denied..."
8. Stay on StartQuiz page
```

## Error Messages

### Wrong Selection (Window)
```
⚠️ Entire Screen Required

You selected a window instead of the entire screen. 
You must share your ENTIRE SCREEN to take this exam.

Please select "Entire Screen" (not Window or Tab) when prompted.
```

### Wrong Selection (Tab)
```
⚠️ Entire Screen Required

You selected a browser tab instead of the entire screen. 
You must share your ENTIRE SCREEN to take this exam.

Please select "Entire Screen" (not Window or Tab) when prompted.
```

### Max Retries Reached
```
⚠️ Entire Screen Required

You selected a window/tab instead of the entire screen. 
You must share your ENTIRE SCREEN to take this exam.

Please select "Entire Screen" (not Window or Tab) when prompted.
```

### User Cancelled
```
Screen sharing denied. You must share your entire screen to take the quiz.
```

## Technical Details

### Display Surface Types

The `displaySurface` property can have these values:

| Value | Description | Allowed? |
|-------|-------------|----------|
| `monitor` | Entire screen/display | ✅ Yes |
| `window` | Single application window | ❌ No |
| `browser` | Browser tab | ❌ No |
| `application` | Specific application | ❌ No |

### Browser Support

This feature uses the `getSettings()` method on MediaStreamTrack:

- ✅ Chrome 74+
- ✅ Edge 79+
- ✅ Firefox 66+
- ✅ Opera 62+
- ⚠️ Safari 13+ (limited support)

### Configuration

**Max Retries:** 3 attempts (configurable)
```javascript
await mediaRecorder.requestAllPermissions(3); // 3 retries
```

**Notification Duration:** 8 seconds
```javascript
toast.error(..., { duration: 8000 });
```

## Testing

### Test Cases

1. **Test Correct Selection:**
   - Select "Entire Screen" on first try
   - ✅ Should proceed to quiz

2. **Test Wrong Selection (Window):**
   - Select "Window" first
   - ✅ Should show notification
   - ✅ Should re-prompt
   - Select "Entire Screen" second time
   - ✅ Should proceed to quiz

3. **Test Wrong Selection (Tab):**
   - Select "Chrome Tab" first
   - ✅ Should show notification
   - ✅ Should re-prompt
   - Select "Entire Screen" second time
   - ✅ Should proceed to quiz

4. **Test Max Retries:**
   - Select "Window" three times
   - ✅ Should show error after 3rd attempt
   - ✅ Should stay on StartQuiz page
   - ✅ Camera stream should be stopped

5. **Test User Cancel:**
   - Click "Cancel" on screen share
   - ✅ Should show error
   - ✅ Should stay on StartQuiz page
   - ✅ Camera stream should be stopped

### Manual Testing Steps

1. Start dev server: `npm run dev`
2. Navigate to any quiz
3. Click "START QUIZ!"
4. Accept integrity agreement
5. Allow camera/microphone
6. **Test different selections:**
   - Try selecting "Window" → Should retry
   - Try selecting "Chrome Tab" → Should retry
   - Try selecting "Entire Screen" → Should proceed

## Benefits

### For Students
- ✅ Clear instructions before starting
- ✅ Immediate feedback if wrong selection
- ✅ Automatic retry (no need to restart)
- ✅ Helpful error messages

### For Institutions
- ✅ Ensures complete screen monitoring
- ✅ Prevents students from hiding content
- ✅ Maintains exam integrity
- ✅ Reduces cheating opportunities
- ✅ Provides audit trail

### For Proctors
- ✅ Confidence in monitoring coverage
- ✅ Complete screen recordings
- ✅ No blind spots
- ✅ Better violation detection

## Security Implications

### Why Entire Screen is Required

**Window/Tab sharing allows students to:**
- Hide other windows with answers
- Use second monitor without detection
- Switch to other apps undetected
- Share only the quiz window

**Entire screen sharing ensures:**
- ✅ All monitors visible
- ✅ All windows visible
- ✅ All activity captured
- ✅ No hiding content
- ✅ Complete audit trail

## Privacy Considerations

### What Students Should Know
- Entire screen will be recorded
- All open windows/apps will be visible
- Close sensitive content before starting
- Use dedicated exam environment
- Notification before recording starts

### Recommendations for Students
1. Close all unnecessary applications
2. Close personal/sensitive windows
3. Use a clean desktop
4. Disable notifications
5. Use single monitor if possible

## Troubleshooting

### Issue: "I can't select entire screen"
**Solution:**
- Make sure you're clicking on the screen thumbnail (not window)
- Look for "Entire Screen" or "Screen 1" option
- Don't select individual windows or tabs

### Issue: "Keeps asking me to retry"
**Solution:**
- You're selecting Window or Tab instead of Screen
- Look for the option that shows your entire desktop
- Select the one with multiple windows visible

### Issue: "I selected entire screen but it still fails"
**Solution:**
- Some browsers may have different labels
- Try selecting the option that shows your full desktop
- Contact support if issue persists

## Future Enhancements

### Phase 1: Visual Guidance
1. Show screenshot of correct selection
2. Highlight "Entire Screen" option
3. Add video tutorial
4. Show preview before confirming

### Phase 2: Advanced Validation
1. Detect multiple monitors
2. Require all monitors shared
3. Detect virtual machines
4. Detect screen recording software

### Phase 3: Smart Retry
1. Remember user's previous selection
2. Auto-select "Entire Screen" if available
3. Provide one-click retry
4. Show progress indicator

## Compliance

### Accessibility
- Clear instructions provided
- Multiple retry attempts allowed
- Helpful error messages
- Alternative assessment available

### Privacy
- Students notified before recording
- Consent obtained via modal
- Clear explanation of what's recorded
- Data retention policy disclosed

### Legal
- Terms of Service updated
- Privacy Policy updated
- Consent documented
- Audit trail maintained

## Conclusion

The screen share validation feature ensures academic integrity by requiring students to share their entire screen. The automatic retry mechanism provides a smooth user experience while maintaining strict security requirements.

**Key Features:**
- ✅ Automatic validation
- ✅ Up to 3 retry attempts
- ✅ Clear error messages
- ✅ Visual instructions
- ✅ User-friendly notifications

**Result:**
- Complete screen monitoring
- Reduced cheating opportunities
- Better exam integrity
- Improved proctoring effectiveness
