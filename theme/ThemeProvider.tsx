// src/theme/ThemeProvider.tsx
"use client";

import React, { useEffect, useState, createContext, ReactNode } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const getPrefColorScheme = () => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  };

  const getInitialMode = (): 'light' | 'dark' => {
    if (typeof localStorage === 'undefined') return 'light';
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
    return getPrefColorScheme() ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialMode);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Appliquer la classe Tailwind "dark" au <html>
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
