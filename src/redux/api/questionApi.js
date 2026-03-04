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
            query: (id) => `/get-questions/${id}`,
            providesTags: (result, error, id) => [{ type: 'Question', id }],
        }),

        // Create question
        createQuestion: builder.mutation({
            query: (questionData) => ({
                url: '/create-question',
                method: 'POST',
                body: questionData,
            }),
            invalidatesTags: ['Question'],
        }),

        // Update question
        updateQuestion: builder.mutation({
            query: ({ id, ...questionData }) => ({
                url: `/upate-questions/${id}`,
                method: 'POST',
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
            query: (payload) => ({
                url: `/answers/submit`,
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: (result, error) => ['Quiz'],
        }),

        // Get quiz results
        getQuizResults: builder.query({
            query: (quizId) => `/quizzes/${quizId}/results`,
            providesTags: (result, error, quizId) => [{ type: 'Quiz', id: quizId }],
        }),

        // Get student's specific quiz result
        getStudentQuizResult: builder.query({
            query: ({ studentId, quizCode }) => `/answers/student/${studentId}/quiz/${quizCode}`,
            providesTags: (result, error, { studentId, quizCode }) => [
                { type: 'Answer', id: `${studentId}-${quizCode}` }
            ],
        }),

        // Get questions by quiz ID
        getQuestionsByQuizId: builder.query({
            query: (quizId) => `/get-questions/${quizId}`,
            providesTags: ['Question'],
        }),
        // Verify/Get quiz by code
        verifyQuiz: builder.query({
            query: (code) => `/verify-quizzes/${code}`,
            providesTags: (result, error, code) => [{ type: 'Quiz', id: code }],
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
    useGetStudentQuizResultQuery,
    useGetQuestionsByQuizIdQuery,
    useVerifyQuizQuery,
} = questionApi;
