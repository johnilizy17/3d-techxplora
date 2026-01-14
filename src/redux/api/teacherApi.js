import baseApi from './baseApi';

export const teacherApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // Get all teachers
        getTeachers: builder.query({
            query: (params) => ({
                url: '/teachers',
                params,
            }),
            providesTags: ['Teacher'],
        }),

        // Get teacher by ID
        getTeacherById: builder.query({
            query: (id) => `/teachers/${id}`,
            providesTags: (result, error, id) => [{ type: 'Teacher', id }],
        }),

        // Get teacher profile
        getTeacherProfile: builder.query({
            query: (id) => `/teachers/${id}`,
            providesTags: ['Teacher'],
        }),

        // Update teacher profile
        updateTeacherProfile: builder.mutation({
            query: (profileData) => ({
                url: '/teachers/profile',
                method: 'PUT',
                body: profileData,
            }),
            invalidatesTags: ['Teacher'],
        }),

        // Get teacher courses
        getTeacherCourses: builder.query({
            query: (teacherId) => `/teachers/${teacherId}/courses`,
            providesTags: ['Course'],
        }),

        // Create course
        createCourse: builder.mutation({
            query: (courseData) => ({
                url: '/courses',
                method: 'POST',
                body: courseData,
            }),
            invalidatesTags: ['Course'],
        }),

        // Update course
        updateCourse: builder.mutation({
            query: ({ id, ...courseData }) => ({
                url: `/courses/${id}`,
                method: 'PUT',
                body: courseData,
            }),
            invalidatesTags: (result, error, { id }) => [{ type: 'Course', id }],
        }),

        // Delete course
        deleteCourse: builder.mutation({
            query: (id) => ({
                url: `/courses/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Course'],
        }),

        // Get teacher students
        getTeacherStudents: builder.query({
            query: (teacherId) => `/teachers/${teacherId}/students`,
            providesTags: ['Student'],
        }),

        // Get course students
        getCourseStudents: builder.query({
            query: (courseId) => `/courses/${courseId}/students`,
            providesTags: ['Student'],
        }),

        // Enroll student in course
        enrollStudent: builder.mutation({
            query: ({ courseId, studentId }) => ({
                url: `/courses/${courseId}/enroll`,
                method: 'POST',
                body: { studentId },
            }),
            invalidatesTags: ['Student', 'Course'],
        }),

        // Remove student from course
        removeStudent: builder.mutation({
            query: ({ courseId, studentId }) => ({
                url: `/courses/${courseId}/students/${studentId}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Student', 'Course'],
        }),

        // Get course by ID
        getCourseById: builder.query({
            query: (id) => `/courses/${id}`,
            providesTags: (result, error, id) => [{ type: 'Course', id }],
        }),

        // Get all courses
        getCourses: builder.query({
            query: (params) => ({
                url: '/courses',
                params,
            }),
            providesTags: ['Course'],
        }),

        // Dashboard specific queries
        getQuizzes: builder.query({
            query: ({ type, id }) => type === 'student' ? `/my-quizzes/${id}` : '/quizzes',
            providesTags: ['Quiz'],
        }),

        getGroups: builder.query({
            query: ({ type, id }) => type === 'student' ? `/my-groups/${id}` : '/groups',
            providesTags: ['Teacher', 'Student'],
        }),

        getQuizData: builder.query({
            query: () => '/classes', // This would normally be a series of requests or a specialized endpoint
            // We'll mimic the old logic by providing tags that might trigger a refresh
            providesTags: ['Course', 'Quiz'],
        }),
        getSyllabus: builder.query({
            query: () => '/syllabus',
            providesTags: ['Syllabus'],
        }),

        createSyllabus: builder.mutation({
            query: (payload) => ({
                url: '/syllabus',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['Syllabus'],
        }),

        createSubTopic: builder.mutation({
            query: (payload) => ({
                url: '/syllabus-topics',
                method: 'POST',
                body: payload,
            }),
            invalidatesTags: ['Syllabus'],
        }),

        deleteSyllabus: builder.mutation({
            query: (id) => ({
                url: `/syllabus/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Syllabus'],
        }),
    }),
});

export const {
    useGetTeachersQuery,
    useGetTeacherByIdQuery,
    useGetTeacherProfileQuery,
    useUpdateTeacherProfileMutation,
    useGetTeacherCoursesQuery,
    useCreateCourseMutation,
    useUpdateCourseMutation,
    useDeleteCourseMutation,
    useGetTeacherStudentsQuery,
    useGetCourseStudentsQuery,
    useEnrollStudentMutation,
    useRemoveStudentMutation,
    useGetCourseByIdQuery,
    useGetCoursesQuery,
    useGetQuizzesQuery,
    useGetGroupsQuery,
    useGetQuizDataQuery,
    useGetSyllabusQuery,
    useCreateSyllabusMutation,
    useCreateSubTopicMutation,
    useDeleteSyllabusMutation,
} = teacherApi;
