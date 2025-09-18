"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { authClient, ResetPasswordRequest } from "@shared/api/auth.client";
import { useUIStore } from "@shared/state/ui.store";

export function useResetPasswordMutation() {
  const router = useRouter();
  const { addNotification } = useUIStore();

  const resetPasswordMutation = useMutation({
    mutationFn: (data: ResetPasswordRequest) => authClient.resetPassword(data),
    onSuccess: () => {
      addNotification({
        type: "success",
        title: "Пароль изменен",
        message: "Ваш пароль был успешно изменен",
      });
      
      // Redirect to login
      router.push("/login");
    },
    onError: (error: any) => {
      const errorMessage = error.message || "Ошибка сброса пароля";
      
      addNotification({
        type: "error",
        title: "Ошибка",
        message: errorMessage,
      });
    },
  });

  return {
    resetPassword: resetPasswordMutation.mutate,
    isLoading: resetPasswordMutation.isPending,
    error: resetPasswordMutation.error?.message || null,
  };
}
