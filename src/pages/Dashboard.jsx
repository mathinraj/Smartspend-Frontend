import React, { useEffect, useState } from 'react';
import SideMenu from '../components/SideMenu';
import api from '../services/api'; // Import the Axios instance

const DashboardPage = () => {
  const [expenses, setExpenses] = useState([]); // State to store expenses
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(''); // State to store error messages
  const [currentPage, setCurrentPage] = useState(1); // State to track current page
  const itemsPerPage = 5; // Number of items per page
  const username = localStorage.getItem('username'); // Get the logged-in user's username

  // Fetch expenses from the backend when the component mounts
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get('/expenses/get/all');
        console.log('Response from backend:', response.data); // Log the response
        setExpenses(response.data); // Set the fetched expenses in the state
      } catch (err) {
        setError('Failed to fetch expenses. Please try again later.'); // Handle errors
        console.error('Error fetching expenses:', err);
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchExpenses(); // Call the fetch function
  }, []);

  // Calculate the current expenses to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentExpenses = expenses.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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

          {/* Display loading spinner or error message */}
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
              <h3>Recent Expenses</h3>
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
                    {currentExpenses.map((expense) => (
                      <tr key={expense.id}>
                        <td>{expense.date}</td>
                        <td>{expense.categoryName || 'N/A'}</td>
                        <td>₹{expense.amount}</td>
                        <td>{expense.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <nav>
                <ul className="pagination">
                  {Array.from({ length: Math.ceil(expenses.length / itemsPerPage) }, (_, i) => (
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

export default DashboardPage;