import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout/layout'; // Layout import kar rahe hain
import ChatUser from './Pages/ChatUser';
import Profile from './Pages/Profile';
import Settings from './Pages/Settings';

function App() {
  return (
    <Router> {/* Router ko apne app mein wrap karte hain */}
      <Layout> {/* Layout ko wrap karte hain */}
        <Routes>
          {/* Define your routes here */}
          <Route path="/" element={<ChatUser />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
