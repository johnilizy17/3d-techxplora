# Leaderboard Mobile Card Redesign

## Overview
Redesigned the ranking cards to use a stacked/block layout on mobile instead of horizontal flex layout for better mobile usability.

## Mobile Layout (< sm breakpoint)

### Structure
```
┌─────────────────────────────────────┐
│ [Rank] [Avatar] Name          [XP]  │  ← Top Row
│        ━━━━━━━━━━━━━━━━━━━━━━━━━━  │  ← Level Progress
│        Lvl 5              ↑ Up      │  ← Bottom Row
│              ⭐ You                  │  ← Current User Badge
└─────────────────────────────────────┘
```

### Implementation

Replace the AnimatePresence section with this dual-layout approach:

```jsx
<motion.div className="group bg-white dark:bg-white/5 backdrop-blur-md rounded-2xl border-2 ...">
    {/* Highlight indicator for current user */}
    {user?.id === item.id && (
        <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-indigo-500 to-purple-600 ..." />
    )}

    {/* MOBILE LAYOUT - Stacked */}
    <div className="sm:hidden p-4 space-y-3">
        {/* Top Row: Rank + Avatar/Name + XP */}
        <div className="flex items-center gap-3">
            {/* Rank Badge - 10x10 */}
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-base shrink-0 ...">
                {item.rank}
            </div>

            {/* Avatar + Name - Flex-1 */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-xl ... shrink-0">
                    <User size={20} />
                    {item.avatar && <img src={item.avatar} ... />}
                </div>
                <div className="truncate">
                    <h4 className="text-sm font-black ... truncate">
                        {item.name}
                    </h4>
                    <p className="text-[9px] font-bold ...">
                        {item.role}
                    </p>
                </div>
            </div>

            {/* XP Badge - Shrink-0 */}
            <div className="px-3 py-1.5 ... shrink-0">
                <span className="text-sm font-black ...">
                    {item.xp.toLocaleString()}
                </span>
            </div>
        </div>

        {/* Bottom Row: Level Progress + Trend */}
        <div className="flex items-center justify-between pl-13">
            {/* Level Progress Bar */}
            <div className="flex items-center gap-2">
                <div className="w-24 h-1.5 bg-gray-200 dark:bg-white/5 rounded-full ...">
                    <div
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 ..."
                        style={{ width: `${(item.level % 10) * 10}%` }}
                    />
                </div>
                <span className="text-[8px] font-black ... whitespace-nowrap">
                    Lvl {item.level}
                </span>
            </div>

            {/* Trend Indicator */}
            <div className="flex items-center gap-1">
                {item.trend === 'up' && <ArrowUp size={10} ... />}
                {item.trend === 'down' && <ArrowDown size={10} ... />}
                <span className="text-[8px] font-black uppercase ...">
                    {item.trend === 'same' ? 'Same' : item.trend}
                </span>
            </div>
        </div>

        {/* Current User Badge */}
        {user?.id === item.id && (
            <div className="text-center">
                <span className="inline-block px-3 py-1 bg-indigo-100 dark:bg-indigo-500/20 border border-indigo-300 dark:border-indigo-500/30 rounded-lg text-[10px] font-black text-indigo-600 dark:text-[#a6b1ff] uppercase tracking-wider">
                    ⭐ You
                </span>
            </div>
        )}
    </div>

    {/* DESKTOP LAYOUT - Flex (unchanged) */}
    <div className="hidden sm:flex items-center px-6 lg:px-8 py-5">
        {/* ... existing desktop layout ... */}
    </div>
</motion.div>
```

## Key Mobile Features

### Top Row
- **Rank Badge**: 10x10 rounded square, gradient for top 3
- **Avatar**: 10x10 rounded, with user icon placeholder
- **Name**: Truncated text, 2 lines (name + role)
- **XP Badge**: Amber gradient, right-aligned

### Bottom Row  
- **Level Progress**: 24px wide progress bar + "Lvl X" label
- **Trend**: Small arrow icon + text (Up/Down/Same)

### Current User Indicator
- Vertical gradient bar on left edge (absolute positioned)
- Centered badge at bottom: "⭐ You"

## Responsive Breakpoints

- **Mobile** (`< sm`): Stacked layout with `space-y-3`
- **Tablet+** (`sm+`): Horizontal flex layout (existing design)

## Spacing & Sizing

### Mobile
- Container padding: `p-4`
- Gap between rows: `space-y-3`
- Gap in top row: `gap-3`
- Gap in bottom row: `gap-2`
- Rank/Avatar size: `w-10 h-10`
- XP padding: `px-3 py-1.5`
- Progress bar: `w-24 h-1.5`
- Font sizes: `text-sm` (name), `text-[9px]` (role), `text-[8px]` (level/trend)

### Desktop (unchanged)
- Container padding: `px-6 lg:px-8 py-5`
- Rank/Avatar size: `w-10/w-12 h-10/h-12`
- Font sizes: `text-base` (name), `text-[10px]` (role), `text-[9px]` (level/trend)

## Benefits

1. **No Horizontal Overflow**: All content stacks vertically
2. **Better Readability**: Larger touch targets, clearer hierarchy
3. **More Space**: Name and XP get more room
4. **Cleaner Design**: Level progress bar is full-width
5. **Clear User Indicator**: Centered badge is more prominent

## Implementation Notes

- Use `sm:hidden` for mobile layout
- Use `hidden sm:flex` for desktop layout
- Keep all existing desktop styles unchanged
- Maintain animation and hover states
- Preserve current user highlighting logic
