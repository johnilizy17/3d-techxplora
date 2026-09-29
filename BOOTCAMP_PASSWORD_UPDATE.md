# Bootcamp Application - Password Field Addition

## Summary
Added password and password confirmation fields to Step 1 of the bootcamp application form.

## Changes Made

### 1. Frontend (v2/src/pages/BootcampApplication.jsx)
- Added `Lock`, `Eye`, and `EyeOff` icons from lucide-react
- Added `password` and `password_confirmation` fields to formData state
- Added `showPassword` and `showConfirmPassword` state for toggling visibility
- Updated Step1 component with password input fields
- Added password validation in `validateStep`:
  - Minimum 8 characters
  - Must contain uppercase letter
  - Must contain lowercase letter
  - Must contain number
  - Password confirmation must match
- Updated gender dropdown to lowercase values (male, female, other)
- Integrated API submission with `useSubmitBootcampApplicationMutation`
- Added loading state for submit button

### 2. Backend (TechXploraAPI/app/Http/Controllers/BootcampApplicationController.php)
- Password is handled automatically when creating new user
- Default password format: `{email}_bootcamp_{random4digits}`
- Users can then reset/change password after login

### 3. API Integration (v2/src/redux/api/bootcampApi.js)
- Created new bootcamp API slice with RTK Query
- Endpoint: `POST /bootcamp/applications`
- Maps form field names to API field names:
  - `full_name` → `fullname`
  - `learning_track` → `preferred_track`
  - `experience` → `learning_experience`

## Password Requirements
- Minimum 8 characters
- At least 1 uppercase letter (A-Z)
- At least 1 lowercase letter (a-z)
- At least 1 number (0-9)
- Password confirmation must match

## Next Steps
1. Test the form with password validation
2. Update backend controller to use the provided password when creating user
3. Add email verification after signup
4. Consider adding "Show Password" toggle for better UX
