# API Errors Fix

## Issues Fixed

### 1. ReferenceError: id is not defined (studentApi.js:92)

**Problem**: The `getStudentProfile` query function was not accepting the `id` parameter.

**Location**: `v2/src/redux/api/studentApi.js` line 92

**Before**:
```javascript
getStudentProfile: builder.query({
    query: () => `/students/${id}`,  // ❌ id is not defined
    providesTags: ['Student'],
}),
```

**After**:
```javascript
getStudentProfile: builder.query({
    query: (id) => `/students/${id}`,  // ✅ id is now a parameter
    providesTags: ['Student'],
}),
```

### 2. 404 Error: /api/v1/students/enrolled-courses Not Found

**Problem**: The endpoint `/students/enrolled-courses` didn't exist in the backend API.

**Solution**: Created the endpoint and controller method.

#### Backend Changes

**File**: `TechXploraAPI/app/Http/Controllers/StudentController.php`

Added new method:
```php
/**
 * Get enrolled courses for the authenticated student
 */
public function getEnrolledCourses(Request $request)
{
    try {
        $user = Auth::user();
        
        if (!$user) {
            return $this->error(null, 'Unauthorized', 401);
        }

        // Get the student record from the authenticated user
        $student = $user->accountable;
        
        if (!$student) {
            return $this->error(null, 'Student record not found', 404);
        }

        // Get pagination parameters
        $perPage = $request->input('per_page', 15);
        $page = $request->input('page', 1);

        // Get enrolled courses with pagination
        $courses = $student->courses()
            ->withPivot(['enrolled_at', 'status', 'progress', 'completed_at'])
            ->orderBy('course_student.enrolled_at', 'desc')
            ->paginate($perPage, ['*'], 'page', $page);

        return $this->success($courses, 'Enrolled courses retrieved successfully', 200);

    } catch (\Exception $e) {
        return $this->error(null, 'Failed to retrieve enrolled courses: ' . $e->getMessage(), 500);
    }
}
```

**File**: `TechXploraAPI/routes/api.php`

Added route:
```php
Route::get('students/enrolled-courses', [StudentController::class, 'getEnrolledCourses']);
```

## API Endpoint Details

### Get Enrolled Courses

**Endpoint**: `GET /api/v1/students/enrolled-courses`

**Authentication**: Required (Sanctum)

**Query Parameters**:
- `per_page` (optional, default: 15): Number of courses per page
- `page` (optional, default: 1): Page number

**Response**:
```json
{
    "status": true,
    "message": "Enrolled courses retrieved successfully",
    "data": {
        "current_page": 1,
        "data": [
            {
                "id": 1,
                "title": "Introduction to Programming",
                "description": "Learn the basics of programming",
                "pivot": {
                    "student_id": 37,
                    "course_id": 1,
                    "enrolled_at": "2024-01-15 10:30:00",
                    "status": "active",
                    "progress": 45,
                    "completed_at": null
                }
            }
        ],
        "per_page": 15,
        "total": 5,
        "last_page": 1
    }
}
```

**Error Responses**:
- `401 Unauthorized`: User is not authenticated
- `404 Not Found`: Student record not found
- `500 Internal Server Error`: Server error occurred

## Frontend Usage

The endpoint is already being used in:
- `v2/src/components/dashboard/StatsCards.jsx`

```javascript
const { data: enrolledCoursesData } = useGetEnrolledCoursesQuery({}, {
    skip: !user?.id || !isStudent
});
```

## Database Schema

The endpoint uses the existing `course_student` pivot table with the following structure:

```sql
course_student
- student_id (foreign key)
- course_id (foreign key)
- enrolled_at (timestamp)
- status (string)
- progress (integer, 0-100)
- completed_at (timestamp, nullable)
- created_at (timestamp)
- updated_at (timestamp)
```

## Testing

1. **Test Authentication**:
   - Try accessing without authentication → Should return 401
   - Try with valid student token → Should return enrolled courses

2. **Test Pagination**:
   - Request with `per_page=5` → Should return max 5 courses
   - Request with `page=2` → Should return second page

3. **Test Empty State**:
   - Student with no enrollments → Should return empty array

4. **Test Pivot Data**:
   - Verify `enrolled_at`, `status`, `progress`, `completed_at` are included

## Related Models

- **Student Model**: `TechXploraAPI/app/Models/Student.php`
  - Has `courses()` relationship defined
  
- **Course Model**: `TechXploraAPI/app/Models/Course.php`
  - Has `students()` relationship defined

Both use the `course_student` pivot table with additional pivot fields.

## Future Enhancements

1. **Filtering**: Add filters for course status (active, completed, paused)
2. **Sorting**: Add sorting options (by progress, enrollment date, etc.)
3. **Search**: Add search functionality for course titles
4. **Statistics**: Include completion statistics in response
5. **Course Details**: Optionally include full course details with lessons
