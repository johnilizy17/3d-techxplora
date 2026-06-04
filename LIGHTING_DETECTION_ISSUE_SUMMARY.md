# Lighting Detection Issue - Root Cause Found

## The Problem

After camera activation, the lighting check keeps saying "💡 No video element yet" even though:
- ✅ Stream is obtained
- ✅ Video is playing  
- ✅ Video has `ref={videoRef}` attribute
- ❌ But `videoRef?.current` returns `null` in the hook

## Root Cause

The `videoRef` is passed to the `useEnvironmentCheck` hook, but when we access `videoRef?.current` inside the interval callback, it's always `null`. This is because:

1. The ref is passed as a parameter
2. The interval function captures the ref value when created
3. Even though the ref's `.current` property changes, the interval function doesn't see the update

## Solution

Instead of passing `videoRef` as a parameter and trying to access it inside the hook, we need to:

**Option 1:** Pass the video element directly (not the ref)
**Option 2:** Use a different approach to access the video element
**Option 3:** Don't use a ref at all - query the DOM directly

I recommend **Option 3** - Query the DOM for the video element inside the check function. This ensures we always get the current video element.

## Implementation

Change from:
```javascript
const video = videoRef?.current;
```

To:
```javascript
const video = document.querySelector('video');
```

This will find the video element on the page, regardless of ref issues.

## Why This Works

- DOM queries always return the current state
- No dependency on refs or closures
- Simple and reliable
- Works even if the video element is created after the hook runs

## Next Step

Update the `checkLighting` function to use `document.querySelector('video')` instead of `videoRef?.current`.
