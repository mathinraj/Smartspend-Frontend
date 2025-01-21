// src/components/Categories/CategoryForm.jsx
import React, { useState } from 'react';
import api from '../../services/api'; // Import the Axios instance
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const CategoryForm = ({ category, onSubmit, onCancel }) => {
  const [name, setName] = useState(category ? category.name : ''); // State for category name
  const [error, setError] = useState(''); // State for error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!name) {
      setError('Category name is required.');
      return;
    }

    const categoryData = { name };

    try {
      let response;
      if (category) {
        // Update an existing category
        response = await api.put(`/category/update/${category.id}`, categoryData);
        toast.success('Category updated successfully');
      } else {
        // Create a new category
        response = await api.post('/category/add', categoryData);
        toast.success('Category added successfully');
      }

      // Call the onSubmit callback with the created/updated category
      onSubmit(response.data);

      // Clear the form fields
      if (!category) {
        setName('');
      }
      setError('');
    } catch (err) {
      setError(category ? 'Failed to update category. Please try again.' : 'Failed to create category. Please try again.');
      console.error('Error:', err);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{category ? 'Edit Category' : 'Add Category'}</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Category Name</label>
            <input
              type="text"
              id="name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary me-2">
            {category ? 'Update' : 'Add'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default CategoryForm;