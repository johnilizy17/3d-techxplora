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
            };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return {
            user: null,
            token: null,
            isAuthenticated: false,
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
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            localStorage.removeItem('auth');
        },
    },
});

export const { setCredentials, updateUser, logout } = authSlice.actions;

// Selectors
export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
