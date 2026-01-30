import axios, { type AxiosError } from 'axios';
import type { ApiError } from '../types';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to attach token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for global error handling
api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<ApiError>) => {
        const message = error.response?.data?.message || 'Something went wrong';

        // Handle 401 Unauthorized globally
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            // Optional: window.location.href = '/login';
        }

        console.error('API Error:', message);
        return Promise.reject(error.response?.data || { message });
    }
);

export default api;
