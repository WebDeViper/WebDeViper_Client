import axios from 'axios';

export const API = axios.create({
  // baseURL: import.meta.env.PROD ? apiUrl() : import.meta.env.VITE_APP_API_URL,
  baseURL: 'http://localhost:8001/api',
});

API.interceptors.request.use(
  function (config) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('accessToken');
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.data.msg === '토큰 만료') {
      window.location.reload();
    }

    return Promise.reject(error);
  }
);
