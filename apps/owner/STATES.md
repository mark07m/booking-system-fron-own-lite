# Управление состояниями в приложении

## Обзор

Приложение использует два основных подхода для управления состояниями:

1. **TanStack Query** - для серверных состояний (API данные)
2. **Zustand** - для UI состояний (интерфейс, модалки, уведомления)

## TanStack Query

### Настройка

Провайдер настроен в `src/shared/providers/Providers.tsx` и подключен в `app/layout.tsx`.

```tsx
// app/layout.tsx
<Providers>
  <EnvErrorBoundary>
    <AppShell>{children}</AppShell>
  </EnvErrorBoundary>
</Providers>
```

### Конфигурация

- **staleTime**: 1 минута для запросов, 2 минуты для статистики
- **retry**: до 3 попыток для серверных ошибок, не ретраить 4xx ошибки
- **refetchOnWindowFocus**: отключено
- **refetchOnReconnect**: включено
- **DevTools**: доступны только в development режиме

### Хуки

Все хуки находятся в `src/shared/hooks/`:

- `useBookings` - управление бронированиями
- `useClients` - управление клиентами  
- `useResources` - управление ресурсами
- `useStats` - статистика дашборда

### Пример использования

```tsx
import { useBookings, useCreateBooking } from "@/src/shared/hooks/useBookings";

function BookingsList() {
  const { data, isLoading, error } = useBookings({ limit: 10 });
  const createBooking = useCreateBooking();

  const handleCreate = (data) => {
    createBooking.mutate(data, {
      onSuccess: () => {
        // Автоматически обновит список
      }
    });
  };

  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка: {error.message}</div>;

  return (
    <div>
      {data?.data.map(booking => (
        <div key={booking.id}>{booking.name}</div>
      ))}
    </div>
  );
}
```

## Zustand

### UI Store

Основной store для UI состояний: `src/shared/state/ui.store.ts`

```tsx
interface UIState {
  // Sidebar
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  
  // Modals
  modals: Record<string, boolean>;
  openModal: (modalId: string) => void;
  closeModal: (modalId: string) => void;
  closeAllModals: () => void;
  
  // Notifications
  notifications: Array<Notification>;
  addNotification: (notification) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
  
  // Loading states
  loading: Record<string, boolean>;
  setLoading: (key: string, loading: boolean) => void;
}
```

### Auth Store

Store для аутентификации: `src/shared/state/auth.store.ts`

```tsx
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}
```

**Важно**: Auth данные (токены) НЕ хранятся в Zustand. Используется localStorage + httpOnly cookies для безопасности.

### Примеры использования

#### Сайдбар

```tsx
import { useUIStore } from "@/src/shared/state/ui.store";

function SidebarToggle() {
  const { sidebarOpen, setSidebarOpen } = useUIStore();
  
  return (
    <button onClick={() => setSidebarOpen(!sidebarOpen)}>
      {sidebarOpen ? "Скрыть" : "Показать"} сайдбар
    </button>
  );
}
```

#### Модалки

```tsx
import { useUIStore } from "@/src/shared/state/ui.store";
import { Modal } from "@/src/shared/components/Modal";

function MyComponent() {
  const { openModal, closeModal } = useUIStore();
  
  return (
    <>
      <button onClick={() => openModal("my-modal")}>
        Открыть модалку
      </button>
      
      <Modal id="my-modal" title="Заголовок">
        <p>Содержимое модалки</p>
      </Modal>
    </>
  );
}
```

#### Уведомления

```tsx
import { useUIStore } from "@/src/shared/state/ui.store";

function MyComponent() {
  const { addNotification } = useUIStore();
  
  const handleSuccess = () => {
    addNotification({
      type: "success",
      title: "Успех!",
      message: "Операция выполнена успешно",
      duration: 5000 // 5 секунд
    });
  };
  
  return <button onClick={handleSuccess}>Выполнить</button>;
}
```

## Компоненты

### NotificationContainer

Автоматически отображает уведомления из UI store. Подключен в `AppShell`.

### Modal

Универсальный компонент модалки с поддержкой разных размеров:

```tsx
<Modal 
  id="unique-id" 
  title="Заголовок"
  size="lg" // sm, md, lg, xl, 2xl
  showCloseButton={true}
>
  <p>Содержимое</p>
</Modal>
```

## Лучшие практики

### TanStack Query

1. **Используйте query keys** для правильной инвалидации кэша
2. **Группируйте связанные запросы** в один хук
3. **Используйте optimistic updates** для лучшего UX
4. **Настройте правильные staleTime** в зависимости от типа данных

### Zustand

1. **Разделяйте concerns** - отдельные stores для разных доменов
2. **Используйте devtools** для отладки
3. **Не храните чувствительные данные** в Zustand
4. **Используйте селекторы** для оптимизации ререндеров

### Общие

1. **Состояние аутентификации** - только в auth store + localStorage
2. **UI состояния** - только в UI store
3. **Серверные данные** - только в TanStack Query
4. **Локальные состояния компонентов** - useState/useReducer

## Отладка

### TanStack Query DevTools

В development режиме доступны DevTools в левом нижнем углу экрана.

### Zustand DevTools

Включены в development режиме. Доступны в Redux DevTools Extension.

### Логирование

Все API запросы логируются в development режиме в консоли браузера.
