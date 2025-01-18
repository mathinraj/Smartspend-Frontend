// src/contexts/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
  token: null,
  role: null
});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [role, setRole] = useState(localStorage.getItem('role') || null)

  useEffect(() => {
      const storedToken = localStorage.getItem('token');
      const storedRole = localStorage.getItem('role');
      if(storedToken){
        setToken(storedToken);
        setIsAuthenticated(true);
        setRole(storedRole);
      }
    }, []);

  const login = async (username, password) => {
        try {
            const response = await authService.login(username, password);
            localStorage.setItem('token', response.token);
            localStorage.setItem('role', response.role);
            setToken(response.token);
            setRole(response.role);
            setIsAuthenticated(true);
            setUser(response);
            return response;
        } catch (error) {
            throw error;
        }
  };


  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setToken(null);
    setUser(null);
      setRole(null)
    setIsAuthenticated(false);
  };

  const contextValue = {
        user,
        login,
        logout,
        isAuthenticated,
        token,
        role
  };


  return (
    <AuthContext.Provider value={contextValue}>
        {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;