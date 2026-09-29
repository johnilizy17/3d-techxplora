import * as XLSX from 'xlsx';
import mammoth from 'mammoth';
import * as pdfjsLib from 'pdfjs-dist';
import { callOpenRouter, parseAIJsonResponse } from './openRouterApi';

// Configure PDF.js worker (version 3.11)
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

/**
 * Extract text content from different file types
 */

// Extract text from Excel files
export async function extractTextFromExcel(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            try {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });
                
                let allText = '';
                workbook.SheetNames.forEach(sheetName => {
                    const worksheet = workbook.Sheets[sheetName];
                    const sheetData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
                    
                    sheetData.forEach(row => {
                        allText += row.join(' | ') + '\n';
                    });
                });
                
                resolve(allText);
            } catch (error) {
                reject(error);
            }
        };
        
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
    });
}

// Extract text from PDF files using pdf.js v3.11
export async function extractTextFromPDF(file) {
    try {
        console.log('📄 Starting PDF extraction with PDF.js v3.11...');
        
        const arrayBuffer = await file.arrayBuffer();
        
        // Load PDF document
        const loadingTask = pdfjsLib.getDocument({
            data: arrayBuffer,
        });
        
        const pdf = await loadingTask.promise;
        
        console.log(`📄 PDF loaded: ${pdf.numPages} pages`);
        
        let fullText = '';
        
        // Extract text from each page
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            try {
                const page = await pdf.getPage(pageNum);
                const textContent = await page.getTextContent();
                const pageText = textContent.items
                    .map(item => item.str || '')
                    .filter(str => str.trim().length > 0)
                    .join(' ');
                
                if (pageText.trim()) {
                    fullText += `${pageText}\n\n`;
                }
            } catch (pageError) {
                console.warn(`⚠️ Failed to extract page ${pageNum}:`, pageError.message);
            }
        }
        
        if (!fullText.trim()) {
            throw new Error('PDF appears to be empty or contains only images');
        }
        
        console.log(`✅ Extracted ${fullText.length} characters from ${pdf.numPages} pages`);
        return fullText;
    } catch (error) {
        console.error('PDF extraction error:', error);
        throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
}

// Extract text from Word documents using mammoth
export async function extractTextFromWord(file) {
    try {
        const arrayBuffer = await file.arrayBuffer();
        
        // Convert DOCX to text
        const result = await mammoth.extractRawText({ arrayBuffer });
        
        if (!result.value || result.value.trim().length === 0) {
            throw new Error('Word document appears to be empty');
        }
        
        console.log(`✅ Extracted ${result.value.length} characters from Word document`);
        
        if (result.messages && result.messages.length > 0) {
            console.warn('⚠️ Mammoth warnings:', result.messages);
        }
        
        return result.value;
    } catch (error) {
        console.error('Word extraction error:', error);
        throw new Error(`Failed to extract text from Word document: ${error.message}`);
    }
}

// Extract text from plain text files
export async function extractTextFromTxt(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = (e) => {
            resolve(e.target.result);
        };
        
        reader.onerror = reject;
        reader.readAsText(file);
    });
}

/**
 * Main file parser that routes to appropriate extractor
 */
export async function extractTextFromFile(file) {
    const extension = file.name.split('.').pop().toLowerCase();
    
    console.log('📄 Extracting text from file:', file.name, 'Type:', extension);
    
    switch (extension) {
        case 'xlsx':
        case 'xls':
            return await extractTextFromExcel(file);
        
        case 'pdf':
            return await extractTextFromPDF(file);
        
        case 'doc':
        case 'docx':
            return await extractTextFromWord(file);
        
        case 'txt':
            return await extractTextFromTxt(file);
        
        default:
            throw new Error(`Unsupported file type: ${extension}`);
    }
}

/**
 * Use AI to parse unstructured text into quiz questions format
 */
export async function parseQuestionsWithAI(fileContent, fileName) {
    // Limit content size to prevent token overflow
    const maxContentLength = 15000; // ~4000 tokens
    const truncatedContent = fileContent.length > maxContentLength 
        ? fileContent.substring(0, maxContentLength) + '\n\n[Content truncated...]'
        : fileContent;

    const prompt = `You are a quiz question parser. Extract quiz questions from the following content and structure them properly.

FILE: ${fileName}
CONTENT:
${truncatedContent}

Parse ALL questions found in the content and return them in this EXACT JSON format (no markdown, no extra text):
{
    "questions": [
        {
            "question": "Question text here",
            "options": [
                { "option": "Option A text", "is_correct": false },
                { "option": "Option B text", "is_correct": true },
                { "option": "Option C text", "is_correct": false },
                { "option": "Option D text", "is_correct": false }
            ]
        }
    ]
}

IMPORTANT RULES:
1. Extract ALL questions from the content, no matter the format
2. Each question must have exactly 4 options
3. Only ONE option should have is_correct: true
4. If questions don't have 4 options, create reasonable options based on the question
5. If correct answer isn't marked, intelligently determine it based on context
6. Clean up any formatting issues (extra spaces, line breaks, etc.)
7. If content is in table format (pipe-separated like Excel), parse accordingly
8. Return VALID JSON only - no markdown, no explanations, no apologies
9. If no questions found, return {"questions": []}
10. NEVER respond with text like "I'm sorry" or "I can't" - ALWAYS return the JSON structure

Even if content seems unclear, try your best to extract any quiz-like content into the format above.`;

    console.log('🤖 Sending content to AI for parsing...');
    console.log('📊 Content length:', truncatedContent.length, 'characters');
    
    try {
        const aiResponse = await callOpenRouter(prompt, {
            appTitle: 'TechXplora Bulk Question Parser',
            temperature: 0.3, // Lower temperature for more consistent parsing
            maxTokens: 8000 // Larger context for many questions
        });
        
        console.log('✅ AI parsing complete, validating structure...');
        console.log('📄 AI Response preview:', aiResponse.substring(0, 200));
        
        // Handle case where AI returns text instead of JSON
        if (aiResponse.includes("I'm sorry") || aiResponse.includes("I can't") || aiResponse.includes("I cannot")) {
            console.warn('⚠️ AI returned explanation instead of JSON');
            return {
                questions: [],
                error: 'AI could not parse questions from this format. Please ensure your file contains clear quiz questions with options.'
            };
        }
        
        const parsed = parseAIJsonResponse(aiResponse);
        
        if (!parsed || !parsed.questions || !Array.isArray(parsed.questions)) {
            console.error('❌ Invalid structure:', parsed);
            throw new Error('AI response does not contain valid question structure');
        }
        
        // Validate each question
        const validQuestions = parsed.questions.filter(q => {
            const hasQuestion = q.question && typeof q.question === 'string';
            const hasOptions = Array.isArray(q.options) && q.options.length === 4;
            const hasCorrect = hasOptions && q.options.some(opt => opt.is_correct === true);
            
            if (!hasQuestion || !hasOptions || !hasCorrect) {
                console.warn('⚠️ Invalid question filtered out:', q);
            }
            
            return hasQuestion && hasOptions && hasCorrect;
        });
        
        if (validQuestions.length === 0) {
            return {
                questions: [],
                error: 'No valid questions found. Each question needs a question text, 4 options, and one correct answer.'
            };
        }
        
        console.log(`✅ Extracted ${validQuestions.length} valid questions`);
        
        return validQuestions;
    } catch (error) {
        console.error('❌ AI parsing error:', error);
        throw new Error(`Failed to parse questions: ${error.message}`);
    }
}

/**
 * Main function to process uploaded file and extract questions using AI
 */
export async function processFileWithAI(file) {
    try {
        // Step 1: Extract text content from file
        console.log('📂 Step 1: Extracting text from file...');
        const fileContent = await extractTextFromFile(file);
        
        if (!fileContent || fileContent.trim().length === 0) {
            throw new Error('File appears to be empty');
        }
        
        console.log(`📄 Extracted ${fileContent.length} characters from file`);
        
        // Step 2: Use AI to parse and structure questions
        console.log('🤖 Step 2: Parsing questions with AI...');
        const result = await parseQuestionsWithAI(fileContent, file.name);
        
        // Handle case where result has error
        if (result.error) {
            return {
                success: false,
                questions: [],
                message: result.error
            };
        }
        
        const questions = Array.isArray(result) ? result : result.questions || [];
        
        if (questions.length === 0) {
            return {
                success: false,
                questions: [],
                message: 'No valid quiz questions found in the file. Please ensure your file contains questions with 4 options each.'
            };
        }
        
        return {
            success: true,
            questions,
            message: `Successfully extracted ${questions.length} questions`
        };
    } catch (error) {
        console.error('❌ File processing error:', error);
        return {
            success: false,
            questions: [],
            message: error.message || 'Failed to process file'
        };
    }
}
