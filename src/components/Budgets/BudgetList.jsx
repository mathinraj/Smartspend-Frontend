import React from 'react';
import api from '../../services/api'; // Import the Axios instance

const BudgetList = ({ budgets, onEdit, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/budget/delete/${id}`); // Send a DELETE request
      onDelete(id); // Call the onDelete callback to update the UI
    } catch (err) {
      console.error('Error deleting budget:', err);
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((budget) => (
            <tr key={budget.id}>
              <td>{budget.category?.name || 'N/A'}</td>
              <td>₹{budget.amount}</td>
              <td>{budget.startDate}</td>
              <td>{budget.endDate}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => onEdit(budget)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(budget.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BudgetList;