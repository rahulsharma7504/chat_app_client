import React, { useState } from 'react';
import styles from '../../Styles/Stting.module.css';



const NotificationSettings = () => {
  const [messageNotifications, setMessageNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  return (
    <section className={styles.notificationSettings}>
      <h2>Notification Settings</h2>
      <div>
        <label>
          <input
            type="checkbox"
            checked={messageNotifications}
            onChange={() => setMessageNotifications(!messageNotifications)}
          />
          Message Notifications
        </label>
      </div>
      <div>
        <label>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={() => setEmailNotifications(!emailNotifications)}
          />
          Email Notifications
        </label>
      </div>
    </section>
  );
};

export default NotificationSettings;
