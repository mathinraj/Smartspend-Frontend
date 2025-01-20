// // src/components/SideMenu.jsx
// import React from 'react';
// import { Link } from 'react-router-dom';

// const SideMenu = () => {
//   const role = localStorage.getItem('role');

//   return (
//     <div className="bg-light border-end" style={{ width: '250px', minHeight: '100vh' }}>
//       <div className="p-3">
//         <h4 className="mb-4">Menu</h4>
//         <ul className="nav flex-column">
//           <li className="nav-item">
//             <Link to="/dashboard" className="nav-link">
//               Dashboard
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/transactions" className="nav-link">
//               Transactions
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/categories" className="nav-link">
//               Categories
//             </Link>
//           </li>
//           <li className="nav-item">
//             <Link to="/budgets" className="nav-link">
//               Budgets
//             </Link>
//           </li>
//           {role === 'ADMIN' && (
//             <li className="nav-item">
//               <Link to="/users" className="nav-link">
//                 Users
//               </Link>
//             </li>
//           )}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default SideMenu;

// src/components/SideMenu.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = () => {
  const role = localStorage.getItem('role'); // Get the user's role from localStorage

  return (
    <div className="bg-light border-end" style={{ width: '250px', minHeight: '100vh' }}>
      <div className="p-3">
        <h4 className="mb-4">Menu</h4>
        <ul className="nav flex-column">
          <li className="nav-item">
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
          </li>
          <li className="nav-item">
            <Link to="/transactions" className="nav-link">Transactions</Link>
          </li>
          {role === 'ADMIN' && (
            <>
              <li className="nav-item">
                <Link to="/categories" className="nav-link">Categories</Link>
              </li>
              <li className="nav-item">
                <Link to="/budgets" className="nav-link">Budgets</Link>
              </li>
              <li className="nav-item">
                <Link to="/users" className="nav-link">Users</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SideMenu;