# Маршрутизация и разделение публичного/приватного

## Обзор архитектуры

Приложение использует Next.js App Router с четким разделением на публичные и приватные маршруты через группы маршрутов.

## Структура маршрутов

```
app/
├── layout.tsx                    # Главный layout
├── page.tsx                      # Главная страница (редирект)
├── not-found.tsx                 # 404 страница
├── error.tsx                     # Страница ошибок
├── template.tsx                  # Шаблон для анимаций
├── middleware.ts                 # Middleware для проверки сессии
├── (public)/                     # Публичные маршруты
│   ├── layout.tsx               # Layout для публичных страниц
│   ├── login/
│   │   ├── page.tsx
│   │   └── _components/
│   │       └── LoginForm.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── forgot-password/
│   │   └── page.tsx
│   └── reset-password/
│       └── page.tsx
└── (private)/                    # Приватные маршруты
    ├── layout.tsx               # Layout для приватных страниц
    ├── dashboard/
    │   ├── page.tsx
    │   └── _components/
    │       └── DashboardFilters.tsx
    ├── bookings/
    │   └── page.tsx
    ├── clients/
    │   └── page.tsx
    ├── resources/
    │   └── page.tsx
    ├── analytics/
    │   └── page.tsx
    └── settings/
        └── page.tsx
```

## Группы маршрутов

### (public) - Публичные маршруты

Доступны без аутентификации:

- `/login` - Страница входа
- `/register` - Страница регистрации  
- `/forgot-password` - Восстановление пароля
- `/reset-password` - Сброс пароля

**Layout особенности:**
- Простой layout без AppShell
- Редирект авторизованных пользователей на dashboard
- Минимальный дизайн для форм

### (private) - Приватные маршруты

Требуют аутентификации:

- `/dashboard` - Главная панель
- `/bookings` - Управление бронированиями
- `/clients` - Управление клиентами
- `/resources` - Управление ресурсами
- `/analytics` - Аналитика и отчеты
- `/settings` - Настройки системы

**Layout особенности:**
- Полный AppShell с навигацией
- Проверка аутентификации
- Редирект неавторизованных на login

## Middleware

### Файл: `middleware.ts`

Обрабатывает аутентификацию на уровне сервера:

```typescript
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Определяем тип маршрута
  const isPublicRoute = publicRoutes.some(route => 
    pathname.startsWith(route)
  );
  const isProtectedRoute = protectedRoutes.some(route => 
    pathname.startsWith(route)
  );

  // Проверяем токен аутентификации
  const authToken = request.cookies.get("auth_token")?.value;
  const isAuthenticated = !!authToken;

  // Логика редиректов
  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect("/login");
  }

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect("/dashboard");
  }
}
```

### Конфигурация matcher:

```typescript
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
```

## Компоненты защиты

### RouteGuard

Универсальный компонент для защиты маршрутов:

```tsx
<RouteGuard requireAuth={true} redirectTo="/login">
  <ProtectedContent />
</RouteGuard>
```

**Параметры:**
- `requireAuth` - требует ли аутентификации (по умолчанию true)
- `redirectTo` - куда редиректить при отсутствии аутентификации

### AuthRedirect

Обрабатывает редиректы после аутентификации:

```tsx
<AuthRedirect>
  <LoginForm />
</AuthRedirect>
```

**Функциональность:**
- Читает `redirect` параметр из URL
- Редиректит на нужную страницу после входа
- Fallback на dashboard если параметр отсутствует

## Layout компоненты

### Публичный Layout

```tsx
// app/(public)/layout.tsx
export default function PublicLayout({ children }) {
  const { requireGuest } = useAuth();
  
  useEffect(() => {
    if (requireGuest()) {
      router.push("/dashboard");
    }
  }, [requireGuest, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}
```

**Особенности:**
- Простой дизайн без навигации
- Редирект авторизованных пользователей
- Минимальные стили

### Приватный Layout

```tsx
// app/(private)/layout.tsx
export default function PrivateLayout({ children }) {
  const { isAuthenticated, isLoading } = useAuthStore();
  
  // Проверка аутентификации
  if (isChecking || isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return null;
  }

  return <>{children}</>;
}
```

**Особенности:**
- Полная проверка аутентификации
- Loading состояние
- Интеграция с AppShell

## Формы аутентификации

### LoginForm

```tsx
// src/features/auth/ui/LoginForm.tsx
export function LoginForm() {
  const { login, isLoading, error } = useLoginMutation();
  
  const onSubmit = (data) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Поля формы */}
    </form>
  );
}
```

### RegisterForm

```tsx
// src/features/auth/ui/RegisterForm.tsx
export function RegisterForm() {
  const { login } = useLoginMutation();
  
  const onSubmit = async (data) => {
    // Регистрация + автоматический вход
    await register(data);
    await login(data);
  };
}
```

### ForgotPasswordForm

```tsx
// src/features/auth/ui/ForgotPasswordForm.tsx
export function ForgotPasswordForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Показывает успешное состояние после отправки
}
```

## Редиректы

### Главная страница

```tsx
// app/page.tsx
export default function HomePage() {
  const cookieStore = cookies();
  const authToken = cookieStore.get("auth_token")?.value;
  
  if (authToken) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
```

### После входа

```tsx
// В LoginForm
const onSubmit = async (data) => {
  await login(data);
  // Автоматический редирект через useLoginMutation
};
```

### После выхода

```tsx
// В useLoginMutation
const logoutMutation = useMutation({
  mutationFn: () => authClient.logout(),
  onSuccess: () => {
    router.push("/login");
  },
});
```

## Обработка ошибок

### 404 страница

```tsx
// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-200">404</h1>
        <h2 className="text-2xl font-semibold">Страница не найдена</h2>
        <Button asChild>
          <Link href="/dashboard">На главную</Link>
        </Button>
      </div>
    </div>
  );
}
```

### Error страница

```tsx
// app/error.tsx
export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Что-то пошло не так</h1>
        <Button onClick={reset}>Попробовать снова</Button>
      </div>
    </div>
  );
}
```

## Безопасность

### Защита маршрутов

1. **Middleware** - проверка на уровне сервера
2. **Layout Guards** - проверка в компонентах
3. **Route Guards** - универсальная защита
4. **API Protection** - проверка токенов в запросах

### Токены

- **httpOnly cookies** - для безопасности
- **localStorage** - для клиентского состояния
- **Refresh tokens** - для обновления сессии

### Редиректы

- **Автоматические** - через middleware
- **Программные** - через useRouter
- **Сохранение URL** - через query параметры

## Лучшие практики

### Структура маршрутов

1. **Группировка** - используйте (public) и (private)
2. **Вложенность** - логическая иерархия страниц
3. **Именование** - понятные и консистентные имена

### Защита

1. **Множественные проверки** - middleware + компоненты
2. **Loading состояния** - показывайте процесс проверки
3. **Graceful fallbacks** - обрабатывайте ошибки

### UX

1. **Сохранение URL** - редирект после входа
2. **Loading индикаторы** - показывайте процесс
3. **Обратная связь** - сообщения об ошибках

## Тестирование

### Тестовые сценарии

1. **Неавторизованный доступ** к приватным маршрутам
2. **Авторизованный доступ** к публичным маршрутам
3. **Редиректы** после входа/выхода
4. **Обработка ошибок** аутентификации
5. **Middleware** поведение

### Компоненты для тестирования

- RouteGuard
- AuthRedirect
- LoginForm
- RegisterForm
- Middleware logic
