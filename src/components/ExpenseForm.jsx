import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addExpense } from '../services/expenseService';

function ExpenseForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    categoryId: '',
    date: new Date().toISOString().split('T')[0], // Default to today's date
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.amount || !formData.description || !formData.categoryId || !formData.date) {
      setError('All fields are required.');
      return;
    }

    if (isNaN(formData.amount) || formData.amount <= 0) {
      setError('Amount must be a positive number.');
      return;
    }

    try {
      // Call the API to add the expense
      const newExpense = await addExpense(formData);
      onSubmit(newExpense); // Pass the new expense back to the parent component
      setError('');
      navigate('/transactions'); // Redirect to the transactions page after successful submission
    } catch (err) {
      setError('Failed to add expense. Please try again.');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Add Expense</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            min="1"
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter description"
          />
        </div>
        <div>
          <label>Category:</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            <option value="1">Food</option>
            <option value="2">Transport</option>
            <option value="3">Entertainment</option>
            <option value="4">Utilities</option>
            {/* Add more categories dynamically from your backend */}
          </select>
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default ExpenseForm;