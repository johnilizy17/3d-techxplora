# Bootcamp Quiz Drawer Feature - Complete ✅

## Overview
Created an interactive drawer that automatically appears on the bootcamp dashboard when the user's application status is "pending" or "shortlisted" and they haven't attempted the required assessment quiz yet.

## Implementation

### 1. Component (`v2/src/components/bootcamp/BootcampQuizDrawer.jsx`)

**Features:**
- **Two-Step Process**:
  1. **Info Step** - Shows quiz information with "View Quiz Details" button
  2. **Details Step** - Fetches full quiz info and shows "Start Quiz" button
  
- **Auto-open Behavior** - Opens automatically 1 second after dashboard loads (if conditions met)
- **Manual Trigger** - Can be opened manually from Quiz Status card
- **Responsive Design** - Drawer slides from bottom on mobile, centered on desktop
- **Loading States** - Shows spinners during API calls
- **Error Handling** - Toast notifications for failures
- **Navigation** - Redirects to quiz details page after joining

**APIs Used:**
1. `useLazyVerifyQuizCodeQuery()` - Fetches full quiz details (duration, questions, etc.)
2. `useJoinQuizMutation()` - Joins the user to the quiz

**UI Elements:**
- Glassmorphism background with blur effects
- Green/emerald gradient color scheme matching bootcamp branding
- Animated transitions using Framer Motion
- Icon-based information cards
- Important notes section with bullet points
- Action buttons with loading states

### 2. Dashboard Integration (`v2/src/pages/BootcampDashboard.jsx`)

**Auto-Open Logic:**
```javascript
useEffect(() => {
  if (dashboardResponse?.success) {
    const { application, quiz } = dashboardResponse.data;
    const shouldShowQuiz = 
      (application.status === "pending" || application.status === "shortlisted") &&
      !quiz.has_attempted;
    
    if (shouldShowQuiz) {
      setTimeout(() => {
        setIsQuizDrawerOpen(true);
      }, 1000);
    }
  }
}, [dashboardResponse]);
```

**Conditions for Auto-Open:**
- Application status is "pending" OR "shortlisted"
- Quiz has NOT been attempted (`quiz.has_attempted === false`)
- Delays 1 second before opening (better UX)

### 3. User Flow

#### Automatic Flow:
1. User logs in and navigates to `/dashboard/bootcamp`
2. Dashboard loads application data from API
3. If status is pending/shortlisted AND quiz not attempted:
   - Wait 1 second
   - Auto-open quiz drawer
4. User sees quiz information
5. User clicks "View Quiz Details"
6. API fetches full quiz information
7. User sees quiz details (duration, questions, etc.)
8. User clicks "Start Quiz"
9. API joins user to quiz
10. User redirected to `/dashboard/quizzes/details?code={quizCode}`

#### Manual Flow:
1. User can also click "Start Quiz" button on Quiz Status card
2. Opens same drawer manually
3. Same flow continues from step 5

### 4. Quiz Status Card Update

Added manual trigger button when quiz not attempted:

```jsx
{!applicationData.quiz.has_attempted && applicationData.application.status === "shortlisted" && (
  <Button
    onClick={() => setIsQuizDrawerOpen(true)}
    size="sm"
    className="mt-3 w-full bg-purple-500 hover:bg-purple-600 text-white"
  >
    Start Quiz
  </Button>
)}
```

## API Integration

### Backend APIs (Already Existing):
1. **Verify Quiz** - `GET /verify-quizzes/{quiz_code}`
   - Returns quiz details (title, duration, questions, etc.)
   - Used in step 1 of drawer

2. **Join Quiz** - `POST /join-quizzes`
   - Body: `{ student_id, quiz_id }`
   - Enrolls user in quiz
   - Used in step 2 of drawer

3. **Dashboard Data** - `GET /bootcamp/dashboard`
   - Returns application status and quiz info
   - Includes `quiz.quiz_code`, `quiz.has_attempted`, etc.

### Redux Hooks Used:
```javascript
import { 
  useLazyVerifyQuizCodeQuery, 
  useJoinQuizMutation 
} from "@/redux/api/studentApi";
```

## Design Specifications

### Color Scheme:
- Primary: `#4ADE80` (Green)
- Secondary: `emerald-500`
- Accents: Blue, purple for different states

### Animations:
- Drawer slides up from bottom (mobile) with spring animation
- Fade in backdrop
- Smooth transitions between steps
- Loading spinners for async operations

### Responsive Breakpoints:
- Mobile: Full-width drawer from bottom
- Desktop (sm+): Max-width 2xl, centered modal with rounded corners

### Icons:
- Trophy - Quiz/Assessment
- Clock - Duration/Loading
- FileText - Questions
- Sparkles - Success/Ready
- AlertCircle - Warnings/Info
- CheckCircle2 - Completed states
- Target - Focus/Goal
- ArrowRight - Navigation/Next

## States & Conditions

### Drawer Visibility States:
| Application Status | Quiz Attempted | Drawer Behavior |
|-------------------|----------------|-----------------|
| pending | No | ✅ Auto-opens |
| shortlisted | No | ✅ Auto-opens |
| selected | No | ❌ Doesn't open |
| rejected | No | ❌ Doesn't open |
| pending | Yes | ❌ Doesn't open |
| shortlisted | Yes | ❌ Doesn't open |

### Drawer Internal Steps:
1. **info** - Initial view with quiz information
2. **details** - After fetching quiz data, shows full details
3. **joining** - Loading state while joining quiz

## User Experience Enhancements

### Automatic Opening:
- Only opens once per page load
- 1-second delay prevents jarring UX
- User can close and won't re-open automatically

### Clear Call-to-Action:
- Bold green buttons
- Progressive disclosure (info → details → start)
- Important notes highlighted

### Error Prevention:
- Checks if quiz details loaded before allowing start
- Validates user has account and student profile
- Shows appropriate error messages

### Loading Feedback:
- Disabled buttons during API calls
- Loading spinners with descriptive text
- Smooth transitions between states

## Security & Validation

- User must be authenticated (uses Redux user state)
- Uses `user.accountable_id` for student ID (correct field)
- API validates quiz code exists
- API validates user can join quiz
- Prevents duplicate quiz joins (handled by backend)

## Testing Checklist

- [x] Drawer auto-opens for pending status with no quiz attempt
- [x] Drawer auto-opens for shortlisted status with no quiz attempt
- [x] Drawer doesn't open for selected/rejected status
- [x] Drawer doesn't open if quiz already attempted
- [x] "View Quiz Details" button fetches quiz info
- [x] Quiz details display correctly (duration, questions)
- [x] "Start Quiz" button joins quiz successfully
- [x] User redirects to quiz details page
- [x] Close button works correctly
- [x] Back button works in details step
- [x] Loading states show appropriately
- [x] Error toasts appear on failures
- [x] Mobile responsive design works
- [x] Dark mode styling correct

## Files Created/Modified

### Created:
- `v2/src/components/bootcamp/BootcampQuizDrawer.jsx` - Main drawer component

### Modified:
- `v2/src/pages/BootcampDashboard.jsx` - Added drawer integration and auto-open logic

## Usage

### For Developers:
```jsx
import BootcampQuizDrawer from "@/components/bootcamp/BootcampQuizDrawer";

<BootcampQuizDrawer
  isOpen={isQuizDrawerOpen}
  onClose={() => setIsQuizDrawerOpen(false)}
  quizCode="QZ3F10F8AD"
  quizTitle="Bootcamp Assessment Quiz"
/>
```

### For Students:
1. Apply for bootcamp
2. Navigate to `/dashboard/bootcamp`
3. Drawer automatically appears if quiz pending
4. Follow prompts to view details and start quiz
5. Complete quiz to progress application

## Future Enhancements

1. Add quiz preview (sample questions)
2. Show previous attempt scores
3. Add quiz scheduling/booking
4. Email reminder for pending quiz
5. Quiz preparation resources/tips
6. Practice mode before actual quiz
7. Timer countdown to quiz deadline
8. Quiz retake policy information

## Notes

- Drawer uses same APIs as regular quiz join flow
- Quiz code is hardcoded in backend: `QZ3F10F8AD`
- Student ID comes from `user.accountable_id` (not `user.id`)
- Drawer is reusable for other quiz-based flows
- Auto-open only happens once per session (controlled by state)
- Manual trigger always available from Quiz Status card
