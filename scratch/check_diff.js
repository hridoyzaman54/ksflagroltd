const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const SRC_DIR = 'E:\\KSFL GIT 54';
const DEST_DIR = 'e:\\greenspout';

function getHash(filePath) {
  const content = fs.readFileSync(filePath);
  return crypto.createHash('md5').update(content).digest('hex');
}

function compareRecursive(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();

  if (isDirectory) {
    const dirName = path.basename(src);
    if (dirName === '.git') return;

    fs.readdirSync(src).forEach(childItemName => {
      compareRecursive(
        path.join(src, childItemName),
        path.join(dest, childItemName)
      );
    });
  } else {
    const fileName = path.basename(src);
    if (fileName === '.gitignore') return;

    const relPath = path.relative(SRC_DIR, src);
    if (!fs.existsSync(dest)) {
      console.log(`Missing in destination: ${relPath}`);
      return;
    }

    const srcHash = getHash(src);
    const destHash = getHash(dest);
    if (srcHash !== destHash) {
      console.log(`Different content: ${relPath}`);
    }
  }
}

console.log('Comparing files from source to destination...');
compareRecursive(SRC_DIR, DEST_DIR);

function checkReverse(destDir) {
  fs.readdirSync(destDir).forEach(item => {
    const fullDest = path.join(destDir, item);
    const relPath = path.relative(DEST_DIR, fullDest);
    
    // Ignore .git, scratch, and our-crops files
    if (relPath.startsWith('.git') || relPath.startsWith('scratch') || relPath.startsWith('our-crops')) {
      return;
    }
    
    const fullSrc = path.join(SRC_DIR, relPath);
    if (!fs.existsSync(fullSrc)) {
      console.log(`Extra file/folder in workspace: ${relPath}`);
      return;
    }
    
    if (fs.statSync(fullDest).isDirectory()) {
      checkReverse(fullDest);
    }
  });
}

console.log('Comparing files from destination to source...');
checkReverse(DEST_DIR);
console.log('Comparison done.');
