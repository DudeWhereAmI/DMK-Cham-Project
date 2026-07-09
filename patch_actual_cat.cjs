const fs = require('fs');
let code = fs.readFileSync('src/lib/inventory.ts', 'utf8');

code = code.replace(
  /const actualCat1 = cat; \/\/ For combo products, cat already correctly holds clip-1 or clip-2 or mirror/g,
  `const actualCat1 = (cat === 'combo' && comboId === 'mirror_combo') ? 'mirror' : (cat === 'combo' ? 'clip-1' : cat);`
);

code = code.replace(
  /const actualCat2 = comboId === 'mirror_combo' \? 'mirror' : cat; \/\/ For combo products, cat already holds the base clip type/g,
  `const actualCat2 = comboId === 'mirror_combo' ? 'mirror' : (cat === 'combo' ? 'clip-1' : cat);`
);

fs.writeFileSync('src/lib/inventory.ts', code);
