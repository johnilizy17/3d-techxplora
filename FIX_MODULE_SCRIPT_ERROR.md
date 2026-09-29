# Fix: Module Script MIME Type Error

## Error Message
```
Failed to load module script: Expected a JavaScript-or-Wasm module script 
but the server responded with a MIME type of "text/html". 
Strict MIME type checking is enforced for module scripts per HTML spec.
```

## What This Means
The browser is trying to load a JavaScript file that no longer exists (like `index-Ctyrju4j.js`), and instead of getting the JavaScript file, it's getting an HTML error page (404), which has MIME type "text/html" instead of "application/javascript".

This typically happens when:
1. The dev server was restarted and generated new file hashes
2. The browser still has the old HTML file cached
3. The old HTML references old JavaScript files that don't exist anymore

## Quick Fix

### Option 1: Hard Refresh Browser (Fastest)
1. Open the page in your browser
2. Press **Ctrl + Shift + R** (Windows/Linux) or **Cmd + Shift + R** (Mac)
3. Or press **Ctrl + F5**

### Option 2: Clear Browser Cache
1. Press **Ctrl + Shift + Delete**
2. Select "Cached images and files"
3. Click "Clear data"
4. Refresh the page

### Option 3: DevTools Hard Reload
1. Open DevTools (**F12**)
2. Right-click the refresh button
3. Select "Empty Cache and Hard Reload"

### Option 4: Restart Dev Server (If Above Don't Work)
1. Stop the dev server (**Ctrl + C**)
2. Run the fix script:
   ```bash
   ./fix-vite-cache.bat
   ```
3. Or manually:
   ```bash
   # Remove build cache
   rm -rf dist
   rm -rf node_modules/.vite
   
   # Restart dev server
   npm run dev
   ```
4. Clear browser cache and reload

## Why This Happens in Vite

Vite generates JavaScript files with content-based hashes in development mode:
- First run: `index-Ctyrju4j.js`
- After restart: `index-BnxZ9k2p.js`

When you:
1. Load the page → Browser caches `index.html` (references `index-Ctyrju4j.js`)
2. Restart dev server → New hash generated (`index-BnxZ9k2p.js`)
3. Refresh browser → Uses cached HTML (still looking for `index-Ctyrju4j.js`)
4. File not found → Server returns 404 HTML page
5. Browser expects JavaScript → Gets HTML → **ERROR**

## Prevention

### Development Mode:
Add these to your browser DevTools settings:
1. Open DevTools (**F12**)
2. Go to **Settings** (gear icon)
3. Under **Network**, enable:
   - ✅ "Disable cache (while DevTools is open)"
4. Keep DevTools open while developing

### Vite Configuration:
The issue is already minimized by Vite's default config, but you can add:

```javascript
// vite.config.js
export default {
  server: {
    // Force cache headers
    headers: {
      'Cache-Control': 'no-cache'
    }
  }
}
```

## Technical Details

### What Browsers Expect:
```http
GET /assets/index-Ctyrju4j.js
Content-Type: application/javascript  ← Browser expects this
```

### What Actually Happens (404):
```http
GET /assets/index-Ctyrju4j.js
Content-Type: text/html  ← Gets HTML error page instead
```

### Why It Fails:
- Modern browsers enforce strict MIME type checking for ES modules
- `<script type="module">` only accepts `application/javascript` or `text/javascript`
- When it gets `text/html`, it throws the error

## Additional Notes

### If Error Persists:
1. Check if dev server is actually running
2. Check console for actual file path being requested
3. Clear ALL browser data for localhost
4. Try incognito/private window
5. Check if any service workers are cached:
   - Open DevTools → Application → Service Workers
   - Unregister any localhost workers

### Production Builds:
This error doesn't happen in production because:
- Files have stable hashes in build output
- CDN/server serves proper MIME types
- No frequent cache invalidation

## Summary

**Quick Fix**: Press **Ctrl + Shift + R** in your browser

**If that doesn't work**: 
1. Run `./fix-vite-cache.bat`
2. Restart dev server
3. Clear browser cache
4. Reload page

**Prevention**: Keep DevTools open with "Disable cache" enabled during development
