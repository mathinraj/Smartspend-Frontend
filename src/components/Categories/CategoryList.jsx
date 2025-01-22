import React, { useState } from 'react';
import api from '../../services/api'; // Import the Axios instance
import { toast } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

const CategoryList = ({ categories, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1); // State to track the current page
  const itemsPerPage = 5; // Number of categories to display per page

  // Calculate the index range for the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCategories = categories.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle deleting a category
  const handleDelete = async (id) => {
    try {
      await api.delete(`/category/delete/${id}`); // Send a DELETE request
      onDelete(id); // Call the onDelete callback to update the UI
      toast.success('Category deleted successfully!'); // Show success message
    } catch (err) {
      console.error('Error deleting category:', err);

      // Check if the error is due to associated budgets or expenses
      if (err.response && err.response.status === 417) {
        toast.error(err.response.data.message); // Show error message from the backend
      } else {
        toast.error(
          <div>
            Failed to delete category.<br />
            <em>Expense or Budget found.</em>
          </div>
        );
      }
    }
  };

  return (
    <div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.map((category) => (
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

      {/* Pagination */}
      <nav>
        <ul className="pagination">
          {Array.from({ length: Math.ceil(categories.length / itemsPerPage) }, (_, i) => (
            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
              <button onClick={() => paginate(i + 1)} className="page-link">
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default CategoryList;