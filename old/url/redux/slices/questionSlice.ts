import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import {
    saveTokens,
    clearTokens,
    STORAGE,
    getAccessQuestion,
} from '@/utils/storage';
import { LOCAL_STORAGE_KEYS } from '@/utils/constants';
import { publicRequest, userRequest } from '@/url/api/server';

const initialState: SyllabusState = {
    questions: getAccessQuestion() || [],
    syllabus: [],
    result2: [],
    editQuiz: {},
    resultStatics: [],
    leaderboard: [],
    quizAnswer: []
};

// Refresh Token Function
// Logout Thunk
export const getQuestion = createAsyncThunk(
    'auth/question',
    async (_: any, { rejectWithValue }) => {
        try {
            const data = await userRequest.get(`/get-questions/${_}`);
            return data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Question failed');
        }
    }
);


export const getResult = createAsyncThunk(
    'auth/result',
    async (_: any, { rejectWithValue }) => {
        try {

            return _;
        } catch (error: any) {

        }
    }
);

export const fetechAllResult = createAsyncThunk(
    'result/statistics',
    async (_: any, { rejectWithValue }) => {
        try {
            if (_.admin) {
                const { data } = await userRequest.get(`/answers/admin/${_.admin}`)
                return data;
            } else {
                const { data } = await userRequest.get(`/answers/student/${_.id}`)
                return data;
            }
        } catch (error: any) {

        }
    }
);

export const leaderboardStats = createAsyncThunk(
    'leaderboard/stats',
    async (_: any, { rejectWithValue }) => {
        try {
            if (_) {
                const { data } = await userRequest.get(`/leaderboard/admin/${_}`)
                return data;
            } else {
                const { data } = await userRequest.get(`leaderboard`)
                return data;
            }
        } catch (error: any) {

        }
    }
);


export const getAllStudentResult = createAsyncThunk(
    'answers/quiz/student',
    async (_: any, { rejectWithValue }) => {
        try {
            const { data } = await userRequest.get(`answers/quiz/${_}`)
            console.log(data, "data")
            return data;
        } catch (error: any) {

        }
    }
);

export const getSyllabus = createAsyncThunk(
    'syllabus',
    async (_: string, { rejectWithValue }) => {
        try {
            const data = await userRequest.get(`/syllabus`);
            return data.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Question failed');
        }
    }
);

const questionSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        setAnswer: (
            state,
            action
        ) => {
            state.questions = action.payload;
        },
        triggerQuizEdit: (state, action) => {
            state.editQuiz = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getQuestion.fulfilled, (state, action: any) => {
            state.questions = action.payload.data;
            STORAGE.set(LOCAL_STORAGE_KEYS.GET_QUESTION, action.payload.data);
        })
        builder.addCase(getSyllabus.fulfilled, (state, action: any) => {
            state.syllabus = action.payload.data;
        }).addCase(getResult.fulfilled, (state, action: any) => {
            state.result2 = action.payload;
        }).addCase(fetechAllResult.fulfilled, (state, action: any) => {
            state.resultStatics = action.payload;
        }).addCase(leaderboardStats.fulfilled, (state, action: any) => {
            state.leaderboard = action.payload;
        }).addCase(getAllStudentResult.fulfilled, (state, action: any) => {
            state.quizAnswer = action.payload;
        }).addCase(getQuestion.rejected, (state, action: any) => {
            state.questions = [];
            STORAGE.set(LOCAL_STORAGE_KEYS.GET_QUESTION, []);
        })
    },
});

interface SyllabusState {
    questions: any;
    syllabus: any;
    result2: any;
    editQuiz: any;
    resultStatics: any;
    leaderboard: any;
    quizAnswer: any
}
export const { setAnswer, triggerQuizEdit } = questionSlice.actions;
export default questionSlice.reducer;
