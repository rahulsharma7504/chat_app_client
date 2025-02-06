import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import axios from 'axios';
import socket from '../Components/Socket/Socket';

// Create Context
export const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [cookies] = useCookies(['token']);

  useEffect(() => {
    const token = localStorage.getItem('token') // Get token from cookies

    if (token) {
      setIsAuthenticated(true);
    } else {
      navigate('/login');
      setIsAuthenticated(false);
    }
    const userId = JSON.parse(localStorage.getItem('user'))?._id;
    if (userId) {
      getAllUsers(userId);
    }
  }, [navigate]);

  const LogoutUser = async () => {
    socket.emit('status', { status: 'Offline', userId: JSON.parse(localStorage.getItem('user'))?._id });
    localStorage.removeItem('user');
    localStorage.removeItem('token');

    navigate('/login');
  }


  const getAllUsers = async (id) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/all-users/${id}`);
      if (response.status === 200) {
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error(error.response?.data?.message || 'An error occurred');
    }
  };

   const checkAuth = async () => {
    try {
      const res = await axios.get("http://localhost:4000/api/auth/user", {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      return null;
    }
  };
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated,users, setUsers, LogoutUser,getAllUsers ,checkAuth}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
