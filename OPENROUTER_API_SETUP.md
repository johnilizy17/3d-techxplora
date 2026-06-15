# OpenRouter API Setup for Nigeria Curriculum

## Overview
OpenRouter provides unified access to **multiple free AI models** including GPT, Claude, Llama, Gemini, and many others through a single API.

## Why OpenRouter?

### Advantages:
- ✅ **100% Free tier available** - No cost for many models
- ✅ **Multiple models** - Access to 100+ AI models
- ✅ **No quotas** - Generous rate limits
- ✅ **High quality** - Including GPT-4 level models
- ✅ **Simple API** - OpenAI-compatible interface
- ✅ **No credit card** - Easy signup

### Model Used:
**`poolside/laguna-xs.2:free`**
- Completely free
- Has reasoning capabilities
- Good quality outputs
- Fast responses

## Quick Setup (3 Steps)

### Step 1: Get Your API Key

1. Visit [https://openrouter.ai/keys](https://openrouter.ai/keys)
2. Sign up (free, no credit card needed)
3. Click "Create Key"
4. Copy your API key

### Step 2: Add to .env

Edit `v2/.env`:
```env
VITE_OPENROUTER_API_KEY="sk-or-v1-your_key_here"
```

### Step 3: Restart Dev Server

```bash
cd v2
npm run dev
```

## API Details

### Endpoint:
```
https://openrouter.ai/api/v1/chat/completions
```

### Request Structure:
```javascript
{
  model: 'poolside/laguna-xs.2:free',
  messages: [
    {
      role: 'user',
      content: 'Generate Nigeria curriculum...'
    }
  ]
}
```

### Response Structure:
```javascript
{
  choices: [
    {
      message: {
        content: '{"primary": {...}, "juniorSecondary": {...}}',
        role: 'assistant',
        reasoning: '...' // Includes reasoning process!
      }
    }
  ],
  usage: {
    prompt_tokens: 58,
    completion_tokens: 832,
    total_tokens: 890
  }
}
```

## Features

✅ **AI Curriculum Generation**
- Click "Try AI" button
- Generates comprehensive curriculum
- Based on NERDC standards
- Year-specific content

✅ **Smart Caching**
- 30-day cache per year
- LocalStorage based
- Instant subsequent loads

✅ **Graceful Fallback**
- Uses local data if no API key
- Falls back on errors
- No functionality loss

✅ **Reasoning Included**
- Model explains its thinking
- Can be logged for debugging
- Helps improve prompts

## Available Free Models

You can change the model in `curriculumApi.js`:

### Current (Recommended):
```javascript
model: 'poolside/laguna-xs.2:free'
```

### Alternatives (All Free):
```javascript
// Very fast, good quality
model: 'google/gemini-flash-1.5:free'

// Great for structured output
model: 'meta-llama/llama-3.2-3b-instruct:free'

// Lightweight and fast
model: 'qwen/qwen-2-7b-instruct:free'

// Good reasoning
model: 'nousresearch/hermes-3-llama-3.1-405b:free'
```

View all free models at: [https://openrouter.ai/models?order=newest&max_price=0](https://openrouter.ai/models?order=newest&max_price=0)

## Rate Limits

### Free Tier:
- **Requests per minute**: Varies by model
- **Poolside Laguna**: ~20 requests/minute
- **Token limits**: Generous
- **Daily limits**: Very high

More than enough for curriculum generation!

## Testing

### Test the Response:

Your example response shows the AI generated:
- ✅ Universal Basic Education (UBE) structure
- ✅ Primary Education (Grades 1-6)
- ✅ Junior Secondary (Grades 7-9)
- ✅ Senior Secondary (Grades 10-12)
- ✅ Core subjects for each level
- ✅ WAEC/NECO exam info
- ✅ 9-3-3-4 system details

Perfect for our use case!

## Implementation Notes

### Headers Required:
```javascript
{
  'Authorization': `Bearer ${apiKey}`,
  'Content-Type': 'application/json',
  'HTTP-Referer': window.location.origin, // For analytics
  'X-Title': 'TechXplora Nigeria Curriculum' // App name
}
```

### Error Handling:
- No API key: Uses local data
- API error: Falls back to local data
- Rate limit: Suggests retry
- Network error: Uses cached data

### Response Cleaning:
```javascript
const cleanContent = content
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();
```

## Advantages Over Other APIs

| Feature | OpenRouter | Groq | Firebase |
|---------|-----------|------|----------|
| **Free Models** | 100+ | 5 | Limited |
| **Quota Issues** | Rare | Sometimes | Common |
| **Model Choice** | Many | Few | One |
| **API Format** | Standard | Standard | Custom |
| **Setup** | Easy | Easy | Complex |

## Usage Monitoring

Check your usage at:
[https://openrouter.ai/activity](https://openrouter.ai/activity)

View:
- Request count
- Token usage
- Model distribution
- Cost (should be $0 for free models)

## Security

### ✅ Do:
- Store key in .env file
- Add .env to .gitignore
- Use different keys for dev/prod
- Rotate keys periodically

### ❌ Don't:
- Commit keys to git
- Share keys publicly
- Hardcode in source
- Reuse across projects

## Troubleshooting

### "API key not configured"
**Fix**: Add valid OpenRouter API key to `.env`

### "Model not found"
**Fix**: Check model name at https://openrouter.ai/models

### Rate limit exceeded
**Wait**: 1 minute, then retry
**Or**: Use cached/local data

### Empty response
**Check**: Model might be temporarily unavailable
**Try**: Different free model

## Production Deployment

### Vercel/Netlify:
1. Add environment variable:
   - Name: `VITE_OPENROUTER_API_KEY`
   - Value: Your API key
2. Deploy
3. Test on production

### Custom Server:
```bash
export VITE_OPENROUTER_API_KEY="your_key"
npm run build
```

## Cost

**$0.00** - Completely free with free models!

Optional paid models available if you need:
- Higher quality
- Faster speeds
- Specialized models

## Alternative Backend Implementation

For production, consider Laravel backend:

```php
// app/Http/Controllers/CurriculumController.php
public function generate(Request $request)
{
    $year = $request->input('year', date('Y'));
    
    $response = Http::withHeaders([
        'Authorization' => 'Bearer ' . env('OPENROUTER_API_KEY'),
        'Content-Type' => 'application/json',
    ])->post('https://openrouter.ai/api/v1/chat/completions', [
        'model' => 'poolside/laguna-xs.2:free',
        'messages' => [
            [
                'role' => 'user',
                'content' => "Generate Nigeria curriculum for $year..."
            ]
        ]
    ]);
    
    $curriculum = json_decode($response->json()['choices'][0]['message']['content']);
    
    // Cache in database
    Curriculum::updateOrCreate(
        ['year' => $year],
        ['data' => $curriculum]
    );
    
    return response()->json($curriculum);
}
```

## Summary

✅ Multiple free AI models
✅ No quota issues
✅ Simple setup
✅ Great quality
✅ Production-ready
✅ $0 cost

OpenRouter is the best choice for free AI curriculum generation!
