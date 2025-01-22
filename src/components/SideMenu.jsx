// src/components/SideMenu.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = () => {
  const role = localStorage.getItem('role'); // Get the user's role from localStorage

  return (
    <div className="bg-light border-end" style={{ width: '250px', minHeight: '100vh' }}>
      <div className="p-3">
        <h4 className="mb-4">Menu</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">Financial Horizon</Link>
          </li>
          <li className="nav-item">
            <Link to="/transactions" className="nav-link">Expense Explorer</Link>
          </li>
          <li className="nav-item">
            <Link to="/calendar" className="nav-link">Money Map</Link>
          </li>
          {role === 'ADMIN' && (
            <>
              <li className="nav-item">
                <Link to="/categories" className="nav-link">Category Corner</Link>
              </li>
              <li className="nav-item">
                <Link to="/budgets" className="nav-link">Budget Compass</Link>
              </li>
              <li className="nav-item">
                <Link to="/users" className="nav-link">User Basecamp</Link>
              </li>
            </>
          )}          
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;