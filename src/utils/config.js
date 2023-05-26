import axios from "axios";

const defaultOptions = {
    baseURL: "http://45.12.72.210/api/base",
    headers: {
        'Content-Type': 'application/json',
    },
};

let axiosInstance = axios.create(defaultOptions);

axiosInstance.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export default axiosInstance;

export const url = "http://45.12.72.210"