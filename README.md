# Booking System Monorepo

Монорепозиторий для системы бронирования с использованием Next.js, TypeScript и pnpm.

## Структура проекта

```
/
├─ apps/
│  └─ owner/                 # Основное Next.js приложение (App Router)
├─ packages/
│  ├─ config/                # Общие конфиги (tsconfig/eslint/prettier)
│  └─ theme/                 # Дизайн-токены и темы
├─ .github/
│  └─ workflows/             # CI (линт, тайпчек, сборка, тесты)
├─ .env.example              # Пример необходимых env-переменных
├─ pnpm-workspace.yaml       # Workspace-описание пакетов
├─ turbo.json                # Настройки Turborepo pipeline
└─ package.json              # Скрипты верхнего уровня
```

## Установка

1. Установите pnpm:
```bash
npm install -g pnpm
```

2. Установите зависимости:
```bash
pnpm install
```

## Разработка

Запуск всех приложений в режиме разработки:
```bash
pnpm dev
```

Запуск конкретного приложения:
```bash
pnpm --filter owner dev
```

## Сборка

Сборка всех приложений:
```bash
pnpm build
```

## Линтинг и проверка типов

```bash
pnpm lint
pnpm typecheck
```

## Тестирование

```bash
pnpm test
```

## Переменные окружения

Скопируйте `.env.example` в `.env.local` и заполните необходимые переменные:

```bash
cp .env.example .env.local
```

## Пакеты

### @booking-system/config
Общие конфигурации для ESLint, TypeScript и Prettier.

### @booking-system/theme
Дизайн-токены и темы для приложений.

## CI/CD

Проект использует GitHub Actions для автоматической проверки кода, сборки и тестирования при каждом push и pull request.
