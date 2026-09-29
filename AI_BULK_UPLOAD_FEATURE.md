# AI-Powered Bulk Question Upload Feature

## Overview
The Bulk Upload feature uses AI to intelligently parse and structure quiz questions from various file formats. Upload questions in any format and let AI handle the parsing automatically!

## Supported File Formats ✅
- **Excel (.xlsx, .xls)** - Spreadsheets with structured data
- **PDF (.pdf)** - Scanned or digital PDF documents
- **Word (.doc, .docx)** - Microsoft Word documents
- **Text (.txt)** - Plain text files

## How It Works

### 1. File Upload
Users can drag and drop or browse to select a file containing quiz questions.

### 2. Text Extraction
The system uses specialized libraries to extract text:
- **PDF.js** - Extracts text from PDF documents (all pages)
- **Mammoth** - Extracts text from Word documents (.docx)
- **XLSX** - Parses Excel spreadsheets
- **Native** - Reads plain text files

### 3. AI Processing
- Extracted text is sent to OpenRouter AI
- AI intelligently parses and structures questions
- Handles various question formats automatically

### 4. Validation
AI ensures each question has:
- Clear question text
- Exactly 4 options
- One correct answer marked
- Proper formatting

### 5. Review
Extracted questions load into the review page where teachers can:
- Preview all questions
- Edit any question if needed
- Add to quiz collection

## Example Input Formats

### Format 1: Simple Text
```
What is the capital of Nigeria?
A. Lagos
B. Abuja (correct)
C. Port Harcourt
D. Kano

Which year did Nigeria gain independence?
A. 1950
B. 1960 (correct)
C. 1963
D. 1970
```

### Format 2: Numbered Questions
```
1. What is photosynthesis?
   a) Process of eating
   b) Process of breathing  
   c) Process by which plants make food (correct)
   d) Process of sleeping

2. What is H2O?
   a) Water (correct)
   b) Oxygen
   c) Hydrogen
   d) Carbon dioxide
```

### Format 3: Excel Table
| Question | Option A | Option B | Option C | Option D | Correct |
|----------|----------|----------|----------|----------|---------|
| Capital? | Lagos    | Abuja    | Kano     | Enugu    | B       |

## AI Capabilities

### Smart Parsing
- Recognizes various question formats automatically
- Handles different numbering schemes (1, a, i, etc.)
- Identifies correct answers from markers like (correct), *, ✓, etc.

### Intelligent Completion
- If questions have less than 4 options, AI generates reasonable additional options
- If no correct answer is marked, AI determines it from context
- Cleans up formatting issues automatically

### Error Handling
- Validates all extracted questions
- Filters out invalid or incomplete questions
- Provides clear error messages

## Configuration

### Environment Variables
The feature uses these environment variables:

```env
VITE_OPENROUTER_API_KEY="your_api_key_here"
VITE_OPENROUTER_MODEL="inclusionai/ling-3.0-flash-sante:free"
```

### File Size Limit
Maximum file size: 15MB

## Technical Implementation

### Dependencies
```json
{
  "xlsx": "^0.18.5",           // Excel parsing
  "pdfjs-dist": "latest",       // PDF text extraction
  "mammoth": "latest"           // Word document parsing
}
```

### File Parsing (`src/utils/fileParser.js`)
- `extractTextFromFile()` - Routes to appropriate extractor
- `extractTextFromExcel()` - Excel file parsing
- `extractTextFromPDF()` - PDF text extraction
- `extractTextFromWord()` - Word document parsing
- `parseQuestionsWithAI()` - AI-powered question structuring

### Component (`src/components/teacher/BulkUploadDrawer.jsx`)
- Handles file upload UI
- Manages processing state
- Displays extraction results
- Routes to review page

## Usage Flow

1. Teacher clicks "Bulk Upload" button
2. Selects or drags file into upload area
3. System shows "AI is analyzing..." message
4. AI extracts and structures questions
5. Success message shows number of questions found
6. Teacher clicks "Review X Questions" button
7. Questions load into review page for final editing
8. Teacher can then publish the quiz

## Benefits

### For Teachers
- No need to learn specific template formats
- Upload existing question banks in any format
- Saves time on manual question entry
- AI handles formatting automatically

### For Students
- More diverse question sources
- Better quality questions from various materials
- Consistent question format regardless of source

## Future Enhancements
- Support for images in questions
- Batch processing multiple files
- Question difficulty detection
- Auto-categorization by subject
- Multi-language support

## Troubleshooting

### "No questions found"
- Ensure file contains clear question format
- Check that options are distinguishable
- Verify file isn't corrupted

### "Processing failed"
- Check internet connection
- Verify API key is configured
- Ensure file size is under 15MB

### Questions not parsing correctly
- Try using clearer formatting in source file
- Mark correct answers explicitly
- Use consistent numbering/lettering

## API Usage
Each bulk upload makes one API call to OpenRouter with the file content. The AI model processes the entire content in one request.

**Cost**: Free (using free tier model configured in .env)
