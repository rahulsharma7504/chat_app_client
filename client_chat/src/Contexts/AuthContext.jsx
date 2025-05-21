import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you're using react-router
import { useCookies } from 'react-cookie';
import toast from 'react-hot-toast';
import axios from 'axios';
import { socket } from '../Components/Socket/Socket';

// Create Context
export const AuthContext = createContext();

// AuthProvider componentnpm install emoji-picker-react
const AuthProvider = ({ children }) => {
    const [groups, setGroups] = useState([]);

    const [isAuthenticated, setIsAuthenticated] = useState(null);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [cookies] = useCookies(['token']);

    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = localStorage.getItem('user');
        if (token && user) {
            setIsAuthenticated(true);
            const userId = JSON.parse(user)?.userData?._id;
            if (userId) {
                getAllUsers(userId);
            }
        } else {
            setIsAuthenticated(false);
        }
        setIsLoading(false);
    }, []);

    // useEffect(() => {
    //     const checkAuthentication = async () => {
    //         const token = localStorage.getItem('token');
    //         const currentPath = window.location.pathname;
    //         const publicPaths = ['/login', '/signup', '/forgot-password'];

    //         if (token) {
    //             try {
    //                 const res = await axios.get("http://localhost:4000/api/auth/user", {
    //                     withCredentials: true,
    //                 });
    //                 if (res.data) {
    //                     setIsAuthenticated(true);
    //                     const userId = res.data.userData?._id;
    //                     if (userId) {
    //                         getAllUsers(userId);
    //                     }
    //                 } else {
    //                     setIsAuthenticated(false);
    //                     if (!publicPaths.includes(currentPath)) {
    //                         navigate('/login');
    //                     }
    //                 }
    //             } catch (error) {
    //                 setIsAuthenticated(false);
    //                 if (!publicPaths.includes(currentPath)) {
    //                     navigate('/login');
    //                 }
    //             }
    //         } else {
    //             setIsAuthenticated(false);
    //             if (!publicPaths.includes(currentPath)) {
    //                 navigate('/login');
    //             }
    //         }
    //         setIsLoading(false);
    //     };

    //     checkAuthentication();
    // }, [navigate]);

    const LogoutUser = async () => {
        socket.emit('status', { status: 'Offline', userId: JSON.parse(localStorage.getItem('user'))?.userData?._id });
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setIsAuthenticated(false); // <-- Add this line to trigger re-render
        navigate('/login');
    };

    const getAllUsers = async (id) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/all-users/${id}`);
            if (response.status === 200) {
                setUsers(response.data.allUsers);
                setGroups(response.data.userGroups);
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

    // Example: Add this function if you handle Google login in AuthContext
    const handleGoogleLogin = async (googleUserData) => {
        // Save user and token as you do for normal login
        localStorage.setItem('user', JSON.stringify(googleUserData));
        localStorage.setItem('token', googleUserData.token);
        setIsAuthenticated(true);
        navigate('/'); // Redirect to home after login
    };

    if (isLoading) {
        return null; // or a loading spinner if you prefer
    }

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            groups,
            setGroups,
            setIsAuthenticated,
            users,
            setUsers,
            LogoutUser,
            getAllUsers,
            checkAuth,
            handleGoogleLogin,
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
