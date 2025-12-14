import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { publicRequest, userRequest } from '@/url/api/server';

const initialState: TeacherState = {
    teacherAll: [],
    teacherCode: "No Code",
    Group: [],
    quizzes: [],
    quizData: { group: [], class: [], quiz: [] }
};

// Refresh All Teacher by Code Function
export const allTeacherByCode = createAsyncThunk(
    'auth/get-teachers',
    async (_: string, { rejectWithValue }) => {
        try {
            const data = await userRequest.get(`/get-teachers/${_}`);
            return data;
        } catch (error: any) {
            console.log(error)
            return rejectWithValue(error.response?.data || 'Failed to fetch Data');
        }
    }
);

// Fetch all quiz details 
export const allQuizData = createAsyncThunk(
    'auth/get-quiz-data',
    async (_: string, { rejectWithValue }) => {
        try {
            const data = await userRequest.get(`/classes`);

            const quiz = await userRequest.get(`/quiz-modes`);
            const group = await userRequest.get(`/groups`);
            const filter = { group: group.data, class: data.data.data, quiz: quiz.data }
            const groupFilter = filter.group.map((a: any) => {
                return { value: a.group_code, label: `${a.title}(${a.group_code})` }
            })
            const quizFilter = filter.quiz.map((a: any) => {
                return { value: a.id, label: a.mode }
            })
            const classFilter = filter.class.map((a: any) => {
                return { value: a.id, label: a.class }
            })
            const filterData = { group: groupFilter, class: classFilter, quiz: quizFilter }
            return filterData;
        } catch (error: any) {
            console.log(error)
            return rejectWithValue(error.response?.data || 'Failed to fetch Data');
        }
    }
);

// Refresh All Create Group Code by Teacher  Function
export const TeacherCreateGroupCode = createAsyncThunk(
    'auth/create-code',
    async (_: any, { rejectWithValue }) => {
        try {
            const data = await userRequest.post(`/groups`, _);
            return data;
        } catch (error: any) {
            console.log(error.response.data, "error")
            return rejectWithValue(error.response?.data || 'Failed to fetch Data');
        }
    }
);

// Refresh All Group Function
export const allGroup = createAsyncThunk(
    'auth/get-all-group',
    async (_: any, { rejectWithValue }) => {
        try {
            let data
            if (_.type === "student") {
                const result = await userRequest.get(`/my-groups/${_.id}`);
                data = result.data
            } else {
                data = await userRequest.get(`/groups`);
            }
            return data;
        } catch (error: any) {
            console.log(error)
            return rejectWithValue(error.response?.data || 'Failed to fetch Data');
        }
    }
);

// Get all Quiz
export const allQuiz = createAsyncThunk(
    'auth/get-all-quiz',
    async (_: any, { rejectWithValue }) => {
        try {
            let data
            if (_.type === "student") {
                const result = await userRequest.get(`/my-quizzes/${_.id}`);
                data = result.data
            } else {
                data = await userRequest.get(`/quizzes`);
            }
            return data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to fetch Data');
        }
    }
);




const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(allTeacherByCode.pending, (state) => {
                state.teacherAll = [];
            })
            .addCase(allTeacherByCode.fulfilled, (state, action) => {
                state.teacherAll = action.payload.data;
            })
            .addCase(TeacherCreateGroupCode.fulfilled, (state, action) => {
                state.teacherCode = action.payload.data.group_code;
            })
            .addCase(allGroup.fulfilled, (state, action) => {
                state.Group = action.payload.data;
            })
            .addCase(allQuizData.fulfilled, (state, action) => {
                state.quizData = action.payload;
            })
            .addCase(allQuiz.fulfilled, (state, action) => {
                state.quizzes = action.payload.data;
            })
    },
});


interface TeacherState {
    teacherAll: any;
    teacherCode: string;
    Group: any,
    quizData: any,
    quizzes: any
}


export default authSlice.reducer;
