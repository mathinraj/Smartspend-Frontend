
// src/pages/Budgets.jsx
import React, { useState, useEffect } from 'react';
import BudgetForm from '../components/Budgets/BudgetForm';
import BudgetList from '../components/Budgets/BudgetList';
import BudgetProgress from '../components/Budgets/BudgetProgress';
import SideMenu from '../components/SideMenu';
import api from '../services/api'; // Import the Axios instance

const BudgetsPage = () => {
  const [budgets, setBudgets] = useState([]); // State to store budgets
  const [showForm, setShowForm] = useState(false); // State to toggle the form
  const [editingBudget, setEditingBudget] = useState(null); // State to track the budget being edited
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(''); // State to store error messages

  // Fetch budgets from the backend when the component mounts
  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const response = await api.get('/budget/get/all');
        setBudgets(response.data);
      } catch (err) {
        setError('Failed to fetch budgets. Please try again later.');
        console.error('Error fetching budgets:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBudgets();
  }, []);

  // Handle form submission (add or update)
  const handleSubmit = (budget) => {
    if (editingBudget) {
      // Update the existing budget in the list
      setBudgets(budgets.map((b) => (b.id === budget.id ? budget : b)));
      setEditingBudget(null); // Clear the editing state
    } else {
      // Add the new budget to the list
      setBudgets([...budgets, budget]);
    }
    setShowForm(false); // Hide the form
  };

  // Handle deleting a budget
  const handleDelete = (id) => {
    setBudgets(budgets.filter((b) => b.id !== id)); // Remove the budget from the list
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1">
        <SideMenu />
        <div className="flex-grow-1 p-4">
          <h1>Budgets</h1>
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
                  setEditingBudget(null); // Clear the editing state
                  setShowForm(!showForm); // Toggle the form
                }}
              >
                {showForm ? 'Hide Form' : 'Add Budget'}
              </button>
              {showForm && (
                <BudgetForm
                  budget={editingBudget}
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setShowForm(false); // Hide the form
                    setEditingBudget(null); // Clear the editing state
                  }}
                />
              )}
              <BudgetList
                budgets={budgets}
                onEdit={setEditingBudget}
                onDelete={handleDelete}
              />
              <BudgetProgress budgets={budgets} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BudgetsPage;