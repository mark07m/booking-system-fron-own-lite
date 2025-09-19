# Анализ фронтенд кодовой базы: Booking System

## 📁 Структура проекта

### Схематичное дерево директорий
```
frontend owner/
├── apps/
│   └── owner/                    # Основное приложение Next.js
│       ├── app/                  # App Router (Next.js 13+)
│       │   ├── (private)/        # Защищенные маршруты
│       │   └── (public)/         # Публичные маршруты
│       ├── src/
│       │   ├── app-shell/        # Компоненты оболочки приложения
│       │   ├── entities/         # Бизнес-сущности (DDD)
│       │   ├── features/         # Функциональные возможности
│       │   ├── shared/           # Общие компоненты и утилиты
│       │   └── widgets/          # Сложные UI-блоки
│       └── public/               # Статические ресурсы
├── packages/
│   ├── config/                   # Конфигурации (ESLint, Prettier, TS)
│   ├── theme/                    # Дизайн-система и токены
│   └── ui/                       # UI-библиотека компонентов
└── scripts/                      # Утилиты сборки и проверки
```

### Принципы организации кода

Проект использует **Feature-Sliced Design (FSD)** архитектуру с элементами **Domain-Driven Design (DDD)**:

- **`entities/`** - Бизнес-сущности (User, Booking, Resource)
- **`features/`** - Функциональные возможности (auth, booking management)
- **`widgets/`** - Сложные UI-блоки (Dashboard, StatsCards)
- **`shared/`** - Переиспользуемые компоненты и утилиты
- **`app-shell/`** - Компоненты оболочки приложения

## 🛠 Технологический стек

| Категория | Технология | Версия | Назначение |
|-----------|------------|--------|------------|
| **Фреймворк** | Next.js | 15.5.3 | React-фреймворк с SSR/SSG |
| **UI-библиотека** | React | 19.1.0 | Основная библиотека UI |
| **Язык** | TypeScript | ^5 | Типизированный JavaScript |
| **Стилизация** | Tailwind CSS | ^4 | Utility-first CSS фреймворк |
| **Состояние** | Zustand | ^4.4.0 | Легковесное управление состоянием |
| **Запросы** | TanStack Query | ^5.0.0 | Серверное состояние и кэширование |
| **Формы** | React Hook Form | ^7.47.0 | Управление формами |
| **Валидация** | Zod | ^3.22.0 | Схемы валидации |
| **HTTP-клиент** | Axios | ^1.6.0 | HTTP-запросы |
| **Иконки** | Heroicons | ^2.0.0 | SVG-иконки |
| **Модальные окна** | Headless UI | ^2.0.0 | Доступные компоненты |
| **Монорепозиторий** | Turbo | ^1.10.12 | Управление монорепозиторием |
| **Пакетный менеджер** | pnpm | 8.0.0 | Быстрый пакетный менеджер |

### Основные зависимости

**Production:**
- `@tanstack/react-query` - Серверное состояние
- `zustand` - Клиентское состояние
- `react-hook-form` + `@hookform/resolvers` - Формы
- `zod` - Валидация схем
- `axios` - HTTP-клиент
- `date-fns` - Работа с датами
- `clsx` + `tailwind-merge` - Утилиты для CSS

**Development:**
- `eslint` + `@typescript-eslint` - Линтинг
- `prettier` - Форматирование
- `turbo` - Сборка монорепозитория
- `husky` + `lint-staged` - Git hooks

## 🏗 Архитектура

### Компонентная архитектура

Проект использует современные React-паттерны:

```tsx
// Пример композиции компонентов
export function AppShell({ children }: AppShellProps) {
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  
  return (
    <div className="min-h-screen bg-gray-50/50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={cn("flex flex-col min-h-screen", sidebarOpen ? "lg:ml-64" : "ml-0")}>
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}
```

### Управление состоянием

**Zustand** для клиентского состояния:
```tsx
export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        isLoading: false,
        
        setUser: (user) => set({ user, isAuthenticated: !!user }),
        logout: () => set({ user: null, isAuthenticated: false }),
        checkAuth: async () => {
          // Асинхронная логика
        },
      }),
      { name: "auth-store" }
    )
  )
);
```

**TanStack Query** для серверного состояния:
```tsx
export function useBookings(filters: BookingFilters = {}) {
  return useQuery({
    queryKey: bookingKeys.list(filters),
    queryFn: () => bookingsClient.getBookings(filters),
    staleTime: 5 * 60 * 1000, // 5 минут
  });
}
```

### API-слой

Централизованное управление API с типизацией:
```tsx
export const authClient = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await apiClient.post<ApiResponse<LoginResponse>>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data.data;
  },
  // ... другие методы
};
```

### Роутинг и навигация

Используется **Next.js App Router** с группировкой маршрутов:
- `(private)/` - Защищенные маршруты с RouteGuard
- `(public)/` - Публичные маршруты (login, register)

### Обработка ошибок

Многоуровневая система обработки ошибок:
```tsx
export class ErrorBoundary extends Component<Props, State> {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Логирование в development
    if (process.env.NODE_ENV === "development") {
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
    // В production - отправка в Sentry
  }
}
```

## 🎨 UI/UX и стилизация

### Дизайн-система

Собственная дизайн-система с токенами:
```tsx
// packages/theme/src/tokens/colors.ts
export const semanticColors = {
  primary: { 50: "#eff6ff", 500: "#3b82f6", 900: "#1e3a8a" },
  success: { 50: "#f0fdf4", 500: "#22c55e", 900: "#14532d" },
  error: { 50: "#fef2f2", 500: "#ef4444", 900: "#7f1d1d" },
  // ...
};
```

### Подходы к стилизации

1. **Tailwind CSS** - Основной инструмент стилизации
2. **CSS Custom Properties** - Динамические темы
3. **Компонентные варианты** - Система вариантов UI

```tsx
// Утилита для объединения классов
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Использование в компонентах
<button className={cn(
  "inline-flex items-center justify-center rounded-md font-medium",
  variantClasses[variant],
  sizeClasses[size]
)}>
```

### Темизация

Поддержка светлой/темной темы:
```tsx
export function BookingThemeProvider({ children }: BookingThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>("system");
  
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark" : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);
}
```

### Адаптивность

Mobile-first подход с Tailwind breakpoints:
- `sm:` - 640px+
- `md:` - 768px+
- `lg:` - 1024px+
- `xl:` - 1280px+

## ✅ Качество кода

### Конфигурации линтеров

**ESLint** с TypeScript поддержкой:
```js
module.exports = {
  extends: [
    "eslint:recommended",
    "@typescript-eslint/recommended",
    "next/core-web-vitals",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
  ],
  rules: {
    "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
    "@typescript-eslint/no-explicit-any": "warn",
    "react-hooks/exhaustive-deps": "warn",
  },
};
```

**Prettier** для форматирования:
```js
module.exports = {
  semi: true,
  trailingComma: "es5",
  singleQuote: false,
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
};
```

### TypeScript типизация

Строгая типизация с общими типами:
```tsx
export interface ApiResponse<T = any> {
  data: T;
  message?: string;
  success: boolean;
  meta?: {
    requestId?: string;
    timestamp?: string;
    version?: string;
  };
}

export interface Booking extends BaseEntity {
  userId: string;
  resourceId: string;
  startDate: string;
  endDate: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  totalPrice: number;
  // ...
}
```

### Соглашения по именованию

- **Компоненты**: PascalCase (`LoginForm`, `StatsCards`)
- **Хуки**: camelCase с префиксом `use` (`useBookings`, `useBoolean`)
- **Утилиты**: camelCase (`formatCurrency`, `cn`)
- **Константы**: UPPER_SNAKE_CASE (`API_ENDPOINTS`, `USER_ROLES`)

### Документация в коде

JSDoc комментарии для сложных функций:
```tsx
/**
 * Formats currency amount according to locale
 * @param amount - The amount to format
 * @param currency - The currency code (default: RUB)
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number,
  currency: string = "RUB"
): string => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency,
  }).format(amount);
};
```

## 🔧 Ключевые компоненты

### 1. AppShell - Основная оболочка приложения

**Назначение**: Управляет общей структурой приложения, сайдбаром и навигацией.

```tsx
export function AppShell({ children }: AppShellProps) {
  const { sidebarOpen, setSidebarOpen } = useUIStore();

  return (
    <div className="min-h-screen bg-gray-50/50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className={cn("flex flex-col min-h-screen transition-all duration-300", 
        sidebarOpen ? "lg:ml-64" : "ml-0")}>
        <Topbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-hidden">
          <div className="container mx-auto px-4 py-6 lg:px-6">
            {children}
          </div>
        </main>
      </div>
      <NotificationContainer />
      <NotificationsModal />
      <QuickActionsModal />
    </div>
  );
}
```

**API**: Принимает `children` для отображения контента страницы.

### 2. Modal - Система модальных окон

**Назначение**: Универсальный компонент для модальных окон с анимациями.

```tsx
export function Modal({ id, title, children, size = "md" }: ModalProps) {
  const { modals, closeModal } = useUIStore();
  const isOpen = modals[id] || false;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => closeModal(id)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
        >
          <Dialog.Panel className={`w-full ${sizeClasses[size]} transform overflow-hidden rounded-2xl bg-white p-6`}>
            <Dialog.Title as="h3" className="text-lg font-medium text-gray-900">
              {title}
            </Dialog.Title>
            {children}
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
```

**API**: 
- `id` - Уникальный идентификатор модального окна
- `title` - Заголовок модального окна
- `size` - Размер (sm, md, lg, xl, 2xl)

### 3. StatsCards - Виджет статистики

**Назначение**: Отображает ключевые метрики на дашборде.

```tsx
export function StatsCards() {
  const { data: stats, isLoading, error } = useDashboardStats();

  const statsData = [
    {
      name: "Всего бронирований",
      value: stats?.totalBookings?.toLocaleString() || "0",
      change: stats?.bookingsGrowth ? `+${stats.bookingsGrowth}%` : "0%",
      changeType: (stats?.bookingsGrowth || 0) >= 0 ? "positive" : "negative",
      icon: CalendarDaysIcon,
    },
    // ... другие метрики
  ];

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {statsData.map((stat) => (
        <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <stat.icon className="h-6 w-6 text-gray-400" />
              <div className="ml-5 w-0 flex-1">
                <dt className="text-sm font-medium text-gray-500">{stat.name}</dt>
                <dd className="text-2xl font-semibold text-gray-900">{stat.value}</dd>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
```

**API**: Использует хук `useDashboardStats()` для получения данных.

### 4. LoginForm - Форма авторизации

**Назначение**: Форма входа с валидацией и обработкой ошибок.

```tsx
export function LoginForm() {
  const { login, isLoading, error } = useLoginMutation();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false },
  });

  const onSubmit = (data: LoginFormData) => {
    PerformanceMonitor.measureAsync("login-submit", async () => {
      await login(data);
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>
        {/* ... другие поля */}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Вход..." : "Войти"}
      </Button>
    </form>
  );
}
```

**API**: Интегрируется с `useLoginMutation()` и `zodResolver` для валидации.

### 5. RouteGuard - Защита маршрутов

**Назначение**: Контролирует доступ к защищенным маршрутам.

```tsx
export function RouteGuard({ 
  children, 
  requireAuth = true, 
  redirectTo = "/login" 
}: RouteGuardProps) {
  const { isAuthenticated, isLoading } = useAuthStore();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (isLoading) return;

      if (requireAuth && !isAuthenticated) {
        router.push(redirectTo);
        return;
      }

      if (!requireAuth && isAuthenticated) {
        router.push("/dashboard");
        return;
      }

      setIsChecking(false);
    };

    checkAuth();
  }, [isAuthenticated, isLoading, requireAuth, redirectTo, router]);

  if (isChecking || isLoading) {
    return <LoadingSpinner />;
  }

  return <>{children}</>;
}
```

**API**: 
- `requireAuth` - Требуется ли авторизация
- `redirectTo` - Куда перенаправить при отсутствии авторизации

## 📋 Паттерны и best practices

### 1. Переиспользуемые паттерны

**Custom Hooks для бизнес-логики:**
```tsx
export function useBoolean(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue(prev => !prev), []);
  
  return { value, setValue, setTrue, setFalse, toggle };
}
```

**Композиция компонентов:**
```tsx
// Высокоуровневый компонент
<PageHeader 
  title="Бронирования" 
  description="Управление бронированиями"
  actions={<Button>Добавить</Button>}
/>
```

### 2. Оптимизация производительности

**Performance Monitoring:**
```tsx
export class PerformanceMonitor {
  static measureAsync<T>(label: string, fn: () => Promise<T>): Promise<T> {
    this.startTiming(label);
    return fn().finally(() => this.endTiming(label));
  }
  
  static initWebVitals(): void {
    // LCP, FID, CLS мониторинг
  }
}
```

**Lazy Loading:**
```tsx
export function createLazyComponent<T extends React.ComponentType<any>>(
  importFn: () => Promise<{ default: T }>
) {
  return React.lazy(importFn);
}
```

### 3. Обработка асинхронных операций

**React Query с оптимистичными обновлениями:**
```tsx
export function useUpdateBooking() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => bookingsClient.updateBooking(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: bookingKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: bookingKeys.lists() });
    },
  });
}
```

### 4. Валидация данных

**Zod схемы с локализацией:**
```tsx
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
```

### 5. Локализация

**Поддержка множественных языков:**
```tsx
export const locales = ["en", "ru", "uk"] as const;
export type Locale = (typeof locales)[number];

export const localeConfig = {
  en: { name: "English", flag: "🇺🇸", direction: "ltr" },
  ru: { name: "Русский", flag: "🇷🇺", direction: "ltr" },
  uk: { name: "Українська", flag: "🇺🇦", direction: "ltr" },
} as const;
```

## 🚀 Инфраструктура разработки

### Скрипты в package.json

**Основные команды:**
```json
{
  "scripts": {
    "dev": "turbo run dev --parallel",
    "build": "turbo run build",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck",
    "quality": "npm run lint && npm run typecheck && npm run build",
    "quality:fix": "npm run lint:fix && npm run format && npm run typecheck"
  }
}
```

### Настройки среды разработки

**Turbo для монорепозитория:**
```json
{
  "pipeline": {
    "build": { "dependsOn": ["^build"], "outputs": [".next/**", "dist/**"] },
    "dev": { "cache": false, "persistent": true },
    "lint": { "dependsOn": ["^lint"] },
    "typecheck": { "dependsOn": ["^typecheck"] }
  }
}
```

### Pre-commit hooks

**Husky + lint-staged:**
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

### Качество кода

**Автоматизированная проверка:**
```js
// scripts/check-quality.js
function runCommand(command, description) {
  try {
    execSync(command, { stdio: 'pipe', encoding: 'utf8' });
    console.log(`✅ ${description} - Успешно`);
    return { success: true };
  } catch (error) {
    console.log(`❌ ${description} - Ошибка`);
    return { success: false };
  }
}
```

## 📊 Выводы и рекомендации

### Сильные стороны

1. **Современная архитектура**: Использование FSD + DDD принципов
2. **Типизация**: Строгая TypeScript типизация во всех слоях
3. **Производительность**: Оптимизации с React Query, lazy loading, performance monitoring
4. **Качество кода**: ESLint, Prettier, pre-commit hooks
5. **Масштабируемость**: Монорепозиторий с четким разделением пакетов
6. **UX**: Адаптивный дизайн, темизация, доступность
7. **Интернационализация**: Поддержка множественных языков

### Области для улучшения

1. **Тестирование**: Отсутствуют unit/integration тесты
2. **Документация**: Нужна Storybook для UI-компонентов
3. **Мониторинг**: Интеграция с Sentry для production ошибок
4. **E2E тесты**: Автоматизированное тестирование пользовательских сценариев
5. **Bundle анализ**: Мониторинг размера бандла

### Уровень сложности

**Senior-friendly** - Проект требует глубокого понимания:
- Современных React паттернов
- TypeScript и строгой типизации
- Архитектурных принципов (FSD, DDD)
- Управления состоянием (Zustand + React Query)
- Next.js App Router
- Монорепозиториев и Turbo

### Рекомендации по развитию

1. **Добавить тестирование**: Jest + React Testing Library + Playwright
2. **Настроить Storybook**: Для документации UI-компонентов
3. **Интегрировать мониторинг**: Sentry + Analytics
4. **Оптимизировать бандл**: Bundle analyzer + code splitting
5. **Добавить E2E тесты**: Playwright для критических пользовательских путей
6. **Настроить CI/CD**: GitHub Actions для автоматического деплоя

Проект демонстрирует высокий уровень архитектурной зрелости и готов к production использованию с минимальными доработками.
