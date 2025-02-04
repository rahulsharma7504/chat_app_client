import React, { useState } from 'react';
import styles from '../../Styles/Stting.module.css';


const ThemeCustomization = () => {
  const [theme, setTheme] = useState('light');

  const handleThemeChange = (theme) => {
    setTheme(theme);
    console.log('Theme changed to:', theme);
  };

  return (
    <section className={styles.themeCustomization}>
      <h2>Theme Customization</h2>
      <div>
        <button
          onClick={() => handleThemeChange('light')}
          className={theme === 'light' ? styles.activeButton : ''}
        >
          Light Mode
        </button>
        <button
          onClick={() => handleThemeChange('dark')}
          className={theme === 'dark' ? styles.activeButton : ''}
        >
          Dark Mode
        </button>
      </div>
    </section>
  );
};

export default ThemeCustomization;
