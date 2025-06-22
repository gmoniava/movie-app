"use client";

import { AuthProvider } from "../AuthProvider";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem storageKey="movie-app-theme">
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}
