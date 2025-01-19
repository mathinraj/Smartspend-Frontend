import React, { useState } from 'react';

const BudgetForm = ({ budget, onSubmit, onCancel }) => {
    const [category, setCategory] = useState(budget ? budget.category : '');
    const [amount, setAmount] = useState(budget ? budget.amount : '');
    const [startDate, setStartDate] = useState(budget ? budget.startDate : '');
    const [endDate, setEndDate] = useState(budget ? budget.endDate : '');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ category, amount, startDate, endDate });
    };

    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">{budget ? 'Edit Budget' : 'Add Budget'}</h5>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <input
                            type="text"
                            id="category"
                            className="form-control"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="amount" className="form-label">Amount</label>
                        <input
                            type="number"
                            id="amount"
                            className="form-control"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="startDate" className="form-label">Start Date</label>
                        <input
                            type="date"
                            id="startDate"
                            className="form-control"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="endDate" className="form-label">End Date</label>
                        <input
                            type="date"
                            id="endDate"
                            className="form-control"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary me-2">
                        {budget ? 'Update' : 'Add'}
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={onCancel}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default BudgetForm;