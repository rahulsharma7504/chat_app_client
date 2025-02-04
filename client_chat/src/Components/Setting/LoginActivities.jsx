import React from 'react';
import styles from '../../Styles/Stting.module.css';


const LoginActivity = () => {
  const loginRecords = [
    { device: 'Chrome', location: 'Delhi, India', time: '2025-01-25 10:00 AM' },
    { device: 'Firefox', location: 'Mumbai, India', time: '2025-01-24 8:00 PM' },
  ];

  const handleLogoutAllDevices = () => {
    if (window.confirm('Are you sure you want to log out from all devices?')) {
      console.log('Logged out from all devices');
    }
  };

  return (
    <section className={styles.loginActivity}>
      <h2>Login Activity</h2>
      <ul>
        {loginRecords.map((record, index) => (
          <li key={index}>
            <strong>Device:</strong> {record.device} <br />
            <strong>Location:</strong> {record.location} <br />
            <strong>Time:</strong> {record.time}
          </li>
        ))}
      </ul>
      <button onClick={handleLogoutAllDevices} className={styles.logoutButton}>
        Log Out from All Devices
      </button>
    </section>
  );
};

export default LoginActivity;
