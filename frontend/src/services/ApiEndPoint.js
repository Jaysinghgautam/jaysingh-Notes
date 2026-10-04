import axios from "axios";

// Base URL (from env or fallback for local dev)
const rawBaseURL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const baseURL = rawBaseURL.replace(/\/$/, "");

const instance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor: attach token from localStorage for cross-origin deployment support
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

// Wrapper functions for API calls (supporting optional config)
export const get = (url, config = {}) => instance.get(url, config);
export const post = (url, data, config = {}) => instance.post(url, data, config);
export const put = (url, data, config = {}) => instance.put(url, data, config);
export const delet = (url, config = {}) => instance.delete(url, config);

export default instance;

 