# Layout и каркас приложения

## Обзор архитектуры

Приложение использует современную архитектуру layout с четким разделением ответственности между компонентами.

## Структура файлов

```
app/
├── layout.tsx                 # Главный layout с метаданными и провайдерами
├── globals.css               # Глобальные стили и CSS переменные
└── (private)/
    └── dashboard/
        └── page.tsx          # Страницы приложения

src/app-shell/
├── AppShell.tsx              # Основной каркас приложения
├── Sidebar.tsx               # Боковое меню навигации
└── Topbar.tsx                # Верхняя панель с поиском и профилем

src/shared/components/
├── PageHeader.tsx            # Заголовок страницы с хлебными крошками
├── Breadcrumbs.tsx           # Навигационные хлебные крошки
├── NotificationsModal.tsx    # Модалка уведомлений
├── QuickActionsModal.tsx     # Модалка быстрых действий
└── NotificationContainer.tsx # Контейнер для уведомлений
```

## app/layout.tsx

### Основные функции:
- **Метаданные**: SEO, Open Graph, Twitter Cards
- **Шрифты**: Inter с поддержкой кириллицы
- **Провайдеры**: TanStack Query, Error Boundary
- **Viewport**: Адаптивная настройка

### Ключевые особенности:
```tsx
// Расширенные метаданные
export const metadata: Metadata = {
  title: {
    default: "Booking System - Owner",
    template: "%s | Booking System"
  },
  // ... SEO оптимизация
};

// Viewport настройки
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
};
```

## src/app-shell/AppShell.tsx

### Архитектура:
- **Flexbox Layout**: Вертикальная компоновка
- **Responsive Design**: Адаптивность для мобильных устройств
- **State Management**: Интеграция с Zustand UI store
- **Overlay System**: Мобильные оверлеи

### Ключевые особенности:
```tsx
// Адаптивное поведение
useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 1024) {
      // Desktop: сохраняем состояние сайдбара
      return;
    } else {
      // Mobile: закрываем сайдбар
      setSidebarOpen(false);
    }
  };
  // ...
}, [setSidebarOpen]);

// Структура layout
<div className="min-h-screen bg-gray-50/50">
  <Sidebar />
  <div className="flex flex-col min-h-screen">
    <Topbar />
    <main className="flex-1 overflow-hidden">
      <div className="container mx-auto px-4 py-6">
        {children}
      </div>
    </main>
  </div>
  <NotificationContainer />
  <Modals />
</div>
```

## src/app-shell/Sidebar.tsx

### Функциональность:
- **Навигация**: Основное и вторичное меню
- **Active States**: Подсветка текущей страницы
- **User Profile**: Информация о пользователе
- **Responsive**: Скрытие на мобильных устройствах

### Структура меню:
```tsx
const navigation = [
  { 
    name: "Дашборд", 
    href: "/dashboard", 
    icon: HomeIcon,
    description: "Обзор системы"
  },
  // ... другие пункты
];

const secondaryNavigation = [
  { 
    name: "Уведомления", 
    href: "/notifications", 
    icon: BellIcon,
    count: 3 // Badge с количеством
  },
  // ... другие пункты
];
```

### Адаптивность:
- **Desktop (lg+)**: Постоянно видимый сайдбар
- **Mobile (<lg)**: Скрываемый сайдбар с оверлеем
- **Auto-close**: Автоматическое закрытие после навигации на мобильных

## src/app-shell/Topbar.tsx

### Компоненты:
- **Page Title**: Динамический заголовок страницы
- **Search**: Глобальный поиск
- **Notifications**: Уведомления с счетчиком
- **Quick Actions**: Быстрые действия
- **User Profile**: Выпадающее меню профиля

### Функциональность:
```tsx
// Динамический заголовок страницы
const getPageTitle = () => {
  const segments = pathname.split('/').filter(Boolean);
  const titles: Record<string, string> = {
    dashboard: "Дашборд",
    bookings: "Бронирования",
    // ...
  };
  return titles[segments[0]] || "Страница";
};

// Счетчик уведомлений
const unreadNotifications = notifications.filter(n => !n.readAt).length;
```

## Компоненты

### PageHeader
Универсальный заголовок страницы с поддержкой:
- Хлебных крошек
- Описания страницы
- Действий (кнопки, меню)

```tsx
<PageHeader
  title="Дашборд"
  description="Обзор системы бронирования"
  actions={<Button>Действие</Button>}
/>
```

### Breadcrumbs
Автоматическая генерация навигационных крошек:
- Из URL pathname
- С поддержкой кастомных элементов
- Адаптивный дизайн

### Modals
Система модальных окон:
- **NotificationsModal**: Управление уведомлениями
- **QuickActionsModal**: Быстрые действия
- **Modal**: Базовый компонент модалки

## Адаптивный дизайн

### Breakpoints:
- **sm**: 640px
- **md**: 768px  
- **lg**: 1024px
- **xl**: 1280px
- **2xl**: 1536px

### Поведение компонентов:

#### Sidebar:
- **< lg**: Скрываемый с оверлеем
- **≥ lg**: Постоянно видимый

#### Topbar:
- **< sm**: Упрощенный интерфейс
- **≥ sm**: Полный функционал

#### Search:
- **< lg**: Скрыт, доступен через кнопку
- **≥ lg**: Постоянно видимый

## CSS переменные

### Цвета:
```css
:root {
  --color-primary-50: #f0f9ff;
  --color-primary-500: #0ea5e9;
  --color-primary-900: #0c4a6e;
  /* ... другие цвета */
}
```

### Spacing:
```css
:root {
  --spacing-1: 0.25rem;
  --spacing-4: 1rem;
  --spacing-6: 1.5rem;
  /* ... другие отступы */
}
```

### Typography:
```css
:root {
  --font-family-sans: "Inter", system-ui, sans-serif;
  --font-family-mono: "JetBrains Mono", Consolas, monospace;
}
```

## Лучшие практики

### Layout:
1. **Используйте PageHeader** для заголовков страниц
2. **Добавляйте breadcrumbs** для навигации
3. **Группируйте действия** в правой части заголовка
4. **Используйте контейнеры** для ограничения ширины контента

### Responsive:
1. **Mobile-first** подход
2. **Progressive enhancement** для больших экранов
3. **Touch-friendly** интерфейс на мобильных
4. **Keyboard navigation** поддержка

### Performance:
1. **Lazy loading** для модалок
2. **Optimized images** и иконки
3. **Minimal re-renders** через правильное состояние
4. **Efficient CSS** с Tailwind

## Интеграция с состоянием

### UI Store:
```tsx
const { 
  sidebarOpen, 
  setSidebarOpen,
  modals,
  openModal,
  closeModal,
  notifications 
} = useUIStore();
```

### Auth Store:
```tsx
const { user, isAuthenticated } = useAuthStore();
```

## Доступность (A11y)

- **ARIA labels** для всех интерактивных элементов
- **Keyboard navigation** поддержка
- **Screen reader** совместимость
- **Focus management** в модалках
- **Color contrast** соответствие стандартам

## Тестирование

### Компоненты для тестирования:
- Layout responsiveness
- Navigation functionality  
- Modal behavior
- Search functionality
- User interactions

### Тестовые сценарии:
- Mobile/desktop переключение
- Sidebar открытие/закрытие
- Modal открытие/закрытие
- Navigation между страницами
- Search functionality
