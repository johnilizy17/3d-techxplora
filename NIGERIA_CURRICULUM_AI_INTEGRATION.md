# Nigeria Curriculum AI Integration

## Overview
Integrated Firebase AI (Google Gemini) to dynamically generate Nigerian curriculum data with year-based selection, automatic update notifications, and device storage management.

## Key Features

### 1. First-Time User Experience
- Year selection modal on first visit
- Choose curriculum year from 2010 to current year
- Selection saved to device localStorage
- Immediate curriculum generation for selected year

### 2. Version Checking & Updates
- Automatic check for curriculum updates
- AI-powered version comparison
- Update notification with:
  - Alert banner showing outdated curriculum
  - Summary of major changes
  - One-click update to latest year
  - "Later" option to dismiss temporarily

### 3. Device Storage Management
- Year-specific caching: `nigeria_curriculum_{year}`
- 30-day cache expiry per year version
- Separate cache for each year selected
- Automatic cleanup when updating to new year

## Implementation Details

### 1. Firebase AI Service (`v2/src/utils/firebase.js`)
- Already configured with Firebase AI using Google Gemini model
- Uses `gemini-2.0-flash` model for fast content generation
- Integrated with Firebase app instance

### 2. Curriculum API (`v2/src/redux/api/curriculumApi.js`)
Created Redux RTK Query API with three endpoints:

#### `checkCurriculumVersion`
- Checks if selected year curriculum is current
- Returns version status, latest year, and changes
- Uses AI to determine curriculum updates based on NERDC reforms

#### `generateCurriculum` (Single Level)
- Generates curriculum for a specific education level
- Year-aware: generates based on specified year standards
- Returns structured JSON with subjects and topics

#### `generateFullCurriculum` (Complete System)
- Generates entire Nigerian education system curriculum
- Year-aware: based on specified year's NERDC standards
- Covers Primary (1-6), Junior Secondary (JSS 1-3), and Senior Secondary (SSS 1-3)
- Includes 4 specialized streams for Senior Secondary

### 3. Updated NigeriaCurriculum Page (`v2/src/pages/NigeriaCurriculum.jsx`)

#### New Components:

**Year Selection Modal**
- Grid layout with clickable year buttons
- Years from 2010 to current year + 1
- Animated entrance and exit
- Only shown on first visit or when triggered

**Update Notification Banner**
- Fixed position at top of screen
- Shows when curriculum is outdated
- Displays:
  - Warning icon and title
  - Descriptive message about update
  - List of major changes (up to 3)
  - Update button (one-click upgrade)
  - Later button (dismiss temporarily)
  - Close button (dismiss permanently for session)

**Status Badges**
- Year badge: Shows current curriculum year (clickable to change)
- Up to Date badge: Green checkmark when current
- AI-Powered/Static badge: Shows active mode
- Regenerate button: Refresh current year curriculum

#### User Flow:

1. **First Visit**:
   - Year selection modal appears
   - User selects desired year
   - Year saved to localStorage
   - AI checks if year is current
   - Curriculum generated for selected year
   - Update notification shown if outdated

2. **Subsequent Visits**:
   - Reads year from localStorage
   - Checks cache for that year's curriculum
   - Uses cache if valid (< 30 days old)
   - Otherwise generates fresh curriculum
   - Background check for updates

3. **Update Flow**:
   - Notification appears if outdated
   - User clicks "Update to {year}"
   - Old cache cleared
   - New year saved to localStorage
   - Fresh curriculum generated
   - Notification dismissed

4. **Manual Year Change**:
   - Click year badge in hero section
   - Year selector modal opens
   - Select new year
   - Process same as first visit

## Data Structure

### Curriculum Storage:
```javascript
// localStorage keys:
nigeria_curriculum_2024           // Curriculum data for 2024
nigeria_curriculum_2024_timestamp // Cache timestamp
nigeria_curriculum_year           // Currently selected year
```

### Version Check Response:
```json
{
  "year": 2020,
  "isCurrent": false,
  "latestYear": "2024",
  "message": "The 2020 curriculum is outdated. Major reforms implemented in 2021-2024.",
  "changes": [
    "Updated ICT curriculum with modern programming concepts",
    "Enhanced STEM focus in sciences",
    "New entrepreneurship requirements"
  ]
}
```

## Cache Strategy

- **Storage**: localStorage (device-based)
- **Key Pattern**: `nigeria_curriculum_{year}`
- **Timestamp Pattern**: `nigeria_curriculum_{year}_timestamp`
- **Expiry**: 30 days per year version
- **Benefits**:
  - Multiple years can be cached simultaneously
  - Users can switch between years instantly
  - Reduces Firebase API calls significantly
  - Offline capability once cached
  - Year-specific updates don't affect other cached years

## Version Management

### Update Detection:
1. AI compares selected year against known NERDC reforms
2. Considers major curriculum changes (2014, 2020-2021)
3. Returns factual information about Nigerian education updates
4. Suggests latest year with summary of changes

### Update Process:
1. Clear old year cache
2. Update localStorage with new year
3. Generate fresh curriculum for new year
4. Dismiss notification
5. Show success indicator

## NERDC Standards Alignment

AI prompts specifically reference:
- Nigerian Educational Research and Development Council (NERDC)
- 9-3-4 education structure
- Year-specific curriculum standards
- Authentic Nigerian subjects and topics
- Historical curriculum reforms (2014, 2020-2021)

## UI/UX Features

### Status Indicators:
1. **Year Badge**: Green, shows selected year, clickable
2. **Up to Date Badge**: Emerald, checkmark icon
3. **AI Mode Badge**: Blue with robot emoji
4. **Regenerate Badge**: Purple with refresh icon

### Notification Design:
- Orange gradient background (warning theme)
- Fixed positioning (top of screen, mobile responsive)
- Animated entrance/exit
- Non-blocking (can be dismissed)
- Clear call-to-action buttons

### Loading States:
- Spinner for curriculum generation
- Spinner for version checking
- Year-aware loading messages
- Error handling with fallback to static data

## Benefits

1. **Personalization**: Users choose relevant curriculum year
2. **Always Current**: Automatic update notifications
3. **Efficient Storage**: Year-based caching strategy
4. **Performance**: 30-day cache reduces API calls
5. **Flexibility**: Switch between years easily
6. **Reliability**: Static fallback ensures page always works
7. **Transparency**: Clear indicators of curriculum version and status
8. **Cost Effective**: Smart caching minimizes Firebase usage

## Testing Checklist

- [ ] First visit shows year selector
- [ ] Year selection saves to localStorage
- [ ] Curriculum generates for selected year
- [ ] Cache is used on subsequent visits
- [ ] Version check runs automatically
- [ ] Update notification appears if outdated
- [ ] Update button switches to latest year
- [ ] Later button dismisses notification
- [ ] Year badge click reopens selector
- [ ] Regenerate button clears cache and refreshes
- [ ] Multiple years can be cached separately
- [ ] Cache expires after 30 days
- [ ] Static fallback works if AI fails
- [ ] Mobile responsive design works correctly

## Future Enhancements

1. Compare multiple years side-by-side
2. Export curriculum differences report
3. Admin panel to manage curriculum versions
4. Multi-language support (Hausa, Yoruba, Igbo)
5. Subject-specific deep dives
6. Integration with quiz generation
7. Push notifications for new curriculum releases
8. Curriculum change history timeline

## Notes

- Year selection persists across sessions (localStorage)
- Each year has independent cache with own expiry
- AI checks are lightweight and run in background
- Update notifications are non-intrusive
- Users maintain full control over curriculum year
- Static curriculum remains as ultimate fallback
