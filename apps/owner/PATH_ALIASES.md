# Алиасы путей и единый импорт

## Обзор

Проект использует систему алиасов путей для упрощения импортов и улучшения читаемости кода. Все импорты должны использовать алиасы вместо относительных путей.

## Настроенные алиасы

### В `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@app-shell/*": ["src/app-shell/*"],
      "@shared/*": ["src/shared/*"],
      "@entities/*": ["src/entities/*"],
      "@features/*": ["src/features/*"],
      "@widgets/*": ["src/widgets/*"],
      "@theme/*": ["../../packages/theme/src/*"],
      "@config/*": ["../../packages/config/*"],
      "@/*": ["src/*"]
    }
  }
}
```

## Структура алиасов

### 1. `@shared/*` - Общие компоненты и утилиты
```
@shared/ui/Button          → src/shared/ui/Button
@shared/api/auth.client    → src/shared/api/auth.client
@shared/hooks/useAuth      → src/shared/hooks/useAuth
@shared/state/auth.store   → src/shared/state/auth.store
@shared/utils/cn           → src/shared/utils/cn
```

### 2. `@features/*` - Функциональные модули
```
@features/auth             → src/features/auth
@features/booking          → src/features/booking
@features/dashboard        → src/features/dashboard
```

### 3. `@entities/*` - Бизнес-сущности
```
@entities/user             → src/entities/user
@entities/booking          → src/entities/booking
@entities/resource         → src/entities/resource
```

### 4. `@widgets/*` - Виджеты (композитные компоненты)
```
@widgets/DashboardHeader   → src/widgets/DashboardHeader
@widgets/StatsCards        → src/widgets/StatsCards
@widgets/RecentBookings    → src/widgets/RecentBookings
```

### 5. `@app-shell/*` - Компоненты оболочки приложения
```
@app-shell/AppShell        → src/app-shell/AppShell
@app-shell/Sidebar         → src/app-shell/Sidebar
@app-shell/Topbar          → src/app-shell/Topbar
```

### 6. `@theme/*` - Тема и стили
```
@theme/colors              → ../../packages/theme/src/colors
@theme/spacing             → ../../packages/theme/src/spacing
@theme/typography          → ../../packages/theme/src/typography
```

### 7. `@config/*` - Конфигурация
```
@config/eslint             → ../../packages/config/eslint
@config/prettier           → ../../packages/config/prettier
@config/typescript         → ../../packages/config/typescript
```

### 8. `@/*` - Корневая папка src
```
@/app/layout               → src/app/layout
@/app/page                 → src/app/page
@/globals.css              → src/globals.css
```

## Примеры использования

### ✅ Правильные импорты

```typescript
// UI компоненты
import { Button } from "@shared/ui/Button";
import { Input } from "@shared/ui/Input";
import { Modal } from "@shared/components/Modal";

// API клиенты
import { authClient } from "@shared/api/auth.client";
import { bookingsClient } from "@shared/api/bookings.client";

// Хуки
import { useAuth } from "@shared/hooks/useAuth";
import { useBookings } from "@shared/hooks/useBookings";

// Состояние
import { useAuthStore } from "@shared/state/auth.store";
import { useUIStore } from "@shared/state/ui.store";

// Функции
import { LoginForm } from "@features/auth";
import { BookingForm } from "@features/booking";

// Виджеты
import { DashboardHeader } from "@widgets/DashboardHeader";
import { StatsCards } from "@widgets/StatsCards";

// Оболочка приложения
import { AppShell } from "@app-shell/AppShell";
import { Sidebar } from "@app-shell/Sidebar";

// Тема
import { colors } from "@theme/colors";
import { spacing } from "@theme/spacing";

// Конфигурация
import { eslintConfig } from "@config/eslint";
```

### ❌ Неправильные импорты

```typescript
// Относительные пути (избегайте)
import { Button } from "../../shared/ui/Button";
import { useAuth } from "../../../shared/hooks/useAuth";

// Старые пути с @/src/ (устарели)
import { Button } from "@/src/shared/ui/Button";
import { useAuth } from "@/src/shared/hooks/useAuth";
```

## Преимущества алиасов

### 1. **Читаемость кода**
- Короткие и понятные пути
- Нет сложных относительных путей
- Легко понять структуру проекта

### 2. **Упрощение рефакторинга**
- Перемещение файлов не ломает импорты
- Легко переименовывать папки
- Простое изменение структуры проекта

### 3. **Консистентность**
- Единый стиль импортов во всем проекте
- Легко найти все зависимости
- Автоматическое обновление в IDE

### 4. **Производительность**
- TypeScript быстрее разрешает пути
- Лучшая поддержка автодополнения
- Оптимизация сборки

## Автоматическое обновление импортов

### Скрипт обновления

Создан скрипт `scripts/update-imports.js` для автоматического обновления импортов:

```bash
# Запуск скрипта обновления
node scripts/update-imports.js
```

### Ручное обновление

Для обновления конкретных файлов:

```bash
# Обновить все файлы в src/
find src -name "*.ts" -o -name "*.tsx" | xargs sed -i '' 's|@/src/|@/|g'

# Обновить все файлы в app/
find app -name "*.ts" -o -name "*.tsx" | xargs sed -i '' 's|@/src/|@/|g'
```

## Настройка IDE

### VS Code

Добавьте в `.vscode/settings.json`:

```json
{
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "typescript.suggest.autoImports": true,
  "typescript.preferences.importModuleSpecifier": "non-relative"
}
```

### WebStorm

1. Откройте `File → Settings → Languages & Frameworks → TypeScript`
2. Включите `Use TypeScript service`
3. Добавьте алиасы в `Path mapping`

## Проверка алиасов

### TypeScript проверка

```bash
# Проверка типов
npm run typecheck

# Или через npx
npx tsc --noEmit
```

### Поиск старых импортов

```bash
# Найти все старые импорты
grep -r "@/src/" . --include="*.ts" --include="*.tsx"

# Найти относительные импорты (которые можно заменить)
grep -r "from \"\.\./\.\." . --include="*.ts" --include="*.tsx"
```

## Миграция

### Этапы миграции

1. **Настройка алиасов** в `tsconfig.json`
2. **Обновление импортов** через скрипт
3. **Проверка типов** и исправление ошибок
4. **Тестирование** функциональности
5. **Обновление документации**

### Контрольный список

- [ ] Алиасы настроены в `tsconfig.json`
- [ ] Все импорты обновлены на алиасы
- [ ] TypeScript компилируется без ошибок
- [ ] Приложение запускается корректно
- [ ] IDE поддерживает автодополнение
- [ ] Документация обновлена

## Лучшие практики

### 1. **Используйте алиасы везде**
- Никогда не используйте относительные пути
- Всегда импортируйте через алиасы

### 2. **Группируйте импорты**
```typescript
// 1. Внешние библиотеки
import React from "react";
import { useRouter } from "next/navigation";

// 2. Внутренние модули (по алиасам)
import { Button } from "@shared/ui/Button";
import { useAuth } from "@shared/hooks/useAuth";
import { LoginForm } from "@features/auth";

// 3. Относительные импорты (только для локальных файлов)
import { localHelper } from "./helpers";
```

### 3. **Следите за циклическими зависимостями**
- Избегайте импортов между модулями одного уровня
- Используйте общие интерфейсы в `@shared/types`

### 4. **Обновляйте импорты при рефакторинге**
- При перемещении файлов обновляйте импорты
- Используйте IDE для автоматического обновления
- Запускайте скрипт обновления после больших изменений

## Заключение

Система алиасов путей значительно упрощает работу с проектом, делает код более читаемым и облегчает рефакторинг. Все новые файлы должны использовать алиасы с самого начала.
