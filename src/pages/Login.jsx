import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import '../styles/Login.css';

const LoginPage = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/login', { username, password });

      if (response.status === 200) {
        // Store username and role in localStorage
        localStorage.setItem('username', username);
        localStorage.setItem('role', response.data.role);
        setIsLoggedIn(true); // Update login state
        navigate('/dashboard'); // Redirect to dashboard after login
      } else {
        setError('Login failed. Please try again.');
      }
    } catch (err) {
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