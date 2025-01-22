import React, { useState, useEffect } from 'react';
import CategoryForm from '../components/Categories/CategoryForm';
import CategoryList from '../components/Categories/CategoryList';
import CategoryPieChart from '../components/Categories/CategoryPieChart';
import SideMenu from '../components/SideMenu';
import api from '../services/api'; // Import the Axios instance

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]); // State to store categories
  const [expenses, setExpenses] = useState([]); // State to store expenses
  const [showForm, setShowForm] = useState(false); // State to toggle the form
  const [editingCategory, setEditingCategory] = useState(null); // State to track the category being edited
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(''); // State to store error messages

  // Fetch categories and expenses from the backend when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await api.get('/category/get/all');
        const expensesResponse = await api.get('/expenses/get/all');

        setCategories(categoriesResponse.data);
        setExpenses(expensesResponse.data);
      } catch (err) {
        setError('Failed to fetch data. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle form submission (add or update)
  const handleSubmit = (category) => {
    if (editingCategory) {
      // Update the existing category in the list
      setCategories(categories.map((c) => (c.id === category.id ? category : c)));
      setEditingCategory(null); // Clear the editing state
    } else {
      // Add the new category to the list
      setCategories([...categories, category]);
    }
    setShowForm(false); // Hide the form
  };

  // Handle deleting a category
  const handleDelete = (id) => {
    setCategories(categories.filter((c) => c.id !== id)); // Remove the category from the list
  };

  // Get the current month and year
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; // Months are 0-indexed, so add 1
  const currentYear = currentDate.getFullYear();

  // Prepare data for the expense pie chart
  const expensePieChartData = categories
    .map((category) => {
      // Filter expenses for the current category and current month
      const categoryExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expense.categoryName === category.name && // Match the category
          expense.amount < 0 && // Only include expenses (negative amounts)
          expenseDate.getMonth() + 1 === currentMonth && // Match the current month
          expenseDate.getFullYear() === currentYear // Match the current year
        );
      });

      // Calculate the total expense for this category
      const totalExpense = categoryExpenses.reduce((sum, expense) => sum + Math.abs(expense.amount), 0);

      return {
        name: category.name,
        value: totalExpense, // Use total expense instead of count
      };
    })
    .filter((entry) => entry.value > 0); // Filter out categories with zero values

  // Prepare data for the income pie chart
  const incomePieChartData = categories
    .map((category) => {
      // Filter incomes for the current category and current month
      const categoryIncomes = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expense.categoryName === category.name && // Match the category
          expense.amount >= 0 && // Only include incomes (positive amounts)
          expenseDate.getMonth() + 1 === currentMonth && // Match the current month
          expenseDate.getFullYear() === currentYear // Match the current year
        );
      });

      // Calculate the total income for this category
      const totalIncome = categoryIncomes.reduce((sum, expense) => sum + expense.amount, 0);

      return {
        name: category.name,
        value: totalIncome, // Use total income instead of count
      };
    })
    .filter((entry) => entry.value > 0); // Filter out categories with zero values

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1">
        <SideMenu />
        <div className="flex-grow-1 p-4">
          <h1>Categories</h1>
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
              <button
                className="btn btn-primary mb-3"
                onClick={() => {
                  setEditingCategory(null); // Clear the editing state
                  setShowForm(!showForm); // Toggle the form
                }}
              >
                {showForm ? 'Hide Form' : 'Add Category'}
              </button>
              {showForm && (
                <CategoryForm
                  category={editingCategory}
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setShowForm(false); // Hide the form
                    setEditingCategory(null); // Clear the editing state
                  }}
                />
              )}
              <CategoryList
                categories={categories}
                onEdit={setEditingCategory}
                onDelete={handleDelete}
              />

              {/* Display pie charts side by side */}
              <div className="row">
                <div className="col-md-6">
                  <CategoryPieChart data={expensePieChartData} type="expense" />
                </div>
                <div className="col-md-6">
                  <CategoryPieChart data={incomePieChartData} type="income" />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoriesPage;