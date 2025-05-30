import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const [newMembers, setNewMembers] = useState([]);

    const userInfo = JSON.parse(localStorage.getItem('user'))?.userData;
    const [profileData, setProfileData] = useState({
        name: userInfo?.name || '',
        email: userInfo?.email || '',
        bio: userInfo?.bio || '',
        image: userInfo?.image || ''
    });

    const existingData = JSON.parse(localStorage.getItem("user"));

    const updateProfile = async (updatedData) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/profile/${userInfo._id}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setProfileData(response.data);
                const updatedData = {
                    userData: response.data, // yeh updated user data hoga
                    JoinedGroups: existingData ? existingData.JoinedGroups : []
                };
                localStorage.setItem('user', JSON.stringify(updatedData));
                toast.success('Profile updated successfully');
                return { success: true, message: 'Profile updated successfully' };
            } else {
                return { success: false, message: 'Failed to update profile' };
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            return { success: false, message: 'Server error' };
        }
    };

    const handleAddGroupMember = async (groupId, newMembers, groupLimit) => {
        console.log(groupId, newMembers, groupLimit)
        try {
            if (newMembers.length > groupLimit) {
                toast.error(`Cannot add more than ${groupLimit} members.`);
                return { success: false, message: `Cannot add more than ${groupLimit} members.` };
            }
            if (newMembers.length === 0) {
                toast.success('Group Updated');
            } else {
                const response = await axios.put(`${process.env.REACT_APP_API_URL}/group/add-users`, {
                    groupId,
                    newMembers,
                    groupLimit
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.status === 200) {
                    toast.success('Members added successfully');
                    return { success: true, message: 'Members added successfully' };
                } else {
                    toast.error('Failed to add members');
                    return { success: false, message: 'Failed to add members' };
                }
            }


        } catch (error) {
            console.error('Error adding members:', error);
            toast.error('Server error');
            return { success: false, message: 'Server error' };
        }
    };

    return (
        <ProfileContext.Provider value={{ profileData, newMembers, setNewMembers, setProfileData, updateProfile, handleAddGroupMember }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    return useContext(ProfileContext);
};