import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base API configuration
export const baseApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        // baseUrl: 'http://localhost:8000/api/v1', // Local API for testing
        baseUrl: 'https://api.techxplora.co/api/v1', // Production API
        prepareHeaders: (headers, { getState }) => {
            // Get token from auth state
            const token = getState().auth.token;

            // If we have a token, include it in the headers
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            headers.set('Content-Type', 'application/json');
            return headers;
        },
    }),
    tagTypes: ['Auth', 'Question', 'Teacher', 'Student', 'Course', 'Quiz'],
    endpoints: () => ({}),
});

export default baseApi;
