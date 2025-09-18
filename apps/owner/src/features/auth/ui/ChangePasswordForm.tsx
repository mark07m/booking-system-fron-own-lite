"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@shared/ui/Button";
import { Input } from "@shared/ui/Input";
import { Label } from "@shared/ui/Label";
import { changePasswordSchema, type ChangePasswordFormData } from "../model/auth.schemas";
import { useMutation } from "@tanstack/react-query";
import { authClient } from "@shared/api/auth.client";
import { useUIStore } from "@shared/state/ui.store";

export function ChangePasswordForm() {
  const { addNotification } = useUIStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordFormData>({
    resolver: zodResolver(changePasswordSchema),
  });

  const changePasswordMutation = useMutation({
    mutationFn: (data: ChangePasswordFormData) => authClient.changePassword(data),
    onSuccess: () => {
      addNotification({
        type: "success",
        title: "Пароль изменен",
        message: "Ваш пароль был успешно изменен",
      });
      reset();
    },
    onError: (error: any) => {
      const errorMessage = error.message || "Ошибка изменения пароля";
      
      addNotification({
        type: "error",
        title: "Ошибка",
        message: errorMessage,
      });
    },
  });

  const onSubmit = (data: ChangePasswordFormData) => {
    changePasswordMutation.mutate(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="currentPassword">Текущий пароль</Label>
        <Input
          id="currentPassword"
          type="password"
          {...register("currentPassword")}
          className={errors.currentPassword ? "border-red-500" : ""}
          placeholder="Введите текущий пароль"
        />
        {errors.currentPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.currentPassword.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="newPassword">Новый пароль</Label>
        <Input
          id="newPassword"
          type="password"
          {...register("newPassword")}
          className={errors.newPassword ? "border-red-500" : ""}
          placeholder="Введите новый пароль"
        />
        {errors.newPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword">Подтвердите новый пароль</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          className={errors.confirmPassword ? "border-red-500" : ""}
          placeholder="Подтвердите новый пароль"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={changePasswordMutation.isPending}
      >
        {changePasswordMutation.isPending ? "Изменение..." : "Изменить пароль"}
      </Button>
    </form>
  );
}
