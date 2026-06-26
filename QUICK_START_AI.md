# Quick Start: AI Features Setup

## 🚀 Get Your Free AI Working in 3 Minutes

### Step 1: Get Your Free API Key (1 minute)

1. Go to **https://openrouter.ai/keys**
2. Click **"Sign Up"** (no credit card needed!)
3. Click **"Create Key"**
4. **Copy** the key that starts with `sk-or-v1-...`

### Step 2: Add Key to Your Project (1 minute)

1. Open `v2/.env` file in your code editor
2. Find or add this line:
   ```env
   VITE_OPENROUTER_API_KEY="paste_your_key_here"
   ```
3. **Save** the file

Example:
```env
VITE_OPENROUTER_API_KEY="sk-or-v1-abc123xyz456..."
```

### Step 3: Restart Your App (30 seconds)

In your terminal:
```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

## ✅ That's It! Now Test

### Test ChatBot:
1. Open your app in browser
2. Click **"Get Help"** button (bottom right)
3. Choose **"Xplora AI Assistant"**
4. Ask: *"Help me with math"*
5. You should get an AI response! 🎉

### Test Nigeria Curriculum:
1. Go to Nigeria Curriculum page
2. Click **"Try AI"** or **"Regenerate with AI"**
3. Watch it generate curriculum data!

## 🎯 What This Enables

With your OpenRouter API key, you get:

✅ **ChatBot AI Assistant**
- Homework help
- Subject explanations
- Learning support
- All FREE!

✅ **Nigeria Curriculum Generator**
- AI-generated curriculum
- Year-specific content
- NERDC standards
- All FREE!

✅ **Future AI Features**
- Quiz generation
- Content suggestions
- Study recommendations
- All FREE!

## 🔥 Why OpenRouter?

- **100% FREE** - No credit card, ever
- **100+ AI Models** - ChatGPT, Claude, Llama, etc.
- **No Quotas** - Generous rate limits
- **Fast** - 2-3 second responses
- **Reliable** - Production-ready

## 🐛 Troubleshooting

### "API key not configured"
**Fix**: Make sure you:
1. Added key to `.env` file
2. Key starts with `sk-or-v1-`
3. Restarted dev server

### ChatBot not responding
**Fix**:
1. Check browser console (F12)
2. Look for API errors
3. Verify internet connection
4. Try refreshing the page

### Still not working?
1. Double-check `.env` file saved
2. Restart dev server completely
3. Clear browser cache
4. Check https://openrouter.ai/activity to see if requests are being made

## 📚 More Info

- **Full Setup Guide**: `OPENROUTER_API_SETUP.md`
- **ChatBot Update**: `CHATBOT_OPENROUTER_UPDATE.md`
- **All AI Docs**: `AI_INTEGRATION_COMPLETE.md`

## 🎓 Pro Tips

### Switch AI Models
Want a different AI? Change model in the code:
```javascript
model: 'google/gemini-flash-1.5:free'  // Very fast
// or
model: 'meta-llama/llama-3.2-3b-instruct:free'  // Good for education
```

Browse models: https://openrouter.ai/models?max_price=0

### Monitor Usage
See your API usage at:
https://openrouter.ai/activity

Should show $0.00 cost with free models!

### Production Deployment
When deploying:
1. Add `VITE_OPENROUTER_API_KEY` to hosting platform
2. Use environment variables (don't commit key!)
3. Same key works in production

## 🌟 Success!

You now have:
- ✅ Free AI ChatBot
- ✅ Free AI Curriculum
- ✅ All AI features enabled
- ✅ Zero cost
- ✅ No quotas

**Enjoy your AI-powered learning platform!** 🎉

---

**Need Help?**
- Check documentation in `v2/` folder
- Visit https://openrouter.ai/docs
- Check browser console for errors
- Ask your development team

**Last Updated**: 2026-06-26
