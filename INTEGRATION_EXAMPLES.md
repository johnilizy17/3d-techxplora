# Integration Examples

Here are practical examples of how to integrate offline support into your existing TechXplora pages.

## Example 1: Quiz Details Page with Offline Support

```jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetQuizByIdQuery } from '@/redux/api/studentApi';
import { fetchQuizWithOffline, isAvailableOffline } from '@/utils/offlineHelpers';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { Badge } from '@/components/ui/badge';
import { WifiOff, Download } from 'lucide-react';

function QuizDetails() {
  const { quizId } = useParams();
  const isOnline = useOnlineStatus();
  const [quiz, setQuiz] = useState(null);
  const [isOfflineAvailable, setIsOfflineAvailable] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if available offline
  useEffect(() => {
    checkOfflineAvailability();
  }, [quizId]);

  const checkOfflineAvailability = async () => {
    const available = await isAvailableOffline('quiz', quizId);
    setIsOfflineAvailable(available);
  };

  // Fetch quiz with offline fallback
  useEffect(() => {
    loadQuiz();
  }, [quizId]);

  const loadQuiz = async () => {
    setLoading(true);
    try {
      const quizData = await fetchQuizWithOffline(
        quizId,
        async (id) => {
          // Your existing API call
          const response = await fetch(`/api/v1/quizzes/${id}`);
          return response.json();
        }
      );
      setQuiz(quizData);
    } catch (error) {
      console.error('Failed to load quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!quiz) return <div>Quiz not found</div>;

  return (
    <div>
      {/* Offline indicator */}
      {!isOnline && (
        <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg mb-4 flex items-center gap-2">
          <WifiOff className="w-5 h-5" />
          <span>You're offline - viewing cached content</span>
        </div>
      )}

      {/* Offline availability badge */}
      <div className="flex items-center gap-2 mb-4">
        <h1>{quiz.title}</h1>
        {isOfflineAvailable && (
          <Badge variant="secondary">
            <Download className="w-3 h-3 mr-1" />
            Available Offline
          </Badge>
        )}
      </div>

      {/* Rest of your quiz details */}
      <div>{quiz.description}</div>
      {/* ... */}
    </div>
  );
}

export default QuizDetails;
```

## Example 2: Quiz Submission with Offline Queue

```jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitQuizWithOffline } from '@/utils/offlineHelpers';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function QuizSubmission({ quizId, questions }) {
  const navigate = useNavigate();
  const isOnline = useOnlineStatus();
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);

    try {
      const result = await submitQuizWithOffline(
        {
          quizId,
          answers,
          userId: user.id,
          submittedAt: new Date().toISOString()
        },
        async (data) => {
          // Your existing API submission
          const response = await fetch('/api/v1/quiz/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
          return response.json();
        }
      );

      if (result.queued) {
        // Submission was queued for later
        toast.success('Quiz saved! Will submit when online.');
        navigate('/dashboard/quizzes');
      } else {
        // Submission was successful
        toast.success('Quiz submitted successfully!');
        navigate(`/dashboard/quizzes/result/${result.id}`);
      }
    } catch (error) {
      toast.error('Failed to submit quiz');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {/* Quiz questions */}
      {questions.map((q, i) => (
        <div key={i}>
          {/* Question UI */}
        </div>
      ))}

      {/* Submit button with offline indicator */}
      <Button 
        onClick={handleSubmit} 
        disabled={submitting}
        className="w-full"
      >
        {submitting ? 'Submitting...' : 
         !isOnline ? 'Save for Later' : 
         'Submit Quiz'}
      </Button>

      {!isOnline && (
        <p className="text-sm text-muted-foreground mt-2 text-center">
          Your answers will be submitted automatically when you're back online
        </p>
      )}
    </div>
  );
}

export default QuizSubmission;
```

## Example 3: Course List with Offline Indicator

```jsx
import { useEffect, useState } from 'react';
import { useGetCoursesQuery } from '@/redux/api/studentApi';
import { getOfflineContent } from '@/utils/offlineHelpers';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Download, WifiOff } from 'lucide-react';

function CourseList() {
  const isOnline = useOnlineStatus();
  const { data: courses, isLoading } = useGetCoursesQuery();
  const [offlineContent, setOfflineContent] = useState({ courses: [] });

  useEffect(() => {
    loadOfflineContent();
  }, []);

  const loadOfflineContent = async () => {
    const content = await getOfflineContent();
    setOfflineContent(content);
  };

  const isOfflineAvailable = (courseId) => {
    return offlineContent.courses.some(c => c.id === courseId);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {/* Offline status banner */}
      {!isOnline && (
        <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg mb-6">
          <div className="flex items-center gap-2 mb-2">
            <WifiOff className="w-5 h-5" />
            <h3 className="font-semibold">Offline Mode</h3>
          </div>
          <p className="text-sm">
            Showing {offlineContent.courses.length} courses available offline
          </p>
        </div>
      )}

      {/* Course grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {courses?.map(course => (
          <Card key={course.id} className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold">{course.title}</h3>
              {isOfflineAvailable(course.id) && (
                <Badge variant="secondary" className="ml-2">
                  <Download className="w-3 h-3 mr-1" />
                  Offline
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">{course.description}</p>
            
            {/* Show warning if offline and not cached */}
            {!isOnline && !isOfflineAvailable(course.id) && (
              <p className="text-xs text-orange-500 mt-2">
                Not available offline
              </p>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

export default CourseList;
```

## Example 4: Profile Page with PWA Status

```jsx
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import PWAStatus from '@/components/PWAStatus';
import CacheManager from '@/components/CacheManager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function ProfilePage() {
  const user = useSelector(selectCurrentUser);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="offline">Offline</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          {/* Your existing profile content */}
          <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          {/* Your existing settings */}
        </TabsContent>

        <TabsContent value="offline" className="space-y-6">
          <PWAStatus />
          <CacheManager />
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ProfilePage;
```

## Example 5: Dashboard with Sync Status

```jsx
import { useOfflineSync } from '@/hooks/useOfflineSync';
import { useOnlineStatus } from '@/hooks/useOnlineStatus';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, WifiOff, CheckCircle } from 'lucide-react';

function Dashboard() {
  const isOnline = useOnlineStatus();
  const { isSyncing, pendingCount, syncPendingItems } = useOfflineSync();

  return (
    <div>
      {/* Header with sync status */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        
        <div className="flex items-center gap-3">
          {/* Online status */}
          <Badge variant={isOnline ? 'default' : 'secondary'}>
            {isOnline ? (
              <>
                <CheckCircle className="w-3 h-3 mr-1" />
                Online
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 mr-1" />
                Offline
              </>
            )}
          </Badge>

          {/* Pending sync count */}
          {pendingCount > 0 && (
            <Badge variant="outline">
              {pendingCount} pending
            </Badge>
          )}

          {/* Manual sync button */}
          {isOnline && pendingCount > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={syncPendingItems}
              disabled={isSyncing}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
              Sync Now
            </Button>
          )}
        </div>
      </div>

      {/* Rest of dashboard */}
      {/* ... */}
    </div>
  );
}

export default Dashboard;
```

## Example 6: Prefetch Content for Offline

```jsx
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { downloadForOffline } from '@/utils/offlineHelpers';
import { Download } from 'lucide-react';
import { toast } from 'sonner';

function CourseDetails({ course }) {
  const [downloading, setDownloading] = useState(false);

  const handleDownloadForOffline = async () => {
    setDownloading(true);

    try {
      // Download course and all its quizzes
      const items = [
        { type: 'course', id: course.id },
        ...course.quizzes.map(q => ({ type: 'quiz', id: q.id }))
      ];

      await downloadForOffline(items, async (item) => {
        const response = await fetch(`/api/v1/${item.type}s/${item.id}`);
        return response.json();
      });

      toast.success('Course downloaded for offline use!');
    } catch (error) {
      toast.error('Failed to download course');
      console.error(error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div>
      <h1>{course.title}</h1>
      
      <Button
        onClick={handleDownloadForOffline}
        disabled={downloading}
        variant="outline"
      >
        <Download className="w-4 h-4 mr-2" />
        {downloading ? 'Downloading...' : 'Download for Offline'}
      </Button>

      {/* Rest of course details */}
    </div>
  );
}

export default CourseDetails;
```

## Quick Integration Checklist

For each page that should work offline:

1. **Import hooks**:
   ```jsx
   import { useOnlineStatus } from '@/hooks/useOnlineStatus';
   ```

2. **Use offline helpers**:
   ```jsx
   import { fetchQuizWithOffline, submitQuizWithOffline } from '@/utils/offlineHelpers';
   ```

3. **Show offline indicator**:
   ```jsx
   const isOnline = useOnlineStatus();
   {!isOnline && <OfflineWarning />}
   ```

4. **Handle offline submissions**:
   ```jsx
   await submitQuizWithOffline(data, apiFunction);
   ```

5. **Cache viewed content**:
   ```jsx
   await saveQuizOffline(quiz);
   ```

That's it! Your pages now work offline.
