import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export const registerUser = async (data) => {
    try {
        const response = await api.post('/auth/register', data);
        return response.data;
    } catch (error) {
        console.error("Registration Error: ", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Registration failed');
    }
};

export const loginUser = async (data) => {
    try {
        const response = await api.post('/auth/login', data);
        return response.data;
    } catch (error) {
        console.error("Login Error: ", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Login failed');
    }
};

export const postJob = async (data) => {
    try {
        const response = await api.post('/jobs/post-job', data);
        return response.data;
    } catch (error) {
        console.error("Post Job Error: ", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Failed to post job');
    }
};

export const getJobs = async () => {
    try {
        const response = await api.get('/jobs');
        return response.data;
    } catch (error) {
        console.error("Get Jobs Error: ", error.response?.data?.message || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch jobs');
    }
};
