#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

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

// Функция для проверки файлов
function checkFiles() {
  console.log(`${colors.cyan}${colors.bold}📁 Проверка файлов...${colors.reset}`);
  
  const requiredFiles = [
    'package.json',
    'tsconfig.json',
    'eslint.config.mjs',
    '.prettierrc',
    '.eslintignore',
    '.prettierignore'
  ];
  
  const missingFiles = requiredFiles.filter(file => !fs.existsSync(file));
  
  if (missingFiles.length > 0) {
    console.log(`${colors.red}❌ Отсутствуют файлы: ${missingFiles.join(', ')}${colors.reset}`);
    return false;
  }
  
  console.log(`${colors.green}✅ Все необходимые файлы найдены${colors.reset}`);
  return true;
}

// Основная функция
function main() {
  console.log(`${colors.magenta}${colors.bold}🚀 Проверка качества кода${colors.reset}\n`);
  
  const startTime = Date.now();
  let allPassed = true;
  
  // Проверка файлов
  if (!checkFiles()) {
    allPassed = false;
  }
  
  console.log();
  
  // Проверка зависимостей
  const depsCheck = runCommand('pnpm install --frozen-lockfile', 'Установка зависимостей');
  if (!depsCheck.success) {
    allPassed = false;
  }
  
  console.log();
  
  // Линтинг
  const lintCheck = runCommand('pnpm run lint', 'Проверка ESLint');
  if (!lintCheck.success) {
    allPassed = false;
  }
  
  console.log();
  
  // Форматирование
  const formatCheck = runCommand('pnpm run format:check', 'Проверка Prettier');
  if (!formatCheck.success) {
    allPassed = false;
  }
  
  console.log();
  
  // Проверка типов
  const typeCheck = runCommand('pnpm run typecheck', 'Проверка TypeScript');
  if (!typeCheck.success) {
    allPassed = false;
  }
  
  console.log();
  
  // Сборка
  const buildCheck = runCommand('pnpm run build', 'Сборка проекта');
  if (!buildCheck.success) {
    allPassed = false;
  }
  
  console.log();
  
  // Итоги
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  if (allPassed) {
    console.log(`${colors.green}${colors.bold}🎉 Все проверки пройдены успешно!${colors.reset}`);
    console.log(`${colors.green}⏱️  Время выполнения: ${duration}с${colors.reset}`);
    process.exit(0);
  } else {
    console.log(`${colors.red}${colors.bold}💥 Некоторые проверки не пройдены${colors.reset}`);
    console.log(`${colors.red}⏱️  Время выполнения: ${duration}с${colors.reset}`);
    process.exit(1);
  }
}

// Обработка аргументов командной строки
const args = process.argv.slice(2);
if (args.includes('--help') || args.includes('-h')) {
  console.log(`
${colors.bold}Использование:${colors.reset}
  node scripts/check-quality.js [опции]

${colors.bold}Опции:${colors.reset}
  --help, -h     Показать эту справку
  --fix          Автоматически исправить ошибки линтера и форматирования

${colors.bold}Примеры:${colors.reset}
  node scripts/check-quality.js
  node scripts/check-quality.js --fix
`);
  process.exit(0);
}

if (args.includes('--fix')) {
  console.log(`${colors.yellow}🔧 Режим автоматического исправления${colors.reset}\n`);
  
  // Исправление линтера
  runCommand('pnpm run lint:fix', 'Исправление ESLint ошибок');
  
  // Исправление форматирования
  runCommand('pnpm run format', 'Исправление форматирования');
  
  console.log(`${colors.green}✅ Автоматические исправления применены${colors.reset}`);
}

// Запуск основной функции
main();
