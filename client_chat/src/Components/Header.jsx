import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import { GiHamburgerMenu } from 'react-icons/gi'; // Hamburger icon from react-icons
import styles from '../Styles/Header.module.css'; // CSS module import
import {Link} from 'react-router-dom'
const Header = () => {
  const [expanded, setExpanded] = useState(false); // To manage the toggle state for mobile menu

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
            {/* Dropdown for larger screens, aligned to the right */}
            <NavDropdown
              title="More"
              style={{color:'white'}}
              className={styles.navDropdown}
            >
              <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item  as={Link} to="/settings">Settings</NavDropdown.Item>
              <NavDropdown.Item href="#">Something else here</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
