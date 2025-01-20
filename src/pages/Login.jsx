// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const LoginPage = () => {
//     const [username, setUsername] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate();

//     const handleLogin = (e) => {
//         e.preventDefault();

//         // Hardcoded credentials
//         const users = [
//             { username: 'admin', password: 'admin123', role: 'admin' },
//             { username: 'user1', password: 'user123', role: 'user' },
//         ];

//         const user = users.find(
//             (u) => u.username === username && u.password === password
//         );

//         if (user) {
//             // Store user role and username in local storage
//             localStorage.setItem('role', user.role);
//             localStorage.setItem('username', user.username);
//             navigate('/dashboard'); // Redirect to dashboard
//         } else {
//             setError('Invalid username or password');
//         }
//     };

//     return (
//         <div className="container">
//             <div className="d-flex align-items-center justify-content-center vh-100">
//                 <div className="form-container p-4 border rounded shadow" style={{ width: '500px' }}>
//                     <h1 className="text-center mb-4">Login</h1>
//                     <form onSubmit={handleLogin}>
//                         <div className="form-group mb-3">
//                             <label htmlFor="username">Username</label>
//                             <input
//                                 type="text"
//                                 id="username"
//                                 name="username"
//                                 value={username}
//                                 onChange={(e) => setUsername(e.target.value)}
//                                 className="form-control"
//                                 required
//                             />
//                         </div>
//                         <div className="form-group mb-3">
//                             <label htmlFor="password">Password</label>
//                             <input
//                                 type="password"
//                                 id="password"
//                                 name="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 className="form-control"
//                                 required
//                             />
//                         </div>
//                         {error && <div className="alert alert-danger">{error}</div>}
//                         <button type="submit" className="btn btn-primary w-100">
//                             Login →
//                         </button>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LoginPage;

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
      // Make a POST request to the login endpoint
      const response = await api.post('/login', { username, password });

      // Check if the response is successful
      if (response.status === 200) {
        const user = response.data;

        // Store user details in localStorage
        localStorage.setItem('id', user.id);
        localStorage.setItem('username', user.username);
        localStorage.setItem('role', user.role);

        // Redirect to the dashboard
        navigate('/dashboard');
      }
    } catch (err) {
      // Handle errors (e.g., invalid credentials)
      setError('Invalid username or password');
      console.error('Login failed:', err);
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