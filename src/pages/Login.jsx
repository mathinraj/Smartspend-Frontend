// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api'; // Import the Axios instance

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      console.log('Attempting login...'); // Debug log
      const response = await api.post('/login', { username, password });
  
      console.log('Login response:', response); // Debug log
  
      // Check if the response is successful
      if (response.status === 200) {
        console.log('Login successful. Storing credentials...'); // Debug log
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        localStorage.setItem('role', response.data.role); // Store the role from the response
  
        console.log('Redirecting to dashboard...'); // Debug log
        navigate('/dashboard'); // Redirect to the dashboard
      } else {
        console.log('Unexpected response status:', response.status); // Debug log
        setError('Login failed. Please try again.');
      }
    } catch (err) {
      console.error('Login failed:', err); // Debug log
      setError('Invalid username or password');
    }
  };

  return (
    <div className="container">
      <div className="d-flex align-items-center justify-content-center vh-100">
        <div className="form-container p-4 border rounded shadow" style={{ width: '500px' }}>
          <h1 className="text-center mb-4">Login</h1>
          {error && <div className="alert alert-danger">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group mb-3">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;