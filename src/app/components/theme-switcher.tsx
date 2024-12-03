'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { HiSun, HiMoon, HiDesktopComputer } from 'react-icons/hi';

export default function ThemeSwitcher({ className }: { className?: string }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isOpen && !target.closest('[data-theme-switcher]')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  if (!mounted) return null;


  const changeTheme = (theme: string) => {
    setTheme(theme);
    setIsOpen(false);
  }

  return (
    <div className={`relative ${className}`} data-theme-switcher>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 transition-colors rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label="Switch theme"
      >
        <HiMoon className="hidden w-5 h-5 dark:block" />
        <HiSun className="w-5 h-5 dark:hidden" />
      </button>

      {isOpen && (
        <div className="absolute right-0 z-30 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg dark:bg-gray-900 ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            <button
              onClick={() => changeTheme('light')}
              className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <HiSun className="w-4 h-4 mr-2" />
              Light
            </button>
            <button
              onClick={() => changeTheme('dark')}
              className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <HiMoon className="w-4 h-4 mr-2" />
              Dark
            </button>
            <button
              onClick={() => changeTheme('system')}
              className="flex items-center w-full px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <HiDesktopComputer className="w-4 h-4 mr-2" />
              System
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 