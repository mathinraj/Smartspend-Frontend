// src/services/authService.js
import axios from 'axios';
import { API_BASE_URL } from '../utils/api';

const login = async (username, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, { username, password });
    return response.data; // Assuming the backend returns a token
  } catch (error) {
      console.log(error)
    throw error;
  }
};

export default { login };