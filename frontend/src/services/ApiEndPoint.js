
// import axios from "axios";

// // ✅ Set base URL (from env or fallback for local dev)
// const instance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });

// // ✅ Add request interceptor
// instance.interceptors.request.use(
//   (config) => {
//     console.log("Request Config:", config); // Debug request
//     return config;
//   },
//   (error) => {
//     console.error("Request Error:", error);
//     return Promise.reject(error);
//   }
// );

// // ✅ Add response interceptor
// instance.interceptors.response.use(
//   (response) => {
//     console.log("API Response:", response); // Debug response
//     return response;
//   },
//   (error) => {
//     console.error("API Error:", error.message); // Debug error
//     return Promise.reject(error);
//   }
// );

// // ✅ Wrapper functions for API calls
// export const get = (url, params) => instance.get(url, { params });
// export const post = (url, data) => instance.post(url, data);
// export const put = (url, data) => instance.put(url, data);
// export const delet = (url) => instance.delete(url);

// export default instance;

 import axios from "axios";

// ✅ Create Axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/notes", 
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Request interceptor → Attach token automatically
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("Request Config:", config);
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// ✅ Response interceptor → Debug responses & errors
instance.interceptors.response.use(
  (response) => {
    console.log("API Response:", response);
    return response;
  },
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ✅ Wrapper functions
export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, data);
export const put = (url, data) => instance.put(url, data);
export const delet = (url) => instance.delete(url);

export default instance;
