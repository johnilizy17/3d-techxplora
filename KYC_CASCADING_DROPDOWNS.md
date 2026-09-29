# KYC Cascading Dropdowns Implementation

## Overview
Updated the KYC form to use cascading dropdowns for Nigerian states and Local Government Areas (LGAs), providing a better user experience with validated location data.

## Changes Made

### 1. Created Nigeria States Data File
**File:** `v2/src/data/nigeriaStates.js`
- Contains all 36 Nigerian states + FCT
- Each state includes its complete list of LGAs
- Total of 774 LGAs across all states

### 2. Updated KYC Form
**File:** `v2/src/pages/auth/KYC.jsx`

#### Key Features:
- **State Dropdown**: Select from all Nigerian states
- **LGA Dropdown**: Dynamically populated based on selected state
- **City Input**: Free text field for specific city/town
- **Cascading Logic**: LGA options update automatically when state changes

#### Implementation Details:

```javascript
// State management for cascading dropdowns
const [selectedState, setSelectedState] = useState(user?.state || "");
const [selectedLGA, setSelectedLGA] = useState(user?.lga || "");
const [availableLGAs, setAvailableLGAs] = useState([]);

// Update available LGAs when state changes
useEffect(() => {
    if (selectedState) {
        const stateData = nigeriaStates.find(s => s.state === selectedState);
        if (stateData) {
            setAvailableLGAs(stateData.lgas);
        }
    } else {
        setAvailableLGAs([]);
        setSelectedLGA("");
    }
}, [selectedState]);
```

## User Flow

1. **Select State**: User chooses their state from dropdown
2. **Select LGA**: LGA dropdown becomes enabled and shows only LGAs for selected state
3. **Enter City**: User types their specific city/town name
4. **Enter Postal Code**: User enters postal code
5. **Submit**: Form validates and saves data

## UI/UX Improvements

- **Visual Feedback**: Dropdowns have chevron icons indicating they're selectable
- **Disabled State**: LGA dropdown is disabled until a state is selected
- **Placeholder Text**: Clear instructions ("Select state first" when no state selected)
- **Consistent Styling**: Matches existing form design with purple accent colors
- **Accessibility**: Proper labels and error messages

## Validation

The form validates:
- State must be selected
- LGA must be selected (only after state is chosen)
- City must be at least 2 characters
- All fields are required before submission

## Benefits

1. **Data Accuracy**: Users can only select valid Nigerian states and LGAs
2. **Better UX**: No typing errors in state/LGA names
3. **Faster Input**: Dropdown selection is quicker than typing
4. **Consistent Data**: Backend receives standardized location data
5. **Reduced Errors**: Eliminates spelling mistakes and invalid locations

## Testing Checklist

- [ ] State dropdown shows all 37 states (36 + FCT)
- [ ] LGA dropdown is disabled when no state is selected
- [ ] LGA dropdown populates correctly when state is selected
- [ ] Changing state clears previously selected LGA
- [ ] Form validation works for all fields
- [ ] Data submits correctly to backend
- [ ] Existing user data loads properly (if available)
- [ ] Mobile responsive design works correctly

## Future Enhancements

1. Add city/town suggestions based on selected LGA
2. Auto-populate postal code based on location
3. Add search functionality in dropdowns for faster selection
4. Include state capitals as default city options
