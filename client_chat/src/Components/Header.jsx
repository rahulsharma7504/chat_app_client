import React, { useState, useContext } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { GiHamburgerMenu } from 'react-icons/gi'; // Hamburger icon from react-icons
import styles from '../Styles/Header.module.css'; // CSS module import
import { Link } from 'react-router-dom';
import { AuthContext, useAuth } from './../Contexts/AuthContext';

const Header = () => {
  const [expanded, setExpanded] = useState(false); // To manage the toggle state for mobile menu
  const { isAuthenticated, LogoutUser } = useAuth(); // Access auth context

  return (
    <Navbar expanded={expanded} expand="lg" className={styles.navbar}>
      <Container>
        {/* Logo Image on the Left */}
        <Navbar.Brand as={Link} to={'/'} className={styles.brand}>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJVEvpRVPSe2IneOH_wawjbx8CEELhAF4C6-Xk6-XHzVqRfR_ZkiUBeqz4wizB7iqAWMo&usqp=CAU" alt="Logo" className={styles.logo} />
        </Navbar.Brand>

        {/* Hamburger Menu for Mobile */}
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          onClick={() => setExpanded(!expanded)} // Toggle the menu when clicked
          className={styles.hamburgerToggle}
        >
          <GiHamburgerMenu className={styles.hamburgerIcon} />
        </Navbar.Toggle>

        {/* Navbar Links */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={styles.navLinks}>
            {/* Conditional rendering based on authentication */}
            {isAuthenticated ? (
              // If authenticated, show the profile and settings dropdown
              <NavDropdown
                title="More"
                style={{ color: 'white' }}
                className={styles.navDropdown}
              >
                <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/settings">Settings</NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    setExpanded(false); // Close the menu after logout
                    LogoutUser();
                  }}
                >
                  LogOut
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              // If not authenticated, show login and signup links
              <>
                <Nav.Item>
                  <Nav.Link as={Link} to="/login" className={styles.navLink}>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link as={Link} to="/signup" className={styles.navLink}>Sign Up</Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
