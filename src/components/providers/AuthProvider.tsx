import { useState, useEffect, type ReactNode } from "react";
import { AuthContext, type AuthContextType } from "@/contexts/AuthContext";
import { authService } from "@/services/authService";
import type { AuthRequest, RegisterRequest, UserDTO } from "@/types";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserDTO | null>(() => authService.getUser());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === "auth_token" || event.key === "user") {
        setUser(authService.getUser());
      }
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const token = authService.getToken();
      if (token && authService.isAuthenticated()) {
        const localUser = authService.getUser();
        if (localUser) {
          setUser(localUser);
        } else {
          const refreshedUser = await authService.refreshUser();
          setUser(refreshedUser);
        }
      } else {
        authService.logout();
        setUser(null);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (credentials: AuthRequest) => {
    setIsLoading(true);
    try {
      authService.logout(); // limpio estado previo
      await authService.login(credentials);
      setUser(authService.getUser());
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterRequest) => {
    setIsLoading(true);
    try {
      await authService.register(data);
      setUser(authService.getUser());
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
