import React, { useContext } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
export const AuthMiddleware = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext); // Use context to check authentication

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Wait for the auth check to complete
  }

  return isAuthenticated ? children : null; // Render children only if authenticated
};

