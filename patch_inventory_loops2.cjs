const fs = require('fs');
let code = fs.readFileSync('src/lib/inventory.ts', 'utf8');

code = code.replace(
  /if \(statusLower === 'draft' \|\| statusLower\.includes\('cancelled'\) \|\| statusLower\.includes\('hủy'\) \|\| statusLower\.includes\('cancel'\)\) continue;/g,
  `if (statusLower === 'draft' || statusLower.includes('cancelled') || statusLower.includes('hủy') || statusLower.includes('cancel')) return;`
);

code = code.replace(
  /if \(email === 'hoangphucunknown@gmail.com'\) continue;/g,
  `if (email === 'hoangphucunknown@gmail.com') return;`
);

code = code.replace(
  /if \(orderTimeMs <= limitTimeMs\) continue;/g,
  `if (orderTimeMs <= limitTimeMs) return;`
);

fs.writeFileSync('src/lib/inventory.ts', code);
console.log('Reverted loops in inventory.ts to return;');
