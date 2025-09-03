"use client";

import {
  useState,
  useEffect,
  useContext,
  createContext,
  type ReactNode,
} from "react";
import axios from "axios";

interface User {
  id: string;
  username: string;
  email: string;
  role?: string;
  [key: string]: any; // Allow for additional user properties
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<User>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuthStatus = async () => {
    try {
      const response = await api.get("/api/auth/me");
      console.log("Auth /me response:", response.data);
      if (response.data.success) {
        setUser(response.data.data);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    const response = await api.post("/api/auth/login", {
      email: email,
      password: password,
    });
    if (response.data.success) {
      setUser(response.data.data);
      return response.data.data;
    }
    throw new Error("Login failed");
  };

  const register = async (
    username: string,
    email: string,
    password: string
  ): Promise<User> => {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });
    if (response.data.success) {
      setUser(response.data.data);
      return response.data.data;
    }
    throw new Error("Registration failed");
  };

  const logout = async (): Promise<void> => {
    await api.post("/api/auth/logout", {});
    setUser(null);
  };

  const refreshUser = async (): Promise<void> => {
    await checkAuthStatus();
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
