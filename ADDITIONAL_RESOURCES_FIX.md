# Additional Resources Upload Fix

## Issue
The normal video file upload for additional resources was not uploading to Cloudinary API - it was only storing URLs locally without actually uploading the files.

## Root Causes
1. The file input click handler was not properly triggering the file browser dialog
2. **The `AdditionalResourcesUpload` component had its own separate `handleFileUpload` function that was directly calling `uploadToCloudinary` instead of using the parent's `handleFileUpload` function**
3. This meant the upload wasn't going through the same flow as the main video upload

## Solution

### Changes Made to `AdditionalResourcesUpload` Component

1. **Added `onFileUpload` Prop**
   - Component now receives the parent's `handleFileUpload` function as a prop
   - This ensures all uploads go through the same Cloudinary upload flow

2. **Updated Internal `handleFileUpload`**
   - Now calls `await onFileUpload(e, 'other')` instead of directly calling `uploadToCloudinary`
   - Removed duplicate upload logic and state management
   - Simplified to just call parent function and reset file input

3. **Updated Component Usage**
   - Added `onFileUpload={handleFileUpload}` prop when rendering `AdditionalResourcesUpload`
   - This connects the component to the parent's upload handler

4. **Improved File Upload Handler**
   - Added optional chaining (`e.target.files?.[0]`) for safer file access
   - File input reset moved to after parent upload completes
   - Better error handling through parent function

5. **Better Click Handlers**
   - Created dedicated `handleFileButtonClick` function for the upload button
   - Created `handleSwitchToUpload` function for switching from URL mode to upload mode
   - Added small timeout (50ms) when switching modes to ensure state updates complete

6. **Enhanced User Experience**
   - Added `disabled` prop to file input when uploading
   - Added `disabled` state to "Or Use Video Link" button during upload
   - Added Enter key support for URL input field
   - Better button states and visual feedback

## Component Structure

```javascript
const AdditionalResourcesUpload = ({ 
  resources, 
  onAdd, 
  onRemove, 
  isUploading, 
  setIsUploading,
  onFileUpload  // NEW: Parent's upload handler
}) => {
  // State
  const fileInputRef = React.useRef(null);
  const [showUrlInput, setShowUrlInput] = React.useState(false);
  const [urlInput, setUrlInput] = React.useState('');

  // Handlers
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Use parent's upload handler
    await onFileUpload(e, 'other');
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };
  
  const handleUrlSubmit = () => { /* ... */ };
  const handleFileButtonClick = () => { /* ... */ };
  const handleSwitchToUpload = () => { /* ... */ };

  // UI
  return (
    <div>
      {/* Resource list */}
      {/* Hidden file input */}
      {/* Upload/URL toggle interface */}
    </div>
  );
};
```

## Parent Component Integration

```javascript
// In CreateCourse.jsx
<AdditionalResourcesUpload 
  resources={formData.other}
  onAdd={(url) => { /* ... */ }}
  onRemove={removeOtherVideo}
  isUploading={isUploading.other}
  setIsUploading={(value) => setIsUploading(prev => ({ ...prev, other: value }))}
  onFileUpload={handleFileUpload}  // Pass parent's upload handler
/>
```

## Main handleFileUpload Function

The parent's `handleFileUpload` function already handles the `'other'` field:

```javascript
const handleFileUpload = async (e, field) => {
  // ... URL handling ...
  
  const file = e.target.files[0];
  if (!file) return;

  setIsUploading(prev => ({ ...prev, [field]: true }));
  try {
    const url = await uploadToCloudinary(file);
    if (field === 'other') {
      if (formData.other.length >= 5) {
        toast.error("Maximum 5 additional videos allowed");
      } else {
        setFormData(prev => ({ ...prev, other: [...prev.other, url] }));
        toast.success("Additional video uploaded");
      }
    }
    // ... other field handling ...
  } catch (error) {
    toast.error("Upload failed");
  } finally {
    setIsUploading(prev => ({ ...prev, [field]: false }));
  }
};
```

## Features

### File Upload Mode (Default)
- Click "Upload Video File" button to browse files
- Files are uploaded to Cloudinary API (same as main video)
- Shows loading state during upload
- Success toast appears after upload
- Click "Or Use Video Link" to switch to URL mode

### URL Input Mode
- Paste YouTube, Google Drive, or direct video links
- Press Enter or click "Add Link" to submit
- Click "Cancel" to return to default mode
- Click "Or Upload File" to switch to file upload and trigger file browser

### Resource Management
- Display all added resources with video icons
- Individual remove buttons for each resource
- Truncated URLs for better display
- Maximum 5 resources enforced

## Testing

### File Upload
- [x] Click "Upload Video File" button opens file browser
- [x] Selecting a file uploads it to Cloudinary
- [x] Upload progress shows loading state
- [x] Success toast appears after upload
- [x] File input resets after upload
- [x] Can upload multiple files sequentially
- [x] Uploaded URLs are stored in formData.other array

### URL Input
- [x] Click "Or Use Video Link" shows URL input
- [x] Can paste and submit URLs
- [x] Enter key submits URL
- [x] Invalid URLs show error message
- [x] Valid URLs are added successfully
- [x] Cancel button returns to upload mode

### Mode Switching
- [x] "Or Upload File" button in URL mode triggers file browser
- [x] State properly resets when switching modes
- [x] No conflicts between upload and URL modes

### Resource Management
- [x] Resources display correctly
- [x] Remove buttons work for each resource
- [x] Maximum 5 resources limit enforced
- [x] Light and dark mode styling works

### API Integration
- [x] Files upload to Cloudinary API
- [x] Cloudinary URLs are stored in formData.other
- [x] formData.other is sent to backend in payload
- [x] Backend receives and stores other array

## Technical Details

### Key Improvements

1. **Unified Upload Flow**
```javascript
// Component uses parent's handler
const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await onFileUpload(e, 'other');  // Uses parent's Cloudinary upload
    if (fileInputRef.current) {
        fileInputRef.current.value = '';
    }
};
```

2. **Parent Handler Integration**
```javascript
// Parent component passes its handler
<AdditionalResourcesUpload 
  onFileUpload={handleFileUpload}
  // ... other props
/>
```

3. **Backend Payload**
```javascript
const payload = {
  // ... other fields
  other: formData.other,  // Array of video URLs
  // ... more fields
};
```

## Files Modified
- `v2/src/pages/CreateCourse.jsx` - Fixed AdditionalResourcesUpload component and integration

## Notes
- The component now uses the same upload flow as the main video
- All uploads go through Cloudinary API
- The backend properly receives and stores the `other` array
- EditCourse.jsx doesn't have additional resources section yet
- All changes maintain backward compatibility
- Light and dark mode support maintained
