# Pages with Offline Support

## ✅ Implemented Pages

### 1. QuizDetails.jsx
**Features Added:**
- ✅ Offline indicator when disconnected
- ✅ Auto-saves quiz data for offline viewing
- ✅ Shows "Available Offline" badge when cached
- ✅ Checks offline availability on load
- ✅ Graceful fallback to cached data

**What Users Can Do Offline:**
- View quiz details (title, description, points)
- See quiz schedule (start/end times)
- View countdown timers
- Access quiz metadata
- Share quiz (if previously loaded)

**Code Changes:**
```jsx
// Added imports
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { saveQuizOffline, isAvailableOffline } from '@/utils/offlineHelpers';

// Added state
const isOnline = useOnlineStatus();
const [isOfflineAvailable, setIsOfflineAvailable] = useState(false);

// Auto-save for offline
useEffect(() => {
  if (quiz && quiz.id) {
    saveQuizOffline(quiz);
    checkOfflineAvailability();
  }
}, [quiz]);

// Shows offline indicator
{!isOnline && <OfflineWarning />}

// Shows offline badge
{isOfflineAvailable && <Badge>Available Offline</Badge>}
```

---

### 2. Dashboard.jsx
**Features Added:**
- ✅ Online/offline status indicator
- ✅ Pending sync counter
- ✅ Manual sync button
- ✅ Auto-sync when back online
- ✅ Visual feedback during sync

**What Users Can Do Offline:**
- View dashboard layout
- See cached stats
- Access recent quizzes (if cached)
- View groups (if cached)
- Queue actions for later sync

**Code Changes:**
```jsx
// Added imports
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';

// Added state
const isOnline = useOnlineStatus();
const { isSyncing, pendingCount, syncPendingItems } = useOfflineSync();

// Shows sync status bar
{(!isOnline || pendingCount > 0) && (
  <SyncStatusBar />
)}
```

---

### 3. Courses.jsx
**Features Added:**
- ✅ Offline mode banner
- ✅ Auto-saves courses for offline viewing
- ✅ Shows "Offline" badge on cached courses
- ✅ Displays offline course count
- ✅ Filters to show only cached courses when offline

**What Users Can Do Offline:**
- Browse cached courses
- View course details (if previously loaded)
- See course images and descriptions
- Access teacher information
- View pricing and ratings

**Code Changes:**
```jsx
// Added imports
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { saveCourseOffline, getOfflineContent } from '@/utils/offlineHelpers';

// Added state
const isOnline = useOnlineStatus();
const [offlineContent, setOfflineContent] = useState({ courses: [] });

// Auto-save courses
useEffect(() => {
  if (courses.length > 0) {
    courses.forEach(course => saveCourseOffline(course));
  }
}, [courses]);

// Shows offline banner
{!isOnline && <OfflineBanner />}

// Shows offline badge on courses
{isOfflineAvailable(course.id) && <Badge>Offline</Badge>}
```

---

## 📋 Pages Still Needing Implementation

### High Priority
- [ ] **StartQuiz.jsx** - Quiz taking page (most important!)
- [ ] **QuizCompletion.jsx** - Quiz submission
- [ ] **QuizResult.jsx** - Results viewing
- [ ] **CoursePreview.jsx** - Course details

### Medium Priority
- [ ] **Profile.jsx** - Add PWAStatus and CacheManager
- [ ] **Quizzes.jsx** - Quiz listing
- [ ] **Groups.jsx** - Group management
- [ ] **Leaderboard.jsx** - Rankings

### Low Priority
- [ ] **CreateQuiz.jsx** - Quiz creation (teacher)
- [ ] **ManageCourses.jsx** - Course management (teacher)
- [ ] **Settings** - Add offline settings

---

## 🔧 How to Add Offline Support to Other Pages

### Step 1: Import Required Hooks and Utilities
```jsx
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { 
  saveQuizOffline, 
  saveCourseOffline,
  isAvailableOffline,
  getOfflineContent 
} from '@/utils/offlineHelpers';
```

### Step 2: Add State
```jsx
const isOnline = useOnlineStatus();
const [isOfflineAvailable, setIsOfflineAvailable] = useState(false);
```

### Step 3: Auto-Save Data
```jsx
useEffect(() => {
  if (data && data.id) {
    // Save for offline access
    saveQuizOffline(data).catch(err => console.error(err));
    
    // Check if available offline
    checkOfflineAvailability();
  }
}, [data]);

const checkOfflineAvailability = async () => {
  const available = await isAvailableOffline('quiz', data.id);
  setIsOfflineAvailable(available);
};
```

### Step 4: Add UI Indicators
```jsx
{/* Offline warning */}
{!isOnline && (
  <div className="bg-orange-100 dark:bg-orange-900/20 p-4 rounded-lg">
    <WifiOff className="w-5 h-5" />
    <span>You're offline - viewing cached content</span>
  </div>
)}

{/* Offline badge */}
{isOfflineAvailable && (
  <Badge variant="secondary">
    <Download className="w-3 h-3 mr-1" />
    Available Offline
  </Badge>
)}
```

### Step 5: Handle Submissions (if applicable)
```jsx
import { submitQuizWithOffline } from '@/utils/offlineHelpers';

const handleSubmit = async (data) => {
  const result = await submitQuizWithOffline(
    data,
    async (d) => {
      // Your API call
      return await api.submit(d);
    }
  );
  
  if (result.queued) {
    toast.success('Saved! Will submit when online.');
  }
};
```

---

## 📊 Implementation Status

| Page | Status | Priority | Notes |
|------|--------|----------|-------|
| QuizDetails | ✅ Done | High | Fully implemented |
| Dashboard | ✅ Done | High | Sync status added |
| Courses | ✅ Done | High | Offline badges added |
| StartQuiz | ⏳ Pending | Critical | Needs implementation |
| QuizCompletion | ⏳ Pending | Critical | Needs queue support |
| QuizResult | ⏳ Pending | High | Needs offline viewing |
| CoursePreview | ⏳ Pending | High | Needs caching |
| Profile | ⏳ Pending | Medium | Add PWA components |
| Quizzes | ⏳ Pending | Medium | Add offline filter |
| Groups | ⏳ Pending | Medium | Add caching |
| Leaderboard | ⏳ Pending | Medium | Cache rankings |
| CreateQuiz | ⏳ Pending | Low | Draft support |
| ManageCourses | ⏳ Pending | Low | Draft support |

---

## 🎯 Next Steps

### Immediate (Critical)
1. **Implement StartQuiz offline support**
   - Cache questions when quiz starts
   - Save answers locally
   - Queue submission when offline

2. **Implement QuizCompletion offline support**
   - Queue submissions
   - Show "will sync" message
   - Auto-submit when online

3. **Test offline flow end-to-end**
   - View quiz → Start quiz → Complete → See results
   - All while offline

### Short Term (This Week)
4. Add offline support to QuizResult
5. Add offline support to CoursePreview
6. Add PWAStatus to Profile page
7. Test on mobile devices

### Medium Term (Next Week)
8. Add offline support to remaining pages
9. Implement draft saving for create pages
10. Add offline analytics tracking
11. Optimize cache size and performance

---

## 🧪 Testing Checklist

For each page with offline support:

- [ ] Load page online
- [ ] Go offline (airplane mode)
- [ ] Reload page - should show cached content
- [ ] Offline indicator appears
- [ ] Offline badge shows on cached items
- [ ] Try to submit/interact - should queue
- [ ] Go back online
- [ ] Queued actions sync automatically
- [ ] Success message appears

---

## 💡 Tips for Implementation

1. **Always save data when loaded**
   - Don't wait for user action
   - Cache proactively

2. **Show clear offline indicators**
   - Users should know they're offline
   - Show what's available offline

3. **Queue actions gracefully**
   - Don't fail silently
   - Show "will sync" messages

4. **Test offline scenarios**
   - Slow connection
   - Intermittent connection
   - Complete offline

5. **Handle errors gracefully**
   - Fallback to cache
   - Show helpful messages
   - Provide retry options

---

## 📚 Resources

- **Integration Examples**: See `INTEGRATION_EXAMPLES.md`
- **Helper Functions**: See `src/utils/offlineHelpers.js`
- **Hooks**: See `src/hooks/useOnlineStatus.js` and `useOfflineSync.js`
- **Storage**: See `src/utils/offlineStorage.js`

---

## ✨ Benefits Achieved

### For Users
- ✅ View quizzes offline
- ✅ Browse courses offline
- ✅ See dashboard offline
- ✅ Auto-sync when back online
- ✅ Clear offline indicators

### For Developers
- ✅ Easy-to-use hooks
- ✅ Helper functions
- ✅ Consistent patterns
- ✅ Good documentation
- ✅ Reusable components

---

**Status**: 3 of 13 key pages implemented (23%)
**Next Priority**: StartQuiz.jsx and QuizCompletion.jsx
