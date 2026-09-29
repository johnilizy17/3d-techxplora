# Syllabus Excel Upload Feature

## Overview
The Syllabus page now supports bulk import of syllabus content via Excel files. Users can choose between manual entry (one-by-one) or Excel upload (bulk import).

## Features

### 1. Upload Modal
When clicking "Add Topic", users see two options:
- **Manual Entry**: Opens the existing drawer for adding topics one by one
- **Upload Excel**: Allows bulk import from an Excel file

### 2. Sample Excel Template
Users can download a sample Excel template with the correct format:
- **Columns**: Main Topic, Subject, Description, Sub-Topic
- **Format**: Each row represents a sub-topic under a main topic
- **Example**:
  ```
  Main Topic                    | Subject           | Description                      | Sub-Topic
  Introduction to Programming   | Computer Science  | Learn the basics of programming  | Variables and Data Types
  Introduction to Programming   | Computer Science  | Learn the basics of programming  | Control Structures
  Object-Oriented Programming   | Computer Science  | Understanding OOP concepts       | Classes and Objects
  ```

### 3. Excel Processing Logic

The upload follows the same structure as manual entry:

#### Step 1: Parse Excel File
- Read Excel file using `xlsx` library
- Extract columns: Main Topic, Subject, Description, Sub-Topic
- Group sub-topics by their main topic

#### Step 2: Create Main Chapters
For each unique main topic:
```javascript
const chapterPayload = {
    title: mainTopic,
    description: description,
    subject: subject,
    teacher_id: user?.id
};
const response = await createSyllabus(chapterPayload).unwrap();
const syllabusId = response?.data?.id;
```

#### Step 3: Create Sub-Topics
For each sub-topic under the created chapter:
```javascript
await createSubTopic({
    topics: subTopicName,
    syllabus_id: syllabusId
}).unwrap();
```

## API Structure

### Create Main Chapter
**Endpoint**: `POST /syllabus`
**Payload**:
```json
{
  "title": "Introduction to Programming",
  "description": "Learn the basics of programming",
  "subject": "Computer Science",
  "teacher_id": 123
}
```
**Response**:
```json
{
  "data": {
    "id": 456,
    "title": "Introduction to Programming",
    ...
  }
}
```

### Create Sub-Topic
**Endpoint**: `POST /syllabus-topics`
**Payload**:
```json
{
  "topics": "Variables and Data Types",
  "syllabus_id": 456
}
```

## User Experience

1. Click "Add Topic" button
2. Choose "Upload Excel" option
3. Select Excel file from computer
4. System processes file and creates:
   - Main chapters (with title, subject, description)
   - Sub-topics (linked to their parent chapters)
5. Success/error messages show import results
6. Syllabus list refreshes automatically

## Error Handling

- File type validation (only .xlsx and .xls)
- Missing required columns (Main Topic is required)
- API errors are caught and logged
- User sees success count and failure count
- Failed imports don't block successful ones

## Technical Implementation

**Files Modified**:
- `v2/src/pages/Syllabus.jsx`: Added Excel upload logic
- Uses Redux mutations: `useCreateSyllabusMutation`, `useCreateSubTopicMutation`
- Uses `xlsx` library for Excel parsing
- Uses `sonner` for toast notifications

**Key Functions**:
- `downloadSampleExcel()`: Generates and downloads sample template
- `handleExcelUpload()`: Processes uploaded Excel file
- `handleManualEntry()`: Opens manual entry drawer
- `handleFileUpload()`: Triggers file input

## Notes

- The Excel upload follows the exact same API structure as manual entry
- Each main topic is created first, then its sub-topics are added separately
- This ensures data consistency with the existing manual entry flow
- The sample template includes all required columns with example data
