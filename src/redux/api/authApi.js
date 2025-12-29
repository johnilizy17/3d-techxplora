import baseApi from './baseApi';

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Login
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/login',
                method: 'POST',
                body: credentials,
            }),
            invalidatesTags: ['Auth'],
        }),

        // Register
        register: builder.mutation({
            query: (userData) => ({
                url: '/auth/register',
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
    }),
});

export const {
    useLoginMutation,
    useRegisterMutation,
    useGetProfileQuery,
    useUpdateProfileMutation,
    useLogoutMutation,
    useRefreshTokenMutation,
    useVerifyEmailMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApi;
