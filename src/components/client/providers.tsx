"use client";

import { AuthProvider } from "./auth-provider";
import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider attribute="class" defaultTheme="light" storageKey="movie-app-theme">
        {children}
      </ThemeProvider>
    </AuthProvider>
  );
}
