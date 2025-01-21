// import React from 'react';

// const BudgetProgress = ({ budgets }) => {
//     return (
//         <div className="card mb-4">
//             <div className="card-body">
//                 <h5 className="card-title">Budget Progress</h5>
//                 {budgets.map((budget) => (
//                     <div key={budget.id} className="mb-3">
//                         <h6>{budget.category}</h6>
//                         <div className="progress">
//                             <div
//                                 className="progress-bar"
//                                 role="progressbar"
//                                 style={{ width: `${budget.progress}%` }}
//                                 aria-valuenow={budget.progress}
//                                 aria-valuemin="0"
//                                 aria-valuemax="100"
//                             >
//                                 {budget.progress}%
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default BudgetProgress;

// src/components/Budgets/BudgetProgress.jsx

import React, { useEffect, useState } from 'react';
import api from '../../services/api'; // Import the Axios instance

const BudgetProgress = ({ budgets }) => {
  const [latestBudgets, setLatestBudgets] = useState([]); // State to store latest budgets
  const [expenses, setExpenses] = useState([]); // State to store expenses
  const [categories, setCategories] = useState([]); // State to store categories

  // Fetch expenses and categories when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch expenses
        const expensesResponse = await api.get('/expenses/get/all');
        console.log('Expenses:', expensesResponse.data); // Debug log
        setExpenses(expensesResponse.data);

        // Fetch categories
        const categoriesResponse = await api.get('/category/get/all');
        console.log('Categories:', categoriesResponse.data); // Debug log
        setCategories(categoriesResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };

    fetchData();
  }, []);

  // Find the latest budget for each category
  useEffect(() => {
    if (budgets.length > 0) {
      const groupedBudgets = budgets.reduce((acc, budget) => {
        if (!acc[budget.categoryId]) {
          acc[budget.categoryId] = [];
        }
        acc[budget.categoryId].push(budget);
        return acc;
      }, {});

      const latestBudgets = Object.values(groupedBudgets).map((categoryBudgets) => {
        return categoryBudgets.reduce((latest, budget) => {
          return new Date(budget.startDate) > new Date(latest.startDate) ? budget : latest;
        });
      });

      console.log('Latest Budgets:', latestBudgets); // Debug log
      setLatestBudgets(latestBudgets);
    }
  }, [budgets]);

  // Calculate progress for each budget
  const calculateProgress = (budget) => {
    console.log('Budget:', budget); // Debug log

    const categoryExpenses = expenses.filter(
      (expense) => expense.categoryId === budget.categoryId
    );
    console.log('Category Expenses:', categoryExpenses); // Debug log

    const totalSpent = categoryExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    console.log('Total Spent:', totalSpent); // Debug log

    const progress = ((totalSpent / budget.amount) * 100).toFixed(2);
    console.log('Progress:', progress); // Debug log

    return progress > 100 ? 100 : progress; // Cap progress at 100%
  };

  // Function to get category name by categoryId
  const getCategoryName = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    return category ? category.name : 'N/A'; // Return category name or 'N/A' if not found
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Budget Progress</h5>
        {latestBudgets.map((budget) => (
          <div key={budget.id} className="mb-3">
            <h6>
              {getCategoryName(budget.categoryId)}{' '} {/* Use getCategoryName */}
              <small className="text-muted">
                <i>
                  ({budget.startDate} - {budget.endDate})
                </i>
              </small>
            </h6>
            <div className="progress">
              <div
                className="progress-bar"
                role="progressbar"
                style={{ width: `${calculateProgress(budget)}%` }}
                aria-valuenow={calculateProgress(budget)}
                aria-valuemin="0"
                aria-valuemax="100"
              >
                {calculateProgress(budget)}%
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetProgress;