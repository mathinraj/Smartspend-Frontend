// src/components/Users/UserList.jsx
import React from 'react';
import api from '../../services/api'; // Import the Axios instance
import { toast } from 'react-toastify'; // Import toast notifications

const UserList = ({ users, onEdit, onDelete }) => {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/delete/${id}`); // Send a DELETE request
      onDelete(id); // Call the onDelete callback to update the UI
      toast.success('User deleted successfully!'); // Show success toast
    } catch (err) {
      toast.error('Failed to delete user. Please try again.'); // Show error toast
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => onEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(user.id)}
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

export default UserList;