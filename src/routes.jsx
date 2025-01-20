// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import Login from './pages/Login';
// import Dashboard from './pages/Dashboard';
// import Transactions from './pages/Transactions';
// import Categories from './pages/Categories';
// import Budgets from './pages/Budget';
// import Users from './pages/Users';
// import ProtectedRoute from './components/ProtectedRoute';

// const AppRoutes = () => {
//   return (
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
//         <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
//         <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} />
//         <Route path="/budgets" element={<ProtectedRoute><Budgets /></ProtectedRoute>} />
//         <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />
//       </Routes>
//   );
// };

// export default AppRoutes;

// src/routes.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Categories from './pages/Categories';
import Budgets from './pages/Budget';
import Users from './pages/Users';
import ProtectedRoute from './components/ProtectedRoute';

const AppRoutes = () => {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <Categories />
            </ProtectedRoute>
          }
        />
        <Route
          path="/budgets"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <Budgets />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute requiredRole="ADMIN">
              <Users />
            </ProtectedRoute>
          }
        />
      </Routes>
  );
};

export default AppRoutes;