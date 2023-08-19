import React from 'react';
// import { useThemeContext, listThemes } from 'providers/ThemeContextProvider';
// import { ThemeMode } from './ThemeMode';

import { Form } from 'react-bootstrap';
import { getStoredTheme, setStoredTheme, setTheme } from 'scss/utils/darkmode';
const ThemesSwitcher = () => {
  // const { theme, toggleTheme } = useThemeContext();

  // const current = listThemes.find((item: any) => item.name === theme);

  return (
    <div className="py-2 ps-0 mb-6px d-flex align-items-center justify-content-between">
      <div className="mode-switcher">
        <Form.Check
          type="switch"
          id="switcher-mobile"
          defaultChecked={getStoredTheme() === 'dark'}
          onChange={(e) => {
            if (e.target.checked) {
              setStoredTheme('dark');
              setTheme('dark');
            } else {
              setStoredTheme('light');
              setTheme('light');
            }
          }}
        />
      </div>
    </div>
  );
};

export { ThemesSwitcher };
