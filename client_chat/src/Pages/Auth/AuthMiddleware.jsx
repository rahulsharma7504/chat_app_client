import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../Contexts/AuthContext';

export const AuthMiddleware = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isLoading) {
      // Wait until loading finishes
      setShouldRender(false);
      return;
    }

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
  }, [isAuthenticated, isLoading, location.pathname, navigate]);

  if (!shouldRender) return null;

  return <>{children}</>;
};
