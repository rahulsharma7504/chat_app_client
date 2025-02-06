import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

import App from './App';
import { ToastProvider } from './Components/ToastProvider';
import { ChatProvider } from './Contexts/ChatContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <ChatProvider>
            <ToastProvider>
                <App />
            </ToastProvider>
        </ChatProvider>
    </>
);

