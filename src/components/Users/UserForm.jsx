// src/components/Users/UserForm.jsx
import React, { useState } from 'react';
import api from '../../services/api'; // Import the Axios instance
import { toast } from 'react-toastify'; // Import toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const UserForm = ({ user, onSubmit, onCancel }) => {
  const [username, setUsername] = useState(user ? user.username : ''); // State for username
  const [password, setPassword] = useState(user ? user.password : ''); // State for password
  const [role, setRole] = useState(user ? user.role : 'USER'); // State for role
  const [error, setError] = useState(''); // State for error messages

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate input
    if (!username || !password || !role) {
      setError('All fields are required.');
      return;
    }

    const userData = {
      username,
      password,
      role,
    };

    try {
      let response;
      if (user) {
        // Update an existing user
        response = await api.put(`/users/update/${user.id}`, userData);
        toast.success('User updated successfully!'); // Show success toast
      } else {
        // Create a new user
        response = await api.post('/users/add', userData);
        toast.success('User added successfully!'); // Show success toast
      }

      // Call the onSubmit callback with the created/updated user
      onSubmit(response.data);

      // Clear the form fields
      if (!user) {
        setUsername('');
        setPassword('');
        setRole('USER');
      }
      setError('');
    } catch (err) {
      setError(user ? 'Failed to update user. Please try again.' : 'Failed to create user. Please try again.');
      toast.error(error); // Show error toast
      console.error('Error:', err);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">{user ? 'Edit User' : 'Add User'}</h5>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role" className="form-label">Role</label>
            <select
              id="role"
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary me-2">
            {user ? 'Update' : 'Add'}
          </button>
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserForm;