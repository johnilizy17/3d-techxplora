# Course Access Denied Page

## Overview
Created a dedicated error page to inform users when they attempt to access a course they didn't create.

## Route
```
/dashboard/course/failed
```

## Features

### 1. Visual Design
- **Animated Shield Icon**: Large shield with X icon indicating access denial
- **Lock Badge**: Small lock icon emphasizing restricted access
- **Gradient Background**: Rose to orange gradient for error state
- **Smooth Animations**: Framer Motion animations for professional feel

### 2. Clear Messaging
- **Main Heading**: "Access Denied" in large, bold text
- **Explanation**: Clear message about not being the course creator
- **Course Title**: Shows which course was attempted (passed via state)
- **Helpful Suggestions**: Lists what the user can do instead

### 3. Action Buttons
Three clear action options:
1. **Go Back**: Returns to previous page
2. **Go to Dashboard**: Navigate to main dashboard
3. **My Courses**: View user's own courses

### 4. Additional Help
- Link to help center
- Contact support option
- Clear, friendly tone

## Usage

### Redirect to Access Denied Page

```javascript
// When checking course ownership
if (course.creator_id !== user.id) {
    navigate('/dashboard/course/failed', {
        state: {
            courseTitle: course.title
        }
    });
}
```

### Example Implementation

```javascript
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/authSlice';

function CourseEditPage() {
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const { data: course } = useGetCourseQuery(courseId);

    useEffect(() => {
        if (course && course.creator_id !== user.id) {
            navigate('/dashboard/course/failed', {
                state: {
                    courseTitle: course.title
                }
            });
        }
    }, [course, user, navigate]);

    // Rest of component...
}
```

## Design Elements

### Color Scheme
- **Primary**: Rose (500-600) for error state
- **Secondary**: Orange (500-600) for warmth
- **Background**: Light rose/orange gradient (light mode)
- **Dark Mode**: Subtle rose/orange tints on dark background

### Typography
- **Heading**: 4xl-6xl, black weight, uppercase, italic
- **Body**: Medium weight, gray-600 (light) / white-60 (dark)
- **Labels**: Extra small, bold, uppercase, wide tracking

### Spacing
- **Container**: Max-width 4xl, centered
- **Padding**: 6-10 horizontal, 20 vertical
- **Gaps**: Consistent 4-12 spacing scale

## Components Used

### Icons (Lucide React)
- `ShieldX`: Main error indicator
- `Lock`: Access restriction badge
- `AlertTriangle`: Warning in info card
- `ArrowLeft`: Go back button
- `Home`: Dashboard button
- `BookOpen`: My courses button

### Layout
- `DashboardLayout`: Consistent dashboard wrapper
- Responsive grid for buttons
- Mobile-first design approach

## Responsive Behavior

### Mobile (< 640px)
- Single column layout
- Full-width buttons
- Smaller icon sizes
- Reduced padding

### Tablet (640px - 1024px)
- Two-column button layout
- Medium icon sizes
- Balanced spacing

### Desktop (> 1024px)
- Three-column button layout
- Large icon sizes
- Generous spacing

## Accessibility

### Features
- Semantic HTML structure
- Clear heading hierarchy
- Descriptive button labels
- Keyboard navigation support
- Screen reader friendly
- High contrast colors

### ARIA Labels
```javascript
<button aria-label="Go back to previous page">
    <ArrowLeft size={18} />
    Go Back
</button>
```

## Animation Details

### Entry Animations
1. **Icon**: Scale from 0.8 to 1, fade in (delay: 0.2s)
2. **Glow Ring**: Continuous pulse animation
3. **Lock Badge**: Spring animation (delay: 0.4s)
4. **Heading**: Fade up (delay: 0.3s)
5. **Info Card**: Fade up (delay: 0.4s)
6. **Buttons**: Fade up (delay: 0.5s)
7. **Help Text**: Fade in (delay: 0.6s)

### Interaction Animations
- Button hover: Scale and color change
- Button active: Scale down (0.95)
- Smooth transitions (200-300ms)

## State Management

### Location State
```javascript
const location = useLocation();
const courseTitle = location.state?.courseTitle || 'this course';
```

### Navigation
```javascript
const navigate = useNavigate();

// Go back
navigate(-1);

// Go to dashboard
navigate('/dashboard');

// Go to courses
navigate('/dashboard/courses');
```

## Testing Scenarios

### 1. Direct Access
```
URL: /dashboard/course/failed
Expected: Shows generic message
```

### 2. With Course Title
```
Navigate with state: { courseTitle: "Introduction to React" }
Expected: Shows "Introduction to React" in message
```

### 3. Button Actions
- Click "Go Back" → Returns to previous page
- Click "Go to Dashboard" → Navigates to /dashboard
- Click "My Courses" → Navigates to /dashboard/courses

### 4. Responsive Design
- Test on mobile (375px)
- Test on tablet (768px)
- Test on desktop (1440px)

## Integration Points

### Where to Use

1. **Course Edit Page**
   - Check if user is course creator
   - Redirect if not authorized

2. **Course Management**
   - Verify ownership before allowing edits
   - Redirect unauthorized users

3. **Course Deletion**
   - Confirm user created the course
   - Prevent unauthorized deletions

4. **Course Settings**
   - Validate creator permissions
   - Protect sensitive operations

## Example Backend Check

```php
// Laravel Controller
public function edit($courseId) {
    $course = Course::findOrFail($courseId);
    $user = auth()->user();
    
    if ($course->creator_id !== $user->id) {
        return response()->json([
            'error' => 'Unauthorized',
            'message' => 'You are not the creator of this course'
        ], 403);
    }
    
    return response()->json($course);
}
```

## Frontend Guard Example

```javascript
// Protected Course Route Component
function ProtectedCourseRoute({ children }) {
    const { courseId } = useParams();
    const user = useSelector(selectCurrentUser);
    const { data: course, isLoading } = useGetCourseQuery(courseId);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && course) {
            if (course.creator_id !== user.id) {
                navigate('/dashboard/course/failed', {
                    state: { courseTitle: course.title },
                    replace: true
                });
            }
        }
    }, [course, isLoading, user, navigate]);

    if (isLoading) return <LoadingSpinner />;
    if (!course) return <NotFound />;
    if (course.creator_id !== user.id) return null;

    return children;
}
```

## Files Created

1. `v2/src/pages/CourseAccessDenied.jsx` - Main component
2. `v2/COURSE_ACCESS_DENIED_PAGE.md` - This documentation

## Files Modified

1. `v2/src/pages/index.jsx` - Added route and import

## Related Pages

- `/dashboard/courses` - Course management
- `/dashboard/courses/edit/:courseId` - Course editing
- `/dashboard/courses/view/:courseId` - Course viewing
- `/dashboard` - Main dashboard

## Future Enhancements

1. **Collaboration Requests**
   - Add button to request collaboration access
   - Send notification to course creator

2. **Course Sharing**
   - Show if course is shared with user
   - Display shared permissions

3. **Admin Override**
   - Allow admins to access any course
   - Show admin badge when overriding

4. **Audit Log**
   - Log unauthorized access attempts
   - Track security events

5. **Custom Messages**
   - Support different error types
   - Customizable messaging per scenario

## Conclusion

The Course Access Denied page provides a professional, user-friendly way to handle unauthorized course access attempts. It clearly communicates the issue while offering helpful alternatives and maintaining a positive user experience.
