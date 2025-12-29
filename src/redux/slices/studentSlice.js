import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    studentProfile: null,
    enrolledCourses: [],
    currentCourse: null,
    courseProgress: {},
    filters: {
        search: '',
        difficulty_level: '',
        category: '',
        status: '',
    },
    pagination: {
        currentPage: 1,
        perPage: 10,
        total: 0,
    },
    loading: false,
    error: null,
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        setStudentProfile: (state, action) => {
            state.studentProfile = action.payload;
        },
        updateStudentProfile: (state, action) => {
            state.studentProfile = { ...state.studentProfile, ...action.payload };
        },
        setEnrolledCourses: (state, action) => {
            state.enrolledCourses = action.payload;
        },
        setCurrentCourse: (state, action) => {
            state.currentCourse = action.payload;
        },
        setCourseProgress: (state, action) => {
            const { courseId, progress } = action.payload;
            state.courseProgress[courseId] = progress;
        },
        updateCourseProgress: (state, action) => {
            const { courseId, progress } = action.payload;
            state.courseProgress[courseId] = {
                ...state.courseProgress[courseId],
                ...progress,
            };
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        clearFilters: (state) => {
            state.filters = {
                search: '',
                difficulty_level: '',
                category: '',
                status: '',
            };
        },
        setSearchFilter: (state, action) => {
            state.filters.search = action.payload;
        },
        setDifficultyFilter: (state, action) => {
            state.filters.difficulty_level = action.payload;
        },
        setCategoryFilter: (state, action) => {
            state.filters.category = action.payload;
        },
        setStatusFilter: (state, action) => {
            state.filters.status = action.payload;
        },
        setPagination: (state, action) => {
            state.pagination = { ...state.pagination, ...action.payload };
        },
        setCurrentPage: (state, action) => {
            state.pagination.currentPage = action.payload;
        },
        setPerPage: (state, action) => {
            state.pagination.perPage = action.payload;
        },
        enrollInCourse: (state, action) => {
            state.enrolledCourses.push(action.payload);
        },
        unenrollFromCourse: (state, action) => {
            state.enrolledCourses = state.enrolledCourses.filter(
                (course) => course.id !== action.payload
            );
        },
        completeCourse: (state, action) => {
            const courseId = action.payload;
            const course = state.enrolledCourses.find((c) => c.id === courseId);
            if (course) {
                course.completed = true;
                course.completedAt = new Date().toISOString();
            }
            if (state.courseProgress[courseId]) {
                state.courseProgress[courseId].completed = true;
            }
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
        resetStudentState: (state) => {
            return initialState;
        },
    },
});

export const {
    setStudentProfile,
    updateStudentProfile,
    setEnrolledCourses,
    setCurrentCourse,
    setCourseProgress,
    updateCourseProgress,
    setFilters,
    clearFilters,
    setSearchFilter,
    setDifficultyFilter,
    setCategoryFilter,
    setStatusFilter,
    setPagination,
    setCurrentPage,
    setPerPage,
    enrollInCourse,
    unenrollFromCourse,
    completeCourse,
    setLoading,
    setError,
    clearError,
    resetStudentState,
} = studentSlice.actions;

// Selectors
export const selectStudentProfile = (state) => state.student.studentProfile;
export const selectEnrolledCourses = (state) => state.student.enrolledCourses;
export const selectCurrentCourse = (state) => state.student.currentCourse;
export const selectCourseProgress = (state) => state.student.courseProgress;
export const selectCourseProgressById = (courseId) => (state) =>
    state.student.courseProgress[courseId];
export const selectFilters = (state) => state.student.filters;
export const selectPagination = (state) => state.student.pagination;
export const selectStudentLoading = (state) => state.student.loading;
export const selectStudentError = (state) => state.student.error;

export default studentSlice.reducer;
