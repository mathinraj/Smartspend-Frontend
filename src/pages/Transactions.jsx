import React, { useState, useEffect } from 'react';
import ExpenseForm from '../components/Expenses/ExpenseForm';
import SideMenu from '../components/SideMenu';
import api from '../services/api';
import TransactionFilter from '../components/Transactions/TransactionFilter';

const TransactionsPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get('/expenses/get/all');
        const sortedExpenses = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setExpenses(sortedExpenses);
        setFilteredExpenses(sortedExpenses);
      } catch (err) {
        setError(err.message || 'Failed to fetch expenses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  const handleSubmit = (expense) => {
    let updatedExpenses;

    if (editingExpense) {
      updatedExpenses = expenses.map((e) => (e.id === expense.id ? expense : e));
    } else {
      updatedExpenses = [...expenses, expense];
    }

    const sortedExpenses = updatedExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
    setExpenses(sortedExpenses);
    setFilteredExpenses(sortedExpenses);
    setEditingExpense(null);
    setShowForm(false);
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/delete/${id}`);
      const updatedExpenses = expenses.filter((e) => e.id !== id);
      const updatedFilteredExpenses = filteredExpenses.filter((e) => e.id !== id);
      const sortedExpenses = updatedExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
      const sortedFilteredExpenses = updatedFilteredExpenses.sort((a, b) => new Date(b.date) - new Date(a.date));
      setExpenses(sortedExpenses);
      setFilteredExpenses(sortedFilteredExpenses);
    } catch (err) {
      setError(err.message || 'Failed to delete expense. Please try again.');
    }
  };

  const handleFilter = ({ category, startDate, endDate }) => {
    const filtered = expenses.filter((expense) => {
      const matchesCategory = category ? expense.categoryName === category : true;
      const matchesStartDate = startDate ? expense.date >= startDate : true;
      const matchesEndDate = endDate ? expense.date <= endDate : true;
      return matchesCategory && matchesStartDate && matchesEndDate;
    });

    const sortedFilteredExpenses = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    setFilteredExpenses(sortedFilteredExpenses);
    setCurrentPage(1);
  };

  const handleClearFilter = () => {
    setFilteredExpenses(expenses);
    setCurrentPage(1);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExpenses = filteredExpenses.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1">
        <SideMenu />
        <div className="flex-grow-1 p-4">
          <h1>Expense Explorer <i class="fa-brands fa-wpexplorer"></i></h1>
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
                {showForm ? 'Hide Form' : 'Add Transaction'}
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

              <TransactionFilter onFilter={handleFilter} onClear={handleClearFilter} />

              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentExpenses.map((expense) => (
                      <tr key={expense.id}>
                        <td>{expense.date}</td>
                        <td>{expense.categoryName}</td>
                        <td>{expense.amount >= 0 ? 'Income' : 'Expense'}</td>
                        <td>₹{Math.abs(expense.amount)}</td>
                        <td>{expense.description}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary me-2"
                            onClick={() => setEditingExpense(expense)}
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

              <nav>
                <ul className="pagination">
                  {Array.from({ length: Math.ceil(filteredExpenses.length / itemsPerPage) }, (_, i) => (
                    <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                      <button onClick={() => paginate(i + 1)} className="page-link">
                        {i + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;