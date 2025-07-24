import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // Fallback check for token in localStorage in case context resets
  const token = localStorage.getItem('token');

  if (!isAuthenticated && !token) {
    alert('Please login first');
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
