# Формы и валидация

## Обзор

Проект использует **React Hook Form** + **Zod** для создания мощных, производительных форм с валидацией на клиенте и сервере.

## Архитектура

### 1. Схемы валидации (`features/auth/model/auth.schemas.ts`)

Централизованные Zod-схемы для всех форм аутентификации:

```typescript
// Схемы валидации
export const loginSchema = z.object({...});
export const registerSchema = z.object({...});
export const forgotPasswordSchema = z.object({...});
export const resetPasswordSchema = z.object({...});
export const changePasswordSchema = z.object({...});
export const updateProfileSchema = z.object({...});

// TypeScript типы
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
// ... и т.д.
```

### 2. Хуки мутаций

Каждая форма имеет соответствующий хук для API-взаимодействия:

- `useLoginMutation` - вход в систему
- `useRegisterMutation` - регистрация
- `useForgotPasswordMutation` - восстановление пароля
- `useResetPasswordMutation` - сброс пароля
- `useChangePasswordMutation` - смена пароля

### 3. UI компоненты форм

Все формы используют единообразный подход:

```typescript
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: {...},
});
```

## Особенности валидации

### 1. Пароли
- Минимум 6 символов
- Максимум 100 символов
- Должен содержать: строчную букву, заглавную букву, цифру
- Подтверждение пароля должно совпадать

### 2. Email
- Обязательное поле
- Валидный формат email
- Уникальность проверяется на сервере

### 3. Телефон
- Необязательное поле
- Валидный международный формат
- Регулярное выражение: `/^[\+]?[1-9][\d]{0,15}$/`

### 4. Имя пользователя
- Минимум 2 символа
- Максимум 50 символов
- Обязательное поле

## Использование

### Базовая форма

```typescript
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../model/auth.schemas";

export function MyForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    // Обработка данных
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("email")} />
      {errors.email && <span>{errors.email.message}</span>}
      
      <button type="submit">Отправить</button>
    </form>
  );
}
```

### С мутацией

```typescript
import { useLoginMutation } from "../model/useLoginMutation";

export function LoginForm() {
  const { login, isLoading, error } = useLoginMutation();
  
  const onSubmit = (data: LoginFormData) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Поля формы */}
      <button disabled={isLoading}>
        {isLoading ? "Загрузка..." : "Войти"}
      </button>
    </form>
  );
}
```

## Доступные формы

### 1. LoginForm
- Email и пароль
- Чекбокс "Запомнить меня"
- Валидация в реальном времени

### 2. RegisterForm
- Имя, email, пароль, подтверждение пароля
- Телефон (необязательно)
- Автоматический вход после регистрации

### 3. ForgotPasswordForm
- Email для восстановления
- Показ успешного состояния

### 4. ResetPasswordForm
- Новый пароль и подтверждение
- Токен из URL параметров

### 5. ChangePasswordForm
- Текущий пароль, новый пароль, подтверждение
- Для авторизованных пользователей

## Интеграция с API

Все формы интегрированы с `auth.client.ts`:

```typescript
// Пример мутации
const loginMutation = useMutation({
  mutationFn: (credentials: LoginRequest) => authClient.login(credentials),
  onSuccess: (response) => {
    // Обработка успеха
    authClient.storeAuthData(response);
    setUser(response.user);
    router.push("/dashboard");
  },
  onError: (error) => {
    // Обработка ошибки
    addNotification({
      type: "error",
      title: "Ошибка входа",
      message: error.message,
    });
  },
});
```

## Уведомления

Все формы интегрированы с системой уведомлений:

- Успешные операции показывают зеленые уведомления
- Ошибки показывают красные уведомления
- Автоматическое скрытие через время

## Производительность

- **React Hook Form** обеспечивает минимальные ре-рендеры
- Валидация происходит только при изменении полей
- Debounced валидация для лучшего UX
- Оптимизированные мутации с React Query

## Безопасность

- Валидация на клиенте для UX
- Валидация на сервере для безопасности
- Защита от CSRF атак
- Безопасное хранение токенов
- Автоматическое обновление токенов

## Расширение

Для добавления новой формы:

1. Создайте схему в `auth.schemas.ts`
2. Создайте хук мутации
3. Создайте UI компонент
4. Добавьте экспорт в `index.ts`

```typescript
// 1. Схема
export const newFormSchema = z.object({...});

// 2. Хук
export function useNewFormMutation() {
  return useMutation({...});
}

// 3. Компонент
export function NewForm() {
  // Реализация формы
}
```
