module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Type rules
    "type-enum": [
      2,
      "always",
      [
        "feat",     // новая функциональность
        "fix",      // исправление бага
        "docs",     // изменения в документации
        "style",    // форматирование, отсутствующие точки с запятой и т.д.
        "refactor", // рефакторинг кода
        "perf",     // улучшение производительности
        "test",     // добавление тестов
        "build",    // изменения в системе сборки
        "ci",       // изменения в CI/CD
        "chore",    // обновление задач, конфигурации и т.д.
        "revert",   // откат изменений
      ],
    ],
    
    // Subject rules
    "subject-case": [2, "never", ["start-case", "pascal-case", "upper-case"]],
    "subject-empty": [2, "never"],
    "subject-full-stop": [2, "never", "."],
    "subject-max-length": [2, "always", 100],
    "subject-min-length": [2, "always", 10],
    
    // Header rules
    "header-max-length": [2, "always", 100],
    
    // Body rules
    "body-leading-blank": [2, "always"],
    "body-max-line-length": [2, "always", 100],
    
    // Footer rules
    "footer-leading-blank": [2, "always"],
    "footer-max-line-length": [2, "always", 100],
    
    // Type case
    "type-case": [2, "always", "lower-case"],
    "type-empty": [2, "never"],
    
    // Scope rules
    "scope-case": [2, "always", "lower-case"],
    "scope-empty": [0, "never"],
    "scope-enum": [
      2,
      "always",
      [
        "app",      // изменения в приложениях
        "pkg",      // изменения в пакетах
        "config",   // изменения в конфигурации
        "deps",     // обновление зависимостей
        "ci",       // изменения в CI/CD
        "docs",     // документация
        "test",     // тесты
      ],
    ],
  },
};
