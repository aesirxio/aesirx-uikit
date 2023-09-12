import React from 'react';
// import { useThemeContext, listThemes } from 'providers/ThemeContextProvider';
// import { ThemeMode } from './ThemeMode';

import { Form } from 'react-bootstrap';
import { setStoredTheme, setTheme } from 'theme/darkmode';
const ThemesSwitcher = () => {
  // const { theme, toggleTheme } = useThemeContext();

  // const current = listThemes.find((item: any) => item.name === theme);

  return (
    <div className="py-2 ps-0 mb-6px d-flex align-items-center justify-content-between">
      <div className="mode-switcher px-3 mx-2">
        <Form.Check
          type="switch"
          id="switcher-mobile"
          defaultChecked={window.matchMedia('(prefers-color-scheme: dark)').matches ? true : false}
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
