import React from 'react';
import AccountSettings from '../Components/Setting/AccountSetting';
import NotificationSettings from '../Components/Setting/Notification';
import ThemeCustomization from '../Components/Setting/Them';
import LoginActivity from '../Components/Setting/LoginActivities';
import styles from '../Styles/Stting.module.css'
;

const SettingsRoute = () => {
  return (
    <div className={styles.settingsContainer}>
      <h1 className={styles.heading}>Settings</h1>
      <AccountSettings />
      <NotificationSettings />
      <ThemeCustomization />
      <LoginActivity />
    </div>
  );
};

export default SettingsRoute;
