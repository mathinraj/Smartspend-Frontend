// src/pages/Transactions.jsx
import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/Expenses/ExpenseForm';
import SideMenu from '../components/SideMenu';
import api from '../services/api';

const TransactionsPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch expenses from the backend when the component mounts
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get('/expenses/get/all');
        setExpenses(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch expenses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Handle form submission (add or update)
  const handleSubmit = (expense) => {
    if (editingExpense) {
      // Update the existing expense in the list
      setExpenses(expenses.map((e) => (e.id === expense.id ? expense : e)));
      setEditingExpense(null);
    } else {
      // Add the new expense to the list
      setExpenses([...expenses, expense]);
    }
    setShowForm(false);
  };

  // Handle deleting an expense
  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/delete/${id}`);
      setExpenses(expenses.filter((e) => e.id !== id));
    } catch (err) {
      setError(err.message || 'Failed to delete expense. Please try again.');
    }
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
          ) : expenses.length === 0 ? (
            <div className="alert alert-info">No expenses found.</div>
          ) : (
            <>
              <button
                className="btn btn-primary mb-3"
                onClick={() => {
                  setEditingExpense(null);
                  setShowForm(!showForm);
                }}
              >
                {showForm ? 'Hide Form' : 'Add Expense'}
              </button>
              {showForm && (
                <ExpenseForm
                  expense={editingExpense}
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setShowForm(false);
                    setEditingExpense(null);
                  }}
                />
              )}
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Amount</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.map((expense) => (
                      <tr key={expense.id}>
                        <td>{expense.date}</td>
                        <td>{expense.categoryName}</td>
                        <td>${expense.amount}</td>
                        <td>{expense.description}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => handleEdit(expense)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            onClick={() => handleDelete(expense.id)}
                          >
                            Delete
                          </button>
                        </td>
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