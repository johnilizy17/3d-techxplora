import axios from 'axios';

/**
 * OpenRouter AI API utility
 * Provides consistent interface for making OpenRouter API calls
 */

const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';
const DEFAULT_MODEL = import.meta.env.VITE_OPENROUTER_MODEL || 'inclusionai/ling-3.0-flash-sante:free';

/**
 * Call OpenRouter chat completions API
 * @param {string} prompt - The prompt to send to the AI
 * @param {object} options - Additional options
 * @returns {Promise<object>} - The AI response
 */
export async function callOpenRouter(prompt, options = {}) {
    const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
    
    if (!apiKey || apiKey === 'your_openrouter_api_key_here') {
        throw new Error('OpenRouter API key not configured');
    }

    const {
        model = DEFAULT_MODEL,
        temperature = 0.7,
        maxTokens = 4000,
        appTitle = 'TechXplora'
    } = options;

    console.log('📡 Calling OpenRouter API...');
    console.log('🔑 API Key:', apiKey ? `Found (${apiKey.substring(0, 15)}...)` : 'Not found');
    console.log('🤖 Model:', model);
    console.log('📍 Referer:', window.location?.origin || 'http://localhost:5173');

    try {
        const response = await axios({
            method: 'POST',
            url: `${OPENROUTER_BASE_URL}/chat/completions`,
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': window.location?.origin || 'http://localhost:5173',
                'X-Title': appTitle
            },
            data: {
                model,
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                temperature,
                max_tokens: maxTokens
            }
        });

        console.log('✅ Response received:', response.status);
        
        const content = response.data.choices[0]?.message?.content || '';
        
        if (!content) {
            throw new Error('Empty response from OpenRouter API');
        }

        return content;
    } catch (error) {
        console.error('❌ OpenRouter API error:', error.message);
        
        if (error.response) {
            console.error('📋 Error details:', {
                status: error.response.status,
                statusText: error.response.statusText,
                data: error.response.data,
                url: error.config?.url
            });
        }
        
        throw error;
    }
}

/**
 * Parse JSON response from AI, handling common formatting issues
 * @param {string} rawText - Raw text response from AI
 * @returns {object|null} - Parsed JSON or null if parsing fails
 */
export function parseAIJsonResponse(rawText) {
    try {
        // Remove markdown code fences
        let cleaned = rawText
            .replace(/```json\n?/g, '')
            .replace(/```\n?/g, '')
            .trim();
        
        // Fix common JSON issues
        cleaned = cleaned.replace(/\[\.\.\.]/g, '[]'); // Replace [...] placeholders
        cleaned = cleaned.replace(/,(\s*[}\]])/g, '$1'); // Remove trailing commas
        cleaned = cleaned.replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":'); // Quote property names
        cleaned = cleaned.replace(/\/\/.*/g, ''); // Remove line comments
        cleaned = cleaned.replace(/\/\*[\s\S]*?\*\//g, ''); // Remove block comments
        
        return JSON.parse(cleaned);
    } catch (err) {
        console.error("JSON Parse Error:", err.message);
        console.error("Failed to parse:", rawText.substring(0, 200) + '...');
        return null;
    }
}
