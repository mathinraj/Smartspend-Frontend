import React from 'react';
import SideMenu from '../components/SideMenu';

const DashboardPage = () => {
  const username = localStorage.getItem('username');
    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="d-flex flex-grow-1">
                <SideMenu />
                <div className="flex-grow-1 p-4">
                    <h1>Dashboard</h1>
                    <p>Welcome, <strong>{username}</strong>! Here, you can track your expenses, manage categories, and more.</p>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">Expense Summary</h5>
                                    <p className="card-text">Placeholder for expense summary chart.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card mb-4">
                                <div className="card-body">
                                    <h5 className="card-title">Recent Transactions</h5>
                                    <p className="card-text">Placeholder for recent transactions.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;