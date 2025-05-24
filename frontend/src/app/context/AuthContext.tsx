"use client";

import { createContext, useEffect, useState, ReactNode, useRef } from "react";
import { jwtDecode } from "jwt-decode";

interface AuthContextType {
  isAdmin: boolean;
  adminName: string | null;
  login: (token: string) => void;
  logout: () => void;
  loading: boolean;
}

interface DecodedToken {
  exp: number;
  unique_name: string;
}

export const AuthContext = createContext<AuthContextType>({
  isAdmin: false,
  adminName: null,
  login: () => {},
  logout: () => {},
  loading: true,
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [adminName, setAdminName] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [hasMounted, setHasMounted] = useState<boolean>(false);
  const logoutTimerRef = useRef<NodeJS.Timeout | null>(null);

  const logout = () => {
    localStorage.removeItem("token");
    setAdminName(null);
    setIsAdmin(false);
    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);
  };

  const scheduleAutoLogout = (exp: number) => {
    const now = Date.now() / 1000;
    const delay = (exp - now) * 1000;

    if (delay <= 0) {
      logout();
      return;
    }

    if (logoutTimerRef.current) clearTimeout(logoutTimerRef.current);

    logoutTimerRef.current = setTimeout(() => {
      logout();
    }, delay);
  };

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decoded: DecodedToken = jwtDecode(token);
    setAdminName(decoded.unique_name);
    setIsAdmin(true);
    scheduleAutoLogout(decoded.exp);
  };

  useEffect(() => {
    setHasMounted(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const decoded: DecodedToken = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp > now) {
        setAdminName(decoded.unique_name);
        setIsAdmin(true);
        scheduleAutoLogout(decoded.exp);
      } else {
        logout();
      }
    } catch {
      logout();
    } finally {
      setLoading(false);
    }
  }, []);

  if (!hasMounted) return null;

  return (
    <AuthContext.Provider value={{ isAdmin, adminName, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
