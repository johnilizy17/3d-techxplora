# Student Courses API - Quick Reference

## Overview

The Student Courses API provides endpoints for browsing, filtering, and enrolling in courses. It matches your backend implementation with support for search, filters, and pagination.

## 🚀 Quick Start

### Basic Usage

```javascript
import { useGetStudentCoursesQuery } from '@/redux/api/studentApi';

function CoursesList() {
  const { data, isLoading, error } = useGetStudentCoursesQuery();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  
  return (
    <div>
      {data?.data?.map(course => (
        <div key={course.id}>{course.title}</div>
      ))}
    </div>
  );
}
```

## 📋 Available Endpoints

### 1. Get Student Courses (with filters)

**Hook:** `useGetStudentCoursesQuery(params)`

**Endpoint:** `GET /students/courses`

**Parameters:**
```javascript
{
  search: string,           // Search in title, description, category
  difficulty_level: string, // 'beginner', 'intermediate', 'advanced'
  category: string,         // Course category
  status: string,          // 'active', 'draft', 'archived'
  page: number,            // Current page (default: 1)
  per_page: number,        // Items per page (default: 10)
}
```

**Example:**
```javascript
const { data, isLoading, error } = useGetStudentCoursesQuery({
  search: 'javascript',
  difficulty_level: 'beginner',
  category: 'programming',
  status: 'active',
  page: 1,
  per_page: 12,
});
```

**Response Structure:**
```javascript
{
  data: [
    {
      id: 1,
      title: "Course Title",
      description: "Course description",
      category: "programming",
      difficulty_level: "beginner",
      status: "active",
      questions: [...] // Array of questions
    },
    // ... more courses
  ],
  meta: {
    current_page: 1,
    last_page: 5,
    per_page: 10,
    total: 50,
    from: 1,
    to: 10
  }
}
```

### 2. Get Course by ID

**Hook:** `useGetStudentCourseByIdQuery(courseId)`

**Endpoint:** `GET /students/courses/:id`

**Example:**
```javascript
const { data: course } = useGetStudentCourseByIdQuery(123);
```

### 3. Enroll in Course

**Hook:** `useEnrollInCourseMutation()`

**Endpoint:** `POST /students/courses/:id/enroll`

**Example:**
```javascript
const [enroll, { isLoading }] = useEnrollInCourseMutation();

const handleEnroll = async (courseId) => {
  try {
    await enroll(courseId).unwrap();
    alert('Enrolled successfully!');
  } catch (err) {
    console.error('Enrollment failed:', err);
  }
};
```

### 4. Get Enrolled Courses

**Hook:** `useGetEnrolledCoursesQuery(params)`

**Endpoint:** `GET /students/enrolled-courses`

**Example:**
```javascript
const { data: enrolledCourses } = useGetEnrolledCoursesQuery({
  page: 1,
  per_page: 10,
});
```

### 5. Get/Update Course Progress

**Get Progress Hook:** `useGetCourseProgressQuery(courseId)`

**Update Progress Hook:** `useUpdateCourseProgressMutation()`

**Example:**
```javascript
// Get progress
const { data: progress } = useGetCourseProgressQuery(courseId);

// Update progress
const [updateProgress] = useUpdateCourseProgressMutation();

await updateProgress({
  courseId: 123,
  progressData: {
    completed_lessons: 5,
    current_lesson: 6,
    percentage: 50,
  },
});
```

### 6. Complete Course

**Hook:** `useCompleteCourseMutation()`

**Endpoint:** `POST /students/courses/:id/complete`

**Example:**
```javascript
const [completeCourse] = useCompleteCourseMutation();

await completeCourse(courseId);
```

## 🎯 Using with Redux State

### Student Slice Actions

```javascript
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchFilter,
  setDifficultyFilter,
  setCategoryFilter,
  setStatusFilter,
  setCurrentPage,
  clearFilters,
  selectFilters,
  selectPagination,
} from '@/redux/slices/studentSlice';

function CoursesWithFilters() {
  const dispatch = useDispatch();
  const filters = useSelector(selectFilters);
  const pagination = useSelector(selectPagination);

  // Update filters
  const handleSearch = (value) => {
    dispatch(setSearchFilter(value));
  };

  const handleDifficultyChange = (value) => {
    dispatch(setDifficultyFilter(value));
  };

  // Clear all filters
  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  // Change page
  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  // Use filters in query
  const { data } = useGetStudentCoursesQuery({
    search: filters.search,
    difficulty_level: filters.difficulty_level,
    category: filters.category,
    status: filters.status,
    page: pagination.currentPage,
    per_page: pagination.perPage,
  });

  return (
    // Your component JSX
  );
}
```

## 💡 Complete Examples

### Example 1: Courses List with Filters

```javascript
import React from 'react';
import { useGetStudentCoursesQuery } from '@/redux/api/studentApi';

function CoursesPage() {
  const [filters, setFilters] = React.useState({
    search: '',
    difficulty_level: '',
    category: '',
    status: 'active',
  });

  const [page, setPage] = React.useState(1);

  const { data, isLoading, refetch } = useGetStudentCoursesQuery({
    ...filters,
    page,
    per_page: 12,
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page when filters change
  };

  if (isLoading) return <div>Loading courses...</div>;

  const courses = data?.data || [];
  const meta = data?.meta || {};

  return (
    <div>
      {/* Search */}
      <input
        type="text"
        placeholder="Search courses..."
        value={filters.search}
        onChange={(e) => handleFilterChange('search', e.target.value)}
      />

      {/* Difficulty Filter */}
      <select
        value={filters.difficulty_level}
        onChange={(e) => handleFilterChange('difficulty_level', e.target.value)}
      >
        <option value="">All Levels</option>
        <option value="beginner">Beginner</option>
        <option value="intermediate">Intermediate</option>
        <option value="advanced">Advanced</option>
      </select>

      {/* Category Filter */}
      <select
        value={filters.category}
        onChange={(e) => handleFilterChange('category', e.target.value)}
      >
        <option value="">All Categories</option>
        <option value="programming">Programming</option>
        <option value="design">Design</option>
        <option value="business">Business</option>
      </select>

      {/* Courses Grid */}
      <div className="courses-grid">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        <button
          onClick={() => setPage(p => p - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {meta.current_page} of {meta.last_page}</span>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={page >= meta.last_page}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

### Example 2: Course Card with Enrollment

```javascript
import { useEnrollInCourseMutation } from '@/redux/api/studentApi';

function CourseCard({ course }) {
  const [enroll, { isLoading: isEnrolling }] = useEnrollInCourseMutation();

  const handleEnroll = async () => {
    try {
      await enroll(course.id).unwrap();
      alert('Successfully enrolled!');
    } catch (err) {
      alert('Enrollment failed: ' + err.message);
    }
  };

  return (
    <div className="course-card">
      <h3>{course.title}</h3>
      <p>{course.description}</p>
      <div className="badges">
        <span className="badge">{course.category}</span>
        <span className="badge">{course.difficulty_level}</span>
      </div>
      <button onClick={handleEnroll} disabled={isEnrolling}>
        {isEnrolling ? 'Enrolling...' : 'Enroll Now'}
      </button>
    </div>
  );
}
```

### Example 3: Course Detail Page

```javascript
import { useParams } from 'react-router-dom';
import { useGetStudentCourseByIdQuery } from '@/redux/api/studentApi';

function CourseDetailPage() {
  const { courseId } = useParams();
  const { data: course, isLoading } = useGetStudentCourseByIdQuery(courseId);

  if (isLoading) return <div>Loading...</div>;
  if (!course) return <div>Course not found</div>;

  return (
    <div className="course-detail">
      <h1>{course.title}</h1>
      <p>{course.description}</p>
      
      <div className="course-meta">
        <span>Category: {course.category}</span>
        <span>Level: {course.difficulty_level}</span>
        <span>Status: {course.status}</span>
      </div>

      {course.questions && (
        <div className="course-content">
          <h2>Course Content ({course.questions.length} questions)</h2>
          <ul>
            {course.questions.map((q, i) => (
              <li key={q.id}>Lesson {i + 1}: {q.title}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

## 🔄 Auto-Refetching

RTK Query automatically refetches data when:
- Component mounts
- Window regains focus (if enabled)
- Network reconnects (if enabled)
- Cache is invalidated

**Manual refetch:**
```javascript
const { data, refetch } = useGetStudentCoursesQuery(params);

// Trigger manual refetch
refetch();
```

## 🎨 Filter Options Reference

### Difficulty Levels
- `beginner`
- `intermediate`
- `advanced`

### Status Options
- `active` - Published and available
- `draft` - Not yet published
- `archived` - No longer available

### Common Categories
- `programming`
- `design`
- `business`
- `marketing`
- (Add your own categories as needed)

## 📦 Student Slice State Structure

```javascript
{
  studentProfile: null,
  enrolledCourses: [],
  currentCourse: null,
  courseProgress: {},
  filters: {
    search: '',
    difficulty_level: '',
    category: '',
    status: '',
  },
  pagination: {
    currentPage: 1,
    perPage: 10,
    total: 0,
  },
  loading: false,
  error: null,
}
```

## 🐛 Troubleshooting

### Filters not working
- Make sure you're passing the correct parameter names
- Check that the backend endpoint matches `/students/courses`
- Verify the API base URL is set correctly in `baseApi.js`

### Pagination issues
- Ensure you're using `meta.current_page` and `meta.last_page` from the response
- Reset to page 1 when filters change

### Cache not updating
- RTK Query automatically manages cache
- Use `invalidatesTags` in mutations to refresh related queries
- Call `refetch()` for manual updates

## 📚 See Also

- [Main Redux Documentation](../README.md)
- [Complete Examples](../examples/StudentCoursesExample.jsx)
- [RTK Query Documentation](https://redux-toolkit.js.org/rtk-query/overview)
