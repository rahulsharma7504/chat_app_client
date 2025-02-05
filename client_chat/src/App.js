import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/layout'; // Layout import kar rahe hain
import ChatUser from './Pages/ChatUser';
import Profile from './Pages/Profile';
import Settings from './Pages/Settings';
import Login from './Pages/Auth/Login';
import Signup from './Pages/Auth/Signup';
import AuthProvider from "./Contexts/AuthContext.jsx"
import { AuthMiddleware } from './Pages/Auth/AuthMiddleware';
import Forgot from './Pages/Auth/Forgot.jsx';
function App() {
  return (
    <>

      <Router> {/* Router ko apne app mein wrap karte hain */}
        <AuthProvider>

          <Layout> {/* Layout ko wrap karte hain */}

            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<Forgot />} />
              <Route path="/" element={<AuthMiddleware><ChatUser /></AuthMiddleware>} />
              <Route path="/profile" element={<AuthMiddleware><Profile /></AuthMiddleware>} />
              <Route path="/settings" element={<AuthMiddleware><Settings /></AuthMiddleware>} />
            </Routes>

          </Layout>
        </AuthProvider>

      </Router>
    </>
  );
}

export default App;
