# Live Quiz API Implementation

## Overview
Added functionality for students to view all live/public quizzes through a dedicated API endpoint.

## Changes Made

### 1. Database Migration
**File**: `TechXploraAPI/database/migrations/2026_06_25_000000_add_public_to_quizzes_info_table.php`

- Added `public` column to `quizzes_info` table
- Type: `tinyInteger` 
- Default: `1` (public/live)
- Values: `1` = public/live, `0` = private/hidden

**Run migration**:
```bash
cd TechXploraAPI
php artisan migrate
```

### 2. Backend API Endpoint
**File**: `TechXploraAPI/app/Http/Controllers/StudentController.php`

Added `getLiveQuizzes()` method:
- Returns quizzes where `public = 1` and `status = 1`
- Calculates active users count (students currently taking the quiz)
- Supports pagination (default 20 per page)
- Ordered by creation date (newest first)

**Endpoint**: `GET /api/students/live-quizzes`

**Query Parameters**:
- `per_page` (optional): Number of results per page (default: 20)
- `page` (optional): Page number (default: 1)

**Response Format**:
```json
{
  "status": true,
  "message": "Live quizzes retrieved successfully",
  "data": {
    "current_page": 1,
    "data": [
      {
        "id": 1,
        "title": "Mathematics Quiz",
        "quiz_code": "QZ123ABC",
        "duration": 60,
        "public": 1,
        "active_users": 12,
        "created_at": "2026-06-25T10:00:00.000000Z",
        ...
      }
    ],
    "total": 50,
    "per_page": 20,
    "last_page": 3
  }
}
```

### 3. API Route
**File**: `TechXploraAPI/routes/api.php`

Added route: `Route::get('students/live-quizzes', [StudentController::class, 'getLiveQuizzes']);`

### 4. Model Update
**File**: `TechXploraAPI/app/Models/QuizzesInfo.php`

- Added `public` to `$fillable` array
- Allows mass assignment of the public field

### 5. Frontend Redux API
**File**: `v2/src/redux/api/studentApi.js`

Added `getLiveQuizzes` endpoint:
- Query hook: `useGetLiveQuizzesQuery`
- Supports pagination parameters
- Provides caching and automatic refetching

**Usage**:
```javascript
import { useGetLiveQuizzesQuery } from '@/redux/api/studentApi';

const { data, isLoading, error } = useGetLiveQuizzesQuery({
  per_page: 20,
  page: 1
});
```

### 6. ViewLiveQuiz Page Update
**File**: `v2/src/pages/ViewLiveQuiz.jsx`

- Replaced mock data with real API integration
- Uses `useGetLiveQuizzesQuery` hook
- Displays active users count from API
- Shows duration in minutes
- Handles loading and error states
- Search functionality filters by title or quiz code

## Features

### Active Users Calculation
The API counts active users as:
- Students who have started the quiz (have a quiz attempt)
- Haven't completed the quiz yet (`completed_at` is NULL)
- Started within the last 3 hours

### Public vs Private Quizzes
- **Public (`public = 1`)**: Visible in live quiz list
- **Private (`public = 0`)**: Hidden from live quiz list

By default, all new quizzes are public unless explicitly set otherwise.

## Testing

1. **Run the migration**:
   ```bash
   cd TechXploraAPI
   php artisan migrate
   ```

2. **Test the API endpoint**:
   ```bash
   curl -X GET "http://your-api-url/api/students/live-quizzes" \
     -H "Authorization: Bearer YOUR_TOKEN"
   ```

3. **View in frontend**:
   - Navigate to `/dashboard/view-live-quiz` as a student
   - Should see all public quizzes with active user counts

## Notes

- Only students can see this page (role-based access)
- Quizzes must have both `public = 1` AND `status = 1` to appear
- Active users count is calculated in real-time based on quiz attempts
- Search works on both quiz title and quiz code
- Purple color theme throughout for visual consistency
