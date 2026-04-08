# PWA & Offline Support Setup Guide

TechXplora now supports Progressive Web App (PWA) features including offline functionality, installability, and background sync.

## Features Implemented

### 1. Service Worker
- **Location**: `public/sw.js`
- **Caching Strategies**:
  - **Cache First**: Static assets (JS, CSS, images, fonts)
  - **Network First**: API calls and dynamic content
  - **Offline Fallback**: Custom offline page when network fails

### 2. Offline Storage (IndexedDB)
- **Location**: `src/utils/offlineStorage.js`
- **Stores**:
  - Quizzes
  - Courses
  - Questions
  - User Progress
  - Pending Sync Queue

### 3. PWA Manifest
- **Location**: `public/manifest.json`
- **Features**:
  - App name and description
  - Icons (multiple sizes)
  - Theme colors
  - Display mode (standalone)
  - Screenshots for app stores

### 4. Components

#### OfflineIndicator
Shows online/offline status to users with visual feedback.

#### InstallPrompt
Prompts users to install the app as a PWA with a dismissible banner.

#### CacheManager
Admin component to view and manage cached data:
- View storage usage
- Clear old cache (7+ days)
- Clear all cache
- View cached items count

### 5. Hooks

#### useOnlineStatus
React hook to detect online/offline status in real-time.

#### useOfflineSync
Automatically syncs pending data when connection is restored.

## Setup Instructions

### 1. Generate PWA Icons

You need to create app icons in various sizes. Place them in the `public/` folder:

Required sizes:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png
- badge-72x72.png (for notifications)

**Quick way to generate icons:**

1. Create a 512x512 PNG of your logo
2. Use an online tool like [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator) or [RealFaviconGenerator](https://realfavicongenerator.net/)
3. Download and place all generated icons in `public/`

### 2. Update Vite Config

Add to `vite.config.js`:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          'ui-vendor': ['lucide-react', 'framer-motion']
        }
      }
    }
  }
})
```

### 3. Test Locally

```bash
# Build the app
npm run build

# Preview the production build
npm run preview
```

Open Chrome DevTools:
1. Go to **Application** tab
2. Check **Service Workers** section
3. Check **Cache Storage** section
4. Test offline mode using **Network** tab (set to "Offline")

### 4. Deploy

The service worker will automatically register in production. Make sure your hosting:
- Serves `sw.js` from the root
- Serves `manifest.json` from the root
- Uses HTTPS (required for service workers)

## Usage Examples

### Save Data for Offline Access

```javascript
import { saveQuizOffline, saveCourseOffline } from '@/utils/offlineStorage';

// Save quiz when user views it
const quiz = await fetchQuiz(quizId);
await saveQuizOffline(quiz);

// Save course when user enrolls
const course = await fetchCourse(courseId);
await saveCourseOffline(course);
```

### Queue Actions for Background Sync

```javascript
import { queueForSync } from '@/utils/offlineStorage';

// Queue quiz submission when offline
if (!navigator.onLine) {
  await queueForSync({
    type: 'quiz_submission',
    data: {
      quizId,
      answers,
      userId
    }
  });
  
  toast.info('Submission saved. Will sync when online.');
}
```

### Use Online Status Hook

```javascript
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

function MyComponent() {
  const isOnline = useOnlineStatus();
  
  return (
    <div>
      {!isOnline && (
        <Alert>You're offline. Some features may be limited.</Alert>
      )}
    </div>
  );
}
```

### Use Offline Sync Hook

```javascript
import { useOfflineSync } from '@/hooks/useOfflineSync';

function Dashboard() {
  const { isSyncing, pendingCount } = useOfflineSync();
  
  return (
    <div>
      {isSyncing && <Spinner />}
      {pendingCount > 0 && (
        <Badge>{pendingCount} items pending sync</Badge>
      )}
    </div>
  );
}
```

## Customization

### Update Cache Version

When you make significant changes, update the cache version in `public/sw.js`:

```javascript
const CACHE_VERSION = 'v2'; // Increment this
```

### Modify Caching Strategy

Edit `public/sw.js` to change what gets cached:

```javascript
// Add more static assets
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/offline.html',
  '/logo.png', // Add your assets
  '/fonts/custom-font.woff2'
];
```

### Customize Offline Page

Edit `public/offline.html` to match your brand and provide helpful information.

### Add Push Notifications

1. Get VAPID keys from your backend
2. Update `src/utils/serviceWorker.js`:

```javascript
const subscription = await registration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: 'YOUR_VAPID_PUBLIC_KEY'
});
```

3. Send subscription to your backend
4. Implement push notification handling in `public/sw.js`

## Testing Checklist

- [ ] App installs on mobile devices
- [ ] App works offline (cached pages load)
- [ ] Offline indicator shows when disconnected
- [ ] Install prompt appears on desktop
- [ ] Service worker updates automatically
- [ ] Cached data syncs when back online
- [ ] Icons display correctly in app drawer
- [ ] Theme color matches app design
- [ ] Offline page displays when no cache

## Browser Support

- ✅ Chrome/Edge (full support)
- ✅ Firefox (full support)
- ✅ Safari 11.1+ (limited support)
- ✅ Samsung Internet (full support)
- ⚠️ iOS Safari (limited - no install prompt)

## Troubleshooting

### Service Worker Not Registering

1. Check browser console for errors
2. Ensure you're using HTTPS (or localhost)
3. Clear browser cache and reload
4. Check `sw.js` is accessible at `/sw.js`

### Cache Not Updating

1. Increment `CACHE_VERSION` in `sw.js`
2. Unregister old service worker in DevTools
3. Hard refresh (Ctrl+Shift+R)

### Offline Mode Not Working

1. Check Network tab in DevTools
2. Verify service worker is active
3. Check Cache Storage has entries
4. Test with "Offline" mode in DevTools

### Install Prompt Not Showing

1. Check manifest.json is valid
2. Ensure all required icons exist
3. App must be served over HTTPS
4. User must visit site at least twice
5. Check browser console for manifest errors

## Performance Tips

1. **Lazy load routes** - Split code by route
2. **Optimize images** - Use WebP format
3. **Minimize cache size** - Only cache essential assets
4. **Set cache expiry** - Clear old data automatically
5. **Use compression** - Enable gzip/brotli on server

## Security Considerations

- Service workers only work over HTTPS
- Validate all cached data before use
- Don't cache sensitive user data
- Implement proper authentication for sync
- Clear cache on logout

## Resources

- [MDN Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Google PWA Guide](https://web.dev/progressive-web-apps/)
- [Workbox (Advanced SW Library)](https://developers.google.com/web/tools/workbox)
- [PWA Builder](https://www.pwabuilder.com/)
