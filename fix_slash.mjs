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
  
  content = content.replace(/\/ referrerPolicy="no-referrer">/g, ' referrerPolicy="no-referrer" />');

  if (content !== original) {
    fs.writeFileSync(file, content);
    changedCount++;
    console.log(`Fixed ${file}`);
  }
}
console.log(`Fixed ${changedCount} files.`);
