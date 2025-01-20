// src/components/Expenses/ExpenseForm.jsx
import React, { useState, useEffect } from 'react';
import api from '../../services/api'; // Import the Axios instance

const ExpenseForm = ({ expense, onSubmit, onCancel }) => {
  const [amount, setAmount] = useState(expense ? expense.amount : '');
  const [description, setDescription] = useState(expense ? expense.description : '');
  const [categoryId, setCategoryId] = useState(expense ? expense.categoryId : '');
  const [userId, setUserId] = useState(expense ? expense.userId : '');
  const [date, setDate] = useState(expense ? expense.date : '');
  const [error, setError] = useState('');

  // Pre-fill the form if editing an existing expense
  useEffect(() => {
    if (expense) {
      setAmount(expense.amount);
      setDescription(expense.description);
      setCategoryId(expense.categoryId); // Ensure categoryId is set
      setUserId(expense.userId); // Ensure userId is set
      setDate(expense.date);
    }
  }, [expense]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input fields
    if (!amount || !description || !categoryId || !userId || !date) {
      setError('All fields are required.');
      return;
    }

    // Create the expense object
    const expenseData = {
      amount: parseFloat(amount),
      description,
      categoryId: parseInt(categoryId),
      userId: parseInt(userId),
      date,
    };

    try {
      let response;
      if (expense) {
        // Update an existing expense
        response = await api.put(`/expenses/update/${expense.id}`, expenseData);
      } else {
        // Create a new expense
        response = await api.post('/expenses/add', expenseData);
      }

      // Call the onSubmit callback with the created/updated expense
      onSubmit(response.data);

      // Clear the form fields
      if (!expense) {
        setAmount('');
        setDescription('');
        setCategoryId('');
        setUserId('');
        setDate('');
      }
      setError('');
    } catch (err) {
      setError(expense ? 'Failed to update expense. Please try again.' : 'Failed to create expense. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{expense ? 'Edit Expense' : 'Add Expense'}</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="amount" className="form-label">Amount</label>
            <input
              type="number"
              id="amount"
              className="form-control"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input
              type="text"
              id="description"
              className="form-control"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categoryId" className="form-label">Category ID</label>
            <input
              type="number"
              id="categoryId"
              className="form-control"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="userId" className="form-label">User ID</label>
            <input
              type="number"
              id="userId"
              className="form-control"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="date" className="form-label">Date</label>
            <input
              type="date"
              id="date"
              className="form-control"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary me-2">
            {expense ? 'Update' : 'Add'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExpenseForm;