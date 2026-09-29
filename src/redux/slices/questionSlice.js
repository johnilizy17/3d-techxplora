import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    questions: [],
    currentQuestion: null,
    currentQuestionIndex: 0,
    answers: {},
    quizProgress: {
        totalQuestions: 0,
        answeredQuestions: 0,
        score: 0,
        isCompleted: false,
    },
    selectedQuiz: null,
    loading: false,
    error: null,
};

const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        setQuestions: (state, action) => {
            state.questions = action.payload;
            state.quizProgress.totalQuestions = action.payload.length;
        },
        setCurrentQuestion: (state, action) => {
            state.currentQuestion = action.payload;
        },
        setCurrentQuestionIndex: (state, action) => {
            state.currentQuestionIndex = action.payload;
            if (state.questions[action.payload]) {
                state.currentQuestion = state.questions[action.payload];
            }
        },
        nextQuestion: (state) => {
            if (state.currentQuestionIndex < state.questions.length - 1) {
                state.currentQuestionIndex += 1;
                state.currentQuestion = state.questions[state.currentQuestionIndex];
            }
        },
        previousQuestion: (state) => {
            if (state.currentQuestionIndex > 0) {
                state.currentQuestionIndex -= 1;
                state.currentQuestion = state.questions[state.currentQuestionIndex];
            }
        },
        setAnswer: (state, action) => {
            const { questionId, answer } = action.payload;
            state.answers[questionId] = answer;
            state.quizProgress.answeredQuestions = Object.keys(state.answers).length;
        },
        updateQuizProgress: (state, action) => {
            state.quizProgress = { ...state.quizProgress, ...action.payload };
        },
        setSelectedQuiz: (state, action) => {
            state.selectedQuiz = action.payload;
        },
        completeQuiz: (state, action) => {
            state.quizProgress.isCompleted = true;
            state.quizProgress.score = action.payload.score;
        },
        resetQuiz: (state) => {
            state.currentQuestionIndex = 0;
            state.currentQuestion = state.questions[0] || null;
            state.answers = {};
            state.quizProgress = {
                totalQuestions: state.questions.length,
                answeredQuestions: 0,
                score: 0,
                isCompleted: false,
            };
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
    },
});

export const {
    setQuestions,
    setCurrentQuestion,
    setCurrentQuestionIndex,
    nextQuestion,
    previousQuestion,
    setAnswer,
    updateQuizProgress,
    setSelectedQuiz,
    completeQuiz,
    resetQuiz,
    setLoading,
    setError,
    clearError,
} = questionSlice.actions;

// Selectors
export const selectQuestions = (state) => state.question.questions;
export const selectCurrentQuestion = (state) => state.question.currentQuestion;
export const selectCurrentQuestionIndex = (state) => state.question.currentQuestionIndex;
export const selectAnswers = (state) => state.question.answers;
export const selectQuizProgress = (state) => state.question.quizProgress;
export const selectSelectedQuiz = (state) => state.question.selectedQuiz;
export const selectQuestionLoading = (state) => state.question.loading;
export const selectQuestionError = (state) => state.question.error;

export default questionSlice.reducer;
