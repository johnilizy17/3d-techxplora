import axios from 'axios';
import axiosRetry from 'axios-retry';
import { store } from '@/url/redux/store';
import {
    getAccessToken,
    getRefreshToken,
    saveTokens,
    clearTokens,
} from '@/utils/storage';
import ROUTES from '@/utils/ROUTES';
import { logout } from '@/url/redux/slices/authSlice';


const baseURL = 'https://api.techxplora.co/api/v1';

// const baseURL = 'http://127.0.0.1:8000/api/v1';

export const userRequest = axios.create({ baseURL, headers: { "Content-Type": "application/json", "X-Requested-With": "XMLHTTPRequest" } });
export const publicRequest = axios.create({ baseURL, headers: { "Content-Type": "application/json", "X-Requested-With": "XMLHTTPRequest" } });
export const userFileUpload = axios.create({
    baseURL,
    headers: { 'Content-Type': 'multipart/form-data' },
});

let refreshAttempted = false; // Track refresh failure

const handleLogout = async () => {
    refreshAttempted = false;
    clearTokens();
    await store.dispatch(logout());

    if (window.location.pathname === ROUTES.login) return;

    window.location.href = ROUTES.login;
};

// Request Interceptor: Attach Token
userRequest.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

userFileUpload.interceptors.request.use(
    (config) => {
        const token = getAccessToken();
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor: Handle Token Expiry
userRequest.interceptors.response.use(
    (response) => response,
    async (error) => {

        const originalRequest = error.config;

        // If 401 and not retried yet\
        console.log('Error response:', error.response);
        if (error.response.status === 401 && !originalRequest._retry) {
            
            if (refreshAttempted) {
                handleLogout(); // Logout after one failed refresh
                return Promise.reject(error);
            }

            originalRequest._retry = true;
            refreshAttempted = true;
        }
        //   try {
        //     const refreshToken = getRefreshToken();
        //     if (!refreshToken) throw new Error('No refresh token available');

        //     const { data } = await axios.post(`${baseURL}auth/refresh-tokens`, {
        //       refresh_token: refreshToken,
        //     });

        //     saveTokens({
        //       accessToken: data.data.access.token,
        //       refreshToken: data.data.refresh.token,
        //       expiresIn: data.data.access.expires,
        //     });

        //     originalRequest.headers.Authorization = `Bearer ${data.data.access.token}`;
        //     return axios(originalRequest);
        //   } catch (refreshError) {
        //     handleLogout();
        //     return Promise.reject(refreshError);
        //   }
        // }

        return Promise.reject(error);
    }
);

// Apply Axios Retry (Retries only once)
axiosRetry(userRequest, {
    retries: 1,
});
