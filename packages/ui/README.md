# UI Library

Современная библиотека UI компонентов для системы бронирования, основанная на Tailwind CSS и TypeScript.

## Компоненты

### Базовые компоненты

#### Button
Кнопка с различными вариантами и размерами.

```tsx
import { Button } from "@ui";

<Button variant="primary" size="md" loading={false}>
  Нажми меня
</Button>
```

**Props:**
- `variant`: "primary" | "secondary" | "ghost" | "danger"
- `size`: "sm" | "md" | "lg"
- `loading`: boolean
- `disabled`: boolean
- `type`: "button" | "submit"

#### Badge
Бейдж для отображения статусов и меток.

```tsx
import { Badge } from "@ui";

<Badge tone="success">Активно</Badge>
```

**Props:**
- `tone`: "neutral" | "success" | "warning" | "danger" | "info"

#### Card
Карточка для группировки контента.

```tsx
import { Card } from "@ui";

<Card className="p-4">
  <h3>Заголовок</h3>
  <p>Содержимое карточки</p>
</Card>
```

### Формы

#### Input
Поле ввода с поддержкой лейблов и подсказок.

```tsx
import { Input } from "@ui";

<Input 
  label="Email" 
  placeholder="Введите email"
  hint="Мы не передаем данные третьим лицам"
  error="Неверный формат email"
/>
```

#### Textarea
Многострочное поле ввода.

```tsx
import { Textarea } from "@ui";

<Textarea 
  label="Описание"
  placeholder="Введите описание"
  rows={4}
/>
```

#### Select
Выпадающий список.

```tsx
import { Select } from "@ui";

<Select
  label="Статус"
  options={[
    { label: "Активно", value: "active" },
    { label: "Неактивно", value: "inactive" }
  ]}
/>
```

#### Switch
Переключатель.

```tsx
import { Switch } from "@ui";

<Switch 
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Включить уведомления"
/>
```

### Модальные окна

#### Modal
Модальное окно.

```tsx
import { Modal } from "@ui";

<Modal
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Подтверждение"
  size="md"
  footer={
    <Button onClick={handleConfirm}>Подтвердить</Button>
  }
>
  <p>Вы уверены, что хотите удалить этот элемент?</p>
</Modal>
```

#### Drawer
Выдвижная панель.

```tsx
import { Drawer } from "@ui";

<Drawer
  open={isOpen}
  onClose={() => setIsOpen(false)}
  title="Фильтры"
  side="right"
>
  <div>Содержимое панели</div>
</Drawer>
```

### Навигация

#### Tabs
Вкладки.

```tsx
import { Tabs } from "@ui";

<Tabs
  items={[
    { key: "tab1", label: "Первая вкладка" },
    { key: "tab2", label: "Вторая вкладка" }
  ]}
  value={activeTab}
  onChange={setActiveTab}
/>
```

#### Breadcrumbs
Хлебные крошки.

```tsx
import { Breadcrumbs } from "@ui";

<Breadcrumbs
  items={[
    { label: "Главная", href: "/" },
    { label: "Настройки", current: true }
  ]}
/>
```

### Таблицы

#### Table
Таблица с поддержкой пагинации.

```tsx
import { Table } from "@ui";

<Table
  columns={[
    { key: "name", header: "Имя" },
    { key: "email", header: "Email" },
    { key: "status", header: "Статус", render: (value) => <StatusBadge status={value} /> }
  ]}
  rows={data}
  rowKey={(row) => row.id}
/>
```

### Уведомления

#### Toast
Всплывающие уведомления.

```tsx
import { Toast } from "@ui";

<Toast
  open={showToast}
  message="Операция выполнена успешно"
  onClose={() => setShowToast(false)}
  duration={3000}
/>
```

### Специальные компоненты

#### StatusBadge
Бейдж статуса с предустановленными стилями.

```tsx
import { StatusBadge } from "@ui";

<StatusBadge status="confirmed" />
```

#### CalendarGrid
Сетка временных слотов для календаря.

```tsx
import { CalendarGrid } from "@ui";

<CalendarGrid
  slots={timeSlots}
  selectedSlot={selectedSlot}
  onSlotSelect={setSelectedSlot}
/>
```

#### Section
Секция с заголовком и контентом.

```tsx
import { Section } from "@ui";

<Section title="Настройки" subtitle="Управление параметрами системы">
  <div>Содержимое секции</div>
</Section>
```

## Хуки

### usePagination
Хук для пагинации данных.

```tsx
import { usePagination } from "@ui";

const { data, page, pages, setPage, total } = usePagination(items, 10);
```

## Утилиты

### cn
Утилита для объединения CSS классов.

```tsx
import { cn } from "@ui";

<div className={cn("base-class", condition && "conditional-class")} />
```

## Использование

Все компоненты экспортируются из главного индекса:

```tsx
import { 
  Button, 
  Input, 
  Modal, 
  Table,
  usePagination 
} from "@ui";
```

## Стилизация

Компоненты используют Tailwind CSS классы и следуют дизайн-системе проекта. Все компоненты поддерживают кастомизацию через пропс `className`.

## TypeScript

Все компоненты полностью типизированы и поддерживают автодополнение в IDE.
