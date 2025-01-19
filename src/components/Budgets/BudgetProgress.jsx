import React from 'react';

const BudgetProgress = ({ budgets }) => {
    return (
        <div className="card mb-4">
            <div className="card-body">
                <h5 className="card-title">Budget Progress</h5>
                {budgets.map((budget) => (
                    <div key={budget.id} className="mb-3">
                        <h6>{budget.category}</h6>
                        <div className="progress">
                            <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: `${budget.progress}%` }}
                                aria-valuenow={budget.progress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            >
                                {budget.progress}%
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BudgetProgress;