
// import axios from "axios";

// // ✅ Set base URL (from env or fallback for local dev)
// const instance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
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

// Axios Instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // Cookie automatically send hogi
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
instance.interceptors.request.use(
  (config) => {
    console.log("Request:", config);
    return config;
  },
  (error) => {
    console.error("Request Error:", error);
    return Promise.reject(error);
  }
);

// Response Interceptor
instance.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  (error) => {
    console.error("API Error:", error.response || error.message);
    return Promise.reject(error);
  }
);

// API Methods
export const get = (url, config = {}) => instance.get(url, config);

export const post = (url, data = {}, config = {}) =>
  instance.post(url, data, config);

export const put = (url, data = {}, config = {}) =>
  instance.put(url, data, config);

export const delet = (url, config = {}) =>
  instance.delete(url, config);

export default instance;

 