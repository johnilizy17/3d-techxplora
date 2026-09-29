# Quiz Difficulty-Based XP System

## Overview
Replaced the manual "Points Per Question" input field with a difficulty-based XP dropdown selector in the quiz creation form.

## Changes Made

### Frontend (v2/src/pages/CreateQuiz.jsx)

#### Before
- Manual input field for "Points Per Question"
- Users could enter any numeric value
- No guidance on appropriate XP values

#### After
- Dropdown selector with three predefined difficulty levels:
  - **Beginner** → 50 XP
  - **Intermediate** → 100 XP
  - **Advanced** → 150 XP

### Implementation Details

**Component**: `Step2` in `CreateQuiz.jsx`

**Field Replaced**:
```jsx
// OLD
<InputField
    label="Points Per Question"
    name="p_xp"
    type="number"
    value={formData.p_xp}
    onChange={handleChange}
    error={errors.p_xp}
    placeholder="Per Question"
/>

// NEW
<SelectField
    label="Quiz Difficulty"
    name="p_xp"
    value={formData.p_xp}
    onChange={handleChange}
    error={errors.p_xp}
    options={[
        { value: '50', label: 'Beginner - 50 XP' },
        { value: '100', label: 'Intermediate - 100 XP' },
        { value: '150', label: 'Advanced - 150 XP' }
    ]}
    icon={Target}
/>
```

### Backend API (No Changes Required)

The backend API (`TechXploraAPI/app/Http/Controllers/QuizInfoController.php`) already supports this system:

**Validation**:
```php
"p_xp" => ["nullable", "numeric", "integer"],
```

**Business Logic**:
```php
if ($request->xp < $request['p_xp']) {
    return response()->json(['message' => 'Your xp per question is above your assigned xp'], 400);
}
```

The `p_xp` field accepts numeric values (50, 100, 150) and validates them correctly.

## Benefits

### 1. Consistency
- Standardized XP values across all quizzes
- Easier for students to understand difficulty levels
- Consistent reward structure

### 2. User Experience
- Clearer difficulty indication
- No confusion about appropriate XP values
- Faster quiz creation process

### 3. Gamification
- Clear progression path (Beginner → Intermediate → Advanced)
- Motivates students to attempt harder quizzes
- Better reward balance

## XP Structure

| Difficulty | XP Value | Recommended For |
|-----------|----------|-----------------|
| Beginner | 50 XP | Basic concepts, introductory topics |
| Intermediate | 100 XP | Standard difficulty, core concepts |
| Advanced | 150 XP | Complex topics, challenging questions |

## Validation Rules

1. **Total XP Check**: `p_xp` cannot exceed total quiz `xp`
2. **Integer Validation**: XP values must be whole numbers
3. **Teacher Balance**: Teacher must have sufficient XP to create quiz
4. **Non-negative**: XP values must be ≥ 0

## Usage Example

### Creating a Beginner Quiz
1. Set Total Points: 500 XP
2. Select Difficulty: Beginner (50 XP)
3. Result: Students earn 50 XP per correct answer

### Creating an Advanced Quiz
1. Set Total Points: 1500 XP
2. Select Difficulty: Advanced (150 XP)
3. Result: Students earn 150 XP per correct answer

## Future Enhancements

### Potential Additions
1. **Custom Difficulty**: Allow admins to create custom difficulty levels
2. **Dynamic XP**: Adjust XP based on question complexity
3. **Bonus XP**: Extra points for speed or perfect scores
4. **Difficulty Badges**: Visual indicators for quiz difficulty
5. **Recommended Difficulty**: AI-suggested difficulty based on content

### Analytics
- Track which difficulty levels are most popular
- Monitor completion rates by difficulty
- Analyze XP distribution across difficulty levels

## Testing Checklist

- [x] Dropdown displays all three difficulty options
- [x] Selected difficulty value is saved correctly
- [x] Validation prevents p_xp > total xp
- [x] Form submission works with new dropdown
- [x] Error messages display correctly
- [x] Dark mode styling is consistent
- [x] Backend accepts the difficulty values
- [x] Quiz creation succeeds with all difficulty levels

## Migration Notes

### Existing Quizzes
- Existing quizzes with custom `p_xp` values remain unchanged
- Only new quizzes use the dropdown selector
- Teachers can still edit existing quiz XP values

### Data Compatibility
- No database migration required
- `p_xp` field accepts any integer value
- Dropdown values (50, 100, 150) are stored as integers
- Fully backward compatible

## Related Files

### Frontend
- `v2/src/pages/CreateQuiz.jsx` - Quiz creation form
- `v2/src/utils/quizCreationStorage.js` - Draft storage

### Backend
- `TechXploraAPI/app/Http/Controllers/QuizInfoController.php` - Quiz API
- `TechXploraAPI/database/migrations/2025_07_29_213813_create_quizzes_info.php` - Database schema

## Notes

- The dropdown uses the existing `SelectField` component for consistency
- Icon support added (Target icon)
- Error handling maintained
- Dark mode fully supported
- Mobile responsive design
