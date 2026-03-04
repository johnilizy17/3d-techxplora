# Text Visibility Fix for Light/Dark Mode

## Issue
Many text elements across the v2 application use colors that don't have proper contrast in both light and dark modes, making them hard to read.

## Common Problems

### 1. White Text Without Dark Mode Alternative
- `text-white/20`, `text-white/30`, `text-white/40`, `text-white/60` - Hard to read in light mode
- Should be: `text-gray-X dark:text-white/X`

### 2. Gray Text Without Light Mode Alternative  
- `text-gray-400`, `text-gray-500`, `text-gray-600` - May be too light in light mode
- Should have proper contrast ratios

### 3. Background/Text Combinations
- White text on light backgrounds
- Dark text on dark backgrounds

## Solution Pattern

### For Labels and Secondary Text
```jsx
// Before
className="text-white/40"

// After  
className="text-gray-600 dark:text-white/40"
```

### For Body Text
```jsx
// Before
className="text-white/60"

// After
className="text-gray-700 dark:text-white/60"
```

### For Muted/Tertiary Text
```jsx
// Before
className="text-white/20"

// After
className="text-gray-400 dark:text-white/20"
```

### For Primary Text
```jsx
// Before
className="text-white"

// After
className="text-gray-900 dark:text-white"
```

### For Placeholders
```jsx
// Before
className="placeholder:text-white/20"

// After
className="placeholder:text-gray-400 dark:placeholder:text-white/20"
```

## Files That Need Fixing

### High Priority (User-Facing Pages)
1. `v2/src/pages/CreateCourse.jsx` - Course creation form
2. `v2/src/pages/EditCourse.jsx` - Course editing form
3. `v2/src/pages/CreateQuiz.jsx` - Quiz creation form
4. `v2/src/pages/UserProfile.jsx` - Profile editing
5. `v2/src/pages/Dashboard.jsx` - Main dashboard
6. `v2/src/pages/Leaderboard.jsx` - Leaderboard view
7. `v2/src/pages/Wallet.jsx` - Wallet/transactions
8. `v2/src/pages/Toolkit.jsx` - Toolkit page

### Medium Priority (Components)
9. `v2/src/components/dashboard/DashboardLayout.jsx`
10. `v2/src/components/dashboard/DashboardHeader.jsx`
11. `v2/src/components/dashboard/MoreMenuDrawer.jsx`
12. `v2/src/components/teacher/QuizResults.jsx`
13. `v2/src/components/course/CaseStudyBuilder.jsx`

### Lower Priority (Landing Pages)
14. `v2/src/pages/Home.jsx`
15. `v2/src/pages/About.jsx`
16. `v2/src/components/collectors/*`

## Automated Fix Script

You can use this regex pattern to find problematic text classes:

### Find Pattern
```regex
text-white/[0-9]+(?! dark:)
```

### Common Replacements
- `text-white/20` → `text-gray-400 dark:text-white/20`
- `text-white/30` → `text-gray-500 dark:text-white/30`
- `text-white/40` → `text-gray-600 dark:text-white/40`
- `text-white/60` → `text-gray-700 dark:text-white/60`
- `text-white/80` → `text-gray-800 dark:text-white/80`
- `text-white` → `text-gray-900 dark:text-white`

## Testing Checklist

After applying fixes, test these scenarios:

### Light Mode
- [ ] All text is readable with sufficient contrast
- [ ] Labels are clearly visible
- [ ] Placeholders are distinguishable but not distracting
- [ ] Muted text is still readable
- [ ] No white text on light backgrounds

### Dark Mode
- [ ] All text maintains current visibility
- [ ] No regression in dark mode appearance
- [ ] Accent colors (indigo, emerald, etc.) still pop
- [ ] Backgrounds and text have proper separation

### Specific Components
- [ ] Form labels in CreateCourse/EditCourse
- [ ] Step indicators in multi-step forms
- [ ] Search inputs and placeholders
- [ ] Card titles and descriptions
- [ ] Button text in all states
- [ ] Toast notifications
- [ ] Dropdown menus
- [ ] Table headers and cells
- [ ] Modal dialogs

## Implementation Strategy

### Phase 1: Critical User Flows
1. Fix CreateCourse.jsx completely
2. Fix CreateQuiz.jsx completely
3. Fix UserProfile.jsx completely
4. Test these three pages thoroughly

### Phase 2: Dashboard & Navigation
1. Fix Dashboard.jsx
2. Fix DashboardLayout.jsx
3. Fix DashboardHeader.jsx
4. Fix MoreMenuDrawer.jsx

### Phase 3: Remaining Pages
1. Fix all other pages systematically
2. Fix shared components
3. Final comprehensive testing

## Color Contrast Guidelines

### WCAG AA Standards (Minimum)
- Normal text: 4.5:1 contrast ratio
- Large text (18pt+): 3:1 contrast ratio

### Recommended Pairings

#### Light Mode
- Primary text: `text-gray-900` (almost black)
- Secondary text: `text-gray-700` 
- Tertiary text: `text-gray-600`
- Muted text: `text-gray-500`
- Disabled text: `text-gray-400`

#### Dark Mode  
- Primary text: `text-white`
- Secondary text: `text-white/80`
- Tertiary text: `text-white/60`
- Muted text: `text-white/40`
- Disabled text: `text-white/20`

## Notes
- Always test in both modes after making changes
- Use browser DevTools to check contrast ratios
- Consider colorblind users - don't rely solely on color
- Maintain consistency across similar UI elements
