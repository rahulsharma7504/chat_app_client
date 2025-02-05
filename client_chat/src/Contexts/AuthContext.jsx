import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router
import Cookies from 'js-cookie';

// Create Context
export const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('token'); // Get token from cookies

    if (token) {
      setIsAuthenticated(true); // Token exists, user is authenticated
    } else {
      setIsAuthenticated(false); // No token, user is not authenticated
      // navigate('/login'); // Redirect to login
    }
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // Wait for the auth check to complete
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default  AuthProvider