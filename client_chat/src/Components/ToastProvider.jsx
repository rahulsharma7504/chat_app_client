import React from 'react';
import { Toaster, toast } from 'react-hot-toast'; // Import Toaster and toast from react-hot-toast

// Create the ToastProvider component
export const ToastProvider = ({ children }) => { 

  return (
    <>
      {/* Toaster will handle the display of toasts */}
      <Toaster position="top-right" reverseOrder={false} />
      {children}
    </>
  );
};
