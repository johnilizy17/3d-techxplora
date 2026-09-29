# 🚀 Quick Start - Live Streaming System

## Start in 3 Steps

### 1️⃣ Start Signaling Server
```bash
node signaling-server.js
```
✅ Should see: "Signaling server running on ws://localhost:3001"

### 2️⃣ Start Frontend
```bash
npm run dev
```
✅ Should see: "Local: http://localhost:5174/"

### 3️⃣ Test It!

**Student Side:**
1. Go to: `http://localhost:5174/dashboard/quizzes`
2. Click any quiz → "START QUIZ!"
3. Accept agreement → Allow camera/mic/screen
4. ✅ See "Live Streaming" indicator in sidebar

**Admin Side:**
1. Go to: `http://localhost:5174/dashboard/admin/inspection`
2. ✅ See live streams of all students

## 🎯 What You'll See

### Student Quiz Page
- Purple "Live Streaming" box with "Broadcasting" status
- Blue "Proctoring Active" box with monitoring status
- Quiz questions work normally

### Admin Dashboard
- Grid of live video streams
- Camera feed (main) + Screen feed (PIP)
- Student names and quiz titles
- Progress bars
- Violation alerts (red badges)
- Search and filter controls

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| "Disconnected" in admin | Start signaling server |
| No video | Check camera/screen permissions |
| Can't connect | Check firewall, port 3001 |
| High latency | Check network speed |

## 📊 System Requirements

**Student:**
- Upload: 2+ Mbps
- Browser: Chrome/Edge/Firefox

**Admin:**
- Download: 10+ Mbps (for 9 streams)
- Browser: Chrome/Edge (recommended)

## ✅ Success Indicators

**Student:**
- ✅ Purple "Live Streaming" box visible
- ✅ "Broadcasting" status with red dot
- ✅ Quiz works normally

**Admin:**
- ✅ Green "Connected" dot
- ✅ Student count shows > 0
- ✅ Video feeds visible
- ✅ Progress bars updating

## 🎉 That's It!

Your live streaming proctoring system is ready to use!

**Need more details?** Check:
- `LIVE_STREAMING_SETUP_COMPLETE.md` - Full setup guide
- `LIVE_STREAMING_SYSTEM.md` - Technical documentation
- `CONTEXT_TRANSFER_SUMMARY.md` - Complete summary

---

**Status**: ✅ Ready to Test
