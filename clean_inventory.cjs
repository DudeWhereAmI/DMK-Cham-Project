const fs = require('fs');
let code = fs.readFileSync('src/lib/inventory.ts', 'utf8');

const targetRegex = /export const processOrderInventory = \(cartItems: any\[\], orderId: string = 'N\/A'\) => \{[\s\S]*?return inv;\n\};\n\n/m;
code = code.replace(targetRegex, '');

fs.writeFileSync('src/lib/inventory.ts', code);
console.log("Removed processOrderInventory");
