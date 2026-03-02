# Case Study Submission Implementation

## Overview
Added functionality to save case study answers when students complete them. The system tracks user responses, calculates scores, and submits the data to the backend.

## API Endpoint

### POST `/students/courses/{courseId}/case-study`

**Request Body:**
```json
{
  "case_study_id": "case-1772398496767",
  "case_study_title": "Lifting the heavy box",
  "answers": [
    {
      "segment_id": "segment-1772398496767",
      "question": "Because Ibrahim wants to lift the box safely...",
      "user_answer": "use a lever to lift the box",
      "is_correct": true
    }
  ],
  "score": 100,
  "total_segments": 1,
  "correct_answers": 1
}
```

**Response:**
```json
{
  "status": "success",
  "message": "Case study answers submitted successfully",
  "data": {
    "id": 123,
    "user_id": 456,
    "course_id": 5,
    "case_study_id": "case-1772398496767",
    "score": 100,
    "created_at": "2024-01-15T10:30:00Z"
  }
}
```

## Frontend Implementation

### 1. Redux API (studentApi.js)

Added new mutation endpoint:

```javascript
submitCaseStudyAnswers: builder.mutation({
    query: ({ courseId, caseStudyData }) => ({
        url: `/students/courses/${courseId}/case-study`,
        method: 'POST',
        body: caseStudyData,
    }),
    invalidatesTags: (result, error, { courseId }) => [
        { type: 'Course', id: courseId },
        'Student',
    ],
}),
```

### 2. CoursePreview Component

Updated `handleNextSegment` function to:
1. Calculate score for each segment
2. Track correct/incorrect answers
3. Submit data to backend when case study is completed
4. Show success/error toast notifications

```javascript
const handleNextSegment = async () => {
    // ... score calculation logic
    
    if (isAuthenticated) {
        try {
            await submitCaseStudyAnswers({
                courseId: courseId,
                caseStudyData: {
                    case_study_id: currentCaseStudy.id,
                    case_study_title: currentCaseStudy.title,
                    answers: answersArray,
                    score: finalScore,
                    total_segments: currentCaseStudy.segments.length,
                    correct_answers: score
                }
            }).unwrap();
            
            toast({ title: "Case Study Submitted! 🎉" });
        } catch (error) {
            toast({ title: "Submission Warning", variant: "destructive" });
        }
    }
};
```

## Data Structure

### Answer Object
Each answer in the `answers` array contains:
- `segment_id`: Unique identifier for the segment
- `question`: The question text
- `user_answer`: User's selected/typed answer
- `is_correct`: Boolean indicating if answer was correct

### Question Types Supported
1. **Single Choice** (`single_choice`): One correct answer
2. **Multiple Choice** (`multiple_choice`): Multiple correct answers
3. **Short Answer** (`short_answer`): Text-based answer

## Backend Requirements

The backend should create a table to store case study submissions:

### Suggested Table Schema

```sql
CREATE TABLE case_study_submissions (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    course_id BIGINT NOT NULL,
    case_study_id VARCHAR(255) NOT NULL,
    case_study_title VARCHAR(255),
    answers JSON NOT NULL,
    score INT NOT NULL,
    total_segments INT NOT NULL,
    correct_answers INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE,
    INDEX idx_user_course (user_id, course_id),
    INDEX idx_case_study (case_study_id)
);
```

### Laravel Model Example

```php
class CaseStudySubmission extends Model
{
    protected $fillable = [
        'user_id',
        'course_id',
        'case_study_id',
        'case_study_title',
        'answers',
        'score',
        'total_segments',
        'correct_answers'
    ];

    protected $casts = [
        'answers' => 'array',
        'score' => 'integer',
        'total_segments' => 'integer',
        'correct_answers' => 'integer'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
```

### Controller Method

```php
public function submitCaseStudy(Request $request, $courseId)
{
    $validated = $request->validate([
        'case_study_id' => 'required|string',
        'case_study_title' => 'required|string',
        'answers' => 'required|array',
        'answers.*.segment_id' => 'required|string',
        'answers.*.question' => 'required|string',
        'answers.*.user_answer' => 'required',
        'answers.*.is_correct' => 'required|boolean',
        'score' => 'required|integer|min:0|max:100',
        'total_segments' => 'required|integer|min:1',
        'correct_answers' => 'required|integer|min:0'
    ]);

    $submission = CaseStudySubmission::create([
        'user_id' => auth()->id(),
        'course_id' => $courseId,
        'case_study_id' => $validated['case_study_id'],
        'case_study_title' => $validated['case_study_title'],
        'answers' => $validated['answers'],
        'score' => $validated['score'],
        'total_segments' => $validated['total_segments'],
        'correct_answers' => $validated['correct_answers']
    ]);

    return response()->json([
        'status' => 'success',
        'message' => 'Case study answers submitted successfully',
        'data' => $submission
    ]);
}
```

### Route

```php
Route::post('/students/courses/{courseId}/case-study', [StudentCourseController::class, 'submitCaseStudy'])
    ->middleware('auth:sanctum');
```

## Features

✅ Automatic score calculation
✅ Tracks all user answers
✅ Supports all question types
✅ Only submits when user is authenticated
✅ Shows loading state during submission
✅ Success/error notifications
✅ Graceful error handling (saves locally if server fails)
✅ Invalidates cache to refresh data

## Testing

1. Complete a case study with all correct answers → Score should be 100%
2. Complete with some wrong answers → Score should be calculated correctly
3. Test without authentication → Should not submit to server
4. Test with network error → Should show warning but allow completion
5. Verify data is saved in database with correct structure

## Future Enhancements

1. Add retry mechanism for failed submissions
2. Show submission history to users
3. Add analytics dashboard for teachers
4. Export case study results to CSV
5. Add time tracking for each segment
6. Allow users to review their previous submissions
