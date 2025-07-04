// generate-index.js
const fs = require('fs');
const path = require('path');

function scanDir(dir) {
  const obj = {};
  fs.readdirSync(dir, { withFileTypes: true }).forEach(entry => {
    if (entry.name === 'index.json') return;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      obj[entry.name] = {
        type: 'dir',
        content: scanDir(fullPath)
      };
    } else if (entry.isFile()) {
      obj[entry.name] = 'file';
    }
  });
  return obj;
}

const baseDir = path.join(__dirname, 'contents');
const tree = scanDir(baseDir);
fs.writeFileSync(path.join(baseDir, 'index.json'), JSON.stringify(tree, null, 2));
console.log('index.json updated!');
