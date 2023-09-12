import React, { createContext, useState, useContext, useEffect } from 'react';

interface IContext {
  theme: any;
  toggleTheme: () => void;
}

const listThemes = [
  { name: 'light', color: '#0A083B', className: '' },
  { name: 'dark', color: '#fff', className: '' },
];

const ThemesContext = createContext<IContext>({
  theme: 'light',
  toggleTheme: () => {},
});

const ThemesContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<any>(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  const toggleTheme = () => {
    const newThemeValue = theme === 'dark' ? 'light' : 'dark';
    setTheme(newThemeValue);
    localStorage.setItem('theme', newThemeValue);

    document.documentElement.setAttribute('data-bs-theme', newThemeValue);
  };

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-bs-theme', theme);
  }, [theme]);

  return <ThemesContext.Provider value={{ theme, toggleTheme }}>{children}</ThemesContext.Provider>;
};

const useThemeContext = () => useContext(ThemesContext);

/* HOC to inject store to any functional or class component */
const withThemeContext = (Component: any) => (props: any) => {
  return <Component {...props} {...useThemeContext()} />;
};

export { ThemesContext, ThemesContextProvider, useThemeContext, withThemeContext, listThemes };
