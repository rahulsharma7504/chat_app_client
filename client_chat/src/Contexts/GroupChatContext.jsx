import axios from 'axios';
import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const GroupChatContext = createContext();

export const GroupChatProvider = ({ children }) => {
    const { setGroups, groups } = useAuth();
    const [currentGroup, setCurrentGroup] = useState(null);

  
    const handleLeaveGroup = async (groupId, userId) => {
        try {   
            // Check if groupId and userId are valid
            if (!groupId || !userId) {
                toast.error('Invalid group or user ID');
                return;
            }
            
            // Sending data as the second argument in the correct format
            const response = await axios.delete(
                `${process.env.REACT_APP_API_URL}/group/leave`,
                { 
                    data: { groupId: groupId, userId: userId._id } // Correct format
                },
                { withCredentials: true } // Ensure credentials are sent if needed (e.g., cookies)
            );
    
            if (response.status === 200) {
                // Update the groups state to remove the user from the group
                setGroups((prevGroups) => prevGroups.filter((group) => group._id !== groupId));
                toast.success(response.data.message);
            } else {
                toast.error('Failed to leave the group');
            }
        } catch (error) {
            console.error('Error leaving group:', error.message);
            toast.error('Server error');
        }
    };
    


    return (
        <GroupChatContext.Provider value={{ groups, setGroups, handleLeaveGroup,currentGroup, setCurrentGroup }}>
            {children}
        </GroupChatContext.Provider>
    );
};

export const useGroup = () => {
    return useContext(GroupChatContext);
};