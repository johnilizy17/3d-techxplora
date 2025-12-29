import baseApi from './baseApi';

export const studentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get all courses for students with filters and pagination
        getStudentCourses: builder.query({
            query: (params = {}) => {
                const queryParams = new URLSearchParams();

                // Add search parameter
                if (params.search) {
                    queryParams.append('search', params.search);
                }

                // Add difficulty level filter
                if (params.difficulty_level) {
                    queryParams.append('difficulty_level', params.difficulty_level);
                }

                // Add category filter
                if (params.category) {
                    queryParams.append('category', params.category);
                }

                // Add status filter
                if (params.status) {
                    queryParams.append('status', params.status);
                }

                // Add pagination
                if (params.per_page) {
                    queryParams.append('per_page', params.per_page);
                }

                if (params.page) {
                    queryParams.append('page', params.page);
                }

                const queryString = queryParams.toString();
                return `/students/courses${queryString ? `?${queryString}` : ''}`;
            },
            transformResponse: (response) => {
                // Extract the nested data structure
                // Response format: { status, message, data: { current_page, data: [...], meta... } }
                return response.data || response;
            },
            providesTags: (result) =>
                result?.data
                    ? [
                        ...result.data.map(({ id }) => ({ type: 'Course', id })),
                        { type: 'Course', id: 'LIST' },
                    ]
                    : [{ type: 'Course', id: 'LIST' }],
        }),

        // Get course by ID for students
        getStudentCourseById: builder.query({
            query: (id) => `/students/course/${id}`,
            providesTags: (result, error, id) => [{ type: 'Course', id }],
        }),

        // Enroll in a course
        enrollInCourse: builder.mutation({
            query: (courseId) => ({
                url: `/students/courses/${courseId}/enroll`,
                method: 'POST',
            }),
            invalidatesTags: [{ type: 'Course', id: 'LIST' }, 'Student'],
        }),

        // Get enrolled courses
        getEnrolledCourses: builder.query({
            query: (params = {}) => {
                const queryParams = new URLSearchParams();

                if (params.per_page) {
                    queryParams.append('per_page', params.per_page);
                }

                if (params.page) {
                    queryParams.append('page', params.page);
                }

                const queryString = queryParams.toString();
                return `/students/enrolled-courses${queryString ? `?${queryString}` : ''}`;
            },
            providesTags: ['Student'],
        }),

        // Get student profile
        getStudentProfile: builder.query({
            query: () => '/students/profile',
            providesTags: ['Student'],
        }),

        // Update student profile
        updateStudentProfile: builder.mutation({
            query: (profileData) => ({
                url: '/students/profile',
                method: 'PUT',
                body: profileData,
            }),
            invalidatesTags: ['Student'],
        }),

        // Get course progress
        getCourseProgress: builder.query({
            query: (courseId) => `/students/courses/${courseId}/progress`,
            providesTags: (result, error, courseId) => [{ type: 'Course', id: courseId }],
        }),

        // Update course progress
        updateCourseProgress: builder.mutation({
            query: ({ courseId, progressData }) => ({
                url: `/students/courses/${courseId}/progress`,
                method: 'PUT',
                body: progressData,
            }),
            invalidatesTags: (result, error, { courseId }) => [{ type: 'Course', id: courseId }],
        }),

        // Complete a course
        completeCourse: builder.mutation({
            query: (courseId) => ({
                url: `/students/courses/${courseId}/complete`,
                method: 'POST',
            }),
            invalidatesTags: (result, error, courseId) => [
                { type: 'Course', id: courseId },
                'Student',
            ],
        }),

        // Get course categories
        getCourseCategories: builder.query({
            query: () => '/students/courses/categories',
            providesTags: ['Course'],
        }),

        // Get course difficulty levels
        getCourseDifficultyLevels: builder.query({
            query: () => '/students/courses/difficulty-levels',
            providesTags: ['Course'],
        }),
    }),
});

export const {
    useGetStudentCoursesQuery,
    useGetStudentCourseByIdQuery,
    useEnrollInCourseMutation,
    useGetEnrolledCoursesQuery,
    useGetStudentProfileQuery,
    useUpdateStudentProfileMutation,
    useGetCourseProgressQuery,
    useUpdateCourseProgressMutation,
    useCompleteCourseMutation,
    useGetCourseCategoriesQuery,
    useGetCourseDifficultyLevelsQuery,
} = studentApi;
