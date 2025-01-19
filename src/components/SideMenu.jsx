import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SideMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const role = localStorage.getItem('role');

    return (
        <div className={`bg-light border-end ${isOpen ? 'open' : ''}`} style={{ width: '250px', minHeight: '100vh' }}>
            <button className="btn btn-primary d-lg-none" onClick={() => setIsOpen(!isOpen)}>
                {isOpen ? 'Close Menu' : 'Open Menu'}
            </button>
            <div className="p-3">
                <h4 className="mb-4">Menu</h4>
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/transactions" className="nav-link">Transactions</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/categories" className="nav-link">Categories</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/budgets" className="nav-link">Budgets</Link>
                    </li>
                    {role === 'admin' && (
                        <li className="nav-item">
                            <Link to="/users" className="nav-link">Users</Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default SideMenu;