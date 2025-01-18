// import React, { useState } from "react";

// const LoginPage = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (event) => {
//     event.preventDefault();
//     // Add logic to handle login, such as API calls
//     console.log("Username:", username);
//     console.log("Password:", password);
//   };

//   return (
//     <div
//       className="d-flex justify-content-center align-items-center"
//       style={{
//         height: "100vh", // Full viewport height
//         width: "100vw",  // Full viewport width
//         backgroundColor: "#b3b3ff",
//         margin: 0,       // Remove any default margin
//       }}
//     >
//       <div
//         className="card p-4 shadow"
//         style={{
//           width: "22rem",
//           borderRadius: "10px",
//         }}
//       >
//         <h3 className="text-center mb-4">Login</h3>
//         <form onSubmit={handleLogin}>
//           <div className="mb-3">
//             <label htmlFor="username" className="form-label">
//               Username
//             </label>
//             <input
//               type="text"
//               className="form-control"
//               id="username"
//               placeholder="Enter your username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label">
//               Password
//             </label>
//             <input
//               type="password"
//               className="form-control"
//               id="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="btn w-100"
//             style={{
//               backgroundColor: "green",
//               color: "white",
//               border: "none",
//             }}
//           >
//             Login →
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;

// src/pages/Auth/LoginPage.jsx

// src/pages/Auth/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(username, password);
            navigate('/dashboard');
        } catch (error) {
            setError('Invalid username or password.');
        } finally {
            setLoading(false)
        }
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                height: "81vh",
                width: "100vw",
                backgroundColor: "#ccccff",
                margin: 0,
            }}
        >
            <div
                className="card p-4 shadow"
                style={{
                    width: "28rem",
                    borderRadius: "10px",
                }}
            >
                <h3 className="text-center mb-4">Login</h3>
                {error && <div className="alert alert-danger">{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn w-100"
                        style={{
                            backgroundColor: "green",
                            color: "white",
                            border: "none",
                        }}
                    >
                        Login →
                    </button>
                </form>
                  {loading && (<LoadingSpinner/>)}
            </div>
        </div>
    );
};

export default LoginPage;