// src/components/Categories/CategoryList.jsx
import React from 'react';
import api from '../../services/api'; // Import the Axios instance

const CategoryList = ({ categories, onEdit, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/category/delete/${id}`); // Send a DELETE request
      onDelete(id); // Call the onDelete callback to update the UI
    } catch (err) {
      console.error('Error deleting category:', err);
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => onEdit(category)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(category.id)}
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

export default CategoryList;