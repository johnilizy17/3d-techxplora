# 🔧 Live Streaming Troubleshooting Guide

## ❌ Common Issue: Streaming Not Working

### Symptoms
- No video appears in admin dashboard
- Console shows "Failed to start streaming"
- Students don't see "Live Streaming" indicator
- Admin dashboard shows "No Active Streams"

## 🔍 Debugging Steps

### Step 1: Check Signaling Server

**Is the signaling server running?**

```bash
node signaling-server.js
```

**Expected output:**
```
🚀 Signaling server starting on port 3001...
✅ Signaling server running on ws://localhost:3001
📊 Ready to handle connections...
```

**If not running:**
- Start it: `node signaling-server.js`
- Check if port 3001 is available
- Check for errors in terminal

### Step 2: Check Browser Console (Student Side)

**Open DevTools (F12) and check for:**

✅ **Good messages:**
```
🔒 Anti-cheating monitoring activated
📡 Live streaming started
✅ WebSocket connected to signaling server
```

❌ **Error messages:**
```
❌ WebSocket error
❌ Failed to start streaming
❌ Connection failed
```

### Step 3: Check Browser Console (Admin Side)

**Open DevTools (F12) on admin dashboard:**

✅ **Good messages:**
```
✅ Connected to signaling server
📋 Sent X active streams to admin
```

❌ **Error messages:**
```
❌ WebSocket error
⚠️ WebSocket disconnected
```

### Step 4: Check Network Tab

**Student Side:**
1. Open DevTools → Network tab
2. Filter by "WS" (WebSocket)
3. Should see connection to `ws://localhost:3001`
4. Status should be "101 Switching Protocols"

**Admin Side:**
1. Same steps as student
2. Should see WebSocket connection
3. Should see messages being sent/received

### Step 5: Check Permissions

**Camera and Microphone:**
- Click lock icon in address bar
- Check if camera/microphone are allowed
- If blocked, allow and refresh

**Screen Sharing:**
- Must select "Entire Screen" (not window/tab)
- If wrong selection, will retry automatically

## 🐛 Common Issues & Solutions

### Issue 1: "WebSocket connection failed"

**Cause:** Signaling server not running or wrong URL

**Solution:**
```bash
# Start signaling server
node signaling-server.js

# Check if running on port 3001
netstat -an | grep 3001  # Linux/Mac
netstat -an | findstr 3001  # Windows
```

### Issue 2: "Failed to start streaming"

**Cause:** Camera/screen streams not available

**Solution:**
1. Check if media recording started successfully
2. Verify camera/mic permissions granted
3. Verify screen sharing permission granted
4. Check browser console for specific error

### Issue 3: "No video in admin dashboard"

**Cause:** WebRTC connection not established

**Solution:**
1. Check if both student and admin are connected to signaling server
2. Check firewall settings (allow port 3001)
3. Check if STUN servers are accessible
4. Try refreshing both student and admin pages

### Issue 4: "Disconnected" status in admin

**Cause:** Signaling server not running or connection lost

**Solution:**
1. Restart signaling server
2. Refresh admin dashboard
3. Check network connectivity
4. Check browser console for errors

### Issue 5: Streaming starts but no video

**Cause:** WebRTC peer connection failed

**Solution:**
1. Check if STUN servers are accessible
2. Add TURN server for NAT traversal (production)
3. Check firewall/router settings
4. Try different network

## 🔧 Quick Fixes

### Fix 1: Restart Everything

```bash
# Terminal 1: Stop and restart signaling server
Ctrl+C
node signaling-server.js

# Browser: Refresh student page
# Browser: Refresh admin page
```

### Fix 2: Clear Browser Cache

```
1. Open DevTools (F12)
2. Right-click refresh button
3. Select "Empty Cache and Hard Reload"
4. Try again
```

### Fix 3: Check Permissions

```
1. Click lock icon in address bar
2. Site settings
3. Reset permissions
4. Refresh and allow all permissions
```

### Fix 4: Use Different Browser

```
Try Chrome or Edge (best WebRTC support)
Avoid Firefox (some WebRTC limitations)
```

## 📊 Diagnostic Checklist

### Student Side
- [ ] Signaling server running
- [ ] Quiz started successfully
- [ ] Camera permission granted
- [ ] Microphone permission granted
- [ ] Screen sharing permission granted (entire screen)
- [ ] "Live Streaming" indicator visible
- [ ] Console shows "📡 Live streaming started"
- [ ] No errors in console

### Admin Side
- [ ] Signaling server running
- [ ] Admin dashboard loaded
- [ ] "Connected" status (green dot)
- [ ] WebSocket connection established
- [ ] Console shows "✅ Connected to signaling server"
- [ ] No errors in console

### Network
- [ ] Port 3001 accessible
- [ ] Firewall allows WebSocket connections
- [ ] STUN servers accessible
- [ ] Both devices on same network (or proper routing)

## 🔍 Advanced Debugging

### Check WebSocket Messages

**Student Side Console:**
```javascript
// Add this to see WebSocket messages
const ws = new WebSocket('ws://localhost:3001');
ws.onmessage = (event) => {
  console.log('WS Message:', JSON.parse(event.data));
};
```

**Admin Side Console:**
```javascript
// Same as above
const ws = new WebSocket('ws://localhost:3001');
ws.onmessage = (event) => {
  console.log('WS Message:', JSON.parse(event.data));
};
```

### Check Peer Connection State

**Student Side Console:**
```javascript
// Check peer connection state
console.log('Peer Connection State:', 
  liveStreamManager.peerConnection?.connectionState
);
```

### Check ICE Connection State

**Student Side Console:**
```javascript
// Check ICE connection state
console.log('ICE Connection State:', 
  liveStreamManager.peerConnection?.iceConnectionState
);
```

## 🚀 Production Deployment Issues

### Issue: Works locally but not in production

**Cause:** WebSocket URL hardcoded to localhost

**Solution:**
Update `src/utils/liveStreaming.js`:

```javascript
// Change from:
async initializeWebSocket(serverUrl = 'ws://localhost:3001') {

// To:
async initializeWebSocket(serverUrl = 'wss://your-domain.com') {
```

### Issue: HTTPS required

**Cause:** WebRTC requires HTTPS in production

**Solution:**
1. Deploy signaling server with HTTPS
2. Use WSS (WebSocket Secure) instead of WS
3. Ensure production domain has valid SSL certificate

### Issue: NAT traversal fails

**Cause:** Firewall/router blocking WebRTC

**Solution:**
Add TURN server in `src/utils/liveStreaming.js`:

```javascript
const configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    {
      urls: 'turn:your-turn-server.com:3478',
      username: 'username',
      credential: 'password'
    }
  ]
};
```

## 📝 Logging for Debugging

### Enable Verbose Logging

**Add to `src/utils/liveStreaming.js`:**

```javascript
// At the top of the file
const DEBUG = true;

// Replace console.log with:
if (DEBUG) console.log('[DEBUG]', ...args);
```

### Check Signaling Server Logs

**Terminal running signaling server should show:**
```
✅ New connection from ::1
📨 Received: start-stream
✅ Stream started: stream-1234567890
📡 Broadcast to 1 admin(s): stream-started
```

## ✅ Success Indicators

### Everything Working:

**Student Side:**
- ✅ "Live Streaming" indicator visible (purple box)
- ✅ "Broadcasting" status with red dot
- ✅ Console: "📡 Live streaming started"
- ✅ No errors in console

**Admin Side:**
- ✅ "Connected" status (green dot)
- ✅ Student count > 0
- ✅ Video feeds visible
- ✅ Camera + screen (PIP) showing
- ✅ Console: "✅ Connected to signaling server"

**Signaling Server:**
- ✅ Shows connections from both student and admin
- ✅ Shows stream started messages
- ✅ Shows broadcast messages
- ✅ No errors in terminal

## 🆘 Still Not Working?

### Last Resort Steps:

1. **Check all files exist:**
   ```
   src/utils/liveStreaming.js
   src/hooks/useLiveStreaming.js
   src/pages/admin/LiveInspection.jsx
   signaling-server.js
   ```

2. **Verify imports:**
   ```javascript
   // In QuizCompletion.jsx
   import { useLiveStreaming } from '@/hooks/useLiveStreaming';
   ```

3. **Check route exists:**
   ```javascript
   // In src/pages/index.jsx
   <Route path="/dashboard/admin/inspection" element={<LiveInspection />} />
   ```

4. **Restart everything:**
   ```bash
   # Kill all processes
   # Restart signaling server
   # Restart dev server
   # Clear browser cache
   # Try again
   ```

5. **Test with minimal setup:**
   - One student
   - One admin
   - Same computer (different browsers)
   - Localhost only

## 📞 Get Help

If still not working, provide:
1. Browser console logs (student side)
2. Browser console logs (admin side)
3. Signaling server terminal output
4. Network tab screenshots
5. Browser and OS versions

---

**Most Common Fix:** Restart signaling server! 🔄
