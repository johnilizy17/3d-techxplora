# Nigeria Curriculum - AI Quota Handling

## Issue
Firebase Gemini API has quota limits on the free tier. When quota is exceeded, the curriculum feature needs to gracefully fallback to static data.

## Solution Implemented

### 1. Quota Error Detection
The API now detects quota errors by checking:
- Error message contains "quota"
- Error status code is 429
- Error status is "RESOURCE_EXHAUSTED"

### 2. Graceful Fallback Strategy

#### Version Checking
When AI quota is exceeded during version check:
- Falls back to local logic based on known NERDC reforms
- Years >= 2020 considered current (based on 2020-2021 reforms)
- Years < 2020 marked as outdated with standard update message
- Returns fallback data with `source: 'fallback'` flag

#### Curriculum Generation
When AI quota is exceeded during curriculum generation:
- Automatically switches to static curriculum
- Shows user-friendly message: "AI quota exceeded. Displaying static curriculum."
- Sets `useAI` to false automatically
- Preserves all functionality with static data

### 3. User Experience Improvements

#### Year Selector Modal
- Added "Skip and use current year" button
- Prevents modal from blocking access if user doesn't want to select
- Saves flag to prevent modal from showing again

#### Error Messages
- Specific message for quota errors vs general errors
- Clear indication that AI will be available again soon
- No loss of functionality - static curriculum always works

#### Auto-Recovery
- When quota error detected, automatically switches to static mode
- User can manually try AI again later
- Cache system still works for both AI and static modes

## Technical Details

### API Error Handling (`curriculumApi.js`)

```javascript
catch (aiError) {
    if (aiError.message?.includes('quota') || 
        aiError.message?.includes('429') || 
        aiError.status === 'RESOURCE_EXHAUSTED') {
        return { 
            error: { 
                status: 'QUOTA_EXCEEDED',
                error: 'AI quota exceeded. Using static curriculum instead.',
                isQuotaError: true
            } 
        };
    }
    throw aiError;
}
```

### Version Check Fallback Logic

```javascript
const fallbackVersionCheck = () => {
    const isCurrent = year >= 2020; // Based on NERDC 2020-2021 reforms
    return {
        year,
        isCurrent,
        latestYear: currentYear,
        message: isCurrent 
            ? `The ${year} curriculum is based on recent NERDC standards.`
            : `The ${year} curriculum predates major reforms...`,
        changes: [...],
        source: 'fallback'
    };
};
```

### Auto-Switch to Static Mode

```javascript
catch (err) {
    if (err?.isQuotaError || err?.status === 'QUOTA_EXCEEDED') {
        console.warn('AI quota exceeded. Switching to static curriculum.');
        setUseAI(false); // Auto-switch
    }
    setCurriculum(curriculumData); // Use static
}
```

## Static Curriculum Quality

The static curriculum includes:
- Complete Primary (1-6) subjects and topics
- Complete Junior Secondary (JSS 1-3) subjects
- Complete Senior Secondary streams:
  - Arts & Humanities
  - Sciences
  - Commercial/Business
  - Technical/Vocational
- Based on current NERDC standards
- Comprehensive topic coverage per subject

## Quota Information

Firebase Gemini API Free Tier Limits:
- **Requests per day**: Limited per model
- **Requests per minute**: Limited per model
- **Input tokens per minute**: Limited per model

### Reset Time
- Quota resets based on rolling time windows
- Daily limits reset at midnight UTC
- Minute limits reset every 60 seconds

## Recommendations

### For Development
1. Use static mode by default during testing
2. Test AI mode sparingly to avoid quota exhaustion
3. Cache curriculum aggressively (30-day expiry is good)

### For Production
1. Consider upgrading to paid Firebase plan for higher quotas
2. Monitor quota usage in Firebase console
3. Implement server-side caching to reduce API calls
4. Consider backend API endpoint to generate curriculum server-side

### For Users
1. Static curriculum is fully functional and comprehensive
2. AI mode provides dynamic, year-specific variations
3. Cache prevents repeated API calls
4. Users can manually retry AI mode after quota resets

## Monitoring

Check quota usage at:
- https://ai.dev/rate-limit
- Firebase Console → Generative AI section

## Alternative Solutions

If quota issues persist:

### Option 1: Backend Generation
Move AI generation to Laravel backend:
- One-time generation per year
- Store in database
- Serve via API
- No quota issues for end users

### Option 2: Pre-generated Data
Generate curriculum annually:
- Run AI generation once per year
- Store as JSON files
- Update codebase with new data
- No runtime AI calls needed

### Option 3: Paid Plan
Upgrade Firebase plan:
- Higher quota limits
- More reliable for production
- Better for high-traffic apps

## Current Status (Updated)

✅ **Static Mode by Default** - No quota issues on page load
✅ AI Mode is opt-in - User clicks "Try AI" button
✅ Local version checking - No AI calls for version verification
✅ Quota error detection implemented
✅ Graceful fallback to static data
✅ User-friendly error messages
✅ Auto-recovery to static mode on quota errors
✅ Year selector improvements
✅ No functionality loss when quota exceeded

## Default Behavior

**On Page Load:**
1. Starts in Static Mode (no AI calls)
2. Displays comprehensive static curriculum
3. Version checking uses local logic (no AI)
4. No quota usage

**When User Enables AI:**
1. User clicks "Try AI" button
2. Checks cache first (30-day expiry)
3. If no cache, generates with AI
4. If quota exceeded, auto-switches back to static mode

This ensures the page works perfectly even when AI quota is exhausted!
