import { z } from "zod";

// Login schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email обязателен")
    .email("Введите корректный email"),
  password: z
    .string()
    .min(1, "Пароль обязателен")
    .min(6, "Пароль должен содержать минимум 6 символов"),
  rememberMe: z.boolean().optional(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Register schema
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(1, "Имя обязательно")
      .min(2, "Имя должно содержать минимум 2 символа")
      .max(50, "Имя не должно превышать 50 символов"),
    email: z
      .string()
      .min(1, "Email обязателен")
      .email("Некорректный email"),
    password: z
      .string()
      .min(1, "Пароль обязателен")
      .min(6, "Пароль должен содержать минимум 6 символов")
      .max(100, "Пароль не должен превышать 100 символов")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Пароль должен содержать минимум одну строчную букву, одну заглавную букву и одну цифру"
      ),
    confirmPassword: z
      .string()
      .min(1, "Подтверждение пароля обязательно"),
    phone: z
      .string()
      .optional()
      .refine(
        (val) => !val || /^[\+]?[1-9][\d]{0,15}$/.test(val),
        "Некорректный формат телефона"
      ),
    timezone: z.string().optional(),
    language: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type RegisterFormData = z.infer<typeof registerSchema>;

// Forgot password schema
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email обязателен")
    .email("Некорректный email"),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// Reset password schema
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Токен обязателен"),
    password: z
      .string()
      .min(1, "Пароль обязателен")
      .min(6, "Пароль должен содержать минимум 6 символов")
      .max(100, "Пароль не должен превышать 100 символов")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Пароль должен содержать минимум одну строчную букву, одну заглавную букву и одну цифру"
      ),
    confirmPassword: z
      .string()
      .min(1, "Подтверждение пароля обязательно"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// Change password schema
export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(1, "Текущий пароль обязателен"),
    newPassword: z
      .string()
      .min(1, "Новый пароль обязателен")
      .min(6, "Пароль должен содержать минимум 6 символов")
      .max(100, "Пароль не должен превышать 100 символов")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Пароль должен содержать минимум одну строчную букву, одну заглавную букву и одну цифру"
      ),
    confirmPassword: z
      .string()
      .min(1, "Подтверждение пароля обязательно"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Пароли не совпадают",
    path: ["confirmPassword"],
  })
  .refine((data) => data.currentPassword !== data.newPassword, {
    message: "Новый пароль должен отличаться от текущего",
    path: ["newPassword"],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

// Profile update schema
export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Имя обязательно")
    .min(2, "Имя должно содержать минимум 2 символа")
    .max(50, "Имя не должно превышать 50 символов"),
  email: z
    .string()
    .min(1, "Email обязателен")
    .email("Некорректный email"),
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^[\+]?[1-9][\d]{0,15}$/.test(val),
      "Некорректный формат телефона"
    ),
  timezone: z.string().optional(),
  language: z.string().optional(),
});

export type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;
