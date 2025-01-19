// import React from 'react';
// import { Link, useNavigate } from 'react-router-dom';

// const Header = () => {
//     const navigate = useNavigate();
//     const username = localStorage.getItem('username');

//     const handleLogout = () => {
//         localStorage.removeItem('role');
//         localStorage.removeItem('username');
//         navigate('/login');
//     };

//     return (
//         <nav className="navbar navbar-expand-lg navbar-light bg-light">
//             <div className="container-fluid">
//                 <Link className="navbar-brand" to="/">
//                     Expense Tracker
//                 </Link>
//                 <div className="collapse navbar-collapse" id="navbarNav">
//                     <ul className="navbar-nav me-auto">
//                         <li className="nav-item">
//                             <Link className="nav-link" to="/">
//                                 Home
//                             </Link>
//                         </li>
//                         {username && (
//                             <li className="nav-item">
//                                 <Link className="nav-link" to="/dashboard">
//                                     Dashboard
//                                 </Link>
//                             </li>
//                         )}
//                     </ul>
//                     {username && (
//                         <div className="d-flex">
//                             <span className="navbar-text me-3">Welcome, {username}!</span>
//                             <button className="btn btn-outline-danger" onClick={handleLogout}>
//                                 Logout <i class="fa-solid fa-arrow-right-from-bracket"></i>
//                             </button>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Header;

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/Images/Logo_Smartspend.svg';
import "../styles/global.css"

const Header = ({ className }) => {
    const navigate = useNavigate();
    const username = localStorage.getItem('username');

    const handleLogout = () => {
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <nav className={`navbar navbar-expand-lg navbar-light ${className || 'bg-light'}`}>
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                <img
                        src={Logo}
                        alt="Smart Spend Logo"
                        style={{ height: '40px' }} // Adjust height as needed
                    />
                </Link>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">
                                Home
                            </Link>
                        </li>
                        {username && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard">
                                    Dashboard
                                </Link>
                            </li>
                        )}
                    </ul>
                    {username && (
                        <div className="d-flex">
                            <span className="navbar-text me-3">Welcome, {username}!</span>
                            <button className="btn btn-outline-danger" onClick={handleLogout}>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;