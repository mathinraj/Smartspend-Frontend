import React, { useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import api from "../services/api";
import CategoryPieChart from "../components/Categories/CategoryPieChart"; // Import the pie chart component

const DashboardPage = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const username = localStorage.getItem("username");

  // State for selected month and year
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1); // Default to current month
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // Default to current year

  // Fetch expenses when the component mounts
  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await api.get("/expenses/get/all");
        const sortedExpenses = response.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setExpenses(sortedExpenses);
      } catch (err) {
        setError("Failed to fetch expenses. Please try again later.");
        console.error("Error fetching expenses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchExpenses();
  }, []);

  // Filter expenses for the selected month and year
  const filteredExpenses = expenses.filter((expense) => {
    const expenseDate = new Date(expense.date);
    return (
      expenseDate.getMonth() + 1 === selectedMonth && // Check if the month matches
      expenseDate.getFullYear() === selectedYear // Check if the year matches
    );
  });

  // Calculate total income, expenses, and balance for the selected month
  const totalIncome = filteredExpenses
    .filter((expense) => expense.amount >= 0) // Filter for income (positive amounts)
    .reduce((sum, expense) => sum + expense.amount, 0); // Sum up income

  const totalExpense = filteredExpenses
    .filter((expense) => expense.amount < 0) // Filter for expenses (negative amounts)
    .reduce((sum, expense) => sum + Math.abs(expense.amount), 0); // Sum up expenses (convert to positive)

  const balance = totalIncome - totalExpense; // Calculate balance

  // Prepare data for the expense pie chart
  const expensePieChartData = filteredExpenses
    .filter((expense) => expense.amount < 0)
    .reduce((acc, expense) => {
      const categoryName = expense.categoryName || "Uncategorized";
      acc[categoryName] = (acc[categoryName] || 0) + Math.abs(expense.amount);
      return acc;
    }, {});

  const expensePieChartDataArray = Object.keys(expensePieChartData)
    .map((category) => ({
      name: category,
      value: expensePieChartData[category],
    }))
    .filter((entry) => entry.value > 0); // Filter out categories with zero values

  // Prepare data for the income pie chart
  const incomePieChartData = filteredExpenses
    .filter((expense) => expense.amount >= 0)
    .reduce((acc, expense) => {
      const categoryName = expense.categoryName || "Uncategorized";
      acc[categoryName] = (acc[categoryName] || 0) + expense.amount;
      return acc;
    }, {});

  const incomePieChartDataArray = Object.keys(incomePieChartData)
    .map((category) => ({
      name: category,
      value: incomePieChartData[category],
    }))
    .filter((entry) => entry.value > 0); // Filter out categories with zero values

  // Function to handle month and year change
  const handleMonthYearChange = (e) => {
    const [year, month] = e.target.value.split("-");
    setSelectedMonth(parseInt(month, 10));
    setSelectedYear(parseInt(year, 10));
  };

  // Generate options for months and years in chronological order (October 2024 to May 2025)
  const generateMonthYearOptions = () => {
    const options = [];
    const startDate = new Date(2024, 9); // October 2024 (month is 0-indexed)
    const endDate = new Date(2025, 4); // May 2025 (month is 0-indexed)

    let currentDate = startDate;
    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Convert to 1-indexed month
      options.push(
        <option key={`${year}-${month}`} value={`${year}-${month}`}>
          {new Date(year, month - 1).toLocaleString("default", {
            month: "long",
          })}{" "}
          {year}
        </option>
      );
      currentDate.setMonth(currentDate.getMonth() + 1); // Move to the next month
    }

    return options;
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1">
        <SideMenu />
        <div className="flex-grow-1 p-4">
          <h1>Dashboard</h1>
          <p>
            Welcome, <strong>{username}</strong>! Here, you can track your
            expenses, manage categories, and more.
          </p>

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
              {/* Editable Month and Year Selector */}
              <h3>
                Summary for{" "}
                <select
                  value={`${selectedYear}-${selectedMonth}`}
                  onChange={handleMonthYearChange}
                  style={{
                    border: "none",
                    background: "none",
                    fontWeight: "bold",
                    fontSize: "1.25rem",
                    cursor: "pointer",
                  }}
                >
                  {generateMonthYearOptions()}
                </select>
              </h3>

              <div className="row">
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Total Income</h5>
                      <p className="card-text text-success">
                        ₹{totalIncome.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Total Expense</h5>
                      <p className="card-text text-danger">
                        ₹{totalExpense.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Balance</h5>
                      <p
                        className="card-text"
                        style={{ color: balance >= 0 ? "green" : "red" }}
                      >
                        ₹{balance.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <h3>Expense and Income Distribution</h3>
              <div className="row">
                <div className="col-md-6">
                  <CategoryPieChart
                    data={expensePieChartDataArray}
                    type="expense"
                  />
                </div>
                <div className="col-md-6">
                  <CategoryPieChart
                    data={incomePieChartDataArray}
                    type="income"
                  />
                </div>
              </div>

              <h3>Recent Transactions</h3>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Category</th>
                      <th>Type</th>
                      <th>Amount</th>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredExpenses.slice(0, 5).map((expense) => (
                      <tr key={expense.id}>
                        <td>{expense.date}</td>
                        <td>{expense.categoryName || "N/A"}</td>
                        <td>{expense.amount >= 0 ? "Income" : "Expense"}</td>
                        <td>₹{Math.abs(expense.amount).toFixed(2)}</td>
                        <td>{expense.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;