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

// Функция для проверки размера сборки
function checkBuildSize() {
  console.log(`${colors.cyan}${colors.bold}📦 Проверка размера сборки...${colors.reset}`);
  
  const buildPaths = [
    'apps/owner/.next',
    'apps/owner/dist',
    'packages/ui/dist',
    'packages/theme/dist'
  ];
  
  let totalSize = 0;
  const buildInfo = [];
  
  buildPaths.forEach(buildPath => {
    if (fs.existsSync(buildPath)) {
      const stats = getDirectorySize(buildPath);
      totalSize += stats.size;
      buildInfo.push({
        path: buildPath,
        size: stats.size,
        files: stats.files
      });
      
      console.log(`${colors.green}📁 ${buildPath}: ${formatBytes(stats.size)} (${stats.files} файлов)${colors.reset}`);
    }
  });
  
  console.log(`${colors.magenta}${colors.bold}📊 Общий размер сборки: ${formatBytes(totalSize)}${colors.reset}`);
  
  // Предупреждение если размер слишком большой
  if (totalSize > 50 * 1024 * 1024) { // 50MB
    console.log(`${colors.yellow}⚠️  Предупреждение: Размер сборки превышает 50MB${colors.reset}`);
  }
  
  return { success: true, totalSize, buildInfo };
}

// Функция для получения размера директории
function getDirectorySize(dirPath) {
  let size = 0;
  let files = 0;
  
  function calculateSize(itemPath) {
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory()) {
      const items = fs.readdirSync(itemPath);
      items.forEach(item => {
        calculateSize(path.join(itemPath, item));
      });
    } else {
      size += stats.size;
      files++;
    }
  }
  
  calculateSize(dirPath);
  return { size, files };
}

// Функция для форматирования размера в байтах
function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Функция для проверки производительности сборки
function checkBuildPerformance() {
  console.log(`${colors.cyan}${colors.bold}⚡ Проверка производительности сборки...${colors.reset}`);
  
  const startTime = Date.now();
  
  // Очистка предыдущих сборок
  runCommand('pnpm run clean', 'Очистка предыдущих сборок');
  
  // Сборка проекта
  const buildResult = runCommand('pnpm run build', 'Сборка проекта');
  
  const endTime = Date.now();
  const buildTime = endTime - startTime;
  
  console.log(`${colors.magenta}${colors.bold}⏱️  Время сборки: ${(buildTime / 1000).toFixed(2)}с${colors.reset}`);
  
  // Предупреждение если сборка слишком долгая
  if (buildTime > 120000) { // 2 минуты
    console.log(`${colors.yellow}⚠️  Предупреждение: Сборка занимает более 2 минут${colors.reset}`);
  }
  
  return { success: buildResult.success, buildTime };
}

// Функция для проверки корректности сборки
function checkBuildCorrectness() {
  console.log(`${colors.cyan}${colors.bold}🔍 Проверка корректности сборки...${colors.reset}`);
  
  const checks = [];
  
  // Проверка наличия основных файлов сборки
  const requiredFiles = [
    'apps/owner/.next/static',
    'packages/ui/dist',
    'packages/theme/dist'
  ];
  
  requiredFiles.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      console.log(`${colors.green}✅ ${filePath} - найден${colors.reset}`);
      checks.push({ file: filePath, exists: true });
    } else {
      console.log(`${colors.red}❌ ${filePath} - не найден${colors.reset}`);
      checks.push({ file: filePath, exists: false });
    }
  });
  
  // Проверка наличия source maps
  const sourceMapFiles = [
    'apps/owner/.next/static/chunks/*.js.map',
    'packages/ui/dist/**/*.js.map'
  ];
  
  let hasSourceMaps = false;
  sourceMapFiles.forEach(pattern => {
    const files = glob.sync(pattern);
    if (files.length > 0) {
      hasSourceMaps = true;
    }
  });
  
  if (hasSourceMaps) {
    console.log(`${colors.green}✅ Source maps найдены${colors.reset}`);
  } else {
    console.log(`${colors.yellow}⚠️  Source maps не найдены${colors.reset}`);
  }
  
  return { success: checks.every(check => check.exists), checks };
}

// Основная функция
function main() {
  console.log(`${colors.magenta}${colors.bold}🚀 Проверка сборки проекта${colors.reset}\n`);
  
  const startTime = Date.now();
  let allPassed = true;
  
  // Проверка производительности сборки
  const performanceResult = checkBuildPerformance();
  if (!performanceResult.success) {
    allPassed = false;
  }
  
  console.log();
  
  // Проверка размера сборки
  const sizeResult = checkBuildSize();
  if (!sizeResult.success) {
    allPassed = false;
  }
  
  console.log();
  
  // Проверка корректности сборки
  const correctnessResult = checkBuildCorrectness();
  if (!correctnessResult.success) {
    allPassed = false;
  }
  
  console.log();
  
  // Итоги
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  if (allPassed) {
    console.log(`${colors.green}${colors.bold}🎉 Все проверки сборки пройдены успешно!${colors.reset}`);
    console.log(`${colors.green}⏱️  Время выполнения: ${duration}с${colors.reset}`);
    console.log(`${colors.green}📦 Общий размер: ${formatBytes(sizeResult.totalSize)}${colors.reset}`);
    console.log(`${colors.green}⚡ Время сборки: ${(performanceResult.buildTime / 1000).toFixed(2)}с${colors.reset}`);
    process.exit(0);
  } else {
    console.log(`${colors.red}${colors.bold}💥 Некоторые проверки сборки не пройдены${colors.reset}`);
    console.log(`${colors.red}⏱️  Время выполнения: ${duration}с${colors.reset}`);
    process.exit(1);
  }
}

// Запуск основной функции
main();
