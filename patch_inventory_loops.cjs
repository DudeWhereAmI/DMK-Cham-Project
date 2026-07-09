const fs = require('fs');
let code = fs.readFileSync('src/lib/inventory.ts', 'utf8');

code = code.replace(
  /if \(statusLower === 'draft' \|\| statusLower\.includes\('cancelled'\) \|\| statusLower\.includes\('hủy'\) \|\| statusLower\.includes\('cancel'\)\) return;/g,
  `if (statusLower === 'draft' || statusLower.includes('cancelled') || statusLower.includes('hủy') || statusLower.includes('cancel')) continue;`
);

code = code.replace(
  /if \(email === 'hoangphucunknown@gmail.com'\) return;/g,
  `if (email === 'hoangphucunknown@gmail.com') continue;`
);

code = code.replace(
  /if \(orderTimeMs <= limitTimeMs\) return;/g,
  `if (orderTimeMs <= limitTimeMs) continue;`
);

fs.writeFileSync('src/lib/inventory.ts', code);
console.log('Patched loops in inventory.ts');
