import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAuth } from "../../Contexts/AuthContext";

export const socket = io(process.env.REACT_APP_API_URL, { transports: ["websocket"] });

const Socket = () => {
    const { setUsers, users } = useAuth();

    useEffect(() => {
        socket.on('connect', () => {
            console.log('Connected to server');
            const userId = JSON.parse(localStorage.getItem('user'))?.userData?._id;
            if (userId) {
                socket.emit('status', { userId, status: 'Online' });
            }
        });

        socket.on('userStatusUpdate', ({ userId, status }) => {
            console.log('User status update received:', userId, status);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user._id === userId ? { ...user, is_online: status } : user
                )
            );
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server');
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("userStatusUpdate");
        };
    }, [setUsers, users]);

    // Example usage of env variable
    console.log("API URL:", process.env.REACT_APP_API_URL);

    return socket;
};

export default Socket;
