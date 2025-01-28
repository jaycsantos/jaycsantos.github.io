import { cn } from '@/utils/cl';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Metadata } from 'next';
import React from 'react';
import ThemeClient from '../components/theme-client';
import { fontBody, fontTitle } from '../fonts/fonts';
import './globals.css';

export const metadata: Metadata = {
  title: 'jayc santos',
  description:
    'Seasoned software engineer since 2007, specializing in JavaScript and its ecosystem.',
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'flex flex-col min-h-screen scroll-smooth',
          fontTitle.variable,
          fontBody.variable
        )}
      >
        <ThemeClient>
          <div className='self-center max-w-screen-xl'>{children}</div>
        </ThemeClient>
      </body>
      <GoogleAnalytics gaId='G-R2N300KGRV' />
    </html>
  );
}
