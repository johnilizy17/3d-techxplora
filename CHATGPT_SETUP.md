# ChatGPT Integration Setup Guide

The TechXplora chatbot has been updated to use OpenAI's ChatGPT API instead of Google's Gemini.

## Setup Instructions

### 1. Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Navigate to [API Keys](https://platform.openai.com/api-keys)
4. Click "Create new secret key"
5. Copy the generated API key (you won't be able to see it again!)

### 2. Add API Key to Environment Variables

Open the `v2/.env` file and replace the placeholder with your actual API key:

```env
VITE_OPENAI_API_KEY="REDACTED_OPENAI_KEY"
```

**Important:** Never commit your actual API key to version control!

### 3. Restart Development Server

After adding the API key, restart your development server:

```bash
npm run dev
```

## Features

### ChatGPT Integration
- Uses OpenAI's `gpt-3.5-turbo` model (you can change to `gpt-4` if you have access)
- Maintains conversation history for context-aware responses
- Specialized system prompt for educational tutoring
- Error handling with user-friendly messages

### Configuration Options

You can customize the ChatGPT behavior in `v2/src/components/chat/ChatBot.jsx`:

```javascript
// Change the model
model: 'gpt-3.5-turbo', // or 'gpt-4', 'gpt-4-turbo', etc.

// Adjust creativity (0.0 = deterministic, 2.0 = very creative)
temperature: 0.7,

// Limit response length
max_tokens: 500
```

### System Prompt

The chatbot is configured with this system prompt:

> "You are ChatGPT, a helpful AI tutor integrated into TechXplora learning platform. 
> You specialize in helping students with school subjects such as math, science, history, literature, and general learning questions.
> Provide clear, educational responses that help students understand concepts.
> If a user asks something completely unrelated to education or learning, politely redirect them to educational topics.
> Keep responses concise but informative."

You can modify this in the `generateResponse` function.

## API Costs

OpenAI charges per token used. Approximate costs:
- **GPT-3.5-turbo**: ~$0.002 per 1K tokens
- **GPT-4**: ~$0.03 per 1K tokens (input) / $0.06 per 1K tokens (output)

Monitor your usage at: https://platform.openai.com/usage

## Troubleshooting

### "ChatGPT is not configured yet"
- Make sure you've added `VITE_OPENAI_API_KEY` to your `.env` file
- Restart your development server after adding the key
- Verify the key starts with `sk-`

### API Errors
- Check your OpenAI account has credits/billing set up
- Verify your API key is valid and not expired
- Check the browser console for detailed error messages

### Rate Limits
If you hit rate limits, you can:
- Upgrade your OpenAI plan
- Implement request throttling
- Add a queue system for messages

## Security Notes

⚠️ **Important Security Considerations:**

1. **Never expose API keys in client-side code in production**
   - The current implementation is suitable for development
   - For production, create a backend API endpoint that proxies requests to OpenAI
   - Store the API key on your server, not in the client

2. **Recommended Production Architecture:**
   ```
   Client → Your Backend API → OpenAI API
   ```

3. **Add rate limiting** to prevent abuse
4. **Monitor usage** to avoid unexpected costs
5. **Implement user authentication** before allowing chat access

## Migration from Gemini

The previous implementation used Google's Gemini model via Firebase. Key changes:

- ❌ Removed: `import { model } from '@/utils/firebase'`
- ✅ Added: Direct OpenAI API integration
- ✅ Added: Conversation history support
- ✅ Added: Better error handling
- ✅ Updated: All UI references from "Xplora AI" to "ChatGPT"

## Next Steps

Consider implementing:
- [ ] Backend proxy for API key security
- [ ] User authentication for chat access
- [ ] Rate limiting per user
- [ ] Chat history persistence
- [ ] Export chat conversations
- [ ] Admin dashboard for monitoring usage
