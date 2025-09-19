# CI/CD Configuration

Этот документ описывает настройку и использование системы непрерывной интеграции и развертывания (CI/CD) для проекта.

## 🚀 Обзор

Проект настроен с полным циклом CI/CD, включающим:
- ✅ GitHub Actions для автоматических проверок
- ✅ Husky хуки для pre-commit проверок
- ✅ Автоматические проверки качества кода
- ✅ Тестирование (Unit + E2E)
- ✅ Проверки безопасности
- ✅ Автоматический деплой

## 📋 Доступные скрипты

### Основные команды
```bash
# Полная проверка CI/CD
pnpm run ci

# Быстрая проверка (без тестов и сборки)
pnpm run ci:quick

# Проверка качества кода
pnpm run quality:check

# Автоматическое исправление проблем
pnpm run quality:fix
```

### Тестирование
```bash
# Unit тесты
pnpm run test
pnpm run test:watch
pnpm run test:coverage

# E2E тесты
pnpm run test:e2e
pnpm run test:e2e:ui
pnpm run test:e2e:debug

# Все тесты
pnpm run test:all
```

### Сборка и анализ
```bash
# Сборка проекта
pnpm run build

# Проверка сборки
pnpm run build:check

# Анализ сборки
pnpm run build:analyze
```

### Безопасность
```bash
# Проверка безопасности
pnpm run security:check

# Аудит зависимостей
pnpm run security:audit
```

## 🔧 GitHub Actions

### Workflows

1. **CI/CD Pipeline** (`.github/workflows/ci.yml`)
   - Проверка качества кода
   - Сборка проекта
   - Проверка безопасности
   - Проверка зависимостей

2. **Testing** (`.github/workflows/test.yml`)
   - Unit тесты
   - E2E тесты
   - Тесты производительности
   - Покрытие кода

3. **Deploy** (`.github/workflows/deploy.yml`)
   - Автоматический деплой в staging/production
   - Создание релизов
   - Уведомления

4. **Security** (`.github/workflows/security.yml`)
   - Еженедельный аудит безопасности
   - Проверка уязвимостей

### Триггеры

- **Push** в ветки `main`, `develop`
- **Pull Request** в ветки `main`, `develop`
- **Manual trigger** (workflow_dispatch)
- **Schedule** (еженедельно для безопасности)

## 🪝 Husky Hooks

### Pre-commit
Автоматически выполняется перед каждым коммитом:
- Линтинг измененных файлов
- Форматирование кода
- Проверка типов
- Проверка форматирования

### Pre-push
Автоматически выполняется перед push:
- Полная проверка качества
- Сборка проекта

### Commit-msg
Проверка сообщений коммитов по стандарту Conventional Commits.

## 🧪 Тестирование

### Unit тесты
- **Jest** для тестирования компонентов
- **Testing Library** для тестирования React компонентов
- Покрытие кода с порогом 70%

### E2E тесты
- **Playwright** для end-to-end тестирования
- Поддержка всех основных браузеров
- Мобильное тестирование

### Конфигурация тестов
- `jest.config.js` - конфигурация Jest
- `jest.setup.js` - настройка тестовой среды
- `playwright.config.ts` - конфигурация Playwright

## 🔒 Безопасность

### Автоматические проверки
- Аудит зависимостей на уязвимости
- Проверка устаревших пакетов
- Сканирование секретов в коде
- Проверка лицензий

### Рекомендации
- Регулярно обновляйте зависимости
- Используйте `.env.example` для примеров переменных
- Не коммитьте секреты в код
- Настройте HTTPS для production

## 📊 Мониторинг

### Метрики качества
- Покрытие кода
- Время сборки
- Размер бандла
- Количество уязвимостей

### Уведомления
- Успешные/неудачные сборки
- Результаты тестов
- Статус деплоя

## 🚀 Деплой

### Staging
- Автоматический деплой при push в `develop`
- Тестирование перед production

### Production
- Автоматический деплой при push в `main`
- Создание релизов
- Health checks

### Ручной деплой
```bash
# Через GitHub Actions
# Перейдите в Actions -> Deploy -> Run workflow
```

## 🔧 Настройка

### Переменные окружения
Создайте файлы:
- `.env.local` - локальные переменные
- `.env.example` - примеры переменных

### Секреты GitHub
Настройте в Settings -> Secrets and variables -> Actions:
- `NODE_ENV`
- `API_URL`
- `DATABASE_URL`
- И другие необходимые секреты

## 📝 Troubleshooting

### Частые проблемы

1. **Ошибки линтера**
   ```bash
   pnpm run lint:fix
   ```

2. **Ошибки форматирования**
   ```bash
   pnpm run format
   ```

3. **Ошибки типов**
   ```bash
   pnpm run typecheck
   ```

4. **Проблемы с тестами**
   ```bash
   pnpm run test:watch
   ```

### Логи
- GitHub Actions: Actions tab в репозитории
- Локальные проверки: консольный вывод
- Husky: вывод в терминале при коммите

## 📚 Полезные ссылки

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Husky Documentation](https://typicode.github.io/husky/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 🤝 Вклад в проект

1. Создайте feature ветку
2. Внесите изменения
3. Запустите проверки: `pnpm run ci`
4. Создайте Pull Request
5. Дождитесь прохождения всех проверок
6. После одобрения изменения будут автоматически задеплоены

---

**Примечание**: Все проверки должны пройти успешно перед merge в основную ветку.
