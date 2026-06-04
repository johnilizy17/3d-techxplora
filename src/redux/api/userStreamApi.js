import { baseApi } from './baseApi';

export const userStreamApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Log user activity
        logActivity: builder.mutation({
            query: (data) => ({
                url: '/stream/log',
                method: 'POST',
                body: data,
            }),
        }),

        // Get streams by quiz code
        getStreamsByQuizCode: builder.query({
            query: ({ quizCode, ...params }) => ({
                url: `/stream/quiz/${quizCode}`,
                params,
            }),
            providesTags: (result, error, { quizCode }) => [
                { type: 'UserStream', id: quizCode },
            ],
        }),

        // Get live stream summary
        getLiveStreamSummary: builder.query({
            query: (quizCode) => `/stream/quiz/${quizCode}/summary`,
            providesTags: (result, error, quizCode) => [
                { type: 'StreamSummary', id: quizCode },
            ],
        }),

        // Get user-specific stream
        getUserStream: builder.query({
            query: ({ quizCode, userId }) => `/stream/quiz/${quizCode}/user/${userId}`,
            providesTags: (result, error, { quizCode, userId }) => [
                { type: 'UserStream', id: `${quizCode}-${userId}` },
            ],
        }),

        // Cleanup old streams (admin only)
        cleanupOldStreams: builder.mutation({
            query: (days) => ({
                url: '/stream/cleanup',
                method: 'DELETE',
                params: { days },
            }),
        }),
    }),
});

export const {
    useLogActivityMutation,
    useGetStreamsByQuizCodeQuery,
    useGetLiveStreamSummaryQuery,
    useGetUserStreamQuery,
    useCleanupOldStreamsMutation,
} = userStreamApi;
