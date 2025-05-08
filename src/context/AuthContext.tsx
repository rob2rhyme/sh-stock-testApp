// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";

const SESSION_DURATION_MS = 15 * 60 * 1000;

type AuthContextType = {
  isAuthenticated: boolean;
  authenticate: () => void;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  authenticate: () => {},
  signOut: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const expiresAt = localStorage.getItem("auth_expires");
    if (expiresAt && new Date().getTime() < Number(expiresAt)) {
      setAuthenticated(true);
    }
  }, []);

  const authenticate = () => {
    const expiresAt = new Date().getTime() + SESSION_DURATION_MS;
    localStorage.setItem("auth_expires", `${expiresAt}`);
    setAuthenticated(true);
  };

  const signOut = () => {
    localStorage.removeItem("auth_expires");
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: authenticated, authenticate, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
