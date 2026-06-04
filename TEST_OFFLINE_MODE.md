# 🧪 Test Offline Mode - Quick Guide

## 🚀 Quick Test (2 Minutes)

### Step 1: Visit Website (Online)
```
1. Open browser
2. Go to your website
3. Wait 2 seconds for service worker to install
4. Check console: "✅ Service Worker registered"
```

### Step 2: Go Offline
```
Option A: Disable WiFi/Network
Option B: Chrome DevTools → Network tab → Select "Offline"
```

### Step 3: Refresh Page
```
1. Press F5 or Ctrl+R
2. ✅ Page should load from cache
3. ✅ Orange "You're offline" notification appears
```

### Step 4: Go Back Online
```
1. Enable WiFi/Network
2. ✅ Green "Back online" notification appears
3. ✅ Auto-dismisses after 3 seconds
```

## ✅ Success Indicators

### When Online
- ✅ Console shows: "✅ Service Worker registered"
- ✅ Pages load normally
- ✅ No notifications

### When Offline
- ✅ Page loads from cache (no browser error)
- ✅ Orange notification: "You're offline"
- ✅ Can navigate to cached pages
- ✅ Uncached pages show beautiful offline page

### When Back Online
- ✅ Green notification: "Back online"
- ✅ Notification auto-dismisses
- ✅ Cache updates in background

## 🔍 Chrome DevTools Testing

### Check Service Worker
```
1. F12 → Application tab
2. Service Workers (left sidebar)
3. Should see: "activated and is running"
```

### Check Cache
```
1. F12 → Application tab
2. Cache Storage (left sidebar)
3. Expand "techxplora-static-v2"
4. See cached files
```

### Simulate Offline
```
1. F12 → Network tab
2. Change "No throttling" to "Offline"
3. Refresh page
4. Should load from cache
```

## 🐛 If Something's Wrong

### Service Worker Not Installing?
```
✓ Check if using HTTPS (or localhost)
✓ Check browser console for errors
✓ Clear cache and try again
✓ Verify sw.js exists in public folder
```

### Page Not Loading Offline?
```
✓ Visit page online first (to cache it)
✓ Wait for service worker to install
✓ Check if service worker is activated
✓ Try hard refresh (Ctrl+Shift+R)
```

### Offline Indicator Not Showing?
```
✓ Check if OfflineIndicator is imported in App.jsx
✓ Check browser console for errors
✓ Verify useOnlineStatus hook exists
✓ Try in different browser
```

## 📊 Expected Behavior

| Scenario | Expected Result |
|----------|----------------|
| First visit (online) | Normal load, SW installs |
| Refresh (online) | Fast load from cache |
| Refresh (offline) | Load from cache, show notification |
| Navigate (offline) | Cached pages load, uncached show offline page |
| Back online | Green notification, auto-dismiss |

## 🎯 Test Checklist

- [ ] Service worker installs on first visit
- [ ] Console shows "✅ Service Worker registered"
- [ ] Page loads when offline
- [ ] Orange notification shows when offline
- [ ] Can navigate to cached pages offline
- [ ] Offline page shows for uncached pages
- [ ] Green notification shows when back online
- [ ] Notification auto-dismisses after 3 seconds
- [ ] Cache updates in background
- [ ] No browser errors when offline

## 🚀 Production Testing

### Before Deployment
```
1. Test locally with npm run dev
2. Test build with npm run build && npm run preview
3. Test in multiple browsers
4. Test on mobile devices
```

### After Deployment
```
1. Visit production URL
2. Check service worker installs
3. Test offline functionality
4. Verify HTTPS is enabled
5. Test with real users
```

## ✅ All Tests Passed?

If all tests pass, your offline support is working perfectly! 🎉

Users can now:
- ✅ Refresh without internet
- ✅ Browse cached pages offline
- ✅ See clear offline status
- ✅ Get automatic updates when online

---

**Status**: Ready for Testing ✅
