'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem('portfolio-theme') as Theme | null;
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const initial = saved === 'dark' || saved === 'light' ? saved : preferred;
    document.documentElement.classList.toggle('dark', initial === 'dark');
    requestAnimationFrame(() => {
      setTheme(initial);
      setMounted(true);
    });
  }, []);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    window.localStorage.setItem('portfolio-theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
  };

  return (
    <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={mounted && theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} title={mounted && theme === 'dark' ? 'Light mode' : 'Dark mode'}>
      <span className="theme-toggle-icon">{mounted && theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}</span>
      <span className="theme-toggle-label">{mounted && theme === 'dark' ? 'Light' : 'Dark'}</span>
    </button>
  );
}
