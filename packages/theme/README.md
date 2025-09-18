# @booking-system/theme

Пакет с дизайн-токенами и темами для системы бронирования.

## Структура

```
src/
├─ tokens/                    # Базовые токены
│  ├─ colors.ts              # Цветовая палитра
│  ├─ radius.ts              # Радиусы скругления
│  ├─ shadows.ts             # Тени
│  ├─ spacing.ts             # Отступы
│  └─ typography.ts          # Типографика
├─ presets/                  # Готовые темы
│  ├─ light.ts               # Светлая тема
│  └─ dark.ts                # Темная тема
├─ css-vars.ts               # Генерация CSS-переменных
└─ index.ts                  # Публичные экспорты
```

## Использование

### Импорт токенов

```typescript
import { colors, spacing, typography } from "@booking-system/theme";

// Использование цветов
const primaryColor = colors.primary[500];
const successColor = colors.success[500];

// Использование отступов
const padding = spacing[4]; // 1rem

// Использование типографики
const headingStyle = typography.h1;
```

### Использование тем

```typescript
import { lightTheme, darkTheme } from "@booking-system/theme";

// Получение цветов из темы
const backgroundColor = lightTheme.colors.background.primary;
const textColor = lightTheme.colors.text.primary;
```

### CSS-переменные

```typescript
import { themeCSS, cssVars } from "@booking-system/theme";

// Вставка CSS в документ
document.head.insertAdjacentHTML("beforeend", `<style>${themeCSS}</style>`);

// Использование в стилях
const styles = {
  backgroundColor: cssVars.colors.background.primary,
  color: cssVars.colors.text.primary,
  padding: cssVars.spacing("4"),
  borderRadius: cssVars.radius("md"),
};
```

## Токены

### Цвета

- **Базовые цвета**: gray, blue, green, yellow, red, purple, pink, orange
- **Семантические цвета**: primary, secondary, success, warning, error, info
- **Нейтральные цвета**: white, black, transparent, current

### Отступы

Основаны на 4px сетке: 0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10, 11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60, 64, 72, 80, 96

### Типографика

- **Шрифты**: sans, serif, mono
- **Размеры**: xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl, 7xl, 8xl, 9xl
- **Веса**: thin, extralight, light, normal, medium, semibold, bold, extrabold, black
- **Межстрочные интервалы**: none, tight, snug, normal, relaxed, loose

### Радиусы

xs (2px), sm (4px), md (6px), lg (8px), xl (12px), 2xl (16px), 3xl (24px), full (9999px)

### Тени

none, xs, sm, md, lg, xl, 2xl, inner

## Темы

### Light Theme

Светлая тема по умолчанию с белым фоном и темным текстом.

### Dark Theme

Темная тема с темным фоном и светлым текстом. Автоматически применяется при `prefers-color-scheme: dark` или `data-theme="dark"`.
