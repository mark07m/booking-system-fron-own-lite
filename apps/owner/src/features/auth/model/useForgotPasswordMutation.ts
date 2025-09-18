"use client";

import { useMutation } from "@tanstack/react-query";
import { authClient, ForgotPasswordRequest } from "@shared/api/auth.client";
import { useUIStore } from "@shared/state/ui.store";

export function useForgotPasswordMutation() {
  const { addNotification } = useUIStore();

  const forgotPasswordMutation = useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authClient.forgotPassword(data),
    onSuccess: () => {
      addNotification({
        type: "success",
        title: "Письмо отправлено",
        message: "Инструкции по восстановлению пароля отправлены на ваш email",
      });
    },
    onError: (error: any) => {
      const errorMessage = error.message || "Ошибка отправки запроса";
      
      addNotification({
        type: "error",
        title: "Ошибка",
        message: errorMessage,
      });
    },
  });

  return {
    forgotPassword: forgotPasswordMutation.mutate,
    isLoading: forgotPasswordMutation.isPending,
    error: forgotPasswordMutation.error?.message || null,
  };
}
