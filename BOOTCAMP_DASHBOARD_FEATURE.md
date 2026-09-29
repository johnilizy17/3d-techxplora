# Bootcamp Dashboard Feature

## Overview
Complete applicant dashboard for the TechXplora Bootcamp program, showing application status, progress timeline, and upcoming events.

## Location
- **Path**: `/dashboard/bootcamp`
- **File**: `v2/src/pages/BootcampDashboard.jsx`
- **Route**: Added to `v2/src/pages/index.jsx`

## Features Implemented

### 1. Dashboard Cards (6 Status Cards)
Responsive grid layout displaying:

#### Application Status
- Icon: CheckCircle2 (green)
- Shows approval status
- Displays submission date

#### Quiz Status
- Icon: Trophy (purple)
- Shows completion status
- Assessment tracking

#### Quiz Score
- Icon: Award (orange)
- Large percentage display
- Performance indicator

#### Review Status
- Icon: Clock (cyan)
- Application review progress
- Status badge

#### Selection Status
- Icon: Sparkles (green gradient)
- Special celebration card
- Prominent success message

#### DataCamp Invitation
- Icon: BookOpen (blue)
- Invitation status
- Email notification reminder

### 2. Progress Timeline
Visual 8-step timeline with:
- Registration
- Profile Completed
- Application Submitted
- Quiz Completed
- Under Review
- Selected
- Orientation
- Learning Started

**Features**:
- Completed steps: Green with checkmark
- Current step: Blue with pulse animation
- Pending steps: Gray with dot
- Connected vertical lines
- Date stamps for each step

### 3. Learning Path Section
Card displaying:
- Track name (e.g., Data Analytics)
- Total courses count
- Estimated duration
- Progress bar with animation
- Purple/pink gradient design

### 4. Recent Notifications (Right Column)
Notification feed showing:
- Success/info type indicators
- Notification title
- Relative time stamps
- Hover effects
- Color-coded dots (green for success, blue for info)

### 5. Upcoming Events (Right Column)
Event cards with:
- Event title
- Date and time
- Calendar and clock icons
- Blue/purple gradient backgrounds
- Hover effects with chevron animation

### 6. Quick Links Section
Action buttons:
- **Apply Again**: Disabled state (grayed out)
- **Download Certificate**: 
  - Enabled only when selected
  - Green gradient design
  - Shows eligibility status

## Design System

### Colors
- Primary: `#4ADE80` (Green accent)
- Purple: `#A78BFA`
- Orange: `#F59E0B`
- Cyan: `#06B6D4`

### Components Used
- Framer Motion for animations
- Lucide React icons
- shadcn/ui Button component
- Custom status badges
- Glassmorphism cards

### Responsive Design
- Mobile: Single column layout
- Tablet: Grid adapts to 2 columns
- Desktop: 3-column grid for status cards, 2:1 ratio for main content

### Dark/Light Mode Support
- Uses TechXplora color scheme
- Automatic theme detection
- Card backgrounds: `bg-card`
- Borders: `border-border`
- Text: `text-foreground` / `text-muted-foreground`

## Dummy Data Structure

```javascript
const applicationData = {
  applicant: {
    name, email, applicationId, submittedDate
  },
  status: {
    application, quiz, quizScore, review, selection, datacampInvite
  },
  timeline: [{ step, status, date }, ...],
  learningPath: {
    track, progress, courses, estimatedDuration
  },
  notifications: [{ id, title, date, type }, ...],
  events: [{ id, title, date, time }, ...]
}
```

## Animation Sequence
Staggered entrance animations:
- Header: 0s
- Status cards: 0.1s - 0.6s
- Timeline: 0.7s
- Learning path: 0.8s
- Notifications: 0.9s
- Events: 1.0s
- Quick links: 1.1s

## Status Badge Colors
Dynamic color function:
- `approved/completed/selected/sent`: Green
- `pending`: Yellow
- `rejected`: Red
- Default: Gray

## Navigation
- Access via: `http://localhost:5173/dashboard/bootcamp`
- Can be linked from bootcamp application success page
- Can be linked from user dashboard

## Future Backend Integration
Replace dummy data with API calls:
- Fetch application status
- Load timeline progress
- Get notifications
- Retrieve events
- Check certificate eligibility

## Files Modified
1. ✅ `v2/src/pages/BootcampDashboard.jsx` - Complete dashboard implementation
2. ✅ `v2/src/pages/index.jsx` - Added route and import
3. ✅ `v2/BOOTCAMP_DASHBOARD_FEATURE.md` - This documentation

## Related Features
- Bootcamp landing page: `/bootcamp`
- Bootcamp application: `/bootcamp/apply`
- Country/state dropdowns: `v2/src/data/countries.js`

## Accessibility
- Proper semantic HTML
- Icon + text labels
- Color contrast compliant
- Keyboard navigation support
- Screen reader friendly status badges

## Mobile Optimization
- Touch-friendly targets
- Responsive grid system
- Scroll optimization
- Bottom navigation compatible
