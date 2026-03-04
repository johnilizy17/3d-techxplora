# Video URL Input Feature

## Overview
Added the ability for users to input video URLs (YouTube, Google Drive, or direct video links) instead of uploading video files when creating or editing courses. This feature is available for both main videos and additional resource videos.

## Changes Made

### 1. CreateCourse.jsx (`v2/src/pages/CreateCourse.jsx`)

#### Updated `handleFileUpload` Function
- Added URL input detection: checks if `e.target.url` exists
- URL validation: validates YouTube, Google Drive, and direct video links using regex
- Direct URL assignment: sets video URL without uploading to Cloudinary
- Maintains backward compatibility with file uploads

#### Updated `FileUploadField` Component
- Added toggle buttons: "Upload File" vs "Use Link" (only for video fields)
- Added URL input field with placeholder text
- Added URL submission handler with validation
- Added remove video handler that clears the URL
- Improved light mode styling for better contrast
- Added `setFormData` prop for direct state updates
- **FIXED**: Made file input clickable for video uploads (removed conditional click blocking)

#### New `AdditionalResourcesUpload` Component
- Dedicated component for managing additional video resources
- Toggle between file upload and URL input
- Displays list of added resources with remove buttons
- Supports up to 5 additional video modules
- URL validation for YouTube, Google Drive, and direct video links
- Light and dark mode support

#### Updated Step2 Component
- Passed `setFormData` prop to FileUploadField components
- Replaced inline additional resources UI with AdditionalResourcesUpload component

### 2. EditCourse.jsx (`v2/src/pages/EditCourse.jsx`)

Applied the same changes as CreateCourse.jsx:
- Updated `handleFileUpload` function with URL support
- Updated `FileUploadField` component with toggle and URL input
- **FIXED**: Made file input clickable for video uploads
- Updated Step2 component to pass `setFormData` prop

## Features

### Main Video Upload
1. **Toggle Buttons**: Users can switch between "Upload File" and "Use Link"
2. **URL Input Field**: Clean input field for pasting video links
3. **File Upload**: Click to browse or drag-and-drop video files
4. **Validation**: Validates URL format before accepting
5. **Remove Button**: Clear video URLs with one click

### Additional Resources Upload
1. **Dual Mode Interface**: 
   - Default: Shows "Upload Video File" button and "Or Use Video Link" button
   - URL Mode: Shows URL input field with "Add Link" and "Cancel" buttons
2. **Resource List**: Displays all added resources with video icons
3. **Remove Functionality**: Individual remove buttons for each resource
4. **Max Limit**: Enforces 5 additional modules maximum
5. **Seamless Switching**: Easy toggle between upload and URL input modes

### Supported Platforms
- YouTube (youtube.com, youtu.be)
- Google Drive (drive.google.com)
- Direct video links (.mp4, .webm, .ogg)

### User Experience
- Seamless switching between upload and URL input modes
- Clear visual feedback with success/error toasts
- Remove button to clear video URLs
- Light and dark mode support
- Intuitive interface with clear labels

## Technical Details

### URL Validation Regex
```javascript
/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|drive\.google\.com|.*\.(mp4|webm|ogg)).*$/i
```

### Event Structure
```javascript
// URL input event
{ target: { files: [], url: 'https://youtube.com/...' } }

// File upload event (unchanged)
{ target: { files: [File], url: undefined } }
```

### Component Props
```javascript
// AdditionalResourcesUpload
{
  resources: string[],           // Array of video URLs
  onAdd: (url: string) => void,  // Callback when adding resource
  onRemove: (index: number) => void, // Callback when removing resource
  isUploading: boolean,          // Upload state
  setIsUploading: (value: boolean) => void // Upload state setter
}
```

## Bug Fixes
1. **Fixed video file upload for main video**: Removed conditional click blocking that prevented video file uploads from working
2. **Fixed video file upload for additional resources**: 
   - Changed from `<label>` with hidden input to `<button>` that triggers file input
   - Moved file input outside conditional rendering to ensure it's always available
   - Added file input reset after successful upload
   - Added proper state management for switching between upload and URL modes
3. **Improved clickability**: Made entire upload area clickable for both images and videos
4. **Better state management**: Direct state updates for video removal

## Benefits
1. **Faster Course Creation**: No need to upload large video files
2. **Bandwidth Savings**: Uses existing hosted videos
3. **Flexibility**: Supports multiple video platforms
4. **User Choice**: Users can choose between upload and URL input
5. **Consistent Experience**: Same interface for main and additional videos

## Testing Checklist
- [x] Toggle between "Upload File" and "Use Link" works for main video
- [x] File upload works for main video
- [x] YouTube URLs are accepted and saved for main video
- [x] Google Drive URLs are accepted and saved for main video
- [x] Direct video URLs (.mp4, .webm, .ogg) are accepted for main video
- [x] Invalid URLs show error message
- [x] Remove button clears video URL
- [x] Additional resources file upload works
- [x] Additional resources URL input works
- [x] Additional resources can be removed individually
- [x] Max 5 additional resources limit is enforced
- [ ] Light mode styling is readable
- [ ] Dark mode styling is readable
- [ ] Changes persist when navigating between steps
- [ ] Backend accepts video URLs (not just Cloudinary URLs)

## Notes
- The backend must be configured to accept video URLs in addition to Cloudinary URLs
- URL validation is client-side only; backend should also validate URLs
- Consider adding preview functionality for URL-based videos in future updates
- Additional resources now have a dedicated component for better maintainability
