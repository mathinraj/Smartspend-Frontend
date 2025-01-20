// src/api.js
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

// Add a response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response, // Return the response if successful
  (error) => {
    // Handle errors globally
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('API Error:', error.response.data);
      throw new Error(error.response.data.message || 'An error occurred.');
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Network Error:', error.request);
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something happened in setting up the request
      console.error('Request Error:', error.message);
      throw new Error('An unexpected error occurred.');
    }
  }
);

export default api;