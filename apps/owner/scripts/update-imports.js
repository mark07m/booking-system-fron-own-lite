#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Маппинг старых путей на новые алиасы
const pathMappings = {
  '@/src/shared/': '@shared/',
  '@/src/features/': '@features/',
  '@/src/entities/': '@entities/',
  '@/src/widgets/': '@widgets/',
  '@/src/app-shell/': '@app-shell/',
  '@/src/': '@/',
};

// Функция для обновления импортов в файле
function updateImportsInFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8');
    let hasChanges = false;

    // Обновляем импорты
    for (const [oldPath, newAlias] of Object.entries(pathMappings)) {
      const regex = new RegExp(`from\\s+["']${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^"']+)["']`, 'g');
      const newContent = content.replace(regex, `from "${newAlias}$1"`);
      
      if (newContent !== content) {
        content = newContent;
        hasChanges = true;
      }
    }

    // Обновляем импорты с require
    for (const [oldPath, newAlias] of Object.entries(pathMappings)) {
      const regex = new RegExp(`require\\(["']${oldPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}([^"']+)["']\\)`, 'g');
      const newContent = content.replace(regex, `require("${newAlias}$1")`);
      
      if (newContent !== content) {
        content = newContent;
        hasChanges = true;
      }
    }

    if (hasChanges) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`✅ Updated: ${filePath}`);
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

// Функция для рекурсивного поиска файлов
function findFiles(dir, extensions = ['ts', 'tsx', 'js', 'jsx']) {
  const files = [];
  
  function walkDir(currentDir) {
    const items = fs.readdirSync(currentDir);
    
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        walkDir(fullPath);
      } else if (stat.isFile()) {
        const ext = path.extname(item).slice(1);
        if (extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }
  
  walkDir(dir);
  return files;
}

// Основная функция
function main() {
  const projectRoot = path.join(__dirname, '..');
  const srcDir = path.join(projectRoot, 'src');
  
  console.log('🔄 Updating import paths...');
  console.log('📁 Project root:', projectRoot);
  
  // Находим все файлы для обновления
  const files = findFiles(srcDir);
  console.log(`📄 Found ${files.length} files to check`);
  
  let updatedCount = 0;
  
  files.forEach(file => {
    if (updateImportsInFile(file)) {
      updatedCount++;
    }
  });
  
  console.log(`\n✨ Updated ${updatedCount} files`);
  console.log('🎉 Import path update completed!');
}

// Запуск скрипта
if (require.main === module) {
  main();
}

module.exports = { updateImportsInFile, findFiles };
