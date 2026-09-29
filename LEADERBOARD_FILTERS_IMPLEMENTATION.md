# Leaderboard Filters Implementation

## Summary
Add time filter, date filter, and location filters to the Leaderboard page at `v2/src/pages/Leaderboard.jsx`

## Required Changes

### 1. Add State Variables
```javascript
const [timeFilter, setTimeFilter] = useState('all'); // all, today, week, month
const [dateRange, setDateRange] = useState({ start: null, end: null });
const [locationFilter, setLocationFilter] = useState('all'); // all, or specific country/state
```

### 2. Add Filter UI Components
Place filter controls below the header, above the leaderboard:

```javascript
{/* Filters Section */}
<div className="mb-8 p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    
    {/* Time Filter */}
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
        Time Period
      </label>
      <select
        value={timeFilter}
        onChange={(e) => setTimeFilter(e.target.value)}
        className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5"
      >
        <option value="all">All Time</option>
        <option value="today">Today</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
      </select>
    </div>

    {/* Date Range Filter */}
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
        Custom Date Range
      </label>
      <div className="flex gap-2">
        <input
          type="date"
          value={dateRange.start || ''}
          onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5"
        />
        <input
          type="date"
          value={dateRange.end || ''}
          onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5"
        />
      </div>
    </div>

    {/* Location Filter */}
    <div>
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
        Location
      </label>
      <select
        value={locationFilter}
        onChange={(e) => setLocationFilter(e.target.value)}
        className="w-full px-4 py-2 rounded-xl border border-gray-300 dark:border-white/10 bg-white dark:bg-white/5"
      >
        <option value="all">All Locations</option>
        <option value="nigeria">Nigeria</option>
        <option value="ghana">Ghana</option>
        <option value="kenya">Kenya</option>
        <option value="south-africa">South Africa</option>
        {/* Add more countries as needed */}
      </select>
    </div>
  </div>
  
  {/* Clear Filters Button */}
  <button
    onClick={() => {
      setTimeFilter('all');
      setDateRange({ start: null, end: null });
      setLocationFilter('all');
    }}
    className="mt-4 px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
  >
    Clear All Filters
  </button>
</div>
```

### 3. Update Filter Logic
Replace the existing `filteredData` logic:

```javascript
const filteredData = leaderboardData.filter(item => {
    // Search filter
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Time filter
    let matchesTime = true;
    if (timeFilter !== 'all' && item.date) {
        const itemDate = new Date(item.date);
        const now = new Date();
        
        if (timeFilter === 'today') {
            matchesTime = itemDate.toDateString() === now.toDateString();
        } else if (timeFilter === 'week') {
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            matchesTime = itemDate >= weekAgo;
        } else if (timeFilter === 'month') {
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            matchesTime = itemDate >= monthAgo;
        }
    }
    
    // Date range filter
    let matchesDateRange = true;
    if ((dateRange.start || dateRange.end) && item.date) {
        const itemDate = new Date(item.date);
        if (dateRange.start) {
            matchesDateRange = itemDate >= new Date(dateRange.start);
        }
        if (dateRange.end && matchesDateRange) {
            matchesDateRange = itemDate <= new Date(dateRange.end);
        }
    }
    
    // Location filter
    let matchesLocation = true;
    if (locationFilter !== 'all' && item.location) {
        matchesLocation = item.location.toLowerCase() === locationFilter.toLowerCase();
    }
    
    return matchesSearch && matchesTime && matchesDateRange && matchesLocation;
});
```

### 4. Add Icons Import
Update the lucide-react import to include Filter and Calendar icons:
```javascript
import { Trophy, Medal, Crown, Timer, Filter, Search, ArrowUp, ArrowDown, User, Sparkles, Calendar, MapPin } from 'lucide-react';
```

### 5. Backend API Updates (if needed)
The leaderboard APIs may need to accept filter parameters:
- `time`: 'today', 'week', 'month'
- `start_date`: ISO date string
- `end_date`: ISO date string  
- `location`: country/state name

Update API calls in `v2/src/redux/api/leaderboardApi.js` to pass filter parameters.

## Implementation Steps
1. Add state variables for filters
2. Add filter UI components
3. Update filtering logic
4. Test with different filter combinations
5. Update API endpoints if backend filtering is needed
6. Add loading states for filter changes

## Notes
- Keep existing tab functionality (weekly, monthly, yearly, admin, quiz, group)
- Filters should work alongside search functionality
- Consider adding filter count badge to show active filters
- Mobile responsive design needed for filter controls
