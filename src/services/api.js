import axios from 'axios';

const API_BASE_URL = 'http://localhost:8123'; // Replace with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include Basic Authentication headers
api.interceptors.request.use((config) => {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  if (username && password) {
    // Encode the username and password in Base64
    const token = btoa(`${username}:${password}`);
    config.headers.Authorization = `Basic ${token}`;
  }

  return config;
});

export default api;