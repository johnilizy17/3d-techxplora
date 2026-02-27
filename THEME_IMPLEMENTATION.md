# Dark Mode / Light Mode Implementation Guide

## Overview
The application now supports global dark mode and light mode switching. The theme preference is persisted in localStorage and applies across the entire application.

## How It Works

### 1. Theme Context (`v2/src/contexts/ThemeContext.jsx`)
- Manages global theme state
- Persists preference to localStorage
- Defaults to dark mode
- Automatically applies/removes the `dark` class on `document.documentElement`

### 2. Theme Provider
The `ThemeProvider` wraps the entire app in `App.jsx`, making the theme available everywhere.

### 3. Using the Theme in Components

```jsx
import { useTheme } from '@/contexts/ThemeContext';

function MyComponent() {
  const { darkMode, toggleTheme } = useTheme();
  
  return (
    <div>
      <p>Current mode: {darkMode ? 'Dark' : 'Light'}</p>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
}
```

## CSS Variables

### Light Mode (`:root`)
- `--background`: White background
- `--foreground`: Dark text
- `--app-bg`: 255 255 255
- `--app-text`: 10 10 10

### Dark Mode (`.dark`)
- `--background`: Dark background
- `--foreground`: Light text
- `--app-bg`: 10 10 10
- `--app-text`: 255 255 255

## Best Practices for Theme-Aware Components

### 1. Use Tailwind's Theme-Aware Classes
```jsx
// Good - automatically adapts to theme
<div className="bg-background text-foreground">

// Avoid - hardcoded colors
<div className="bg-[#0a0a0a] text-white">
```

### 2. Use CSS Variables
```jsx
// Good
<div className="bg-background border-border">

// Good for custom colors
<div style={{ backgroundColor: 'hsl(var(--background))' }}>
```

### 3. Conditional Styling (when needed)
```jsx
// For specific cases where you need different styles
<div className="bg-white/5 dark:bg-white/10">
```

### 4. Updated Utility Classes
- `.glass-morphism` - Now adapts to light/dark mode
- `.glass-morphism-strong` - Stronger glass effect with theme support
- `.aurora-glow` - Glow effect that adapts to theme

## Components Updated

1. **App.jsx** - Wrapped with ThemeProvider
2. **Layout.jsx** - Uses `bg-background text-foreground`
3. **DashboardLayout.jsx** - Uses `bg-background`
4. **Profile.jsx** - Theme toggle control
5. **index.css** - Theme-aware CSS variables and utilities

## Adding Theme Toggle to Other Pages

```jsx
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun } from 'lucide-react';
import { Switch } from "@/components/ui/switch";

function SettingsPage() {
  const { darkMode, toggleTheme } = useTheme();
  
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {darkMode ? <Moon size={20} /> : <Sun size={20} />}
        <span>{darkMode ? 'Dark Mode' : 'Light Mode'}</span>
      </div>
      <Switch checked={darkMode} onCheckedChange={toggleTheme} />
    </div>
  );
}
```

## Testing

1. Toggle theme in Profile settings
2. Verify theme persists after page reload
3. Check all pages adapt correctly
4. Test glass-morphism effects in both modes
5. Verify scrollbar colors change appropriately

## Troubleshooting

### Theme not applying
- Check if ThemeProvider wraps your component tree
- Verify localStorage has 'darkMode' key
- Check browser console for errors

### Hardcoded colors not changing
- Replace hardcoded colors with Tailwind theme classes
- Use `bg-background`, `text-foreground`, etc.
- For custom colors, use CSS variables

### Flashing on page load
- The theme is applied immediately on mount
- If you see flashing, ensure ThemeContext initializes before rendering
