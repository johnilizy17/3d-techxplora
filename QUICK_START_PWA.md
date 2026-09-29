# Quick Start: PWA & Offline Support

## What's Been Added

Your TechXplora app now has full Progressive Web App (PWA) support with offline capabilities!

## Immediate Next Steps

### 1. Create App Icons (Required)

You need to generate icons for the app. The easiest way:

**Option A: Use an online generator**
1. Go to https://www.pwabuilder.com/imageGenerator
2. Upload your logo (512x512 PNG recommended)
3. Download the generated icons
4. Place all icons in the `public/` folder

**Option B: Manual creation**
Create these PNG files in `public/`:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png
- badge-72x72.png

### 2. Test Locally

```bash
# Build the app
npm run build

# Preview production build
npm run preview
```

Open http://localhost:4173 and:
1. Open Chrome DevTools (F12)
2. Go to **Application** tab
3. Check **Service Workers** - should show "activated and running"
4. Check **Cache Storage** - should show cached files
5. Go to **Network** tab, set to "Offline"
6. Reload page - should still work!

### 3. Deploy

Deploy to your hosting (Vercel, Netlify, etc.). The PWA will work automatically on HTTPS.

## New Features Available

### For Users
- **Install App**: Users can install TechXplora as a native app
- **Offline Access**: View cached quizzes, courses, and content offline
- **Auto-Sync**: Pending actions sync automatically when back online
- **Offline Indicator**: Visual feedback when connection is lost

### For Developers
- **Service Worker**: Automatic caching of assets and API responses
- **IndexedDB Storage**: Store quizzes, courses, and user progress offline
- **Background Sync**: Queue actions when offline, sync when online
- **Cache Management**: Built-in tools to manage cached data

## New Components You Can Use

### 1. OfflineIndicator
Already added to App.jsx - shows online/offline status automatically.

### 2. InstallPrompt
Already added to App.jsx - prompts users to install the app.

### 3. PWAStatus
Add to your Profile or Settings page:

```jsx
import PWAStatus from '@/components/PWAStatus';

function ProfilePage() {
  return (
    <div>
      {/* Your existing profile content */}
      <PWAStatus />
    </div>
  );
}
```

### 4. CacheManager
Add to admin/settings page:

```jsx
import CacheManager from '@/components/CacheManager';

function SettingsPage() {
  return (
    <div>
      {/* Your existing settings */}
      <CacheManager />
    </div>
  );
}
```

## New Hooks Available

### useOnlineStatus
```jsx
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

function MyComponent() {
  const isOnline = useOnlineStatus();
  
  return (
    <div>
      {!isOnline && <Alert>You're offline</Alert>}
    </div>
  );
}
```

### useOfflineSync
```jsx
import { useOfflineSync } from '@/hooks/useOfflineSync';

function Dashboard() {
  const { isSyncing, pendingCount } = useOfflineSync();
  
  return (
    <div>
      {isSyncing && <Spinner />}
      {pendingCount > 0 && <Badge>{pendingCount} pending</Badge>}
    </div>
  );
}
```

## Save Data for Offline Use

### Save Quiz for Offline Access
```jsx
import { saveQuizOffline } from '@/utils/offlineStorage';

// When user views a quiz
const quiz = await fetchQuiz(quizId);
await saveQuizOffline(quiz);
```

### Save Course for Offline Access
```jsx
import { saveCourseOffline } from '@/utils/offlineStorage';

// When user enrolls in course
const course = await fetchCourse(courseId);
await saveCourseOffline(course);
```

### Queue Action When Offline
```jsx
import { queueForSync } from '@/utils/offlineStorage';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

function SubmitQuiz() {
  const isOnline = useOnlineStatus();
  
  const handleSubmit = async (answers) => {
    if (!isOnline) {
      // Queue for later sync
      await queueForSync({
        type: 'quiz_submission',
        data: { quizId, answers, userId }
      });
      
      toast.info('Saved! Will submit when online.');
      return;
    }
    
    // Normal online submission
    await submitQuiz(answers);
  };
}
```

## Testing Checklist

- [ ] Icons generated and placed in `public/`
- [ ] Build completes without errors
- [ ] Service worker registers (check DevTools)
- [ ] App works offline (test in DevTools Network tab)
- [ ] Install prompt appears
- [ ] Offline indicator shows when disconnected
- [ ] Cached data loads when offline

## Common Issues

**Service worker not registering?**
- Must use HTTPS (or localhost)
- Check browser console for errors
- Ensure `sw.js` is in `public/` folder

**Install prompt not showing?**
- Need all required icons
- Must visit site twice
- Only works on HTTPS
- iOS doesn't show prompt (manual install only)

**Offline mode not working?**
- Check service worker is active in DevTools
- Verify cache has entries
- Test with DevTools offline mode first

## What's Next?

1. **Generate icons** (most important!)
2. **Test locally** with offline mode
3. **Deploy** to production
4. **Add PWAStatus** to your profile page
5. **Add CacheManager** to settings
6. **Implement offline saving** in quiz/course pages

## Need Help?

Check the full documentation in `PWA_SETUP.md` for:
- Detailed setup instructions
- Advanced customization
- Push notifications setup
- Performance optimization
- Security considerations

## Files Created

- `public/sw.js` - Service worker
- `public/manifest.json` - PWA manifest
- `public/offline.html` - Offline fallback page
- `src/utils/serviceWorker.js` - SW registration
- `src/utils/offlineStorage.js` - IndexedDB wrapper
- `src/utils/pwaHelpers.js` - PWA utilities
- `src/hooks/useOnlineStatus.js` - Online status hook
- `src/hooks/useOfflineSync.js` - Sync hook
- `src/components/OfflineIndicator.jsx` - Status indicator
- `src/components/InstallPrompt.jsx` - Install banner
- `src/components/PWAStatus.jsx` - Status card
- `src/components/CacheManager.jsx` - Cache management

All integrated and ready to use!
