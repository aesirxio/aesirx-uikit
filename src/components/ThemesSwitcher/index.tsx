import React from 'react';
import { useThemeContext, listThemes } from 'providers/ThemeContextProvider';
import { ThemeMode } from './ThemeMode';

const ThemesSwitcher = () => {
  const { theme, toggleTheme } = useThemeContext();

  const current = listThemes.find((item: any) => item.name === theme);

  return (
    <div className="switch-theme-button col-auto py-2 ps-16 pe-24">
      <div className=" position-relative cursor-pointer">
        <ThemeMode fill={current?.color} onClick={() => toggleTheme()} />
      </div>
    </div>
  );
};

export { ThemesSwitcher };
