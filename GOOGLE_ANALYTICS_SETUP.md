# Google Analytics Implementation - v2 Application

## Overview

Google Analytics has been successfully integrated into the TechXplora v2 application. The implementation includes:

- ✅ Google Analytics script in `index.html`
- ✅ Utility functions for tracking events
- ✅ React hook for automatic page view tracking
- ✅ Custom event tracking functions

## Files Created/Modified

### New Files Created

1. **`src/utils/analytics.js`**
   - Core analytics utility functions
   - Event tracking helpers
   - Custom event tracking for specific actions

2. **`src/hooks/useAnalytics.js`**
   - React hook for automatic page view tracking
   - Custom event tracking hook

### Modified Files

1. **`index.html`**
   - Added Google Analytics script tag
   - Added gtag configuration

2. **`src/pages/index.jsx`**
   - Imported `useAnalytics` hook
   - Added hook to `PagesContent` component for automatic page tracking

## Google Analytics Configuration

**Measurement ID:** `G-CVJB4QD1L2`

The script is loaded asynchronously in the `<head>` section of `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-CVJB4QD1L2"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-CVJB4QD1L2');
</script>
```

## Available Tracking Functions

### 1. Track Custom Events

```javascript
import { trackEvent } from '@/utils/analytics';

// Basic event tracking
trackEvent('button_click', {
  button_name: 'submit',
  page: 'quiz_page'
});
```

### 2. Track Page Views

```javascript
import { trackPageView } from '@/utils/analytics';

trackPageView('/dashboard/quizzes', 'Quiz Dashboard');
```

**Note:** Page views are automatically tracked when using the `useAnalytics` hook.

### 3. Track Quiz Completion

```javascript
import { trackQuizCompletion } from '@/utils/analytics';

trackQuizCompletion('QZ200A7D37', 85.5, 1200); // quiz_code, score, time_spent_seconds
```

### 4. Track Course Enrollment

```javascript
import { trackCourseEnrollment } from '@/utils/analytics';

trackCourseEnrollment('COURSE_001', 'Python Basics');
```

### 5. Track User Login

```javascript
import { trackLogin } from '@/utils/analytics';

trackLogin('email'); // or 'google', 'facebook', etc.
```

### 6. Track User Signup

```javascript
import { trackSignup } from '@/utils/analytics';

trackSignup('student'); // or 'teacher', 'admin'
```

### 7. Track Errors

```javascript
import { trackError } from '@/utils/analytics';

trackError('api_error', 'Failed to fetch quiz data');
```

### 8. Track Video Views

```javascript
import { trackVideoView } from '@/utils/analytics';

trackVideoView('VIDEO_001', 'Python Tutorial', 600); // video_id, title, duration_seconds
```

### 9. Track Group Join

```javascript
import { trackGroupJoin } from '@/utils/analytics';

trackGroupJoin('GROUP_001', 'Python Learners');
```

### 10. Track XP Earned

```javascript
import { trackXPEarned } from '@/utils/analytics';

trackXPEarned(100, 'quiz'); // xp_amount, source
```

### 11. Track Engagement

```javascript
import { trackEngagement } from '@/utils/analytics';

trackEngagement('quiz_started', {
  quiz_code: 'QZ200A7D37',
  difficulty: 'intermediate'
});
```

## Usage Examples

### Example 1: Track Quiz Completion in QuizCompletion Component

```javascript
import { trackQuizCompletion } from '@/utils/analytics';

export default function QuizCompletion() {
  useEffect(() => {
    const quizCode = localStorage.getItem('currentQuizCode');
    const score = localStorage.getItem('quizScore');
    const timeSpent = localStorage.getItem('timeSpent');
    
    // Track the completion
    trackQuizCompletion(quizCode, score, timeSpent);
  }, []);

  return (
    // Component JSX
  );
}
```

### Example 2: Track Login in Auth Component

```javascript
import { trackLogin } from '@/utils/analytics';

export default function Auth() {
  const handleLogin = async (credentials) => {
    try {
      // Perform login
      await loginAPI(credentials);
      
      // Track the login
      trackLogin('email');
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    // Component JSX
  );
}
```

### Example 3: Track Course Enrollment

```javascript
import { trackCourseEnrollment } from '@/utils/analytics';

export default function CoursePreview() {
  const handleEnroll = async (courseId, courseName) => {
    try {
      // Perform enrollment
      await enrollAPI(courseId);
      
      // Track the enrollment
      trackCourseEnrollment(courseId, courseName);
    } catch (error) {
      console.error('Enrollment failed:', error);
    }
  };

  return (
    // Component JSX
  );
}
```

### Example 4: Track Custom Events

```javascript
import { trackEvent } from '@/utils/analytics';

export default function Dashboard() {
  const handleButtonClick = () => {
    // Track custom event
    trackEvent('dashboard_button_clicked', {
      button_name: 'start_quiz',
      user_type: 'student'
    });
    
    // Perform action
  };

  return (
    // Component JSX
  );
}
```

## Automatic Page View Tracking

Page views are automatically tracked whenever the route changes. This is handled by the `useAnalytics` hook in the `PagesContent` component.

**How it works:**
1. The `useAnalytics` hook is called in `PagesContent`
2. It listens to location changes using `useLocation()`
3. When the location changes, it automatically calls `trackPageView()`
4. The page path and title are sent to Google Analytics

## Viewing Analytics Data

To view the analytics data:

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Select the TechXplora property
4. Navigate to **Realtime** to see live data
5. Navigate to **Reports** to see historical data

## Events to Track

Here are recommended events to track throughout the application:

### User Actions
- ✅ Login (tracked)
- ✅ Signup (tracked)
- ✅ Quiz completion (tracked)
- ✅ Course enrollment (tracked)
- ✅ Group join (tracked)
- ✅ XP earned (tracked)

### Content Interactions
- Video views (tracked)
- Course views
- Quiz attempts
- Group activities

### Errors
- API errors (tracked)
- Form validation errors
- Network errors

### Engagement
- Time on page
- Scroll depth
- Button clicks
- Form submissions

## Best Practices

1. **Use Meaningful Event Names**
   ```javascript
   // Good
   trackEvent('quiz_completed', { score: 85 });
   
   // Avoid
   trackEvent('event1', { data: 'something' });
   ```

2. **Include Relevant Context**
   ```javascript
   trackEvent('course_enrolled', {
     course_id: 'COURSE_001',
     course_name: 'Python Basics',
     user_type: 'student'
   });
   ```

3. **Track at the Right Time**
   ```javascript
   // Track after successful action
   await enrollCourse(courseId);
   trackCourseEnrollment(courseId, courseName);
   ```

4. **Use Consistent Event Names**
   - Use snake_case for event names
   - Use consistent naming across the app
   - Document all custom events

## Troubleshooting

### Analytics Not Showing Data

1. **Check if gtag is loaded**
   ```javascript
   console.log(window.gtag); // Should not be undefined
   ```

2. **Verify Measurement ID**
   - Ensure `G-CVJB4QD1L2` is correct
   - Check Google Analytics property settings

3. **Check Browser Console**
   - Look for any errors related to gtag
   - Check if scripts are blocked by ad blockers

4. **Wait for Data to Appear**
   - Real-time data appears immediately
   - Historical data takes 24-48 hours to process

### Events Not Being Tracked

1. **Verify function is imported**
   ```javascript
   import { trackEvent } from '@/utils/analytics';
   ```

2. **Check if gtag is available**
   ```javascript
   if (window.gtag) {
     trackEvent('my_event', {});
   }
   ```

3. **Check event parameters**
   - Ensure parameters are valid
   - Avoid special characters in event names

## Performance Considerations

- Google Analytics script is loaded asynchronously (non-blocking)
- Event tracking is lightweight and doesn't impact performance
- Page view tracking is automatic and efficient

## Privacy Considerations

- Ensure compliance with GDPR and other privacy regulations
- Consider implementing cookie consent before tracking
- Avoid tracking sensitive user information
- Review Google Analytics privacy policy

## Future Enhancements

1. **Custom Dashboards**
   - Create custom dashboards for specific metrics
   - Track user engagement by role (student, teacher, admin)

2. **Goal Tracking**
   - Set up conversion goals
   - Track user funnels

3. **Audience Segmentation**
   - Create audiences based on user behavior
   - Track retention and churn

4. **Advanced Events**
   - Track video engagement
   - Track form interactions
   - Track search queries

## Support

For questions or issues with Google Analytics:
1. Check the [Google Analytics Documentation](https://support.google.com/analytics)
2. Review the [gtag.js Documentation](https://developers.google.com/analytics/devguides/collection/gtagjs)
3. Contact the TechXplora team

## Summary

Google Analytics is now fully integrated into the v2 application with:
- ✅ Automatic page view tracking
- ✅ Custom event tracking functions
- ✅ Easy-to-use utility functions
- ✅ React hooks for seamless integration
- ✅ Comprehensive documentation

Start tracking user behavior and engagement today! 📊
