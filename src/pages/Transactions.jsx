import React, { useState, useEffect } from 'react';
import TransactionFilter from '../components/Transactions/TransactionFilter';
import TransactionList from '../components/Transactions/TransactionList';
import SideMenu from '../components/SideMenu';

const TransactionsPage = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setTransactions([
                { id: 1, date: '2023-10-01', category: 'Food', amount: 50, description: 'Groceries' },
                { id: 2, date: '2023-10-02', category: 'Transport', amount: 20, description: 'Bus fare' },
                { id: 3, date: '2023-10-03', category: 'Entertainment', amount: 30, description: 'Movie tickets' },
            ]);
            setLoading(false);
        }, 1000);
    }, []);

    const handleFilter = ({ category, startDate, endDate }) => {
        // Simulate filtering
        const filteredTransactions = transactions.filter((transaction) => {
            return (
                (category === '' || transaction.category.toLowerCase().includes(category.toLowerCase())) &&
                (startDate === '' || transaction.date >= startDate) &&
                (endDate === '' || transaction.date <= endDate)
            );
        });
        setTransactions(filteredTransactions);
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="d-flex flex-grow-1">
                <SideMenu />
                <div className="flex-grow-1 p-4">
                    <h1>Transactions</h1>
                    <TransactionFilter onFilter={handleFilter} />
                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <TransactionList transactions={transactions} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TransactionsPage;