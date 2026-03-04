# Case Study Feedback Fix - Per Answer Feedback

## Problem
Case study feedback was not functioning properly for all question types in the CoursePreview page. Specifically:
- Multiple choice questions never showed feedback
- Short answer questions never showed feedback
- Only single choice questions showed feedback immediately

## Root Cause
The `handleCaseStudyAnswer` function only triggered feedback display for single choice questions. Multiple choice and short answer questions had no mechanism to show feedback before moving to the next segment.

## Solution Implemented

### 1. Enhanced Answer Handling
**File**: `v2/src/pages/CoursePreview.jsx`

**Changes**:
- Reorganized `handleCaseStudyAnswer` to clearly separate logic for each question type
- Single choice: Shows feedback immediately (existing behavior preserved)
- Multiple choice: Stores answers without showing feedback (waits for "Check Answer")
- Short answer: Stores answer without showing feedback (waits for "Check Answer")

```javascript
const handleCaseStudyAnswer = (answer) => {
    const currentCaseStudy = caseStudies[currentCaseStudyIndex];
    const currentSegment = currentCaseStudy.segments[currentSegmentIndex];

    if (currentSegment.questionType === QUESTION_TYPES.MULTIPLE_CHOICE) {
        // Store multiple selections
        const currentAnswers = userAnswers[currentSegment.id] || [];
        if (currentAnswers.includes(answer)) {
            setUserAnswers(prev => ({
                ...prev,
                [currentSegment.id]: currentAnswers.filter(a => a !== answer)
            }));
        } else {
            setUserAnswers(prev => ({
                ...prev,
                [currentSegment.id]: [...currentAnswers, answer]
            }));
        }
    } else if (currentSegment.questionType === QUESTION_TYPES.SINGLE_CHOICE) {
        setUserAnswers(prev => ({
            ...prev,
            [currentSegment.id]: answer
        }));
        
        // Show feedback immediately for single choice
        const selectedOption = currentSegment.options.find(o => o.text === answer);
        if (selectedOption) {
            setIsAnswerCorrect(selectedOption.isCorrect);
            setCurrentFeedback(selectedOption.feedback || ...);
            setShowFeedback(true);
        }
    } else {
        // SHORT_ANSWER type - just store the answer
        setUserAnswers(prev => ({
            ...prev,
            [currentSegment.id]: answer
        }));
    }
};
```

### 2. New Check Answer Function
Added `handleCheckAnswer()` function to evaluate answers and show feedback:

```javascript
const handleCheckAnswer = () => {
    const currentCaseStudy = caseStudies[currentCaseStudyIndex];
    const currentSegment = currentCaseStudy.segments[currentSegmentIndex];
    
    if (currentSegment.questionType === QUESTION_TYPES.MULTIPLE_CHOICE) {
        const correctOptions = currentSegment.options.filter(o => o.isCorrect).map(o => o.text);
        const userSelectedOptions = userAnswers[currentSegment.id] || [];
        const isCorrect = correctOptions.length === userSelectedOptions.length &&
            correctOptions.every(o => userSelectedOptions.includes(o));
        
        setIsAnswerCorrect(isCorrect);
        setCurrentFeedback(isCorrect ? currentSegment.correctFeedback : currentSegment.incorrectFeedback || '');
        setShowFeedback(true);
    } else if (currentSegment.questionType === QUESTION_TYPES.SHORT_ANSWER) {
        const answer = userAnswers[currentSegment.id];
        const isCorrect = answer?.toLowerCase().trim() === currentSegment.correctAnswer?.toLowerCase().trim();
        
        setIsAnswerCorrect(isCorrect);
        setCurrentFeedback(isCorrect ? currentSegment.correctFeedback : currentSegment.incorrectFeedback || '');
        setShowFeedback(true);
    }
};
```

### 3. Enhanced Next Segment Logic
Updated `handleNextSegment()` to check if feedback should be shown first:

```javascript
const handleNextSegment = async () => {
    const currentCaseStudy = caseStudies[currentCaseStudyIndex];
    const currentSegment = currentCaseStudy.segments[currentSegmentIndex];
    
    // If feedback hasn't been shown yet, show it first
    if (!showFeedback && (currentSegment.questionType === QUESTION_TYPES.MULTIPLE_CHOICE || 
                          currentSegment.questionType === QUESTION_TYPES.SHORT_ANSWER)) {
        handleCheckAnswer();
        return; // Stop here, let user see feedback
    }
    
    // Reset feedback when moving to next segment
    setShowFeedback(false);
    setCurrentFeedback('');
    
    // Continue to next segment or finish...
};
```

### 4. Dynamic Button Text
Updated button to show appropriate text based on state:

```javascript
{isSubmitting ? (
    <>
        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
        Submitting...
    </>
) : showFeedback ? (
    // After feedback is shown
    currentSegmentIndex < segments.length - 1 ? 'Next Segment' : 'Finish Case Study'
) : (
    // Before feedback is shown
    questionType === SINGLE_CHOICE 
        ? (currentSegmentIndex < segments.length - 1 ? 'Next Segment' : 'Finish Case Study')
        : 'Check Answer'
)}
```

## How It Works Now

### Single Choice Questions
1. User selects an option
2. Feedback shows immediately (green for correct, red for incorrect)
3. User clicks "Next Segment" to continue

### Multiple Choice Questions
1. User selects multiple options (can toggle on/off)
2. User clicks "Check Answer" button
3. Feedback shows (evaluates if ALL correct options selected and NO incorrect ones)
4. Button changes to "Next Segment"
5. User clicks to continue

### Short Answer Questions
1. User types their answer
2. User clicks "Check Answer" button
3. Feedback shows (case-insensitive comparison with correct answer)
4. Button changes to "Next Segment"
5. User clicks to continue

## Feedback Display

### Visual Feedback
- **Correct Answer**: Green background, green border, checkmark icon
- **Incorrect Answer**: Red background, red border, alert icon
- **Feedback Text**: Shows custom feedback from segment data or default messages

### Feedback Content Priority
1. Option-specific feedback (for single choice)
2. Segment `correctFeedback` or `incorrectFeedback`
3. Default empty string

## User Experience Improvements

### Before Fix
- ❌ Multiple choice: No feedback shown
- ❌ Short answer: No feedback shown
- ✅ Single choice: Feedback shown immediately
- ❌ Confusing flow - users didn't know if answers were correct

### After Fix
- ✅ Multiple choice: Feedback shown after "Check Answer"
- ✅ Short answer: Feedback shown after "Check Answer"
- ✅ Single choice: Feedback shown immediately (preserved)
- ✅ Clear two-step process: Answer → Check → Next
- ✅ Visual confirmation for all question types

## Testing Checklist

- [x] Single choice questions show feedback immediately
- [x] Multiple choice questions show "Check Answer" button
- [x] Multiple choice feedback evaluates correctly
- [x] Short answer questions show "Check Answer" button
- [x] Short answer feedback evaluates correctly (case-insensitive)
- [x] Button text changes appropriately
- [x] Feedback resets when moving to next segment
- [x] Green/red styling shows correctly
- [x] Feedback text displays properly
- [x] Final score calculation includes all question types

## Files Modified

1. `v2/src/pages/CoursePreview.jsx` - Enhanced case study feedback logic

## Related Features

- Case study submission API
- Score calculation
- Progress tracking
- Feedback display UI

## Benefits

✅ Complete feedback for all question types
✅ Clear user flow with explicit "Check Answer" step
✅ Better learning experience with immediate feedback
✅ Consistent behavior across question types
✅ Proper validation before moving forward
✅ Visual confirmation of correctness
