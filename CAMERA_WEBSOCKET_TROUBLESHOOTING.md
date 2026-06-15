# Camera & WebSocket Troubleshooting Guide

## Issues Fixed

### 1. Vite HMR WebSocket Connection Failure
**Error:** `[vite] failed to connect to websocket`

**Root Cause:** 
- Service worker intercepting WebSocket connections
- Vite HMR trying to connect but being blocked by SW

**Solution:**
- Updated `vite.config.js` with explicit HMR configuration
- Modified service worker to skip Vite-specific routes (`/@vite`, `/@fs`, etc.)
- Disabled service worker in development mode

**Files Modified:**
- `v2/vite.config.js` - Added HMR configuration
- `v2/public/sw.js` - Added Vite route exclusions
- `v2/src/main.jsx` - Only register SW in production

### 2. Service Worker Fetch Errors
**Error:** `Uncaught (in promise) TypeError: Failed to fetch`

**Root Cause:**
- Service worker attempting to cache/intercept resources it shouldn't
- Development server resources being cached incorrectly

**Solution:**
- Service worker now skips:
  - Vite dev server routes (`/@vite`, `/__vite`)
  - File system routes (`/@fs`)
  - Node modules
  - WebSocket connections
  - Localhost development requests
- Service worker disabled entirely in development

### 3. Camera "NotReadableError: Could not start video source"
**Error:** `Failed to activate camera: NotReadableError: Could not start video source`

**Root Causes:**
1. Camera already in use by another tab/app
2. Previous stream not properly released
3. Camera permissions blocked by overlay apps (Android)
4. Browser camera access blocked

**Solutions Implemented:**

#### A. Proper Stream Cleanup
```javascript
// Added stopExistingStreams() helper
// Stops all tracks before requesting new stream
// Waits 300ms for camera to be fully released
```

#### B. Enhanced Error Detection
- Specific error messages for each failure type
- Detection of Android overlay apps blocking permissions
- Browser-specific troubleshooting steps

#### C. Improved Cleanup on Unmount
- Properly stops all media tracks
- Clears video element srcObject
- Stops WebRTC streaming
- Prevents memory leaks

## How to Test the Fixes

### 1. WebSocket/HMR Test
```bash
# Start dev server
cd v2
npm run dev

# Check browser console
# Should NOT see: "[vite] failed to connect to websocket"
# Should see: "🔧 Dev mode: Service Worker unregistered"
```

### 2. Camera Access Test
```bash
# Navigate to camera setup page
# Click "Activate Camera & Mic"

# Expected behavior:
✅ Camera activates on first try
✅ No "already in use" errors
✅ Clean activation without retries
✅ Proper cleanup when leaving page
```

### 3. Multiple Tabs Test
```bash
# Open quiz camera setup in Tab 1
# Activate camera
# Open same page in Tab 2
# Try to activate camera

# Expected:
⚠️ Tab 2 shows "Camera is already in use" error
💡 Clear instructions to close other tabs
```

## User-Facing Improvements

### Better Error Messages
Instead of generic errors, users now see:

**Permission Denied:**
```
Camera access denied
Please allow camera and microphone permissions when prompted.
Check browser address bar for permission prompt.
```

**Camera In Use:**
```
Camera is already in use
Close these apps if open:
• Video call apps (Zoom, WhatsApp, etc.)
• Camera app
• Other browser tabs using camera
```

**Android Overlay Detection:**
```
Overlay Detected
Close these apps if open:
• Facebook Messenger (chat heads/bubbles)
• Screen recording apps
• Floating widgets or overlays
• Blue light filter apps
```

### Proactive Android Warning
Android users see helpful banner before camera activation:
```
Before You Start
If you see "This site can't ask for permission", 
close any floating apps or bubbles and try again.
```

## Configuration Changes

### vite.config.js
```javascript
server: {
  host: true,
  port: 5173,
  strictPort: false,
  hmr: {
    protocol: 'ws',
    host: 'localhost',
    clientPort: 5173,
    overlay: true
  },
  watch: {
    usePolling: false,
  }
}
```

### Service Worker Dev Mode Detection
```javascript
// Only register in production
if (import.meta.env.PROD) {
  navigator.serviceWorker.register('/sw.js')
} else {
  // Unregister in development
  navigator.serviceWorker.getRegistrations()
    .then(regs => regs.forEach(reg => reg.unregister()))
}
```

## Development Best Practices

### When Working with Camera
1. Always stop streams before requesting new ones
2. Clean up on component unmount
3. Handle all error cases with helpful messages
4. Test on multiple devices (desktop, Android, iOS)

### When Working with Service Workers
1. Disable in development to avoid caching issues
2. Skip dev server routes and WebSockets
3. Use cache-first for static assets only
4. Network-first for API calls

### Testing Checklist
- [ ] HMR works without WebSocket errors
- [ ] Camera activates cleanly first time
- [ ] Error messages are helpful and specific
- [ ] Multiple tabs handle camera properly
- [ ] Cleanup works on page navigation
- [ ] Android overlay detection works
- [ ] Service worker doesn't interfere in dev

## Quick Fixes for Common Issues

### "WebSocket connection failed"
```bash
# Clear browser cache
# Hard refresh (Ctrl+Shift+R)
# Check console for service worker unregistration
```

### "Camera already in use"
```bash
# Close all tabs using camera
# Close camera apps
# Restart browser if needed
# Check which app is using camera in Task Manager
```

### Service Worker Issues
```bash
# Open DevTools > Application > Service Workers
# Click "Unregister" for all workers
# Clear site data
# Hard refresh
```

## Monitoring & Debugging

### Console Logs to Watch For

**Good Signs:**
```
✅ [Camera] Requesting media access...
✅ Stream obtained: MediaStream
✅ Video metadata loaded
✅ Video playing successfully
✅ Camera activated, stream set
✅ 🔧 Dev mode: Service Worker unregistered
```

**Warning Signs:**
```
⚠️ [SW] Failed to cache some assets
⚠️ [SW] Network failed, trying cache
⚠️ Recording failed to start
```

**Error Signs:**
```
❌ Failed to activate camera: NotReadableError
❌ [vite] failed to connect to websocket
❌ Failed to fetch
```

## Related Files

- `v2/vite.config.js` - Vite configuration
- `v2/public/sw.js` - Service worker
- `v2/src/main.jsx` - SW registration
- `v2/src/pages/QuizCameraSetup.jsx` - Camera handling
- `v2/src/hooks/useWebRTCStream.js` - WebRTC streaming

## Additional Resources

- [Vite HMR Documentation](https://vite.dev/config/server-options.html#server-hmr)
- [MediaDevices API](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Android Camera Permissions](https://developer.android.com/training/permissions/requesting)
