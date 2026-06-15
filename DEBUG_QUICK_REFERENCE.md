# Debug Quick Reference - Camera & WebSocket Issues

## 🚨 Error Quick Lookup

### Error: `[vite] failed to connect to websocket`

**Check:**
```javascript
// In browser console, should see:
"🔧 Dev mode: Service Worker unregistered"
```

**Fix:**
```bash
# Clear site data
DevTools > Application > Storage > Clear site data

# Hard refresh
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)

# Restart dev server
npm run dev
```

---

### Error: `Failed to fetch` (sw.js)

**Check:** Are you in development mode?
```bash
# Console should show:
"🔧 Dev mode: Service Worker unregistered"
```

**Fix:**
```bash
# Unregister all service workers
DevTools > Application > Service Workers > Unregister all

# If that doesn't work:
# 1. Close all tabs with the site
# 2. Clear site data
# 3. Restart browser
```

---

### Error: `NotReadableError: Could not start video source`

**Check:**
```javascript
// Console should show before camera activation:
"[Cleanup] Stopping camera streams..."
"[Camera] Requesting media access..."
```

**Common Causes:**

1. **Camera in use by another tab/app**
   ```bash
   # Close:
   - Other browser tabs with camera
   - Zoom, Teams, WhatsApp calls
   - Camera app on mobile
   ```

2. **Android overlays blocking permission**
   ```bash
   # Close:
   - Facebook Messenger chat heads
   - Screen recorders
   - Blue light filters
   - Floating widgets
   ```

3. **Previous stream not released**
   ```bash
   # Refresh page completely
   F5 or Ctrl+R
   ```

---

### Error: Camera activates but shows black screen

**Check:**
```javascript
// Console should show:
"Video metadata loaded"
"Video dimensions: 640 x 480" (or similar)
"Video playing successfully"
```

**Fix:**
```bash
# 1. Check video element in DevTools
# Should have srcObject with active MediaStream

# 2. Try different browser
# Chrome usually works best

# 3. Update graphics drivers (desktop)
```

---

## 🔍 Console Log Cheat Sheet

### ✅ Good Signs (Development)
```
🔧 Dev mode: Service Worker unregistered
[Camera] Requesting media access...
Stream obtained: MediaStream {id: "...", active: true}
Video tracks: [MediaStreamTrack]
Video metadata loaded
Video dimensions: 640 x 480
Video playing successfully
Camera activated, stream set
WebRTC streaming started
Activity logging started
```

### ⚠️ Warning Signs (Can Continue)
```
Recording failed to start
WebRTC streaming failed: <reason>
Failed to log activity: <error>
[SW] Network failed, trying cache
```

### ❌ Error Signs (Must Fix)
```
[vite] failed to connect to websocket
Failed to activate camera: NotReadableError
TypeError: Failed to fetch
Permission denied
```

---

## 🛠️ Quick Fixes by Symptom

### Symptom: WebSocket errors flood console

**Immediate Fix:**
```bash
1. DevTools > Application > Service Workers
2. Click "Unregister" for all
3. Hard refresh: Ctrl+Shift+R
```

**Permanent Fix:**
Already applied - Service worker disabled in dev mode.

---

### Symptom: Camera won't activate (first time)

**Check Permissions:**
```bash
# Chrome: Click lock icon in address bar
# Firefox: Click shield icon
# Safari: Settings > Websites > Camera

# Should show: "Allow" for camera and microphone
```

**Android Specific:**
```bash
1. Close Facebook Messenger
2. Disable screen recorders
3. Turn off blue light filters
4. Retry camera activation
```

---

### Symptom: Camera works once, then fails

**This is the cleanup issue:**
```bash
# The fix is already applied
# Camera should work multiple times now

# If still failing:
1. Check console for "[Cleanup] Stopping camera streams..."
2. Wait 1 second after clicking "Try Again"
3. Report if issue persists
```

---

### Symptom: HMR not working (changes not reflecting)

**Check:**
```bash
# Console should show on file save:
[vite] hot updated: /src/...

# If not showing:
1. Check file is saved (Ctrl+S)
2. Check Vite dev server is running
3. Restart dev server: npm run dev
```

---

## 📱 Device-Specific Quick Fixes

### Android
```bash
Common Issues:
✓ Overlay apps blocking permissions
✓ Low memory causing camera crashes
✓ Battery saver affecting camera

Quick Fixes:
1. Close all floating apps
2. Close background apps
3. Disable battery saver
4. Use Chrome browser
```

### iOS (iPhone/iPad)
```bash
Common Issues:
✓ Safari-specific camera limitations
✓ Low power mode affecting camera
✓ Privacy settings blocking access

Quick Fixes:
1. Settings > Safari > Camera > Allow
2. Disable Low Power Mode
3. Close other apps using camera
4. Try Chrome or Firefox
```

### Desktop (Windows/Mac/Linux)
```bash
Common Issues:
✓ Multiple monitors causing issues
✓ External webcam not detected
✓ Driver issues

Quick Fixes:
1. Check camera is connected (external)
2. Update drivers (Windows)
3. Check System Preferences > Security (Mac)
4. Try different browser
```

---

## 🧪 Testing Commands

### Test WebSocket/HMR
```bash
cd v2
npm run dev

# Edit any .jsx file
# Should see in console:
# [vite] hot updated: /src/...
```

### Test Camera Activation
```bash
# Navigate to camera setup page
# Open console (F12)
# Click "Activate Camera & Mic"

# Should see within 2 seconds:
# ✅ Stream obtained
# ✅ Video playing successfully
# ✅ Toast: "Camera and microphone activated!"
```

### Test Cleanup
```bash
# Activate camera
# Navigate away (click Back button)

# Should see in console:
# [Cleanup] Stopping camera streams...
# [Cleanup] Stopped track: video
# [Cleanup] Stopped track: audio
```

---

## 💡 Pro Tips

### Fastest Debug Workflow
```bash
1. Open DevTools Console (F12)
2. Filter by level: Errors only
3. Reproduce issue
4. Look at error name (NotReadableError, TypeError, etc.)
5. Match to this guide
```

### Clear Everything (Nuclear Option)
```bash
# When nothing else works:

1. Close ALL browser tabs
2. DevTools > Application > Clear site data
3. Close browser completely
4. Restart dev server: npm run dev
5. Open browser fresh
6. Navigate to site
```

### Monitor Camera State
```javascript
// Paste in console to monitor camera:
setInterval(() => {
  const video = document.querySelector('video');
  if (video && video.srcObject) {
    console.log('Camera:', 
      video.srcObject.active ? '✅ Active' : '❌ Inactive',
      'Tracks:', video.srcObject.getTracks().length
    );
  } else {
    console.log('Camera: ⚠️ No stream');
  }
}, 2000);
```

### Check Service Worker State
```javascript
// Paste in console:
navigator.serviceWorker.getRegistrations()
  .then(regs => {
    if (regs.length === 0) {
      console.log('✅ No service workers (good for dev)');
    } else {
      console.log('⚠️ Service workers found:', regs.length);
      regs.forEach(reg => {
        console.log('  -', reg.scope);
        // Uncomment to unregister:
        // reg.unregister();
      });
    }
  });
```

---

## 📞 When to Ask for Help

**Try these first:**
1. ✅ Checked this guide
2. ✅ Cleared browser data
3. ✅ Hard refreshed page
4. ✅ Restarted dev server
5. ✅ Tested in different browser

**Then provide:**
- Browser name and version
- Device type (mobile/desktop)
- Operating system
- Error message from console
- Console logs around the error
- Screenshot if visual issue

**Quick Issue Template:**
```
Device: [Android 13 / Windows 11 / iOS 16 / etc.]
Browser: [Chrome 120 / Firefox 121 / Safari 17 / etc.]
Issue: [Camera won't activate / WebSocket errors / etc.]

Console logs:
[paste error messages]

Steps to reproduce:
1. ...
2. ...

What I tried:
- Cleared site data
- Hard refresh
- etc.
```

---

## 🔗 Related Files

- Full troubleshooting: `CAMERA_WEBSOCKET_TROUBLESHOOTING.md`
- Changes summary: `FIXES_APPLIED_SUMMARY.md`
- Vite config: `vite.config.js`
- Service worker: `public/sw.js`
- Camera setup: `src/pages/QuizCameraSetup.jsx`
