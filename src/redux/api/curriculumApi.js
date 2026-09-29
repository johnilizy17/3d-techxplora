import axios from 'axios';
import { baseApi } from './baseApi';

// OpenRouter API integration for Nigerian Curriculum
// OpenRouter provides unified access to multiple free AI models
export const curriculumApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        generateCurriculumWithAI: builder.mutation({
            async queryFn(args) {
                try {
                    const { year } = args || {};
                    const curriculumYear = year || new Date().getFullYear();
                    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
                    const model = import.meta.env.VITE_OPENROUTER_MODEL || 'inclusionai/ling-3.0-flash-sante:free';
                    
                    console.log('🔑 API Key check:', apiKey ? `Found (${apiKey.substring(0, 15)}...)` : 'Not found');
                    console.log('🤖 Model:', model);
                    
                    if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
                        console.warn('⚠️ No valid API key configured');
                        return {
                            error: {
                                status: 'NO_API_KEY',
                                error: 'OpenRouter API key not configured.'
                            }
                        };
                    }
                    
                    const prompt = `Generate Nigerian ${curriculumYear} curriculum for NERDC standards.

Return VALID JSON ONLY (no markdown, no text):
{
  "primary": {
    "classes": [{
      "level": "Primary 1-6",
      "subjects": [{
        "name": "English",
        "description": "Reading and writing skills",
        "topics": [{
          "name": "Alphabet",
          "description": "Learning letters",
          "subtopics": ["Letter sounds", "Writing letters"]
        }]
      }, {
        "name": "Mathematics",
        "description": "Numbers and counting",
        "topics": [{
          "name": "Numbers",
          "description": "Counting 1-100",
          "subtopics": ["Counting", "Addition", "Subtraction"]
        }]
      }]
    }]
  },
  "juniorSecondary": {
    "classes": [{
      "level": "JSS 1-3",
      "subjects": [{
        "name": "Mathematics",
        "description": "Algebra and geometry",
        "topics": [{
          "name": "Algebra",
          "description": "Equations",
          "subtopics": ["Variables", "Solving equations"]
        }]
      }]
    }]
  },
  "seniorSecondary": {
    "classes": [{
      "level": "SSS 1-3",
      "subjects": [{
        "name": "Physics",
        "description": "Matter and energy",
        "topics": [{
          "name": "Mechanics",
          "description": "Motion and forces",
          "subtopics": ["Newton's Laws", "Energy"]
        }]
      }]
    }]
  }
}

Include 6-8 main subjects per level. Keep JSON valid!`;

                    console.log('📡 Making request to OpenRouter API...');
                    console.log('📍 Referer:', window.location?.origin || 'http://localhost:5173');

                    const response = await axios.post(
                        'https://openrouter.ai/api/v1/chat/completions',
                        {
                            model: model,
                            messages: [
                                {
                                    role: 'user',
                                    content: prompt
                                }
                            ]
                        },
                        {
                            headers: {
                                'Authorization': `Bearer ${apiKey}`,
                                'Content-Type': 'application/json',
                                'HTTP-Referer': window.location?.origin || 'http://localhost:5173',
                                'X-Title': 'TechXplora Nigeria Curriculum'
                            }
                        }
                    );

                    console.log('✅ Response received:', response);

                    const content = response.data.choices[0]?.message?.content || '';
                    
                    if (!content) {
                        throw new Error('Empty response from API');
                    }
                    
                    console.log('📄 Raw content length:', content.length);
                    
                    // Clean response and parse JSON
                    let cleanContent = content
                        .replace(/```json\n?/g, '')
                        .replace(/```\n?/g, '')
                        .trim();
                    
                    // Fix common JSON issues
                    // Replace [...] placeholders with empty arrays
                    cleanContent = cleanContent.replace(/\[\.\.\.]/g, '[]');
                    
                    // Remove trailing commas before closing braces/brackets
                    cleanContent = cleanContent.replace(/,(\s*[}\]])/g, '$1');
                    
                    // Fix unquoted property names (common AI mistake)
                    cleanContent = cleanContent.replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":');
                    
                    // Remove comments if any
                    cleanContent = cleanContent.replace(/\/\/.*/g, '');
                    cleanContent = cleanContent.replace(/\/\*[\s\S]*?\*\//g, '');
                    
                    console.log('📄 Cleaned content, parsing JSON...');
                    
                    let curriculumData;
                    try {
                        curriculumData = JSON.parse(cleanContent);
                        console.log('📊 Parsed curriculum structure:', {
                            hasPrimary: !!curriculumData.primary,
                            hasJuniorSecondary: !!curriculumData.juniorSecondary,
                            hasSeniorSecondary: !!curriculumData.seniorSecondary,
                            sampleSubject: curriculumData.primary?.classes?.[0]?.subjects?.[0],
                            sampleTopic: curriculumData.primary?.classes?.[0]?.subjects?.[0]?.topics?.[0]
                        });
                    } catch (parseError) {
                        console.error('JSON Parse Error:', parseError.message);
                        console.log('Error at position:', 4900, '-', 5000);
                        console.log('Content around error:', cleanContent.substring(4900, 5000));
                        
                        // Try to salvage what we can
                        try {
                            // Find the last valid closing brace and truncate there
                            const lastValidBrace = cleanContent.lastIndexOf('}');
                            if (lastValidBrace > 0) {
                                cleanContent = cleanContent.substring(0, lastValidBrace + 1);
                                curriculumData = JSON.parse(cleanContent);
                                console.log('⚠️ Recovered partial curriculum data');
                            } else {
                                throw parseError;
                            }
                        } catch (recoveryError) {
                            throw new Error(`Invalid JSON from AI: ${parseError.message}`);
                        }
                    }
                    
                    console.log('✅ Curriculum data parsed successfully');
                    return { data: curriculumData };
                } catch (error) {
                    console.error('❌ OpenRouter API error:', error.message);
                    
                    if (error.response) {
                        console.error('📋 Error details:', {
                            status: error.response.status,
                            statusText: error.response.statusText,
                            data: error.response.data
                        });
                    }
                    
                    // Handle axios error response
                    const errorMessage = error.response?.data?.error?.message 
                        || error.message 
                        || 'Failed to generate curriculum with AI';
                    
                    return {
                        error: {
                            status: error.response?.status || 'API_ERROR',
                            error: errorMessage,
                            isApiError: true
                        }
                    };
                }
            },
        }),
    }),
});

export const { 
    useGenerateCurriculumWithAIMutation
} = curriculumApi;
