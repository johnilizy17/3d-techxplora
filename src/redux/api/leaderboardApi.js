import baseApi from './baseApi';

export const leaderboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get global leaderboard (for students)
        getGlobalLeaderboard: builder.query({
            query: () => '/leaderboard',
            providesTags: ['Leaderboard'],
        }),

        // Get admin-specific leaderboard (for teachers/admins)
        getAdminLeaderboard: builder.query({
            query: (adminCode) => `/leaderboard/admin/${adminCode}`,
            providesTags: ['Leaderboard'],
        }),

        // Get leaderboard for a specific group
        getGroupLeaderboard: builder.query({
            query: (groupCode) => `/leaderboard/group/${groupCode}`,
            providesTags: ['Leaderboard'],
        }),

        // Get leaderboard for a specific quiz
        getQuizLeaderboard: builder.query({
            query: (quizCode) => `/leaderboard/quiz/${quizCode}`,
            providesTags: ['Leaderboard'],
        }),
    }),
});

export const {
    useGetGlobalLeaderboardQuery,
    useGetAdminLeaderboardQuery,
    useGetGroupLeaderboardQuery,
    useGetQuizLeaderboardQuery,
} = leaderboardApi;
