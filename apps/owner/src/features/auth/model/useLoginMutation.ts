"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authClient, LoginRequest } from "@/src/shared/api/auth.client";
import { useAuthStore } from "@/src/shared/state/auth.store";
import { useUIStore } from "@/src/shared/state/ui.store";

export function useLoginMutation() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const { addNotification } = useUIStore();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: (credentials: LoginRequest) => authClient.login(credentials),
    onSuccess: (response) => {
      // Store tokens
      authClient.storeAuthData(response);
      
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
    },
    onError: (error: any) => {
      const errorMessage = error.message || "Ошибка входа";
      
      addNotification({
        type: "error",
        title: "Ошибка входа",
        message: errorMessage,
      });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: () => authClient.logout(),
    onSuccess: () => {
      // Clear auth data
      authClient.clearAuthData();
      setUser(null);
      
      // Clear all queries
      queryClient.clear();
      
      // Redirect to login
      router.push("/login");
    },
    onError: (error) => {
      console.error("Logout error:", error);
      // Still clear local state even if server logout fails
      authClient.clearAuthData();
      setUser(null);
      queryClient.clear();
      router.push("/login");
    },
  });

  return {
    login: loginMutation.mutate,
    logout: logoutMutation.mutate,
    isLoading: loginMutation.isPending,
    error: loginMutation.error?.message || null,
  };
}
