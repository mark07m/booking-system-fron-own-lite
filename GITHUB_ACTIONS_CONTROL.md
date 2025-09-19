# Управление GitHub Actions

## 🚫 Actions временно отключены

Все GitHub Actions workflows были временно отключены для отладки.

## Текущее состояние

### Отключенные workflows:
- `ci.yml.disabled` - Основной CI pipeline
- `deploy.yml.disabled` - Деплой в продакшн
- `quality.yml.disabled` - Проверка качества кода
- `security.yml.disabled` - Проверка безопасности
- `test.yml.disabled` - Тестирование

### Активные workflows:
- `disable-actions.yml` - Уведомление об отключении

## Как включить Actions обратно

### Вариант 1: Включить все workflows
```bash
# Переименовать все .disabled файлы обратно
cd .github/workflows
for file in *.disabled; do
  mv "$file" "${file%.disabled}"
done

# Удалить файл отключения
rm disable-actions.yml
```

### Вариант 2: Включить только определенные workflows
```bash
# Например, включить только CI
cd .github/workflows
mv ci.yml.disabled ci.yml

# Или включить только тесты
mv test.yml.disabled test.yml
```

### Вариант 3: Включить через GitHub UI
1. Перейдите в Settings репозитория
2. Выберите Actions → General
3. В разделе "Workflow permissions" включите Actions

## Проверка статуса

```bash
# Проверить какие workflows активны
ls -la .github/workflows/*.yml

# Проверить какие workflows отключены
ls -la .github/workflows/*.disabled
```

## Временное отключение через GitHub UI

Если нужно отключить Actions через веб-интерфейс:

1. Перейдите в **Settings** репозитория
2. Выберите **Actions** → **General**
3. В разделе **"Actions permissions"** выберите:
   - **"Disable Actions"** - полностью отключить
   - **"Allow select actions"** - разрешить только определенные
   - **"Allow all actions"** - разрешить все

## Примечания

- Отключение через переименование файлов (.disabled) - локальное решение
- Отключение через GitHub UI - глобальное решение для репозитория
- При пуше изменений в main ветку Actions не будут выполняться
- Локальная разработка (pnpm dev) продолжает работать нормально
