import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 🔥 Function to check if the token is valid and not expired
const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  try {
    const decoded: any = jwtDecode(token);
    return decoded.exp > Date.now() / 1000;
  } catch (error) {
    return false;
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(() => {
    const storedToken = localStorage.getItem("token");
    return isTokenValid(storedToken) ? storedToken : null;
  });

  const login = (newToken: string) => {
    if (isTokenValid(newToken)) {
      localStorage.setItem("token", newToken);
      setToken(newToken);
    } else {
      console.warn("❌ Invalid token received in login");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const storedToken = localStorage.getItem("token");
      if (!isTokenValid(storedToken)) {
        toast.error("Session expired...");
        logout();
      }
    };
  
    window.addEventListener("storage", handleStorageChange);
  
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
