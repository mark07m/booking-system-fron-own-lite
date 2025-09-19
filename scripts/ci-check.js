#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

// Цвета для консоли
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
  reset: '\x1b[0m',
  bold: '\x1b[1m',
};

// Функция для выполнения команд
function runCommand(command, description) {
  console.log(`${colors.blue}${colors.bold}🔄 ${description}${colors.reset}`);
  
  try {
    const output = execSync(command, { 
      stdio: 'pipe', 
      encoding: 'utf8',
      cwd: process.cwd()
    });
    
    console.log(`${colors.green}✅ ${description} - Успешно${colors.reset}`);
    return { success: true, output };
  } catch (error) {
    console.log(`${colors.red}❌ ${description} - Ошибка${colors.reset}`);
    console.log(`${colors.red}${error.stdout || error.message}${colors.reset}`);
    return { success: false, error: error.stdout || error.message };
  }
}

// Функция для проверки зависимостей
function checkDependencies() {
  console.log(`${colors.cyan}${colors.bold}📦 Проверка зависимостей...${colors.reset}`);
  
  const installResult = runCommand('pnpm install --frozen-lockfile', 'Установка зависимостей');
  return installResult;
}

// Функция для проверки линтера
function checkLinting() {
  console.log(`${colors.cyan}${colors.bold}🧹 Проверка линтера...${colors.reset}`);
  
  const lintResult = runCommand('pnpm run lint', 'Проверка ESLint');
  return lintResult;
}

// Функция для проверки форматирования
function checkFormatting() {
  console.log(`${colors.cyan}${colors.bold}🎨 Проверка форматирования...${colors.reset}`);
  
  const formatResult = runCommand('pnpm run format:check', 'Проверка Prettier');
  return formatResult;
}

// Функция для проверки типов
function checkTypes() {
  console.log(`${colors.cyan}${colors.bold}📝 Проверка типов...${colors.reset}`);
  
  const typeResult = runCommand('pnpm run typecheck', 'Проверка TypeScript');
  return typeResult;
}

// Функция для проверки тестов
function checkTests() {
  console.log(`${colors.cyan}${colors.bold}🧪 Проверка тестов...${colors.reset}`);
  
  const testResult = runCommand('pnpm run test:ci', 'Запуск тестов');
  return testResult;
}

// Функция для проверки сборки
function checkBuild() {
  console.log(`${colors.cyan}${colors.bold}🏗️  Проверка сборки...${colors.reset}`);
  
  const buildResult = runCommand('pnpm run build', 'Сборка проекта');
  return buildResult;
}

// Функция для проверки безопасности
function checkSecurity() {
  console.log(`${colors.cyan}${colors.bold}🔒 Проверка безопасности...${colors.reset}`);
  
  const securityResult = runCommand('pnpm run security:audit', 'Аудит безопасности');
  return securityResult;
}

// Функция для проверки качества кода
function checkQuality() {
  console.log(`${colors.cyan}${colors.bold}⭐ Проверка качества кода...${colors.reset}`);
  
  const qualityResult = runCommand('pnpm run quality:check', 'Проверка качества');
  return qualityResult;
}

// Основная функция
function main() {
  console.log(`${colors.magenta}${colors.bold}🚀 Полная проверка CI/CD${colors.reset}\n`);
  
  const startTime = Date.now();
  const results = [];
  
  // Список проверок
  const checks = [
    { name: 'Dependencies', fn: checkDependencies },
    { name: 'Linting', fn: checkLinting },
    { name: 'Formatting', fn: checkFormatting },
    { name: 'Types', fn: checkTypes },
    { name: 'Tests', fn: checkTests },
    { name: 'Build', fn: checkBuild },
    { name: 'Security', fn: checkSecurity },
    { name: 'Quality', fn: checkQuality }
  ];
  
  // Выполнение проверок
  checks.forEach((check, index) => {
    console.log(`\n${colors.white}${colors.bold}--- Проверка ${index + 1}/${checks.length}: ${check.name} ---${colors.reset}`);
    
    const result = check.fn();
    results.push({
      name: check.name,
      success: result.success,
      error: result.error
    });
    
    if (!result.success) {
      console.log(`${colors.red}❌ ${check.name} - ПРОВАЛЕНА${colors.reset}`);
    } else {
      console.log(`${colors.green}✅ ${check.name} - ПРОЙДЕНА${colors.reset}`);
    }
  });
  
  // Итоги
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  console.log(`\n${colors.magenta}${colors.bold}📊 РЕЗУЛЬТАТЫ ПРОВЕРКИ${colors.reset}`);
  console.log(`${colors.white}${'='.repeat(50)}${colors.reset}`);
  
  const passed = results.filter(r => r.success).length;
  const failed = results.filter(r => !r.success).length;
  
  results.forEach(result => {
    const status = result.success ? 
      `${colors.green}✅ ПРОЙДЕНА${colors.reset}` : 
      `${colors.red}❌ ПРОВАЛЕНА${colors.reset}`;
    console.log(`${result.name.padEnd(15)} ${status}`);
  });
  
  console.log(`${colors.white}${'='.repeat(50)}${colors.reset}`);
  console.log(`${colors.cyan}Всего проверок: ${results.length}${colors.reset}`);
  console.log(`${colors.green}Пройдено: ${passed}${colors.reset}`);
  console.log(`${colors.red}Провалено: ${failed}${colors.reset}`);
  console.log(`${colors.magenta}Время выполнения: ${duration}с${colors.reset}`);
  
  if (failed === 0) {
    console.log(`\n${colors.green}${colors.bold}🎉 ВСЕ ПРОВЕРКИ ПРОЙДЕНЫ УСПЕШНО!${colors.reset}`);
    console.log(`${colors.green}Проект готов к деплою! 🚀${colors.reset}`);
    process.exit(0);
  } else {
    console.log(`\n${colors.red}${colors.bold}💥 НЕКОТОРЫЕ ПРОВЕРКИ ПРОВАЛЕНЫ${colors.reset}`);
    console.log(`${colors.red}Исправьте ошибки перед деплоем! 🔧${colors.reset}`);
    
    // Показать детали ошибок
    console.log(`\n${colors.yellow}${colors.bold}ДЕТАЛИ ОШИБОК:${colors.reset}`);
    results.filter(r => !r.success).forEach(result => {
      console.log(`\n${colors.red}${result.name}:${colors.reset}`);
      console.log(result.error);
    });
    
    process.exit(1);
  }
}

// Обработка аргументов командной строки
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
${colors.bold}Использование:${colors.reset}
  node scripts/ci-check.js [опции]

${colors.bold}Опции:${colors.reset}
  --help, -h     Показать эту справку
  --quick        Быстрая проверка (без тестов и сборки)
  --full         Полная проверка (по умолчанию)

${colors.bold}Примеры:${colors.reset}
  node scripts/ci-check.js
  node scripts/ci-check.js --quick
  node scripts/ci-check.js --full
`);
  process.exit(0);
}

// Запуск основной функции
main();
