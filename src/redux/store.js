import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import baseApi from './api/baseApi';
import authReducer from './slices/authSlice';
import questionReducer from './slices/questionSlice';
import teacherReducer from './slices/teacherSlice';
import studentReducer from './slices/studentSlice';

export const store = configureStore({
    reducer: {
        // Add the RTK Query API reducer
        [baseApi.reducerPath]: baseApi.reducer,
        // Add slice reducers
        auth: authReducer,
        question: questionReducer,
        teacher: teacherReducer,
        student: studentReducer,
    },
    // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

// Optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export default store;
