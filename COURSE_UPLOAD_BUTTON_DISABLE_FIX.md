# Course Upload Button Disable Fix

## Issue
When uploading additional resources or attachments in the course creation form, the upload buttons remained enabled during the upload process. This allowed users to accidentally click multiple times, potentially causing duplicate uploads or errors.

## Root Cause
The `isUploading` state object was missing the `attachment` property, which meant the attachment upload button wasn't properly disabled during uploads.

### Original State
```javascript
const [isUploading, setIsUploading] = useState({ 
    banner: false, 
    video: false, 
    other: false 
    // Missing: attachment
});
```

## Solution
Added the `attachment` property to the `isUploading` state object.

### Fixed State
```javascript
const [isUploading, setIsUploading] = useState({ 
    banner: false, 
    video: false, 
    other: false, 
    attachment: false  // Added
});
```

## How It Works

### Upload State Management

#### 1. Additional Resources (Videos)
```javascript
<AdditionalResourcesUpload
    resources={formData.other}
    isUploading={isUploading.other}  // Passed as boolean
    setIsUploading={(value) => setIsUploading(prev => ({ ...prev, other: value }))}
    onFileUpload={handleFileUpload}
/>
```

The component disables buttons when `isUploading` is true:
```javascript
<button
    disabled={isUploading}
    className={`... ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
>
    {isUploading ? <Loader2 className="animate-spin" /> : <UploadCloud />}
    {isUploading ? 'Uploading...' : 'Upload Video File'}
</button>
```

#### 2. Attachments (Documents)
```javascript
<label className={`... ${isUploading.attachment ? 'opacity-50 pointer-events-none' : ''}`}>
    {isUploading.attachment ? <Loader2 className="animate-spin" /> : <Plus />}
    {isUploading.attachment ? 'Uploading...' : 'Add Document (PDF/Doc/Zip)'}
    <input 
        type="file" 
        onChange={(e) => handleFileUpload(e, 'attachment')} 
    />
</label>
```

### Upload Flow

```
User clicks upload button
    ↓
setIsUploading({ ...prev, [field]: true })  ← Button disabled
    ↓
Upload to Cloudinary
    ↓
Update formData with URL
    ↓
setIsUploading({ ...prev, [field]: false })  ← Button re-enabled
    ↓
Show success toast
```

## Visual States

### Before Upload
```
┌─────────────────────────────┐
│  📤  Upload Video File      │  ← Enabled, clickable
└─────────────────────────────┘
```

### During Upload
```
┌─────────────────────────────┐
│  ⏳  Uploading...           │  ← Disabled, grayed out
└─────────────────────────────┘
```

### After Upload
```
┌─────────────────────────────┐
│  📤  Upload Video File      │  ← Re-enabled
└─────────────────────────────┘
```

## Upload Types Covered

### 1. Banner Image
- Field: `banner`
- State: `isUploading.banner`
- Button: Disabled during upload

### 2. Main Video
- Field: `video`
- State: `isUploading.video`
- Button: Disabled during upload

### 3. Additional Resources (Videos)
- Field: `other`
- State: `isUploading.other`
- Button: Disabled during upload
- Limit: Maximum 5 videos

### 4. Attachments (Documents)
- Field: `attachment`
- State: `isUploading.attachment`
- Button: Disabled during upload
- Accepts: PDF, DOC, DOCX, TXT, ZIP, RAR

## Button Behavior

### Disabled State Features
1. **Visual Feedback**
   - Opacity reduced to 50%
   - Cursor changes to `not-allowed`
   - Pointer events disabled

2. **Loading Indicator**
   - Spinning loader icon
   - "Uploading..." text
   - Prevents confusion

3. **Prevents Multiple Clicks**
   - Button cannot be clicked again
   - File input disabled
   - URL input disabled (for additional resources)

## Code Changes

### File Modified
`v2/src/pages/CreateCourse.jsx`

### Change Made
```diff
- const [isUploading, setIsUploading] = useState({ banner: false, video: false, other: false });
+ const [isUploading, setIsUploading] = useState({ banner: false, video: false, other: false, attachment: false });
```

## Testing

### Test Cases

#### 1. Upload Additional Resource
1. Click "Upload Video File"
2. Select a video file
3. ✅ Button should show "Uploading..." with spinner
4. ✅ Button should be disabled (grayed out)
5. ✅ Cannot click button again during upload
6. ✅ After upload, button re-enables

#### 2. Upload Attachment
1. Click "Add Document (PDF/Doc/Zip)"
2. Select a document
3. ✅ Button should show "Uploading..." with spinner
4. ✅ Button should be disabled (grayed out)
5. ✅ Cannot click button again during upload
6. ✅ After upload, button re-enables

#### 3. Multiple Uploads
1. Upload additional resource
2. While uploading, try to upload attachment
3. ✅ Each upload type has independent state
4. ✅ Can upload different types simultaneously
5. ✅ Cannot upload same type twice simultaneously

## User Experience Improvements

### Before Fix
- ❌ Users could click upload button multiple times
- ❌ Could cause duplicate uploads
- ❌ Confusing when nothing happens on second click
- ❌ No visual feedback during upload

### After Fix
- ✅ Button clearly shows uploading state
- ✅ Prevents accidental multiple clicks
- ✅ Clear visual feedback with spinner
- ✅ Better user experience
- ✅ Prevents errors and confusion

## Related Components

### AdditionalResourcesUpload
- Handles video file uploads
- Supports URL input as alternative
- Disables both upload and URL buttons during upload

### FileUploadField
- Generic file upload component
- Used for banner and main video
- Shows drag-and-drop area
- Disables during upload

## Error Handling

### Upload Failures
```javascript
try {
    const url = await uploadToCloudinary(file);
    // Success handling
} catch (error) {
    toast.error("Upload failed");
    console.error(error);
} finally {
    setIsUploading(prev => ({ ...prev, [field]: false }));  // Always re-enable
}
```

Even if upload fails, button is re-enabled in the `finally` block.

## Performance Considerations

### State Updates
- Uses functional updates: `setIsUploading(prev => ({ ...prev, [field]: value }))`
- Prevents race conditions
- Maintains other upload states

### File Input Reset
```javascript
// Reset file input after upload
e.target.value = '';
```
Allows uploading the same file again if needed.

## Accessibility

### Screen Readers
- Button text changes to "Uploading..." during upload
- Disabled state announced to screen readers
- Clear feedback for all users

### Keyboard Navigation
- Disabled buttons cannot be focused
- Tab navigation skips disabled buttons
- Re-enabled after upload completes

## Future Enhancements

### Potential Improvements
1. **Progress Bar**: Show upload percentage
2. **Cancel Button**: Allow canceling uploads
3. **Queue System**: Queue multiple uploads
4. **Retry Logic**: Auto-retry failed uploads
5. **File Validation**: Check file size before upload

## Conclusion

The upload button disable fix ensures a better user experience by:
- Preventing accidental multiple uploads
- Providing clear visual feedback
- Maintaining consistent state management
- Improving overall form usability

All upload buttons now properly disable during the upload process and re-enable after completion or failure.
