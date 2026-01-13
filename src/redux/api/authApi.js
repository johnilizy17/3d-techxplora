import baseApi from './baseApi';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Login
        login: builder.mutation({
            query: (credentials) => ({
                url: '/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Auth'],
        }),

        // Register Student
        registerStudent: builder.mutation({
            query: (userData) => ({
                url: '/register-student',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['Auth'],
        }),

        // Register Teacher/Admin
        registerTeacher: builder.mutation({
            query: (userData) => ({
                url: '/register-teacher',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['Auth'],
        }),

        // Get current user profile
        getProfile: builder.query({
            query: () => '/auth/profile',
            providesTags: ['Auth'],
        }),

        // Update profile
        updateProfile: builder.mutation({
            query: (userData) => ({
                url: '/auth/profile',
                method: 'PUT',
                body: userData,
            }),
            invalidatesTags: ['Auth'],
        }),

        // Logout
        logout: builder.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            }),
            invalidatesTags: ['Auth'],
        }),

        // Refresh token
        refreshToken: builder.mutation({
            query: (refreshToken) => ({
                url: '/auth/refresh',
                method: 'POST',
                body: { refreshToken },
            }),
        }),

        // Verify email
        verifyEmail: builder.mutation({
            query: (token) => ({
                url: '/auth/verify-email',
                method: 'POST',
                body: { token },
            }),
        }),

        // Forgot password
        forgotPassword: builder.mutation({
            query: (email) => ({
                url: '/auth/forgot-password',
                method: 'POST',
                body: { email },
            }),
        }),

        // Reset password
        resetPassword: builder.mutation({
            query: ({ token, password }) => ({
                url: '/auth/reset-password',
                method: 'POST',
                body: { token, password },
            }),
        }),

        // Verify Admin Code
        verifyAdminCode: builder.mutation({
            query: (code) => ({
                url: `/verify-admin-code/${code}`,
                method: 'GET'
            }),
        }),

        // Get student sub-accounts
        getStudentProfiles: builder.query({
            query: (id) => `/students/${id}`,
            providesTags: ['Auth'],
        }),

        // Register sub-account
        registerSubAccount: builder.mutation({
            query: (userData) => ({
                url: '/register-sub-student',
                method: 'POST',
                body: userData,
            }),
            invalidatesTags: ['Auth'],
        }),

        // Send Email
        sendEmail: builder.mutation({
            query: (payload) => ({
                url: '/send-email',
                method: 'POST',
                body: payload,
            }),
        }),

        // Send SMS
        sendSMS: builder.mutation({
            query: (payload) => ({
                url: '/send-sms',
                method: 'POST',
                body: payload,
            }),
        }),

        // Update Teacher (used for verification)
        updateTeacher: builder.mutation({
            query: ({ id, ...payload }) => ({
                url: `/teachers/${id}`,
                method: 'PUT',
                body: payload,
            }),
            invalidatesTags: ['Auth'],
        }),

        // Update Student (used for verification)
        updateStudent: builder.mutation({
            query: ({ id, ...payload }) => ({
                url: `/students/${id}`,
                method: 'PUT',
                body: payload,
            }),
            invalidatesTags: ['Auth'],
        }),
    }),
});

export const {
    useLoginMutation,
    useRegisterStudentMutation,
    useRegisterTeacherMutation,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useLogoutMutation,
    useRefreshTokenMutation,
    useVerifyEmailMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useVerifyAdminCodeMutation,
    useGetStudentProfilesQuery,
    useRegisterSubAccountMutation,
    useSendEmailMutation,
    useSendSMSMutation,
    useUpdateTeacherMutation,
    useUpdateStudentMutation,
} = authApi;
