import React, { useState } from 'react';
import api from '../../services/api'; // Import the Axios instance

const BudgetForm = ({ budget, onSubmit, onCancel }) => {
  const [amount, setAmount] = useState(budget ? budget.amount : ''); // State for budget amount
  const [categoryId, setCategoryId] = useState(budget ? budget.categoryId : ''); // State for category ID
  const [startDate, setStartDate] = useState(budget ? budget.startDate : ''); // State for start date
  const [endDate, setEndDate] = useState(budget ? budget.endDate : ''); // State for end date
  const [error, setError] = useState(''); // State for error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!amount || !categoryId || !startDate || !endDate) {
      setError('All fields are required.');
      return;
    }

    const budgetData = {
      amount: parseFloat(amount),
      categoryId: parseInt(categoryId),
      startDate,
      endDate,
    };

    try {
      let response;
      if (budget) {
        // Update an existing budget
        response = await api.put(`/budget/update/${budget.id}`, budgetData);
      } else {
        // Create a new budget
        response = await api.post('/budget/set', budgetData);
      }

      // Call the onSubmit callback with the created/updated budget
      onSubmit(response.data);

      // Clear the form fields
      if (!budget) {
        setAmount('');
        setCategoryId('');
        setStartDate('');
        setEndDate('');
      }
      setError('');
    } catch (err) {
      setError(budget ? 'Failed to update budget. Please try again.' : 'Failed to create budget. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{budget ? 'Edit Budget' : 'Add Budget'}</h5>
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
            <label htmlFor="startDate" className="form-label">Start Date</label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">End Date</label>
            <input
              type="date"
              id="endDate"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary me-2">
            {budget ? 'Update' : 'Add'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default BudgetForm;