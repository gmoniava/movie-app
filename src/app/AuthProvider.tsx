"use client";

import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean | null;
  session: any | null;
  isLoading: boolean;
  checkAuth: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: null,
  session: null,
  isLoading: true,
  checkAuth: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean | null;
    session: any | null;
  }>({
    isAuthenticated: null,
    session: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/lib/session");
      if (!res.ok) throw new Error("Auth check failed");

      const data = await res.json();
      setAuthState({
        isAuthenticated: data.authenticated,
        session: data.session,
      });
    } catch (error) {
      setAuthState({
        isAuthenticated: false,
        session: null,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Initial check on mount
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        isLoading,
        checkAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
