// src/pages/Transactions.jsx
import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/Expenses/ExpenseForm';
import SideMenu from '../components/SideMenu';
import api from '../services/api'; // Import the Axios instance

const TransactionsPage = () => {
  const [expenses, setExpenses] = useState([]); // State to store expenses
  const [showForm, setShowForm] = useState(false); // State to toggle the form
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(''); // State to store error messages

  // Fetch expenses from the backend when the component mounts
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get('/expenses/get/all');
        setExpenses(response.data);
      } catch (err) {
        setError('Failed to fetch expenses. Please try again later.');
        console.error('Error fetching expenses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Handle form submission
  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]); // Add the new expense to the list
    setShowForm(false); // Hide the form
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1">
        <SideMenu />
        <div className="flex-grow-1 p-4">
          <h1>Transactions</h1>
          {loading ? (
            <div className="text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : error ? (
            <div className="alert alert-danger">{error}</div>
          ) : (
            <>
              <button
                className="btn btn-primary mb-3"
                onClick={() => setShowForm(!showForm)}
              >
                {showForm ? 'Hide Form' : 'Add Expense'}
              </button>
              {showForm && (
                <ExpenseForm onSubmit={handleAddExpense} onCancel={() => setShowForm(false)} />
              )}
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr key={expense.id}>
                        <td>{expense.date}</td>
                        <td>{expense.categoryName}</td>
                        <td>${expense.amount}</td>
                        <td>{expense.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;