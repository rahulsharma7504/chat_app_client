import React from 'react';
import Header from '../Components/Header'; // Header component import karenge
import Footer from '../Components/Footer'; // Footer component import karenge
import Sidebar from '../Components/Sidebar'; // Sidebar component import karenge (optional)

const Layout = ({ children }) => {
  return (
    <>
      <Header/>
        <main>
          {children} {/* Ye content hoga jo Layout component ke andar diya jayega */}
        </main>
      <Footer />
      </>
  );
};

export default Layout;
