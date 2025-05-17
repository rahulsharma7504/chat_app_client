import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';

export const AuthMiddleware = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const publicPaths = ['/login', '/signup'];
    const isForgotPassword = location.pathname === '/forgot-password';
    const isPublicPath = publicPaths.includes(location.pathname);

    // Block unauthenticated users from private pages
    if (!isAuthenticated && !isPublicPath && !isForgotPassword) {
      navigate('/login');
    }
    // Redirect logged-in users away from login/signup (but NOT forgot-password)
    else if (isAuthenticated && isPublicPath) {
      navigate('/');
    }
    else {
      setShouldRender(true); // allow access
    }
  }, [isAuthenticated, location.pathname, navigate]);

  if (!shouldRender) return null;

  return <>{children}</>;
};
