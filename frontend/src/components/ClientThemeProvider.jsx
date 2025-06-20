// components/ClientThemeProvider.jsx
"use client";

import { ThemeProvider } from '@/components/ThemeContext';

export default function ClientThemeProvider({ children }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}