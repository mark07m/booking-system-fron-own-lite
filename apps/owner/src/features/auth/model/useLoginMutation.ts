"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient, LoginRequest } from "@/src/shared/api/auth.client";
import { useAuthStore } from "@/src/shared/state/auth.store";
import { useUIStore } from "@/src/shared/state/ui.store";

export function useLoginMutation() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const router = useRouter();
  const { setUser } = useAuthStore();
  const { addNotification } = useUIStore();

  const login = async (credentials: LoginRequest) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await authClient.login(credentials);
      
      // Store tokens
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("refresh_token", response.refreshToken);
      
      // Update auth store
      setUser(response.user);
      
      // Show success notification
      addNotification({
        type: "success",
        title: "Успешный вход",
        message: `Добро пожаловать, ${response.user.name}!`,
      });
      
      // Redirect to dashboard
      router.push("/dashboard");
      
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Ошибка входа";
      setError(errorMessage);
      
      addNotification({
        type: "error",
        title: "Ошибка входа",
        message: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authClient.logout();
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return {
    login,
    logout,
    isLoading,
    error,
  };
}
