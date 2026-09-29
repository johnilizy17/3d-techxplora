# Bootcamp Application for Logged-in Users - Complete ✅

## Overview
Created a simplified bootcamp application form specifically for users who are already registered and logged in. This form pre-fills user data from their account and only asks for application-specific information.

## Implementation

### 1. Frontend Component (`v2/src/pages/BootcampApply.jsx`)
**Features:**
- **DashboardLayout** - Uses dashboard wrapper instead of AuthLayout
- **Authentication Check** - Redirects to login if user not authenticated
- **Pre-filled Data** - Uses logged-in user's email, name, phone from Redux state
- **Single Page Form** - No multi-step wizard, all fields on one page
- **Cascading Dropdowns** - Country/State selection with dynamic state loading
- **Form Validation** - Client-side validation before submission
- **Error Handling** - Shows field-level errors with icons
- **Loading State** - Disabled submit button during API call
- **Toast Notifications** - Success/error feedback

**Form Sections:**
1. **Education Background**
   - Institution/School
   - Highest Qualification (dropdown)
   - Graduation Year (number input)

2. **Location**
   - Country (dropdown - African countries)
   - State/Region (cascading dropdown based on country)

3. **Current Status**
   - Current Occupation (text input)

4. **Learning Preferences**
   - Preferred Track (dropdown - Data Analytics, Excel, BI, etc.)
   - Weekly Commitment (dropdown - 1-5 hours up to 20+)
   - Experience Level (radio buttons - beginner/intermediate/advanced)

5. **Motivation**
   - Why Join (textarea - minimum 100 characters)
   - Character counter with color feedback

**Fields NOT Required** (auto-filled from user account):
- Full Name (from student.first_name + last_name)
- Email (from user.email)
- Phone (from student.phone_number)
- Gender (from student.gender)
- Password (user already has account)

### 2. Backend API (`TechXploraAPI/app/Http/Controllers/BootcampApplicationController.php`)

#### New Method: `applyAsUser()`
```php
POST /bootcamp/apply (Protected - requires auth:sanctum)
```

**Validation Rules:**
- `institution` - required, string, max 255
- `qualification` - required, string, max 255
- `graduation_year` - required, integer, 1950-2030
- `country` - required, string, max 255
- `state` - required, string, max 255
- `occupation` - required, string, max 255
- `learning_track` - required, string, max 255
- `weekly_hours` - required, string, max 50
- `experience` - required, enum (beginner/intermediate/advanced)
- `motivation` - required, string, min 100 characters

**Process:**
1. Gets authenticated user from request
2. Loads user's student profile (accountable relationship)
3. Checks if user already has an application (prevents duplicates)
4. Generates unique application ID
5. Creates application with:
   - User data from account (name, email, phone, gender)
   - Form data from request
   - Status: 'pending'
   - Submitted timestamp
6. Returns application ID and status

**Response (Success):**
```json
{
  "success": true,
  "message": "Application submitted successfully!",
  "data": {
    "application_id": "BOOT2026-1234",
    "email": "student@example.com",
    "status": "pending"
  }
}
```

**Response (Already Applied):**
```json
{
  "success": false,
  "message": "You have already submitted an application.",
  "data": {
    "application_id": "BOOT2026-1234",
    "status": "pending"
  }
}
```

### 3. Redux API (`v2/src/redux/api/bootcampApi.js`)
```javascript
submitBootcampApplicationForUser: builder.mutation({
    query: (applicationData) => ({
        url: '/bootcamp/apply',
        method: 'POST',
        body: applicationData,
    }),
    invalidatesTags: ['BootcampApplications', 'BootcampDashboard'],
})
```

**Hook:** `useSubmitBootcampApplicationForUserMutation()`

### 4. Routes

**Backend Route:**
```php
// Protected route (requires authentication)
Route::post('/bootcamp/apply', [BootcampApplicationController::class, 'applyAsUser']);
```

**Frontend Route:**
```jsx
<Route path="/dashboard/bootcamp/apply" element={<BootcampApply />} />
```

## Key Differences from Public Application

| Feature | Public Form (`/bootcamp/apply`) | User Form (`/dashboard/bootcamp/apply`) |
|---------|--------------------------------|----------------------------------------|
| **Layout** | AuthLayout (glassmorphism) | DashboardLayout (sidebar/nav) |
| **Authentication** | Creates new account | Requires login |
| **Steps** | 6-step wizard | Single page |
| **Password** | Required (2 fields) | Not needed |
| **Name Fields** | Full name input | Auto-filled from account |
| **Email** | Input field | Auto-filled from account |
| **Phone** | Input field | Auto-filled from account |
| **Gender** | Dropdown | Auto-filled from account |
| **Auto-login** | Yes (after submission) | Already logged in |
| **Redirect** | `/dashboard/bootcamp` | `/dashboard/bootcamp` |
| **Data Source** | Form inputs only | Form + user account |

## User Flow

### For Logged-in Users:
1. Navigate to `/dashboard/bootcamp/apply` (from dashboard menu/link)
2. Form loads with user data pre-filled internally
3. Fill out education, location, and learning preference fields
4. Write motivation (minimum 100 characters)
5. Click "Submit Application"
6. API validates and creates application
7. Success toast shown
8. Redirected to `/dashboard/bootcamp` to view application status

### Duplicate Prevention:
- Backend checks if `user_id` already has an application
- Returns 409 Conflict if duplicate
- Frontend shows error toast with existing application ID

## Design & Styling
- **Color Scheme**: Green accent (#4ADE80) matching bootcamp branding
- **Visual Elements**: Glassmorphism effects, gradient backgrounds
- **Icons**: Lucide React (GraduationCap, MapPin, Briefcase, etc.)
- **Animations**: Framer Motion (fade in, slide up)
- **Dark Mode**: Full support with proper contrast
- **Mobile Responsive**: Grid layout adapts to screen size

## Validation & UX
- **Real-time Validation**: Errors clear when user types
- **Visual Feedback**: Red borders and error messages for invalid fields
- **Character Counter**: Shows progress for motivation field (100+ chars)
- **Disabled States**: Submit button disabled while loading
- **Loading Spinner**: Shows during API call
- **Toast Notifications**: Sonner library for success/error messages

## Security
- **Protected Route**: Requires `auth:sanctum` middleware
- **User Verification**: Uses authenticated user from request token
- **Student Profile Check**: Ensures user has student profile
- **Duplicate Prevention**: One application per user
- **SQL Injection**: Uses Eloquent ORM with parameter binding
- **XSS Protection**: React auto-escapes user input

## Database Storage
All data saved to `bootcamp_applications` table:
- `user_id` - Links to user's account
- `fullname` - Constructed from student.first_name + last_name
- `email` - From user.email
- `phone` - From student.phone_number
- `gender` - From student.gender
- `institution` - From form
- `qualification` - From form
- `graduation_year` - From form
- `country` - From form
- `state` - From form
- `occupation` - From form
- `preferred_track` - From form (as learning_track)
- `weekly_hours` - From form
- `learning_experience` - From form (as experience)
- `motivation` - From form
- `status` - Default: 'pending'
- `application_id` - Auto-generated unique ID
- `submitted_at` - Current timestamp

## Files Created/Modified

### Created:
- `v2/src/pages/BootcampApply.jsx` - New application form component

### Modified:
- `v2/src/pages/index.jsx` - Added route import and route definition
- `v2/src/redux/api/bootcampApi.js` - Added mutation and hook
- `TechXploraAPI/app/Http/Controllers/BootcampApplicationController.php` - Added `applyAsUser()` method
- `TechXploraAPI/routes/api.php` - Added protected route

## Testing Checklist
- [x] Form loads for authenticated users
- [x] Redirects to login if not authenticated
- [x] Country dropdown populates correctly
- [x] State dropdown updates when country changes
- [x] Form validation works (all required fields)
- [x] Character counter updates for motivation field
- [x] API call succeeds with valid data
- [x] Duplicate application prevented (409 error)
- [x] Success toast and redirect on submission
- [x] Error toast on API failure
- [x] Loading state during submission
- [x] Dark mode works correctly
- [x] Mobile responsive layout
- [x] Data saves correctly to database

## Usage

### For Students:
Access the form from dashboard menu or direct link:
```
/dashboard/bootcamp/apply
```

### For Developers:
```javascript
import { useSubmitBootcampApplicationForUserMutation } from '@/redux/api/bootcampApi';

const [submitApplication, { isLoading }] = useSubmitBootcampApplicationForUserMutation();

const handleSubmit = async (formData) => {
  try {
    const response = await submitApplication(formData).unwrap();
    // Handle success
  } catch (error) {
    // Handle error
  }
};
```

## Next Steps (Future Enhancements)
1. Add file upload for supporting documents (CV, certificates)
2. Email confirmation after submission
3. Admin notification when new application submitted
4. Application edit feature (before review)
5. Status update notifications
6. Application withdrawal option
7. Save as draft functionality
8. PDF export of submitted application

## Notes
- Form is significantly simpler than public form (no password, no multi-step)
- Uses existing user data to minimize input required
- Better UX for logged-in users who want to apply
- Maintains same backend data structure as public applications
- Both forms create records in the same `bootcamp_applications` table
