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
  
  // Regex to add referrerPolicy="no-referrer" if missing
  // Match <img ... >
  content = content.replace(/<img([^>]+)>/g, (match, attrs) => {
    if (!attrs.includes('referrerPolicy')) {
      return `<img${attrs} referrerPolicy="no-referrer">`;
    }
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(file, content);
    changedCount++;
    console.log(`Patched ${file}`);
  }
}

console.log(`Patched ${changedCount} files.`);
