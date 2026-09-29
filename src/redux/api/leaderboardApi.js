import baseApi from './baseApi';

export const leaderboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get global leaderboard (for students) with period support and filters
        getGlobalLeaderboard: builder.query({
            query: (params) => {
                const { period = 'weekly', time_filter, start_date, end_date, state } = params || {};
                const queryParams = new URLSearchParams({ period });
                
                if (time_filter) queryParams.append('time_filter', time_filter);
                if (start_date) queryParams.append('start_date', start_date);
                if (end_date) queryParams.append('end_date', end_date);
                if (state) queryParams.append('state', state);
                
                return `/leaderboard?${queryParams.toString()}`;
            },
            providesTags: ['Leaderboard'],
        }),

        // Get admin-specific leaderboard (for teachers/admins) with filters
        getAdminLeaderboard: builder.query({
            query: (params) => {
                const { admin_code, time_filter, start_date, end_date, state } = params || {};
                const queryParams = new URLSearchParams();
                
                if (time_filter) queryParams.append('time_filter', time_filter);
                if (start_date) queryParams.append('start_date', start_date);
                if (end_date) queryParams.append('end_date', end_date);
                if (state) queryParams.append('state', state);
                
                const queryString = queryParams.toString();
                return `/leaderboard/admin/${admin_code}${queryString ? `?${queryString}` : ''}`;
            },
            providesTags: ['Leaderboard'],
        }),

        // Get leaderboard for a specific group with filters
        getGroupLeaderboard: builder.query({
            query: (params) => {
                const { group_code, time_filter, start_date, end_date, state } = params || {};
                const queryParams = new URLSearchParams();
                
                if (time_filter) queryParams.append('time_filter', time_filter);
                if (start_date) queryParams.append('start_date', start_date);
                if (end_date) queryParams.append('end_date', end_date);
                if (state) queryParams.append('state', state);
                
                const queryString = queryParams.toString();
                return `/leaderboard/group/${group_code}${queryString ? `?${queryString}` : ''}`;
            },
            providesTags: ['Leaderboard'],
        }),

        // Get leaderboard for a specific quiz with filters
        getQuizLeaderboard: builder.query({
            query: (params) => {
                const { quiz_code, time_filter, start_date, end_date, state } = params || {};
                const queryParams = new URLSearchParams();
                
                if (time_filter) queryParams.append('time_filter', time_filter);
                if (start_date) queryParams.append('start_date', start_date);
                if (end_date) queryParams.append('end_date', end_date);
                if (state) queryParams.append('state', state);
                
                const queryString = queryParams.toString();
                return `/leaderboard/quiz/${quiz_code}${queryString ? `?${queryString}` : ''}`;
            },
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
