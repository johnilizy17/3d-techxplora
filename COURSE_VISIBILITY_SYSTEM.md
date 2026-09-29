# Course Visibility System Implementation

## Overview
Comprehensive visibility system for course creation and editing with multiple access levels and student management interface.

## Features Implemented

### 1. Database Migration
**File**: `TechXploraAPI/database/migrations/2026_09_04_000000_add_visibility_to_courses_table.php`

Added three new columns to `courses` table:
- `visibility`: ENUM field with options:
  - `public`: Anyone can access
  - `private`: Only invited students
  - `school`: Students from teacher's school
  - `quiz_code`: Access via quiz completion code
  - `group_code`: Access via group join code
- `allowed_students`: JSON array of email addresses (for private courses)
- `access_code`: String for quiz_code and group_code visibility types

### 2. Model Updates
**File**: `TechXploraAPI/app/Models/Course.php`

- Added `visibility`, `allowed_students`, and `access_code` to fillable
- Added proper casts for array handling

### 3. Frontend Component
**File**: `v2/src/components/course/VisibilitySettings.jsx`

Comprehensive visibility settings component with:

#### Features:
- **Visual Card Selection**: 5 visibility options with icons and descriptions
- **Private Course Management**:
  - Add students by email
  - Email validation
  - Duplicate prevention
  - Bulk upload from .txt or .csv files
  - Remove students individually
  - Visual student list with scrollable interface
  
- **Access Code Generation**:
  - Auto-generate secure codes for quiz_code and group_code visibility
  - Show/hide code toggle
  - Copy to clipboard functionality
  - Regenerate option
  - Warning message for sharing

- **Contextual Help**:
  - Info cards for each visibility type
  - Clear descriptions of what each option does

### 4. Integration Points

#### In CreateCourse.jsx:
```jsx
import VisibilitySettings from '@/components/course/VisibilitySettings';

// Add to formData state:
const [formData, setFormData] = useState({
  // ... existing fields
  visibility: 'public',
  allowed_students: [],
  access_code: ''
});

// Add in Step 4 (Assessment/Final Settings):
<VisibilitySettings
  visibility={formData.visibility}
  setVisibility={(val) => setFormData(prev => ({...prev, visibility: val}))}
  allowedStudents={formData.allowed_students}
  setAllowedStudents={(students) => setFormData(prev => ({...prev, allowed_students: students}))}
  accessCode={formData.access_code}
  setAccessCode={(code) => setFormData(prev => ({...prev, access_code: code}))}
/>
```

## Usage Guide

### For Teachers Creating Courses:

1. **Public Course**:
   - Select "Public" visibility
   - Course appears in browse/discovery
   - Anyone can enroll

2. **Private Course**:
   - Select "Private" visibility
   - Add student emails one by one or bulk upload
   - Only listed students can access
   - Perfect for exclusive cohorts

3. **School Course**:
   - Select "School" visibility
   - Automatically available to students with matching admin_code
   - Great for institution-wide courses

4. **Quiz Code Access**:
   - Select "Quiz Code" visibility
   - Generate an access code
   - Students enter code after completing prerequisite quiz
   - Use for gated content

5. **Group Code Access**:
   - Select "Group Code" visibility
   - Generate a group code
   - Share code with specific groups
   - Students join with code

### For Students Accessing Courses:

- **Public**: Browse and enroll freely
- **Private**: Receive invitation email or see in "My Courses" if added
- **School**: Automatically see courses from their school
- **Quiz/Group Code**: Enter code when prompted to unlock access

## API Updates Needed

### CourseController.php

#### Store Method Update:
```php
public function store(Request $request) {
    $validated = $request->validate([
        // ... existing validation
        'visibility' => 'required|in:public,private,school,quiz_code,group_code',
        'allowed_students' => 'nullable|array',
        'allowed_students.*' => 'email',
        'access_code' => 'nullable|string|max:20',
    ]);

    // Validation logic
    if ($validated['visibility'] === 'private' && empty($validated['allowed_students'])) {
        return response()->json(['error' => 'Private courses require at least one student'], 422);
    }

    if (in_array($validated['visibility'], ['quiz_code', 'group_code']) && empty($validated['access_code'])) {
        return response()->json(['error' => 'Access code required'], 422);
    }

    $course = Course::create($validated);
    return response()->json($course, 201);
}
```

#### Index Method Update (Filter by Visibility):
```php
public function index(Request $request) {
    $user = auth()->user();
    
    $query = Course::query();
    
    // Public courses
    $query->orWhere('visibility', 'public');
    
    // School courses for user's school
    if ($user->admin_code) {
        $query->orWhere(function($q) use ($user) {
            $q->where('visibility', 'school')
              ->where('admin_code', $user->admin_code);
        });
    }
    
    // Private courses where user is allowed
    $query->orWhere(function($q) use ($user) {
        $q->where('visibility', 'private')
          ->whereJsonContains('allowed_students', $user->email);
    });
    
    return $query->get();
}
```

#### Access Validation Method:
```php
public function validateAccess(Request $request, $courseId) {
    $user = auth()->user();
    $course = Course::findOrFail($courseId);
    
    // Public access
    if ($course->visibility === 'public') {
        return response()->json(['access' => true]);
    }
    
    // School access
    if ($course->visibility === 'school' && $user->admin_code === $course->admin_code) {
        return response()->json(['access' => true]);
    }
    
    // Private access
    if ($course->visibility === 'private' && in_array($user->email, $course->allowed_students ?? [])) {
        return response()->json(['access' => true]);
    }
    
    // Code-based access (if user has entered code)
    if (in_array($course->visibility, ['quiz_code', 'group_code'])) {
        // Check if user has valid access (stored in enrollment table or session)
        $hasAccess = $course->students()->where('student_id', $user->id)->exists();
        if ($hasAccess) {
            return response()->json(['access' => true]);
        }
    }
    
    return response()->json(['access' => false, 'visibility' => $course->visibility], 403);
}
```

#### Enroll with Code:
```php
public function enrollWithCode(Request $request) {
    $validated = $request->validate([
        'course_id' => 'required|exists:courses,id',
        'access_code' => 'required|string'
    ]);
    
    $course = Course::findOrFail($validated['course_id']);
    $user = auth()->user();
    
    if ($course->access_code !== $validated['access_code']) {
        return response()->json(['error' => 'Invalid access code'], 403);
    }
    
    // Enroll student
    $course->students()->attach($user->id, [
        'enrolled_at' => now(),
        'status' => 'active'
    ]);
    
    return response()->json(['message' => 'Successfully enrolled', 'course' => $course]);
}
```

## Testing Checklist

- [ ] Migration runs successfully
- [ ] Public courses visible to all
- [ ] Private courses show only to allowed students
- [ ] School courses show only to same admin_code
- [ ] Access codes validate correctly
- [ ] Bulk email upload works
- [ ] Email validation prevents invalid entries
- [ ] Students can be added/removed in real-time
- [ ] Access code can be copied
- [ ] Access code regeneration works
- [ ] Form data persists in localStorage draft
- [ ] Course creation payload includes visibility fields

## Future Enhancements

1. **Email Invitations**: Send automatic invitation emails when students are added
2. **Access Analytics**: Track who accessed via codes
3. **Expiring Codes**: Time-limited access codes
4. **Bulk Operations**: Add students from existing groups
5. **Access Logs**: Audit trail of access attempts
6. **Waitlist**: Queue system for private courses
7. **Student Search**: Search/filter from existing students instead of manual email entry

## Security Considerations

- Email addresses are validated before storage
- Access codes are visible only to course creator
- Private student lists are not exposed in public APIs
- Access validation happens server-side, not client-side only
- Codes should be sufficiently complex (8+ chars, alphanumeric)
