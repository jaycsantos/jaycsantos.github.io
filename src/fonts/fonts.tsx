
import { Hepta_Slab, Inter } from "next/font/google";

export const fontTitle = Hepta_Slab({
  weight: '300',
  subsets: ['latin'],
  variable: '--font-title',
  fallback: ['sans-serif'],
  preload: true,
});

export const fontBody = Inter({
  weight: '300',
  subsets: ['latin'],
  variable: '--font-body',
  fallback: ['serif'],
  preload: true,
});
