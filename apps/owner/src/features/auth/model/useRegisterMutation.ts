"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authClient, RegisterRequest } from "@/src/shared/api/auth.client";
import { useAuthStore } from "@/src/shared/state/auth.store";
import { useUIStore } from "@/src/shared/state/ui.store";

export function useRegisterMutation() {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const { addNotification } = useUIStore();
  const queryClient = useQueryClient();

  const registerMutation = useMutation({
    mutationFn: (userData: RegisterRequest) => authClient.register(userData),
    onSuccess: (response) => {
      // Store tokens
      authClient.storeAuthData(response);
      
      // Update auth store
      setUser(response.user);
      
      // Show success notification
      addNotification({
        type: "success",
        title: "Регистрация успешна",
        message: `Добро пожаловать, ${response.user.name}!`,
      });
      
      // Redirect to dashboard
      router.push("/dashboard");
    },
    onError: (error: any) => {
      const errorMessage = error.message || "Ошибка регистрации";
      
      addNotification({
        type: "error",
        title: "Ошибка регистрации",
        message: errorMessage,
      });
    },
  });

  return {
    register: registerMutation.mutate,
    isLoading: registerMutation.isPending,
    error: registerMutation.error?.message || null,
  };
}
