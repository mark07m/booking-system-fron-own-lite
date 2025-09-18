"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/src/shared/ui/Button";
import { Input } from "@/src/shared/ui/Input";
import { Label } from "@/src/shared/ui/Label";
import { useLoginMutation } from "@/src/features/auth/model/useLoginMutation";
import Link from "next/link";

const registerSchema = z.object({
  name: z.string().min(2, "Имя должно содержать минимум 2 символа"),
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Пароль должен содержать минимум 6 символов"),
  confirmPassword: z.string(),
  phone: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Пароли не совпадают",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      // In a real app, this would call register API
      console.log("Register data:", data);
      
      // For demo, simulate successful registration and auto-login
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Auto-login after registration
      await login({
        email: data.email,
        password: data.password,
      });
    } catch (err: any) {
      setError(err.message || "Ошибка регистрации");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div>
        <Label htmlFor="name">Имя</Label>
        <Input
          id="name"
          type="text"
          {...register("name")}
          className={errors.name ? "border-red-300" : ""}
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          className={errors.email ? "border-red-300" : ""}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="phone">Телефон (необязательно)</Label>
        <Input
          id="phone"
          type="tel"
          {...register("phone")}
        />
      </div>

      <div>
        <Label htmlFor="password">Пароль</Label>
        <Input
          id="password"
          type="password"
          {...register("password")}
          className={errors.password ? "border-red-300" : ""}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
        <Input
          id="confirmPassword"
          type="password"
          {...register("confirmPassword")}
          className={errors.confirmPassword ? "border-red-300" : ""}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Регистрация..." : "Зарегистрироваться"}
      </Button>

      <div className="text-center">
        <p className="text-sm text-gray-600">
          Уже есть аккаунт?{" "}
          <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Войти
          </Link>
        </p>
      </div>
    </form>
  );
}
