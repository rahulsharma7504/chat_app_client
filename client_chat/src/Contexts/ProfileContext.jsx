import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
    const userInfo = JSON.parse(localStorage.getItem('user'))?.userData;
    const [profileData, setProfileData] = useState({
        name: userInfo?.name || '',
        email: userInfo?.email || '',
        bio: userInfo?.bio || '',
        image: userInfo?.image || '',
    });

    const updateProfile = async (updatedData) => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/profile/${userInfo._id}`, updatedData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                setProfileData(response.data);
                localStorage.setItem('user', JSON.stringify({ userData: response.data }));
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

    return (
        <ProfileContext.Provider value={{ profileData, setProfileData, updateProfile }}>
            {children}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
    return useContext(ProfileContext);
};