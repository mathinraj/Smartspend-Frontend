import React, { useEffect, useState } from 'react';
import SideMenu from '../components/SideMenu';
import api from '../services/api';

const DashboardPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const username = localStorage.getItem('username');

  // Get the current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed, so add 1
  const currentYear = currentDate.getFullYear();

  // Fetch expenses when the component mounts
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get('/expenses/get/all');
        const sortedExpenses = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setExpenses(sortedExpenses);
      } catch (err) {
        setError('Failed to fetch expenses. Please try again later.');
        console.error('Error fetching expenses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Filter expenses for the current month
  const currentMonthExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() + 1 === currentMonth && // Check if the month matches
      expenseDate.getFullYear() === currentYear // Check if the year matches
    );
  });

  // Calculate total income, expenses, and balance for the current month
  const totalIncome = currentMonthExpenses
    .filter((expense) => expense.amount >= 0) // Filter for income (positive amounts)
    .reduce((sum, expense) => sum + expense.amount, 0); // Sum up income

  const totalExpense = currentMonthExpenses
    .filter((expense) => expense.amount < 0) // Filter for expenses (negative amounts)
    .reduce((sum, expense) => sum + Math.abs(expense.amount), 0); // Sum up expenses (convert to positive)

  const balance = totalIncome - totalExpense; // Calculate balance

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1">
        <SideMenu />
        <div className="flex-grow-1 p-4">
          <h1>Dashboard</h1>
          <p>
            Welcome, <strong>{username}</strong>! Here, you can track your expenses, manage
            categories, and more.
          </p>

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
              <h3>Summary for {new Date().toLocaleString('default', { month: 'long' })} {currentYear}</h3>
              <div className="row">
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Total Income</h5>
                      <p className="card-text text-success">₹{totalIncome.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Total Expense</h5>
                      <p className="card-text text-danger">₹{totalExpense.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Balance</h5>
                      <p className="card-text" style={{ color: balance >= 0 ? 'green' : 'red' }}>
                        ₹{balance.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h3>Recent Transactions</h3>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {expenses.slice(0, 5).map((expense) => (
                      <tr key={expense.id}>
                        <td>{expense.date}</td>
                        <td>{expense.categoryName || 'N/A'}</td>
                        <td>{expense.amount >= 0 ? 'Income' : 'Expense'}</td>
                        <td>₹{Math.abs(expense.amount).toFixed(2)}</td>
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

export default DashboardPage;