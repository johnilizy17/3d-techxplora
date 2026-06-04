# Course Manual Quiz Feature

## Overview
Added support for manual quiz questions in courses that don't have a `quiz_id`. Courses can now include quiz questions directly in the `manual_quiz` field, allowing students to take quizzes without needing a separate quiz entity.

## Implementation

### 1. New Page: CourseQuiz.jsx
Created a dedicated quiz page at `/courses/:courseId/quiz` that:
- Displays manual quiz questions from the course's `manual_quiz` array
- Shows one question at a time with multiple choice options
- Tracks user answers and calculates scores
- Displays a completion screen with performance feedback
- Includes a timer to track quiz duration
- Supports navigation between questions (Previous/Next)
- Allows quiz retries

### 2. Route Configuration
Added new route in `v2/src/pages/index.jsx`:
```jsx
<Route path="/courses/:courseId/quiz" element={<CourseQuiz />} />
```

### 3. CoursePreview.jsx Updates
Updated the course preview page to support manual quizzes:

#### Take Quiz Button in Details Tab
- Shows "Take Quiz" button if course has `quiz_id` OR `manual_quiz` with questions
- Routes to `/dashboard/quizzes/details` for regular quizzes
- Routes to `/courses/:courseId/quiz` for manual quizzes

#### Video End Handler
- After video completion, checks for manual quiz
- Navigates to manual quiz page if available

#### Action Button Handler
- Sticky bottom button supports manual quiz navigation
- Checks authentication before allowing quiz access

#### Case Study Completion Handler
- After completing case studies, navigates to manual quiz if available

## Data Structure

### Manual Quiz Format
```json
{
  "manual_quiz": [
    {
      "question": "What is the capital of France?",
      "options": [
        {
          "option": "Paris",
          "is_correct": true
        },
        {
          "option": "London",
          "is_correct": false
        },
        {
          "option": "Berlin",
          "is_correct": false
        }
      ]
    }
  ]
}
```

## Features

### Quiz Taking Experience
- **Question Navigation**: Students can move forward and backward through questions
- **Answer Selection**: Single-choice questions with visual feedback
- **Progress Tracking**: Progress bar shows completion percentage
- **Timer**: Displays elapsed time during quiz
- **Score Calculation**: Automatic scoring based on correct answers

### Completion Screen
- **Score Display**: Shows percentage score and correct answer count
- **Performance Feedback**: Different messages based on score (70%+, 50-69%, <50%)
- **Time Tracking**: Shows total time taken to complete quiz
- **Actions**: Options to retry quiz or return to course

### Mobile Responsive
- Fully responsive design for mobile and desktop
- Touch-friendly buttons and navigation
- Optimized layout for small screens

### Authentication
- Requires user authentication to access quiz
- Redirects to course page if not authenticated
- Shows appropriate error messages

## User Flow

1. **Course Preview**: Student views course and sees "Take Quiz" button in Details tab
2. **Authentication Check**: System verifies user is logged in
3. **Quiz Start**: Student clicks button and navigates to quiz page
4. **Question Display**: Questions shown one at a time with options
5. **Answer Selection**: Student selects answers and navigates through questions
6. **Submission**: After last question, quiz is automatically submitted
7. **Results**: Score and performance feedback displayed
8. **Actions**: Student can retry or return to course

## Styling
- Consistent with existing TechXplora design system
- Gradient buttons with hover effects
- Dark theme with colorful accents
- Smooth animations and transitions
- Background blur effects for visual depth

## Error Handling
- Course not found: Shows error message with back button
- No quiz available: Informs user and provides navigation
- Loading states: Shows spinner during data fetch
- Authentication required: Redirects with toast notification

## Future Enhancements
- Save quiz results to database
- Show quiz history and previous attempts
- Add question explanations after submission
- Support multiple question types (multiple choice, true/false, short answer)
- Add time limits per question or entire quiz
- Implement quiz analytics for teachers
