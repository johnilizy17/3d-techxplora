import axios from 'axios';

const baseURL = 'https://api.techxplora.co/api/v1';

export const publicRequest = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHTTPRequest"
    }
});

export const userRequest = axios.create({
    baseURL,
    headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHTTPRequest"
    }
});

// Simple token management helpers
export const setToken = (token) => {
    if (token) {
        localStorage.setItem('accessToken', token);
        userRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        localStorage.removeItem('accessToken');
        delete userRequest.defaults.headers.common['Authorization'];
    }
};

export const getToken = () => localStorage.getItem('accessToken');

// Initialize token if exists
const token = getToken();
if (token) {
    userRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}
