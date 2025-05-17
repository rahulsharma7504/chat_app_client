import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layout & Pages
import Layout from './Layout/layout';
import ChatUser from './Pages/ChatUser';
import Profile from './Pages/Profile';
import Settings from './Pages/Settings';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import Forgot from './Pages/Auth/Forgot';

// Context Providers
import AuthProvider from './Contexts/AuthContext.jsx';
import { GroupChatProvider } from './Contexts/GroupChatContext.jsx';
import { ProfileProvider } from './Contexts/ProfileContext.jsx';

// Middleware
import { AuthMiddleware } from './Pages/Auth/AuthMiddleware';

// Google OAuth (if needed)
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  return (
    <Router>
      <AuthProvider>
        <GroupChatProvider>
          <ProfileProvider>

            <Layout>
              <Routes>

                {/* Public Routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/forgot-password" element={<Forgot />} />

                {/* Protected Routes (Require Authentication) */}
                <Route
                  path="/"
                  element={
                    <AuthMiddleware>
                      <ChatUser />
                    </AuthMiddleware>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <AuthMiddleware>
                      <Profile />
                    </AuthMiddleware>
                  }
                />
                <Route
                  path="/settings"
                  element={
                    <AuthMiddleware>
                      <Settings />
                    </AuthMiddleware>
                  }
                />

              </Routes>
            </Layout>

          </ProfileProvider>
        </GroupChatProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
