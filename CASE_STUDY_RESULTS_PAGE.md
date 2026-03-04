# Case Study Results Page

## Overview

Added a dedicated page to view all case study submissions for a course with pagination support. Teachers and students can now see detailed results of all submitted case study answers, including scores, correct/incorrect answers, and submission timestamps.

## Features

### 1. Paginated Results Display
- Shows 10 case study submissions per page
- Pagination controls at the bottom
- Ordered by most recent submissions first

### 2. Detailed Answer Breakdown
For each submission, displays:
- Case study ID and title
- Submission date and time
- Overall score percentage
- Individual segment answers with:
  - Question text
  - Student's answer
  - Correct/incorrect indicator
  - Correct answer (if student was wrong)

### 3. Visual Indicators
- Color-coded score badges:
  - Green (≥70%): Excellent performance
  - Amber (50-69%): Passing performance
  - Red (<50%): Needs improvement
- Check/X icons for quick visual feedback
- Highlighted correct and incorrect answers

### 4. Empty State
- Friendly message when no submissions exist
- Call-to-action button to start learning

## Implementation

### Backend Changes

**File:** `TechXploraAPI/app/Http/Controllers/StudentController.php`

Updated `getCaseStudyScores()` method to support pagination:

```php
public function getCaseStudyScores($courseId)
{
    // ... authentication checks ...
    
    // Paginate results with 10 items per page
    $scores = \App\Models\StudentScore::where('student_id', $student->id)
        ->where('course_id', $courseId)
        ->orderBy('created_at', 'desc')
        ->paginate(10);

    return $this->success($scores, 'Case study scores retrieved successfully', 200);
}
```

**Changes:**
- Changed from `->get()` to `->paginate(10)`
- Returns Laravel pagination object with meta data

### Frontend Changes

**New File:** `v2/src/pages/CaseStudyResults.jsx`

Created a complete results page with:
- Pagination controls
- Detailed answer display
- Score visualization
- Responsive design

**Updated Files:**

1. **`v2/src/pages/index.jsx`**
   - Added route: `/dashboard/courses/:courseId/case-study-results`
   - Imported `CaseStudyResults` component

2. **`v2/src/pages/ViewManagedCourse.jsx`**
   - Added "View Results" button to access case study results
   - Button appears in the action bar alongside Edit and Preview buttons

### API Integration

Uses existing Redux endpoint:
```javascript
useGetCourseProgressQuery(courseId)
```

This endpoint:
- URL: `GET /api/v1/students/courses/{courseId}/case-study-scores`
- Returns paginated case study submissions
- Includes pagination metadata (current_page, last_page, total, etc.)

## User Flow

### For Teachers:
1. Navigate to course management page
2. Click on a course to view details
3. Click "View Results" button
4. See all student case study submissions with pagination
5. Review individual answers and scores

### For Students:
1. Navigate to enrolled courses
2. View course details
3. Access case study results to review their submissions
4. See which answers were correct/incorrect
5. Learn from mistakes by viewing correct answers

## Data Structure

### Case Study Submission Object:
```javascript
{
  id: 123,
  student_id: 456,
  course_id: 20,
  case_study_id: "cs_001",
  case_study_title: "Introduction to Programming",
  score: 85,
  answers: [
    {
      segment_id: "seg_1",
      question_text: "What is a variable?",
      student_answer: "A container for storing data",
      correct_answer: "A container for storing data",
      is_correct: true
    },
    {
      segment_id: "seg_2",
      question_text: "What is a function?",
      student_answer: "A loop",
      correct_answer: "A reusable block of code",
      is_correct: false
    }
  ],
  created_at: "2026-03-04T10:30:00Z"
}
```

### Pagination Metadata:
```javascript
{
  current_page: 1,
  last_page: 3,
  per_page: 10,
  total: 25,
  from: 1,
  to: 10
}
```

## UI Components

### Result Card
Each submission is displayed in a card with:
- **Header**: Case study ID, title, submission date
- **Score Badge**: Large, color-coded score percentage
- **Status Icon**: Check or X based on passing score
- **Answer List**: Expandable list of all segment answers
- **Answer Details**: Question, student answer, correct answer (if wrong)

### Pagination Controls
- Previous/Next buttons
- Page number buttons (1, 2, 3, etc.)
- Current page highlighted
- Disabled state for first/last page

## Styling

Follows the existing design system:
- Dark theme with white/5 backgrounds
- Rounded corners (2.5rem for cards)
- Color-coded feedback (emerald, amber, rose)
- Smooth transitions and hover effects
- Responsive grid layouts

## Benefits

1. **Transparency**: Students can review their performance
2. **Learning Tool**: See correct answers for mistakes
3. **Progress Tracking**: View submission history over time
4. **Performance Analysis**: Teachers can identify common mistakes
5. **Scalability**: Pagination handles large numbers of submissions

## Testing Scenarios

1. **No Submissions**:
   - Navigate to results page for a course with no submissions
   - Should see empty state with "Start Learning" button

2. **Single Page of Results**:
   - Submit 5 case studies
   - Should see all 5 without pagination controls

3. **Multiple Pages**:
   - Submit 25 case studies
   - Should see 10 per page with pagination controls
   - Test navigation between pages

4. **Score Display**:
   - Submit case studies with different scores (30%, 60%, 90%)
   - Verify color coding is correct

5. **Answer Details**:
   - Submit case study with mix of correct/incorrect answers
   - Verify correct answers shown for incorrect responses

## Future Enhancements

Possible improvements:
1. Filter by score range (e.g., show only failed attempts)
2. Search by case study title
3. Export results to PDF or Excel
4. Compare multiple attempts side-by-side
5. Add analytics dashboard with charts
6. Show time spent on each case study
7. Add teacher comments/feedback feature
