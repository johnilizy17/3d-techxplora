import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import {
    getAccessToken,
    getRefreshToken,
    getTokenExpireTime,
    saveTokens,
    clearTokens,
    STORAGE,
    getNotification,
} from '@/utils/storage';
import { LOCAL_STORAGE_KEYS } from '@/utils/constants';
import { publicRequest, userRequest } from '@/url/api/server';

const initialState: AuthState = {
    token: getAccessToken(),
    refreshToken: getRefreshToken(),
    notification: getNotification() || null,
    isLoading: false,
    user: STORAGE.get(LOCAL_STORAGE_KEYS.USER) || {},
    history: {},
    isError: false,
    temporary: {},
    kyc: false
};

// Refresh Token Function
export const refreshToken = async (): Promise<string> => {
    try {
        const refreshToken = getRefreshToken();
        if (!refreshToken) throw new Error('Refresh token not found');

        // Check expiration
        const expireTime = getTokenExpireTime();
        if (Date.now() > expireTime) throw new Error('Refresh token expired');

        const response: AxiosResponse<{ data: RefreshTokenResponse }> =
            await userRequest.post('/auth/refresh-tokens', {
                refresh_token: refreshToken,
            });

        const newTokens = response.data.data;
        const access = {
            accessToken: newTokens.token,
            refreshToken: newTokens.refreshToken,
            expiresIn: 3000,
        }
        saveTokens(access);

        return access.accessToken;
    } catch (error: any) {
        console.error(
            'Error refreshing token:',
            error.response?.data || error.message
        );
        throw new Error('Token refresh failed');
    }
};

// Logout Thunk
export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_: any, { rejectWithValue }) => {
        try {
            // await userRequest.post('/auth/logout', {});
            clearTokens();
            return true;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Logout failed');
        }
    }
);

// Register User
export const authRegister = createAsyncThunk(
    'auth/register',
    async (payload: RegisterDto, { rejectWithValue }) => {
        try {
            const response: AxiosResponse<{ data: RegisterResponse }> =
                await publicRequest.post('/auth/signup', payload);
            const userData = response.data.data;
            return userData;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Registration failed');
        }
    }
);

// XP History 
export const xpHistory = createAsyncThunk(
    'xp/history',
    async (payload: { sender_id: string, account_id: string }, { rejectWithValue }) => {
        try {
            const response = await userRequest.post('/xp-history', payload);
            const userData = response.data.data;
            return userData;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Registration failed');
        }
    }
);

// Register User
export const authRegisterTeacher = createAsyncThunk(
    'auth/register',
    async (payload: RegisterDto, { rejectWithValue }) => {
        try {
            const response: AxiosResponse<{ data: RegisterResponse }> =
                await publicRequest.post('/register-teacher', payload);
            const userData = response.data.data;
            return userData;
        } catch (error: any) {
            const message = error.response?.data?.message.includes("Duplicate entry") ? "Email already exists" : error.response?.data;
            return rejectWithValue(message || 'Registration failed');
        }
    }
);

// Register User
export const authRegisterStudent = createAsyncThunk(
    'auth/register/students',
    async (payload: RegisterDto, { rejectWithValue }) => {
        try {
            const response: AxiosResponse<{ data: RegisterResponse }> =
                await userRequest.post('/register-student', payload);
            const userData = response.data.data;
            return userData;
        } catch (error: any) {
            const message = error.response?.data?.message.includes("Duplicate entry") ? "Email already exists" : error.response?.data;
            return rejectWithValue(message || 'Registration failed');
        }
    }
);

// Register User
export const authSubRegisterStudent = createAsyncThunk(
    'auth/register/Sub-students',
    async (payload: RegisterDto, { rejectWithValue }) => {
        try {
            const response: AxiosResponse<{ data: RegisterResponse }> =
                await userRequest.post(`/sub-student/${payload.parent_id}`, payload);
            const userData = response.data.data;
            return userData;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Registration failed');
        }
    }
);

// Email Verification
export const emailVerification = createAsyncThunk(
    'auth/emailVerification',
    async (token: string, { rejectWithValue }) => {
        try {
            await userRequest.get(`/auth/verify-email?token=${token}`);
            return true;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || 'Email verification failed'
            );
        }
    }
);
//
export const emailVerificationOTP = createAsyncThunk(
    'auth/verify-otp',
    async (payload: any, { rejectWithValue }) => {
        try {
            const result = await userRequest.post(`/auth/verify-otp`, payload);
            return true;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || 'Email verification failed'
            );
        }
    }
);
//
export const VerifyAdminCode = createAsyncThunk(
    'auth/Admin-otp',
    async (payload: any, { rejectWithValue }) => {
        try {
            const result = await userRequest.get(`/verify-admin-code/${payload.code}`);
            return result;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || 'Teacher Admin code failed'
            );
        }
    }
);
// Login User
export const authLogin = createAsyncThunk(
    'auth/login',
    async (data: LoginDto, { rejectWithValue }) => {
        try {
            const response: AxiosResponse<RegisterResponse> =
                await publicRequest.post('/login', data);

            saveTokens({
                accessToken: response.data.data.token,
                refreshToken: response.data.data.token,
                expiresIn: 300,
            });

            STORAGE.set(LOCAL_STORAGE_KEYS.USER, response.data.data);

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Login failed');
        }
    }
);
// Login User
export const authVerify = createAsyncThunk(
    'auth/login/verify',
    async (data: LoginDto, { rejectWithValue }) => {
        try {
            const response: AxiosResponse<RegisterResponse> =
                await publicRequest.post('/login/verify', data);

            saveTokens({
                accessToken: response.data.data.token,
                refreshToken: response.data.data.token,
                expiresIn: 300,
            });

            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Verify failed');
        }
    }
);


export const authForgottenPassword = createAsyncThunk(
    'auth/verify-otp',
    async (payload: EmailDto, { rejectWithValue }) => {
        try {
            const response = await publicRequest.post(
                `auth/verify-otp`,
                payload
            );
            saveTokens({
                accessToken: response.data.data.token,
                refreshToken: response.data.data.refreshToken,
                expiresIn: response.data.data.expires,
            });
            return response.data;
        } catch (error: any) {
            console.error('Error during authForgottenPassword:', error.response?.data.message);
            return rejectWithValue(
                error.response?.data.message || 'Failed to send password reset email'
            );
        }
    }
);

export const authVerifyPhone = createAsyncThunk(
    'auth/verifyPhone',
    async (payload: PhoneDto, { rejectWithValue }) => {
        try {
            const { data } = await userRequest.post(`auth/send-otp`, payload);
            return data;
        } catch (error: any) {
            console.error('Error during authVerifyPhone:', error);
            return rejectWithValue(
                error.response?.data || 'Failed to send phone verification OTP'
            );
        }
    }
);


export const authChangePage = createAsyncThunk(
    'auth/change-password',
    async (payload: changePasswordDto, { rejectWithValue }) => {
        try {
            const response = await userRequest.post(
                `auth/change-password`,
                payload
            );
            return true;
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data.message || 'Failed to send password reset email'
            );
        }
    }
);


export const authVerifyEmail = createAsyncThunk(
    'auth/verifyEmail',
    async (payload: EmailDto, { rejectWithValue }) => {
        try {
            const { data } = await userRequest.post(
                `auth/forgot-password`,
                payload
            );
            return data;
        } catch (error: any) {
            console.error('Error during authVerifyEmail:', error);
            return rejectWithValue(
                error.response?.data || 'Failed to send email verification'
            );
        }
    }
);

export const getProfile = createAsyncThunk(
    'auth/user/get',
    async (_: any, { rejectWithValue }) => {
        try {
            if (_.role === "student") {
                const { data } = await userRequest.get(`students/${_.id}`);
                return data;
            } else {
                const { data } = await userRequest.get(`teachers/${_.id}`);
                return data;
            }
        } catch (error: any) {
            return rejectWithValue(
                error.response?.data || 'Failed to fetech profile'
            );
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (
            state,
            action
        ) => {
            state.user = action.payload;
        },
        setNotification: (
            state,
            action
        ) => {
            state.notification = action.payload;
            STORAGE.set(LOCAL_STORAGE_KEYS.Notification_TOKEN, action.payload);

        },
        setTemporaryStorage: (
            state,
            action
        ) => {
            state.temporary = action.payload;
        },
        logout: (state) => {
            state.token = null;
            state.refreshToken = null;
            state.user = null;
            clearTokens();
        },
        setKYC: (state, action: PayloadAction<boolean>) => {
            state.kyc = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(logoutUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.token = null;
                state.refreshToken = null;
                state.user = {};
                state.isLoading = false;
            })
            .addCase(logoutUser.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(authRegister.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(authRegister.fulfilled, (state, action) => {
                state.isLoading = false;
            })

            .addCase(xpHistory.fulfilled, (state, action) => {
                state.history = action.payload;
            })
            .addCase(getProfile.fulfilled, (state, action) => {
                state.user = {
                    ...state.user,   // former payload (existing state)
                    ...action.payload, // new payload (from API)
                    is_admin: state.user.is_admin
                };
            })
            .addCase(authRegister.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })
            .addCase(authLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(authLogin.fulfilled, (state, action) => {
                state.token = action.payload.data.token;
                state.refreshToken = action.payload.data.token;
                state.user = action.payload.data;
                state.isLoading = false;
            })
            .addCase(authLogin.rejected, (state) => {
                state.isLoading = false;
                state.isError = true;
            })

            .addCase(authVerify.fulfilled, (state, action) => {
                state.token = action.payload.data.token;
                state.refreshToken = action.payload.data.token;
                state.isLoading = false;
            })
    },
});

interface AuthState {
    token: string | null;
    refreshToken: string | null;
    notification: string | null;
    isLoading: boolean;
    user: any;
    history: any;
    isError: boolean;
    temporary: any;
    kyc: boolean;
}

interface RefreshTokenResponse {
    token: string,
    expires: string,
    refreshToken: string;
}
interface RegisterDto {
    firstName: string;
    lastName: string;
    email: string;
    parent_id: string;
    password: string;
}

interface RegisterResponse {
    data: {
        profile: {
            user_id: string,
            first_name: string,
            last_name: string,
            email_address: string,
            phone_number: string,
            email_verified: number,
            role_id: string,
        },
        token: string,
        expires: string,
        refreshToken: string
    };
}

interface LoginDto {
    email: string;
    password: string;
}

interface EmailDto {
    email: string;
}
interface PhoneDto {
    phone_number: string;
}
interface changePasswordDto {
    password: string;
    confirm_password: string;
}

export const { setAuth, logout, setTemporaryStorage, setNotification, setKYC } = authSlice.actions;
export default authSlice.reducer;
