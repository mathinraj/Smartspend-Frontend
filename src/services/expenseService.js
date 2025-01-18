import axios from 'axios';

const API_URL = 'http://localhost:8080/api/expenses';

export const addExpense = async (expense) => {
  const response = await axios.post(API_URL, expense);
  return response.data;
};

export const getCategories = async () => {
  const response = await axios.get('http://localhost:8080/api/categories');
  return response.data;
};