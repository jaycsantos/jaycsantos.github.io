import {Quicksand} from "next/font/google";
import "./globals.css";
import {Metadata} from "next";
import React from "react";
import ThemeClient from "./components/theme-client";
import { GoogleAnalytics } from '@next/third-parties/google'

const fontFamily = Quicksand({
  weight: "300",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "jayc santos",
  description: "jayc santos porfolio",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeClient>
          {children}
        </ThemeClient>
      </body>
      <GoogleAnalytics gaId="G-R2N300KGRV" />
    </html>
  );
}
