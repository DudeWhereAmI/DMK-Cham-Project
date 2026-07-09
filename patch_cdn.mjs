import fs from 'fs';
import path from 'path';

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk('./src');
let changedCount = 0;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  content = content.replace(/https:\/\/raw\.githubusercontent\.com\/DudeWhereAmI\/Digital-Marketing-ISB-Cham-Project\/([a-zA-Z0-9]+)\//g, 'https://cdn.jsdelivr.net/gh/DudeWhereAmI/Digital-Marketing-ISB-Cham-Project@$1/');

  if (content !== original) {
    fs.writeFileSync(file, content);
    changedCount++;
    console.log(`Updated CDN URLs in ${file}`);
  }
}

console.log(`Updated ${changedCount} files with jsdelivr.`);
