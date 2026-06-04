# Academic Integrity Modal - Visual Preview

## 🎯 What It Looks Like

### Modal Header (Red Gradient)
```
┌─────────────────────────────────────────────────────────┐
│  🛡️  ACADEMIC INTEGRITY NOTICE                    ✕    │
│      Online Examination Rules                           │
└─────────────────────────────────────────────────────────┘
```

### Content Sections (Scrollable)

#### 1. Academic Honesty (Blue Box)
```
┌─────────────────────────────────────────────────────────┐
│ 🎓  🎓 ACADEMIC HONESTY                                 │
│                                                          │
│  By continuing with this exam, you agree to uphold      │
│  the highest standards of integrity. Any form of        │
│  cheating or dishonest behavior is strictly prohibited. │
└─────────────────────────────────────────────────────────┘
```

#### 2. Prohibited Activities (Red Box)
```
┌─────────────────────────────────────────────────────────┐
│ 🚫  🚫 PROHIBITED ACTIVITIES                            │
│                                                          │
│  During this exam, you must NOT:                        │
│                                                          │
│  💻 Switch to other tabs, applications, or devices      │
│  👥 Communicate with other individuals                  │
│  📄 Use unauthorized materials, notes, or resources     │
│  📷 Allow another person to appear on your camera       │
│  📹 Turn off your camera or screen sharing              │
└─────────────────────────────────────────────────────────┘
```

#### 3. Monitoring & Recording (Purple Box)
```
┌─────────────────────────────────────────────────────────┐
│ 👁️  🎥 MONITORING & RECORDING                           │
│                                                          │
│  This exam session is being:                            │
│  • Video recorded (camera)                              │
│  • Screen recorded                                      │
│  • Monitored for suspicious activity                    │
│                                                          │
│  ┌───────────────────────────────────────────────────┐  │
│  │ Any unusual behavior such as:                     │  │
│  │ ⚠️ Looking away frequently                        │  │
│  │ ⚠️ Multiple faces detected                        │  │
│  │ ⚠️ Background voices or assistance                │  │
│  │ ⚠️ Attempting to bypass monitoring                │  │
│  │ may be flagged and reviewed.                      │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

#### 4. Consequences (Orange Box)
```
┌─────────────────────────────────────────────────────────┐
│ ⚠️  ⚠️ CONSEQUENCES OF CHEATING                         │
│                                                          │
│  If you are found violating any of the rules:           │
│  • Your exam may be automatically terminated            │
│  • Your results may be invalidated                      │
│  • Further disciplinary actions may be taken            │
└─────────────────────────────────────────────────────────┘
```

#### 5. Guidelines (Green Box)
```
┌─────────────────────────────────────────────────────────┐
│ ✅  ✅ WHAT YOU SHOULD DO                               │
│                                                          │
│  ✓ Stay focused on your screen at all times            │
│  ✓ Ensure you are alone in a quiet environment         │
│  ✓ Keep your camera and screen sharing active          │
│  ✓ Follow all instructions carefully                   │
└─────────────────────────────────────────────────────────┘
```

### Footer (Gray Background)
```
┌─────────────────────────────────────────────────────────┐
│  ┌──────────────┐  ┌──────────────────────────────────┐ │
│  │   CANCEL     │  │  ✓ I AGREE & ACCEPT              │ │
│  └──────────────┘  └──────────────────────────────────┘ │
│                                                          │
│  By clicking "I Agree & Accept", you acknowledge that   │
│  you have read and understood all the rules above.      │
└─────────────────────────────────────────────────────────┘
```

## 🎨 Color Scheme

### Light Mode
- **Header**: Red gradient (from-red-500 to-rose-600)
- **Academic Honesty**: Light blue background
- **Prohibited**: Light red background
- **Monitoring**: Light purple background
- **Consequences**: Light orange background
- **Guidelines**: Light green background
- **Footer**: Light gray background

### Dark Mode
- **Header**: Darker red gradient (from-red-600 to-rose-700)
- **All sections**: Semi-transparent colored backgrounds with borders
- **Text**: White with appropriate opacity
- **Footer**: Dark gray background

## 📱 Responsive Behavior

### Desktop (>640px)
- Modal width: max-w-3xl (768px)
- Two-column button layout
- Full padding and spacing

### Mobile (<640px)
- Modal width: Full width with padding
- Single-column button layout
- Reduced padding for better fit
- Scrollable content area

## ✨ Animations

1. **Modal Entrance:**
   - Backdrop fades in
   - Modal scales up from 0.9 to 1.0
   - Modal slides up slightly

2. **Modal Exit:**
   - Backdrop fades out
   - Modal scales down to 0.9
   - Modal slides down slightly

3. **Button Hover:**
   - Accept button scales to 1.02
   - Cancel button changes background color

4. **Button Click:**
   - Accept button scales to 0.95
   - Provides tactile feedback

## 🔧 How to Test

1. **Start the dev server:**
   ```bash
   npm run dev
   ```
   Server is running at: http://localhost:5174/

2. **Navigate to a quiz:**
   - Go to Dashboard
   - Click on any quiz
   - Click "View Details"
   - Click "START QUIZ!" button

3. **Modal should appear:**
   - Verify all sections are visible
   - Test scrolling if content is long
   - Try clicking Cancel (should close)
   - Try clicking X button (should close)
   - Try clicking Accept (should start quiz)

4. **Test dark mode:**
   - Toggle dark mode in your app
   - Verify colors look good
   - Check text readability

5. **Test responsive:**
   - Resize browser window
   - Check mobile view (< 640px)
   - Verify buttons stack vertically on mobile

## 🎯 User Experience Flow

```
┌─────────────────┐
│  StartQuiz Page │
└────────┬────────┘
         │
         │ Click "START QUIZ!"
         ▼
┌─────────────────────────┐
│ Academic Integrity Modal│
│  (Appears on screen)    │
└────────┬────────────────┘
         │
         ├─── Click "Cancel" ──────► Modal closes, stay on page
         │
         └─── Click "I Agree" ─────► Modal closes
                                      ▼
                                 Toast: "Good luck!"
                                      ▼
                              Navigate to Quiz
```

## 💡 Key Features

1. **Cannot be dismissed accidentally** - Must click Cancel or Accept
2. **Clear visual hierarchy** - Color-coded sections
3. **Comprehensive rules** - All expectations clearly stated
4. **Professional design** - Matches app aesthetic
5. **Accessible** - Keyboard navigation, screen reader friendly
6. **Smooth animations** - Professional feel
7. **Dark mode support** - Comfortable viewing
8. **Mobile responsive** - Works on all devices

## 📝 Content Summary

The modal covers:
- ✅ Academic honesty pledge
- ✅ 5 prohibited activities with icons
- ✅ 3 monitoring methods
- ✅ 4 suspicious behaviors that trigger flags
- ✅ 3 consequences of cheating
- ✅ 4 guidelines for proper conduct
- ✅ Acknowledgment statement

Total word count: ~250 words
Reading time: ~1-2 minutes

## 🚀 Next Steps

After testing, you can:
1. Customize the rules for your institution
2. Add more sections if needed
3. Integrate with backend to log acceptances
4. Add camera preview feature
5. Add minimum read time requirement
6. Add checkbox confirmations
7. Translate to multiple languages

## 📊 Success Metrics

Track these to measure effectiveness:
- Modal acceptance rate
- Time spent reading modal
- Quiz completion rate after acceptance
- Academic integrity violations (should decrease)
- Student feedback on clarity

## 🎓 Educational Impact

This modal helps:
- Set clear expectations
- Reduce confusion about rules
- Document student acknowledgment
- Protect institutional integrity
- Create audit trail for compliance
- Reduce academic dishonesty incidents
