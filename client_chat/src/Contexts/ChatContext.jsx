import React, { createContext, useContext, useState, useEffect } from 'react';
import socket from '../Components/Socket/Socket';
import axios from 'axios';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on('message', (newMessage) => {
            setMessages((prevMessages) => {
                if (Array.isArray(prevMessages)) {
                    return [...prevMessages, newMessage];
                } else {
                    return [newMessage];
                }
            });
        });

        // Cleanup the event listener on component unmount
        return () => {
            socket.off('message');
        };
    }, []);

    const handleUserStatus = (userId) => {
        socket.emit('status', { status: 'Online', userId: userId });
    }

    const fetchMessages = async (userId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/chat/?userId1=${userId}&userId2=${JSON.parse(localStorage.getItem('user'))._id}`);
            setMessages(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchGroupMessages = async (groupId) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/chat/group/?groupId=${groupId}`);
            setMessages(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    async function handleSendMessage(senderId, receiverId, message, isGroup = false) {
        try {
            if (isGroup) {
                socket.emit('sendGroupMessage', { senderId, groupId: receiverId, message });
            } else {
                socket.emit('sendMessage', { senderId, receiverId, message });
            }
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <ChatContext.Provider value={{ messages, handleUserStatus, fetchMessages, fetchGroupMessages, handleSendMessage }}>
            {children}
        </ChatContext.Provider>
    );
};

const useChat = () => {
    return useContext(ChatContext);
}

export { ChatContext, useChat, ChatProvider };