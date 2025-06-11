import { useState, useEffect, type ReactNode } from "react";
import { AuthContext, type AuthContextType } from "@/contexts/AuthContext";
import { authService } from "@/services/authService";
import type { AuthRequest, RegisterRequest, UserDTO } from "@/types";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDTO | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      setIsLoading(true);
      try {
        const token = authService.getToken();
        if (token && authService.isAuthenticated()) {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
        } else {
          setUser(null);
        }
      } catch {
        setUser(null);
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };
    initializeAuth();
  }, []);

  const login = async (credentials: AuthRequest) => {
    setIsLoading(true);
    try {
      await authService.login(credentials);
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    setIsLoading(true);
    try {
      await authService.register(data);
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
