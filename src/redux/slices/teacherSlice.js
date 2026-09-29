import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    teachers: [],
    selectedTeacher: null,
    teacherCourses: [],
    teacherStudents: [],
    teacherProfile: null,
    groups: [],
    quizzes: [],
    quizData: { group: [], class: [], quiz: [] },
    loading: false,
    error: null,
};

const teacherSlice = createSlice({
    name: 'teacher',
    initialState,
    reducers: {
        setTeachers: (state, action) => {
            state.teachers = action.payload;
        },
        setSelectedTeacher: (state, action) => {
            state.selectedTeacher = action.payload;
        },
        setTeacherCourses: (state, action) => {
            state.teacherCourses = action.payload;
        },
        setTeacherStudents: (state, action) => {
            state.teacherStudents = action.payload;
        },
        setTeacherProfile: (state, action) => {
            state.teacherProfile = action.payload;
        },
        setGroups: (state, action) => {
            state.groups = action.payload;
        },
        setQuizzes: (state, action) => {
            state.quizzes = action.payload;
        },
        setQuizData: (state, action) => {
            state.quizData = action.payload;
        },
        updateTeacherProfile: (state, action) => {
            state.teacherProfile = { ...state.teacherProfile, ...action.payload };
        },
        addCourse: (state, action) => {
            state.teacherCourses.push(action.payload);
        },
        updateCourse: (state, action) => {
            const index = state.teacherCourses.findIndex(
                (course) => course.id === action.payload.id
            );
            if (index !== -1) {
                state.teacherCourses[index] = { ...state.teacherCourses[index], ...action.payload };
            }
        },
        removeCourse: (state, action) => {
            state.teacherCourses = state.teacherCourses.filter(
                (course) => course.id !== action.payload
            );
        },
        addStudent: (state, action) => {
            state.teacherStudents.push(action.payload);
        },
        removeStudent: (state, action) => {
            state.teacherStudents = state.teacherStudents.filter(
                (student) => student.id !== action.payload
            );
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
        resetTeacherState: (state) => {
            return initialState;
        },
    },
});

export const {
    setTeachers,
    setSelectedTeacher,
    setTeacherCourses,
    setTeacherStudents,
    setTeacherProfile,
    updateTeacherProfile,
    addCourse,
    updateCourse,
    removeCourse,
    addStudent,
    removeStudent,
    setLoading,
    setError,
    clearError,
    resetTeacherState,
} = teacherSlice.actions;

// Selectors
export const selectTeachers = (state) => state.teacher.teachers;
export const selectSelectedTeacher = (state) => state.teacher.selectedTeacher;
export const selectTeacherCourses = (state) => state.teacher.teacherCourses;
export const selectTeacherStudents = (state) => state.teacher.teacherStudents;
export const selectTeacherProfile = (state) => state.teacher.teacherProfile;
export const selectTeacherGroups = (state) => state.teacher.groups;
export const selectTeacherQuizzes = (state) => state.teacher.quizzes;
export const selectQuizData = (state) => state.teacher.quizData;
export const selectTeacherLoading = (state) => state.teacher.loading;
export const selectTeacherError = (state) => state.teacher.error;

export default teacherSlice.reducer;
