# Quiz Results Difficulty Update - Complete

## Overview
Completed the QuizResults component update to include difficulty field in the quiz update API call, matching the implementation in CreateQuiz. Also enhanced the backend API to auto-detect difficulty from p_xp value.

## Changes Made

### Frontend: `v2/src/components/teacher/QuizResults.jsx`

#### Updated `handleUpdate` Function
Added difficulty calculation logic before creating the update payload:

```javascript
// Determine difficulty based on p_xp
let difficulty = null;
const pxp = Number(formData.p_xp);
if (pxp === 50) {
    difficulty = 'beginner';
} else if (pxp === 100) {
    difficulty = 'intermediate';
} else if (pxp === 150) {
    difficulty = 'advanced';
}
```

#### Updated Payload
Added `difficulty` field to the `updatePayload` object:

```javascript
const updatePayload = {
    ...tempStorage,
    // ... other fields
    start_at: formData.start_at,
    end_at: formData.end_at,
    xp: formData.xp,
    p_xp: formData.p_xp,
    attempt: formData.attempt,
    difficulty: difficulty  // ← NEW FIELD
};
```

### Backend: `TechXploraAPI/app/Http/Controllers/QuizInfoController.php`

#### Enhanced `update` Method
Added auto-detection logic for difficulty based on p_xp value (matching the `store` method):

```php
// Auto-set difficulty based on p_xp if not provided
$updateData = $request->all();
if (!$request->has('difficulty') && $request->has('p_xp')) {
    $pxp = (int) $request->p_xp;
    if ($pxp === 50) {
        $updateData['difficulty'] = 'beginner';
    } elseif ($pxp === 100) {
        $updateData['difficulty'] = 'intermediate';
    } elseif ($pxp === 150) {
        $updateData['difficulty'] = 'advanced';
    }
}

$info->update($updateData);
```

## How It Works

1. **User selects difficulty** from dropdown (Beginner/Intermediate/Advanced)
2. **Dropdown value** is the XP amount (50/100/150)
3. **Frontend calculates** the corresponding difficulty string:
   - 50 XP → 'beginner'
   - 100 XP → 'intermediate'
   - 150 XP → 'advanced'
4. **Both p_xp and difficulty** are sent to the backend API
5. **Backend validates** and stores both fields
6. **Backend auto-detects** difficulty if not provided (fallback mechanism)

## Backend Support

The backend now has complete support for difficulty in both create and update:
- ✅ Migration adds `difficulty` ENUM column to `quizzes_info` table
- ✅ QuizzesInfo model includes `difficulty` in fillable array
- ✅ QuizInfoController `store` method validates and auto-detects difficulty
- ✅ QuizInfoController `update` method validates and auto-detects difficulty
- ✅ Validation rule: `"difficulty" => ["nullable", "string", "in:beginner,intermediate,advanced"]`

## UI Features

The QuizResults drawer now includes:
- **Dropdown select** for difficulty (not buttons)
- **Dark theme styling** matching the rest of the UI
- **Three options**: Beginner - 50 XP, Intermediate - 100 XP, Advanced - 150 XP
- **Automatic difficulty calculation** when updating

## API Endpoint

**PUT** `/api/v1/quizzes/{id}`

### Request Body (relevant fields):
```json
{
  "p_xp": 100,
  "difficulty": "intermediate"
}
```

### Validation Rules:
- `p_xp`: nullable, numeric, integer
- `difficulty`: nullable, string, must be one of: beginner, intermediate, advanced

### Auto-Detection:
If `difficulty` is not provided but `p_xp` is:
- p_xp = 50 → difficulty = 'beginner'
- p_xp = 100 → difficulty = 'intermediate'
- p_xp = 150 → difficulty = 'advanced'

## Testing

To test the update:
1. Navigate to Quiz Results page
2. Click "Configure Quiz" button
3. Change the "Quiz Difficulty" dropdown
4. Click "Save Parameters"
5. Verify the quiz is updated with both p_xp and difficulty fields
6. Check database to confirm difficulty column is updated

## Status
✅ **COMPLETE** - Frontend and backend fully integrated for quiz difficulty updates with auto-detection fallback
