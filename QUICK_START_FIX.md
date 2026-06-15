# ⚡ Quick Start Fix - 5 Minutes

## The Problem
- ❌ WebSocket errors
- ❌ Service worker errors  
- ❌ Camera errors
- ❌ React initialization errors

## The Solution (Copy & Paste)

### 1️⃣ Stop Server
```bash
Ctrl+C (in terminal)
```

### 2️⃣ Clear Cache

**Windows PowerShell:**
```powershell
cd v2
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
npm run dev
```

**Mac/Linux Bash:**
```bash
cd v2
rm -rf node_modules/.vite
npm run dev
```

### 3️⃣ Clear Browser (While server is starting)
```
F12 → Application → "Clear site data" → Check all boxes → Clear
Close ALL tabs with localhost:5173
Restart browser
```

### 4️⃣ Test
Open fresh browser window → `localhost:5173`

**✅ Success looks like:**
```
Console: "🔧 Dev mode: Service Worker unregistered"
No red errors
Camera activates smoothly
```

---

## Still Having Issues?

### WebSocket Error Persists?
```bash
# In browser: F12 → Application → Service Workers → Unregister all
# Then: Ctrl+Shift+R (hard refresh)
```

### Camera Error Persists?
```bash
# Close Zoom, Teams, video apps, other browser tabs
# On Android: Close Messenger, screen recorder apps
# Click "Try Again" button
```

### Initialization Error Persists?
```bash
cd v2
rm -rf node_modules/.vite .vite dist
npm run dev
```

---

## Need More Help?

Read the complete guide:
- **COMPLETE_FIX_GUIDE.md** - Full instructions
- **VISUAL_ERROR_GUIDE.md** - Error recognition
- **DEBUG_QUICK_REFERENCE.md** - Quick lookup

---

## Done? ✨

If console shows `"🔧 Dev mode: Service Worker unregistered"` and no errors, you're good to go!
