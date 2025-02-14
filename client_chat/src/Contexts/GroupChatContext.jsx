import axios from 'axios';
import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const GroupChatContext = createContext();

export const GroupChatProvider = ({ children }) => {
    const { setGroups, groups } = useAuth();
    const [currentGroup, setCurrentGroup] = useState(null);

  



    return (
        <GroupChatContext.Provider value={{ groups, setGroups, currentGroup, setCurrentGroup }}>
            {children}
        </GroupChatContext.Provider>
    );
};

export const useGroup = () => {
    return useContext(GroupChatContext);
};