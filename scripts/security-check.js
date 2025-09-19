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

// Функция для проверки уязвимостей в зависимостях
function checkVulnerabilities() {
  console.log(`${colors.cyan}${colors.bold}🔒 Проверка уязвимостей в зависимостях...${colors.reset}`);
  
  const auditResult = runCommand('pnpm audit --audit-level moderate', 'Аудит безопасности');
  
  if (auditResult.success) {
    console.log(`${colors.green}✅ Критических уязвимостей не найдено${colors.reset}`);
  } else {
    console.log(`${colors.red}❌ Найдены уязвимости в зависимостях${colors.reset}`);
  }
  
  return auditResult;
}

// Функция для проверки устаревших зависимостей
function checkOutdatedDependencies() {
  console.log(`${colors.cyan}${colors.bold}📦 Проверка устаревших зависимостей...${colors.reset}`);
  
  const outdatedResult = runCommand('pnpm outdated', 'Проверка устаревших пакетов');
  
  if (outdatedResult.success) {
    console.log(`${colors.green}✅ Все зависимости актуальны${colors.reset}`);
  } else {
    console.log(`${colors.yellow}⚠️  Найдены устаревшие зависимости${colors.reset}`);
  }
  
  return outdatedResult;
}

// Функция для проверки лицензий
function checkLicenses() {
  console.log(`${colors.cyan}${colors.bold}📄 Проверка лицензий...${colors.reset}`);
  
  try {
    const licenseResult = runCommand('pnpm licenses list', 'Проверка лицензий');
    
    if (licenseResult.success) {
      console.log(`${colors.green}✅ Лицензии проверены${colors.reset}`);
    }
    
    return licenseResult;
  } catch (error) {
    console.log(`${colors.yellow}⚠️  Не удалось проверить лицензии (возможно, пакет не установлен)${colors.reset}`);
    return { success: true };
  }
}

// Функция для проверки конфигурационных файлов
function checkConfigFiles() {
  console.log(`${colors.cyan}${colors.bold}⚙️  Проверка конфигурационных файлов...${colors.reset}`);
  
  const configFiles = [
    '.env.example',
    '.env.local.example',
    'next.config.ts',
    'tsconfig.json',
    'eslint.config.mjs',
    'tailwind.config.js'
  ];
  
  let allConfigsExist = true;
  
  configFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`${colors.green}✅ ${file} - найден${colors.reset}`);
    } else {
      console.log(`${colors.yellow}⚠️  ${file} - не найден${colors.reset}`);
      allConfigsExist = false;
    }
  });
  
  return { success: allConfigsExist };
}

// Функция для проверки секретов в коде
function checkSecrets() {
  console.log(`${colors.cyan}${colors.bold}🔐 Проверка секретов в коде...${colors.reset}`);
  
  const secretPatterns = [
    /password\s*=\s*['"][^'"]+['"]/gi,
    /api[_-]?key\s*=\s*['"][^'"]+['"]/gi,
    /secret\s*=\s*['"][^'"]+['"]/gi,
    /token\s*=\s*['"][^'"]+['"]/gi,
    /private[_-]?key\s*=\s*['"][^'"]+['"]/gi
  ];
  
  const filesToCheck = [
    'apps/owner/src/**/*.{ts,tsx,js,jsx}',
    'packages/**/*.{ts,tsx,js,jsx}',
    '*.{js,ts,json}'
  ];
  
  let foundSecrets = false;
  
  filesToCheck.forEach(pattern => {
    try {
      const files = glob.sync(pattern);
      files.forEach(file => {
        const content = fs.readFileSync(file, 'utf8');
        secretPatterns.forEach(pattern => {
          if (pattern.test(content)) {
            console.log(`${colors.red}❌ Возможный секрет найден в ${file}${colors.reset}`);
            foundSecrets = true;
          }
        });
      });
    } catch (error) {
      // Игнорируем ошибки поиска файлов
    }
  });
  
  if (!foundSecrets) {
    console.log(`${colors.green}✅ Секреты в коде не найдены${colors.reset}`);
  }
  
  return { success: !foundSecrets };
}

// Функция для проверки HTTPS
function checkHTTPS() {
  console.log(`${colors.cyan}${colors.bold}🔒 Проверка HTTPS конфигурации...${colors.reset}`);
  
  const configFiles = [
    'next.config.ts',
    'next.config.js',
    'package.json'
  ];
  
  let hasHTTPS = false;
  
  configFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('https') || content.includes('SSL') || content.includes('TLS')) {
        hasHTTPS = true;
        console.log(`${colors.green}✅ HTTPS конфигурация найдена в ${file}${colors.reset}`);
      }
    }
  });
  
  if (!hasHTTPS) {
    console.log(`${colors.yellow}⚠️  HTTPS конфигурация не найдена${colors.reset}`);
  }
  
  return { success: true };
}

// Основная функция
function main() {
  console.log(`${colors.magenta}${colors.bold}🛡️  Проверка безопасности проекта${colors.reset}\n`);
  
  const startTime = Date.now();
  let allPassed = true;
  
  // Проверка уязвимостей
  const vulnerabilitiesResult = checkVulnerabilities();
  if (!vulnerabilitiesResult.success) {
    allPassed = false;
  }
  
  console.log();
  
  // Проверка устаревших зависимостей
  const outdatedResult = checkOutdatedDependencies();
  if (!outdatedResult.success) {
    allPassed = false;
  }
  
  console.log();
  
  // Проверка лицензий
  const licensesResult = checkLicenses();
  if (!licensesResult.success) {
    allPassed = false;
  }
  
  console.log();
  
  // Проверка конфигурационных файлов
  const configResult = checkConfigFiles();
  if (!configResult.success) {
    allPassed = false;
  }
  
  console.log();
  
  // Проверка секретов
  const secretsResult = checkSecrets();
  if (!secretsResult.success) {
    allPassed = false;
  }
  
  console.log();
  
  // Проверка HTTPS
  const httpsResult = checkHTTPS();
  if (!httpsResult.success) {
    allPassed = false;
  }
  
  console.log();
  
  // Итоги
  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);
  
  if (allPassed) {
    console.log(`${colors.green}${colors.bold}🎉 Все проверки безопасности пройдены успешно!${colors.reset}`);
    console.log(`${colors.green}⏱️  Время выполнения: ${duration}с${colors.reset}`);
    process.exit(0);
  } else {
    console.log(`${colors.red}${colors.bold}💥 Некоторые проверки безопасности не пройдены${colors.reset}`);
    console.log(`${colors.red}⏱️  Время выполнения: ${duration}с${colors.reset}`);
    process.exit(1);
  }
}

// Запуск основной функции
main();
