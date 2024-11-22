import localFont from "next/font/local";
import {Quicksand} from "next/font/google";
import "./globals.css";
import {Metadata} from "next";
import React from "react";

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
    <html lang="en">
      <body
        className={`${fontFamily.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
