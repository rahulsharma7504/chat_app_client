import React, { createContext, useContext, useState } from 'react';
import socket from '../Components/Socket/Socket';
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);

    const addMessage = (message) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const handleUserStatus = (userId) => {
        socket.emit('status', { status: 'Online', userId: userId });
    }

    return (
        <ChatContext.Provider value={{ messages, handleUserStatus, addMessage }}>
            {children}
        </ChatContext.Provider>
    );
};

const useChat = () => {
    return useContext(ChatContext);
}
export { ChatContext, useChat, ChatProvider };