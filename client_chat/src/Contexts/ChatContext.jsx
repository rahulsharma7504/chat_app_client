import React, { createContext, useContext, useState } from 'react';
import socket from '../Components/Socket/Socket';
import axios from 'axios';
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);

    

    const handleUserStatus = (userId) => {
        socket.emit('status', { status: 'Online', userId: userId });
    }

    const fetchMessages=async(userId)=>{
        try{
            const response=await axios.get(`${process.env.REACT_APP_API_URL}/chat/?userId1=${userId}&userId2=${JSON.parse(localStorage.getItem('user'))._id}`);
            setMessages(response.data);

        } catch (err) {
            console.error(err);
            
        }
    };

    
   async function handleSendMessage (senderId,receiverId,message){
        try{
            socket.emit('sendMessage',{senderId,receiverId,message});
            socket.on('message',(newMessage)=>{
                setMessages((prevMessages)=>[...prevMessages,newMessage]);
            });
        } catch (err) {
            console.error(err);
            
        }

   }
    return (
        <ChatContext.Provider value={{ messages, handleUserStatus,fetchMessages,handleSendMessage }}>
            {children}
        </ChatContext.Provider>
    );
};

const useChat = () => {
    return useContext(ChatContext);
}
export { ChatContext, useChat, ChatProvider };