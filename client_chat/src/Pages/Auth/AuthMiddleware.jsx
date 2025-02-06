import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
export const AuthMiddleware = ({ children }) => {
  const navigate=useNavigate();
  const { isAuthenticated } = useContext(AuthContext); // Use context to check authentication

  if (!isAuthenticated) {
    navigate('/login')
  }

  return isAuthenticated ? children : null; // Render children only if authenticated
};

