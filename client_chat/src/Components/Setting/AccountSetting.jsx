import React, { useState } from 'react';
import styles from '../../Styles/Stting.module.css'

const AccountSettings = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();
    console.log('Password changed:', newPassword);
  };

  const handleAccountDeletion = () => {
    if (window.confirm('Are you sure you want to delete your account? This action is irreversible.')) {
      console.log('Account deleted');
    }
  };

  return (
    <section className={styles.accountSettings}>
      <h2>Account Settings</h2>
      <form onSubmit={handlePasswordChange}>
        <div>
          <label>Current Password</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label>New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className={styles.saveButton}>
          Change Password
        </button>
      </form>
      <button onClick={handleAccountDeletion} className={styles.deleteButton}>
        Delete Account
      </button>
    </section>
  );
};

export default AccountSettings;
