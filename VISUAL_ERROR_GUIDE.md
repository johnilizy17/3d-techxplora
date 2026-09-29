# Visual Error Recognition Guide

## 🎯 Quick Visual Reference

This guide helps you instantly recognize and fix errors based on what you see in the browser.

---

## 1️⃣ WebSocket Connection Error

### What You See:
```
┌─────────────────────────────────────────┐
│ Browser Console (Red Text):             │
│                                         │
│ ❌ [vite] failed to connect to          │
│    websocket.                           │
│                                         │
│    your current setup:                  │
│    (browser) localhost:5173/ <--[HTTP]  │
│    --> localhost:5173/ (server)         │
│    (browser) localhost:5173/ <--        │
│    [WebSocket (failing)]--> localhost:  │
│    5173/ (server)                       │
└─────────────────────────────────────────┘
```

### Quick Visual Check:
- [ ] Browser console has RED text
- [ ] Text mentions "websocket"
- [ ] Text shows "localhost:5173"

### Instant Fix:
```bash
1. Press F12 → Application tab
2. Service Workers → Unregister all
3. Press Ctrl+Shift+R (hard refresh)
```

### Verification:
✅ Should see: `"🔧 Dev mode: Service Worker unregistered"`  
❌ Should NOT see: Any websocket errors

---

## 2️⃣ Service Worker Fetch Error

### What You See:
```
┌─────────────────────────────────────────┐
│ Browser Console (Red Text):             │
│                                         │
│ ❌ sw.js:148 Uncaught (in promise)      │
│    TypeError: Failed to fetch           │
│    at networkFirstStrategy (sw.js:148)  │
│    at sw.js:94:21                       │
└─────────────────────────────────────────┘
```

### Quick Visual Check:
- [ ] Error mentions "sw.js" (service worker)
- [ ] Says "Failed to fetch"
- [ ] Line number in sw.js file

### Instant Fix:
```bash
Same as WebSocket fix:
1. F12 → Application → Service Workers
2. Unregister all
3. Hard refresh (Ctrl+Shift+R)
```

### Verification:
✅ Error disappears completely  
✅ Console shows: `"🔧 Dev mode: Service Worker unregistered"`

---

## 3️⃣ Camera "NotReadableError"

### What You See:
```
┌─────────────────────────────────────────┐
│ Browser Console (Red Text):             │
│                                         │
│ ❌ Failed to activate camera:           │
│    NotReadableError: Could not start    │
│    video source                         │
│                                         │
│ In Page:                                │
│ 🔴 Toast notification (red):            │
│    "Camera is already in use"           │
└─────────────────────────────────────────┘
```

### Quick Visual Check:
- [ ] Toast message appears (bottom of screen)
- [ ] Toast is RED color
- [ ] Says "Camera" or "already in use"
- [ ] Video preview is BLACK or shows camera icon

### Instant Fix:
```bash
Option A (Try Again):
1. Click "Try Again" button
2. Wait 2 seconds
3. Camera should activate

Option B (Close Other Apps):
1. Close all other browser tabs
2. Close Zoom/Teams/video apps
3. Click "Try Again"

Option C (Android Specific):
1. Close Facebook Messenger
2. Close screen recorder apps
3. Click "Try Again"
```

### Verification:
✅ Video preview shows your face  
✅ Green "Live" indicator appears  
✅ Toast says: "Camera and microphone activated!"

---

## 4️⃣ Black Video Screen

### What You See:
```
┌─────────────────────────────────────────┐
│ Page Shows:                             │
│                                         │
│ ┌──────────────────────────────┐       │
│ │                              │       │
│ │    ⬛ BLACK SCREEN ⬛          │       │
│ │                              │       │
│ └──────────────────────────────┘       │
│                                         │
│ ✅ "Live" indicator IS showing          │
│ ❌ But video is black                   │
└─────────────────────────────────────────┘
```

### Quick Visual Check:
- [ ] Green "Live" indicator visible
- [ ] Video element is present
- [ ] But shows only black

### Instant Fix:
```bash
1. Refresh page (F5)
2. Try different browser (Chrome works best)
3. Check camera isn't covered
4. Try external webcam if available
```

### Verification:
✅ Video shows your face clearly

---

## 5️⃣ Permission Prompt Doesn't Appear

### What You See:
```
┌─────────────────────────────────────────┐
│ Page Shows:                             │
│                                         │
│ [Activate Camera & Mic] ← Button        │
│                                         │
│ ❌ After clicking:                      │
│    - No browser permission popup        │
│    - Nothing happens                    │
│    - Button shows "Activating..."       │
│      but never completes                │
└─────────────────────────────────────────┘
```

### Quick Visual Check:
- [ ] Button says "Activating..."
- [ ] No permission popup appears
- [ ] Stuck in loading state

### Instant Fix:
```bash
Desktop:
1. Click 🔒 lock icon in address bar
2. Change Camera/Microphone to "Ask"
3. Refresh page and try again

Android:
1. Close Facebook Messenger (chat heads)
2. Disable screen overlay apps
3. Try again
4. Should see permission prompt now
```

### Verification:
✅ Browser permission popup appears  
✅ Can click "Allow"  
✅ Camera activates successfully

---

## 6️⃣ HMR Not Working (Changes Not Appearing)

### What You See:
```
┌─────────────────────────────────────────┐
│ Your Experience:                        │
│                                         │
│ 1. Edit .jsx file                       │
│ 2. Save (Ctrl+S)                        │
│ 3. Look at browser                      │
│ 4. ❌ Changes NOT appearing             │
│                                         │
│ Console Shows:                          │
│ (No "[vite] hot updated" message)      │
└─────────────────────────────────────────┘
```

### Quick Visual Check:
- [ ] Made changes to code
- [ ] Saved file
- [ ] Browser didn't update
- [ ] No "[vite] hot updated" in console

### Instant Fix:
```bash
1. Check dev server is running:
   - Terminal should show "VITE ready"
   
2. Hard refresh:
   - Ctrl+Shift+R
   
3. Restart dev server:
   - Ctrl+C in terminal
   - npm run dev
   
4. Clear browser cache:
   - F12 → Application → Clear site data
```

### Verification:
✅ After saving file, console shows: `"[vite] hot updated"`  
✅ Changes appear immediately without full reload

---

## 7️⃣ Environment Checks Stuck at "Loading AI models..."

### What You See:
```
┌─────────────────────────────────────────┐
│ Page Shows:                             │
│                                         │
│ Environment Checks                      │
│ ┌────────────────────────────────┐     │
│ │ 👤 People                       │     │
│ │    🔄 Loading AI models...      │     │
│ │    (Spinner rotating forever)   │     │
│ └────────────────────────────────┘     │
│                                         │
│ ❌ "Start Quiz" button is disabled      │
└─────────────────────────────────────────┘
```

### Quick Visual Check:
- [ ] "Loading AI models..." text visible
- [ ] Spinner spinning continuously
- [ ] Start Quiz button is grayed out
- [ ] Stuck for > 30 seconds

### Instant Fix:
```bash
1. Check console for errors
2. Try refreshing page (F5)
3. Try different browser
4. Check internet connection (slow = slow loading)
```

### Verification:
✅ Should complete within 10 seconds  
✅ Shows "One person detected"  
✅ Start Quiz button becomes enabled

---

## 🎨 Color-Coded Error Recognition

### 🔴 RED Toast = Critical Error
- Camera/microphone access denied
- Camera already in use
- Browser not supported

**Action:** Read message, follow instructions, click "Try Again"

---

### 🟡 YELLOW/AMBER Box = Warning
- Environment not optimal
- Lighting too dark/bright
- Noisy background
- Multiple people detected

**Action:** Improve conditions or proceed anyway

---

### 🟢 GREEN Toast = Success
- "Camera and microphone activated!"
- "Starting quiz now!"
- Any success message

**Action:** Continue normally

---

### 🔵 BLUE Banner = Information
- Android permission tips
- Before you start messages
- Environment check info

**Action:** Read and understand, then proceed

---

## 📊 Visual Status Indicators

### Device Status Cards

```
┌────────────────────────────────┐
│ 📷 Camera                       │
│                                │
│ ✅ Active and working           │  ← GREEN = Good
│                                │
└────────────────────────────────┘

┌────────────────────────────────┐
│ 📷 Camera                       │
│                                │
│ ⚪ Not activated yet            │  ← GRAY = Inactive
│                                │
└────────────────────────────────┘
```

### Live Indicator

```
🟢 Live    ← GREEN dot pulsing = Camera active

⚪ Live    ← GRAY dot = Camera inactive
```

### Environment Checks

```
Network     ✅ = Good (green)
            ⚠️ = Fair (yellow)
            ❌ = Poor (red)

Lighting    ✅ = Good
            ⚠️ = Dark/Bright

Noise       ✅ = Good
            ⚠️ = Noisy

People      ✅ = 1 person (correct)
            ⚠️ = 0 or 2+ people
            🔄 = Loading
```

---

## 🎯 Decision Tree

```
START: Click "Activate Camera & Mic"
│
├─ Toast appears (red)
│  ├─ Says "access denied"
│  │  └─→ Check browser address bar permissions
│  │
│  ├─ Says "already in use"
│  │  └─→ Close other apps/tabs using camera
│  │
│  └─ Says "permission blocked" (Android)
│     └─→ Close overlay apps, try again
│
├─ Nothing happens
│  ├─ Button stuck on "Activating..."
│  │  └─→ Android: Close Messenger/overlays
│  │  └─→ Desktop: Check address bar permissions
│  │
│  └─ Console has errors
│     ├─ WebSocket error
│     │  └─→ Unregister service workers, hard refresh
│     │
│     └─ NotReadableError
│        └─→ Close camera apps, click "Try Again"
│
└─ Success! (green toast)
   └─→ Continue to quiz
```

---

## 🔍 Console Log Colors

### What Console Colors Mean:

**BLACK/WHITE text:** Normal logs (info)
```
Stream obtained: MediaStream
Video metadata loaded
```

**BLUE text:** Information logs
```
[Camera] Requesting media access...
```

**YELLOW/ORANGE text:** Warnings (can continue)
```
⚠️ Recording failed to start
```

**RED text:** Errors (must fix)
```
❌ Failed to activate camera: NotReadableError
❌ [vite] failed to connect to websocket
```

**GREEN text:** Success (custom styled)
```
✅ Service Worker registered
✅ Camera activated, stream set
```

---

## 📱 Mobile-Specific Visual Cues

### Android Permission Blocked (Visual)

```
┌─────────────────────────────────────────┐
│ 🔵 BLUE BANNER at top                   │
│                                         │
│ ℹ️ Before You Start                     │
│                                         │
│ If you see "This site can't ask for     │
│ permission", close any floating apps... │
└─────────────────────────────────────────┘

If this banner shows, follow its advice BEFORE clicking activate!
```

### iOS Low Power Mode (Visual)

```
Browser may show:
┌─────────────────────────────────────────┐
│ ⚠️ Camera may not work in               │
│    Low Power Mode                       │
└─────────────────────────────────────────┘

Fix: Settings → Battery → Low Power Mode OFF
```

---

## 🎓 Learn to Read Errors Quickly

### Pattern Recognition:

1. **Error Location:**
   - `sw.js:XXX` = Service worker issue → Unregister it
   - `QuizCameraSetup.jsx:XXX` = Camera code issue → Try again
   - `chunk-XXX.js` = Vite/build issue → Hard refresh

2. **Error Name:**
   - `NotReadableError` = Camera in use → Close apps
   - `NotAllowedError` = Permission denied → Allow in browser
   - `NotFoundError` = No camera → Check hardware
   - `TypeError: Failed to fetch` = Network/SW issue → Clear cache

3. **Error Context:**
   - In red toast = User-facing issue
   - In console only = Developer issue
   - Both = Serious issue

---

## ✅ Success Visual Checklist

When everything works, you should see:

```
✅ Dev server running (terminal)
✅ No red errors in console
✅ "🔧 Dev mode: Service Worker unregistered"
✅ Video preview shows your face
✅ Green "Live" indicator pulsing
✅ Green checkmarks on device status
✅ Green toast: "Camera and microphone activated!"
✅ "Start Quiz" button is enabled (bright green)
```

If you see all of these ✅ marks, everything is working perfectly!

---

**Quick Tip:** Take screenshots of error states for future reference!
