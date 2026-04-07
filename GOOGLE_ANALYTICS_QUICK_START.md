# Google Analytics - Quick Start Guide

## ✅ What's Been Implemented

Google Analytics has been successfully integrated into the v2 application with:

- ✅ Google Analytics script in `index.html`
- ✅ Automatic page view tracking
- ✅ 11 pre-built event tracking functions
- ✅ React hook for seamless integration
- ✅ Comprehensive documentation

## 🚀 Quick Start

### 1. Automatic Page View Tracking

Page views are **automatically tracked** when users navigate between pages. No additional code needed!

### 2. Track Quiz Completion

```javascript
import { trackQuizCompletion } from '@/utils/analytics';

// In your quiz completion handler
trackQuizCompletion('QZ200A7D37', 85.5, 1200);
// Parameters: quiz_code, score, time_spent_seconds
```

### 3. Track User Login

```javascript
import { trackLogin } from '@/utils/analytics';

// In your login handler
trackLogin('email');
// or trackLogin('google'), trackLogin('facebook'), etc.
```

### 4. Track User Signup

```javascript
import { trackSignup } from '@/utils/analytics';

// In your signup handler
trackSignup('student');
// or trackSignup('teacher'), trackSignup('admin')
```

### 5. Track Course Enrollment

```javascript
import { trackCourseEnrollment } from '@/utils/analytics';

// In your enrollment handler
trackCourseEnrollment('COURSE_001', 'Python Basics');
```

### 6. Track Custom Events

```javascript
import { trackEvent } from '@/utils/analytics';

// Track any custom event
trackEvent('button_clicked', {
  button_name: 'start_quiz',
  page: 'dashboard'
});
```

## 📊 Available Tracking Functions

| Function | Usage | Example |
|----------|-------|---------|
| `trackEvent` | Custom events | `trackEvent('click', { button: 'submit' })` |
| `trackPageView` | Page views | `trackPageView('/dashboard', 'Dashboard')` |
| `trackQuizCompletion` | Quiz completion | `trackQuizCompletion('QZ001', 85, 600)` |
| `trackCourseEnrollment` | Course enrollment | `trackCourseEnrollment('C001', 'Python')` |
| `trackLogin` | User login | `trackLogin('email')` |
| `trackSignup` | User signup | `trackSignup('student')` |
| `trackError` | Error tracking | `trackError('api_error', 'Failed to load')` |
| `trackVideoView` | Video views | `trackVideoView('V001', 'Tutorial', 600)` |
| `trackGroupJoin` | Group join | `trackGroupJoin('G001', 'Python Group')` |
| `trackXPEarned` | XP earned | `trackXPEarned(100, 'quiz')` |
| `trackEngagement` | Engagement | `trackEngagement('quiz_started', {})` |

## 📁 Files Created

1. **`src/utils/analytics.js`** - Core tracking functions
2. **`src/hooks/useAnalytics.js`** - React hook for page tracking
3. **`GOOGLE_ANALYTICS_SETUP.md`** - Comprehensive documentation
4. **`GOOGLE_ANALYTICS_QUICK_START.md`** - This file

## 📝 Implementation Examples

### Example 1: Track Quiz Completion

```javascript
// In QuizCompletion.jsx
import { trackQuizCompletion } from '@/utils/analytics';

export default function QuizCompletion() {
  useEffect(() => {
    const quizCode = localStorage.getItem('currentQuizCode');
    const score = localStorage.getItem('quizScore');
    const timeSpent = localStorage.getItem('timeSpent');
    
    trackQuizCompletion(quizCode, score, timeSpent);
  }, []);

  return <div>Quiz Completed!</div>;
}
```

### Example 2: Track Login

```javascript
// In Auth.jsx
import { trackLogin } from '@/utils/analytics';

const handleLogin = async (email, password) => {
  try {
    await loginAPI(email, password);
    trackLogin('email');
    // Redirect to dashboard
  } catch (error) {
    console.error('Login failed:', error);
  }
};
```

### Example 3: Track Course Enrollment

```javascript
// In CoursePreview.jsx
import { trackCourseEnrollment } from '@/utils/analytics';

const handleEnroll = async (courseId, courseName) => {
  try {
    await enrollAPI(courseId);
    trackCourseEnrollment(courseId, courseName);
    // Show success message
  } catch (error) {
    console.error('Enrollment failed:', error);
  }
};
```

### Example 4: Track Custom Events

```javascript
// In any component
import { trackEvent } from '@/utils/analytics';

const handleButtonClick = () => {
  trackEvent('dashboard_button_clicked', {
    button_name: 'start_quiz',
    user_type: 'student'
  });
  // Perform action
};
```

## 🔍 Viewing Analytics Data

1. Go to [Google Analytics](https://analytics.google.com/)
2. Sign in with your Google account
3. Select the TechXplora property
4. View **Realtime** data for live tracking
5. View **Reports** for historical data

## 📊 Key Metrics to Track

- **User Engagement**: Quiz completions, course enrollments, group joins
- **User Behavior**: Login methods, signup types, time on page
- **Content Performance**: Most viewed courses, popular quizzes
- **Errors**: API failures, form validation errors
- **Retention**: Return visits, session duration

## ⚙️ Configuration

**Measurement ID:** `G-CVJB4QD1L2`

This is configured in:
- `index.html` - Google Analytics script
- `src/utils/analytics.js` - trackPageView function

## 🎯 Next Steps

1. **Start tracking events** - Use the tracking functions in your components
2. **Monitor analytics** - Check Google Analytics dashboard regularly
3. **Optimize based on data** - Use insights to improve user experience
4. **Set up goals** - Create conversion goals in Google Analytics

## 💡 Best Practices

1. **Use meaningful event names**
   ```javascript
   // Good
   trackEvent('quiz_completed', { score: 85 });
   
   // Avoid
   trackEvent('event1', { data: 'something' });
   ```

2. **Include relevant context**
   ```javascript
   trackEvent('course_enrolled', {
     course_id: 'C001',
     course_name: 'Python Basics',
     user_type: 'student'
   });
   ```

3. **Track at the right time**
   ```javascript
   // Track after successful action
   await enrollCourse(courseId);
   trackCourseEnrollment(courseId, courseName);
   ```

## 🐛 Troubleshooting

### Analytics not showing data?

1. Check if gtag is loaded:
   ```javascript
   console.log(window.gtag); // Should not be undefined
   ```

2. Verify Measurement ID is correct: `G-CVJB4QD1L2`

3. Check browser console for errors

4. Wait 24-48 hours for historical data to appear

### Events not being tracked?

1. Verify function is imported correctly
2. Check if gtag is available: `if (window.gtag) { ... }`
3. Check event parameters are valid
4. Avoid special characters in event names

## 📞 Support

For more information:
- See `GOOGLE_ANALYTICS_SETUP.md` for comprehensive documentation
- Check [Google Analytics Help](https://support.google.com/analytics)
- Review [gtag.js Documentation](https://developers.google.com/analytics/devguides/collection/gtagjs)

## ✨ Summary

Google Analytics is now fully integrated and ready to use! 

**Start tracking user behavior today:** 📊

```javascript
import { trackEvent } from '@/utils/analytics';

trackEvent('my_first_event', { message: 'Analytics is working!' });
```

Happy tracking! 🚀
