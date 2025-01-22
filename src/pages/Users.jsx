// src/pages/Users.jsx
import React, { useState, useEffect } from 'react';
import UserForm from '../components/Users/UserForm';
import UserList from '../components/Users/UserList';
import SideMenu from '../components/SideMenu';
import api from '../services/api'; // Import the Axios instance
import { ToastContainer, toast } from 'react-toastify'; // Import toast notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

const UsersPage = () => {
  const [users, setUsers] = useState([]); // State to store users
  const [showForm, setShowForm] = useState(false); // State to toggle the form
  const [editingUser, setEditingUser] = useState(null); // State to track the user being edited
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(''); // State to store error messages

  // Fetch users from the backend when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get('/users/get/all');
        setUsers(response.data);
      } catch (err) {
        setError('Failed to fetch users. Please try again later.');
        toast.error('Failed to fetch users. Please try again later.'); // Show error toast
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle form submission (add or update)
  const handleSubmit = (user) => {
    if (editingUser) {
      // Update the existing user in the list
      setUsers(users.map((u) => (u.id === user.id ? user : u)));
      setEditingUser(null); // Clear the editing state
    } else {
      // Add the new user to the list
      setUsers([...users, user]);
    }
    setShowForm(false); // Hide the form
  };

  // Handle deleting a user
  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id)); // Remove the user from the list
  };

  // Handle editing a user
  const handleEdit = (user) => {
    setEditingUser(user); // Set the user to be edited
    setShowForm(true); // Show the form
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="d-flex flex-grow-1">
        <SideMenu />
        <div className="flex-grow-1 p-4">
          <h1>Users</h1>
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
                  setEditingUser(null); // Clear the editing state
                  setShowForm(!showForm); // Toggle the form
                }}
              >
                {showForm ? 'Hide Form' : 'Add User'}
              </button>
              {showForm && (
                <UserForm
                  user={editingUser}
                  onSubmit={handleSubmit}
                  onCancel={() => {
                    setShowForm(false); // Hide the form
                    setEditingUser(null); // Clear the editing state
                  }}
                />
              )}
              <UserList
                users={users}
                onEdit={handleEdit} // Pass the handleEdit function
                onDelete={handleDelete}
              />
            </>
          )}
        </div>
      </div>
      <ToastContainer /> {/* Render the toast container */}
    </div>
  );
};

export default UsersPage;