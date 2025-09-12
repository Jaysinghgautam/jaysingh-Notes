// import axios from 'axios';

//  const instance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
// });


// export const get = (url, params) => instance.get(url, { params });
// export const post = (url, data) => instance.post(url, data);
// export const put = (url, data) => instance.put(url, data);
// export const delet = (url) => instance.delete(url);

// // Add a request interceptor
// instance.interceptors.request.use(function (config) {
//     // Log the request config for debugging
//     console.log('Request Config:', config);
//     return config;
// }, function (error) {
//     // Do something with request error
//     console.error('Request Error:', error);
//     return Promise.reject(error);
// });

// // Add a response interceptor
// instance.interceptors.response.use(function (response) {
//     // Log the response data for debugging
//     console.log('Apis Response', response);
//     return response;
// }, function (error) {
//     // Log the error message for debugging
//     console.log('Api Error', error.message);
//     return Promise.reject(error);
// });



// src/services/ApiEndPoint.js
import axios from "axios";

// ✅ Set base URL (from env or fallback for local dev)
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// ✅ Add request interceptor
instance.interceptors.request.use(
  (config) => {
    console.log("Request Config:", config); // Debug request
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// ✅ Add response interceptor
instance.interceptors.response.use(
  (response) => {
    console.log("API Response:", response); // Debug response
    return response;
  },
  (error) => {
    console.error("API Error:", error.message); // Debug error
    return Promise.reject(error);
  }
);

// ✅ Wrapper functions for API calls
export const get = (url, params) => instance.get(url, { params });
export const post = (url, data) => instance.post(url, data);
export const put = (url, data) => instance.put(url, data);
export const delet = (url) => instance.delete(url);

export default instance;
