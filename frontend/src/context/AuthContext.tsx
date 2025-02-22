import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Importamos la librería

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe estar dentro de un AuthProvider");
  }
  return context;
};

// 🔥 Función para verificar si el token es válido y no está expirado
const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;
  try {
    const decoded: any = jwtDecode(token);
    return decoded.exp > Date.now() / 1000; // El token es válido si no ha expirado
  } catch (error) {
    return false; // Si hay error al decodificar, el token no es válido
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
      console.warn("❌ Token inválido recibido en login");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };  

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
