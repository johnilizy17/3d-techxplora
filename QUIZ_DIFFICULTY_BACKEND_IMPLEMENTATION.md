# Quiz Difficulty Backend Implementation

## Overview
Added quiz difficulty field to the backend to support the new difficulty-based XP system (Beginner: 50 XP, Intermediate: 100 XP, Advanced: 150 XP).

## Changes Made

### 1. Database Migration
**File**: `TechXploraAPI/database/migrations/2026_05_08_000000_add_difficulty_to_quizzes_info_table.php`

Added a new `difficulty` column to the `quizzes_info` table:
- **Type**: ENUM
- **Values**: 'beginner', 'intermediate', 'advanced'
- **Nullable**: Yes
- **Position**: After `p_xp` column

```php
Schema::table('quizzes_info', function (Blueprint $table) {
    $table->enum('difficulty', ['beginner', 'intermediate', 'advanced'])
          ->nullable()
          ->after('p_xp');
});
```

### 2. Model Update
**File**: `TechXploraAPI/app/Models/QuizzesInfo.php`

Added `difficulty` to the `$fillable` array:
```php
protected $fillable = [
    // ... other fields
    'p_xp',
    'difficulty',  // NEW
    'duration',
    // ... other fields
];
```

### 3. Controller Updates
**File**: `TechXploraAPI/app/Http/Controllers/QuizInfoController.php`

#### Store Method (Create Quiz)
- Added `difficulty` validation rule
- Auto-sets difficulty based on `p_xp` value if not provided
- Validation: `["nullable", "string", "in:beginner,intermediate,advanced"]`

```php
// Auto-set difficulty based on p_xp if not provided
if (!isset($data['difficulty']) && isset($data['p_xp'])) {
    $pxp = (int) $data['p_xp'];
    if ($pxp === 50) {
        $data['difficulty'] = 'beginner';
    } elseif ($pxp === 100) {
        $data['difficulty'] = 'intermediate';
    } elseif ($pxp === 150) {
        $data['difficulty'] = 'advanced';
    }
}
```

#### Update Method
- Added `difficulty` validation rule
- Allows updating quiz difficulty

### 4. Frontend Update
**File**: `v2/src/pages/CreateQuiz.jsx`

Updated `handleConfirmSubmit` to automatically determine and send difficulty:
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

const payload = {
    ...formData,
    // ... other fields
    difficulty: difficulty
};
```

## Difficulty Mapping

| Difficulty    | XP Value | Description                          |
|---------------|----------|--------------------------------------|
| `beginner`    | 50 XP    | Easy quizzes for new learners        |
| `intermediate`| 100 XP   | Moderate difficulty quizzes          |
| `advanced`    | 150 XP   | Challenging quizzes for experts      |

## API Request/Response

### Create Quiz Request
```json
{
  "title": "JavaScript Basics",
  "description": "Test your JavaScript knowledge",
  "xp": 500,
  "p_xp": 50,
  "difficulty": "beginner",
  "mode_id": 1,
  "group_code": "GRP123",
  "duration": 30,
  "admin_code": "ADM001",
  "teacher_id": 1,
  "start_at": "2026-05-10 10:00:00",
  "end_at": "2026-05-10 12:00:00",
  "is_ai": false,
  "status": true
}
```

### Response
```json
{
  "message": "Quiz created successfully",
  "data": {
    "id": 1,
    "quiz_code": "QZ12345678",
    "title": "JavaScript Basics",
    "difficulty": "beginner",
    "p_xp": 50,
    "xp": 500,
    // ... other fields
  }
}
```

## Migration Instructions

### Run Migration
```bash
cd TechXploraAPI
php artisan migrate
```

### Rollback (if needed)
```bash
php artisan migrate:rollback --step=1
```

## Backward Compatibility

- The `difficulty` field is **nullable**, so existing quizzes without difficulty will still work
- The system auto-detects difficulty from `p_xp` value during creation
- Frontend automatically sets difficulty based on selected XP button

## Validation Rules

### Create Quiz
- `difficulty`: nullable, string, must be one of: beginner, intermediate, advanced

### Update Quiz
- `difficulty`: nullable, string, must be one of: beginner, intermediate, advanced

## Testing

### Test Cases

1. **Create quiz with beginner difficulty (50 XP)**
   ```bash
   POST /api/quizzes
   {
     "p_xp": 50,
     // ... other required fields
   }
   # Expected: difficulty = "beginner"
   ```

2. **Create quiz with intermediate difficulty (100 XP)**
   ```bash
   POST /api/quizzes
   {
     "p_xp": 100,
     // ... other required fields
   }
   # Expected: difficulty = "intermediate"
   ```

3. **Create quiz with advanced difficulty (150 XP)**
   ```bash
   POST /api/quizzes
   {
     "p_xp": 150,
     // ... other required fields
   }
   # Expected: difficulty = "advanced"
   ```

4. **Create quiz with explicit difficulty**
   ```bash
   POST /api/quizzes
   {
     "p_xp": 75,
     "difficulty": "intermediate",
     // ... other required fields
   }
   # Expected: difficulty = "intermediate" (explicit value used)
   ```

5. **Update quiz difficulty**
   ```bash
   PUT /api/quizzes/{id}
   {
     "difficulty": "advanced",
     // ... other fields
   }
   # Expected: difficulty updated to "advanced"
   ```

## Benefits

1. **Better Quiz Organization**: Quizzes can be filtered and sorted by difficulty
2. **Student Experience**: Students can choose quizzes matching their skill level
3. **Analytics**: Track performance across different difficulty levels
4. **Gamification**: Clear progression path from beginner to advanced
5. **Automatic Classification**: System auto-assigns difficulty based on XP

## Future Enhancements

1. **Difficulty-based Leaderboards**: Separate leaderboards for each difficulty
2. **Difficulty Badges**: Award badges for completing quizzes at each level
3. **Adaptive Difficulty**: Suggest difficulty based on student performance
4. **Difficulty Filters**: Filter quizzes by difficulty in student dashboard
5. **Difficulty Statistics**: Show quiz completion rates by difficulty level

## Notes

- Difficulty is automatically determined from `p_xp` value
- Frontend UI uses colored buttons (green/amber/purple) for visual distinction
- Backend validates difficulty values to ensure data integrity
- Existing quizzes will have `null` difficulty until updated
