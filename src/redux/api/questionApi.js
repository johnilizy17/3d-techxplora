import baseApi from './baseApi';

export const questionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get all questions
        getQuestions: builder.query({
            query: (params) => ({
                url: '/questions',
                params,
            }),
            providesTags: ['Question'],
        }),

        // Get question by ID
        getQuestionById: builder.query({
            query: (id) => `/questions/${id}`,
            providesTags: (result, error, id) => [{ type: 'Question', id }],
        }),

        // Create question
        createQuestion: builder.mutation({
            query: (questionData) => ({
                url: '/questions',
                method: 'POST',
                body: questionData,
            }),
            invalidatesTags: ['Question'],
        }),

        // Update question
        updateQuestion: builder.mutation({
            query: ({ id, ...questionData }) => ({
                url: `/questions/${id}`,
                method: 'PUT',
                body: questionData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Question', id }],
        }),

        // Delete question
        deleteQuestion: builder.mutation({
            query: (id) => ({
                url: `/questions/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Question'],
        }),

        // Get quiz by ID
        getQuizById: builder.query({
            query: (id) => `/quizzes/${id}`,
            providesTags: (result, error, id) => [{ type: 'Quiz', id }],
        }),

        // Get all quizzes
        getQuizzes: builder.query({
            query: (params) => ({
                url: '/quizzes',
                params,
            }),
            providesTags: ['Quiz'],
        }),

        // Create quiz
        createQuiz: builder.mutation({
            query: (quizData) => ({
                url: '/quizzes',
                method: 'POST',
                body: quizData,
            }),
            invalidatesTags: ['Quiz'],
        }),

        // Submit quiz
        submitQuiz: builder.mutation({
            query: ({ quizId, answers }) => ({
                url: `/quizzes/${quizId}/submit`,
                method: 'POST',
                body: { answers },
            }),
            invalidatesTags: (result, error, { quizId }) => [{ type: 'Quiz', id: quizId }],
        }),

        // Get quiz results
        getQuizResults: builder.query({
            query: (quizId) => `/quizzes/${quizId}/results`,
            providesTags: (result, error, quizId) => [{ type: 'Quiz', id: quizId }],
        }),

        // Get questions by quiz ID
        getQuestionsByQuizId: builder.query({
            query: (quizId) => `/quizzes/${quizId}/questions`,
            providesTags: ['Question'],
        }),
    }),
});

export const {
    useGetQuestionsQuery,
    useGetQuestionByIdQuery,
    useCreateQuestionMutation,
    useUpdateQuestionMutation,
    useDeleteQuestionMutation,
    useGetQuizByIdQuery,
    useGetQuizzesQuery,
    useCreateQuizMutation,
    useSubmitQuizMutation,
    useGetQuizResultsQuery,
    useGetQuestionsByQuizIdQuery,
} = questionApi;
