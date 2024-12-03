import "./globals.css";
import {Metadata} from "next";
import React from "react";
import ThemeClient from "./components/theme-client";
import { GoogleAnalytics } from '@next/third-parties/google'
import { fontTitle, fontBody } from "./components/fonts";

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
      <body className={"flex flex-col min-h-screen scroll-smooth  " + [fontTitle.variable, fontBody.variable].join(' ')}>
        <ThemeClient>
          <div className="self-center max-w-screen-lg">{children}</div>
        </ThemeClient>
      </body>
      <GoogleAnalytics gaId="G-R2N300KGRV" />
    </html>
  );
}
