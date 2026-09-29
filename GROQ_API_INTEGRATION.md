# Groq API Integration for Nigeria Curriculum

## Overview
Integrated Groq API which provides **free, fast AI inference** for generating Nigerian curriculum data dynamically.

## Why Groq?

### Advantages:
- ✅ **Free API access** - No quota issues
- ✅ **Very fast inference** - Responses in seconds
- ✅ **High quality models** - Llama 3.3 70B
- ✅ **No credit card required** - Easy signup
- ✅ **Generous rate limits** - 30 requests/minute on free tier

### Groq vs Firebase Gemini:
- Firebase had strict quota limits causing failures
- Groq provides more reliable free tier
- Faster response times
- Better for production use

## Setup Instructions

### 1. Get Your Groq API Key

1. Go to [https://console.groq.com](https://console.groq.com)
2. Sign up for a free account (no credit card needed)
3. Navigate to API Keys section
4. Click "Create API Key"
5. Copy your new API key

### 2. Add Key to Environment Variables

**IMPORTANT: Never commit API keys to git!**

Edit `v2/.env`:
```env
VITE_GROQ_API_KEY="gsk_your_actual_key_here"
```

Make sure `.env` is in your `.gitignore` file!

### 3. Verify Setup

The curriculum page will automatically use Groq API when:
- Valid API key is configured in `.env`
- User clicks "Try AI" button
- No cached curriculum exists

## Implementation Details

### API Endpoint
```
POST https://api.groq.com/openai/v1/chat/completions
```

### Model Used
```javascript
model: 'llama-3.3-70b-versatile'
```

This is Groq's fastest and most capable free model.

### Request Structure
```javascript
{
  model: 'llama-3.3-70b-versatile',
  messages: [
    {
      role: 'system',
      content: 'You are a Nigerian education curriculum expert...'
    },
    {
      role: 'user',
      content: 'Generate curriculum for [year]...'
    }
  ],
  temperature: 0.7,
  max_tokens: 4000
}
```

### Response Handling
1. Cleans markdown formatting from response
2. Parses JSON curriculum data
3. Enriches with UI metadata (icons, colors)
4. Caches in localStorage for 30 days
5. Falls back to static data on errors

## Features

### 1. AI-Generated Curriculum
- Click "Try AI" button to generate
- Year-specific curriculum based on NERDC standards
- Comprehensive subjects and topics
- Structured JSON output

### 2. Intelligent Caching
- 30-day cache per year
- Reduces API calls
- Faster subsequent loads
- Automatic expiry and refresh

### 3. Graceful Fallback
- Uses local data if API key not configured
- Falls back on API errors
- No functionality loss
- Clear error messages

### 4. Error Handling
- No API key: Shows friendly message, uses local data
- API error: Logs error, falls back to static curriculum
- Rate limit: Automatic fallback with retry suggestion
- Network error: Uses cached or static data

## Usage

### For Users:
1. Page loads with local curriculum data
2. Click "Try AI" to generate AI curriculum
3. Select different years to see variations
4. AI data is cached for fast subsequent visits

### For Developers:
```javascript
// Hook is already integrated
const [generateCurriculum, { isLoading, error }] = useGenerateCurriculumWithGroqMutation();

// Trigger generation
const result = await generateCurriculum({ year: 2024 }).unwrap();
```

## Rate Limits (Free Tier)

- **Requests per minute**: 30
- **Requests per day**: 14,400
- **Tokens per minute**: 20,000

More than enough for typical usage!

## Security Best Practices

### ✅ DO:
- Store API key in `.env` file
- Add `.env` to `.gitignore`
- Use environment variables in code
- Rotate keys periodically

### ❌ DON'T:
- Commit API keys to git
- Share keys publicly
- Hardcode keys in source code
- Use production keys in development

## Monitoring Usage

Check your Groq API usage at:
[https://console.groq.com/usage](https://console.groq.com/usage)

Monitor:
- Request count
- Token usage
- Error rates
- Rate limit status

## Troubleshooting

### "API key not configured" message
**Fix**: Add valid Groq API key to `.env` file

### API requests failing
**Check**:
1. API key is correct
2. Internet connection is stable
3. Groq service status
4. Rate limits not exceeded

### Slow responses
**Note**: First request may be slower as model initializes. Subsequent requests are very fast (usually < 3 seconds).

### Rate limit exceeded
**Fix**: Wait 1 minute or use cached data. Free tier allows 30 requests/minute.

## Alternative Models

You can change the model in `curriculumApi.js`:

```javascript
// Current (recommended)
model: 'llama-3.3-70b-versatile'

// Alternatives:
model: 'llama-3.1-8b-instant'      // Faster, less detailed
model: 'mixtral-8x7b-32768'        // Good balance
model: 'gemma2-9b-it'              // Lightweight option
```

## Cost Comparison

| Provider | Free Tier | Speed | Quota Issues |
|----------|-----------|-------|--------------|
| **Groq** | ✅ Yes | ⚡ Very Fast | ❌ No |
| Firebase Gemini | Limited | Fast | ✅ Yes |
| OpenAI | ❌ No | Medium | N/A |

Groq is the clear winner for this use case!

## Future Enhancements

1. **Backend Integration**: Move API calls to Laravel backend
2. **Caching Strategy**: Implement Redis caching server-side
3. **Admin Panel**: Allow admins to approve/edit AI-generated content
4. **Batch Generation**: Generate all years at once
5. **Version Control**: Track curriculum changes over time

## Production Recommendations

### For Small Scale (< 1000 users):
- Current setup is perfect
- Groq free tier is sufficient
- Client-side generation works well

### For Medium Scale (1000-10,000 users):
- Move to backend API calls
- Implement server-side caching
- Consider Groq paid tier for higher limits

### For Large Scale (> 10,000 users):
- Generate curriculum once per year
- Store in database
- Serve via CDN
- Use AI only for admin updates

## Summary

✅ Free AI curriculum generation with Groq
✅ Fast inference (2-4 seconds typical)
✅ No quota issues
✅ Intelligent caching
✅ Graceful fallbacks
✅ Production-ready

The Nigeria Curriculum feature now has reliable, free AI integration!
