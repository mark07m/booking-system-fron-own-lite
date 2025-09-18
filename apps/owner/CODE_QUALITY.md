# Качество кода и форматирование

## Обзор

Проект использует комплексную систему обеспечения качества кода, включающую ESLint, Prettier, Commitlint, Husky и CI/CD процессы.

## 🛠️ Инструменты качества кода

### 1. ESLint - Линтинг кода

**Конфигурация:** `eslint.config.mjs`

**Особенности:**
- Работает только с JavaScript файлами (`.js`, `.jsx`)
- TypeScript файлы игнорируются (используется TypeScript компилятор для проверки типов)
- Строгие правила для качества кода
- Автоматическое исправление ошибок

**Основные правила:**
```javascript
{
  "no-console": "warn",           // Предупреждение о console.log
  "no-debugger": "error",         // Ошибка при debugger
  "no-unused-vars": "warn",       // Предупреждение о неиспользуемых переменных
  "prefer-const": "error",        // Требует const вместо let
  "no-var": "error",              // Запрещает var
  "object-shorthand": "error",    // Требует сокращенный синтаксис объектов
  "prefer-template": "error",     // Требует template literals
  "no-duplicate-imports": "error", // Запрещает дублирующиеся импорты
  "semi": ["error", "always"],    // Требует точку с запятой
  "quotes": ["error", "double"],  // Требует двойные кавычки
  "indent": ["error", 2],         // Отступы 2 пробела
  "no-trailing-spaces": "error",  // Запрещает пробелы в конце строк
  "eol-last": "error"             // Требует пустую строку в конце файла
}
```

### 2. Prettier - Форматирование кода

**Конфигурация:** `.prettierrc`

**Настройки:**
```json
{
  "semi": true,                    // Точки с запятой
  "trailingComma": "es5",          // Запятые в конце (ES5 совместимость)
  "singleQuote": false,            // Двойные кавычки
  "printWidth": 80,                // Максимальная длина строки
  "tabWidth": 2,                   // Размер отступа
  "useTabs": false,                // Пробелы вместо табов
  "endOfLine": "lf",               // Unix окончания строк
  "bracketSpacing": true,          // Пробелы в объектах
  "bracketSameLine": false,        // Скобки на новой строке
  "arrowParens": "avoid",          // Скобки в стрелочных функциях
  "jsxSingleQuote": false,         // Двойные кавычки в JSX
  "quoteProps": "as-needed",       // Кавычки в свойствах объектов
  "proseWrap": "preserve",         // Сохранение переносов в markdown
  "htmlWhitespaceSensitivity": "css", // HTML пробелы
  "embeddedLanguageFormatting": "auto" // Форматирование встроенных языков
}
```

### 3. Commitlint - Конвенция коммитов

**Конфигурация:** `../../packages/config/commitlint`

**Типы коммитов:**
- `feat:` - новая функциональность
- `fix:` - исправление бага
- `docs:` - изменения в документации
- `style:` - форматирование кода
- `refactor:` - рефакторинг
- `perf:` - улучшение производительности
- `test:` - добавление тестов
- `build:` - изменения в системе сборки
- `ci:` - изменения в CI/CD
- `chore:` - обновление задач, конфигурации
- `revert:` - откат изменений

**Области (scope):**
- `app` - изменения в приложениях
- `pkg` - изменения в пакетах
- `config` - изменения в конфигурации
- `deps` - обновление зависимостей
- `ci` - изменения в CI/CD
- `docs` - документация
- `test` - тесты

**Примеры правильных коммитов:**
```
feat(auth): add login form validation
fix(api): resolve user data fetching issue
docs(readme): update installation instructions
chore(deps): update react to v19
```

### 4. Husky - Git хуки

**Настроенные хуки:**

**Pre-commit:**
```bash
npm run lint:fix && npm run format
```
- Автоматически исправляет ошибки линтера
- Форматирует код с помощью Prettier

**Commit-msg:**
```bash
npx --no -- commitlint --edit $1
```
- Проверяет сообщения коммитов на соответствие конвенции

### 5. CI/CD - GitHub Actions

**Workflow файлы:**
- `.github/workflows/quality.yml` - Проверка качества кода
- `.github/workflows/security.yml` - Проверка безопасности

**Процесс CI:**
1. **Установка зависимостей** - `pnpm install --frozen-lockfile`
2. **Линтинг** - `pnpm run lint`
3. **Проверка форматирования** - `pnpm run format:check`
4. **Проверка типов** - `pnpm run typecheck`
5. **Сборка** - `pnpm run build`
6. **Проверка безопасности** - `pnpm audit`

## 📋 Скрипты качества кода

### Основные команды

```bash
# Линтинг
npm run lint              # Проверка кода
npm run lint:fix          # Автоматическое исправление

# Форматирование
npm run format            # Форматирование кода
npm run format:check      # Проверка форматирования

# Проверка типов
npm run typecheck         # TypeScript проверка

# Комплексные проверки
npm run quality           # Линт + тайпчек + билд
npm run quality:fix       # Исправление + форматирование + тайпчек
npm run quality:check     # Полная проверка с отчетом
npm run quality:check:fix # Полная проверка с автоисправлением
```

### Локальная проверка

```bash
# Запуск полной проверки
node scripts/check-quality.js

# Автоматическое исправление
node scripts/check-quality.js --fix

# Справка
node scripts/check-quality.js --help
```

## 🎯 Правила и стандарты

### 1. Структура импортов

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

### 2. Именование

**Файлы:**
- Компоненты: `PascalCase.tsx` (Button.tsx, LoginForm.tsx)
- Хуки: `camelCase.ts` (useAuth.ts, useBookings.ts)
- Утилиты: `camelCase.ts` (apiError.ts, formatters.ts)
- Типы: `camelCase.types.ts` (user.types.ts, api.types.ts)

**Переменные и функции:**
- `camelCase` для переменных и функций
- `PascalCase` для компонентов и классов
- `UPPER_CASE` для констант
- `_` префикс для неиспользуемых переменных

### 3. TypeScript

**Строгая типизация:**
- Все функции должны иметь типы параметров и возвращаемых значений
- Использование `interface` для объектов
- Избегание `any` типа
- Использование `unknown` вместо `any` при необходимости

**Примеры:**
```typescript
// ✅ Правильно
interface User {
  id: string;
  name: string;
  email: string;
}

function getUser(id: string): Promise<User> {
  // implementation
}

// ❌ Неправильно
function getUser(id: any): any {
  // implementation
}
```

### 4. React компоненты

**Функциональные компоненты:**
```typescript
interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export function Button({ children, onClick, disabled = false }: ButtonProps) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
```

**Хуки:**
```typescript
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  
  const login = useCallback((credentials: LoginRequest) => {
    // implementation
  }, []);
  
  return { user, login };
}
```

## 🔧 Настройка IDE

### VS Code

**Рекомендуемые расширения:**
- ESLint
- Prettier
- TypeScript Importer
- Auto Rename Tag
- Bracket Pair Colorizer

**Настройки (.vscode/settings.json):**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "eslint.validate": ["javascript", "javascriptreact"],
  "prettier.requireConfig": true,
  "typescript.preferences.importModuleSpecifier": "non-relative"
}
```

### WebStorm

**Настройки:**
1. Включить ESLint в настройках
2. Настроить Prettier как форматтер по умолчанию
3. Включить автоимпорт TypeScript
4. Настроить алиасы путей

## 📊 Метрики качества

### Цели качества

- **0 ошибок** ESLint
- **0 предупреждений** TypeScript
- **100% покрытие** форматированием Prettier
- **100% соответствие** конвенции коммитов
- **0 уязвимостей** безопасности

### Мониторинг

**GitHub Actions:**
- Автоматическая проверка при каждом PR
- Уведомления о нарушениях
- Блокировка мержа при ошибках

**Локальная проверка:**
- Pre-commit хуки
- Автоматическое исправление
- Детальные отчеты

## 🚀 Лучшие практики

### 1. Разработка

- Всегда запускайте `npm run quality:check` перед коммитом
- Используйте `npm run quality:fix` для автоматического исправления
- Следуйте конвенции коммитов
- Пишите понятные сообщения коммитов

### 2. Code Review

- Проверяйте качество кода в PR
- Обращайте внимание на типизацию
- Проверяйте форматирование
- Убедитесь в отсутствии console.log

### 3. Рефакторинг

- Используйте алиасы путей
- Следуйте принципам SOLID
- Избегайте дублирования кода
- Документируйте сложную логику

## 🛡️ Безопасность

### Проверки безопасности

- **npm audit** - проверка уязвимостей в зависимостях
- **Dependabot** - автоматическое обновление зависимостей
- **Code scanning** - анализ кода на уязвимости

### Рекомендации

- Регулярно обновляйте зависимости
- Используйте только проверенные пакеты
- Не храните секреты в коде
- Используйте environment variables

## 📚 Дополнительные ресурсы

- [ESLint Documentation](https://eslint.org/docs/)
- [Prettier Documentation](https://prettier.io/docs/)
- [Commitlint Documentation](https://commitlint.js.org/)
- [Husky Documentation](https://typicode.github.io/husky/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## 🎉 Заключение

Система качества кода обеспечивает:
- **Консистентность** - единый стиль во всем проекте
- **Надежность** - автоматическое обнаружение ошибок
- **Читаемость** - понятный и структурированный код
- **Поддерживаемость** - легкое внесение изменений
- **Безопасность** - защита от уязвимостей

Следуйте этим стандартам для создания высококачественного кода! 🚀
