'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';
type Contrast = 'normal' | 'high';

interface ThemeContextType {
  theme: Theme;
  contrast: Contrast;
  toggleTheme: () => void;
  toggleContrast: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [contrast, setContrast] = useState<Contrast>('normal');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const savedContrast = localStorage.getItem('contrast') as Contrast | null;
    
    if (savedTheme) setTheme(savedTheme);
    if (savedContrast) setContrast(savedContrast);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    
    localStorage.setItem('theme', theme);
    localStorage.setItem('contrast', contrast);
    
    const html = document.documentElement;
    html.setAttribute('data-theme', theme);
    html.setAttribute('data-contrast', contrast);
  }, [theme, contrast, mounted]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleContrast = () => {
    setContrast(prev => prev === 'normal' ? 'high' : 'normal');
  };

  if (!mounted) return <>{children}</>;

  return (
    <ThemeContext.Provider value={{ theme, contrast, toggleTheme, toggleContrast }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
