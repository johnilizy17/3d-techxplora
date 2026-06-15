# Immediate Fix Steps - Clear Service Worker

## 🚨 DO THIS NOW

The service worker is still running from before the fix. You need to manually clear it:

### Step 1: Unregister Service Worker
```bash
1. Open browser DevTools (F12)
2. Go to Application tab
3. Click "Service Workers" in left sidebar
4. Click "Unregister" next to any service workers shown
5. Click "Clear site data" button at the top
```

### Step 2: Hard Refresh
```bash
Windows/Linux: Ctrl + Shift + R
Mac: Cmd + Shift + R
```

### Step 3: Restart Dev Server
```bash
# Stop current server (Ctrl+C)
cd v2
npm run dev
```

### Step 4: Verify
After restarting, console should show:
```
✅ "🔧 Dev mode: Service Worker unregistered"
❌ Should NOT see: "Failed to fetch" errors
```

---

## If Service Worker Still Shows:

### Nuclear Option - Clear Everything:
```bash
# In browser DevTools:
1. Application tab
2. Click "Clear site data" at top
3. Check ALL boxes:
   - ✅ Unregister service workers
   - ✅ Local and session storage  
   - ✅ Cache storage
   - ✅ IndexedDB
4. Click "Clear site data"
5. Close ALL browser tabs with the site
6. Restart browser completely
7. Restart dev server
```
