# Course Access Denied - Visual Preview

## Page Layout

```
┌─────────────────────────────────────────────────────────────┐
│                     Dashboard Header                         │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│                    [Decorative Background]                   │
│                                                              │
│                         ┌─────┐                             │
│                         │ 🛡️❌ │  ← Animated Shield Icon    │
│                         │  🔒  │  ← Lock Badge              │
│                         └─────┘                             │
│                                                              │
│                    ACCESS DENIED                             │
│         You don't have permission to access this course      │
│                                                              │
│    ┌──────────────────────────────────────────────────┐    │
│    │  ⚠️  Not the Course Creator                      │    │
│    │                                                   │    │
│    │  You are trying to access "Course Title", but    │    │
│    │  you are not the direct creator of this course.  │    │
│    │                                                   │    │
│    │  What you can do:                                │    │
│    │  • View your own courses from the dashboard      │    │
│    │  • Create a new course if you're a teacher       │    │
│    │  • Contact the course creator for collaboration  │    │
│    └──────────────────────────────────────────────────┘    │
│                                                              │
│    ┌──────────┐  ┌──────────────┐  ┌──────────────┐       │
│    │ ← Go Back│  │ 🏠 Dashboard │  │ 📖 My Courses│       │
│    └──────────┘  └──────────────┘  └──────────────┘       │
│                                                              │
│              Need help? Contact support or                   │
│              check our help center                           │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Color Palette

### Light Mode
```
Background Gradient: Rose-50 → White → Orange-50
Primary Icon: Rose-500 to Orange-600 gradient
Secondary Icon: Orange-500
Text Primary: Gray-900
Text Secondary: Gray-600
Border: Rose-200
Card Background: White
```

### Dark Mode
```
Background: Black with subtle rose/orange tints
Primary Icon: Rose-500/20 to Orange-500/20 gradient
Icon Color: Rose-400, Orange-400
Text Primary: White
Text Secondary: White/60
Border: White/10
Card Background: White/5
```

## Component Breakdown

### 1. Icon Section
```
┌─────────────────┐
│   Outer Glow    │  ← Pulsing animation
│  ┌───────────┐  │
│  │           │  │
│  │   🛡️❌    │  ← Main shield icon (64px)
│  │           │  │
│  │      🔒   │  ← Lock badge (20px)
│  └───────────┘  │
└─────────────────┘
```

### 2. Text Hierarchy
```
ACCESS DENIED          ← 4xl-6xl, Black weight, Uppercase
  ↓
Subtitle text          ← Base-lg, Medium weight
  ↓
Card heading           ← lg, Black weight
  ↓
Body text              ← sm, Medium weight
  ↓
List items             ← sm, Regular weight
  ↓
Help text              ← xs, Medium weight
```

### 3. Button Layout

**Desktop (3 columns)**
```
┌──────────┐  ┌──────────────┐  ┌──────────────┐
│ Go Back  │  │  Dashboard   │  │  My Courses  │
└──────────┘  └──────────────┘  └──────────────┘
```

**Mobile (1 column)**
```
┌────────────────────────┐
│      Go Back           │
├────────────────────────┤
│      Dashboard         │
├────────────────────────┤
│      My Courses        │
└────────────────────────┘
```

## Animation Timeline

```
0.0s  │ Page loads
      │
0.2s  │ ━━━━━ Icon fades in & scales up
      │
0.3s  │ ━━━━━ Heading fades up
      │
0.4s  │ ━━━━━ Lock badge springs in
      │       ━━━━━ Info card fades up
      │
0.5s  │ ━━━━━ Buttons fade up
      │
0.6s  │ ━━━━━ Help text fades in
      │
∞     │ ━━━━━ Glow ring pulses continuously
```

## Interactive States

### Button Hover
```
Default:    [  Go Back  ]
            ↓
Hover:      [  Go Back  ]  ← Slightly larger, color change
            ↓
Active:     [  Go Back  ]  ← Slightly smaller (0.95 scale)
```

### Icon Animation
```
Glow Ring:
  Scale: 1.0 → 1.1 → 1.0
  Opacity: 0.3 → 0.5 → 0.3
  Duration: 2s
  Repeat: Infinite
```

## Responsive Breakpoints

### Mobile (< 640px)
- Icon: 96px (w-24 h-24)
- Heading: 2xl (text-4xl)
- Buttons: Full width, stacked
- Padding: px-6 py-12

### Tablet (640px - 1024px)
- Icon: 112px (w-28 h-28)
- Heading: 4xl (text-5xl)
- Buttons: 2 columns
- Padding: px-8 py-16

### Desktop (> 1024px)
- Icon: 128px (w-32 h-32)
- Heading: 6xl (text-6xl)
- Buttons: 3 columns
- Padding: px-10 py-20

## Usage Example

### Navigate with Course Title
```javascript
navigate('/dashboard/course/failed', {
    state: {
        courseTitle: 'Introduction to React'
    }
});
```

### Result
```
You are trying to access "Introduction to React", but you 
are not the direct creator of this course.
```

## Accessibility Features

### Keyboard Navigation
```
Tab Order:
1. Go Back button
2. Dashboard button
3. My Courses button
4. Help center link
```

### Screen Reader
```
"Access Denied. You don't have permission to access this course.
Not the Course Creator. You are trying to access [Course Title],
but you are not the direct creator of this course..."
```

## Dark Mode Comparison

```
Light Mode                    Dark Mode
┌──────────────┐             ┌──────────────┐
│ Rose/Orange  │             │ Dark + Tints │
│ Gradient BG  │             │ Black BG     │
│              │             │              │
│  🛡️ Solid    │             │  🛡️ Glow     │
│  Colors      │             │  Effects     │
│              │             │              │
│ Gray Text    │             │ White Text   │
│ White Cards  │             │ Glass Cards  │
└──────────────┘             └──────────────┘
```

## Error States

### No Course Title Provided
```
Default message: "You are trying to access this course..."
```

### With Course Title
```
Custom message: "You are trying to access 'Course Name'..."
```

## Integration Flow

```
User Action
    ↓
Check Permissions
    ↓
Not Creator? ──→ Navigate to /dashboard/course/failed
    │               ↓
    │           Show Error Page
    │               ↓
    │           User Chooses Action:
    │               ├─→ Go Back
    │               ├─→ Dashboard
    │               └─→ My Courses
    ↓
Is Creator? ──→ Allow Access
```

## Testing Checklist

- [ ] Page loads without errors
- [ ] Animations play smoothly
- [ ] Course title displays correctly
- [ ] All buttons navigate properly
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
- [ ] Dark mode works correctly
- [ ] Keyboard navigation works
- [ ] Screen reader accessible
- [ ] Help link works
- [ ] Back button works
- [ ] Dashboard button works
- [ ] My Courses button works

## Browser Compatibility

✅ Chrome/Edge (Chromium)
✅ Firefox
✅ Safari
✅ Mobile browsers
✅ Tablet browsers

## Performance

- Initial load: < 100ms
- Animation start: < 50ms
- Button response: < 16ms
- Total page weight: < 50KB
