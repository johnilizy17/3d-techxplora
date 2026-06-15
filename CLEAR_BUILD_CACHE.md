# Fix: Clear Build Cache and Service Worker

## The Problem

You're seeing two errors:
1. `Cannot access 'ne' before initialization` - Vite build cache issue
2. `Failed to fetch (sw.js:148)` - Service worker still running

## The Solution

### Step 1: Stop Dev Server
```bash
# Press Ctrl+C in terminal where dev server is running
```

### Step 2: Clear Vite Cache
```bash
cd v2

# Delete node_modules/.vite folder
rm -rf node_modules/.vite

# On Windows PowerShell:
Remove-Item -Recurse -Force node_modules/.vite

# Or manually:
# Navigate to v2/node_modules/ and delete the .vite folder
```

### Step 3: Clear Browser Completely
```bash
1. Open DevTools (F12)
2. Application tab
3. Click "Clear site data" button
4. Check ALL boxes
5. Click "Clear site data" button
6. Close ALL tabs with localhost:5173
7. Close browser completely
```

### Step 4: Restart Fresh
```bash
# In terminal:
cd v2
npm run dev

# Wait for "ready" message
# Open NEW browser window
# Navigate to localhost:5173
```

### Step 5: Verify
Console should show:
```
✅ "🔧 Dev mode: Service Worker unregistered"
❌ NO "Failed to fetch" errors
❌ NO "Cannot access 'ne'" errors
```

---

## Alternative: Nuclear Option

If the above doesn't work:

```bash
# Stop dev server (Ctrl+C)

cd v2

# Delete all caches
rm -rf node_modules/.vite
rm -rf .vite
rm -rf dist

# Windows PowerShell:
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .vite -ErrorAction SilentlyContinue  
Remove-Item -Recurse -Force dist -ErrorAction SilentlyContinue

# Reinstall dependencies (optional but recommended)
npm install

# Start fresh
npm run dev
```

Then:
1. Close browser completely
2. Open fresh browser window
3. Navigate to localhost:5173

---

## Why This Happens

1. **Service Worker Cache** - Old SW is still active from before our fix
2. **Vite HMR Cache** - Stale module cache causing initialization errors
3. **Browser Cache** - Cached chunks with old code

All three must be cleared together for a clean start.

---

## Quick Commands (Copy-Paste)

### Windows (PowerShell):
```powershell
cd v2
Remove-Item -Recurse -Force node_modules\.vite -ErrorAction SilentlyContinue
npm run dev
```

### Mac/Linux (Bash):
```bash
cd v2
rm -rf node_modules/.vite
npm run dev
```

Then clear browser:
- F12 → Application → Clear site data
- Close all tabs
- Restart browser
