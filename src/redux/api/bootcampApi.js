import baseApi from './baseApi';

export const bootcampApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Submit bootcamp application (creates user if needed)
        submitBootcampApplication: builder.mutation({
            query: (applicationData) => ({
                url: '/bootcamp/applications',
                method: 'POST',
                body: {
                    fullname: applicationData.full_name,
                    email: applicationData.email,
                    phone: applicationData.phone,
                    gender: applicationData.gender,
                    password: applicationData.password,
                    institution: applicationData.institution,
                    qualification: applicationData.qualification,
                    graduation_year: applicationData.graduation_year,
                    country: applicationData.country,
                    state: applicationData.state,
                    occupation: applicationData.occupation,
                    preferred_track: applicationData.learning_track,
                    weekly_hours: applicationData.weekly_hours,
                    learning_experience: applicationData.experience,
                    motivation: applicationData.motivation,
                },
            }),
            invalidatesTags: ['BootcampApplications'],
        }),

        // Get all applications (admin only)
        getBootcampApplications: builder.query({
            query: (params = {}) => {
                const queryParams = new URLSearchParams();
                if (params.status) queryParams.append('status', params.status);
                if (params.quiz_completed !== undefined) queryParams.append('quiz_completed', params.quiz_completed);
                if (params.search) queryParams.append('search', params.search);
                if (params.per_page) queryParams.append('per_page', params.per_page);
                if (params.page) queryParams.append('page', params.page);
                
                return `/bootcamp/applications?${queryParams.toString()}`;
            },
            providesTags: ['BootcampApplications'],
        }),

        // Get single application
        getBootcampApplication: builder.query({
            query: (identifier) => `/bootcamp/applications/${identifier}`,
            providesTags: (result, error, identifier) => [{ type: 'BootcampApplications', id: identifier }],
        }),

        // Get application statistics
        getBootcampStatistics: builder.query({
            query: () => '/bootcamp/applications/stats',
            providesTags: ['BootcampStats'],
        }),

        // Update application status (admin only)
        updateBootcampApplication: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/bootcamp/applications/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: (result, error, { id }) => [
                'BootcampApplications',
                'BootcampStats',
                { type: 'BootcampApplications', id },
            ],
        }),

        // Update quiz score
        updateBootcampQuizScore: builder.mutation({
            query: ({ id, quiz_score }) => ({
                url: `/bootcamp/applications/${id}/quiz-score`,
                method: 'POST',
                body: { quiz_score },
            }),
            invalidatesTags: (result, error, { id }) => [
                'BootcampApplications',
                'BootcampStats',
                { type: 'BootcampApplications', id },
            ],
        }),

        // Send DataCamp invite
        sendDatacampInvite: builder.mutation({
            query: ({ id, datacamp_email }) => ({
                url: `/bootcamp/applications/${id}/datacamp-invite`,
                method: 'POST',
                body: { datacamp_email },
            }),
            invalidatesTags: (result, error, { id }) => [
                'BootcampApplications',
                { type: 'BootcampApplications', id },
            ],
        }),

        // Delete application (soft delete)
        deleteBootcampApplication: builder.mutation({
            query: (id) => ({
                url: `/bootcamp/applications/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['BootcampApplications', 'BootcampStats'],
        }),

        // Get bootcamp dashboard data (for authenticated student)
        getBootcampDashboard: builder.query({
            query: () => '/bootcamp/dashboard',
            providesTags: ['BootcampDashboard'],
        }),

        // Submit bootcamp application for logged-in user (simplified)
        submitBootcampApplicationForUser: builder.mutation({
            query: (applicationData) => ({
                url: '/bootcamp/apply',
                method: 'POST',
                body: applicationData,
            }),
            invalidatesTags: ['BootcampApplications', 'BootcampDashboard'],
        }),
    }),
});

export const {
    useSubmitBootcampApplicationMutation,
    useGetBootcampApplicationsQuery,
    useGetBootcampApplicationQuery,
    useGetBootcampStatisticsQuery,
    useUpdateBootcampApplicationMutation,
    useUpdateBootcampQuizScoreMutation,
    useSendDatacampInviteMutation,
    useDeleteBootcampApplicationMutation,
    useGetBootcampDashboardQuery,
    useSubmitBootcampApplicationForUserMutation,
} = bootcampApi;
