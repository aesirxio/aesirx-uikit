import React from 'react';
import { Form } from 'react-bootstrap';
import { getStoredTheme, setStoredTheme, setTheme } from 'theme/darkmode';
const ThemesSwitcher = () => {
  return (
    <div className="py-2 ps-0 mb-6px d-flex align-items-center justify-content-between">
      <div className="mode-switcher px-3 mx-2">
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
