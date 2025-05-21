import React, { createContext, useContext, useState, useEffect } from 'react';
import { socket } from '../Components/Socket/Socket';
import axios from 'axios';

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Listen for incoming messages (individual and group)
        socket.on('message', (newMessage) => {
            addMessage(newMessage);
        });

        return () => {
            socket.off('message');
        };
    }, []);

    const handleUserStatus = (userId) => {
        socket.emit('status', { status: 'Online', userId: userId });
    }

    const fetchMessages = async (userId) => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/chat/?userId1=' + userId + '&userId2=' + JSON.parse(localStorage.getItem('user')).userData._id);
            setMessages(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    const fetchGroupMessages = async (groupId) => {
        try {
            const response = await axios.get(process.env.REACT_APP_API_URL + '/chat/group/?groupId=' + groupId);
            // Check if response.data is an array before merging
            if (Array.isArray(response.data)) {
                setMessages((prevMessages) => {
                    const existingIds = new Set(prevMessages.map(msg => msg._id || msg.id));
                    const newMessages = response.data.filter(msg => !(existingIds.has(msg._id) || existingIds.has(msg.id)));
                    return [...prevMessages, ...newMessages];
                });
            } else {
                // If not array, set messages directly or empty array
                setMessages(response.data || []);
            }
        } catch (err) {
            console.error(err);
        }
    };

    async function handleSendMessage(senderId, receiverId, message, isGroup ) {
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

    // New function to add a message to the messages state
    const addMessage = (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    // New function to join a group room
    const joinGroup = (groupId) => {
        socket.emit('joinGroup', groupId);
    };

    return (
        <ChatContext.Provider value={{ messages, handleUserStatus, fetchMessages, fetchGroupMessages, handleSendMessage, addMessage, joinGroup }}>
            {children}
        </ChatContext.Provider>
    );
};

const useChat = () => {
    return useContext(ChatContext);
}

export { ChatContext, useChat, ChatProvider };
