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

// AuthProvider component to wrap around parts of the app that need auth state
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [authState, setAuthState] = useState<{
    isAuthenticated: boolean | null;
    session: any | null;
  }>({
    isAuthenticated: null,
    session: null,
  });
  const [isLoading, setIsLoading] = useState(true);

  // Function to check authentication status using session API
  const checkAuth = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("api/session");
      if (!res.ok) throw new Error("User is not authenticated");

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
