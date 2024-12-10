'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { HiSun, HiMoon, HiDesktopComputer } from 'react-icons/hi';

export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setTheme(theme != 'light' ? 'light' : 'dark')}
        className="flex justify-center items-center w-10 h-10 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-700"
        aria-label="Switch theme"
      >
        <HiMoon className="hidden w-5 h-5 dark:block" />
        <HiSun className="w-5 h-5 dark:hidden" />
      </button>

    </div>
  );
} 