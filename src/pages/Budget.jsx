import React, { useState } from 'react';
import BudgetList from '../components/Budgets/BudgetList';
import BudgetForm from '../components/Budgets/BudgetForm';
import BudgetProgress from '../components/Budgets/BudgetProgress';
import SideMenu from '../components/SideMenu';

const BudgetsPage = () => {
    const [budgets, setBudgets] = useState([
        { id: 1, category: 'Food', amount: 500, startDate: '2023-10-01', endDate: '2023-10-31', progress: 60 },
        { id: 2, category: 'Transport', amount: 200, startDate: '2023-10-01', endDate: '2023-10-31', progress: 30 },
        { id: 3, category: 'Entertainment', amount: 300, startDate: '2023-10-01', endDate: '2023-10-31', progress: 80 },
    ]);
    const [selectedBudget, setSelectedBudget] = useState(null);
    const [showForm, setShowForm] = useState(false);

    const handleAdd = () => {
        setSelectedBudget(null);
        setShowForm(true);
    };

    const handleEdit = (budget) => {
        setSelectedBudget(budget);
        setShowForm(true);
    };

    const handleDelete = (id) => {
        setBudgets(budgets.filter((budget) => budget.id !== id));
    };

    const handleSubmit = (budget) => {
        if (selectedBudget) {
            // Update existing budget
            setBudgets(
                budgets.map((b) =>
                    b.id === selectedBudget.id ? { ...b, ...budget, progress: calculateProgress(budget) } : b
                )
            );
        } else {
            // Add new budget
            setBudgets([...budgets, { id: Date.now(), ...budget, progress: calculateProgress(budget) }]);
        }
        setShowForm(false);
    };

    const handleCancel = () => {
        setShowForm(false);
    };

    // Placeholder function to calculate progress
    const calculateProgress = (budget) => {
        return Math.floor(Math.random() * 100); // Replace with actual logic
    };

    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="d-flex flex-grow-1">
                <SideMenu />
                <div className="flex-grow-1 p-4">
                    <h1>Budgets</h1>
                    {showForm ? (
                        <BudgetForm
                            budget={selectedBudget}
                            onSubmit={handleSubmit}
                            onCancel={handleCancel}
                        />
                    ) : (
                        <>
                            <button className="btn btn-primary mb-3" onClick={handleAdd}>
                                Add Budget
                            </button>
                            <BudgetList
                                budgets={budgets}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        </>
                    )}
                    <BudgetProgress budgets={budgets} />
                </div>
            </div>
        </div>
    );
};

export default BudgetsPage;