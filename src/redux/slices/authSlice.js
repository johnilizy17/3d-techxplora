import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const loadAuthState = () => {
    try {
        const serializedState = localStorage.getItem('auth');
        if (serializedState === null) {
            return {
                user: null,
                token: null,
                isAuthenticated: false,
                tempVerification: {
                    code: null,
                    phone: null,
                    type: null, // 'email' or 'phone'
                },
                tempStorage: null,
                history: []
            };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return {
            user: null,
            token: null,
            isAuthenticated: false,
            history: []
        };
    }
};

// Save state to localStorage
const saveAuthState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('auth', serializedState);
    } catch (err) {
        console.error('Error saving auth state:', err);
    }
};

const initialState = loadAuthState();

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            state.isAuthenticated = true;
            saveAuthState(state);
        },
        updateUser: (state, action) => {
            state.user = { ...state.user, ...action.payload };
            saveAuthState(state);
        },
        setHistory: (state, action) => {
            state.history = action.payload;
            saveAuthState(state);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.history = [];
            state.tempVerification = {
                code: null,
                phone: null,
                type: null,
            };
            localStorage.removeItem('auth');
        },
        setTemporaryVerification: (state, action) => {
            state.tempVerification = {
                ...state.tempVerification,
                ...action.payload,
            };
        },
        clearTemporaryVerification: (state) => {
            state.tempVerification = {
                code: null,
                phone: null,
                type: null,
            };
        },
        setTemporaryStorage: (state, action) => {
            state.tempStorage = action.payload;
            saveAuthState(state);
        },
    },
});

export const {
    setCredentials,
    updateUser,
    setHistory,
    logout,
    setTemporaryVerification,
    clearTemporaryVerification,
    setTemporaryStorage
} = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectTempStorage = (state) => state.auth.tempStorage;
export const selectHistory = (state) => state.auth.history;

export default authSlice.reducer;
