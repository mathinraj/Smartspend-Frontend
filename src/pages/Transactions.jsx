// src/pages/Transactions.jsx
import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/Expenses/ExpenseForm';
import SideMenu from '../components/SideMenu';
import api from '../services/api'; // Import the Axios instance

const TransactionsPage = () => {
  const [expenses, setExpenses] = useState([]); // State to store expenses
  const [showForm, setShowForm] = useState(false); // State to toggle the form
  const [editingExpense, setEditingExpense] = useState(null); // State to track the expense being edited
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

  // Handle form submission (add or update)
  const handleSubmit = (expense) => {
    if (editingExpense) {
      // Update the existing expense in the list
      setExpenses(expenses.map((e) => (e.id === expense.id ? expense : e)));
      setEditingExpense(null); // Clear the editing state
    } else {
      // Add the new expense to the list
      setExpenses([...expenses, expense]);
    }
    setShowForm(false); // Hide the form
  };

  // Handle editing an expense
  const handleEdit = (expense) => {
    setEditingExpense(expense); // Set the expense to be edited
    setShowForm(true); // Show the form
  };

  // Handle deleting an expense
  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/delete/${id}`); // Send a DELETE request
      setExpenses(expenses.filter((e) => e.id !== id)); // Remove the expense from the list
    } catch (err) {
      setError('Failed to delete expense. Please try again.');
      console.error('Error deleting expense:', err);
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
          ) : (
            <>
              <button
                className="btn btn-primary mb-3"
                onClick={() => {
                  setEditingExpense(null); // Clear the editing state
                  setShowForm(!showForm); // Toggle the form
                }}
              >
                {showForm ? 'Hide Form' : 'Add Expense'}
              </button>
              {showForm && (
                <ExpenseForm
                  expense={editingExpense}
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setShowForm(false); // Hide the form
                    setEditingExpense(null); // Clear the editing state
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